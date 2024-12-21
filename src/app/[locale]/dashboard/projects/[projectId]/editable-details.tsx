"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function EditableDetails({
  initialValues,
}: {
  initialValues: ProjectFormValues & {
    id: string;
    shareUrl: string;
    socialLinks: { name?: string; url: string }[];
  };
}) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    values: initialValues,
  });

  const newLinkForm = useForm<{ name: string; url: string }>({
    defaultValues: { name: "", url: "" },
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedLink, setEditedLink] = useState<{ name?: string; url: string }>({
    name: "",
    url: "",
  });

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://stipss.vercel.app"
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

  async function addNewLink(data: { name: string; url: string }) {
    try {
      const updatedLinks = [
        ...initialValues.socialLinks,
        { name: data.name, url: data.url },
      ];
      await updateProjectById(initialValues.id, {
        ...initialValues,
        socialLinks: updatedLinks,
      });
      toast({
        title: "Social link added successfully.",
      });
      newLinkForm.reset();
    } catch (error) {
      console.log(error);
      toast({
        title: "Error adding social link.",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }

  async function saveEditedLink() {
    if (editingIndex === null) return;

    try {
      const updatedLinks = initialValues.socialLinks.map((link, index) =>
        index === editingIndex ? editedLink : link
      );

      await updateProjectById(initialValues.id, {
        ...initialValues,
        socialLinks: updatedLinks,
      });

      toast({
        title: "Social link updated successfully.",
      });

      setEditingIndex(null); // Exit edit mode
    } catch (error) {
      console.log(error);
      toast({
        title: "Error updating social link.",
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

        {/* Social Links */}
        {initialValues.socialLinks?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-medium">Redes Sociais</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>Links das redes sociais associadas.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {initialValues.socialLinks.map((link, index) => (
                    <TableRow key={index}>
                      {editingIndex === index ? (
                        <>
                          <TableCell>
                            <Input
                              value={editedLink.name || ""}
                              onChange={(e) =>
                                setEditedLink({
                                  ...editedLink,
                                  name: e.target.value,
                                })
                              }
                              placeholder="Nome"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={editedLink.url}
                              onChange={(e) =>
                                setEditedLink({
                                  ...editedLink,
                                  url: e.target.value,
                                })
                              }
                              placeholder="URL"
                            />
                          </TableCell>
                          <TableCell>
                            <Button onClick={saveEditedLink} type="button">
                              Salvar
                            </Button>
                          </TableCell>
                        </>
                      ) : (
                        <>
                          <TableCell>{link.name || "N/A"}</TableCell>
                          <TableCell>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {link.url}
                            </a>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {/* Botão de Editar */}
                              <Button
                                onClick={() => {
                                  setEditingIndex(index);
                                  setEditedLink(link);
                                }}
                                type="button"
                              >
                                Editar
                              </Button>

                              {/* Botão de Copiar funcional para cada rede social */}
                            </div>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Add New Social Link */}
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-medium">Adicionar Nova Rede Social</h3>
          <FormField
            control={newLinkForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Instagram" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={newLinkForm.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://instagram.com/seulink"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            onClick={newLinkForm.handleSubmit(addNewLink)}
            className="w-full"
            type="button"
          >
            Adicionar
          </Button>
        </div>

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
