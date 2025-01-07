"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CopyButton from "@/components/copy-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { updateProjectById, updateCustomization } from "../action";
import { projectSchema, type ProjectFormValues } from "../create-project-modal";
import { Badge } from "@/components/ui/badge";
import { distance } from "framer-motion";

export default function EditableDetails({
  initialValues,
}: {
  initialValues: ProjectFormValues & {
    id: string;
    shareUrl: string;
    socialLinks: { name?: string; url: string }[];
    customizations?: { key: string; value: string }[];
  };
}) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    values: initialValues,
  });

  const newLinkForm = useForm<{ name: string; url: string }>({
    defaultValues: { name: "", url: "" },
  });

  const [background, setBackground] = useState(
    initialValues.customizations?.find((c) => c.key === "background")?.value ||
      ""
  );

  const removeLink = async (index: number) => {
    try {
      const updatedLinks = initialValues.socialLinks.filter(
        (_, i) => i !== index
      );

      await updateProjectById(initialValues.id, {
        ...initialValues,
        socialLinks: updatedLinks,
      });

      toast({ title: "Social link removed successfully." });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error removing social link.",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedLink, setEditedLink] = useState<{ name?: string; url: string }>({
    name: "",
    url: "",
  });

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://stipss.vercel.app"
      : "http://localhost:3000";

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      await updateProjectById(initialValues.id, values);

      if (
        background !==
        initialValues.customizations?.find((c) => c.key === "background")?.value
      ) {
        await updateCustomization(initialValues.id, "background", background);
      }

      toast({ title: "Projeto atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao atualizar o projeto",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    }
  };

  const addNewLink = async (data: { name: string; url: string }) => {
    try {
      const updatedLinks = [
        ...initialValues.socialLinks,
        { name: data.name, url: data.url },
      ];

      await updateProjectById(initialValues.id, {
        ...initialValues,
        socialLinks: updatedLinks,
      });

      toast({ title: "Rede social adicionada com sucesso" });
      newLinkForm.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao adicionar rede social",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    }
  };

  const saveEditedLink = async () => {
    if (editingIndex === null) return;

    try {
      const updatedLinks = initialValues.socialLinks.map((link, index) =>
        index === editingIndex ? editedLink : link
      );

      await updateProjectById(initialValues.id, {
        ...initialValues,
        socialLinks: updatedLinks,
      });

      toast({ title: "Rede social atualizada com sucesso" });
      setEditingIndex(null);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao atualizar rede social",
        description: "Tente novamente mais tarde",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-12 min-h-screen items-center justify-center">
      {/* Card: Basic Info */}
      <div className="relative h-full rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-zinc-300 dark:border-zinc-800 dark:bg-black/5 dark:hover:border-zinc-700">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Badge
              variant="secondary"
              className="mt-2 border-amber-200/50 bg-gradient-to-r from-amber-100 to-amber-200 px-2 py-0.5 text-medium font-medium text-amber-700 dark:border-amber-800/50 dark:from-amber-900/50 dark:to-amber-800/50 dark:text-amber-400"
            >
              Detalhes do seu Projeto
            </Badge>
            <div className="mt-4 space-y-4">
              {/* Project ID */}
              <div>
                <FormLabel>ID</FormLabel>
                <div className="flex items-center gap-2">
                  <Input value={initialValues.id} readOnly />
                  <CopyButton content={initialValues.id} />
                </div>
              </div>
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="XYZ" />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Domain */}
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domínio</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="example.com" />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Public URL */}
              <div>
                <FormLabel>URL Pública</FormLabel>
                <div className="flex items-center gap-2">
                  <Input
                    value={`${baseUrl}/project/${initialValues.shareUrl}`}
                    readOnly
                  />
                  <CopyButton
                    content={`${baseUrl}/project/${initialValues.shareUrl}`}
                  />
                </div>
              </div>
              {/* Save Button */}
              <Button
                type="submit"
                className="mt-4 w-full rounded-xl bg-zinc-800 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
              >
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Card: Social Links */}
      <div className="relative h-full rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-zinc-300 dark:border-zinc-800 dark:bg-black/5 dark:hover:border-zinc-700">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m3-3h4m-4 0a2 2 0 01-2 2m2-2a2 2 0 002 2m4 0a2 2 0 002-2m-2 2a2 2 0 01-2-2"
            />
          </svg>
          Redes Sociais
        </h2>
        <div className="mt-4">
          <Badge
            variant="secondary"
            className="mt-2 border-amber-200/50 bg-gradient-to-r from-amber-100 to-amber-200 px-2 py-0.5 text-xs font-medium text-amber-700 dark:border-amber-800/50 dark:from-amber-900/50 dark:to-amber-800/50 dark:text-amber-400"
          >
            Links das redes sociais
          </Badge>
          <Table>
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
                          <Button
                            onClick={() => {
                              setEditingIndex(index);
                              setEditedLink(link);
                            }}
                            type="button"
                          >
                            Editar
                          </Button>
                          <Button
                            onClick={() => removeLink(index)}
                            type="button"
                            variant="destructive"
                          >
                            Remover
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Add New Link */}
        <div className="mt-6">
          <Form {...newLinkForm}>
            <form onSubmit={newLinkForm.handleSubmit(addNewLink)}>
              <div className="flex gap-4">
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
              </div>
              <Button
                type="submit"
                className="mt-4 w-full rounded-xl bg-zinc-800 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
                disabled={
                  !newLinkForm.watch("name") || !newLinkForm.watch("url")
                } // Desativa o botão se nome ou URL estiver vazio
              >
                Adicionar Rede Social
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
