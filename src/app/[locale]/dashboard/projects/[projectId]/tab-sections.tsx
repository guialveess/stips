import { type Project } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeleteCard from "./delete-card";
import EditableDetails from "./editable-details";

export default function TabSections({ project }: { project: Project }) {
  return (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">Detalhes</TabsTrigger>
        <TabsTrigger value="settings">Configurações</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <EditableDetails
          initialValues={{
            ...project,
            shareUrl: project.shareUrl || "", // Garante que `shareUrl` seja uma string
          }}
        />
      </TabsContent>

      <TabsContent value="settings">
        <DeleteCard id={project.id} />
      </TabsContent>
    </Tabs>
  );
}
