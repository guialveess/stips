"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Garante que o tema está sincronizado após a montagem
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Exibe um fallback durante a hidratação
  if (!mounted) {
    return (
      <Button
        className="rounded-full w-8 h-8 bg-background mr-2"
        variant="outline"
        size="icon"
      >
        <span className="sr-only">Trocar Tema</span>
      </Button>
    );
  }

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            className="rounded-full w-8 h-8 bg-background mr-2"
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <SunIcon className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
            <MoonIcon className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-100 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">Trocar Tema</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Trocar Tema</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
