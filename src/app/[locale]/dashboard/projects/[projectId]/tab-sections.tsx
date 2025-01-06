"use client";

import { useState } from "react";
import { AnimatedTabs } from "@/components/custom/AnimatedTabs";
import DeleteCard from "./delete-card";
import EditableDetails from "./editable-details";
import { Project } from "@prisma/client";
import CustomizationSection from "@/components/customization-section";

export default function TabSections({
  project,
}: {
  project: Project & { socialLinks: { name?: string; url: string }[]; customizations?: { key: string; value: string }[] };
}) {
  const [selectedTab, setSelectedTab] = useState("details");

  const tabs = [
    { value: "details", label: "Detalhes" },
    { value: "settings", label: "Configurações" },
    { value: "customizations", label: "Customizações" },
  ];

  return (
    <div className="mt-8">
      {/* Animated Tabs */}
      <AnimatedTabs tabs={tabs} selected={selectedTab} onTabSelect={setSelectedTab} />

      {/* Tabs Content */}
      <div className="mt-6">
        {selectedTab === "details" && (
          <EditableDetails
            initialValues={{
              ...project,
              shareUrl: project.shareUrl || "",
              socialLinks: project.socialLinks || [],
            }}
          />
        )}

        {selectedTab === "settings" && <DeleteCard id={project.id} />}

        {selectedTab === "customizations" && (
          <CustomizationSection
            projectId={project.id}
            initialCustomizations={project.customizations || []}
          />
        )}
      </div>
    </div>
  );
}
