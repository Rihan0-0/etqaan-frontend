"use client";

import { useState, useMemo } from "react";

export default function UpcomingLectures() {
  const [selectedFilter, setSelectedFilter] = useState("اليوم");

  // Dynamic lecture data with weekly recurring patterns
  const lectureTemplates = [
    {
      id: 1,
      title: "سورة البقرة (1-20)",
      dayOfWeek: 0, // Sunday
      time: "9:00 ص - 10:30 ص",
      students: 15,
      level: "متوسط",
      room: "قاعة 1",
      recurring: true,
    },
    {
      id: 2,
      title: "أحكام التجويد - النون الساكنة",
      dayOfWeek: 1, // Monday
      time: "11:00 ص - 12:30 م",
      students: 12,
      level: "متقدم",
      room: "قاعة 2",
      recurring: true,
    },
    {
      id: 3,
      title: "جزء عم - مراجعة",
      dayOfWeek: 2, // Tuesday
      time: "2:00 م - 3:30 م",
      students: 20,
      level: "مبتدئ",
      room: "قاعة 3",
      recurring: true,
    },
    {
      id: 4,
      title: "سورة آل عمران (1-50)",
      dayOfWeek: 3, // Wednesday
      time: "9:30 ص - 11:00 ص",
      students: 18,
      level: "متوسط",
      room: "قاعة 1",
      recurring: true,
    },
    {
      id: 5,
      title: "التفسير والمعاني",
      dayOfWeek: 4, // Thursday
      time: "1:00 م - 2:30 م",
      students: 22,
      level: "متقدم",
      room: "قاعة 4",
      recurring: true,
    },
  ];

  const dayNames = [
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
  ];

  // Generate lectures for current week
  const generateWeeklyLectures = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const lectures = [];

    lectureTemplates.forEach((template) => {
      const lectureDate = new Date(today);
      const dayDiff = template.dayOfWeek - currentDay;
      lectureDate.setDate(today.getDate() + dayDiff);

      let status = "scheduled";
      if (dayDiff === 0) {
        const now = new Date();
        const [startTime] = template.time.split(" - ");
        const [hours, period] = startTime.split(" ");
        const [hour] = hours.split(":");
        let lectureHour = parseInt(hour);
        if (period === "م" && lectureHour !== 12) lectureHour += 12;

        if (now.getHours() >= lectureHour && now.getHours() < lectureHour + 2) {
          status = "in-progress";
        } else if (now.getHours() > lectureHour + 2) {
          status = "completed";
        }
      } else if (dayDiff < 0) {
        status = "completed";
      }

      lectures.push({
        ...template,
        date: lectureDate,
        dateString: lectureDate.toLocaleDateString("ar-SA"),
        dayName: dayNames[template.dayOfWeek],
        status,
        isToday: dayDiff === 0,
        isTomorrow: dayDiff === 1,
      });
    });

    return lectures.sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  const filteredLectures = useMemo(() => {
    const allLectures = generateWeeklyLectures();

    switch (selectedFilter) {
      case "اليوم":
        return allLectures.filter((lecture) => lecture.isToday);
      case "غداً":
        return allLectures.filter((lecture) => lecture.isTomorrow);
      case "هذا الأسبوع":
        return allLectures;
      case "المكتملة":
        return allLectures.filter((lecture) => lecture.status === "completed");
      case "الجارية":
        return allLectures.filter(
          (lecture) => lecture.status === "in-progress"
        );
      default:
        return allLectures;
    }
  }, [selectedFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-50 text-blue-800 border-blue-200";
      case "in-progress":
        return "bg-green-50 text-green-800 border-green-200";
      case "completed":
        return "bg-gray-50 text-gray-600 border-gray-200";
      default:
        return "bg-blue-50 text-blue-800 border-blue-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "scheduled":
        return "مجدولة";
      case "in-progress":
        return "جارية الآن";
      case "completed":
        return "مكتملة";
      default:
        return "مجدولة";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="instructor-title font-arabic flex items-center">
          <span className="text-3xl ml-3">📅</span>
          المحاضرات القادمة
        </h2>

        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="bg-white border-2 border-gray-200 rounded-xl px-4 py-2 font-arabic text-primary focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
        >
          <option value="اليوم">
            اليوم ({filteredLectures.filter((l) => l.isToday).length})
          </option>
          <option value="غداً">
            غداً ({filteredLectures.filter((l) => l.isTomorrow).length})
          </option>
          <option value="هذا الأسبوع">
            هذا الأسبوع ({generateWeeklyLectures().length})
          </option>
          <option value="الجارية">
            الجارية (
            {
              generateWeeklyLectures().filter((l) => l.status === "in-progress")
                .length
            }
            )
          </option>
          <option value="المكتملة">
            المكتملة (
            {
              generateWeeklyLectures().filter((l) => l.status === "completed")
                .length
            }
            )
          </option>
        </select>
      </div>

      {filteredLectures.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📚</div>
          <p className="instructor-subtitle text-muted font-arabic">
            لا توجد محاضرات{" "}
            {selectedFilter === "اليوم" ? "اليوم" : "في هذا التصنيف"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLectures.map((lecture) => (
            <div
              key={`${lecture.id}-${lecture.dateString}`}
              className={`border-2 rounded-xl p-5 transition-all duration-300 hover:shadow-lg ${
                lecture.isToday
                  ? "border-emerald-300 bg-emerald-50"
                  : "border-gray-200 bg-white hover:border-emerald-200"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="instructor-subtitle font-arabic mb-1">
                    {lecture.title}
                  </h3>
                  <p className="instructor-caption font-arabic text-muted">
                    {lecture.dayName} - {lecture.dateString}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-lg border font-arabic font-semibold ${getStatusColor(
                    lecture.status
                  )}`}
                >
                  {getStatusText(lecture.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                <div className="flex items-center instructor-body font-arabic">
                  <span className="text-xl ml-3">⏰</span>
                  <span className="text-primary">{lecture.time}</span>
                </div>
                <div className="flex items-center instructor-body font-arabic">
                  <span className="text-xl ml-3">👥</span>
                  <span className="text-primary">{lecture.students} طالب</span>
                </div>
                <div className="flex items-center instructor-body font-arabic">
                  <span className="text-xl ml-3">📊</span>
                  <span className="text-primary">{lecture.level}</span>
                </div>
                <div className="flex items-center instructor-body font-arabic">
                  <span className="text-xl ml-3">🏫</span>
                  <span className="text-primary">{lecture.room}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                {lecture.status === "scheduled" && (
                  <button className="btn-primary px-5 py-2 rounded-xl font-arabic transition-all hover:scale-105">
                    بدء المحاضرة
                  </button>
                )}
                {lecture.status === "in-progress" && (
                  <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-arabic font-semibold transition-all">
                    إنهاء المحاضرة
                  </button>
                )}
                <button className="btn-secondary px-5 py-2 rounded-xl font-arabic transition-all">
                  عرض التفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
