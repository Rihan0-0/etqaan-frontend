"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  // Determine the route type and user info
  const routeInfo = useMemo(() => {
    if (pathname.startsWith("/admin")) {
      return {
        type: "admin",
        title: "أكاديمية إتقان - لوحة المدير",
        gradient: "bg-gradient-to-r from-purple-700 to-indigo-800",
        navItems: [
          { href: "/", label: "الرئيسية", icon: "🏠" },
          { href: "/admin", label: "لوحة التحكم", icon: "🛡️" },
        ],
      };
    } else if (pathname.startsWith("/sheikh")) {
      return {
        type: "sheikh",
        title: "أكاديمية إتقان - لوحة الشيخ",
        gradient: "bg-gradient-to-r from-emerald-600 to-teal-700",
        navItems: [
          { href: "/", label: "الرئيسية", icon: "🏠" },
          { href: "/sheikh", label: "لوحة التحكم", icon: "📊" },
        ],
      };
    } else if (pathname.startsWith("/student/dashboard")) {
      return {
        type: "student-dashboard",
        title: "أكاديمية إتقان - لوحة الطالب",
        gradient: "bg-gradient-to-r from-blue-600 to-indigo-700",
        navItems: [
          { href: "/", label: "الرئيسية", icon: "🏠" },
          { href: "/student/dashboard", label: "لوحة التحكم", icon: "📊" },
        ],
      };
    } else if (pathname.startsWith("/batches")) {
      return {
        type: "batches",
        title: "أكاديمية إتقان",
        gradient: "bg-gradient-to-r from-purple-600 to-blue-600",
        navItems: [
          { href: "/", label: "الرئيسية", icon: "🏠" },
          { href: "/batches", label: "الحلقات", icon: "📚" },
        ],
      };
    } else if (pathname.startsWith("/login")) {
      return {
        type: "login",
        title: "أكاديمية إتقان",
        gradient: "bg-gradient-to-r from-purple-600 to-blue-600",
        navItems: [{ href: "/", label: "الرئيسية", icon: "🏠" }],
      };
    } else {
      return {
        type: "general",
        title: "أكاديمية إتقان",
        gradient: "bg-gradient-to-r from-purple-600 to-purple-700",
        navItems: [
          { href: "/", label: "الرئيسية", icon: "🏠" },
          { href: "/batches", label: "الحلقات", icon: "📚" },
          { href: "/about", label: "من نحن", icon: "ℹ️" },
        ],
      };
    }
  }, [pathname]);

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.role) {
      case "super_admin":
      case "admin":
        return "/admin";
      case "sheikh":
        return "/sheikh";
      case "student":
        return "/student/dashboard";
      default:
        return null;
    }
  };

  return (
    <header
      className={`${routeInfo.gradient} backdrop-blur-sm text-white p-4 card-shadow-lg border-b border-white/20`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Row - Logo and User Info */}
        <div className="flex justify-between items-center mb-4">
          <Link
            href="/"
            className="text-2xl font-bold hover:text-white/80 transition-all duration-300 font-arabic flex items-center"
          >
            <span className="text-3xl ml-3">🕌</span>
            {routeInfo.title}
          </Link>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <div className="font-semibold font-arabic">
                    مرحباً، {user.name}
                  </div>
                  <div className="text-sm text-white/70 font-arabic">
                    {user.role === "super_admin" && "مدير عام"}
                    {user.role === "admin" && "مدير"}
                    {user.role === "sheikh" && "شيخ"}
                    {user.role === "student" && "طالب"}
                  </div>
                </div>
                {getDashboardLink() &&
                  !pathname.startsWith(getDashboardLink()!) && (
                    <Link
                      href={getDashboardLink()!}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-arabic transition-colors"
                    >
                      لوحة التحكم
                    </Link>
                  )}
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-arabic transition-colors flex items-center gap-2"
                >
                  <span>🚪</span>
                  <span className="hidden sm:inline">خروج</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/batches"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-arabic transition-colors flex items-center gap-2"
                >
                  <span>🔍</span>
                  <span className="hidden sm:inline">ابحث عن حلقتك</span>
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 bg-white text-purple-700 hover:bg-white/90 rounded-xl font-arabic font-semibold transition-colors flex items-center gap-2"
                >
                  <span>🔐</span>
                  تسجيل الدخول
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Row */}
        <nav className="border-t border-white/20 pt-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 bg-white/10 rounded-full p-2">
              {routeInfo.navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-arabic font-medium
                    ${
                      isActiveLink(item.href)
                        ? "bg-white/20 text-white shadow-md"
                        : "hover:bg-white/10 text-white/90 hover:text-white"
                    }
                  `}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
