"use client";

import { usePathname } from "next/navigation";
import { User } from "@/components/custom/user";

type ConditionalUserProps = {
  user: { name: string; picture: string } | null;
  isPro: boolean;
};

export default function ConditionalUser({ user, isPro }: ConditionalUserProps) {
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith("/project/");

  if (!user || isProjectPage) {
    return null; // Não renderiza o componente se for a página do projeto ou o usuário não estiver logado
  }

  return (
    <User
      name={user.name || "Usuário"}
      subline={isPro ? "Plano PRO" : "Free"}
      avatarProps={{
        src: user.picture || "/default-avatar.png",
        alt: user.name || "Usuário",
      }}
      tag={isPro ? "PRO" : undefined}
      tagProps={{
        label: isPro ? "PRO" : undefined,
        variant: "success",
      }}
      className="cursor-pointer"
    />
  );
}
