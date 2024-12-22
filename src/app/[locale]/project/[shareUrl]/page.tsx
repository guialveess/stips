import { getProjectByShareUrl } from "@/app/[locale]/dashboard/projects/action";
import { BrowserComponent } from "@/components/mock-browser";
import GridPattern from "@/components/ui/grid-pattern";
import { Spotlight } from "@/components/Spotlight";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Card_05 from "@/components/Card_05";

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

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://stipss.vercel.app"
      : "http://localhost:3000");

  const publicUrl = `${baseUrl}/project/${shareUrl}`;

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      {/* GridPattern cobrindo toda a tela */}
      <div className="absolute inset-0">
        <GridPattern
          squares={[
            // Letra S
            [1, 1],
            [2, 1],
            [3, 1],
            [4, 1],
            [5, 1],
            [1, 2],
            [1, 3],
            [1, 4],
            [2, 4],
            [3, 4],
            [4, 4],
            [5, 4],
            [5, 5],
            [5, 6],
            [1, 7],
            [2, 7],
            [3, 7],
            [4, 7],
            [5, 7],

            // Letra T
            [7, 1],
            [8, 1],
            [9, 1],
            [10, 1],
            [11, 1],
            [9, 2],
            [9, 3],
            [9, 4],
            [9, 5],
            [9, 6],
            [9, 7],

            // Letra I
            [13, 1],
            [13, 2],
            [13, 3],
            [13, 4],
            [13, 5],
            [13, 6],
            [13, 7],

            // Letra P
            [15, 1],
            [16, 1],
            [17, 1],
            [18, 1],
            [19, 1],
            [15, 2],
            [15, 3],
            [15, 4],
            [16, 4],
            [17, 4],
            [18, 4],
            [19, 4],
            [19, 5],
            [19, 6],
            [15, 7],

            // Letra S (final)
            [21, 1],
            [22, 1],
            [23, 1],
            [24, 1],
            [25, 1],
            [21, 2],
            [21, 3],
            [21, 4],
            [22, 4],
            [23, 4],
            [24, 4],
            [25, 4],
            [25, 5],
            [25, 6],
            [21, 7],
            [22, 7],
            [23, 7],
            [24, 7],
            [25, 7],
          ]}
          className="skew-y-12 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)] sm:[mask-image:radial-gradient(450px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(550px_circle_at_center,white,transparent)]"
        />
      </div>

      {/* Spotlight existente */}
      <Spotlight
        className="absolute -top-40 left-0 md:-top-20 md:left-20"
        fill="black"
      />

      <div className="absolute top-10 flex flex-col items-center space-y-2">
        {/* Contêiner principal do avatar com o gorro */}
        <div className="group relative">
          {/* Gorro Natalino */}
          <Image
            src="/santa-hat.png"
            alt="Gorro Natalino"
            width={25}
            height={25}
            className="absolute -top-3.5 left-6 z-20 h-10 w-10"
          />
          {/* Contêiner para o efeito de pulsação na borda */}
          <div className="relative h-16 w-16 rounded-full p-[3px]">
            <div className="from-color-1 via-color-2 to-color-3 absolute inset-0 animate-pulse rounded-full bg-gradient-to-r shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
            {/* Avatar */}
            <Image
              src={project.user.picture || "/placeholder-avatar.png"}
              alt={`${project.user.name}'s avatar`}
              width={50}
              height={50}
              className="relative z-10 h-full w-full rounded-full bg-white object-cover"
            />
          </div>
        </div>
      </div>

      {/* Browser Component */}
      <BrowserComponent
        className="relative z-10 mt-40 h-[300px] w-full max-w-[600px] sm:mt-32 lg:mt-14"
        shareUrl={publicUrl}
      >
        <section className="flex h-full w-full flex-col items-center justify-center space-y-4 text-center">
          <Badge className="mt-4 text-sm font-medium text-white dark:text-black">
            <span>🎉</span>
            {project.user.name}
          </Badge>

          {/* Redes Sociais */}
          <Card_05
            title="Plataformas Conectadas"
            category="Social Links"
            socialLinks={project.socialLinks?.map((link: any) => ({
              name: link.name ?? "Rede Social",
              url: link.url,
            }))}
          />
        </section>
      </BrowserComponent>
    </div>
  );
}
