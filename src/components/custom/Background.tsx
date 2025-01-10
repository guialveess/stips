"use client";

import { useEffect } from "react";

export function Background({ background }: { background?: string }) {
  useEffect(() => {
    // Define o estilo de fundo no body
    if (background) {
      if (background.startsWith("linear-gradient") || background.startsWith("radial-gradient")) {
        // Caso seja um gradiente
        document.body.style.backgroundImage = background;
        document.body.style.backgroundColor = "transparent";
      } else if (background.startsWith("http")) {
        // Caso seja uma URL de imagem
        document.body.style.backgroundImage = `url(${background})`;
        document.body.style.backgroundColor = "transparent";
      } else {
        // Caso seja uma cor sólida
        document.body.style.backgroundColor = background;
        document.body.style.backgroundImage = "none";
      }
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundRepeat = "no-repeat";
    }

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
