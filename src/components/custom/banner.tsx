import { BannerClient } from "@/components/custom/banner-client";

export default function PublicProjectPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-background">
      {/* Outros conteúdos */}
      <div className="mt-12">
        <BannerClient
          initialShow={true}
          icon={<svg className="h-4 w-4 text-green-800">...</svg>}
          title={
            <>
              Torne-se <span className="font-semibold">PRO</span> e aproveite um
              domínio <span className="font-semibold">.link</span> gratuito por
              1 ano! Acesse vantagens exclusivas e eleve seu projeto ao próximo
              nível.
            </>
          }
          actionLabel="Quero ser PRO"
          learnMoreUrl="https://stipss.vercel.app/"
        />
      </div>
    </div>
  );
}
