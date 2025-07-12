'use client';

import { useRouter } from "next/navigation";
import { ProjectForm } from "./project-form";

interface Props {
  ownerId: string;
}

export function ProjectFormWrapper({ ownerId }: Props) {
  const router = useRouter();

  const handleUpdate = () => {
    router.refresh(); // refreshes project list after new one is added
  };

  return <ProjectForm ownerId={ownerId} onUpdate={handleUpdate} />;
}
