// src/app/dashboard/page.tsx
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getAuthSession();
  if (!session?.user?.id) redirect("/");

  // Count tasks assigned to the current user and not done
  const assignedTasks = await prisma.task.findMany({
    where: {
      assigneeId: session.user.id,
      status: { not: "DONE" },
    },
  });

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {session.user!.name}</h1>

      {assignedTasks.length > 0 ? (
        <Link href="/dashboard/tasks" className="block bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow hover:bg-yellow-200 transition">
          You have {assignedTasks.length} assigned {assignedTasks.length > 1 ? "tasks" : "task"} pending. Click to view.
        </Link>
      ) : (
        <p className="text-gray-500">No assigned tasks at the moment.</p>
      )}
    </div>
  );
}
