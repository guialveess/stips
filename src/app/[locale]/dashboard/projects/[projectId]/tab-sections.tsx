import { type Project } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeleteCard from "./delete-card";
import EditableDetails from "./editable-details";

export default function TabSections({
  project,
}: {
  project: Project & { socialLinks: { name?: string; url: string }[] };
}) {
  return (
    <div className="mt-8"> {/* Adicionada margin-top */}
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <EditableDetails
            initialValues={{
              ...project,
              shareUrl: project.shareUrl || "",
              socialLinks: project.socialLinks || [], // Garante que socialLinks seja uma lista
            }}
          />
        </TabsContent>

        <TabsContent value="settings">
          <DeleteCard id={project.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
