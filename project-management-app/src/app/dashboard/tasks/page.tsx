import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import TasksSection from "./TasksSection";

export default async function TasksPage() {
  const session = await getAuthSession();
  if (!session?.user?.id) redirect("/");

  const userId = session.user.id;

  const ownedProjects = await prisma.project.findMany({
    where: { ownerId: userId },
  });

  const tasks = await prisma.task.findMany({
    where: {
      OR: [{ project: { ownerId: userId } }, { assigneeId: userId }],
    },
    include: {
      assignee: true,
      project: true,
    },
  });

  const tasksCreatedByUser = tasks.filter(
    (task) => task.project.ownerId === userId
  );
  const tasksAssignedToUser = tasks.filter(
    (task) => task.assigneeId === userId && task.status !== "DONE"
  );
  const tasksCompletedByUser = tasks.filter(
    (task) => task.assigneeId === userId && task.status === "DONE"
  );
  const tasksCompletedByAssignedUsers = tasks.filter(
    (task) =>
      task.project.ownerId === userId &&
      task.assigneeId !== userId &&
      task.status === "DONE"
  );

  return (
    <div className="p-8 min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-3xl font-bold text-blue-800">Task Dashboard</h1>

        <TasksSection
          userId={userId}
          ownedProjects={ownedProjects}
          tasksCreatedByUser={tasksCreatedByUser}
          tasksAssignedToUser={tasksAssignedToUser}
          tasksCompletedByUser={tasksCompletedByUser}
          tasksCompletedByAssignedUsers={tasksCompletedByAssignedUsers}
        />
      </div>
    </div>
  );
}
