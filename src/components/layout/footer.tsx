import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import LocaleToggler from "../shared/locale-toggler";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t py-2">
      <div className="container flex items-center justify-between gap-2 md:h-10 md:flex-row">
        {/* Texto no lado esquerdo */}
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-1">
          <p className="text-center text-xs leading-relaxed text-muted-foreground md:text-left">
            developed by{" "}
            <Link
              href={siteConfig().links.portifolio}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              guiialvess
            </Link>
          </p>
        </div>

        {/* Alternador de idioma no lado direito */}
        <div className="space-x-3">
          <Suspense>
            <LocaleToggler />
          </Suspense>
        </div>
      </div>
    </footer>
  );
}