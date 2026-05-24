"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import {
  Trophy,
  Gamepad2,
  Users,
  Flame,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Play
} from "lucide-react";

export default function LandingPage() {
  const games = [
    {
      id: "rov",
      title: "ROV (Arena of Valor)",
      active: true,
      tag: "ยอดนิยม",
      type: "MOBA 5v5",
      teamsCount: "32 ทีมสูงสุด",
      level: "ประถมศึกษา / มัธยมศึกษา",
      status: "กำลังแข่งขัน",
      statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200/60",
      description: "ศึกประชันความเป็นหนึ่งในการเล่นเกมวางแผนทีมระดับโรงเรียน การปะทะในแผนที่ Caldavar ชิงเกียรติยศและทุนการศึกษา",
      prize: "50,000 บาท",
      startDate: "15 มิถุนายน 2026",
    },
    {
      id: "valorant",
      title: "Valorant",
      active: false,
      tag: "เร็วๆ นี้",
      type: "FPS 5v5",
      teamsCount: "16 ทีมสูงสุด",
      level: "มัธยมศึกษา",
      status: "เตรียมเปิดรับสมัคร",
      statusColor: "text-amber-600 bg-amber-50 border-amber-200/60",
      description: "การแข่งขันเกมยิงแนววางยุทธวิธีแบบแบ่งฝ่ายโจมตีและป้องกัน ทักษะการยิงที่แม่นยำและการประสานงานทีมคือสิ่งสำคัญ",
      prize: "30,000 บาท",
      startDate: "1 สิงหาคม 2026",
    },
    {
      id: "lol",
      title: "League of Legends",
      active: false,
      tag: "เร็วๆ นี้",
      type: "MOBA 5v5",
      teamsCount: "16 ทีมสูงสุด",
      level: "มัธยมศึกษา",
      status: "รอประกาศเป็นทางการ",
      statusColor: "text-slate-500 bg-slate-50 border-slate-200/60",
      description: "สงครามบนสมรภูมิ Summoner's Rift ค้นหาสุดยอดทีมโรงเรียนที่มีการวางแผนกลยุทธ์และการทำงานเป็นทีมที่เป็นเลิศ",
      prize: "40,000 บาท",
      startDate: "กันยายน 2026",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-white border-b border-slate-100">
        {/* Soft Background Gradients */}
        <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 -z-10 h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 mb-6">
            <Trophy className="h-3.5 w-3.5" />
            <span>การแข่งขันอีสปอร์ตระดับนักเรียน ประจำปี 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight md:leading-none">
            ระบบจัดการการแข่งขัน <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              E-Sports Tournament
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            แพลตฟอร์มการจัดการการแข่งขัน ลงทะเบียนคัดกรองคุณสมบัติผู้เล่น ตรวจสอบสายการแข่งขัน
            อัปเดตตารางคะแนนแบ่งกลุ่ม และติดตามสถานะไลฟ์แมตช์การแข่งขันแบบเรียลไทม์
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/game/rov"
              className="flex items-center space-x-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>เข้าสู่ Specific Game Hub</span>
            </Link>
            <Link
              href="/register"
              className="flex items-center space-x-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <Users className="h-4 w-4 text-slate-500" />
              <span>สมัครเข้าร่วมการแข่งขัน</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Game Grid Section */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">เลือกเกมที่แข่งขัน</h2>
            <p className="mt-1 text-sm text-slate-500">คลิกที่เกมที่เปิดรับสมัครเพื่อตรวจสอบสถานะ สายการแข่งขัน และข้อมูลทีม</p>
          </div>
        </div>

        {/* Game Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <div
              key={game.id}
              className={`glass-panel group relative rounded-2xl border border-slate-200/80 p-6 bg-white flex flex-col justify-between transition-all duration-300 ${game.active
                  ? "hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-300/80 cursor-pointer"
                  : "opacity-85"
                }`}
            >
              <div>
                {/* Card Top / Badges */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${game.statusColor}`}>
                    {game.status}
                  </span>
                  {game.active ? (
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100">
                      {game.tag}
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-1 rounded-md">
                      {game.tag}
                    </span>
                  )}
                </div>

                {/* Game Title */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {game.title}
                </h3>
                <span className="text-xs text-slate-400 font-semibold uppercase">{game.type}</span>

                {/* Description */}
                <p className="mt-3 text-sm text-slate-500 leading-relaxed min-h-[72px]">
                  {game.description}
                </p>

                {/* Stats list */}
                <div className="mt-6 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-slate-400" />
                    <span>ระดับการรับสมัคร: </span>
                    <strong className="text-slate-800">{game.level}</strong>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Flame className="h-4 w-4 text-slate-400" />
                    <span>รางวัลรวม: </span>
                    <strong className="text-slate-800">{game.prize}</strong>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>วันเริ่มแข่งขัน: </span>
                    <strong className="text-slate-800">{game.startDate}</strong>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-slate-100">
                {game.active ? (
                  <Link
                    href={`/game/${game.id}`}
                    className="flex w-full items-center justify-center space-x-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white group-hover:bg-blue-600 transition-colors shadow-sm"
                  >
                    <span>เข้าสู่ข้อมูลทัวร์นาเมนต์</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex w-full items-center justify-center space-x-2 rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-400 cursor-not-allowed"
                  >
                    <span>ติดตามความคืบหน้า</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-10 mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-blue-500" />
            <span className="font-semibold text-slate-600">E-Sports Tournament Management Platform</span>
          </div>
          <div>
            <span>© 2026 การแข่งขันอีสปอร์ตโรงเรียนไทย. สงวนลิขสิทธิ์ทั้งหมด</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
