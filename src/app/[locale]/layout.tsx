import { type Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig, siteUrl } from "@/config/site";
import { cn } from "@/lib/utils";
import "../globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { ThemeToggle } from "@/components/shared/theme-toggle";

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
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
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

export default function RootLayout({ children, loginDialog, params }: Props) {
  const { locale } = params;

  return (
    <html lang={locale}>
      <body
        className={cn(
          "font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider>
          <header className="fixed right-0 top-0 z-[50] w-full">
            <nav className="flex items-center justify-between px-4 py-2">
              {/* Conteúdo no lado esquerdo */}
              <div className="flex items-center">
                <span className="text-lg font-bold">
                  <Header />
                </span>
              </div>

              {/* O componente ThemeToggle precisa ser cliente */}
              <div className="flex items-center gap-2">
                <ThemeToggle />
              </div>
            </nav>
          </header>

          <main className="flex min-h-screen items-center justify-center">
            {children}
            {loginDialog}
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
