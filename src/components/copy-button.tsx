"use client";

import Icons from "./shared/icons";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

export default function CopyButton({ content }: { content: string }) {
  const copyToClipboard = (content: string) => {
    if (!navigator.clipboard) {
      toast({
        title: "Erro ao copiar!",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    }
    navigator.clipboard.writeText(content);
    toast({
      title: "ID do projeto copiado!",
    });
  };

  return (
    <Button
      type="button"
      className="absolute right-0 top-0 h-full"
      size="icon"
      variant="ghost"
      onClick={() => copyToClipboard(content)}
    >
      <span className="sr-only">Copiar</span>
      <Icons.copy className="h-3 w-3" />
    </Button>
  );
}
