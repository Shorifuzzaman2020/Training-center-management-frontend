// "use client";

// import React from "react";

// const InstructorLayout = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   return (
//     <div className="flex min-h-screen">

//       {/* SIDEBAR */}
//       <aside className="w-64 bg-indigo-900 text-white p-5">
//         <h2 className="text-2xl font-bold mb-6">
//           Instructor Dashboard
//         </h2>

//         <ul className="space-y-3">
//           <li className="hover:bg-indigo-700 p-2 rounded cursor-pointer">
//             Dashboard
//           </li>
//           <li className="hover:bg-indigo-700 p-2 rounded cursor-pointer">
//             Attendance
//           </li>
//           <li className="hover:bg-indigo-700 p-2 rounded cursor-pointer">
//             Marks
//           </li>
//         </ul>
//       </aside>

//       {/* MAIN */}
//       <main className="flex-1 bg-gray-100 p-6">
//         {children}
//       </main>
//     </div>
//   );
// };

// export default InstructorLayout;

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  ClipboardList,
  FileText,
  BarChart3,
} from "lucide-react";

const InstructorDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  /* ✅ NAV LINKS */
  const navLinks = [
    {
      name: "Dashboard",
      href: "/Instructor-dashboard",
      icon: <Users className="w-4 h-4" />,
    },
    {
      name: "Attendance",
      href: "/Instructor-dashboard/attendance",
      icon: <ClipboardList className="w-4 h-4" />,
    },
    {
      name: "Marks",
      href: "/Instructor-dashboard/marks",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      name: "Attendance Report",
      href: "/Instructor-dashboard/attendance-report",
      icon: <BarChart3 className="w-4 h-4" />,
    },
  ];

  /* ✅ AUTH CHECK */
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    const name = localStorage.getItem("userName");

    if (!token) {
      router.push("/login");
      return;
    }

    if (role !== "Instructor") {
      router.push(`/${role}-dashboard`);
      return;
    }

    setUser({
      name: name || "Instructor",
      role,
    });

    setLoading(false);
  }, [router]);

  /* ✅ LOGOUT */
  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  /* RESPONSIVE */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* MOBILE MENU */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded md:hidden"
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      {/* OVERLAY */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:relative z-40 bg-indigo-900 text-white transition-all duration-300
        ${isSidebarOpen ? "w-64" : "w-20"}
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        flex flex-col`}
      >
        {/* HEADER */}
        <div className="p-5 border-b border-indigo-700 flex justify-between items-center">
          {isSidebarOpen && <h2 className="text-xl font-bold">Instructor</h2>}

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:block"
          >
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        {/* NAV */}
        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded transition
              ${
                pathname === link.href
                  ? "bg-blue-600 text-white"
                  : "hover:bg-indigo-700"
              }`}
            >
              {link.icon}
              {isSidebarOpen && <span>{link.name}</span>}
            </Link>
          ))}
        </nav>

        {/* USER + LOGOUT */}
        <div className="p-4 border-t border-indigo-700">
          {isSidebarOpen && (
            <>
              <p className="text-sm">Welcome</p>
              <p className="font-semibold">{user?.name}</p>
            </>
          )}

          <button
            onClick={handleLogout}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
          >
            <LogOut className="w-4 h-4" />
            {isSidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1">
        {/* TOP BAR */}
        <div className="bg-white shadow px-6 py-4 flex justify-between">
          <h1 className="font-semibold">
            {navLinks.find((l) => l.href === pathname)?.name ||
              "Instructor Dashboard"}
          </h1>

          <button
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default InstructorDashboardLayout;
