'use client';

import { useRouter } from "next/navigation";

export function TaskList({ tasks, currentUserId }: { tasks: any[], currentUserId: string }) {
  const router = useRouter();

  const handleComplete = async (id: string) => {
    await fetch(`/api/tasks/${id}/complete`, {
      method: "POST",
    });

    router.refresh();
  };

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li key={task.id} className="bg-white border border-blue-100 p-5 rounded-lg shadow hover:shadow-md transition">
          <p className="text-lg font-semibold text-blue-800">{task.title}</p>
          <p className="text-sm text-gray-700">{task.description}</p>
          <p className="text-xs text-gray-500 mt-1">
            Assigned to: <strong>{task.assignee?.name || "Unassigned"}</strong><br />
            Project: <strong>{task.project.name}</strong>
          </p>

          {task.assigneeId === currentUserId && task.status !== "DONE" && (
            <button
              onClick={() => handleComplete(task.id)}
              className="mt-3 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              ✅ Mark as Done
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
