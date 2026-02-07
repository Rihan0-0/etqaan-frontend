"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import LeaderboardPreview from "@/components/public/LeaderboardPreview";
import Link from "next/link";
import PageLoader from "@/components/ui/PageLoader";

interface Batch {
  id: number;
  name: string;
  schedule_description?: string;
  rank?: number;
  points?: number;
}

interface RecentSession {
  id: number;
  date: string;
  attendance: string;
  jadeed_grade?: string;
  muraja_grade?: string;
}

export default function StudentDashboardPage() {
  const { user, logout } = useAuth();
  const [batches, setBatches] = useState<Batch[]>([]);
  const [recentSessions, setRecentSessions] = useState<RecentSession[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  const [myRank, setMyRank] = useState(0);

  useEffect(() => {
    // Mock data for development
    setTimeout(() => {
      setBatches([
        {
          id: 1,
          name: "حلقة الأسود 🦁",
          schedule_description: "السبت والاثنين والأربعاء",
          rank: 3,
          points: 120,
        },
      ]);
      setRecentSessions([
        {
          id: 1,
          date: "2026-02-05",
          attendance: "حاضر",
          jadeed_grade: "ممتاز",
          muraja_grade: "جيد جداً",
        },
        {
          id: 2,
          date: "2026-02-03",
          attendance: "حاضر",
          jadeed_grade: "جيد جداً",
          muraja_grade: "ممتاز",
        },
        {
          id: 3,
          date: "2026-02-01",
          attendance: "متأخر",
          jadeed_grade: "جيد",
          muraja_grade: "-",
        },
      ]);
      setLeaderboard([
        { id: 1, name: "عبدالرحمن أحمد", points: 150, avatarIndex: 0 },
        { id: 2, name: "محمد علي", points: 135, avatarIndex: 1 },
        { id: 3, name: "يوسف خالد", points: 120, avatarIndex: 2 },
      ]);
      setTotalPoints(120);
      setMyRank(3);
      setIsLoading(false);
    }, 500);
  }, []);

  const getAttendanceStyle = (attendance: string) => {
    switch (attendance) {
      case "حاضر":
        return "bg-green-100 text-green-700";
      case "غائب":
        return "bg-red-100 text-red-700";
      case "متأخر":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <ProtectedRoute allowedRoles={["student"]}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold font-arabic flex items-center gap-3">
                  <span className="text-3xl">🎓</span>
                  لوحة الطالب
                </h1>
                <p className="text-blue-100 font-arabic mt-1">
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
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-yellow-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <span className="text-3xl">⭐</span>
                    </div>
                    <div>
                      <p className="text-gray-500 font-arabic text-sm">نقاطي</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {totalPoints}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                      <span className="text-3xl">🏆</span>
                    </div>
                    <div>
                      <p className="text-gray-500 font-arabic text-sm">
                        ترتيبي
                      </p>
                      <p className="text-3xl font-bold text-gray-800">
                        #{myRank}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                      <span className="text-3xl">📚</span>
                    </div>
                    <div>
                      <p className="text-gray-500 font-arabic text-sm">
                        حلقاتي
                      </p>
                      <p className="text-3xl font-bold text-gray-800">
                        {batches.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Sessions */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-gray-800 font-arabic mb-4 flex items-center gap-2">
                      <span>📅</span>
                      آخر الجلسات
                    </h2>

                    <div className="space-y-3">
                      {recentSessions.map((session) => (
                        <div
                          key={session.id}
                          className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-arabic text-gray-800 font-semibold">
                              {new Date(session.date).toLocaleDateString(
                                "ar-EG",
                                {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                },
                              )}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-arabic ${getAttendanceStyle(
                                session.attendance,
                              )}`}
                            >
                              {session.attendance}
                            </span>
                          </div>
                          <div className="flex gap-4 text-sm text-gray-600 font-arabic">
                            {session.jadeed_grade && (
                              <span>
                                الحفظ:{" "}
                                <span className="font-semibold">
                                  {session.jadeed_grade}
                                </span>
                              </span>
                            )}
                            {session.muraja_grade && (
                              <span>
                                المراجعة:{" "}
                                <span className="font-semibold">
                                  {session.muraja_grade}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* My Batches */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
                    <h2 className="text-xl font-bold text-gray-800 font-arabic mb-4 flex items-center gap-2">
                      <span>📚</span>
                      حلقاتي
                    </h2>

                    <div className="space-y-3">
                      {batches.map((batch) => (
                        <div
                          key={batch.id}
                          className="border-2 border-blue-100 rounded-xl p-4 bg-blue-50/50"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-bold text-gray-800 font-arabic text-lg">
                                {batch.name}
                              </h3>
                              <p className="text-gray-500 font-arabic text-sm">
                                {batch.schedule_description}
                              </p>
                            </div>
                            <div className="text-center">
                              <span className="text-2xl">🥉</span>
                              <p className="text-sm font-arabic text-gray-600">
                                المركز {batch.rank}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar - Leaderboard */}
                <div className="lg:col-span-1">
                  <LeaderboardPreview students={leaderboard} />

                  {/* Quick Tips */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
                    <h3 className="text-lg font-bold text-gray-800 font-arabic mb-4 flex items-center gap-2">
                      <span>💡</span>
                      نصائح للتميز
                    </h3>
                    <ul className="space-y-3 text-gray-600 font-arabic text-sm">
                      <li className="flex items-start gap-2">
                        <span>✅</span>
                        احرص على الحضور في موعدك
                      </li>
                      <li className="flex items-start gap-2">
                        <span>📖</span>
                        راجع حفظك يومياً
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🎯</span>
                        ضع هدفاً للحفظ كل أسبوع
                      </li>
                      <li className="flex items-start gap-2">
                        <span>🤲</span>
                        ادع الله بالتوفيق
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
