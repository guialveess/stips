import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t py-4 bg-neutral-50 dark:bg-neutral-900 mt-14">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row md:h-10">
        {/* Texto no lado esquerdo */}
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-1">
          <p className="text-center text-xs leading-relaxed text-muted-foreground md:text-left">
            Desenvolvido por{" "}
            <Link
              href={siteConfig().links.portifolio}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4 hover:text-primary"
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
