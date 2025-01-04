import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export const BrowserComponent: React.FC<{
  children?: React.ReactNode;
  className?: string;
  shareUrl?: string;
  userPicture?: string; // Adicionado para passar a imagem do usuário
}> = ({ className, children, shareUrl, userPicture }) => (
  <div
    className={cn(
      "group relative mx-auto max-w-lg rounded-3xl border bg-white text-sm text-neutral-950 shadow-2xl shadow-gray-300 dots-gray-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:shadow-lg dark:dots-neutral-800",
      "mb-8 px-4 pb-20",
      className
    )}
  >
    {/* Hover Effect */}
    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 duration-1000 group-hover:opacity-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-white/0 to-white/0 dark:opacity-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-900/0 to-zinc-900/0 opacity-0 dark:opacity-100" />
    </div>

    {/* Imagem do Usuário */}
    {userPicture && (
      <div className="absolute top-4 left-4 z-10 flex items-center justify-center h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800">
        <Image
          src={userPicture}
          alt="User avatar"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
      </div>
    )}

    {/* Arrow Link */}
    <a
      href={shareUrl || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute top-4 right-4 z-10 flex items-center justify-center h-8 w-8 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 opacity-0 transition-opacity duration-1000 group-hover:opacity-100 hover:bg-neutral-300 dark:hover:bg-neutral-700"
      aria-label="Go to link"
    >
      <ArrowUpRight className="h-4 w-4" />
    </a>

    {/* Content */}
    <div className="relative flex flex-col w-full pt-12 pb-16">{children}</div>
  </div>
);
