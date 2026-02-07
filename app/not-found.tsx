"use client";

import Link from "next/link";
import RandomStars from "@/components/RandomStars";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden font-arabic">
      <RandomStars count={20} />

      <div className="text-center relative z-10 px-4">
        <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4 animate-bounce">
          404
        </div>
        <div className="text-6xl mb-6">🏜️</div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          عفواً، الصفحة غير موجودة
        </h1>

        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          يبدو أنك قد ضللت الطريق. لا تقلق، يمكنك العودة إلى الواحة الرئيسية
          دائماً.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold hover:shadow-lg transform hover:-translate-y-1 transition-all"
        >
          <span>🏠</span>
          <span>العودة للرئيسية</span>
        </Link>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-yellow-100/50 to-transparent pointer-events-none"></div>
    </div>
  );
}
