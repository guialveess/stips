import React from "react";
import FlickeringGrid from "@/components/custom/flickering-grid";

interface PublicProjectLayoutProps {
  children: React.ReactNode;
}

export default function PublicProjectLayout({
  children,
}: PublicProjectLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Fundo com FlickeringGrid */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center">
          <FlickeringGrid
            className="absolute inset-0"
            squareSize={4}
            gridGap={6}
            color="#60A5FA"
            maxOpacity={0.5}
            flickerChance={0.1}
            height={1200} // Aumentar para cobrir todo o fundo
            width={1200}
          />
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="relative z-10 flex w-full max-w-4xl flex-col items-center">
        {children}
      </main>
    </div>
  );
}
