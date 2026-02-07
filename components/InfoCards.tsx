export default function InfoCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {/* Sessions Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-5 text-center" style={{ backgroundColor: "#7C4DFF" }}>
          <h3 className="text-xl font-bold text-white font-arabic">الجلسات</h3>
        </div>
        <div className="p-6 text-center">
          <p className="mt-2 text-sm text-gray-600 font-medium font-arabic mb-4">
            20 أبريل، 2024
          </p>
          <p className="text-gray-900 font-medium text-base mb-2 font-arabic">
            الحفظ:{" "}
            <span className="font-bold text-green-700">ممتاز جداً ✅</span>
          </p>
          <p className="text-gray-900 font-medium text-base font-arabic">
            الحضور: <span className="text-green-700 font-bold">حاضر</span>
          </p>
        </div>
      </div>

      {/* Exams Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-5 text-center" style={{ backgroundColor: "#FFD54F" }}>
          <h3 className="text-xl font-bold text-gray-900 font-arabic">
            الامتحانات
          </h3>
        </div>
        <div className="p-6 text-center">
          <p className="mt-2 text-gray-900 font-semibold text-lg font-arabic">
            سورة البقرة 1-5
          </p>
          <p className="text-gray-700 font-medium mb-4 font-arabic">
            5 مايو، 2024
          </p>
          <p className="text-4xl font-bold mt-2 text-gray-900 font-arabic">
            90
          </p>
        </div>
      </div>

      {/* Ranking Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="p-5 text-center" style={{ backgroundColor: "#26A69A" }}>
          <h3 className="text-xl font-bold text-white font-arabic">الترتيب</h3>
        </div>
        <div className="p-6 text-center">
          <div className="text-5xl mt-2 mb-3">⭐</div>
          <p className="mt-2 text-gray-900 font-medium text-base font-arabic mb-2">
            ترتيب الدفعة
          </p>
          <p
            className="text-3xl font-bold font-arabic"
            style={{ color: "#7C4DFF" }}
          >
            الثاني
          </p>
        </div>
      </div>
    </div>
  );
}
