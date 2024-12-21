import Link from "next/link";
import { RocketIcon } from "lucide-react";
import { BrandIcons } from "@/components/shared/brand-icons";
import Icons from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { nFormatter } from "@/lib/utils";
import { FlipWords } from "@/components/ui/flip-words";
import { Badge } from "../ui/badge";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import FlickeringGrid from "@/components/ui/flickering-grid";
import { SendingButton } from "../SendingButton";

interface SendingButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default async function Hero() {
  const words = `Gerencie, crie e conduza seus objetivos com Stips`;
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/moinulmoin/chadnext",
    {
      next: { revalidate: 3600 },
    }
  ).then((res) => res.json());

  return (
    <section className="flex h-screen items-center justify-center">
      <div className="container flex w-full flex-col items-center justify-center space-y-20 py-16 md:py-20 lg:py-24 xl:py-28">
        <div className="mx-auto w-full max-w-2xl text-center">
          <div className="mx-auto mb-5 flex max-w-fit items-center justify-center">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
            >
              <span>Pense, Crie, Compartilhe ! 🎉</span>
            </HoverBorderGradient>
          </div>

          <div className="mx-auto text-center text-4xl font-black leading-tight text-neutral-600 dark:text-neutral-400 md:text-7xl">
            <TextGenerateEffect duration={3} filter={false} words={words} />
          </div>

          <div className="justify-center text-center"></div>
          <div className="mx-auto mt-6 flex items-center justify-center space-x-5">
            <SendingButton href="/pt/login">Acessar</SendingButton>
          </div>
        </div>
        <div className="w-full">
          <div className="flex w-full flex-wrap items-center justify-center gap-x-20 gap-y-10">
            {/* Conteúdo futuro aqui */}
          </div>
        </div>
      </div>
    </section>
  );
}
