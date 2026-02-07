"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push("/batches");
      return;
    }

    // Role-based redirection
    switch (user?.role) {
      case "super_admin":
      case "admin":
        router.push("/admin");
        break;
      case "sheikh":
        router.push("/sheikh");
        break;
      case "student":
        router.push("/student/dashboard");
        break;
      default:
        // Fallback for unknown roles
        router.push("/batches");
    }
  }, [isAuthenticated, isLoading, user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🕌</div>
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-arabic text-lg animate-pulse">
          جاري التوجيه...
        </p>
      </div>
    </div>
  );
}
