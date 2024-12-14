import { Session } from "@prisma/client";
import { connection } from "next/server";
import { getCurrentSession } from "@/lib/server/session";
import { getScopedI18n } from "@/locales/server";
import Navbar from "./navbar";

export default async function Header() {
  await connection();

  const { session }: { session: Session | null } = await getCurrentSession();
  const scopedT = await getScopedI18n("header");

  const headerText = {
    changelog: scopedT("changelog"),
    about: scopedT("about"),
    Entrar: scopedT("login"),
    dashboard: scopedT("dashboard"),
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
