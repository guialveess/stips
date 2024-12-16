"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { useState, useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Marca o componente como montado
  }, []);

  if (!mounted) {
    // Evita renderizar o ThemeProvider até que o cliente esteja montado
    return <>{children}</>;
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
