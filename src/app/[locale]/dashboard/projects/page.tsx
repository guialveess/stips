import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getProjects } from "./action";
import CreateProjectModal from "./create-project-modal";

export default async function Projects() {
  const projects = await getProjects();

  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 p-4">
      <CreateProjectModal />
      {projects.map((project) => (
        <Card
          role="button"
          key={project.id}
          className="group relative flex flex-col items-center justify-between gap-y-4 rounded-lg border p-6 text-center shadow-md hover:shadow-lg hover:bg-accent transition-all"
        >
          {/* Thumbnail/Icon Section */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-primary shadow-md">
            {/* Placeholder Icon */}
            <span className="text-xl font-bold">{project.name.charAt(0)}</span>
          </div>

          {/* Project Name */}
          <h4 className="font-semibold text-lg group-hover:text-primary transition-all">
            {project.name}
          </h4>

          {/* Project Domain */}
          <p className="text-sm text-muted-foreground">
            {`https://${project.domain}`}
          </p>

          {/* View Details Link */}
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
