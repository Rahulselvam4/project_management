// src/app/dashboard/projects/[id]/page.tsx

export const dynamic = "force-dynamic";

import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { TaskCard } from "@/components/tasks/task-card";

type ProjectPageProps = {
  params: { id: string };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const projectId = params.id;

  const session = await getAuthSession();
  if (!session?.user?.email) redirect("/login");

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      tasks: {
        include: {
          assignee: true,
          comments: {
            include: { author: true },
            orderBy: { createdAt: "asc" },
          },
        },
      },
      owner: true,
    },
  });

  if (!project) {
    return (
      <div className="p-8 text-center text-red-600">Project not found.</div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Project Header */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-blue-200">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2 tracking-tight">
            {project.name}
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            {project.description || "No description provided."}
          </p>
        </div>

        {/* Task List */}
        <div className="space-y-6">
          {project.tasks.length === 0 ? (
            <p className="text-center text-gray-500 italic">
              No tasks added yet.
            </p>
          ) : (
            project.tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white border border-blue-100 rounded-xl shadow-md p-5 space-y-4 hover:shadow-lg transition"
              >
                <TaskCard task={task} showActions={false} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
