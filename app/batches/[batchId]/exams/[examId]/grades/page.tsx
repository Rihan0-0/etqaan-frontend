"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth, useRequireAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import BackButton from "@/components/ui/BackButton";
import { toast } from "react-hot-toast";
import PageLoader from "@/components/ui/PageLoader";

interface Student {
  id: number;
  full_name: string;
  avatarIndex?: number;
}

interface BatchStudent {
  id: number;
  student: Student;
  league_points: number;
}

interface Exam {
  id: number;
  title: string;
  exam_date: string;
  max_score: number;
  exam_results?: Array<{
    batch_student_id: number;
    score: number;
  }>;
}

interface Batch {
  id: number;
  name: string;
  batch_students: BatchStudent[];
}

export default function ExamGradesPage() {
  const params = useParams();
  const router = useRouter();
  const batchId = params.batchId as string;
  const examId = params.examId as string;
  // Use useAuth to get user AND token
  const { user, token, isLoading: authLoading } = useAuth();

  // Protect route
  // We can't use useRequireAuth easily here because we need "token" for fetch
  // and useRequireAuth returns user/isLoading only.
  // Actually we can check user role here.

  const [exam, setExam] = useState<Exam | null>(null);
  const [batch, setBatch] = useState<Batch | null>(null);
  const [scores, setScores] = useState<Record<number, string>>({}); // batch_student_id -> score
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api-v1";

  // Redirect if not authorized
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/login");
      } else if (!["admin", "super_admin", "sheikh"].includes(user.role)) {
        router.push("/unauthorized");
      }
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        // Fetch Exam
        const examRes = await fetch(`${API_URL}/exams/${examId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!examRes.ok) throw new Error("فشل تحميل بيانات الامتحان");
        const examData = await examRes.json();
        setExam(examData);

        // Fetch Batch (for students)
        const batchRes = await fetch(`${API_URL}/batches/${batchId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!batchRes.ok) throw new Error("فشل تحميل بيانات الحلقة");
        const batchData = await batchRes.json();
        setBatch(batchData);

        // Initialize scores if results exist
        if (examData.exam_results && examData.exam_results.length > 0) {
          const initialScores: Record<number, string> = {};
          examData.exam_results.forEach((r: any) => {
            initialScores[r.batch_student_id] = r.score.toString();
          });
          setScores(initialScores);
        }
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchData();
    }
  }, [batchId, examId, API_URL, token]);

  const handleScoreChange = (batchStudentId: number, value: string) => {
    // Validate max score
    if (exam && Number(value) > exam.max_score) {
      toast.error(`الدرجة لا يمكن أن تتجاوز ${exam.max_score}`);
      return;
    }
    setScores((prev) => ({
      ...prev,
      [batchStudentId]: value,
    }));
  };

  const handleSave = async () => {
    // Validate all inputs
    const results = Object.entries(scores).map(([bsId, score]) => ({
      batchStudentId: parseInt(bsId),
      score: parseFloat(score),
    }));

    if (results.length === 0) {
      toast.error("يرجى إدخال درجات للطلاب");
      return;
    }

    // Filter out invalid scores
    const validResults = results.filter((r) => !isNaN(r.score));

    if (validResults.length === 0) {
      toast.error("لا توجد درجات صالحة للحفظ");
      return;
    }

    try {
      setIsSaving(true);
      const res = await fetch(`${API_URL}/exams/${examId}/results`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ results: validResults }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "فشل حفظ الدرجات");
      }

      toast.success("تم حفظ الدرجات وتحديث النقاط بنجاح! 🎉");
      router.push(`/batches/${batchId}`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || authLoading) {
    return <PageLoader />;
  }

  if (!exam || !batch) return null;

  return (
    <div className="min-h-screen bg-gray-50 font-arabic">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <BackButton href={`/batches/${batchId}`} label="العودة للحلقة" />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-t-4 border-orange-500">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span>📝</span>
                رصد درجات: {exam.title}
              </h1>
              <p className="text-gray-500 mt-1">
                تاريخ الامتحان:{" "}
                {new Date(exam.exam_date).toLocaleDateString("ar-EG")} | الدرجة
                العظمى: {exam.max_score}
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <span>💾</span>
                  حفظ الدرجات
                </>
              )}
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-right">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="p-4 font-bold border-b">#</th>
                  <th className="p-4 font-bold border-b">اسم الطالب</th>
                  <th className="p-4 font-bold border-b w-48">
                    الدرجة (من {exam.max_score})
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {batch.batch_students.map((bs, index) => (
                  <tr
                    key={bs.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-gray-500">{index + 1}</td>
                    <td className="p-4 font-medium text-gray-800">
                      {bs.student.full_name}
                    </td>
                    <td className="p-4">
                      <input
                        type="number"
                        min="0"
                        max={exam.max_score}
                        value={scores[bs.id] || ""}
                        onChange={(e) =>
                          handleScoreChange(bs.id, e.target.value)
                        }
                        placeholder="0"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold text-center text-gray-900"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {batch.batch_students.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              لا يوجد طلاب في هذه الحلقة
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
