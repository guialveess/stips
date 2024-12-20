"use client";

import { PrismaClient } from "@prisma/client";
import { MenuIcon } from "lucide-react";
import { Session } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import LogoutButton from "@/components/shared/logout-button";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function Navbar({
  session,
  headerText,
}: {
  session?: Session | null;
  headerText: {
    inicio: string;
    payment: string;
    Entrar: string;
    dashboard: string;
    settings: string;
    [key: string]: string;
  };
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="flex h-full items-center justify-between">
        <div className="hidden items-center gap-12 lg:flex 2xl:gap-16"></div>
        <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
          <SheetTrigger className="lg:hidden">
            <span className="sr-only">Abrir Menu</span>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent className="z-[9999]">
            <DialogHeader>
              <DialogTitle>Menu de Navegação</DialogTitle>
              <DialogDescription>
                Use o menu abaixo para navegar pelo site.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-10 py-10">
              <div className="space-y-4 text-center text-sm leading-loose text-muted-foreground">
                <Link
                  href="/"
                  className="block font-semibold hover:underline hover:underline-offset-4"
                  onClick={() => setIsModalOpen(false)}
                >
                  {headerText.inicio}
                </Link>
                {session && (
                  <Link
                    href="/dashboard/billing"
                    className="block font-semibold hover:underline hover:underline-offset-4"
                    onClick={() => setIsModalOpen(false)}
                  >
                    {headerText.payment}
                  </Link>
                )}
                {session ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block font-semibold hover:underline hover:underline-offset-4"
                      onClick={() => setIsModalOpen(false)}
                    >
                      {headerText.dashboard}
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="block font-semibold hover:underline hover:underline-offset-4"
                      onClick={() => setIsModalOpen(false)}
                    >
                      {headerText.settings}
                    </Link>
                    <LogoutButton className="!mt-20" />
                  </>
                ) : (
                  <Link
                    href="/login"
                    className={buttonVariants()}
                    onClick={() => setIsModalOpen(false)}
                  >
                    {headerText.Entrar}
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>

      {/* Conteúdo principal com blur aplicado */}
      <div
        className={cn(
          "transition-all duration-300",
          isModalOpen ? "backdrop-blur-sm pointer-events-none" : ""
        )}
      >
        {/* Substitua pelo conteúdo da sua página */}
      </div>
    </>
  );
}
