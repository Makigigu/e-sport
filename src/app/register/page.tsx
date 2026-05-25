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
  ShieldCheck, 
  FileText,
  AlertCircle
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { registerTeam } = useApp();

  // Form states
  const [schoolName, setSchoolName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [teamTag, setTeamTag] = useState("");
  const [level, setLevel] = useState<"ประถม" | "มัธยม">("มัธยม");
  const [managerName, setManagerName] = useState("");
  const [players, setPlayers] = useState<{ name: string; openid: string }[]>([
    { name: "", openid: "" },
    { name: "", openid: "" },
    { name: "", openid: "" },
    { name: "", openid: "" },
    { name: "", openid: "" },
    { name: "", openid: "" }
  ]);
  
  // Consent checkboxes
  const [gradeCheck, setGradeCheck] = useState(false);
  const [rulesCheck, setRulesCheck] = useState(false);

  // Status states
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Handle Team Tag inputs (Strictly max 3 chars, auto-uppercase)
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 3).toUpperCase();
    setTeamTag(value);
  };

  // Handle individual player name changes
  const handlePlayerNameChange = (index: number, value: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], name: value };
    setPlayers(updatedPlayers);
  };

  // Handle individual player OpenID changes
  const handlePlayerOpenIdChange = (index: number, value: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], openid: value.trim() };
    setPlayers(updatedPlayers);
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation checks
    if (!schoolName.trim()) {
      setError("กรุณากรอกชื่อโรงเรียน");
      return;
    }
    if (!teamName.trim()) {
      setError("กรุณากรอกชื่อทีม");
      return;
    }
    if (teamTag.trim().length === 0) {
      setError("กรุณากรอกอักษรย่อทีม (Team Tag)");
      return;
    }
    if (teamTag.trim().length > 3) {
      setError("อักษรย่อทีม (Team Tag) ต้องมีความยาวไม่เกิน 3 ตัวอักษร");
      return;
    }
    
    // Validate all 6 names and OpenIDs are filled
    for (let i = 0; i < 6; i++) {
      if (!players[i].name.trim()) {
        setError(`กรุณากรอกชื่อผู้เข้าแข่งขันคนที่ ${i + 1}`);
        return;
      }
      if (!players[i].openid.trim()) {
        setError(`กรุณากรอก OpenID ของผู้เล่นคนที่ ${i + 1}`);
        return;
      }
    }

    // Check unique OpenIDs within the form
    const uniqueOpenIds = new Set(players.map(p => p.openid.toLowerCase()));
    if (uniqueOpenIds.size !== 6) {
      setError("OpenID ของผู้เล่นในทีมต้องไม่ซ้ำกัน");
      return;
    }

    if (!gradeCheck) {
      setError("กรุณายืนยันคุณสมบัติผู้เรียน (เกรดเฉลี่ย 2.00 ขึ้นไป และจำนวนฮีโร่)");
      return;
    }
    if (!rulesCheck) {
      setError("กรุณายอมรับกฎกติกาการแข่งขัน");
      return;
    }

    // Save to global context
    registerTeam({
      schoolName: schoolName.trim(),
      teamName: teamName.trim(),
      teamTag: teamTag.trim(),
      level,
      managerName: managerName.trim() || undefined,
      players,
    });

    setSuccess(true);
    setError(null);

    // Redirect to ROV game hub after 2 seconds
    setTimeout(() => {
      router.push("/game/rov");
    }, 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cyber-dark cyber-grid">
      <Header />

      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 py-12">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-950/40 text-cyan-400 border border-cyan-900/60 shadow-[0_0_15px_rgba(0,240,255,0.05)] mb-4">
            <UserPlus className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">ลงทะเบียนสมัครทีมแข่งขัน</h1>
          <p className="mt-2 text-sm text-slate-400">กรอกข้อมูลทีมงานและผู้เข้าแข่งขัน ROV เพื่อยื่นขอสิทธิ์อนุมัติเข้าร่วมทัวร์นาเมนต์</p>
        </div>

        {/* Success Alert */}
        {success ? (
          <div className="rounded-2xl bg-emerald-950/40 border border-emerald-900/40 p-6 text-center shadow-lg shadow-emerald-500/5 mb-8 animate-in fade-in zoom-in duration-300">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-900 text-emerald-400 mb-3 border border-emerald-800">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-emerald-400">ส่งใบสมัครเสร็จสิ้น!</h3>
            <p className="mt-2 text-sm text-slate-300">ข้อมูลของคุณถูกส่งเข้าระบบเรียบร้อยแล้ว กำลังนำคุณไปยังศูนย์รวมการแข่งขันในสักครู่...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Error Message */}
            {error && (
              <div className="flex items-start space-x-3 rounded-xl bg-rose-950/40 border border-rose-900/40 p-4 text-rose-400 animate-in fade-in duration-200">
                <AlertCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm font-semibold">{error}</span>
              </div>
            )}

            {/* Section 1: Team & School Info */}
            <div className="glass-panel rounded-2xl border-slate-900 bg-slate-950/40 p-6 md:p-8 space-y-6 shadow-md">
              <div className="flex items-center space-x-2 border-b border-slate-900 pb-3">
                <School className="h-5 w-5 text-cyan-400" />
                <h2 className="text-lg font-bold text-slate-200">ข้อมูลโรงเรียนและสังกัดทีม</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="level" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    ระดับชั้น
                  </label>
                  <select
                    id="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value as "ประถม" | "มัธยม")}
                    className="w-full rounded-xl glass-input px-4 py-3 text-sm text-white bg-slate-950/40 border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="ประถม" className="bg-slate-950 text-white">ประถมศึกษา</option>
                    <option value="มัธยม" className="bg-slate-950 text-white">มัธยมศึกษา</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="schoolName" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    ชื่อโรงเรียน
                  </label>
                  <input
                    type="text"
                    id="schoolName"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="ระบุชื่อโรงเรียนต้นสังกัด"
                    className="w-full rounded-xl glass-input px-4 py-3 text-sm text-white bg-slate-950/40 border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label htmlFor="teamName" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    ชื่อทีม (Full Team Name)
                  </label>
                  <input
                    type="text"
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="ระบุชื่อทีมแข่งขัน"
                    className="w-full rounded-xl glass-input px-4 py-3 text-sm text-white bg-slate-950/40 border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label htmlFor="teamTag" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    อักษรย่อทีม (Team Tag) <span className="text-cyan-400/80 font-semibold">*สูงสุด 3 ตัวอักษรภาษาอังกฤษ</span>
                  </label>
                  <input
                    type="text"
                    id="teamTag"
                    value={teamTag}
                    onChange={handleTagChange}
                    placeholder="เช่น BAC, T1X, BRU"
                    className="w-full rounded-xl glass-input px-4 py-3 text-sm font-semibold tracking-wider text-white font-mono bg-slate-950/40 border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="managerName" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    ชื่อผู้จัดการทีม / ครูผู้ควบคุมทีม <span className="text-slate-500 font-normal">(ถ้ามี - ตัวเลือกเสริม)</span>
                  </label>
                  <input
                    type="text"
                    id="managerName"
                    value={managerName}
                    onChange={(e) => setManagerName(e.target.value)}
                    placeholder="ชื่อ-นามสกุล ครูผู้ดูแลทีม"
                    className="w-full rounded-xl glass-input px-4 py-3 text-sm text-white bg-slate-950/40 border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Player Information */}
            <div className="glass-panel rounded-2xl border-slate-900 bg-slate-950/40 p-6 md:p-8 space-y-6 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-400" />
                  <h2 className="text-lg font-bold text-slate-200">รายชื่อผู้เข้าแข่งขัน (6 คน)</h2>
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">ตัวจริง 5 คน + สำรอง 1 คน</div>
              </div>

              {/* Help Text Widget */}
              <div className="rounded-xl bg-cyan-950/40 border border-cyan-900/60 p-4 flex items-start space-x-3 text-xs text-cyan-400 leading-relaxed shadow-sm">
                <HelpCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">วิธีหา OpenID:</span> เข้าเกม RoV แล้วกดที่ รูปโปรไฟล์ (มุมซ้ายบน) &gt; กดที่ฟันเฟือง &gt; กดที่ OpenID &gt; คัดลอก OpenID ของคุณ
                </div>
              </div>

              {/* Player Inputs Grid */}
              <div className="grid gap-6 md:grid-cols-2">
                {players.map((player, index) => (
                  <div key={index} className="glass-panel p-4 rounded-xl border border-slate-900 bg-slate-950/40 space-y-3 shadow-sm hover:border-cyan-555/30 transition-all duration-300">
                    <div className="flex justify-between items-center border-b border-slate-900/60 pb-1.5">
                      <span className="text-xs font-bold text-white">
                        ผู้เล่นที่ {index + 1} {index === 5 && <span className="text-slate-500 font-semibold">(ตัวสำรอง)</span>}
                      </span>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label htmlFor={`player-name-${index}`} className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        ชื่อ-นามสกุล
                      </label>
                      <input
                        type="text"
                        id={`player-name-${index}`}
                        value={player.name}
                        onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                        placeholder="ระบุชื่อ-นามสกุลจริง"
                        className="w-full rounded-xl glass-input px-3.5 py-2.5 text-xs text-white bg-slate-950/40 border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label htmlFor={`player-openid-${index}`} className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        OpenID
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                          <User className="h-3.5 w-3.5" />
                        </div>
                        <input
                          type="text"
                          id={`player-openid-${index}`}
                          value={player.openid}
                          onChange={(e) => handlePlayerOpenIdChange(index, e.target.value)}
                          placeholder="ระบุ OpenID ของผู้เล่น"
                          className="w-full rounded-xl glass-input pl-9 pr-4 py-2.5 text-xs text-white font-mono bg-slate-950/40 border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Agreements & Consent */}
            <div className="glass-panel rounded-2xl border-slate-900 bg-slate-950/40 p-6 md:p-8 space-y-6 shadow-md">
              <div className="flex items-center space-x-2 border-b border-slate-900 pb-3">
                <FileText className="h-5 w-5 text-cyan-400" />
                <h2 className="text-lg font-bold text-slate-200">กติกาและสัญญายินยอม</h2>
              </div>

              <div className="space-y-4">
                {/* Rule Checkbox 1 */}
                <label className="flex items-start space-x-3.5 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    checked={gradeCheck}
                    onChange={(e) => setGradeCheck(e.target.checked)}
                    className="h-5 w-5 rounded-md border-slate-800 bg-slate-950/60 text-cyan-500 focus:ring-cyan-500/25 mt-0.5 flex-shrink-0 cursor-pointer"
                  />
                  <span className="text-xs text-slate-400 font-medium group-hover:text-white transition-colors leading-relaxed">
                    ข้าพเจ้ายืนยันว่าผู้เล่นมีผลการเรียน <span className="font-bold text-white">2.00 ขึ้นไป</span> ไม่ติด <span className="font-bold text-white">0, ร, มส.</span> และมีฮีโร่รวมในบัญชีอย่างน้อย <span className="font-bold text-white">18 ตัว</span>
                  </span>
                </label>

                {/* Rule Checkbox 2 */}
                <label className="flex items-start space-x-3.5 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    checked={rulesCheck}
                    onChange={(e) => setRulesCheck(e.target.checked)}
                    className="h-5 w-5 rounded-md border-slate-800 bg-slate-950/60 text-cyan-500 focus:ring-cyan-500/25 mt-0.5 flex-shrink-0 cursor-pointer"
                  />
                  <span className="text-xs text-slate-400 font-medium group-hover:text-white transition-colors leading-relaxed">
                    ข้าพเจ้ายืนยันและยอมรับกฎกติกาการเข้าร่วมแข่งขันทุกประการ
                  </span>
                </label>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-900/60">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3.5 text-sm font-bold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                ย้อนกลับ
              </button>
              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white px-8 py-3.5 text-sm font-bold shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all scale-[1.02] cursor-pointer"
              >
                ส่งใบสมัครเข้าร่วมทีม
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
