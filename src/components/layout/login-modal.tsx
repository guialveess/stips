"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthForm from "./auth-form";

export default function LoginModal() {
  const router = useRouter();
  const pathname = usePathname();

  const IsOpen = pathname.includes("/login");
  return (
    <Dialog open={IsOpen} onOpenChange={() => router.back()}>
      <DialogContent className="w-full max-w-[400px] rounded-lg shadow-lg borde">
        <DialogHeader className="text-center">
          <DialogTitle asChild>
            <h2 className="font-bold text-2xl text-black tracking-tight dark:text-white">
              Bem-vindo de volta!
            </h2>
          </DialogTitle>
          <p className="text-sm text-gray-500 mt-2">
            Faça login na sua conta para continuar.
          </p>
        </DialogHeader>
        <div className="px-6 py-4">
          <AuthForm />
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>
            Não tem uma conta?{" "}
            <a
              href="/"
              className="text-blue-500 hover:underline font-medium"
            >
              Registre-se agora
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
