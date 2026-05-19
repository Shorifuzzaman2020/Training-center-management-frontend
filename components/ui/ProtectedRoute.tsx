// components/ProtectedRoute.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");

    if (!token) {
      // Redirect to login if not authenticated
      router.push("/login");
      return;
    }

    setIsAuthenticated(true);
    setUserRole(role);

    // Check role-based access
    if (allowedRoles && role && !allowedRoles.includes(role)) {
      // Redirect to appropriate dashboard if role not allowed
      if (role === "admin") {
        router.push("/dashboard");
      } else {
        router.push(`/${role}-dashboard`);
      }
      return;
    }
  }, [router, allowedRoles, pathname]);

  if (isAuthenticated === null) {
    // Show loading spinner while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
