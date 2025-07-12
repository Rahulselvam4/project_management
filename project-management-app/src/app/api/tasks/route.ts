import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description, assignedToId, projectId } = await req.json();

  if (!title || !projectId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        projectId,
        assigneeId: assignedToId || null,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Task creation failed:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
