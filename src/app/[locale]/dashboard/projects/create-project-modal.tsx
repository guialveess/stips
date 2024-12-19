"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Icons from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Card2 from "@/components/myCard";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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

export const projectSchema = z.object({
  name: z.string().min(1, { message: "Please enter a project name." }),
  domain: z.string().min(1, { message: "Please enter a project domain." }),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

export default function CreateProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      domain: "",
    },
  });

  async function onSubmit(values: ProjectFormValues) {
    try {
      const limitReached = await checkIfFreePlanLimitReached();
      if (limitReached) {
        throw new FreePlanLimitError();
      }
      await createProject(values);
      toast({
        title: "Projeto criado com sucesso.",
      });
      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger for Dialog */}
      <DialogTrigger asChild>
        <div className="flex justify-center">
          <div className="relative w-[300px] lg:w-[300px] aspect-[4/3] rounded-lg border border-border bg-background p-4 shadow-lg shadow-black/5 cursor-pointer hover:shadow-md transition-all">
            {/* Inner Content */}
            <div className="flex h-full w-full flex-col items-center justify-center gap-2">
              {/* Icon */}
              <Icons.projectPlus className="h-10 w-10 text-primary" />

              {/* Title */}
              <p className="text-xl font-bold text-muted-foreground">Crie seu projeto</p>
            </div>
          </div>
        </div>
      </DialogTrigger>

      {/* Dialog Content */}
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
            <Button type="submit" className="w-full">
              Criar Projeto
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
