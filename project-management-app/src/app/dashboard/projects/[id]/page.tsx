import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { TaskCard } from "@/components/tasks/task-card";
import { TaskForm } from "@/components/tasks/task-form";
import { CommentList } from "@/components/tasks/comment-list";
import { CommentForm } from "@/components/tasks/comment-form";

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  const project = await prisma.project.findUnique({
    where: { id: params.id },
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
    return <div>Project not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{project.name}</h1>
      <p className="text-gray-700">{project.description}</p>

      {/* Add Task */}
      {currentUser?.id === project.ownerId && (
        <div className="my-4">
          <TaskForm projectId={project.id} />
        </div>
      )}

      <div className="space-y-6">
        {project.tasks.map((task) => (
          <div key={task.id} className="border rounded-md p-4 shadow-sm">
            <TaskCard task={task} />

            {/* Comments */}
            <CommentList comments={task.comments} />

            {/* Comment form if user is assignee */}
            {task.assigneeId === currentUser?.id && (
              <CommentForm taskId={task.id} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
