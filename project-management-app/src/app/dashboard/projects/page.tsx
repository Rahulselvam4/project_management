import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ProjectFormWrapper } from "@/components/projects/ProjectFormWrapper";
import Link from "next/link";

export default async function ProjectsPage() {
  const session = await getAuthSession();
  if (!session?.user?.id) redirect("/");

  const userId = session.user.id;

  // Projects created by user
  const ownedProjects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });

  // Projects you're working on (based on tasks you're assigned)
  const assignedTasks = await prisma.task.findMany({
    where: { assigneeId: userId },
    include: { project: true },
  });

  // Extract unique project IDs from assigned tasks (excluding owned projects)
  const workingProjectsMap = new Map<string, typeof assignedTasks[0]["project"]>();
  assignedTasks.forEach((task) => {
    if (task.project.ownerId !== userId) {
      workingProjectsMap.set(task.project.id, task.project);
    }
  });

  const workingProjects = Array.from(workingProjectsMap.values());

  return (
    <div className="p-8 min-h-screen bg-blue-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-blue-800">Your Projects</h1>

        {/* Project creation form */}
        <div className="bg-white border border-blue-100 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Create New Project</h2>
          <ProjectFormWrapper ownerId={userId} />
        </div>

        {/* Section 1: Projects created by you */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">Projects Created by You</h2>
          {ownedProjects.length === 0 ? (
            <p className="text-gray-600">You haven’t created any projects yet.</p>
          ) : (
            ownedProjects.map((project) => (
              <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
                <div className="bg-white p-5 rounded-lg shadow hover:shadow-md border border-blue-100 transition cursor-pointer">
                  <p className="text-lg font-semibold text-blue-800">{project.name}</p>
                  <p className="text-sm text-gray-600">
                    {project.description || "No description provided"}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Section 2: Projects you're working on */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-blue-700">Projects You're Working On</h2>
          {workingProjects.length === 0 ? (
            <p className="text-gray-600">You are not assigned to any tasks in other projects.</p>
          ) : (
            workingProjects.map((project) => (
              <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
                <div className="bg-white p-5 rounded-lg shadow hover:shadow-md border border-blue-100 transition cursor-pointer">
                  <p className="text-lg font-semibold text-blue-800">{project.name}</p>
                  <p className="text-sm text-gray-600">
                    {project.description || "No description provided"}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
