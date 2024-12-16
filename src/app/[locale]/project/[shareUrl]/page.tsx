import { getProjectByShareUrl } from "@/app/[locale]/dashboard/projects/action";
import { BrowserComponent } from "@/components/mock-browser";
import { Spotlight } from "@/components/Spotlight";

export default async function PublicProjectPage({
  params,
}: {
  params: Promise<{ shareUrl: string }>;
}) {
  // Garante que params seja resolvido antes de acessar propriedades
  const resolvedParams = await params;
  const { shareUrl } = resolvedParams;

  console.log("Parâmetros recebidos:", resolvedParams); // Log para verificar se `shareUrl` está correto

  // Verifica se o shareUrl está disponível
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

  // Busca o projeto pelo shareUrl
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

  // Define o baseUrl de acordo com o ambiente
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || // Usa variável de ambiente, se disponível
    (process.env.NODE_ENV === "production"
      ? "https://boiderplatenext-01.vercel.app"
      : "http://localhost:3000");

  // URL pública do projeto
  const publicUrl = `${baseUrl}/project/${shareUrl}`;

  return (
    <div className="flex h-screen items-center justify-center">
      <Spotlight
        className="-top-40 left-0 md:left-20 md:-top-20"
        fill="black"
      />
      <BrowserComponent
        className="h-[300px] w-full max-w-[600px]"
        shareUrl={publicUrl}
      >
        <section className="flex h-full w-full flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-lg font-bold text-gray-800 md:text-xl">
            {project.name}
          </h1>
          <p className="text-gray-600">
            <strong>Domain:</strong> {project.domain}
          </p>
        </section>
      </BrowserComponent>
    </div>
  );
}
