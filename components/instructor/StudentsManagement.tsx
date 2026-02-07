"use client";

import { useState, useMemo } from "react";
import Image from "next/image";

export default function StudentsManagement() {
  const [selectedLecture, setSelectedLecture] = useState("الكل");
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Lecture data matching the UpcomingLectures component
  const lectures = [
    { id: 1, title: "سورة البقرة (1-20)", level: "متوسط" },
    { id: 2, title: "أحكام التجويد - النون الساكنة", level: "متقدم" },
    { id: 3, title: "جزء عم - مراجعة", level: "مبتدئ" },
    { id: 4, title: "سورة آل عمران (1-50)", level: "متوسط" },
    { id: 5, title: "التفسير والمعاني", level: "متقدم" },
  ];

  const students = [
    {
      id: 1,
      name: "أحمد محمد علي",
      image: "/images/students/student1.png",
      lectures: ["سورة البقرة (1-20)", "أحكام التجويد - النون الساكنة"],
      progress: 85,
      attendance: "95%",
      lastEvaluation: "ممتاز",
      status: "active",
      phoneNumber: "0501234567",
      joinDate: "سبتمبر 2024",
    },
    {
      id: 2,
      name: "فاطمة علي أحمد",
      image: "/images/students/student2.png",
      lectures: ["أحكام التجويد - النون الساكنة", "التفسير والمعاني"],
      progress: 92,
      attendance: "100%",
      lastEvaluation: "ممتاز جداً",
      status: "excellent",
      phoneNumber: "0507654321",
      joinDate: "أغسطس 2024",
    },
    {
      id: 3,
      name: "عبدالله أحمد محمد",
      image: "/images/students/student3.png",
      lectures: ["جزء عم - مراجعة"],
      progress: 78,
      attendance: "88%",
      lastEvaluation: "جيد جداً",
      status: "needs-attention",
      phoneNumber: "0509876543",
      joinDate: "أكتوبر 2024",
    },
    {
      id: 4,
      name: "مريم محمد سالم",
      image: "/images/students/student4.png",
      lectures: ["سورة البقرة (1-20)", "سورة آل عمران (1-50)"],
      progress: 96,
      attendance: "100%",
      lastEvaluation: "ممتاز جداً",
      status: "excellent",
      phoneNumber: "0502468135",
      joinDate: "يوليو 2024",
    },
    {
      id: 5,
      name: "يوسف خالد أحمد",
      image: "/images/students/student5.png",
      lectures: ["جزء عم - مراجعة", "أحكام التجويد - النون الساكنة"],
      progress: 82,
      attendance: "92%",
      lastEvaluation: "جيد جداً",
      status: "active",
      phoneNumber: "0508642097",
      joinDate: "سبتمبر 2024",
    },
  ];

  const lectureOptions = ["الكل", ...lectures.map((lecture) => lecture.title)];

  const filteredStudents = useMemo(() => {
    if (selectedLecture === "الكل") {
      return students;
    }
    return students.filter((student) =>
      student.lectures.includes(selectedLecture)
    );
  }, [selectedLecture]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "border-green-300 bg-green-50";
      case "active":
        return "border-blue-300 bg-blue-50";
      case "needs-attention":
        return "border-yellow-300 bg-yellow-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return "🌟";
      case "active":
        return "✅";
      case "needs-attention":
        return "⚠️";
      default:
        return "👤";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "excellent":
        return "متفوق";
      case "active":
        return "نشط";
      case "needs-attention":
        return "يحتاج متابعة";
      default:
        return "عادي";
    }
  };

  const handleEvaluate = (student: any) => {
    setSelectedStudent(student);
    setShowEvaluationModal(true);
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-6 card-shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="instructor-title font-arabic flex items-center">
            <span className="text-3xl ml-3">👥</span>
            إدارة الطلاب
          </h2>
          <div className="bg-emerald-50 px-4 py-2 rounded-lg">
            <span className="instructor-body text-emerald-700 font-arabic">
              {filteredStudents.length} طالب
            </span>
          </div>
        </div>

        {/* Enhanced Filter Section */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <label className="block instructor-subtitle text-primary font-arabic mb-3">
            فلترة حسب المحاضرة:
          </label>
          <select
            value={selectedLecture}
            onChange={(e) => setSelectedLecture(e.target.value)}
            className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3 font-arabic text-primary focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
          >
            {lectureOptions.map((lecture) => (
              <option key={lecture} value={lecture}>
                {lecture}{" "}
                {lecture !== "الكل" &&
                  `(${
                    students.filter((s) => s.lectures.includes(lecture)).length
                  } طالب)`}
              </option>
            ))}
          </select>
        </div>

        {/* Students List */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className={`border-2 rounded-xl p-5 transition-all duration-300 hover:shadow-lg ${getStatusColor(
                student.status
              )}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
                  <Image
                    src={student.image}
                    alt={student.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="instructor-subtitle text-primary font-arabic mb-1">
                        {student.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {getStatusIcon(student.status)}
                        </span>
                        <span className="instructor-caption text-secondary font-arabic">
                          {getStatusText(student.status)}
                        </span>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="instructor-body text-primary font-arabic mb-1">
                        {student.progress}%
                      </div>
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            student.progress >= 90
                              ? "bg-green-500"
                              : student.progress >= 75
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                          }`}
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="instructor-body font-arabic">
                      <span className="text-muted">الحضور: </span>
                      <span className="text-primary font-semibold">
                        {student.attendance}
                      </span>
                    </div>
                    <div className="instructor-body font-arabic">
                      <span className="text-muted">آخر تقييم: </span>
                      <span className="text-primary font-semibold">
                        {student.lastEvaluation}
                      </span>
                    </div>
                    <div className="instructor-caption font-arabic">
                      <span className="text-muted">تاريخ الانضمام: </span>
                      <span className="text-secondary">{student.joinDate}</span>
                    </div>
                    <div className="instructor-caption font-arabic">
                      <span className="text-muted">رقم الهاتف: </span>
                      <span className="text-secondary">
                        {student.phoneNumber}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="instructor-caption text-muted font-arabic mb-2">
                      المحاضرات المسجلة:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {student.lectures.map((lecture, index) => (
                        <span
                          key={index}
                          className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-sm font-arabic font-medium"
                        >
                          {lecture}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleEvaluate(student)}
                      className="btn-primary px-4 py-2 rounded-xl font-arabic transition-all hover:scale-105"
                    >
                      تقييم جديد
                    </button>
                    <button className="btn-secondary px-4 py-2 rounded-xl font-arabic transition-all">
                      عرض السجل
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <p className="instructor-subtitle text-muted font-arabic">
              لا يوجد طلاب في هذه المحاضرة
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <button className="btn-secondary px-8 py-3 rounded-xl font-arabic transition-all hover:scale-105">
            عرض جميع الطلاب
          </button>
        </div>
      </div>

      {/* Enhanced Evaluation Modal */}
      {showEvaluationModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full border border-gray-200 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="instructor-title text-primary font-arabic">
                تقييم الطالب
              </h3>
              <button
                onClick={() => setShowEvaluationModal(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="mb-6 p-4 bg-emerald-50 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={selectedStudent.image}
                  alt={selectedStudent.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <h4 className="instructor-subtitle text-primary font-arabic">
                    {selectedStudent.name}
                  </h4>
                  <p className="instructor-caption text-secondary font-arabic">
                    التقدم الحالي: {selectedStudent.progress}%
                  </p>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block instructor-subtitle text-primary font-arabic mb-3">
                  المحاضرة:
                </label>
                <select className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-arabic text-primary focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  {selectedStudent.lectures.map(
                    (lecture: string, index: number) => (
                      <option key={index} value={lecture}>
                        {lecture}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="block instructor-subtitle text-primary font-arabic mb-3">
                  نوع التقييم:
                </label>
                <select className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-arabic text-primary focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option>حفظ جديد</option>
                  <option>مراجعة</option>
                  <option>تجويد</option>
                  <option>امتحان شفهي</option>
                  <option>امتحان كتابي</option>
                </select>
              </div>

              <div>
                <label className="block instructor-subtitle text-primary font-arabic mb-3">
                  التقييم:
                </label>
                <select className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-arabic text-primary focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option>ممتاز جداً (95-100)</option>
                  <option>ممتاز (90-94)</option>
                  <option>جيد جداً (85-89)</option>
                  <option>جيد (80-84)</option>
                  <option>مقبول (70-79)</option>
                  <option>ضعيف (أقل من 70)</option>
                </select>
              </div>

              <div>
                <label className="block instructor-subtitle text-primary font-arabic mb-3">
                  الملاحظات:
                </label>
                <textarea
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 font-arabic text-primary h-32 resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="اكتب ملاحظاتك وتوجيهاتك للطالب..."
                ></textarea>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 btn-primary py-3 rounded-xl font-arabic transition-all hover:scale-105"
                >
                  حفظ التقييم
                </button>
                <button
                  type="button"
                  onClick={() => setShowEvaluationModal(false)}
                  className="flex-1 btn-secondary py-3 rounded-xl font-arabic transition-all"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
