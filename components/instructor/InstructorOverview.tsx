import Image from "next/image";

interface InstructorOverviewProps {
  instructorId: string;
}

export default function InstructorOverview({
  instructorId,
}: InstructorOverviewProps) {
  const instructorImagePath = "/images/profile/teacher.png";

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-8 text-white card-shadow-lg border border-emerald-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center overflow-hidden border-4 border-white/30 shadow-lg">
            <Image
              src={instructorImagePath}
              alt="صورة المعلم"
              width={96}
              height={96}
              className="rounded-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold font-arabic mb-3 text-white">
              مرحباً، الأستاذ أحمد محمد
            </h1>
            <p className="text-emerald-100 text-xl font-arabic mb-4 font-medium">
              معلم القرآن الكريم والتجويد
            </p>
            <div className="flex items-center gap-4">
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-arabic font-semibold border border-white/30">
                📚 خبرة 8 سنوات
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-arabic font-semibold border border-white/30">
                🎓 إجازة في القراءات
              </span>
              <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-arabic font-semibold border border-white/30">
                👥 45 طالب
              </span>
            </div>
          </div>
        </div>

        <div className="text-center bg-white/10 rounded-2xl p-6 border border-white/20">
          <div className="text-5xl mb-3">🌟</div>
          <div className="text-3xl font-bold font-arabic mb-2 text-white">
            4.9
          </div>
          <div className="text-emerald-100 text-base font-arabic font-medium">
            تقييم الطلاب
          </div>
          <div className="text-emerald-200 text-sm font-arabic mt-2">
            من 127 تقييم
          </div>
        </div>
      </div>
    </div>
  );
}
