export default function CoursesSection() {
  const courses = [
    {
      title: "حفظ القرآن الكريم",
      description: "برنامج شامل لحفظ القرآن الكريم مع المتابعة اليومية",
      color: "#7C4DFF",
      features: ["متابعة يومية", "اختبارات دورية", "مراجعة منتظمة"],
    },
    {
      title: "تجويد القرآن",
      description: "تعلم أحكام التجويد والقراءة الصحيحة للقرآن الكريم",
      color: "#26A69A",
      features: ["أحكام التجويد", "القراءة الصحيحة", "التطبيق العملي"],
    },
    {
      title: "التفسير المبسط",
      description: "فهم معاني القرآن الكريم بأسلوب مبسط ومناسب لجميع الأعمار",
      color: "#FFD54F",
      features: ["تفسير مبسط", "قصص القرآن", "الدروس والعبر"],
    },
  ];

  return (
    <section className="py-20 px-6 bg-white/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center text-gray-900 mb-16 font-arabic">
          برامجنا التعليمية
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl card-shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div
                className="p-8 text-white relative overflow-hidden"
                style={{ backgroundColor: course.color }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                <h3 className="text-2xl font-bold relative z-10 font-arabic">
                  {course.title}
                </h3>
              </div>

              <div className="p-8">
                <p className="text-gray-700 mb-6 text-lg font-arabic leading-relaxed">
                  {course.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {course.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-gray-800 font-arabic"
                    >
                      <span className="text-green-600 mr-3 text-xl">✓</span>
                      <span className="text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full py-4 px-6 rounded-xl text-white font-bold text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 font-arabic"
                  style={{ backgroundColor: course.color }}
                >
                  اشترك الآن
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
