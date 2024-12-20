"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import Icons from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { checkIfFreePlanLimitReached, createProject } from "./action";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";

export const projectSchema = z.object({
  name: z.string().min(1, { message: "Please enter a project name." }),
  domain: z.string().min(1, { message: "Please enter a project domain." }),
  socialLinks: z
    .array(
      z.object({
        name: z.string().optional(),
        url: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

const loadingStates = [
  { text: "Criando projeto..." },
  { text: "Validando os tipos..." },
  { text: "Preparando o ambiente..." },
  { text: "Projeto pronto para uso!" },
];

export default function CreateProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
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

  async function onSubmit(values: ProjectFormValues) {
    try {
      setIsOpen(false); // Fecha o Dialog imediatamente
      setIsLoading(true); // Ativa o loader

      const limitReached = await checkIfFreePlanLimitReached();
      if (limitReached) {
        throw new FreePlanLimitError();
      }
      await createProject(values);

      setTimeout(() => {
        toast({
          title: "Projeto criado com sucesso.",
        });
        form.reset();
        setIsLoading(false); // Desativa o loader
      }, loadingStates.length * 1500); // Duração baseada no número de etapas
    } catch (error) {
      console.log(error);
      setIsLoading(false); // Desativa o loader em caso de erro

      if (error instanceof FreePlanLimitError) {
        return toast({
          title: "Limite do plano gratuito atingido. Atualize seu plano.",
          variant: "destructive",
        });
      }
      return toast({
        title: "Erro ao criar projeto. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="flex justify-center">
            <div className="relative w-[300px] lg:w-[300px] aspect-[4/3] rounded-lg border border-border bg-background p-4 shadow-lg shadow-black/5 cursor-pointer hover:shadow-md transition-all">
              <div className="flex h-full w-full flex-col items-center justify-center gap-2">
                <Icons.projectPlus className="h-10 w-10 text-primary" />
                <p className="text-xl font-bold text-muted-foreground">
                  Crie seu projeto
                </p>
              </div>
            </div>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Criar Projeto</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do Projeto</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o nome do projeto" {...field} />
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
                      <Input placeholder="exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Links Sociais (opcional)
                </p>
                {fields.map((item, index) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <FormField
                      control={form.control}
                      name={`socialLinks.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Spotify" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`socialLinks.${index}.url`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://exemplo.com" {...field} />
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
                <Button type="button" onClick={() => append({ name: "", url: "" })}>
                  Adicionar Link
                </Button>
              </div>
              <Button type="submit" className="w-full">
                Criar Projeto
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

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
