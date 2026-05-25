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
      statusColor: "text-cyan-400 bg-cyan-950/40 border-cyan-800/50 shadow-[0_0_10px_rgba(0,240,255,0.05)]",
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
      statusColor: "text-purple-400 bg-purple-950/40 border-purple-800/50",
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
      statusColor: "text-slate-500 bg-slate-950/40 border-slate-800/50",
      description: "สงครามบนสมรภูมิ Summoner's Rift ค้นหาสุดยอดทีมโรงเรียนที่มีการวางแผนกลยุทธ์และการทำงานเป็นทีมที่เป็นเลิศ",
      prize: "40,000 บาท",
      startDate: "กันยายน 2026",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent cyber-grid">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-slate-950/30 border-b border-slate-900/50 backdrop-blur-[2px]">
        {/* Soft Background Gradients */}
        <div className="absolute top-0 right-0 -z-10 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-10 -z-10 h-80 w-80 rounded-full bg-purple-500/5 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/20 bg-cyan-950/40 px-3 py-1.5 text-xs font-bold text-cyan-400 mb-6 shadow-[0_0_15px_rgba(0,240,255,0.05)]">
            <Trophy className="h-3.5 w-3.5" />
            <span>การแข่งขันอีสปอร์ตระดับนักเรียน ประจำปี 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight md:leading-none uppercase">
            ระบบจัดการการแข่งขัน <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent filter drop-shadow-[0_0_20px_rgba(0,240,255,0.15)]">
              E-Sports Tournament
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            แพลตฟอร์มการจัดการการแข่งขัน ลงทะเบียนคัดกรองคุณสมบัติผู้เล่น ตรวจสอบสายการแข่งขัน
            อัปเดตตารางคะแนนแบ่งกลุ่ม และติดตามสถานะไลฟ์แมตช์การแข่งขันแบบเรียลไทม์
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/game/rov"
              className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 hover:scale-[1.02] transition-all duration-200"
            >
              <Play className="h-4 w-4 fill-white text-white" />
              <span>เข้าสู่ Specific Game Hub</span>
            </Link>
            <Link
              href="/register"
              className="flex items-center space-x-2 rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-3.5 text-sm font-semibold text-slate-300 hover:bg-slate-800/80 hover:border-slate-700 hover:text-white transition-colors"
            >
              <Users className="h-4 w-4 text-slate-400" />
              <span>สมัครเข้าร่วมการแข่งขัน</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Game Grid Section */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-white">เลือกเกมที่แข่งขัน</h2>
            <p className="mt-1 text-sm text-slate-400">คลิกที่เกมที่เปิดรับสมัครเพื่อตรวจสอบสถานะ สายการแข่งขัน และข้อมูลทีม</p>
          </div>
        </div>

        {/* Game Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <div
              key={game.id}
              className={`glass-panel group relative rounded-2xl border border-slate-900/80 p-6 bg-slate-950/85 backdrop-blur-md flex flex-col justify-between transition-all duration-300 ${game.active
                ? "hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/50 cursor-pointer"
                : "opacity-60"
                }`}
            >
              <div>
                {/* Card Top / Badges */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-md border ${game.statusColor}`}>
                    {game.status}
                  </span>
                  {game.active ? (
                    <span className="text-[10px] font-extrabold bg-cyan-950/40 text-cyan-400 px-2 py-1 rounded-md border border-cyan-900/60 shadow-[0_0_10px_rgba(0,240,255,0.05)]">
                      {game.tag}
                    </span>
                  ) : (
                    <span className="text-[10px] font-extrabold bg-slate-900 text-slate-300 px-2 py-1 rounded-md border border-slate-800">
                      {game.tag}
                    </span>
                  )}
                </div>

                {/* Game Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {game.title}
                </h3>
                <span className="text-[10px] text-cyan-400/80 font-bold uppercase tracking-wider">{game.type}</span>

                {/* Description */}
                <p className="mt-3 text-sm text-slate-300 leading-relaxed min-h-[72px]">
                  {game.description}
                </p>

                {/* Stats list */}
                <div className="mt-6 space-y-2 border-t border-slate-900/80 pt-4 text-xs text-slate-300">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-cyan-400" />
                    <span>ระดับการรับสมัคร: </span>
                    <strong className="text-white">{game.level}</strong>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Flame className="h-4 w-4 text-cyan-400" />
                    <span>รางวัลรวม: </span>
                    <strong className="text-white">{game.prize}</strong>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-cyan-400" />
                    <span>วันเริ่มแข่งขัน: </span>
                    <strong className="text-white">{game.startDate}</strong>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-slate-900/50">
                {game.active ? (
                  <Link
                    href={`/game/${game.id}`}
                    className="flex w-full items-center justify-center space-x-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 py-3 text-sm font-bold group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-indigo-500 group-hover:text-slate-950 group-hover:border-transparent transition-all duration-300 shadow-md shadow-cyan-500/5 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                  >
                    <span>เข้าสู่ข้อมูลทัวร์นาเมนต์</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex w-full items-center justify-center space-x-2 rounded-xl bg-slate-950/40 border border-slate-900/60 py-3 text-sm font-semibold text-slate-500 cursor-not-allowed"
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
      <footer className="bg-slate-950/60 border-t border-slate-900 py-10 mt-20 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span className="font-semibold text-slate-400">E-Sports Tournament Management Platform</span>
          </div>
          <div>
            <span>© 2026 การแข่งขันอีสปอร์ตโรงเรียนไทย. สงวนลิขสิทธิ์ทั้งหมด</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
