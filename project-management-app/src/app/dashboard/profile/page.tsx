// src/app/dashboard/profile/page.tsx
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) {
    return (
      <div className="p-8 text-center text-red-600">
        User not found.
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-white rounded shadow p-6 space-y-4 border border-gray-200">
        <div>
          <p className="text-sm text-gray-500">Name</p>
          <p className="text-lg font-medium">{user.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-medium">{user.email}</p>
        </div>

        {/* <div>
          <p className="text-sm text-gray-500">Role</p>
          <p className="text-lg font-medium">{user.role}</p>
        </div> */}

        <div>
          <p className="text-sm text-gray-500">Joined</p>
          <p className="text-lg font-medium">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
