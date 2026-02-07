import { Metadata } from "next";

export const metadata: Metadata = {
  title: "لوحة تحكم الطالب",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen" dir="rtl">
      {children}
    </div>
  );
}
