"use client";

export function TaskCard({ task, currentUserId }: any) {
  return (
    <div className="border border-blue-200 bg-white p-5 rounded-xl shadow-sm hover:shadow transition">
      <h3 className="text-lg font-semibold text-blue-800">{task.title}</h3>
      <p className="text-sm text-gray-700">{task.description}</p>
      <p className="text-xs text-gray-500 mt-1">
        <span className="font-medium">Project:</span> {task.project?.name} <br />
        <span className="font-medium">Assigned to:</span>{" "}
        {task.assignee?.name || "Unassigned"}
      </p>

      {task.assigneeId === currentUserId && task.status !== "DONE" && (
        <form
          action={`/api/tasks/${task.id}/complete`}
          method="POST"
          className="mt-3"
        >
          <button className="text-sm text-green-600 hover:underline">
            ✅ Mark as Done
          </button>
        </form>
      )}
    </div>
  );
}
