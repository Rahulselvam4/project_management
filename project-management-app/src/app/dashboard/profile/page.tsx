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
    <div className="p-8 min-h-screen bg-blue-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Your Profile</h1>

        <div className="bg-white rounded-lg shadow-lg border border-blue-200 p-6 space-y-6">
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-xl font-semibold text-blue-900">{user.name}</p>
          </div>

          <div className="border-l-4 border-blue-500 pl-4">
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-xl font-semibold text-blue-900">{user.email}</p>
          </div>

          {/* Uncomment this if you want to show role */}
          {/* 
          <div className="border-l-4 border-blue-500 pl-4">
            <p className="text-sm text-gray-500">Role</p>
            <p className="text-xl font-semibold text-blue-900">{user.role}</p>
          </div>
          */}

          <div className="border-l-4 border-blue-500 pl-4">
            <p className="text-sm text-gray-500">Joined</p>
            <p className="text-xl font-semibold text-blue-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
