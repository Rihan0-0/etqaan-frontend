"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء تسجيل الدخول");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-500 flex items-center justify-center p-4 relative">
      {/* Decorative elements - Fixed Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

        {/* Stars decoration */}
        {[
          { top: "10%", left: "15%", delay: "0s" },
          { top: "20%", left: "80%", delay: "0.3s" },
          { top: "35%", left: "25%", delay: "0.6s" },
          { top: "15%", left: "60%", delay: "0.9s" },
          { top: "45%", left: "10%", delay: "1.2s" },
          { top: "50%", left: "90%", delay: "0.2s" },
          { top: "65%", left: "35%", delay: "0.5s" },
          { top: "70%", left: "75%", delay: "0.8s" },
          { top: "80%", left: "20%", delay: "1.1s" },
          { top: "85%", left: "85%", delay: "1.4s" },
          { top: "25%", left: "45%", delay: "0.4s" },
          { top: "55%", left: "55%", delay: "0.7s" },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-pulse"
            style={{
              top: pos.top,
              left: pos.left,
              animationDelay: pos.delay,
            }}
          >
            ⭐
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo/Mosque */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-bounce-gentle">🕌</div>
          <h1 className="text-4xl font-bold text-white font-arabic mb-2">
            أكاديمية إتقان
          </h1>
          <p className="text-white/80 font-arabic text-lg">
            تسجيل الدخول إلى حسابك
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl font-arabic text-center flex items-center justify-center gap-2">
                <span>⚠️</span>
                {error}
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-arabic font-semibold mb-2">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-arabic text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="example@email.com"
                  required
                  dir="ltr"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl">
                  📧
                </span>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-arabic font-semibold mb-2">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl font-arabic text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  placeholder="••••••••"
                  required
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl hover:scale-110 transition-transform"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-arabic font-bold text-lg rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  جاري تسجيل الدخول...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  تسجيل الدخول
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 font-arabic text-sm">أو</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Guest Access */}
          <Link
            href="/batches"
            className="block w-full py-4 bg-gray-100 text-gray-700 font-arabic font-semibold text-center rounded-xl hover:bg-gray-200 transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
          >
            <span className="ml-2">👀</span>
            تصفح بدون حساب
          </Link>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-white/80 hover:text-white font-arabic transition-colors flex items-center justify-center gap-2"
          >
            <span>🏠</span>
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
