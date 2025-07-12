'use client';

import { useState } from "react";

interface ProjectFormProps {
  ownerId: string;
  onUpdate?: () => void;
}

export function ProjectForm({ ownerId, onUpdate }: ProjectFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, ownerId }),
    });

    const data = await res.json();

    if (!res.ok) return setMessage(data.error || "Failed to create project");

    setMessage("Project created");
    setName("");
    setDescription("");

    if (onUpdate) onUpdate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded">
      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border px-4 py-2 w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border px-4 py-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Project
      </button>
      {message && <p className="text-sm text-green-600">{message}</p>}
    </form>
  );
}
