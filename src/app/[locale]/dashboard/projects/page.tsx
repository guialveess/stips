import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CircleCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjects } from "./action";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { House, MessageSquareShare, CircleUserRound } from "lucide-react";
import CreateProjectModal from "./create-project-modal";
import FlickeringGrid from "@/components/ui/flickering-grid";

export default async function Projects() {
  const projects = await getProjects();
  const navItems = [
    {
      name: "Projetos",
      link: "/dashboard/projects",
      icon: <House className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Pagamento",
      link: "/dashboard/billing",
      icon: (
        <CircleUserRound className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
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
    <div className="relative min-h-screen bg-background">
      {/* Flickering Grid Background */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-30">
        <div className="relative size-[600px] w-full overflow-hidden rounded-s-large bg-background">
          <FlickeringGrid
            className="relative inset-0 z-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
            squareSize={6}
            gridGap={6}
            color="#60A5FA"
            maxOpacity={0.5}
            flickerChance={0.1}
          />
        </div>
      </div>

      {/* Main Content */}
      {/* Main Content */}
      <div className="relative z-10 mt-20 grid gap-6 p-4 md:grid-cols-3 lg:grid-cols-4">
        <CreateProjectModal />

        {projects.map((project) => (
          <Card
            key={project.id}
            className="group relative flex flex-col gap-3 rounded-lg border border-border bg-background p-4 shadow-lg shadow-black/5 transition-all hover:shadow-md"
          >
            <div className="flex gap-2">
              {/* Icon Section */}
              <CircleCheck
                className="mt-0.5 shrink-0 text-emerald-500"
                size={20}
                strokeWidth={2}
                aria-hidden="true"
              />

              {/* Project Details */}
              <div className="flex grow flex-col gap-2">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">{project.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {`https://${project.domain}`}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button size="sm">Acessar Projeto</Button>
                </div>
              </div>
            </div>

            {/* Clickable Area */}
            <Link
              href={`/dashboard/projects/${project.id}`}
              className="absolute inset-0"
            >
              <span className="sr-only">Ver detalhes do projeto</span>
            </Link>
          </Card>
        ))}

        <div className="relative w-full">
          <FloatingNav navItems={navItems} />
        </div>
      </div>
    </div>
  );
}
