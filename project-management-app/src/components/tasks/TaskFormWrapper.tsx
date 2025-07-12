'use client';

import { useRouter } from "next/navigation";
import { TaskForm } from "./task-form";

export function TaskFormWrapper({ userId }: { userId: string }) {
  const router = useRouter();

  const handleSuccess = () => {
    router.refresh(); // refresh on task creation
  };

  return <TaskForm userId={userId} onSuccess={handleSuccess} />;
}
