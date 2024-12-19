import Link from "next/link";
import { Card } from "@/components/ui/card";
import { CircleCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjects } from "./action";
import CreateProjectModal from "./create-project-modal";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 p-4">
      <CreateProjectModal />

      {projects.map((project) => (
        <Card
          key={project.id}
          className="group relative flex flex-col gap-3 rounded-lg border border-border bg-background p-4 shadow-lg shadow-black/5 hover:shadow-md transition-all"
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
                <Button size="sm">Ver Mais</Button>
              </div>
            </div>

            {/* Close Button */}
          
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
    </div>
  );
}
