import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Server-side session check
  const session = await getAuthSession();
  if (!session?.user) redirect("/");

  return (
    <div className="flex h-screen overflow-hidden bg-blue-50">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-blue-50">
          {children}
        </main>
      </div>
    </div>
  );
}
