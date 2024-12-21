"use client";
import { CheckCircle2 } from "lucide-react";
import { Send } from "lucide-react"; // Ícone do avião
import { useState } from "react";
import { Badge } from "./ui/badge";

export default function WaitingList() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="relative rounded-xl border border-zinc-200 bg-zinc-50 p-4 shadow-[0_1px_6px_0_rgba(0,0,0,0.02)] dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex gap-3">
          <div className="rounded-full p-2">
            <div className="rounded-full bg-white dark:bg-zinc-900">
              <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-600" />
            </div>
          </div>

          <div className="space-y-0.5">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Estamos quase prontos!
            </h3>
            <p className="text-[13px] text-zinc-500 dark:text-zinc-400">
              Inscreva-se na lista de espera e seja avisado quando o site
              estiver disponível!
            </p>
          </div>
        </div>
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex items-center gap-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Digite seu e-mail"
              className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-700 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            />
            {/* Botão adaptado para telefone */}
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 sm:h-auto sm:w-auto sm:gap-2 sm:rounded-lg sm:px-4 sm:py-2"
            >
              <Send className="h-5 w-5 text-white sm:hidden" />
              <span className="hidden text-sm font-medium text-white sm:inline">
                Inscrever-se
              </span>
            </button>
          </form>
        ) : (
          <Badge
            variant="outline"
            className="mt-6 text-pretty bg-amber-50 pl-4 text-sm font-semibold text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
          >
            Obrigado! Você será notificado quando estivermos ao vivo 😊.
          </Badge>
        )}
      </div>
    </div>
  );
}
