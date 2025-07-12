"use client";

import { useState } from "react";

interface Props {
  taskId: string;
}

export const CommentForm = ({ taskId }: Props) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/tasks/comment", {
      method: "POST",
      body: JSON.stringify({ taskId, content }),
    });
    setLoading(false);
    setContent("");
    window.location.reload(); // simple reload
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="w-full border rounded px-2 py-1 text-sm"
        rows={2}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="px-2 py-1 text-sm bg-black text-white rounded"
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};
