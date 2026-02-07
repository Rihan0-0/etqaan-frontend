export default function QuickStats() {
  const stats = [
    {
      title: "إجمالي الطلاب",
      value: "45",
      icon: "👥",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "المحاضرات هذا الأسبوع",
      value: "12",
      icon: "📖",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "الطلاب المتفوقون",
      value: "18",
      icon: "⭐",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "الامتحانات المعلقة",
      value: "7",
      icon: "📝",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-xl p-6 card-shadow border border-white/20 hover:scale-105 transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">{stat.icon}</div>
            <div
              className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}
            >
              {stat.value}
            </div>
          </div>
          <h3 className="text-gray-800 font-semibold text-lg font-arabic">
            {stat.title}
          </h3>
        </div>
      ))}
    </div>
  );
}
