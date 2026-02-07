"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import PageLoader from "@/components/ui/PageLoader";
import MultiSearchableSelect from "@/components/ui/MultiSearchableSelect";
import Modal from "@/components/ui/Modal";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  plain_password?: string;
}

interface Batch {
  id: number;
  name: string;
  schedule_description: string;
  term_id: number;
  _count?: {
    batch_students: number;
    batch_sheikhs: number;
  };
}

interface Term {
  id: number;
  name: string;
  is_active: boolean;
}

interface Stats {
  totalUsers: number;
  totalStudents: number;
  totalSheikhs: number;
  totalBatches: number;
  totalAdmins: number;
  recentActivity: {
    todayRecords: number;
    weekRecords: number;
  };
}

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [terms, setTerms] = useState<Term[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalStudents: 0,
    totalSheikhs: 0,
    totalBatches: 0,
    totalAdmins: 0,
    recentActivity: {
      todayRecords: 0,
      weekRecords: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "batches">(
    "overview",
  );
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Modals
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);

  // Form states
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "sheikh" as string,
  });
  const [newBatch, setNewBatch] = useState({
    name: "",
    schedule_description: "",
    term_id: 1,
    sheikh_ids: [] as number[],
  });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api-v1";

  const fetchData = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    setError("");

    try {
      // Fetch stats
      const statsRes = await fetch(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Fetch users
      const usersRes = await fetch(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
      }

      // Fetch batches
      const batchesRes = await fetch(`${API_URL}/batches`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (batchesRes.ok) {
        const batchesData = await batchesRes.json();
        setBatches(batchesData);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("حدث خطأ أثناء تحميل البيانات");
    } finally {
      setIsLoading(false);
    }
  }, [token, API_URL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Create User
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setFormLoading(true);
    setFormError("");

    try {
      const res = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        setShowUserModal(false);
        setNewUser({ name: "", email: "", password: "", role: "sheikh" });
        fetchData();
      } else {
        const error = await res.json();
        setFormError(error.message || "فشل إنشاء المستخدم");
      }
    } catch (err) {
      console.error("Error creating user:", err);
      setFormError("حدث خطأ أثناء إنشاء المستخدم");
    } finally {
      setFormLoading(false);
    }
  };

  // Create Batch
  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setFormLoading(true);
    setFormError("");

    try {
      const res = await fetch(`${API_URL}/batches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBatch),
      });

      if (res.ok) {
        setShowBatchModal(false);
        setNewBatch({
          name: "",
          schedule_description: "",
          term_id: 1,
          sheikh_ids: [],
        });
        fetchData();
      } else {
        const error = await res.json();
        setFormError(error.message || "فشل إنشاء الحلقة");
      }
    } catch (err) {
      console.error("Error creating batch:", err);
      setFormError("حدث خطأ أثناء إنشاء الحلقة");
    } finally {
      setFormLoading(false);
    }
  };

  // Delete User
  const handleDeleteUser = async (userId: number) => {
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/user/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setUsers(users.filter((u) => u.id !== userId));
        setDeleteConfirm(null);
        fetchData();
      } else {
        const error = await res.json();
        alert(error.message || "فشل حذف المستخدم");
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("حدث خطأ أثناء حذف المستخدم");
    }
  };

  // Delete Batch
  const handleDeleteBatch = async (batchId: number) => {
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/batches/${batchId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setBatches(batches.filter((b) => b.id !== batchId));
        fetchData();
      } else {
        const error = await res.json();
        alert(error.message || "فشل حذف الحلقة");
      }
    } catch (err) {
      console.error("Error deleting batch:", err);
      alert("حدث خطأ أثناء حذف الحلقة");
    }
  };

  const getRoleStyle = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-red-100 text-red-700";
      case "admin":
        return "bg-purple-100 text-purple-700";
      case "sheikh":
        return "bg-emerald-100 text-emerald-700";
      case "student":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "super_admin":
        return "مدير عام";
      case "admin":
        return "مدير";
      case "sheikh":
        return "شيخ";
      case "student":
        return "طالب";
      default:
        return role;
    }
  };

  // Generate random password
  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewUser({ ...newUser, password });
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "super_admin"]}>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        {/* User Creation Modal */}
        <Modal
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
          title="➕ إضافة مستخدم جديد"
        >
          <form onSubmit={handleCreateUser} className="space-y-4">
            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl font-arabic text-sm">
                {formError}
              </div>
            )}

            <div>
              <label className="block font-arabic text-gray-700 mb-1">
                الاسم
              </label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-arabic text-gray-900 bg-white"
                placeholder="أدخل اسم المستخدم"
                required
              />
            </div>

            <div>
              <label className="block font-arabic text-gray-700 mb-1">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-white"
                placeholder="example@email.com"
                dir="ltr"
                required
              />
            </div>

            <div>
              <label className="block font-arabic text-gray-700 mb-1">
                كلمة المرور
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 bg-white"
                  placeholder="كلمة المرور"
                  dir="ltr"
                  required
                />
                <button
                  type="button"
                  onClick={generatePassword}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                  title="إنشاء كلمة مرور عشوائية"
                >
                  🎲
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1 font-arabic">
                احفظ كلمة المرور لإعطائها للمستخدم
              </p>
            </div>

            <div>
              <label className="block font-arabic text-gray-700 mb-1">
                الدور
              </label>
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-arabic text-gray-900 bg-white"
              >
                {user?.role === "super_admin" && (
                  <option value="super_admin">مدير عام</option>
                )}
                <option value="admin">مدير</option>
                <option value="sheikh">شيخ</option>
                <option value="student">طالب</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={formLoading}
                className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-arabic font-semibold hover:bg-purple-700 disabled:opacity-50"
              >
                {formLoading ? "جاري الإنشاء..." : "إنشاء المستخدم"}
              </button>
              <button
                type="button"
                onClick={() => setShowUserModal(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-arabic hover:bg-gray-200"
              >
                إلغاء
              </button>
            </div>
          </form>
        </Modal>

        {/* Batch Creation Modal */}
        <Modal
          isOpen={showBatchModal}
          onClose={() => setShowBatchModal(false)}
          title="📚 إنشاء حلقة جديدة"
          headerColorClass="bg-gradient-to-r from-emerald-600 to-blue-600"
        >
          <form onSubmit={handleCreateBatch} className="space-y-4">
            {formError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl font-arabic text-sm">
                {formError}
              </div>
            )}

            <div>
              <label className="block font-arabic text-gray-700 mb-1">
                اسم الحلقة
              </label>
              <input
                type="text"
                value={newBatch.name}
                onChange={(e) =>
                  setNewBatch({ ...newBatch, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-gray-900 bg-white"
                placeholder="مثال: حلقة النجوم ⭐"
                required
              />
            </div>

            <div>
              <label className="block font-arabic text-gray-700 mb-1">
                جدول الحلقة
              </label>
              <input
                type="text"
                value={newBatch.schedule_description}
                onChange={(e) =>
                  setNewBatch({
                    ...newBatch,
                    schedule_description: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-arabic text-gray-900 bg-white"
                placeholder="مثال: السبت والاثنين - 5:00 م"
              />
            </div>

            {/* Sheikh Selection */}
            <div>
              <label className="block font-arabic text-gray-700 mb-1">
                اختر الشيوخ
              </label>
              <MultiSearchableSelect
                options={users
                  .filter((u) => u.role === "sheikh")
                  .map((u) => ({ id: u.id, label: u.name }))}
                value={newBatch.sheikh_ids}
                onChange={(val) =>
                  setNewBatch({ ...newBatch, sheikh_ids: val as number[] })
                }
                placeholder="اختر الشيوخ..."
                className="mb-1"
              />
              {newBatch.sheikh_ids.length > 0 && (
                <p className="text-xs text-emerald-600 mt-1 font-arabic">
                  تم اختيار {newBatch.sheikh_ids.length} شيخ
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={formLoading}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-xl font-arabic font-semibold hover:from-emerald-700 hover:to-blue-700 disabled:opacity-50 transition-all"
              >
                {formLoading ? "جاري الإنشاء..." : "إنشاء الحلقة"}
              </button>
              <button
                type="button"
                onClick={() => setShowBatchModal(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-arabic hover:bg-gray-200 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </form>
        </Modal>

        {/* Header - Mobile Responsive */}
        <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-4 md:p-6 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-xl md:text-2xl font-bold font-arabic flex items-center gap-2 md:gap-3">
                  <span className="text-2xl md:text-3xl">🛡️</span>
                  لوحة تحكم المدير
                </h1>
                <p className="text-purple-200 font-arabic mt-1 text-sm md:text-base">
                  مرحباً، {user?.name} ({getRoleLabel(user?.role || "")})
                </p>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem("etqaan_token");
                  localStorage.removeItem("etqaan_user");
                  window.location.href = "/login";
                }}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl font-arabic transition-colors flex items-center gap-2"
              >
                <span>🚪</span>
                تسجيل الخروج
              </button>
            </div>

            {/* Navigation Tabs - Scrollable on Mobile */}
            <div className="mt-4 md:mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {[
                { id: "overview", label: "نظرة عامة", icon: "📊" },
                { id: "users", label: "المستخدمين", icon: "👥" },
                { id: "batches", label: "الحلقات", icon: "📚" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-arabic transition-all flex items-center gap-2 whitespace-nowrap text-sm md:text-base ${
                    activeTab === tab.id
                      ? "bg-white text-purple-700 shadow-md"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {isLoading ? (
            <PageLoader />
          ) : error ? (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
              <span className="text-4xl mb-4 block">⚠️</span>
              <p className="text-red-700 font-arabic">{error}</p>
              <button
                onClick={fetchData}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-xl font-arabic hover:bg-red-700"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <>
                  {/* Stats Cards - Mobile Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
                    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-purple-100">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4">
                        <div className="w-10 h-10 md:w-14 md:h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                          <span className="text-xl md:text-3xl">👤</span>
                        </div>
                        <div className="text-center md:text-right">
                          <p className="text-gray-500 font-arabic text-xs md:text-sm">
                            المستخدمين
                          </p>
                          <p className="text-2xl md:text-3xl font-bold text-gray-800">
                            {stats.totalUsers}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-emerald-100">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4">
                        <div className="w-10 h-10 md:w-14 md:h-14 bg-emerald-100 rounded-xl flex items-center justify-center">
                          <span className="text-xl md:text-3xl">👨‍🏫</span>
                        </div>
                        <div className="text-center md:text-right">
                          <p className="text-gray-500 font-arabic text-xs md:text-sm">
                            المشايخ
                          </p>
                          <p className="text-2xl md:text-3xl font-bold text-gray-800">
                            {stats.totalSheikhs}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-blue-100">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4">
                        <div className="w-10 h-10 md:w-14 md:h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                          <span className="text-xl md:text-3xl">👨‍🎓</span>
                        </div>
                        <div className="text-center md:text-right">
                          <p className="text-gray-500 font-arabic text-xs md:text-sm">
                            الطلاب
                          </p>
                          <p className="text-2xl md:text-3xl font-bold text-gray-800">
                            {stats.totalStudents}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border-2 border-orange-100">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4">
                        <div className="w-10 h-10 md:w-14 md:h-14 bg-orange-100 rounded-xl flex items-center justify-center">
                          <span className="text-xl md:text-3xl">📚</span>
                        </div>
                        <div className="text-center md:text-right">
                          <p className="text-gray-500 font-arabic text-xs md:text-sm">
                            الحلقات
                          </p>
                          <p className="text-2xl md:text-3xl font-bold text-gray-800">
                            {stats.totalBatches}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Summary - Mobile */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
                      <h3 className="text-lg font-bold text-gray-800 font-arabic mb-4 flex items-center gap-2">
                        <span>📅</span>
                        النشاط اليومي
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-3xl md:text-4xl font-bold text-emerald-600">
                            {stats.recentActivity?.todayRecords || 0}
                          </p>
                          <p className="text-gray-500 font-arabic text-sm">
                            سجلات اليوم
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-3xl md:text-4xl font-bold text-blue-600">
                            {stats.recentActivity?.weekRecords || 0}
                          </p>
                          <p className="text-gray-500 font-arabic text-sm">
                            هذا الأسبوع
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
                      <h3 className="text-lg font-bold text-gray-800 font-arabic mb-4 flex items-center gap-2">
                        <span>👥</span>
                        توزيع الأدوار
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-arabic text-gray-600">
                            المديرين
                          </span>
                          <span className="font-bold text-purple-600">
                            {stats.totalAdmins}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-arabic text-gray-600">
                            المشايخ
                          </span>
                          <span className="font-bold text-emerald-600">
                            {stats.totalSheikhs}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions - Mobile Grid */}
                </>
              )}

              {/* Users Tab */}
              {activeTab === "users" && (
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <h2 className="text-lg md:text-xl font-bold text-gray-800 font-arabic flex items-center gap-2">
                      <span>👥</span>
                      إدارة المستخدمين ({users.length})
                    </h2>
                    <button
                      onClick={() => setShowUserModal(true)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-xl font-arabic hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                      <span>➕</span>
                      إضافة مستخدم
                    </button>
                  </div>

                  {/* Mobile Card View */}
                  <div className="md:hidden space-y-4">
                    {users.map((u) => (
                      <div
                        key={u.id}
                        className="border border-gray-200 rounded-xl p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-arabic font-semibold text-gray-800">
                              {u.name}
                            </p>
                            <p className="text-gray-500 text-sm" dir="ltr">
                              {u.email}
                            </p>
                            {u.plain_password && (
                              <p
                                className="text-xs text-orange-600 font-mono mt-1"
                                dir="ltr"
                              >
                                🔑 {u.plain_password}
                              </p>
                            )}
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-arabic ${getRoleStyle(u.role)}`}
                          >
                            {getRoleLabel(u.role)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          <span className="text-gray-500 text-sm font-arabic">
                            {new Date(u.created_at).toLocaleDateString("ar-EG")}
                          </span>
                          {deleteConfirm === u.id ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-arabic"
                              >
                                تأكيد
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm font-arabic"
                              >
                                إلغاء
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(u.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500 disabled:opacity-30"
                              disabled={
                                u.id === user?.id ||
                                (user?.role === "admin" &&
                                  u.role === "super_admin")
                              }
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-right py-3 px-4 font-arabic text-gray-600">
                            الاسم
                          </th>
                          <th className="text-right py-3 px-4 font-arabic text-gray-600">
                            البريد
                          </th>
                          <th className="text-right py-3 px-4 font-arabic text-gray-600">
                            الدور
                          </th>
                          <th className="text-right py-3 px-4 font-arabic text-gray-600">
                            كلمة المرور
                          </th>
                          <th className="text-right py-3 px-4 font-arabic text-gray-600">
                            تاريخ الإنشاء
                          </th>
                          <th className="text-right py-3 px-4 font-arabic text-gray-600">
                            إجراءات
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u) => (
                          <tr
                            key={u.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-4 px-4 font-arabic font-semibold text-gray-800">
                              {u.name}
                            </td>
                            <td className="py-4 px-4 text-gray-600" dir="ltr">
                              {u.email}
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-arabic ${getRoleStyle(u.role)}`}
                              >
                                {getRoleLabel(u.role)}
                              </span>
                            </td>
                            <td
                              className="py-4 px-4 text-orange-600 font-mono text-sm"
                              dir="ltr"
                            >
                              {u.plain_password ? (
                                <span className="flex items-center gap-1">
                                  🔑 {u.plain_password}
                                </span>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                            <td className="py-4 px-4 text-gray-600 font-arabic">
                              {new Date(u.created_at).toLocaleDateString(
                                "ar-EG",
                              )}
                            </td>
                            <td className="py-4 px-4">
                              {deleteConfirm === u.id ? (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleDeleteUser(u.id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm font-arabic"
                                  >
                                    تأكيد الحذف
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm font-arabic"
                                  >
                                    إلغاء
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirm(u.id)}
                                  className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500 disabled:opacity-30"
                                  disabled={
                                    u.id === user?.id ||
                                    (user?.role === "admin" &&
                                      u.role === "super_admin")
                                  }
                                  title={
                                    u.id === user?.id
                                      ? "لا يمكنك حذف حسابك"
                                      : user?.role === "admin" &&
                                          u.role === "super_admin"
                                        ? "المدير لا يمكنه حذف المدير العام"
                                        : "حذف"
                                  }
                                >
                                  🗑️
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {users.length === 0 && (
                    <div className="text-center py-12">
                      <span className="text-6xl mb-4 block">👥</span>
                      <p className="text-gray-500 font-arabic">
                        لا يوجد مستخدمين
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Batches Tab */}
              {activeTab === "batches" && (
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <h2 className="text-lg md:text-xl font-bold text-gray-800 font-arabic flex items-center gap-2">
                      <span>📚</span>
                      إدارة الحلقات ({batches.length})
                    </h2>
                    <button
                      onClick={() => setShowBatchModal(true)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-xl font-arabic hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                      <span>➕</span>
                      إنشاء حلقة
                    </button>
                  </div>

                  {/* Batches Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {batches.map((batch) => (
                      <div
                        key={batch.id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">📚</span>
                            <h3 className="font-arabic font-bold text-gray-800">
                              {batch.name}
                            </h3>
                          </div>
                          <button
                            onClick={() => handleDeleteBatch(batch.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500 opacity-0 group-hover:opacity-100"
                          >
                            🗑️
                          </button>
                        </div>
                        {batch.schedule_description && (
                          <p className="text-gray-500 font-arabic text-sm mb-3">
                            {batch.schedule_description}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <span>👨‍🎓</span>
                            {batch._count?.batch_students || 0} طالب
                          </span>
                          <span className="flex items-center gap-1">
                            <span>👨‍🏫</span>
                            {batch._count?.batch_sheikhs || 0} شيخ
                          </span>
                        </div>
                        <Link
                          href={`/batches/${batch.id}`}
                          className="block w-full text-center py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg font-arabic text-sm transition-colors"
                        >
                          عرض التفاصيل
                        </Link>
                      </div>
                    ))}
                  </div>

                  {batches.length === 0 && (
                    <div className="text-center py-12">
                      <span className="text-6xl mb-4 block">📚</span>
                      <p className="text-gray-500 font-arabic">لا توجد حلقات</p>
                      <button
                        onClick={() => setShowBatchModal(true)}
                        className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl font-arabic hover:bg-purple-700"
                      >
                        إنشاء أول حلقة
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
