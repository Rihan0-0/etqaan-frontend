import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "أكاديمية إتقان | %s",
    default: "أكاديمية إتقان - تحفيظ القرآن الكريم",
  },
  description:
    "أكاديمية إتقان لتحفيظ القرآن الكريم - تعليم قرآني متميز مع متابعة شخصية",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${inter.variable} ${notoSansArabic.variable} ${geistMono.variable} font-arabic antialiased`}
      >
        <AuthProvider>
          {children}
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
