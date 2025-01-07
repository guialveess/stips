"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { updateCustomization } from "@/app/[locale]/dashboard/projects/action";
import Input_08 from "@/components/custom/ColorPicker";

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

  const resetBackground = async () => {
    setPending(true);
    try {
      await updateCustomization(projectId, "background", ""); // Remove o valor no backend
      setBackground(""); // Reseta o estado local para vazio
      toast({ title: "Background resetado para o padrão com sucesso!" });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao resetar background.",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex">
  <Card className="max-w-md w-full rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:border-zinc-300 dark:border-zinc-800 dark:bg-black/5 dark:hover:border-zinc-700">
    <div>
      <CardTitle className="mb-2.5">Customizar Projeto</CardTitle>
      <CardDescription>
        Aqui você pode personalizar a aparência do seu projeto, como o
        background.
      </CardDescription>
    </div>

    <div className="mt-4 space-y-4">
      {/* Substituindo HexPicker por Input_08 */}
      <Input_08
        defaultValue={background}
        onChange={setBackground}
        label="Cor de Background"
      />
      <div className="flex items-center space-x-4">
        <Button onClick={saveBackground} disabled={pending || !background}>
          Salvar
        </Button>
        <Button
          variant="secondary"
          onClick={resetBackground}
          disabled={pending || !background}
        >
          Resetar para padrão
        </Button>
      </div>
    </div>
  </Card>
</div>

  );
}
