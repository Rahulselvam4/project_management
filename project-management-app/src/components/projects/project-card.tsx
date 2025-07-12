'use client';

import { useState } from 'react';
import { ProjectForm } from './project-form';

export function ProjectCard({ project, ownerId, onUpdate }: any) {
  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this project?');
    if (!confirm) return;

    await fetch(`/api/projects/${project.id}`, { method: 'DELETE' });
    onUpdate();
  };

  return (
    <div className="border p-4 rounded">
      {editing ? (
        <ProjectForm
          ownerId={ownerId}
          initialData={{ id: project.id, name: project.name, description: project.description }}
          onSuccess={() => {
            setEditing(false);
            onUpdate();
          }}
        />
      ) : (
        <>
          <h3 className="text-lg font-bold">{project.name}</h3>
          <p>{project.description}</p>
          <div className="mt-2 flex gap-2">
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
