import Link from "next/link";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { SendingButton } from "../SendingButton";
import WaitingList from "@/components/WaitingList";
import PricingPlans from "../PricingTier";

export default async function Hero() {
  const words = `Gerencie, crie e conduza seus objetivos com Stips`;

  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/moinulmoin/chadnext",
    {
      next: { revalidate: 3600 },
    }
  ).then((res) => res.json());

  return (
    <main className="flex flex-col items-center justify-center mt-14">
      {/* Seção Inicial */}
      <section className="container flex w-full flex-col items-center justify-center space-y-20 py-16 md:py-20 lg:py-24 xl:py-28">
        <div className="mx-auto w-full max-w-2xl text-center">
          {/* Título */}
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

          {/* Botão de Acesso */}
          <div className="mt-6 flex items-center justify-center">
            <SendingButton href="/pt/login">Acessar</SendingButton>
          </div>
        </div>

        {/* Lista de Espera */}
        <div className="w-full">
          <div className="flex w-full flex-wrap items-center justify-center gap-4 px-4">
            <WaitingList />
          </div>
        </div>
      </section>

      {/* Seção de Preços */}
      <section className="w-fullpy-16  rounded-xl">
        <div className="container">
          <PricingPlans />
        </div>
       
      </section>
    </main>
  );
}
