import { NextResponse } from "next/server";
import prisma from "@/lib/server/prisma"; // Configuração do Prisma

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "E-mail é obrigatório." },
        { status: 400 }
      );
    }

    const waitlistEntry = await prisma.waitlist.create({
      data: { email },
    });

    return NextResponse.json(
      { message: "E-mail adicionado à lista de espera.", waitlistEntry },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao salvar na lista de espera:", error);
    return NextResponse.json(
      { error: "Erro ao salvar o e-mail na lista de espera." },
      { status: 500 }
    );
  }
}
