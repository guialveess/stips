"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Feature {
  name: string;
  highlight?: boolean;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: number | "Grátis";
  description: string;
  features: Feature[];
  highlight?: boolean;
  cta?: string;
  billingCycle?: string;
}

const defaultTiers: PricingTier[] = [
  {
    name: "Grátis",
    price: "Grátis",
    description: "Para quem está começando com personalização básica.",
    features: [
      { name: "Até 1 link personalizável", included: true },
      { name: "Estatísticas simples", included: true },
      { name: "Temas básicos", included: true },
      { name: "Subdomínio (ex: meusite.aplicacao.com)", included: true },
      { name: "Remoção de marca", included: false },
      { name: "Suporte 24 horas", included: false },
    ],
    cta: "Comece agora",
  },
  {
    name: "Pro",
    price: 19.9,
    description: "Para profissionais com acesso completo e suporte premium.",
    highlight: true,
    billingCycle: "mês",
    features: [
      { name: "Até 10 links personalizáveis", included: true },
      { name: "Estatísticas avançadas", included: true },
      { name: "Templates premium", included: true },
      { name: "Domínio personalizado", included: true },
      { name: "Remoção de marca", included: true },
      { name: "Suporte 24 horas", included: true },
    ],
    cta: "Assine agora",
  },
];

export default function PricingPlans({
  tiers = defaultTiers,
}: {
  tiers?: PricingTier[];
}) {
  const [showAlert, setShowAlert] = useState(false);

  const handleButtonClick = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000); // Alerta desaparece após 5 segundos
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "group relative",
              "rounded-2xl transition-all duration-500",
              tier.highlight
                ? "bg-gradient-to-b from-neutral-950 to-neutral-900 dark:from-neutral-900 dark:to-neutral-950"
                : "bg-white dark:bg-neutral-900",
              "border border-neutral-200 dark:border-neutral-800",
              "hover:border-neutral-300 dark:hover:border-neutral-700",
              "hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.3)]"
            )}
          >
            <div className="flex h-full flex-col p-10">
              <div className="space-y-4">
                <h3
                  className={cn(
                    "text-lg font-medium uppercase tracking-wider",
                    tier.highlight
                      ? "text-white"
                      : "text-neutral-900 dark:text-white"
                  )}
                >
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "text-5xl font-light",
                      tier.highlight
                        ? "text-white"
                        : "text-neutral-900 dark:text-white"
                    )}
                  >
                    {typeof tier.price === "number"
                      ? `R$ ${tier.price}`
                      : tier.price}
                  </span>
                  {tier.billingCycle && (
                    <span
                      className={cn(
                        "text-sm",
                        tier.highlight
                          ? "text-neutral-400"
                          : "text-neutral-500 dark:text-neutral-400"
                      )}
                    >
                      /{tier.billingCycle}
                    </span>
                  )}
                </div>
                <p
                  className={cn(
                    "border-b pb-6 text-sm",
                    tier.highlight
                      ? "border-neutral-800 text-neutral-400"
                      : "border-neutral-200 text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
                  )}
                >
                  {tier.description}
                </p>
              </div>

              <div className="mt-8 flex-grow space-y-4">
                {tier.features.map((feature) => (
                  <div key={feature.name} className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                        feature.included
                          ? tier.highlight
                            ? "text-white"
                            : "text-neutral-900 dark:text-white"
                          : "text-neutral-300 dark:text-neutral-700"
                      )}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span
                      className={cn(
                        "text-sm",
                        tier.highlight
                          ? "text-neutral-300"
                          : "text-neutral-600 dark:text-neutral-300"
                      )}
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button
                  onClick={handleButtonClick}
                  className={cn(
                    "group relative h-12 w-full",
                    tier.highlight
                      ? "bg-white text-neutral-900 hover:bg-neutral-100"
                      : "bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100",
                    "transition-all duration-300"
                  )}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 font-medium tracking-wide">
                    {tier.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerta */}
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 w-full max-w-xl mx-auto bg-gradient-to-b from-violet-50 to-white dark:from-violet-950/20 dark:to-zinc-950 border border-violet-100 dark:border-violet-900/50 shadow-lg rounded-xl p-4"
        >
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-fuchsia-500 via-violet-500 to-indigo-500 dark:from-fuchsia-600 dark:via-violet-600 dark:to-indigo-600">
              <Check className="h-5 w-5 text-white" />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-violet-900 dark:text-violet-100">
                Notificação 🎉
              </h3>
              <p className="text-sm text-violet-600 dark:text-violet-300">
                Quando o serviço estiver disponível, você será notificado!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
