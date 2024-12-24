"use server";

import { type Project } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { getUserSubscriptionPlan } from "@/actions/subscription";
import prisma from "@/lib/server/prisma";
import { getCurrentSession } from "@/lib/server/session";

interface Payload {
  name: string;
  domain: string;
  socialLinks?: { name?: string; url: string }[];
}

export async function createProject(payload: Payload) {
  const { user } = await getCurrentSession();

  const shareUrl = nanoid();

  const project = await prisma.project.create({
    data: {
      name: payload.name,
      domain: payload.domain,
      shareUrl,
      user: {
        connect: { id: user?.id },
      },
      socialLinks: {
        create: payload.socialLinks?.map((link) => ({
          name: link.name ?? undefined, // Use undefined para campos opcionais
          url: link.url,
        })),
      },
    },
  });

  // Adicionar customização padrão (ex.: background)
  await updateCustomization(project.id, "background", "default-background.jpg");

  revalidatePath(`/dashboard/projects`);
  return project;
}

export async function updateCustomization(projectId: string, key: string, value: string) {
  return prisma.customization.upsert({
    where: {
      projectId_key: {
        projectId,
        key,
      },
    },
    update: { value },
    create: {
      projectId,
      key,
      value,
    },
  });
}

export async function getCustomizationsByProject(projectId: string) {
  return prisma.customization.findMany({
    where: { projectId },
  });
}


export async function checkIfPlanLimitReached() {
  const { user } = await getCurrentSession();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const subscriptionPlan = await getUserSubscriptionPlan(user.id);

  // Define o limite com base no plano
  const projectLimit = subscriptionPlan.isPro ? 10 : 1;

  // Conta os projetos do usuário
  const count = await prisma.project.count({
    where: {
      userId: user.id,
    },
  });

  // Retorna true se o limite foi atingido
  return count >= projectLimit;
}

export async function getProjects() {
  const { user } = await getCurrentSession();
  const projects = await prisma.project.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return projects as Project[];
}

export async function getProjectById(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      socialLinks: true, // Inclui os links sociais relacionados
    },
  });

  if (!project) {
    throw new Error("Projeto não encontrado.");
  }

  return project;
}


export async function updateProjectById(
  id: string,
  payload: Payload,
  customizations?: { key: string; value: string }[]
) {
  const { user } = await getCurrentSession();

  await prisma.project.update({
    where: {
      id,
      userId: user?.id,
    },
    data: {
      ...payload,
      socialLinks: {
        deleteMany: {}, // Remove links existentes
        create: payload.socialLinks?.map((link) => ({
          name: link.name || null,
          url: link.url,
        })),
      },
    },
  });

  // Atualiza customizações, se fornecidas
  if (customizations) {
    for (const customization of customizations) {
      await updateCustomization(id, customization.key, customization.value);
    }
  }

  revalidatePath(`/dashboard/projects`);
}


export async function getProjectByShareUrl(shareUrl: string) {
  console.log("Buscando projeto com shareUrl:", shareUrl);

  const project = await prisma.project.findUnique({
    where: { shareUrl },
    include: {
      user: {
        select: {
          name: true,
          picture: true,
        },
      },
      socialLinks: true, // Inclui os links sociais relacionados
      customizations: true, // Inclui as customizações
    },
  });

  if (!project) {
    console.log("Nenhum projeto encontrado com shareUrl:", shareUrl);
  }

  return project;
}

export async function deleteProjectById(id: string) {
  if (!id) {
    console.error("deleteProjectById: ID do projeto não foi fornecido.");
    throw new Error("Invalid project ID.");
  }

  try {
    const { user } = await getCurrentSession();

    if (!user?.id) {
      console.error("deleteProjectById: Usuário não autenticado.");
      throw new Error("Unauthorized: User not logged in");
    }

    // Verifica se o projeto pertence ao usuário antes de excluir
    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!project) {
      console.error("deleteProjectById: Projeto não encontrado ou usuário não autorizado.");
      throw new Error("Project not found or unauthorized.");
    }

    // Exclui os links sociais associados ao projeto
    await prisma.socialLink.deleteMany({
      where: {
        projectId: id,
      },
    });

    await prisma.customization.deleteMany({
      where: {
        projectId: id,
      },
    });

    // Exclui o projeto
    await prisma.project.delete({
      where: { id },
    });

    // Revalida o caminho antes de redirecionar
    revalidatePath(`/dashboard/projects`);
    console.log("Revalidation completed. Redirecting...");

    // Redireciona para a página de projetos
    redirect("/dashboard/projects");
  } catch (error) {
    console.error("Error deleting project:", error);

    // Re-lança o erro apenas se necessário
    throw new Error("Failed to delete project.");
  }
}
