"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import BatchCard from "@/components/public/BatchCard";
import RandomStars from "@/components/RandomStars";
import Link from "next/link";
import PageLoader from "@/components/ui/PageLoader";
import { useAuth } from "@/contexts/AuthContext";

interface Batch {
  id: number;
  name: string;
  schedule_description?: string;
  term_id: number;
  _count?: {
    batch_students: number;
  };
}

const batchColors = ["purple", "blue", "emerald", "orange", "pink", "cyan"];
const batchMascots = [
  "lion",
  "bear",
  "owl",
  "rabbit",
  "cat",
  "dog",
  "panda",
  "tiger",
];

export default function BatchesPage() {
  const { user } = useAuth();
  const [batches, setBatches] = useState<Batch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api-v1";

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await fetch(`${API_URL}/batches`);
        if (!response.ok) {
          throw new Error("فشل في تحميل الحلقات");
        }
        const data = await response.json();
        setBatches(data);
      } catch (err: any) {
        setError(err.message);
        // Mock data for development
        setBatches([
          {
            id: 1,
            name: "حلقة الأسود 🦁",
            schedule_description: "السبت والاثنين والأربعاء",
            term_id: 1,
            _count: { batch_students: 15 },
          },
          {
            id: 2,
            name: "حلقة النجوم ⭐",
            schedule_description: "الأحد والثلاثاء والخميس",
            term_id: 1,
            _count: { batch_students: 12 },
          },
          {
            id: 3,
            name: "حلقة الأبطال 🏆",
            schedule_description: "السبت والاثنين والأربعاء",
            term_id: 1,
            _count: { batch_students: 18 },
          },
          {
            id: 4,
            name: "حلقة الورد 🌹",
            schedule_description: "الأحد والثلاثاء والخميس",
            term_id: 1,
            _count: { batch_students: 10 },
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBatches();
  }, [API_URL]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50 relative">
      <RandomStars count={40} />

      <div className="relative z-10">
        <Header />

        <main className="max-w-6xl mx-auto px-6 py-8">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-5xl animate-bounce-gentle">📚</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-arabic">
                اختر حلقتك
              </h1>
              <span
                className="text-5xl animate-bounce-gentle"
                style={{ animationDelay: "0.5s" }}
              >
                🎓
              </span>
            </div>
            <p className="text-gray-600 font-arabic text-lg">
              ابحث عن اسمك في الحلقة وتتبع تقدمك
            </p>
          </div>

          {/* Loading State */}
          {isLoading && <PageLoader />}

          {/* Error State */}
          {error && !isLoading && batches.length === 0 && (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">😔</span>
              <p className="text-gray-600 font-arabic text-lg">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-xl font-arabic hover:bg-purple-700 transition-colors"
              >
                حاول مرة أخرى
              </button>
            </div>
          )}

          {/* Batches Grid */}
          {!isLoading && batches.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {batches.map((batch, index) => (
                <BatchCard
                  key={batch.id}
                  id={batch.id}
                  name={batch.name}
                  description={batch.schedule_description}
                  studentCount={batch._count?.batch_students || 0}
                  color={batchColors[index % batchColors.length]}
                  mascot={batchMascots[index % batchMascots.length]}
                />
              ))}
            </div>
          )}

          {/* Login CTA */}
          {!user && (
            <div className="mt-16 text-center">
              <div className="inline-block bg-white rounded-2xl p-6 shadow-lg">
                <p className="text-gray-600 font-arabic mb-4">
                  هل لديك حساب؟ سجل دخولك للوصول لمميزات أكثر!
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-arabic font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  <span>🔐</span>
                  تسجيل الدخول
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
