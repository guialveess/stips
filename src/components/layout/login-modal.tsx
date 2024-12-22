"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { Button } from "@/components/ui/button";
import AuthForm from "./auth-form";

export default function LoginModal() {
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = pathname.includes("/login");

  return (
    <Credenza open={isOpen} onOpenChange={() => router.back()}>
      <Button
        disabled={false}
        className="hidden" // O botão fica oculto, já que a abertura depende da rota
      >
        Login
      </Button>
      <CredenzaContent className="h-fit gap-0 border bg-background p-0 max-w-[400px]">
        <CredenzaHeader className="border-b p-5">
          <CredenzaTitle className="font-semibold text-foreground">
            Entrar
          </CredenzaTitle>
          <CredenzaDescription className="font-medium text-muted-foreground">
            Por favor, faça login para continuar.
          </CredenzaDescription>
        </CredenzaHeader>
        <div className="space-y-4 p-5">
          <AuthForm />
        </div>
      </CredenzaContent>
    </Credenza>
  );
}
