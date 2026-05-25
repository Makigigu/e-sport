import type { Metadata } from "next";
import { Inter, Sarabun } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "ระบบจัดการแข่งขันอีสปอร์ตระดับนักเรียน - Tournament Management",
  description: "ระบบจัดการการแข่งขันอีสปอร์ตครบวงจร จัดการตารางคะแนน สายการแข่งขัน และถ่ายทอดสดพร้อมระบบเกียรติบัตรอิเล็กทรอนิกส์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${sarabun.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-slate-200">
        <AppContextProvider>
          {children}
        </AppContextProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
