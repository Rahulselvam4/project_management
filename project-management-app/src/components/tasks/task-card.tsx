'use client';

import { useState } from 'react';
import { TaskForm } from './task-form';

export function TaskCard({ task, currentUserId, onUpdate }: any) {
  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm('Delete this task?');
    if (!confirm) return;
    await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
    onUpdate();
  };

  return (
    <div className="border p-4 rounded">
      {editing ? (
        <TaskForm
          initialData={{
            id: task.id,
            title: task.title,
            description: task.description,
            projectId: task.projectId,
            assigneeId: task.assigneeId,
          }}
          onSuccess={() => {
            setEditing(false);
            onUpdate();
          }}
        />
      ) : (
        <>
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p className="text-sm">{task.description}</p>
          <p className="text-xs text-gray-500">
            Project: {task.project?.name} <br />
            Assigned to: {task.assignee?.name || 'Unassigned'}
          </p>
          <div className="mt-2 flex gap-2">
            {task.assigneeId === currentUserId && task.status !== 'DONE' && (
              <form
                action={`/api/tasks/${task.id}/complete`}
                method="POST"
                className="inline"
              >
                <button className="text-green-600 text-sm">Mark as Done</button>
              </form>
            )}
            <button onClick={() => setEditing(true)} className="text-blue-600 text-sm">
              Edit
            </button>
            <button onClick={handleDelete} className="text-red-600 text-sm">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
