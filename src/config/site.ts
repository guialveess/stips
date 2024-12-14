export const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://chadnext.moinulmoin.com";

export const siteConfig = (locale?: string) => ({
  name: "ChadNext",
  url: siteUrl + "/" + locale,
  ogImage: `${siteUrl}/${locale}/opengraph-image`,
  description: "Auth Boiderplate by Guilherme Alves",
  links: {
    portifolio: "https://guiialves.vercel.app/",
    github: "https://github.com/guialveess",
  },
});

export type SiteConfig = typeof siteConfig;
