"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

const defaultSwatches = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#84cc16",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#d946ef",
  "#ec4899",
  "#f43f5e",
];

const predefinedGradients = [
  "linear-gradient(to top left,#accbee,#e7f0fd)",
  "linear-gradient(to top left,#d5d4d0,#eeeeec)",
  "linear-gradient(to top left,#000000,#434343)",
  "linear-gradient(to top left,#09203f,#537895)",
  "linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)",
  "linear-gradient(to top left,#f953c6,#b91d73)",
  "linear-gradient(to top left,#ee0979,#ff6a00)",
  "linear-gradient(to top left,#F00000,#DC281E)",
  "linear-gradient(to top left,#00c6ff,#0072ff)",
  "linear-gradient(to top left,#4facfe,#00f2fe)",
  "linear-gradient(to top left,#0ba360,#3cba92)",
  "linear-gradient(to top left,#FDFC47,#24FE41)",
  "linear-gradient(to top left,#8a2be2,#0000cd,#228b22,#ccff00)",
  "linear-gradient(to top left,#40E0D0,#FF8C00,#FF0080)",
  "linear-gradient(to top left,#fcc5e4,#fda34b,#ff7882,#c8699e,#7046aa,#0c1db8,#020f75)",
  "linear-gradient(to top left,#ff75c3,#ffa647,#ffe83f,#9fff5b,#70e2ff,#cd93ff)",
];

// Função para gerar gradientes aleatórios
const generateRandomGradient = (): string => {
  const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
  const angle = Math.floor(Math.random() * 360);
  return `linear-gradient(${angle}deg, ${randomColor()}, ${randomColor()})`;
};

export default function InputWithGradients({
  defaultValue = "#3b82f6",
  onChange,
  label = "Color",
  swatches = defaultSwatches,
  showOpacity = true,
}: {
  defaultValue?: string;
  onChange?: (color: string) => void;
  label?: string;
  swatches?: string[];
  showOpacity?: boolean;
}) {
  const [color, setColor] = useState(defaultValue);
  const [opacity, setOpacity] = useState(100);
  const [currentTab, setCurrentTab] = useState<string>(
    defaultValue.includes("gradient") ? "gradient" : "solid"
  );
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const finalColor = useMemo(() => {
    if (color.startsWith("linear-gradient")) return color; // Retorna gradiente diretamente
    const alpha = Math.round(opacity * 2.55)
      .toString(16)
      .padStart(2, "0");
    return `${color}${alpha}`;
  }, [color, opacity]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    onChange?.(newColor);
  };

  const handleCopy = () => {
    copyToClipboard(finalColor);
  };

  const handleGenerateRandomGradient = () => {
    const randomGradient = generateRandomGradient();
    handleColorChange(randomGradient);
  };

  return (
    <div className="relative z-10 min-h-[200px] w-full max-w-xs space-y-2">
      {label && (
        <label
          htmlFor="color-input"
          className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          {label}
        </label>
      )}

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="flex space-x-2">
          <TabsTrigger value="solid" className="flex-1">
            Sólido
          </TabsTrigger>
          <TabsTrigger value="gradient" className="flex-1">
            Gradiente
          </TabsTrigger>
        </TabsList>

        {/* Aba de Cores Sólidas */}
        <TabsContent value="solid" className="mt-4">
          <div className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-2">
              <div
                className="h-8 w-8 rounded-md border border-zinc-200 dark:border-zinc-700"
                style={{ backgroundColor: !color.startsWith("linear-gradient") ? finalColor : "" }}
              />
              <input
                id="color-input"
                type="text"
                value={!color.startsWith("linear-gradient") ? color.toUpperCase() : ""}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  if (/^#[0-9A-F]{0,6}$/i.test(value)) {
                    setColor(value);
                    if (value.length === 7) handleColorChange(value);
                  }
                }}
                className={cn(
                  "flex-1 rounded-md border border-zinc-200 px-2 py-1 dark:border-zinc-800",
                  "bg-white font-mono text-sm dark:bg-zinc-900",
                  "focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                )}
                placeholder="Digite a cor sólida"
              />

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
            </div>

            {showOpacity && !color.startsWith("linear-gradient") && (
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span>Opacidade</span>
                  <span>{opacity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className={cn(
                    "h-2 w-full appearance-none rounded-full",
                    "cursor-pointer bg-gradient-to-r from-transparent to-current"
                  )}
                  style={{ color }}
                />
              </div>
            )}

            <div className="mt-4 space-y-1.5">
              <div className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Cores pré-definidas
              </div>
              <div className="grid grid-cols-6 gap-1">
                {swatches.map((swatch) => (
                  <button
                    type="button"
                    key={swatch}
                    onClick={() => handleColorChange(swatch)}
                    className={cn(
                      "h-6 w-6 rounded-md border border-zinc-200 dark:border-zinc-700",
                      "relative transition-transform hover:scale-110"
                    )}
                    style={{ backgroundColor: swatch }}
                  >
                    {color === swatch && (
                      <Check
                        className={cn(
                          "absolute inset-0 m-auto h-4 w-4 text-white",
                          "drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                        )}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Aba de Gradientes */}
        <TabsContent value="gradient" className="mt-4">
          <div className="flex flex-wrap gap-1 mb-2">
            {predefinedGradients.map((gradient) => (
              <div
                key={gradient}
                style={{ background: gradient }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                onClick={() => handleColorChange(gradient)}
              />
            ))}
          </div>

          <input
  id="gradient-input"
  type="text"
  value={color}
  onChange={(e) => {
    const value = e.target.value;
    setColor(value); // Atualiza o estado do gradiente
    onChange?.(value); // Notifica o callback
  }}
  onBlur={(e) => {
    const value = e.target.value.trim();
    // Valida se é um gradiente válido antes de aplicar
    if (value.startsWith("linear-gradient") || value === "") {
      setColor(value);
      onChange?.(value);
    }
  }}
  className={cn(
    "w-full mt-4 rounded-md border border-zinc-200 px-2 py-1 dark:border-zinc-800",
    "bg-white font-mono text-sm dark:bg-zinc-900",
    "focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
  )}
  placeholder="Digite o gradiente"
/>



          <button
            type="button"
            onClick={handleGenerateRandomGradient}
            className="mt-4 flex items-center gap-2 rounded-md border border-zinc-200 bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            <RefreshCw className="h-4 w-4" />
            Gerar Gradiente Aleatório
          </button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
