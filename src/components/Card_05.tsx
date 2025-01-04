import {
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BadgeAnimatedBorder } from "@/components/BadgeAnimatedBorder";

interface Card05Props {
  category?: string;
  title?: string;
  socialLinks?: { name?: string; url: string }[];
  className?: string;
}

export default function Card_05({
  category = "Social Links",
  title = "", // Deixe o título como um valor padrão vazio
  socialLinks = [],
}: Card05Props) {
  return (
    <div className="relative mt-6 mx-auto max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-lg transition-all duration-300 hover:border-zinc-300 dark:border-zinc-800 dark:bg-black/5 dark:hover:border-zinc-700">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start gap-3">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-zinc-100 p-3 dark:bg-zinc-800/50">
            <Activity className="h-6 w-6 text-[#FF2D55]" />
          </div>
          <BadgeAnimatedBorder variant="outline" className="text-xs font-medium">
          {category}
        </BadgeAnimatedBorder>
        </div>
       
      </div>

      {/* Social Links */}
      <div className="space-y-6">
        {socialLinks.length > 0 ? (
          socialLinks.map((link, index) => (
            <div
              key={index}
              className="flex justify-between rounded-xl border border-zinc-200/50 bg-zinc-50 p-6 transition-all hover:border-zinc-300/50 dark:border-zinc-800/50 dark:bg-zinc-900/50 dark:hover:border-zinc-700/50"
            >
              {/* Container dos textos */}
              <div className="flex flex-col items-start">
                <Badge className="flex items-center gap-2 px-3 rounded-full
                    bg-amber-50 dark:bg-amber-900/30
                    text-amber-600 dark:text-amber-400
                    text-sm font-medium">
                  {link.name || "Rede Social"}
                </Badge>
                <p
                  className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 truncate"
                  title={link.url}
                >
                  {link.url}
                </p>
              </div>

              {/* Ícone de link */}
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 self-start text-orange-600 hover:underline"
              >
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Nenhuma rede social conectada.
          </p>
        )}
      </div>
    </div>
  );
}
