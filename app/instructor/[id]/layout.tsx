import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة تحكم المعلم",
  description: "لوحة تحكم المعلم - أكاديمية إتقان لتحفيظ القرآن الكريم",
};

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" dir="rtl">
      {children}
    </div>
  );
}
