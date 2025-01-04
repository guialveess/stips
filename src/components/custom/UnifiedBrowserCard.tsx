import { BentoCard, BentoGrid } from "@/components/custom/BentoGrid";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

interface UnifiedBrowserCardProps {
  category?: string;
  title?: string;
  socialLinks?: { name?: string; url: string }[];
  className?: string;
}

export const UnifiedBrowserCard: React.FC<UnifiedBrowserCardProps> = ({
  category = "Social Links",
  title = "Connected Platforms",
  socialLinks = [],
  className,
}) => {
  const features = socialLinks.length
    ? socialLinks.map((link, index) => ({
        name: link.name || "Rede Social",
        description: link.url,
        href: link.url,
        cta: "Visitar",
        Icon: ArrowUpRight,
        background: (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-100 to-blue-300 dark:from-zinc-800 dark:to-zinc-900 opacity-20"></div>
        ),
        className: `lg:col-start-${(index % 3) + 1} lg:col-end-${
          (index % 3) + 2
        }`,
      }))
    : [
        {
          name: "Nenhuma Rede Social",
          description: "Nenhum link conectado.",
          href: "#",
          cta: "",
          Icon: ArrowUpRight,
          background: (
            <div className="absolute inset-0 rounded-xl bg-gray-100 dark:bg-gray-800 opacity-20"></div>
          ),
          className: "lg:col-start-1 lg:col-end-4",
        },
      ];

  return (
    <div
      className={`relative mx-auto max-w-6xl ${className}`}
    >
      <h2 className="mb-8 text-center text-3xl font-bold text-zinc-900 dark:text-white">
        {title}
      </h2>
      <p className="mb-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
        {category}
      </p>
      <BentoGrid className="grid-rows-auto gap-4">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    </div>
  );
};
