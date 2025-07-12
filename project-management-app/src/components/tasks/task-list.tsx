// src/components/tasks/task-list.tsx
'use client';

import { useRouter } from "next/navigation";

export function TaskList({ tasks, currentUserId }: { tasks: any[], currentUserId: string }) {
  const router = useRouter();

  const handleComplete = async (id: string) => {
    await fetch(`/api/tasks/${id}/complete`, {
      method: "POST",
    });

    router.refresh(); // Re-fetch updated data
  };

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id} className="border p-4 rounded">
          <p className="font-semibold">{task.title}</p>
          <p className="text-sm">{task.description}</p>
          <p className="text-xs text-gray-600">
            Assigned to: {task.assignee?.name || "Unassigned"} | Project: {task.project.name}
          </p>

          {task.assigneeId === currentUserId && task.status !== "DONE" && (
            <button
              onClick={() => handleComplete(task.id)}
              className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
            >
              Mark as Done
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
