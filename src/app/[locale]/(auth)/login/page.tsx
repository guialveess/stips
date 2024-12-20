"use client";

// aquele modal login bugado antigo que era pequeno.

import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthForm from "@/components/layout/auth-form";

export default function LoginModal() {
  const router = useRouter();
  const pathname = usePathname();

  const IsOpen = pathname.includes("/login");
  return (
    <Dialog open={IsOpen} onOpenChange={() => router.back()}>
      <DialogContent className="w-full max-w-[400px] rounded-md">
        <DialogHeader>
          <DialogTitle asChild>
            <h2 className="font-semibold tracking-tight transition-colors">
              Entrar
            </h2>
          </DialogTitle>
        </DialogHeader>
        <AuthForm />
      </DialogContent>
    </Dialog>
  );
}
