"use client";

import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { toast } from "@/hooks/use-toast";

export default function CopyButton({ content }: { content: string }) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({
    timeout: 2000, // Tempo para exibir o ícone de check
  });

  const handleCopy = () => {
    if (!content) {
      toast({
        title: "Erro ao copiar!",
        description: "Conteúdo inválido para cópia.",
        variant: "destructive",
      });
      return;
    }

    // Usa o método do hook para copiar
    copyToClipboard(content);

    // Notificação de sucesso
    toast({
      title: "Copiado para a área de transferência!",
    });
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="ml-2 hover:opacity-70"
    >
      {isCopied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4 text-zinc-500" />
      )}
    </button>
  );
}
