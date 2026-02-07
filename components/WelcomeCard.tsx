import Image from "next/image";

export default function WelcomeCard() {
  // You can change this path to your actual student image
  const studentImagePath = "/images/students/Memorization.png";

  return (
    <div
      className="rounded-lg p-6 flex items-center shadow-md"
      style={{ backgroundColor: "#c2e2f1" }}
    >
      <div className="w-2/3">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 font-arabic">
          أهلاً وسهلاً، أحمد!
        </h2>
        <p className="text-gray-800 font-medium text-lg mb-3 font-arabic">
          تقدم الحفظ
        </p>
        <div className="w-full bg-white/90 h-4 rounded-lg mt-2 mb-2 shadow-inner">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-lg transition-all duration-300 shadow-sm"
            style={{ width: "75%" }}
          ></div>
        </div>
        <p className="text-xl font-bold text-gray-900 font-arabic">75%</p>
      </div>
      <div className="w-1/3 flex justify-center">
        <div className="w-[200px] h-[200px] relative">
          <Image
            src={studentImagePath}
            alt="الطالب"
            width={200}
            height={200}
            className="rounded-full object-cover shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
