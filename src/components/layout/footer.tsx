import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { siteConfig } from "@/config/site";
import LocaleToggler from "../shared/locale-toggler";

export default function Footer() {
  return (
    <footer className="md:py- relative z-10 w-full border-t py-4">
      <div className="container flex items-center justify-between gap-4 md:h-14 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
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

        <div className="space-x-5">
          <Suspense>
            <LocaleToggler />
          </Suspense>
         
        </div>
      </div>
    </footer>
  );
}
