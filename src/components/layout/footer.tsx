import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t bg-neutral-50 py-4 dark:bg-neutral-950">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-10 md:flex-row">
        {/* Texto no lado esquerdo */}
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-1">
          <p className="text-center text-xs leading-relaxed text-muted-foreground md:text-left">
            Desenvolvido por{" "}
            <Link
              href={siteConfig().links.portifolio}
              target="_blank"
              rel="noopener noreferrer"
              className=" rounded-full bg-amber-50 px-2 text-xs font-medium text-amber-600 underline hover:text-primary dark:bg-amber-900/30 dark:text-amber-400"
            >
              guiialvess
            </Link>
          </p>
        </div>

        {/* Texto de direitos autorais */}
        <div className="flex items-center space-x-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
