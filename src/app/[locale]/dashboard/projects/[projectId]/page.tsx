import { getProjectById } from "../action";
import TabSections from "./tab-sections";

export default async function SingleProject({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params; // Desestruturação direta, sem necessidade de `Promise`
  const project = await getProjectById(projectId);

  if (!project) {
    return <div>Projeto não encontrado.</div>; // Retorno para casos de erro ou projeto inexistente
  }

  return <TabSections project={project} />;
}
