import React from "react";

export default function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] py-20">
      <div className="text-6xl mb-4 animate-bounce">🕌</div>
      <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 font-arabic text-lg">جاري التحميل...</p>
    </div>
  );
}
