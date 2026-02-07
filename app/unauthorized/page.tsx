"use client";

import Link from "next/link";
import RandomStars from "@/components/RandomStars";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-gray-50 to-orange-50 relative flex items-center justify-center p-4">
      <RandomStars count={20} />

      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center relative z-10 animate-scaleIn">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-5xl">⛔</span>
        </div>

        <h1 className="text-3xl font-bold font-arabic text-gray-800 mb-4">
          عفواً، غير مسموح لك بالدخول
        </h1>

        <p className="text-gray-600 font-arabic text-lg mb-8">
          ليس لديك الصلاحيات الكافية للوصول إلى هذه الصفحة. يرجى التواصل مع
          المسؤول إذا كنت تعتقد أن هذا خطأ.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-arabic font-bold hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          >
            العودة للرئيسية
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl font-arabic font-bold hover:bg-gray-200 transition-colors"
          >
            رجوع
          </button>
        </div>
      </div>
    </div>
  );
}
