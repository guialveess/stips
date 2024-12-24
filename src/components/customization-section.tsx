"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { updateCustomization } from "@/app/[locale]/dashboard/projects/action";

export default function CustomizationSection({
  projectId,
  initialCustomizations,
}: {
  projectId: string;
  initialCustomizations: { key: string; value: string }[];
}) {
  const [background, setBackground] = useState(
    initialCustomizations.find((c) => c.key === "background")?.value || ""
  );
  const [pending, setPending] = useState(false);

  const saveBackground = async () => {
    setPending(true);
    try {
      if (background) {
        await updateCustomization(projectId, "background", background);
        toast({ title: "Background atualizado com sucesso!" });
      } else {
        await updateCustomization(projectId, "background", "");
        toast({ title: "Background removido com sucesso!" });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao atualizar background.",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setPending(false);
    }
  };

  const removeBackground = async () => {
    setPending(true);
    try {
      await updateCustomization(projectId, "background", "");
      setBackground(""); // Atualiza o estado local
      toast({ title: "Background removido com sucesso!" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao remover background.",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="mt-12 min-h-screen items-center justify-center">
      <Card className="w-full max-w-2xl p-6">
        <div>
          <CardTitle className="mb-2.5">Customizar Projeto</CardTitle>
          <CardDescription>
            Aqui você pode personalizar a aparência do seu projeto, como o
            background. Salve ou remova o background para restaurar o padrão.
          </CardDescription>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              URL do Background
            </label>
            <Input
              placeholder="Insira a URL do Background"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              disabled={pending}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={saveBackground} disabled={pending || !background}>
              {pending && (
                <svg
                  className="mr-2 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                  ></path>
                </svg>
              )}
              Salvar
            </Button>
            <Button
              variant="secondary"
              onClick={removeBackground}
              disabled={pending || !background}
            >
              {pending && (
                <svg
                  className="mr-2 h-5 w-5 animate-spin text-gray-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 11-8 8z"
                  ></path>
                </svg>
              )}
              Remover
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
