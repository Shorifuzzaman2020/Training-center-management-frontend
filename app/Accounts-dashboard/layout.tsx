// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";

// const AccountsDashboardLayout = ({ children }: { children: React.ReactNode }) => {
//     const pathname = usePathname();

//     const navLinks = [
//         { name: "Manage Notice", href: "/Accounts-dashboard/notice"},
//         { name: "Create Blog", href: "/Accounts-dashboard/create-blog"},
//         { name: "Manage Admission", href: "/admission-management"},
//         { name: "Manage Salary", href: "/Accounts-dashboard/salary-management"},
//     ];

//     return (
//         <div className="flex min-h-screen">

//             {/* SIDEBAR */}
//             <aside className="w-64 bg-indigo-900 text-white p-5">
//                 <h2 className="text-2xl font-bold mb-8">Accounts Dashboard</h2>

//                 <nav className="flex flex-col gap-2">
//                     {navLinks.map((link) => (
//                         <Link
//                             key={link.href}
//                             href={link.href}
//                             className={`px-4 py-2 rounded-md transition-all
//         ${pathname === link.href
//                                     ? "bg-blue-500 text-white"
//                                     : "hover:bg-slate-700"
//                                 }`}
//                         >
//                             {link.name}
//                         </Link>
//                     ))}
//                 </nav>
//             </aside>

//             {/* MAIN CONTENT */}
//             <main className="flex-1 bg-gray-100 p-8">
//                 {children}
//             </main>
//         </div>
//     );
// };

// export default AccountsDashboardLayout;




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
  LayoutDashboard,
  FileText,
  Bell,
  DollarSign,
} from "lucide-react";

const AccountsDashboardLayout = ({
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
      name: "Manage Notice",
      href: "/Accounts-dashboard/notice",
      icon: <Bell className="w-4 h-4" />,
    },
    {
      name: "Create Blog",
      href: "/Accounts-dashboard/create-blog",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      name: "Manage Admission",
      href: "/admission-management",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      name: "Manage Salary",
      href: "/Accounts-dashboard/salary-management",
      icon: <DollarSign className="w-4 h-4" />,
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

    if (role !== "Accounts") {
      router.push(`/${role}-dashboard`);
      return;
    }

    setUser({
      name: name || "Accounts User",
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
      {/* MOBILE MENU BUTTON */}
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
          {isSidebarOpen && (
            <h2 className="text-xl font-bold">Accounts Panel</h2>
          )}

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
            {navLinks.find((l) => l.href === pathname)?.name || "Dashboard"}
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

export default AccountsDashboardLayout;





// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import {
//   Menu,
//   X,
//   LogOut,
//   ChevronDown,
//   LayoutDashboard,
//   Bell,
//   FileText,
//   Users,
//   DollarSign,
//   GraduationCap,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// const AccountsDashboardLayout = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState<{
//     name: string;
//     email: string;
//     role: string;
//   } | null>(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // Navigation structure with icons and categories
//   const navCategories = [
//     {
//       title: "Content Management",
//       icon: <FileText className="w-5 h-5" />,
//       links: [
//         {
//           name: "Manage Notice",
//           href: "/accounts-dashboard/notice",
//           icon: <Bell className="w-4 h-4" />,
//         },
//         {
//           name: "Create Blog",
//           href: "/accounts-dashboard/create-blog",
//           icon: <FileText className="w-4 h-4" />,
//         },
//       ],
//     },
//     {
//       title: "Financial Management",
//       icon: <DollarSign className="w-5 h-5" />,
//       links: [
//         {
//           name: "Manage Admission",
//           href: "/accounts-dashboard/admission-management",
//           icon: <GraduationCap className="w-4 h-4" />,
//         },
//         {
//           name: "Manage Salary",
//           href: "/accounts-dashboard/salary-management",
//           icon: <Users className="w-4 h-4" />,
//         },
//       ],
//     },
//   ];

//   // Flatten links for mobile view
//   const allNavLinks = navCategories.flatMap((category) => category.links);

//   // Check authentication
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     const userRole = localStorage.getItem("userRole");
//     const userName = localStorage.getItem("userName");
//     const userEmail = localStorage.getItem("userEmail");

//     // Redirect if not authenticated
//     if (!token) {
//       router.push("/login");
//       return;
//     }

//     // Check if user has accounts role
//     if (userRole !== "accounts") {
//       // Redirect to appropriate dashboard
//       if (userRole === "admin") {
//         router.push("/dashboard");
//       } else if (userRole) {
//         router.push(`/${userRole}-dashboard`);
//       } else {
//         router.push("/login");
//       }
//       return;
//     }

//     // Set user data
//     setUser({
//       name: userName || "Accounts User",
//       email: userEmail || "accounts@example.com",
//       role: userRole || "accounts",
//     });

//     setIsLoading(false);
//   }, [router]);

//   // Handle logout
//   const handleLogout = () => {
//     localStorage.removeItem("authToken");
//     localStorage.removeItem("userRole");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("userName");
//     router.push("/login");
//   };

//   // Handle window resize for responsive sidebar
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       } else {
//         setIsSidebarOpen(true);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [pathname]);

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
//         <div className="text-center">
//           <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
//           <p className="mt-4 text-gray-600 font-medium">Verifying access...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         className="fixed top-4 left-4 z-50 p-2 bg-emerald-600 text-white rounded-lg md:hidden shadow-lg"
//       >
//         {isMobileMenuOpen ? (
//           <X className="w-5 h-5" />
//         ) : (
//           <Menu className="w-5 h-5" />
//         )}
//       </button>

//       {/* Overlay for mobile */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}

//       {/* SIDEBAR - Desktop */}
//       <aside
//         className={`fixed md:relative z-40 bg-gradient-to-b from-emerald-900 to-emerald-800 text-white transition-all duration-300 ease-in-out
//                     ${isSidebarOpen ? "w-72" : "w-20"}
//                     ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//                     flex flex-col h-full min-h-screen shadow-2xl`}
//       >
//         {/* Logo & Header */}
//         <div
//           className={`p-6 border-b border-emerald-700/50 ${!isSidebarOpen && "md:px-3"}`}
//         >
//           <div className="flex items-center justify-between">
//             <div
//               className={`flex items-center space-x-3 ${!isSidebarOpen && "md:justify-center md:w-full"}`}
//             >
//               <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
//                 <DollarSign className="w-6 h-6 text-white" />
//               </div>
//               {isSidebarOpen && (
//                 <div>
//                   <h1 className="text-xl font-bold">Accounts Panel</h1>
//                   <p className="text-xs text-emerald-300">
//                     Financial Management
//                   </p>
//                 </div>
//               )}
//             </div>
//             {isSidebarOpen && (
//               <button
//                 onClick={() => setIsSidebarOpen(false)}
//                 className="hidden md:block p-1 hover:bg-emerald-700 rounded-lg transition-colors"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
//             )}
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-6">
//           {navCategories.map((category, idx) => (
//             <div key={idx} className="space-y-2">
//               {isSidebarOpen && (
//                 <div className="flex items-center space-x-2 px-3 py-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
//                   {category.icon}
//                   <span>{category.title}</span>
//                 </div>
//               )}
//               <div className="space-y-1">
//                 {category.links.map((link) => (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
//                                             ${
//                                               pathname === link.href
//                                                 ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
//                                                 : "text-emerald-100 hover:bg-emerald-700/50 hover:text-white"
//                                             }
//                                             ${!isSidebarOpen && "md:justify-center md:px-2"}`}
//                     title={!isSidebarOpen ? link.name : ""}
//                   >
//                     <span
//                       className={`${pathname === link.href ? "text-white" : "text-emerald-300 group-hover:text-white"} transition-colors`}
//                     >
//                       {link.icon}
//                     </span>
//                     {isSidebarOpen && (
//                       <span className="text-sm font-medium">{link.name}</span>
//                     )}
//                     {pathname === link.href && isSidebarOpen && (
//                       <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
//                     )}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </nav>

//         {/* User Profile Section */}
//         <div className="p-4 border-t border-emerald-700/50">
//           {isSidebarOpen ? (
//             <div className="relative">
//               <button
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className="flex items-center space-x-3 w-full p-2 rounded-xl hover:bg-emerald-700/50 transition-colors"
//               >
//                 <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
//                   <span className="text-white font-semibold">
//                     {user?.name.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//                 <div className="flex-1 text-left">
//                   <p className="text-sm font-semibold">{user?.name}</p>
//                   <p className="text-xs text-emerald-300">{user?.email}</p>
//                 </div>
//                 <ChevronDown
//                   className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
//                 />
//               </button>

//               {isDropdownOpen && (
//                 <div className="absolute bottom-full left-0 right-0 mb-2 bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden">
//                   <button
//                     onClick={handleLogout}
//                     className="flex items-center space-x-3 w-full px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
//                   >
//                     <LogOut className="w-4 h-4" />
//                     <span className="text-sm font-medium">Logout</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <button
//               onClick={() => setIsSidebarOpen(true)}
//               className="w-full p-2 hover:bg-emerald-700/50 rounded-xl transition-colors flex justify-center"
//             >
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           )}
//         </div>
//       </aside>

//       {/* Expand/Collapse Button for Desktop */}
//       {!isSidebarOpen && (
//         <button
//           onClick={() => setIsSidebarOpen(true)}
//           className="hidden md:flex fixed left-4 top-24 z-50 p-2 bg-emerald-600 text-white rounded-lg shadow-lg hover:bg-emerald-700 transition-colors"
//         >
//           <ChevronRight className="w-5 h-5" />
//         </button>
//       )}

//       {/* MAIN CONTENT */}
//       <main className={`flex-1 transition-all duration-300`}>
//         {/* Top Navbar */}
//         <div className="bg-white shadow-sm sticky top-0 z-20">
//           <div className="flex justify-between items-center px-6 py-4">
//             <div className="flex items-center space-x-4">
//               <h2 className="text-xl font-semibold text-gray-800 hidden md:block">
//                 {(() => {
//                   const currentLink = allNavLinks.find(
//                     (link) => link.href === pathname,
//                   );
//                   return currentLink?.name || "Accounts Dashboard";
//                 })()}
//               </h2>
//             </div>
//             <div className="flex items-center space-x-4">
//               {/* Mobile user info */}
//               <div className="md:hidden flex items-center space-x-3">
//                 <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
//                   <span className="text-white text-sm font-semibold">
//                     {user?.name.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                 >
//                   <LogOut className="w-5 h-5" />
//                 </button>
//               </div>

//               {/* Desktop user info */}
//               <div className="hidden md:flex items-center space-x-4">
//                 <span className="text-sm text-gray-600">Welcome,</span>
//                 <span className="text-sm font-semibold text-gray-800">
//                   {user?.name}
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center space-x-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                 >
//                   <LogOut className="w-4 h-4" />
//                   <span className="text-sm">Logout</span>
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Page Content */}
//         <div className="p-6 md:p-8">{children}</div>
//       </main>
//     </div>
//   );
// };

// export default AccountsDashboardLayout;
