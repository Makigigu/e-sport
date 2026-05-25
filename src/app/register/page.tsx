"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { useApp } from "@/context/AppContext";
import { 
  UserPlus, 
  School, 
  Users, 
  User, 
  HelpCircle, 
  AlertCircle
} from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { registerTeam } = useApp();

  // Form states
  const [schoolName, setSchoolName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamTag, setTeamTag] = useState("");
  const [level, setLevel] = useState<"ประถม" | "มัธยม">("มัธยม");
  const [managerName, setManagerName] = useState("");
  const [game, setGame] = useState("ROV");
  const [playerCount, setPlayerCount] = useState(6);
  const [players, setPlayers] = useState<{ name: string; openid: string }[]>(
    Array(6).fill({ name: "", openid: "" })
  );

  // Status states
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 3).toUpperCase();
    setTeamTag(value);
  };

  const handlePlayerNameChange = (index: number, value: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], name: value };
    setPlayers(updatedPlayers);
  };

  const handlePlayerOpenIdChange = (index: number, value: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], openid: value.trim() };
    setPlayers(updatedPlayers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!schoolName.trim()) { toast.error("กรุณากรอกชื่อโรงเรียน"); return; }
    if (!teamName.trim()) { toast.error("กรุณากรอกชื่อทีม"); return; }
    if (teamTag.trim().length === 0) { toast.error("กรุณากรอกอักษรย่อทีม (Team Tag)"); return; }
    if (teamTag.trim().length > 3) { toast.error("อักษรย่อทีม (Team Tag) ต้องมีความยาวไม่เกิน 3 ตัวอักษร"); return; }
    
    for (let i = 0; i < playerCount; i++) {
      if (!players[i].name.trim()) { toast.error(`กรุณากรอกชื่อผู้เข้าแข่งขันคนที่ ${i + 1}`); return; }
      if (!players[i].openid.trim()) { toast.error(`กรุณากรอก OpenID ของผู้เล่นคนที่ ${i + 1}`); return; }
    }

    const uniqueOpenIds = new Set(players.map(p => p.openid.toLowerCase()));
    if (uniqueOpenIds.size !== playerCount) { toast.error("OpenID ของผู้เล่นในทีมต้องไม่ซ้ำกัน"); return; }

    registerTeam({
      schoolName: schoolName.trim(),
      teamName: teamName.trim(),
      teamTag: teamTag.trim(),
      level,
      managerName: managerName.trim() || undefined,
      players,
    });

    setSuccess(true);
    toast.success("ส่งใบสมัครเสร็จสิ้น!");

    setTimeout(() => { router.push("/game/rov"); }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent cyber-grid">
      <Header />

      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 py-12 z-10">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#ff003c]/10 text-[#ff003c] border border-[#ff003c]/30 mb-4">
            <UserPlus className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white uppercase">ลงทะเบียนสมัครทีมแข่งขัน</h1>
          <p className="mt-2 text-sm text-slate-400">กรอกข้อมูลทีมงานและผู้เข้าแข่งขัน ROV เพื่อยื่นขอสิทธิ์อนุมัติเข้าร่วมทัวร์นาเมนต์</p>
        </div>

        {success ? (
          <div className="glass-panel rounded-lg border-emerald-500/30 bg-emerald-900/20 p-6 text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-3 border border-emerald-500/30">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-emerald-400">ส่งใบสมัครเสร็จสิ้น!</h3>
            <p className="mt-2 text-sm text-slate-300">ข้อมูลของคุณถูกส่งเข้าระบบเรียบร้อยแล้ว กำลังนำคุณไปยังศูนย์รวมการแข่งขันในสักครู่...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="glass-panel flex items-start space-x-3 rounded-lg border-rose-500/30 bg-rose-900/20 p-4 text-rose-400">
                <AlertCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold">{error}</span>
              </div>
            )}

            <div className="glass-panel rounded-lg p-6 md:p-8 space-y-6">
              <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
                <School className="h-5 w-5 text-[#ff003c]" />
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">ข้อมูลโรงเรียนและสังกัดทีม</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="game" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">เกมที่ต้องการแข่งขัน</label>
                  <select
                    id="game"
                    value={game}
                    onChange={(e) => setGame(e.target.value)}
                    className="w-full rounded-md glass-input px-4 py-3 text-sm text-white"
                  >
                    <option value="ROV" className="bg-[#0b0f1a] text-white">ROV (Arena of Valor)</option>
                    <option value="Valorant" className="bg-[#0b0f1a] text-white">Valorant</option>
                    <option value="League of Legends" className="bg-[#0b0f1a] text-white">League of Legends</option>
                    <option value="Free Fire" className="bg-[#0b0f1a] text-white">Free Fire</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="level" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">ระดับชั้น</label>
                  <select
                    id="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value as "ประถม" | "มัธยม")}
                    className="w-full rounded-md glass-input px-4 py-3 text-sm text-white"
                  >
                    <option value="ประถม" className="bg-[#0b0f1a] text-white">ประถมศึกษา</option>
                    <option value="มัธยม" className="bg-[#0b0f1a] text-white">มัธยมศึกษา</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="schoolName" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">ชื่อโรงเรียน</label>
                  <input
                    type="text"
                    id="schoolName"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="ระบุชื่อโรงเรียนต้นสังกัด"
                    className="w-full rounded-md glass-input px-4 py-3 text-sm text-white"
                  />
                </div>

                <div>
                  <label htmlFor="teamName" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">ชื่อทีม (Full Team Name)</label>
                  <input
                    type="text"
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="ระบุชื่อทีมแข่งขัน"
                    className="w-full rounded-md glass-input px-4 py-3 text-sm text-white"
                  />
                </div>

                <div>
                  <label htmlFor="teamTag" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    อักษรย่อทีม (Team Tag) <span className="text-[#ff003c]/80 font-semibold">*สูงสุด 3 อักษร</span>
                  </label>
                  <input
                    type="text"
                    id="teamTag"
                    value={teamTag}
                    onChange={handleTagChange}
                    placeholder="เช่น BAC, T1X"
                    className="w-full rounded-md glass-input px-4 py-3 text-sm font-semibold tracking-wider text-white font-mono"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="managerName" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    ชื่อผู้จัดการทีม / ครู <span className="text-slate-500 font-normal">(ถ้ามี)</span>
                  </label>
                  <input
                    type="text"
                    id="managerName"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                    placeholder="ชื่อ-นามสกุล ครูผู้ดูแลทีม"
                    className="w-full rounded-md glass-input px-4 py-3 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-lg p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-[#cc0000]" />
                  <h2 className="text-lg font-bold text-white uppercase tracking-wider">รายชื่อผู้เข้าแข่งขัน</h2>
                </div>
                <select
                  value={playerCount}
                  onChange={(e) => {
                    const count = parseInt(e.target.value);
                    setPlayerCount(count);
                    setPlayers(Array(count).fill({ name: "", openid: "" }));
                  }}
                  className="rounded-md glass-input px-3 py-1.5 text-xs text-white bg-[#0b0f1a] border-slate-700"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1} className="bg-[#0b0f1a]">จำนวน {i + 1} คน</option>
                  ))}
                </select>
              </div>

              <div className="rounded-md bg-[#ff003c]/10 border border-[#ff003c]/30 p-4 flex items-start space-x-3 text-xs text-slate-300">
                <HelpCircle className="h-5 w-5 text-[#ff003c] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white">วิธีหา OpenID:</span> เข้าเกม RoV &gt; โปรไฟล์ &gt; ตั้งค่า &gt; OpenID &gt; คัดลอก
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {players.map((player, index) => (
                  <div key={index} className="glass-panel p-4 rounded-md border border-white/5 space-y-3">
                    <div className="flex justify-between items-center border-b border-white/5 pb-1.5">
                      <span className="text-xs font-bold text-white">
                        ผู้เล่นที่ {index + 1} {index === 5 && <span className="text-slate-500 font-semibold">(สำรอง)</span>}
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        value={player.name}
                        onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                        placeholder="ชื่อ-นามสกุลจริง"
                        className="w-full rounded-md glass-input px-3.5 py-2 text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                          <User className="h-3.5 w-3.5" />
                        </div>
                        <input
                          type="text"
                          value={player.openid}
                          onChange={(e) => handlePlayerOpenIdChange(index, e.target.value)}
                          placeholder="OpenID ผู้เล่น"
                          className="w-full rounded-md glass-input pl-9 pr-4 py-2 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>



            <div className="flex justify-between pt-4">
              <button type="button" onClick={() => router.back()} className="px-6 py-3 text-sm font-bold text-slate-400 hover:text-white transition-colors">
                ย้อนกลับ
              </button>
              <button type="submit" className="rounded-md bg-[#ff003c] hover:bg-[#ff3366] text-slate-900 px-8 py-3 text-sm font-bold transition-colors">
                ส่งใบสมัคร
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
