import { getProjectById } from "../action";
import TabSections from "./tab-sections";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { House, MessageSquareShare, CircleUserRound } from "lucide-react";

export default async function SingleProject({
  params: rawParams,
}: {
  params: Promise<{ projectId: string }>;
}) {
  console.log("Resolving params...");
  const params = await rawParams;
  const { projectId } = params;
  console.log("Resolved params:", params);

  const project = await getProjectById(projectId);
  console.log("Fetched project:", project);

  if (!project) {
    console.log("Project not found, rendering fallback.");
    return (
      <div className="flex items-center justify-center min-h-screen">
        Projeto não encontrado.
      </div>
    );
  }

  // Transformar socialLinks
  const transformedProject = {
    ...project,
    socialLinks: project.socialLinks.map((link) => ({
      name: link.name ?? undefined, // Converte null para undefined
      url: link.url,
    })),
  };

  const navItems = [
    {
      name: "Projetos",
      link: "/dashboard/projects",
      icon: <House className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Pagamento",
      link: "/dashboard/billing",
      icon: <CircleUserRound className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Configuração",
      link: "/dashboard/settings",
      icon: (
        <MessageSquareShare className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];

  return (
    <div className="flex items-center justify-center min-h-96 mt-16">
      {/* Adicionado `mt-12` para espaçamento superior */}
      <div className="w-full max-w-4xl">
        <FloatingNav navItems={navItems} />
        <TabSections project={transformedProject} />
      </div>
    </div>
  );
}
