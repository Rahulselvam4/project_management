"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  
  FaNetworkWired,
  FaTachometerAlt,
  FaTasks,
  FaUser,
} from "react-icons/fa";
import { HiMenu } from "react-icons/hi";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { href: "/dashboard/projects", label: "Projects", icon: <FaNetworkWired /> },
  { href: "/dashboard/tasks", label: "Tasks", icon: <FaTasks /> },
  { href: "/dashboard/profile", label: "Profile", icon: <FaUser /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <aside
      className={cn(
        "h-screen bg-white border-r shadow-md group transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      {/* Logo / Menu section */}
      <div className="flex items-center gap-2 p-4 border-b">
        <HiMenu className="text-blue-700 text-xl" />
        {!collapsed && <span className="text-blue-700 font-bold text-xl">Menu</span>}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm font-medium",
              pathname === link.href
                ? "bg-blue-100 text-blue-800"
                : "text-gray-700 hover:bg-gray-100"
            )}
          >
            <span className="text-lg">{link.icon}</span>
            {!collapsed && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
