import { Session } from "@prisma/client";
import { connection } from "next/server";
import { getCurrentSession } from "@/lib/server/session";
import Navbar from "./navbar";

export default async function Header() {
  await connection();

  const { session }: { session: Session | null } = await getCurrentSession();

  const headerText = {
    inicio: "Início",
    payment: "Pagamento",
    settings: "Configurações",
    Entrar: "Entrar",
    dashboard: "Painel",
  };

  console.log("SSR session:", session);
  console.log("SSR headerText:", headerText);

  return (
    <header className="h-20 w-full">
      <div className="container h-full">
        <Navbar headerText={headerText} session={session || null} />
      </div>
    </header>
  );
}
