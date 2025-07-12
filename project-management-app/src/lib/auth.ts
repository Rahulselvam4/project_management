// src/lib/auth.ts
import { compare, hash } from "bcryptjs";

export async function hashPassword(password: string) {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);
}
import { getServerSession } from "next-auth";
import { authOptions } from "./nextauth";

export const getAuthSession = async () => {
  return await getServerSession(authOptions);
};
