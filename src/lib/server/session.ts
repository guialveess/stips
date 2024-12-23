import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import type { Session, User } from "@prisma/client";
import { cookies } from "next/headers";
import prisma from "./prisma";

const SESSION_EXPIRATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 dias
const RENEWAL_THRESHOLD_MS = 1000 * 60 * 60 * 24 * 15; // 15 dias

export function generateSessionToken(): string {
  try {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);
    return encodeBase32LowerCaseNoPadding(bytes);
  } catch (error) {
    console.error("Failed to generate session token:", error);
    throw new Error("Failed to generate session token");
  }
}

export async function createSession(
  token: string,
  userId: string
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_EXPIRATION_MS),
  };
  await prisma.session.create({ data: session });
  return session;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  try {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const result = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!result) {
      console.log(`Invalid session token: ${token}`);
      return { session: null, user: null };
    }

    const { user, ...session } = result;

    if (Date.now() >= session.expiresAt.getTime()) {
      await prisma.session.delete({ where: { id: sessionId } });
      return { session: null, user: null };
    }

    if (Date.now() >= session.expiresAt.getTime() - RENEWAL_THRESHOLD_MS) {
      session.expiresAt = new Date(Date.now() + SESSION_EXPIRATION_MS);
      await prisma.session.update({
        where: { id: session.id },
        data: { expiresAt: session.expiresAt },
      });
    }

    return { session, user };
  } catch (error) {
    console.error("Error validating session token:", error);
    throw error;
  }
}

export const getCurrentSession = async (): Promise<SessionValidationResult> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value ?? null;
  if (token === null) {
    return { session: null, user: null };
  }
  return validateSessionToken(token);
};

export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.session.delete({ where: { id: sessionId } });
}

export async function invalidateAllSessions(userId: string): Promise<void> {
  await prisma.session.deleteMany({ where: { userId } });
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
