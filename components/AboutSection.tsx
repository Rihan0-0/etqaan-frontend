export default function AboutSection() {
  const stats = [
    { number: "500+", label: "طالب وطالبة", color: "#7C4DFF" },
    { number: "25+", label: "معلم ومعلمة", color: "#26A69A" },
    { number: "10+", label: "سنوات خبرة", color: "#FFD54F" },
    { number: "95%", label: "معدل النجاح", color: "#FF6B6B" },
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          لماذا تختار أكاديمية إتقان؟
        </h2>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: stat.color }}
              >
                <span className="text-2xl font-bold text-white">
                  {stat.number}
                </span>
              </div>
              <p className="text-gray-700 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="p-8 rounded-lg shadow-lg"
            style={{ backgroundColor: "#c2e2f1" }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🎯 المتابعة الشخصية
            </h3>
            <p className="text-gray-700">
              نوفر متابعة فردية لكل طالب مع تقارير دورية عن التقدم والحضور
            </p>
          </div>

          <div
            className="p-8 rounded-lg shadow-lg"
            style={{ backgroundColor: "#26A69A" }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              📱 تقنية حديثة
            </h3>
            <p className="text-white">
              استخدام أحدث التقنيات في التعليم مع منصة إلكترونية متطورة
            </p>
          </div>

          <div
            className="p-8 rounded-lg shadow-lg"
            style={{ backgroundColor: "#FFD54F" }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              👥 بيئة محفزة
            </h3>
            <p className="text-white">
              جو تعليمي مشجع مع أنشطة ومسابقات لتحفيز الطلاب
            </p>
          </div>

          <div
            className="p-8 rounded-lg shadow-lg"
            style={{ backgroundColor: "#7C4DFF" }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              ⏰ مرونة في الأوقات
            </h3>
            <p className="text-white">
              جداول مرنة تناسب جميع الفئات العمرية والظروف المختلفة
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
