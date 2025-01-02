import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "@/lib/utils";
import "../globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { getCurrentSession } from "@/lib/server/session"; // Para buscar a sessão do usuário
import { getUserSubscriptionPlan } from "@/actions/subscription"; // Para verificar o plano do usuário
import { User } from "@/components/custom/user"; // Novo componente `User`

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

type Props = {
  children: React.ReactNode;
  loginDialog: React.ReactNode;
  headerClassName?: string; // Classe adicional para personalizar o header
};

export default async function RootLayout({
  children,
  loginDialog,
  headerClassName = "",
}: Props) {
  // Busca a sessão e o usuário logado
  const { user } = await getCurrentSession();

  let isPro = false;
  if (user) {
    const subscriptionPlan = await getUserSubscriptionPlan(user.id);
    isPro = subscriptionPlan.isPro;
  }

  return (
    <html lang="en">
      <body
        className={cn(
          "font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider>
          <header
            className={cn(
              "absolute right-0 top-0 z-[50] w-full",
              headerClassName
            )}
          >
            <nav className="flex items-center justify-between px-4 py-2">
              {/* Conteúdo no lado esquerdo */}
              <div className="flex items-center">
                <span className="text-lg font-bold">
                  <Header />
                </span>
              </div>

              {/* O componente ThemeToggle precisa ser cliente */}
              <div className="flex items-center gap-4">
                {user && (
                  <User
                    name={user.name || "Usuário"}
                    subline={isPro ? "Plano PRO" : "Plano Free"}
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
                )}
                <ThemeToggle />
              </div>
            </nav>
          </header>

          <main className="flex min-h-screen items-center justify-center">
            {children}
            {loginDialog}
            <Analytics />
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && (
          <Script
            src="https://umami.moinulmoin.com/script.js"
            data-website-id="bc66d96a-fc75-4ecd-b0ef-fdd25de8113c"
          />
        )}
      </body>
    </html>
  );
}
