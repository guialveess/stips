import { getProjectByShareUrl } from "@/app/[locale]/dashboard/projects/action";
import { BrowserComponent } from "@/components/mock-browser";
import GridPattern from "@/components/ui/grid-pattern";
import { BentoGrid } from "@/components/custom/BentoGrid";
import { Spotlight } from "@/components/Spotlight";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Card_05 from "@/components/Card_05";
import Card06 from "@/components/custom/Card_06";
import FlickeringGrid from "@/components/ui/flickering-grid";

export default async function PublicProjectPage({
  params,
}: {
  params: Promise<{ shareUrl: string }>;
}) {
  const resolvedParams = await params;
  const { shareUrl } = resolvedParams;

  if (!shareUrl) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500">URL não fornecida</h1>
          <p className="mt-4 text-gray-600">
            Por favor, forneça um URL válido para acessar o projeto.
          </p>
        </div>
      </div>
    );
  }

  const project = await getProjectByShareUrl(shareUrl);

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500">
            Projeto não encontrado
          </h1>
          <p className="mt-4 text-gray-600">
            Não conseguimos encontrar o projeto com o URL fornecido.
          </p>
        </div>
      </div>
    );
  }

  const customizations = project.customizations || [];
  const background = customizations.find((c) => c.key === "background")?.value;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://stipss.vercel.app"
      : "http://localhost:3000");

  const publicUrl = `${baseUrl}/project/${shareUrl}`;

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-background">
      {/* Flickering Grid Background */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-30">
        <div className="absolute h-[600px] w-[600px] overflow-hidden rounded-lg bg-background">
          <GridPattern
            className="fixed inset-0 z-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)] skew-y-12 sm:[mask-image:radial-gradient(450px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(550px_circle_at_center,white,transparent)]"
           
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 mt-20 flex w-full max-w-3xl flex-col items-center gap-8 p-4">
        <Badge className="text-sm font-medium text-white dark:text-black">
          <span>🎉</span>
          {project.user.name}
        </Badge>

        <Card_05
          title={project.user.name ?? "Nome não disponível"}
          category="Social Links"
          socialLinks={project.socialLinks?.map((link: any) => ({
            name: link.name ?? "Rede Social",
            url: link.url,
          }))}
        />
      </div>
    </div>
  );
}
