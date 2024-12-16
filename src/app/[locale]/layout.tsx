import { type Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig, siteUrl } from "@/config/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { I18nProviderClient } from "@/locales/client";
import { ThemeProvider } from "next-themes"; // Importa o ThemeProvider
import "../globals.css";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await params;
  const locale = p.locale;
  const site = siteConfig(locale);

  const siteOgImage = `${siteUrl}/api/og?locale=${locale}`;

  return {
    title: {
      default: site.name,
      template: `%s - ${site.name}`,
    },
    description: site.description,
    keywords: [
      "Next.js",
      "Shadcn/ui",
      "LuciaAuth",
      "Prisma",
      "Vercel",
      "Tailwind",
      "Radix UI",
      "Stripe",
      "Internationalization",
      "Postgres",
    ],
    authors: [
      {
        name: "guiialvess",
        url: "https://guiialves.vercel.app/",
      },
    ],
    creator: "Guilherme Alves",
    openGraph: {
      type: "website",
      locale: locale,
      url: site.url,
      title: site.name,
      description: site.description,
      siteName: site.name,
      images: [
        {
          url: siteOgImage,
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description: site.description,
      images: [siteOgImage],
      creator: "@immoinulmoin",
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: `${siteUrl}/manifest.json`,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: site.name,
    },
  };
}

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = localFont({
  src: "../../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export default async function RootLayout({
  children,
  loginDialog,
  params,
}: {
  children: React.ReactNode;
  loginDialog: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body
        className={cn(
          "font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          
          <header className="fixed right-0 top-0 z-[50] w-full">
            <nav className="flex items-center justify-between px-4 py-2">
              {/* Conteúdo no lado esquerdo */}
              <div className="flex items-center">
                <span className="text-lg font-bold"> <Header /></span>
              </div>

              {/* Componente ThemeToggle no lado direito */}
              <div className="flex items-center gap-2">
                <ThemeToggle />
              </div>
            </nav>
          </header>

          <main>
            {children}
            {loginDialog}
          </main>
          {/* <I18nProviderClient locale={locale}> */}
            <Footer />
          {/* </I18nProviderClient> */}
          <Toaster />
          {process.env.NODE_ENV === "production" && (
            <Script
              src="https://umami.moinulmoin.com/script.js"
              data-website-id="bc66d96a-fc75-4ecd-b0ef-fdd25de8113c"
            />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
