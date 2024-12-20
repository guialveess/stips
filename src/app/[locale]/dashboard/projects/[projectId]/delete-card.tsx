"use client";
import { useTransition } from "react";
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
  const [pending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (!id) {
      console.error("ID do projeto não foi fornecido.");
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
    <Card className="mt-5 flex items-center justify-between p-6">
      <div>
        <CardTitle className="mb-2.5">Deletar Projeto</CardTitle>
        <CardDescription>
          O projeto será excluído permanentemente. Esta ação é irreversível e
          não pode ser desfeito.
        </CardDescription>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" disabled={pending}>
            {pending && <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />}
            Deletar
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={handleDelete} disabled={pending}>
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
  );
}
