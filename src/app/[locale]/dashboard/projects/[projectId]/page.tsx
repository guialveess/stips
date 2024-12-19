import { getProjectById } from "../action";
import TabSections from "./tab-sections";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { House, MessageSquareShare, CircleUserRound } from "lucide-react";

export default async function SingleProject({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;
  const project = await getProjectById(projectId);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Projeto não encontrado.
      </div>
    );
  }

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
    <div className="flex items-center justify-center min-h-56">
      <div className="w-full max-w-4xl">
        <FloatingNav navItems={navItems} />
        <TabSections project={project} />
      </div>
    </div>
  );
}
