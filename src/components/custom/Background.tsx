"use client";

import { useEffect } from "react";

export function Background({ background }: { background: string | undefined }) {
  useEffect(() => {
    // Define o estilo de fundo no body
    document.body.style.backgroundColor = background || "transparent";
    document.body.style.backgroundImage = background?.startsWith("http")
      ? `url(${background})`
      : "none";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    return () => {
      // Limpa os estilos ao desmontar o componente
      document.body.style.backgroundColor = "";
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
    };
  }, [background]);

  return null; // Este componente não precisa renderizar nada
}
