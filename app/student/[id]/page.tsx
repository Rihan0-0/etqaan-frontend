import Header from "@/components/Header";
import WelcomeCard from "@/components/WelcomeCard";
import InfoCards from "@/components/InfoCards";
import BackgroundPattern from "@/components/BackgroundPattern";

export default function StudentDashboard({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 min-h-screen relative">
      <BackgroundPattern />

      <div className="relative z-10">
        <Header />
        <main className="p-6 max-w-5xl mx-auto">
          <WelcomeCard />
          <InfoCards />

          {/* Additional Arabic Content */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 card-shadow-lg border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
                <span className="text-2xl mr-3">📅</span>
                الجدول الأسبوعي
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-gray-800 font-arabic">
                    السبت
                  </span>
                  <span className="text-purple-700 font-semibold font-arabic">
                    9:00 ص - 11:00 ص
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-gray-800 font-arabic">
                    الاثنين
                  </span>
                  <span className="text-purple-700 font-semibold font-arabic">
                    9:00 ص - 11:00 ص
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-gray-800 font-arabic">
                    الأربعاء
                  </span>
                  <span className="text-purple-700 font-semibold font-arabic">
                    9:00 ص - 11:00 ص
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 card-shadow-lg border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-6 font-arabic flex items-center">
                <span className="text-2xl mr-3">🎯</span>
                الأهداف الشهرية
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-gray-800 font-arabic">
                    حفظ جزء عم
                  </span>
                  <span className="text-green-600 text-xl">✅</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium text-gray-800 font-arabic">
                    مراجعة سورة البقرة
                  </span>
                  <span className="text-yellow-600 text-xl">⏳</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-gray-800 font-arabic">
                    تعلم أحكام النون الساكنة
                  </span>
                  <span className="text-green-600 text-xl">✅</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
