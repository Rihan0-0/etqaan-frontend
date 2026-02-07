"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import PageLoader from "@/components/ui/PageLoader";

interface Batch {
  id: number;
  name: string;
  schedule_description?: string;
  _count?: {
    batch_students: number;
  };
}

interface Stats {
  totalStudents: number;
  todaySessions: number;
  upcomingExams: number;
}

export default function SheikhDashboard() {
  const { user, logout } = useAuth();
  const [batches, setBatches] = useState<Batch[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    todaySessions: 0,
    upcomingExams: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api-v1";

  useEffect(() => {
    // Mock data for now
    setTimeout(() => {
      setBatches([
        {
          id: 1,
          name: "حلقة الأسود 🦁",
          schedule_description: "السبت والاثنين والأربعاء",
          _count: { batch_students: 15 },
        },
        {
          id: 2,
          name: "حلقة النجوم ⭐",
          schedule_description: "الأحد والثلاثاء والخميس",
          _count: { batch_students: 12 },
        },
      ]);
      setStats({ totalStudents: 27, todaySessions: 5, upcomingExams: 2 });
      setIsLoading(false);
    }, 500);
  }, [API_URL]);

  return (
    <ProtectedRoute allowedRoles={["sheikh"]}>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold font-arabic flex items-center gap-3">
                  <span className="text-3xl">🕌</span>
                  لوحة تحكم الشيخ
                </h1>
                <p className="text-emerald-100 font-arabic mt-1">
                  مرحباً، {user?.name}
                </p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl font-arabic transition-colors flex items-center gap-2"
              >
                <span>🚪</span>
                تسجيل الخروج
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {isLoading ? (
            <PageLoader />
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <span className="text-3xl">👨‍🎓</span>
                    </div>
                    <div>
                      <p className="text-gray-500 font-arabic text-sm">
                        إجمالي الطلاب
                      </p>
                      <p className="text-3xl font-bold text-gray-800">
                        {stats.totalStudents}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                      <span className="text-3xl">📅</span>
                    </div>
                    <div>
                      <p className="text-gray-500 font-arabic text-sm">
                        جلسات اليوم
                      </p>
                      <p className="text-3xl font-bold text-gray-800">
                        {stats.todaySessions}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                      <span className="text-3xl">📝</span>
                    </div>
                    <div>
                      <p className="text-gray-500 font-arabic text-sm">
                        امتحانات قادمة
                      </p>
                      <p className="text-3xl font-bold text-gray-800">
                        {stats.upcomingExams}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* My Batches */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-gray-800 font-arabic mb-4 flex items-center gap-2">
                  <span>📚</span>
                  حلقاتي
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {batches.map((batch) => (
                    <Link
                      key={batch.id}
                      href={`/batches/${batch.id}`}
                      className="border-2 border-gray-100 hover:border-emerald-200 rounded-xl p-5 transition-all hover:shadow-md group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-800 font-arabic text-lg group-hover:text-emerald-700 transition-colors">
                            {batch.name}
                          </h3>
                          <p className="text-gray-500 font-arabic text-sm mt-1">
                            {batch.schedule_description}
                          </p>
                        </div>
                        <div className="text-center">
                          <span className="text-3xl block mb-1">👨‍🎓</span>
                          <span className="text-gray-600 font-arabic text-sm">
                            {batch._count?.batch_students || 0} طالب
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
