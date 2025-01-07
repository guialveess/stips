"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import * as z from "zod";
import Icons from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { FreePlanLimitError } from "@/lib/utils";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { checkIfPlanLimitReached, createProject } from "./action";
import { Card } from "@/components/ui/card";

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

export type ProjectFormValues = z.infer<typeof projectSchema>;

const steps = [
  {
    step: 1,
    title: "Detalhes do Projeto",
    description: "Insira o nome do projeto e o domínio",
  },
  {
    step: 2,
    title: "Links Sociais",
    description: "Adicione links sociais opcionais",
  },
];

const loadingStates = [
  { text: "Criando projeto..." },
  { text: "Validando dados..." },
  { text: "Preparando ambiente..." },
  { text: "Fazendo nosso melhor..." },
  { text: "Projeto pronto!" },
];

export default function CreateProjectCard() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
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

  const nextStep = () =>
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  const onSubmit = async () => {
    const completeValues = form.getValues();

    if (stepIndex < steps.length - 1) {
      nextStep();
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
        setStepIndex(0);
        setIsLoading(false);
        setIsCardOpen(false);
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
      {!isCardOpen && (
        <Card
          onClick={() => setIsCardOpen(true)}
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
      )}

      <AnimatePresence>
        {isCardOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              className="fixed inset-0 z-10 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCardOpen(false)}
            ></motion.div>

            {/* Card Modal */}
            <motion.div
              className="fixed inset-0 z-20 flex items-center justify-center px-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_8px_16px_-6px_rgb(0_0_0/0.05)] dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[0_8px_16px_-6px_rgb(0_0_0/0.25)]">
                <div className="space-y-4 p-7">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                      {steps[stepIndex].title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {steps[stepIndex].description}
                    </p>
                  </div>
                </div>

                <div className="space-y-5 border-t border-zinc-100 p-7 dark:border-zinc-800">
                  {stepIndex === 0 && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Nome do Projeto
                        </label>
                        <Input
                          placeholder="Digite o nome do projeto"
                          {...form.register("name")}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                          Domínio
                        </label>
                        <Input
                          placeholder="example.com"
                          {...form.register("domain")}
                        />
                      </div>
                    </>
                  )}

                  {stepIndex === 1 && (
                    <div className="space-y-4">
                      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Adicione links sociais opcionais
                      </p>
                      {fields.map((item, index) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="flex-1">
                            <label className="text-sm text-zinc-700 dark:text-zinc-300">
                              Nome
                            </label>
                            <Input
                              placeholder="Ex.: Spotify"
                              {...form.register(`socialLinks.${index}.name`)}
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-sm text-zinc-700 dark:text-zinc-300">
                              URL
                            </label>
                            <Input
                              placeholder="https://example.com"
                              {...form.register(`socialLinks.${index}.url`)}
                            />
                          </div>
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
                        variant="outline"
                        onClick={() => append({ name: "", url: "" })}
                      >
                        Adicionar Link
                      </Button>
                    </div>
                  )}
                </div>
                {isLoading && (
                  <MultiStepLoader
                    loadingStates={loadingStates}
                    loading={isLoading}
                    duration={1500}
                  />
                )}

                <div className="flex justify-between border-t border-zinc-100 p-7 dark:border-zinc-800">
                  <Button
                    onClick={() => setIsCardOpen(false)}
                    variant="outline"
                  >
                    Cancelar
                  </Button>
                  <div className="flex gap-2">
                    <Button onClick={prevStep} disabled={stepIndex === 0}>
                      Voltar
                    </Button>
                    <Button onClick={onSubmit}>
                      {stepIndex === steps.length - 1
                        ? "Criar Projeto"
                        : "Próximo"}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
