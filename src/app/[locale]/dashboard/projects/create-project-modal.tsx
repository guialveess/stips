"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import * as z from "zod";
import Icons from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from "@/components/custom/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { FreePlanLimitError } from "@/lib/utils";
import { checkIfPlanLimitReached, createProject } from "./action";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const projectSchema = z.object({
  name: z.string().min(1, { message: "Insira um nome de projeto." }),
  domain: z.string().min(1, { message: "Insira um domínio de projeto." }),
  socialLinks: z
    .array(
      z.object({
        name: z.string().optional(),
        url: z.string().url({ message: "Insira um URL válido." }),
      })
    )
    .optional(),
});

export const stepSchemas = [
  z.object({
    name: z.string().min(1, { message: "Insira um nome de projeto." }),
    domain: z.string().min(1, { message: "Insira um domínio de projeto." }),
  }),
  z.object({
    socialLinks: z
      .array(
        z.object({
          name: z.string().optional(),
          url: z.string().url({ message: "Insira um URL válido." }),
        })
      )
      .optional(),
  }),
];

export type ProjectFormValues = z.infer<typeof projectSchema>;

const steps = [
  {
    step: 1,
    title: "Detalhes do Projeto",
    description: "Insira o nome do projeto e o domínio",
  },
  { step: 2, title: "Seu conteúdo", description: "Adicione links sociais opcionais" },
];

const loadingStates = [
  { text: "Criando projeto..." },
  { text: "Validando dados..." },
  { text: "Preparando ambiente..." },
  { text: "Fazendo nosso melhor..." },
  { text: "Projeto pronto!" },
];

const AnimatedLine = ({ active }: { active: boolean }) => (
  <motion.div
    initial={{ scaleX: 0 }}
    animate={{ scaleX: active ? 1 : 0 }}
    transition={{ duration: 0.5 }}
    className={`absolute left-[-50%] top-4 h-0.5 ${
      active ? "bg-orange-600" : "bg-gray-300"
    }`}
    style={{ width: "100%" }}
  />
);

const AnimatedCircle = ({ active, index }: { active: boolean; index: number }) => (
  <motion.div
    initial={{ scale: 0.8 }}
    animate={{ scale: active ? 1.2 : 1 }}
    transition={{ duration: 0.3 }}
    className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${
      active ? "bg-orange-600 text-white" : "bg-gray-300"
    }`}
  >
    {index}
  </motion.div>
);

export default function CreateProjectDrawer() {
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para controlar o Drawer

  const schema = stepSchemas[stepIndex];


  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      domain: "",
      socialLinks: [{ name: "", url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "socialLinks",
  });

  const nextStep = () => {
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const onSubmit = async () => {
    const completeValues = {
      name: form.getValues("name") || "",
      domain: form.getValues("domain") || "",
      socialLinks: form.getValues("socialLinks") || [],
    };

    if (stepIndex < steps.length - 1) {
      setStepIndex((prev) => prev + 1);
    } else {
      try {
        setIsLoading(true);
        const limitReached = await checkIfPlanLimitReached();
        if (limitReached) {
          throw new FreePlanLimitError();
        }
        await createProject(completeValues);
        toast({ title: "Projeto criado com sucesso!" });
        form.reset();
        setStepIndex(0); // Reinicia o step
        setIsDrawerOpen(false); // Fecha o drawer
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (error instanceof FreePlanLimitError) {
          toast({
            title: "Limite do plano gratuito atingido. Atualize seu plano.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro ao criar projeto. Por favor, tente novamente.",
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Card
            onClick={() => setIsDrawerOpen(true)}
            className="group relative flex cursor-pointer flex-col gap-3 rounded-lg border border-border bg-background p-4 shadow-lg shadow-black/5 transition-all hover:shadow-md"
          >
            <div className="flex gap-2">
              <Icons.projectPlus
                className="mt-0.5 shrink-0 text-primary"
                size={20}
                strokeWidth={2}
                aria-hidden="true"
              />
              <div className="flex grow flex-col gap-2">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Criar Novo Projeto</h4>
                  <p className="text-xs text-muted-foreground">
                    Clique para iniciar um novo projeto
                  </p>
                </div>
              </div>
            </div>
            <span className="absolute inset-0" aria-hidden="true"></span>
          </Card>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Criar Projeto 🎈</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col items-center space-y-4 p-4">
            <div className="flex w-full items-center justify-between">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="relative flex w-full flex-col items-center"
                  style={{
                    width: `${100 / steps.length}%`,
                  }}
                >
                  {idx !== 0 && <AnimatedLine active={idx <= stepIndex} />}
                  <AnimatedCircle active={idx <= stepIndex} index={idx + 1} />
                  <Badge
                    variant="outline"
                    className={`mt-2 text-center text-sm ${
                      idx === stepIndex
                        ? "font-bold text-orange-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </Badge>
                </div>
              ))}
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-12"
              >
                {stepIndex === 0 && (
                  <>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Projeto</FormLabel>
                          <FormControl>
                            <Input
                              className="w-full"
                              placeholder="Digite o nome do projeto"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="domain"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Domínio</FormLabel>
                          <FormControl>
                            <Input
                              className="w-full"
                              placeholder="example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                {stepIndex === 1 && (
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Social Links (optional)
                    </p>
                    {fields.map((item, index) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <FormField
                          control={form.control}
                          name={`socialLinks.${index}.name`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-full"
                                  placeholder="e.g., Spotify"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`socialLinks.${index}.url`}
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>URL</FormLabel>
                              <FormControl>
                                <Input
                                  className="w-full"
                                  placeholder="https://example.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)}
                        >
                          Remover
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() => append({ name: "", url: "" })}
                      variant="outline"
                    >
                      Adicionar Link
                    </Button>
                  </div>
                )}
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={stepIndex === 0}
                  >
                    Voltar
                  </Button>
                  <Button
  type="submit"
  onClick={() => {
    if (stepIndex === steps.length - 1) {
      setIsDrawerOpen(false); // Força o fechamento do Drawer
    }
  }}
>
  {stepIndex === steps.length - 1 ? "Submit" : "Próximo"}
</Button>

                </div>
              </form>
            </Form>
          </div>
        </DrawerContent>
      </Drawer>

      {isLoading && (
        <MultiStepLoader
          loadingStates={loadingStates}
          loading={isLoading}
          duration={1500}
        />
      )}
    </>
  );
}
