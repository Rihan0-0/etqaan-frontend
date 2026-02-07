"use client";

interface StudentCardProps {
  id: number;
  name: string;
  avatarIndex?: number;
  points: number;
  rank?: number;
  onClick?: () => void;
}

// Cartoon animal avatars with colors
const avatars = [
  { emoji: "🦁", bg: "from-amber-400 to-orange-500", name: "أسد" },
  { emoji: "🐻", bg: "from-amber-600 to-amber-800", name: "دب" },
  { emoji: "🦉", bg: "from-purple-400 to-purple-600", name: "بومة" },
  { emoji: "🐰", bg: "from-pink-300 to-pink-500", name: "أرنب" },
  { emoji: "🐱", bg: "from-orange-300 to-orange-500", name: "قطة" },
  { emoji: "🐶", bg: "from-yellow-400 to-amber-500", name: "كلب" },
  { emoji: "🐼", bg: "from-gray-400 to-gray-600", name: "باندا" },
  { emoji: "🐯", bg: "from-orange-400 to-orange-600", name: "نمر" },
  { emoji: "🐨", bg: "from-gray-300 to-gray-500", name: "كوالا" },
  { emoji: "🦊", bg: "from-orange-500 to-red-500", name: "ثعلب" },
  { emoji: "🐸", bg: "from-green-400 to-green-600", name: "ضفدع" },
  { emoji: "🐧", bg: "from-gray-700 to-gray-900", name: "بطريق" },
];

// Generate consistent avatar based on student ID
function getAvatar(id: number, avatarIndex?: number) {
  const index = avatarIndex !== undefined ? avatarIndex % avatars.length : id % avatars.length;
  return avatars[index];
}

// Get rank decoration
function getRankDecoration(rank?: number) {
  if (!rank) return null;
  switch (rank) {
    case 1:
      return {
        emoji: "🥇",
        label: "الأول",
        color: "from-yellow-400 to-amber-500",
      };
    case 2:
      return {
        emoji: "🥈",
        label: "الثاني",
        color: "from-gray-300 to-gray-400",
      };
    case 3:
      return {
        emoji: "🥉",
        label: "الثالث",
        color: "from-amber-600 to-amber-700",
      };
    default:
      return null;
  }
}

export default function StudentCard({
  id,
  name,
  avatarIndex,
  points,
  rank,
  onClick,
}: StudentCardProps) {
  const avatar = getAvatar(id, avatarIndex);
  const rankDeco = getRankDecoration(rank);

  return (
    <div
      onClick={onClick}
      className="group relative bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer border-2 border-gray-100 hover:border-purple-200"
    >
      {/* Rank badge */}
      {rankDeco && (
        <div
          className={`absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br ${rankDeco.color} rounded-full flex items-center justify-center shadow-lg z-10 animate-bounce-gentle`}
        >
          <span className="text-2xl">{rankDeco.emoji}</span>
        </div>
      )}

      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className={`w-16 h-16 bg-gradient-to-br ${avatar.bg} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
        >
          <span className="text-3xl">{avatar.emoji}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-800 font-arabic text-lg truncate group-hover:text-purple-700 transition-colors">
            {name}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-yellow-500 text-lg">⭐</span>
            <span className="text-gray-600 font-arabic font-semibold">
              {points} نقطة
            </span>
          </div>
        </div>

        {/* Action indicator */}
        <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors">
          <span className="text-purple-500 text-xl group-hover:scale-125 transition-transform">
            👀
          </span>
        </div>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
}
