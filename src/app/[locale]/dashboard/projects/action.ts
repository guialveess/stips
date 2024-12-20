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
}

export async function createProject(payload: Payload) {
  const { user } = await getCurrentSession();

  const shareUrl = nanoid(); // Gera um identificador único para o URL público

  const project = await prisma.project.create({
    data: {
      ...payload,
      shareUrl,
      user: {
        connect: {
          id: user?.id,
        },  
      },
    },
  });

  revalidatePath(`/dashboard/projects`);
  return project;
}

export async function checkIfFreePlanLimitReached() {
  const { user } = await getCurrentSession();
  const subscriptionPlan = await getUserSubscriptionPlan(user?.id as string);

  // If user is on a free plan.
  // Check if user has reached limit of 3 projects.
  if (subscriptionPlan?.isPro) return false;

  const count = await prisma.project.count({
    where: {
      userId: user?.id,
    },
  });

  return count >= 1;
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

export async function getProjectById(id: string | undefined) {
  if (!id) {
    throw new Error("ID do projeto não foi fornecido.");
  }

  const project = await prisma.project.findUnique({
    where: { id },
  });

  return project;
}

export async function updateProjectById(id: string, payload: Payload) {
  const { user } = await getCurrentSession();
  await prisma.project.update({
    where: {
      id,
      userId: user?.id,
    },
    data: payload,
  });
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
    },
  });

  if (!project) {
    console.log("Nenhum projeto encontrado com shareUrl:", shareUrl);
  }

  return project;
}

export async function deleteProjectById(id: string) {
  const { user } = await getCurrentSession();
  await prisma.project.delete({
    where: {
      id,
      userId: user?.id,
    },
  });
  revalidatePath(`/dashboard/projects`);
  redirect("/dashboard/projects");
}
