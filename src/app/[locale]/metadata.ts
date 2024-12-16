import { type Metadata } from "next";
import { siteConfig, siteUrl } from "@/config/site";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
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
      creator: "@guiialvess",
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
