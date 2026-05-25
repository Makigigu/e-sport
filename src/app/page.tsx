"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import {
  Trophy,
  Users,
  Flame,
  Calendar,
  ChevronRight,
  ShieldCheck,
  Play,
  Home,
  MonitorPlay,
  UserPlus,
  Settings
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
      statusColor: "text-[#ff003c] border-[#ff003c]/30 bg-[#ff003c]/10",
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
      statusColor: "text-[#cc0000] border-[#cc0000]/30 bg-[#cc0000]/10",
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
      statusColor: "text-slate-400 border-slate-600 bg-slate-800",
      description: "สงครามบนสมรภูมิ Summoner's Rift ค้นหาสุดยอดทีมโรงเรียนที่มีการวางแผนกลยุทธ์และการทำงานเป็นทีมที่เป็นเลิศ",
      prize: "40,000 บาท",
      startDate: "กันยายน 2026",
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-transparent cyber-grid relative">
      <Header />

      {/* Left Floating Navigation Dock (Clean Esports Style) */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col space-y-4 z-40">
        <Link href="/" className="group flex items-center space-x-3 text-left">
          <div className="h-12 w-12 rounded-xl border border-[#ff003c]/20 bg-[#06080c]/80 backdrop-blur-md flex items-center justify-center transition-all group-hover:border-[#ff003c] group-hover:bg-[#ff003c]/10">
            <Home className="w-5 h-5 text-slate-300 group-hover:text-[#ff003c]" />
          </div>
          <span className="text-xs font-bold text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity bg-[#06080c]/90 border border-slate-800 px-4 py-2 rounded-lg backdrop-blur-md shadow-lg">
            หน้าแรก
          </span>
        </Link>
        <Link href="/game/rov" className="group flex items-center space-x-3 text-left">
          <div className="h-12 w-12 rounded-xl border border-slate-800 bg-[#06080c]/80 backdrop-blur-md flex items-center justify-center transition-all group-hover:border-[#cc0000] group-hover:bg-[#cc0000]/10">
            <MonitorPlay className="w-5 h-5 text-slate-400 group-hover:text-[#cc0000]" />
          </div>
          <span className="text-xs font-bold text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity bg-[#06080c]/90 border border-slate-800 px-4 py-2 rounded-lg backdrop-blur-md shadow-lg">
            Live Arena
          </span>
        </Link>
        <Link href="/register" className="group flex items-center space-x-3 text-left">
          <div className="h-12 w-12 rounded-xl border border-slate-800 bg-[#06080c]/80 backdrop-blur-md flex items-center justify-center transition-all group-hover:border-[#ff003c] group-hover:bg-[#ff003c]/10">
            <UserPlus className="w-5 h-5 text-slate-400 group-hover:text-[#ff003c]" />
          </div>
          <span className="text-xs font-bold text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity bg-[#06080c]/90 border border-slate-800 px-4 py-2 rounded-lg backdrop-blur-md shadow-lg">
            สมัครแข่งขัน
          </span>
        </Link>
        <Link href="/admin" className="group flex items-center space-x-3 text-left">
          <div className="h-12 w-12 rounded-xl border border-slate-800 bg-[#06080c]/80 backdrop-blur-md flex items-center justify-center transition-all group-hover:border-[#cc0000] group-hover:bg-[#cc0000]/10">
            <Settings className="w-5 h-5 text-slate-400 group-hover:text-[#cc0000]" />
          </div>
          <span className="text-xs font-bold text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity bg-[#06080c]/90 border border-slate-800 px-4 py-2 rounded-lg backdrop-blur-md shadow-lg">
            ผู้ดูแลระบบ
          </span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:pt-24 md:pb-20 border-b border-white/5 bg-[#06080c]/40 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 rounded-md border border-[#ff003c]/30 bg-[#ff003c]/10 px-4 py-1.5 text-xs font-bold text-[#ff003c] mb-6">
            <Trophy className="h-4 w-4" />
            <span>การแข่งขันอีสปอร์ตระดับนักเรียน ประจำปี 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight md:leading-none uppercase">
            ระบบจัดการการแข่งขัน <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff003c] to-[#cc0000]">
              E-Sports Tournament
            </span>
          </h1>

          <p className="mt-6 text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            แพลตฟอร์มการจัดการการแข่งขัน ลงทะเบียนคัดกรองคุณสมบัติผู้เล่น ตรวจสอบสายการแข่งขัน
            อัปเดตตารางคะแนนแบ่งกลุ่ม และติดตามสถานะไลฟ์แมตช์แบบเรียลไทม์
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/game/rov"
              className="flex items-center space-x-2 rounded-md bg-[#ff003c] hover:bg-[#ff3366] px-8 py-3.5 text-sm font-bold text-slate-900 transition-colors shadow-lg shadow-[#ff003c]/20"
            >
              <Play className="h-4 w-4 fill-slate-900 text-slate-900" />
              <span>เข้าสู่ E-Sports Live Hub</span>
            </Link>
            <Link
              href="/register"
              className="flex items-center space-x-2 rounded-md border border-slate-600 bg-slate-900/60 px-8 py-3.5 text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Users className="h-4 w-4 text-slate-400" />
              <span>สมัครเข้าร่วมการแข่งขัน</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Clean Structured Stats Ribbon */}
      <section className="border-b border-white/5 bg-[#0b0f1a]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
            <div className="px-6 py-8 text-center">
              <div className="text-3xl md:text-4xl font-black text-white">32+</div>
              <div className="text-[11px] text-slate-400 mt-2 font-bold uppercase tracking-wider">ทีมสมัครแข่งขันสูงสุด</div>
            </div>
            <div className="px-6 py-8 text-center">
              <div className="text-3xl md:text-4xl font-black text-white">50k฿</div>
              <div className="text-[11px] text-slate-400 mt-2 font-bold uppercase tracking-wider">ทุนรางวัลการศึกษารวม</div>
            </div>
            <div className="px-6 py-8 text-center">
              <div className="text-3xl md:text-4xl font-black text-white">16+</div>
              <div className="text-[11px] text-slate-400 mt-2 font-bold uppercase tracking-wider">โรงเรียนเข้าร่วมแข่งขัน</div>
            </div>
            <div className="px-6 py-8 text-center">
              <div className="text-3xl md:text-4xl font-black text-[#ff003c]">100%</div>
              <div className="text-[11px] text-[#ff003c]/70 mt-2 font-bold uppercase tracking-wider">ตรวจสอบเกียรติบัตรออนไลน์</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Game Grid Section */}
      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div className="border-l-4 border-[#ff003c] pl-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-white uppercase">รายการเกมแข่งขัน</h2>
            <p className="mt-1 text-sm text-slate-400 font-medium">คลิกที่เกมที่เปิดรับสมัครเพื่อตรวจสอบสถานะ สายการแข่งขัน และข้อมูลทีม</p>
          </div>
        </div>

        {/* Game Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <div
              key={game.id}
              className={`glass-panel group p-6 flex flex-col justify-between rounded-lg ${game.active ? 'cursor-pointer hover:border-[#ff003c]/50' : 'opacity-70'}`}
            >
              <div>
                {/* Card Top / Badges */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-sm border ${game.statusColor}`}>
                    {game.status}
                  </span>
                  {game.active ? (
                    <span className="text-[10px] font-extrabold bg-[#ff003c]/10 text-[#ff003c] px-2 py-1 rounded-sm border border-[#ff003c]/20">
                      {game.tag}
                    </span>
                  ) : (
                    <span className="text-[10px] font-extrabold bg-slate-800 text-slate-300 px-2 py-1 rounded-sm border border-slate-700">
                      {game.tag}
                    </span>
                  )}
                </div>

                {/* Game Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#ff003c] transition-colors">
                  {game.title}
                </h3>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{game.type}</span>

                {/* Description */}
                <p className="mt-4 text-sm text-slate-300 leading-relaxed min-h-[72px]">
                  {game.description}
                </p>

                {/* Stats list */}
                <div className="mt-6 space-y-3 bg-[#06080c]/50 p-4 rounded-md border border-white/5 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-[#ff003c]" />
                      <span>ระดับ:</span>
                    </span>
                    <strong className="text-white">{game.level}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Flame className="h-4 w-4 text-[#ff003c]" />
                      <span>รางวัล:</span>
                    </span>
                    <strong className="text-[#ff003c]">{game.prize}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-[#ff003c]" />
                      <span>เริ่มแข่ง:</span>
                    </span>
                    <strong className="text-white">{game.startDate}</strong>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6">
                {game.active ? (
                  <Link
                    href={`/game/${game.id}`}
                    className="flex w-full items-center justify-center space-x-2 rounded-md bg-[#ff003c] hover:bg-[#ff3366] text-slate-900 py-3 text-sm font-bold transition-colors"
                  >
                    <span>ดูรายละเอียด</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex w-full items-center justify-center space-x-2 rounded-md bg-slate-800 border border-slate-700 py-3 text-sm font-semibold text-slate-500 cursor-not-allowed"
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
      <footer className="bg-[#0b0f1a] border-t border-white/5 py-8 mt-12 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-[#ff003c]" />
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
