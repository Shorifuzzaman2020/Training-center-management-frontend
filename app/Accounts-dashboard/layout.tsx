"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AccountsDashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const navLinks = [
        { name: "Manage Training", href: "/dashboard/create-training" },
        { name: "Manage Trainer", href: "/dashboard/assign-trainer" },
        { name: "Manage Category", href: "/dashboard/create-category"},
        { name: "Manage Banner", href: "/dashboard/dynamic-banner" },
        // { name: "Create User", href: "/dashboard/create-users"},
        // { name: "User List", href: "/dashboard/user-table"},
        // { name: "Create Service", href: "/dashboard/services"},
        { name: "Manage Staff", href: "/dashboard/create-staff"},
        { name: "Manage Role", href: "/dashboard/role-management"},
        { name: "Manage Course", href: "/dashboard/create-course"},
        { name: "Manage Batch", href: "/dashboard/create-batch"},
        { name: "Manage Notice", href: "/dashboard/notice"},
        { name: "Create Blog", href: "dashboard/create-blog"},
    ];

    return (
        <div className="flex min-h-screen">

            {/* SIDEBAR */}
            <aside className="w-64 bg-indigo-900 text-white p-5">
                <h2 className="text-2xl font-bold mb-8">Accounts Dashboard</h2>

                <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 rounded-md transition-all
        ${pathname === link.href
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-slate-700"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 bg-gray-100 p-8">
                {children}
            </main>
        </div>
    );
};

export default AccountsDashboardLayout;