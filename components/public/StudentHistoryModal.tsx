"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Modal from "@/components/ui/Modal";

interface DailyRecord {
  id: number;
  record_date: string;
  attendance_status: "present" | "absent" | "late" | "excused";
  jadeed_range?: string;
  jadeed_grade?: string;
  muraja_range?: string;
  muraja_grade?: string;
  behavior_note?: string;
  bonus_points?: number;
}

interface ExamResult {
  id: number;
  score: number;
  exam: {
    id: number;
    title: string;
    max_score: number;
    exam_date: string;
  };
}

interface StudentHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: {
    id: number;
    name: string;
    points: number;
    avatarIndex?: number;
  } | null;
  batchStudentId?: number;
  batchId?: number;
}

// Cartoon avatars
const avatars = [
  { emoji: "🦁", bg: "from-amber-400 to-orange-500" },
  { emoji: "🐻", bg: "from-amber-600 to-amber-800" },
  { emoji: "🦉", bg: "from-purple-400 to-purple-600" },
  { emoji: "🐰", bg: "from-pink-300 to-pink-500" },
  { emoji: "🐱", bg: "from-orange-300 to-orange-500" },
  { emoji: "🐶", bg: "from-yellow-400 to-amber-500" },
  { emoji: "🐼", bg: "from-gray-400 to-gray-600" },
  { emoji: "🐯", bg: "from-orange-400 to-orange-600" },
  { emoji: "🐨", bg: "from-gray-300 to-gray-500" },
  { emoji: "🦊", bg: "from-orange-500 to-red-500" },
];

function getAvatar(id: number, avatarIndex?: number) {
  const index = avatarIndex !== undefined ? avatarIndex % avatars.length : id % avatars.length;
  return avatars[index];
}

const gradeEmojis: Record<string, string> = {
  excellent: "🌟",
  very_good: "⭐",
  good: "👍",
  acceptable: "👌",
  weak: "📚",
  redo: "🔄",
};

const gradeLabels: Record<string, string> = {
  excellent: "ممتاز",
  very_good: "جيد جداً",
  good: "جيد",
  acceptable: "مقبول",
  weak: "ضعيف",
  redo: "إعادة",
};

const attendanceIcons: Record<
  string,
  { emoji: string; label: string; color: string }
> = {
  present: { emoji: "✅", label: "حاضر", color: "text-green-600" },
  absent: { emoji: "❌", label: "غائب", color: "text-red-600" },
  late: { emoji: "⏰", label: "متأخر", color: "text-yellow-600" },
  excused: { emoji: "🏥", label: "معذور", color: "text-blue-600" },
};

export default function StudentHistoryModal({
  isOpen,
  onClose,
  student,
  batchStudentId,
  batchId,
}: StudentHistoryModalProps) {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<"sessions" | "exams">("sessions");
  const [dailyRecords, setDailyRecords] = useState<DailyRecord[]>([]);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api-v1";

  useEffect(() => {
    if (isOpen && student && token) {
      setIsLoading(true);
      const fetchHistory = async () => {
        try {
          const query = batchId ? `?batchId=${batchId}` : "";
          const res = await fetch(
            `${API_URL}/students/${student.id}/history${query}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );
          if (res.ok) {
            const data = await res.json();
            setDailyRecords(data.dailyRecords);
            setExamResults(data.examResults);
          }
        } catch (error) {
          console.error("Failed to fetch history", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchHistory();
    }
  }, [isOpen, student, batchId, token, API_URL]);

  if (!isOpen || !student) return null;

  const avatar = getAvatar(student.id, student.avatarIndex);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 bg-gradient-to-br ${avatar.bg} rounded-xl flex items-center justify-center shadow-lg`}
          >
            <span className="text-2xl">{avatar.emoji}</span>
          </div>
          <div>
            <div className="text-lg md:text-xl font-bold text-white font-arabic">
              {student.name}
            </div>
            <div className="flex items-center gap-2 text-sm text-purple-100 font-arabic">
              <span>⭐</span>
              {student.points} نقطة
            </div>
          </div>
        </div>
      }
      headerColorClass="bg-gradient-to-r from-purple-600 to-blue-600"
      maxWidth="max-w-2xl"
    >
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("sessions")}
          className={`flex-1 py-4 font-arabic font-semibold transition-colors flex items-center justify-center gap-2 ${
            activeTab === "sessions"
              ? "text-purple-600 border-b-3 border-purple-600 bg-purple-50"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <span>📅</span>
          الحضور والدرجات
        </button>
        <button
          onClick={() => setActiveTab("exams")}
          className={`flex-1 py-4 font-arabic font-semibold transition-colors flex items-center justify-center gap-2 ${
            activeTab === "exams"
              ? "text-purple-600 border-b-3 border-purple-600 bg-purple-50"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <span>📝</span>
          الامتحانات
        </button>
      </div>

      {/* Content */}
      <div className="p-6 max-h-[50vh] overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-arabic">جاري التحميل...</p>
          </div>
        ) : activeTab === "sessions" ? (
          <div className="space-y-4">
            {dailyRecords.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">📭</span>
                <p className="text-gray-500 font-arabic">
                  لا توجد سجلات حضور بعد
                </p>
              </div>
            ) : (
              dailyRecords.map((record) => (
                <div
                  key={record.id}
                  className="bg-gray-50 rounded-2xl p-4 border border-gray-100"
                >
                  {/* Date and attendance */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600 font-arabic font-semibold">
                      {new Date(record.record_date).toLocaleDateString(
                        "ar-EG",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </span>
                    <span
                      className={`flex items-center gap-1 font-arabic ${
                        attendanceIcons[record.attendance_status].color
                      }`}
                    >
                      <span>
                        {attendanceIcons[record.attendance_status].emoji}
                      </span>
                      {attendanceIcons[record.attendance_status].label}
                    </span>
                  </div>

                  {/* Grades */}
                  <div className="grid grid-cols-2 gap-3">
                    {record.jadeed_range && (
                      <div className="bg-white rounded-xl p-3 border border-gray-100">
                        <div className="text-sm text-gray-500 font-arabic mb-1">
                          الحفظ الجديد
                        </div>
                        <div className="font-arabic font-semibold text-gray-800">
                          {record.jadeed_range}
                        </div>
                        {record.jadeed_grade && (
                          <div className="flex items-center gap-1 mt-1">
                            <span>{gradeEmojis[record.jadeed_grade]}</span>
                            <span className="text-sm text-gray-600">
                              {gradeLabels[record.jadeed_grade]}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    {record.muraja_range && (
                      <div className="bg-white rounded-xl p-3 border border-gray-100">
                        <div className="text-sm text-gray-500 font-arabic mb-1">
                          المراجعة
                        </div>
                        <div className="font-arabic font-semibold text-gray-800">
                          {record.muraja_range}
                        </div>
                        {record.muraja_grade && (
                          <div className="flex items-center gap-1 mt-1">
                            <span>{gradeEmojis[record.muraja_grade]}</span>
                            <span className="text-sm text-gray-600">
                              {gradeLabels[record.muraja_grade]}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bonus */}
                  {record.bonus_points && record.bonus_points > 0 && (
                    <div className="mt-3 flex items-center gap-2 text-yellow-600 font-arabic text-sm">
                      <span>🎁</span>
                      نقاط إضافية: +{record.bonus_points}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {examResults.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-6xl mb-4 block">📋</span>
                <p className="text-gray-500 font-arabic">
                  لا توجد نتائج امتحانات بعد
                </p>
              </div>
            ) : (
              examResults.map((result) => {
                const percentage = (result.score / result.exam.max_score) * 100;
                const isExcellent = percentage >= 90;
                const isPassing = percentage >= 60;

                return (
                  <div
                    key={result.id}
                    className="bg-gray-50 rounded-2xl p-4 border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-arabic font-bold text-gray-800">
                          {result.exam.title}
                        </h4>
                        <span className="text-sm text-gray-500 font-arabic">
                          {new Date(result.exam.exam_date).toLocaleDateString(
                            "ar-EG",
                          )}
                        </span>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-3xl font-bold ${
                            isExcellent
                              ? "text-green-600"
                              : isPassing
                                ? "text-blue-600"
                                : "text-red-600"
                          }`}
                        >
                          {result.score}
                        </div>
                        <div className="text-sm text-gray-500 font-arabic">
                          من {result.exam.max_score}
                        </div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isExcellent
                            ? "bg-gradient-to-r from-green-400 to-green-600"
                            : isPassing
                              ? "bg-gradient-to-r from-blue-400 to-blue-600"
                              : "bg-gradient-to-r from-red-400 to-red-600"
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>

                    <div className="mt-2 flex items-center justify-end gap-2">
                      <span
                        className={
                          isExcellent
                            ? "text-green-600"
                            : isPassing
                              ? "text-blue-600"
                              : "text-red-600"
                        }
                      >
                        {isExcellent
                          ? "🌟 ممتاز!"
                          : isPassing
                            ? "👍 جيد"
                            : "📚 يحتاج مراجعة"}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
