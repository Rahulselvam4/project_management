// src/app/api/tasks/[id]/complete/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = params.id;

    const updated = await prisma.task.update({
      where: { id: taskId },
      data: { status: "DONE" },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to complete task:", error);
    return NextResponse.json({ error: "Failed to complete task" }, { status: 500 });
  }
}
