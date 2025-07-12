// src/app/api/tasks/comment/route.ts
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { taskId, content } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  await prisma.comment.create({
    data: {
      content,
      taskId,
      authorId: user.id,
    },
  });

  return NextResponse.json({ success: true });
}
