"use client";

import { useState } from "react";
import Image from "next/image";

export default function StudentFeedback() {
  const [selectedFilter, setSelectedFilter] = useState("الكل");

  const feedback = [
    {
      id: 1,
      studentName: "محمد أحمد",
      studentImage: "/images/students/student1.png",
      rating: 5,
      comment:
        "الأستاذ أحمد معلم ممتاز، يشرح بطريقة واضحة ومفهومة. استفدت كثيراً من دروس التجويد.",
      date: "منذ يومين",
      subject: "أحكام التجويد",
    },
    {
      id: 2,
      studentName: "فاطمة علي",
      studentImage: "/images/students/student2.png",
      rating: 5,
      comment:
        "جزاك الله خيراً أستاذ أحمد، طريقة تدريسك للقرآن الكريم ممتازة ومحفزة.",
      date: "منذ 3 أيام",
      subject: "حفظ القرآن",
    },
    {
      id: 3,
      studentName: "عبدالله محمد",
      studentImage: "/images/students/student3.png",
      rating: 4,
      comment:
        "معلم متمكن ومتفهم، لكن أتمنى المزيد من الأمثلة العملية في الدروس.",
      date: "منذ أسبوع",
      subject: "التفسير",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ⭐
      </span>
    ));
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 card-shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 font-arabic flex items-center">
          <span className="text-3xl mr-3">💬</span>
          تقييمات الطلاب
        </h2>

        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 font-arabic text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value="الكل">جميع التقييمات</option>
          <option value="5">5 نجوم</option>
          <option value="4">4 نجوم</option>
          <option value="3">3 نجوم</option>
        </select>
      </div>

      <div className="space-y-4">
        {feedback.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 hover:border-emerald-300"
          >
            <div className="flex items-start space-x-reverse space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={item.studentImage}
                  alt={item.studentName}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900 font-arabic">
                      {item.studentName}
                    </h4>
                    <p className="text-sm text-gray-600 font-arabic">
                      {item.subject}
                    </p>
                  </div>
                  <div className="text-left">
                    <div className="flex items-center mb-1">
                      {renderStars(item.rating)}
                    </div>
                    <p className="text-xs text-gray-500 font-arabic">
                      {item.date}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed font-arabic">
                  {item.comment}
                </p>

                <div className="flex justify-end mt-3">
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-arabic">
                    رد على التقييم
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button className="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-6 py-2 rounded-lg transition-colors font-arabic">
          عرض المزيد من التقييمات
        </button>
      </div>
    </div>
  );
}
