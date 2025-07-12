import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { TaskFormWrapper } from "@/components/tasks/TaskFormWrapper"; // ✅ Wrapper
import { TaskList } from "@/components/tasks/task-list";

export default async function TasksPage() {
  const session = await getAuthSession();
  if (!session?.user?.id) redirect("/");

  const userId = session.user.id;

  const ownedProjects = await prisma.project.findMany({
    where: { ownerId: userId },
  });

  const tasks = await prisma.task.findMany({
    where: {
      OR: [
        { project: { ownerId: userId } },
        { assigneeId: userId },
      ],
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
    <div className="p-8 space-y-10">
      <h1 className="text-3xl font-bold mb-4">Tasks</h1>

      {/* ✅ Wrapper only accepts data */}
      {ownedProjects.length > 0 ? (
        <TaskFormWrapper userId={userId} />
      ) : (
        <p className="text-gray-600">No projects found. Create a project first.</p>
      )}

      <section>
        <h2 className="text-xl font-semibold mb-2">Tasks Created by Me</h2>
        <TaskList tasks={tasksCreatedByUser} currentUserId={userId} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Tasks Assigned To Me</h2>
        <TaskList tasks={tasksAssignedToUser} currentUserId={userId} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Tasks Completed By Me</h2>
        <TaskList tasks={tasksCompletedByUser} currentUserId={userId} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Tasks Completed by People I Assigned</h2>
        <TaskList tasks={tasksCompletedByAssignedUsers} currentUserId={userId} />
      </section>
    </div>
  );
}
