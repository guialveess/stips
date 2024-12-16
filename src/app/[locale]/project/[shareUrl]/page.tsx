import { getProjectByShareUrl } from "@/app/[locale]/dashboard/projects/action";
import { BrowserComponent } from "@/components/mock-browser";

export default async function PublicProjectPage({
  params,
}: {
  params: { shareUrl: string };
}) {
  console.log("Parâmetros recebidos:", params); // Log para verificar se `params.shareUrl` está correto

  const project = await getProjectByShareUrl(params.shareUrl);

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
    process.env.NODE_ENV === "production"
      ? "https://boiderplatenext-01.vercel.app"
      : "http://localhost:3000";

  // URL pública do projeto
  const publicUrl = `${baseUrl}/project/${params.shareUrl}`;

  return (
    <div className="flex h-screen items-center justify-center">
      {/* Exibe o shareUrl no BrowserComponent */}
      <BrowserComponent className="h-[300px] w-full max-w-[600px]" shareUrl={publicUrl}>
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
