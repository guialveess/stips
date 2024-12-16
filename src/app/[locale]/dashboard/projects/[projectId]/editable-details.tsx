"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CopyButton from "@/components/copy-button";
import Icons from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
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
import { updateProjectById } from "../action";
import { projectSchema, type ProjectFormValues } from "../create-project-modal";

export default function EditableDetails({
  initialValues,
}: {
  initialValues: ProjectFormValues & { id: string; shareUrl: string };
}) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    values: initialValues,
  });

  // Detecta o ambiente e define a URL base
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://boiderplatenext-01.vercel.app"
      : "http://localhost:3000";

  async function onSubmit(values: ProjectFormValues) {
    try {
      await updateProjectById(initialValues.id, values);
      toast({
        title: "Project updated successfully.",
      });
      form.reset();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error updating project.",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-6">
        {/* ID Field */}
        <FormItem>
          <FormLabel>ID</FormLabel>
          <FormControl>
            <div className="relative">
              <Input value={initialValues.id} readOnly disabled />
              <CopyButton content={initialValues.id} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="XYZ" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Domain Field */}
        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domínio</FormLabel>
              <FormControl>
                <Input placeholder="xyz.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Public URL Field */}
        <FormItem>
          <FormLabel>URL Pública</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                value={`${baseUrl}/project/${initialValues.shareUrl}`}
                readOnly
                disabled
              />
              <CopyButton
                content={`${baseUrl}/project/${initialValues.shareUrl}`}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>

        {/* Submit Button */}
        <Button
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
          type="submit"
        >
          {form.formState.isSubmitting && (
            <Icons.spinner className={"mr-2 h-5 w-5 animate-spin"} />
          )}
          Salvar
        </Button>
      </form>
    </Form>
  );
}
