import { getProjectByShareUrl } from "@/app/[locale]/dashboard/projects/action";

export default async function PublicProjectPage({
  params,
}: {
  params: { shareUrl: string }; // Certifique-se de que o nome aqui corresponde ao nome da pasta dinâmica
}) {
  console.log("Parâmetros recebidos:", params); // Log para verificar se `params.shareUrl` está correto

  const project = await getProjectByShareUrl(params.shareUrl);

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500">Projeto não encontrado</h1>
          <p className="text-gray-600 mt-4">
            Não conseguimos encontrar o projeto com o URL fornecido.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{project.name}</h1>
        <p className="text-gray-600 text-lg mb-4">
          <strong>Domain:</strong> {project.domain}
        </p>
        <p className="text-gray-600 text-lg">
          <strong>ID:</strong> {project.id}
        </p>
      </div>
    </div>
  );
}
