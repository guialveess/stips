"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Icons from "@/components/shared/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { deleteProjectById } from "../action";

export default function DeleteCard({ id }: { id: string }) {
  const router = useRouter(); // Para redirecionamento
  const [pending, startTransition] = useTransition();
  const [confirmationText, setConfirmationText] = useState("");

  const handleDelete = () => {
    if (!id) {
      toast({
        title: "Erro ao excluir projeto.",
        description: "ID do projeto inválido.",
        variant: "destructive",
      });
      return;
    }

    startTransition(() =>
      deleteProjectById(id)
        .then(() => {
          toast({
            title: "Projeto excluído com sucesso.",
          });
          // Redireciona para a página de projetos após exclusão
          router.push("/dashboard/projects");
        })
        .catch((error) => {
          console.error("Erro ao excluir projeto:", error);
          toast({
            title: "Erro ao excluir projeto.",
            description: "Tente novamente mais tarde.",
            variant: "destructive",
          });
        })
    );
  };

  return (
    <div className="mt-12 min-h-screen items-center justify-center">
      <Card className="relative h-full rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-zinc-300 dark:border-zinc-800 dark:bg-black/5 dark:hover:border-zinc-700">
        <div>
          <CardTitle className="mb-2.5">Deletar Projeto</CardTitle>
          <CardDescription>
            O projeto será excluído permanentemente. Esta ação é irreversível e
            não pode ser desfeita.
          </CardDescription>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" disabled={pending} className="mt-4">
              {pending && (
                <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
              )}
              Deletar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-md w-full rounded-lg px-8 " >
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
              <p className="text-sm text-muted-foreground">
                Para confirmar, digite{" "}
                <span className="font-semibold">DELETE</span> no campo abaixo.
              </p>
            </AlertDialogHeader>
            <div className="mt-4">
              <input
                type="text"
                placeholder="Digite DELETE"
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-transparent"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={confirmationText !== "DELETE" || pending}
                >
                  {pending && (
                    <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                  )}
                  Deletar
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Card>
    </div>
  );
}
