import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ProjectFormWrapper } from "@/components/projects/ProjectFormWrapper";

export default async function ProjectsPage() {
  const session = await getAuthSession();
  if (!session?.user?.id) redirect("/");

  const userId = session.user.id;

  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Projects</h1>

      {/* ✅ Handles form + refresh on submit */}
      <ProjectFormWrapper ownerId={userId} />

      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="border p-4 rounded">
            <p className="text-lg font-semibold">{project.name}</p>
            <p className="text-sm text-gray-600">{project.description || "No description"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
