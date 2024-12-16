import { StarIcon } from "lucide-react";
import Link from "next/link";
import { BrandIcons } from "@/components/shared/brand-icons";
import Icons from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { nFormatter } from "@/lib/utils";
import { getScopedI18n } from "@/locales/server";
import { Badge } from "../ui/badge";

export default async function Hero() {
  const scopedT = await getScopedI18n("hero");
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/moinulmoin/chadnext",
    {
      next: { revalidate: 3600 },
    }
  ).then((res) => res.json());

  return (
    <section>
      <div className="container flex w-full flex-col items-center justify-center space-y-20 py-16 md:py-20 lg:py-24 xl:py-28">
        <div className="mx-auto w-full max-w-2xl">
          <a
            title="PlannerAuth"
            target="_blank"
            rel="noreferrer"
            className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors duration-300 hover:bg-blue-200"
          >
            <p className="text-sm font-semibold text-blue-700">
              {scopedT("top")}
            </p>
          </a>
          <h1 className="text-balance bg-gradient-to-br from-gray-900 via-gray-800 to-gray-400 bg-clip-text text-center font-heading text-[40px] font-bold leading-tight tracking-[-0.02em] text-transparent drop-shadow-sm duration-300 ease-linear [word-spacing:theme(spacing.1)] dark:bg-gradient-to-br dark:from-gray-100 dark:to-gray-900 md:text-7xl md:leading-[5rem]">
            {scopedT("main")}
          </h1>
          <div className="justify-center text-center">
            <Badge className="mt-6 text-balance text-center text-muted-foreground md:text-xl">
              {scopedT("sub")}
            </Badge>
          </div>
          <div className="mx-auto mt-6 flex items-center justify-center space-x-5">
            <Link className={buttonVariants() + " gap-x-2"} href="/login">
              {scopedT("firstButton")}
            </Link>
          </div>
        </div>
        <div className="w-full">
          <h2 className="mb-6 text-center text-2xl font-semibold tracking-tight transition-colors">
            {scopedT("tools")}
          </h2>
          <div className="flex w-full flex-wrap items-center justify-center gap-x-20 gap-y-10">
            {tools.map((t, i) => (
              <Link key={i} href={t.link} target="_blank">
                <t.icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const tools = [
  {
    link: "https://www.typescriptlang.org/",
    icon: BrandIcons.ts,
  },
  {
    link: "https://nextjs.org/",
    icon: BrandIcons.nextjs,
  },
  {
    link: "https://tailwindcss.com/",
    icon: BrandIcons.tailwind,
  },
  {
    link: "https://www.prisma.io/",
    icon: BrandIcons.prisma,
  },
  {
    link: "https://vercel.com/",
    icon: BrandIcons.vercel,
  },
];
