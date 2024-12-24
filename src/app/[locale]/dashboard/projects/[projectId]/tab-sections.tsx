import { type Project } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DeleteCard from "./delete-card";
import EditableDetails from "./editable-details";
import CustomizationSection from "@/components/customization-section"; // Novo componente para customizações

export default function TabSections({
  project,
}: {
  project: Project & { socialLinks: { name?: string; url: string }[]; customizations?: { key: string; value: string }[] };
}) {
  return (
    <div className="mt-8">
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Detalhes</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
          <TabsTrigger value="customizations">Customizações</TabsTrigger> {/* Nova aba */}
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

        <TabsContent value="customizations">
          <CustomizationSection
            projectId={project.id}
            initialCustomizations={project.customizations || []} // Passa as customizações iniciais
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
