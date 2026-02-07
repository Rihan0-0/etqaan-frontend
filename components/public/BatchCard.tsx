"use client";

import Link from "next/link";

interface BatchCardProps {
  id: number;
  name: string;
  description?: string;
  studentCount: number;
  sheikhName?: string;
  color: string;
  mascot: string;
}

const colorGradients: Record<string, string> = {
  purple: "from-purple-500 to-purple-700",
  blue: "from-blue-500 to-blue-700",
  emerald: "from-emerald-500 to-emerald-700",
  orange: "from-orange-500 to-orange-700",
  pink: "from-pink-500 to-pink-700",
  cyan: "from-cyan-500 to-cyan-700",
};

const mascots: Record<string, string> = {
  lion: "🦁",
  bear: "🐻",
  owl: "🦉",
  rabbit: "🐰",
  cat: "🐱",
  dog: "🐶",
  panda: "🐼",
  tiger: "🐯",
  koala: "🐨",
  fox: "🦊",
};

export default function BatchCard({
  id,
  name,
  description,
  studentCount,
  sheikhName,
  color,
  mascot,
}: BatchCardProps) {
  const gradient = colorGradients[color] || colorGradients.purple;
  const mascotEmoji = mascots[mascot] || mascots.lion;

  return (
    <Link href={`/batches/${id}`}>
      <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 cursor-pointer border-4 border-transparent hover:border-white">
        {/* Gradient Header */}
        <div
          className={`bg-gradient-to-br ${gradient} p-6 relative overflow-hidden`}
        >
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full"></div>

          {/* Mascot */}
          <div className="absolute top-4 left-4 text-5xl transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
            {mascotEmoji}
          </div>

          {/* Name */}
          <h3 className="text-2xl font-bold text-white font-arabic text-right relative z-10 mt-8">
            {name}
          </h3>

          {/* Student count badge */}
          <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="text-white font-arabic font-semibold flex items-center gap-2">
              <span className="text-lg">👨‍🎓</span>
              {studentCount} طالب
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 bg-gradient-to-b from-white to-gray-50">
          {description && (
            <p className="text-gray-600 font-arabic text-sm mb-3 line-clamp-2">
              {description}
            </p>
          )}

          {sheikhName && (
            <div className="flex items-center gap-2 text-gray-500 font-arabic text-sm">
              <span>👨‍🏫</span>
              <span>الشيخ {sheikhName}</span>
            </div>
          )}

          {/* Action hint */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-gray-400 text-sm font-arabic">
              اضغط للاستكشاف
            </span>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
              <span className="text-xl group-hover:translate-x-1 transition-transform">
                ←
              </span>
            </div>
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
      </div>
    </Link>
  );
}
