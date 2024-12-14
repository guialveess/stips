import { connection } from "next/server";
import { getCurrentSession } from "@/lib/server/session";
import { getScopedI18n } from "@/locales/server";
import Navbar from "./navbar";

export default async function Header() {
  // Inicializa a conexão (opcional, considere mover para um middleware global)
  await connection();

  // Obtém dados de sessão
  const { session } = await getCurrentSession();

  // Obtém traduções localizadas
  const scopedT = await getScopedI18n("header");

  // Construção do texto do cabeçalho
  const headerText = {
    changelog: scopedT("changelog"),
    about: scopedT("about"),
    Entrar: scopedT("login"),
    dashboard: scopedT("dashboard"),
  };

  // Verifique se os valores são consistentes
  console.log("SSR session:", session);
  console.log("SSR headerText:", headerText);

  return (
    <header className="h-20 w-full">
      <div className="container h-full">
        <Navbar headerText={headerText} session={session!} />
      </div>
    </header>
  );
}
