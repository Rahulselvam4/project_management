'use client';

import { useState, useEffect } from "react";

export function TaskForm({
  userId,
  onSuccess,
}: {
  userId: string;
  onSuccess?: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedToId, setAssignedToId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [usersRes, projectsRes] = await Promise.all([
        fetch("/api/users"),
        fetch("/api/projects/owned"),
      ]);
      setUsers(await usersRes.json());
      setProjects(await projectsRes.json());
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, assignedToId, projectId }),
    });

    const data = await res.json();
    if (!res.ok) return setMessage(data.error || "Failed to create task");

    setMessage("Task created successfully!");
    setTitle("");
    setDescription("");
    setAssignedToId("");
    setProjectId("");

    if (onSuccess) onSuccess(); // 🔁 trigger page refresh
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border px-4 py-2 w-full"
      />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border px-4 py-2 w-full"
      />

      <select
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
        className="border px-4 py-2 w-full"
        required
      >
        <option value="">Select Project</option>
        {projects.map((project: any) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>

      <select
        value={assignedToId}
        onChange={(e) => setAssignedToId(e.target.value)}
        className="border px-4 py-2 w-full"
      >
        <option value="">Assign to...</option>
        {users.map((user: any) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Task
      </button>

      {message && <p className="text-sm text-green-600">{message}</p>}
    </form>
  );
}
