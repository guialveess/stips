export const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://chadnext.moinulmoin.com";

export const siteConfig = (locale?: string) => ({
  name: "Stips",
  url: siteUrl + "/pt" + locale,
  ogImage: `${siteUrl}/${locale}/opengraph-image`,
  description: "Links que vão além do clique - guiialves",
  links: {
    portifolio: "https://guiialves.vercel.app/",
    github: "https://github.com/guialveess",
  },
});

export type SiteConfig = typeof siteConfig;
