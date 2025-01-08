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
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-30">
        <div className="absolute inset-0 overflow-hidden">
          <FlickeringGrid
            className="fixed inset-0 skew-y-12 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)] sm:[mask-image:radial-gradient(450px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(550px_circle_at_center,white,transparent)]"
            squareSize={4}
            gridGap={6}
            color="#FFFAEC"
            maxOpacity={0.9}
            flickerChance={0.1}
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
