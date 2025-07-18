import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth';
import { prisma } from '@/lib/prisma';

// POST: Create new project
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { name, description } = body;

  if (!name || !description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        ownerId: user.id,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Project creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET: List all projects created by the current user (used in task form)
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const projects = await prisma.project.findMany({
      where: { ownerId: session.user.id },
      select: { id: true, name: true },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Fetch projects error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
