"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { ECertificateModal } from "@/components/ECertificateModal";
import { useApp, Team, Match } from "@/context/AppContext";
import { 
  Tv, 
  Search, 
  Award, 
  Calendar, 
  Users, 
  LayoutGrid, 
  ChevronRight, 
  Timeline, 
  CheckCircle,
  FileCheck,
  Gamepad,
  HelpCircle,
  Flame,
  TrendingUp,
  History
} from "lucide-react";

type SubTab = "standings" | "bracket" | "tracker";

export default function GameHubPage() {
  const params = useParams();
  const gameId = params?.gameId as string;

  const {
    teams,
    groups,
    bracketSize,
    bracketMatches,
    liveMatch,
    liveStreamUrl,
    setBracketSize
  } = useApp();

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<SubTab>("standings");

  // Search OpenID state
  const [searchOpenId, setSearchOpenId] = useState("");
  const [searchedTeam, setSearchedTeam] = useState<Team | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // E-Certificate modal state
  const [certificateTeam, setCertificateTeam] = useState<Team | null>(null);

  // Search function (supports OpenID, Team Name, and School Name)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    
    const searchVal = searchOpenId.trim().toLowerCase();
    if (!searchVal) {
      setSearchedTeam(null);
      return;
    }

    // Search teams by teamName, schoolName, or player openids
    const found = teams.find((t) => 
      t.teamName.toLowerCase().includes(searchVal) ||
      t.schoolName.toLowerCase().includes(searchVal) ||
      t.players.some((p) => {
        const openid = typeof p === "object" && p !== null ? p.openid : p;
        return openid && openid.toLowerCase() === searchVal;
      })
    );

    setSearchedTeam(found || null);
  };

  // Group teams calculation
  const getGroupTeamsSorted = (teamIds: string[]) => {
    const groupTeams = teams.filter((t) => teamIds.includes(t.id));
    // Sort by points desc, wins desc
    return groupTeams.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return b.wins - a.wins;
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Game Title Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-blue-600 font-bold tracking-wider uppercase mb-1">
              <Gamepad className="h-4 w-4" />
              <span>ROV THAILAND TOURNAMENT</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              {gameId === "rov" ? "ROV: Arena of Valor - ลีกโรงเรียน" : gameId.toUpperCase()}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              ระบบศูนย์รวมข้อมูลการแข่งขัน ไลฟ์สตรีม และตารางสายคะแนนของตัวแทนโรงเรียน
            </p>
          </div>
          
          {/* Quick tournament stats */}
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="glass-panel bg-white border border-slate-200/50 rounded-xl px-4 py-2.5 shadow-sm flex items-center space-x-2.5">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">ทีมสมัครทั้งหมด</span>
                <span className="font-bold text-slate-800">{teams.length} ทีม</span>
              </div>
            </div>
            <div className="glass-panel bg-white border border-slate-200/50 rounded-xl px-4 py-2.5 shadow-sm flex items-center space-x-2.5">
              <Award className="h-4 w-4 text-indigo-500" />
              <div>
                <span className="block text-[10px] text-slate-400 font-bold uppercase">เงินรางวัลรวม</span>
                <span className="font-bold text-slate-800">50,000 บาท</span>
              </div>
            </div>
          </div>
        </div>

        {/* TOP: Responsive Embedded Live Stream */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <Tv className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-800">การถ่ายทอดสดหลัก (Live Broadcast)</h2>
          </div>
          
          <div className="glass-panel rounded-2xl border border-slate-200/80 bg-white p-3 shadow-md">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 shadow-inner">
              <iframe
                src={liveStreamUrl}
                title="E-Sports Tournament Live Stream"
                className="absolute inset-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* MIDDLE: Check Team Status & E-Certificate */}
        <section className="glass-panel rounded-2xl border border-slate-200/80 bg-white p-6 md:p-8 shadow-sm">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-3">
              <Award className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-800">ตรวจสอบสถานะการสมัคร & ดาวน์โหลดเกียรติบัตร</h2>
            </div>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              สำหรับผู้เข้าแข่งขันและโรงเรียนต้นสังกัด สามารถกรอก OpenID, ชื่อทีม หรือชื่อโรงเรียนของคุณ เพื่อตรวจสอบสถานะการอนุมัติและดาวน์โหลดเกียรติบัตรอิเล็กทรอนิกส์ได้ทันที
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex gap-2.5">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="h-4.5 w-4.5" />
                </div>
                <input
                  type="text"
                  placeholder="ค้นหาด้วย OpenID, ชื่อทีม หรือชื่อโรงเรียนของคุณ..."
                  value={searchOpenId}
                  onChange={(e) => setSearchOpenId(e.target.value)}
                  className="w-full rounded-xl glass-input pl-10 pr-4 py-3 text-xs text-slate-800"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-slate-900 text-white px-5 py-3 text-xs font-semibold hover:bg-blue-600 transition-colors shadow-sm"
              >
                ตรวจสอบสิทธิ์
              </button>
            </form>

            {/* Search Results Display */}
            {hasSearched && (
              <div className="mt-6 pt-5 border-t border-slate-100 animate-in fade-in duration-200">
                {searchedTeam ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl gap-4">
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                        พบทีมแข่งขันของคุณ
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        ทีม {searchedTeam.teamName} [{searchedTeam.teamTag}]
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        สังกัด: {searchedTeam.schoolName} ({searchedTeam.level === "ประถม" ? "ประถมศึกษา" : "มัธยมศึกษา"})
                      </p>
                      
                      {/* Status indicator */}
                      <div className="mt-2.5 flex items-center space-x-1.5">
                        <span className="text-[11px] text-slate-500">สถานะใบสมัคร:</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          searchedTeam.status === "Approved"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : searchedTeam.status === "Pending"
                            ? "bg-amber-50 text-amber-600 border-amber-100"
                            : searchedTeam.status === "Waitlisted"
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : "bg-rose-50 text-rose-600 border-rose-100"
                        }`}>
                          {searchedTeam.status === "Approved" ? "อนุมัติเข้าร่วมแล้ว" : searchedTeam.status === "Pending" ? "รอตรวจสอบคุณสมบัติ" : searchedTeam.status === "Waitlisted" ? "อยู่ในรายชื่อสำรอง" : "ปฏิเสธใบสมัคร"}
                        </span>
                      </div>
                    </div>

                    {/* Download E-Certificate Action */}
                    {searchedTeam.status === "Approved" ? (
                      <button
                        onClick={() => setCertificateTeam(searchedTeam)}
                        className="flex items-center space-x-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all self-start sm:self-center"
                      >
                        <Award className="h-4 w-4" />
                        <span>ดาวน์โหลดเกียรติบัตร</span>
                      </button>
                    ) : (
                      <div className="flex items-start space-x-2 text-xs text-slate-400 max-w-xs self-start sm:self-center bg-slate-100/50 p-3 rounded-lg border border-slate-200/50">
                        <HelpCircle className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span>ดาวน์โหลดได้เมื่อใบสมัครได้รับการ 'อนุมัติเข้าร่วมแล้ว' เท่านั้น</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-xl text-xs text-rose-700 font-semibold flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                    <span>ไม่พบข้อมูล OpenID นี้ในระบบ หรือข้อมูลยังไม่ได้ถูกลงทะเบียน</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* BOTTOM: Interactive Tab Section */}
        <section className="space-y-6">
          {/* Tab Selector Buttons */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
            <button
              onClick={() => setActiveTab("standings")}
              className={`flex items-center space-x-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${
                activeTab === "standings"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>ตารางคะแนนแบ่งกลุ่ม (Group Standings)</span>
            </button>

            <button
              onClick={() => setActiveTab("bracket")}
              className={`flex items-center space-x-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${
                activeTab === "bracket"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>สายการแข่งขัน (Playoffs Bracket)</span>
            </button>

            <button
              onClick={() => setActiveTab("tracker")}
              className={`flex items-center space-x-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${
                activeTab === "tracker"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              <History className="h-4 w-4" />
              <span>ติดตามแมตช์สด (Live Match Tracker)</span>
            </button>
          </div>

          {/* TAB 1: GROUP STANDINGS */}
          {activeTab === "standings" && (
            <div className="grid gap-8 md:grid-cols-2">
              {groups.map((group) => {
                const sortedGroupTeams = getGroupTeamsSorted(group.teamIds);
                return (
                  <div key={group.id} className="glass-panel rounded-2xl border border-slate-200/80 bg-white p-5 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <span className="font-extrabold text-slate-800 text-sm">{group.name}</span>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">พบกันหมด (Round Robin)</span>
                    </div>

                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse text-xs min-w-[320px]">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase">
                            <th className="py-2.5 w-12 text-center">อันดับ</th>
                            <th className="py-2.5">ทีมแข่งขัน</th>
                            <th className="py-2.5 text-center w-12">ชนะ</th>
                            <th className="py-2.5 text-center w-12">แพ้</th>
                            <th className="py-2.5 text-center w-12">คะแนน</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 font-medium">
                          {sortedGroupTeams.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">
                                ยังไม่มีทีมในกลุ่มนี้
                              </td>
                            </tr>
                          ) : (
                            sortedGroupTeams.map((team, index) => (
                              <tr key={team.id} className="hover:bg-slate-50/30">
                                <td className="py-2.5 text-center font-bold text-slate-500">
                                  {index + 1}
                                </td>
                                <td className="py-2.5">
                                  <span className="font-bold text-slate-800 block sm:inline">{team.teamName}</span>
                                  <span className="text-[9px] text-slate-400 font-bold font-mono uppercase sm:ml-2">[{team.teamTag}]</span>
                                  <span className="block text-[10px] text-slate-400 font-normal">{team.schoolName}</span>
                                </td>
                                <td className="py-2.5 text-center text-emerald-600 font-bold">{team.wins}</td>
                                <td className="py-2.5 text-center text-slate-400 font-bold">{team.losses}</td>
                                <td className="py-2.5 text-center font-black text-indigo-900">{team.points}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: PLAYOFFS BRACKET */}
          {activeTab === "bracket" && (
            <div className="space-y-6">
              {/* Bracket Size Controls */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-800">สายการแข่งขันรอบน็อคเอาท์ (Single Elimination)</h3>
                  <p className="text-xs text-slate-400">ระบบขยายขนาดสายการแข่งขันโดยอัตโนมัติ</p>
                </div>
                <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {([4, 8, 16] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setBracketSize(size)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                        bracketSize === size
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {size} ทีม
                    </button>
                  ))}
                </div>
              </div>

              {/* Responsive Scroll Bracket Container */}
              <div className="overflow-x-auto custom-scrollbar border border-slate-100 rounded-2xl bg-white p-6 shadow-sm min-h-[400px]">
                <div className="min-w-[800px] grid grid-flow-col auto-cols-fr gap-4 h-[420px]">
                  
                  {/* Round columns builder */}
                  {Array.from({ length: Math.log2(bracketSize) }).map((_, rIdx) => {
                    const roundMatches = bracketMatches.filter(m => m.round === rIdx);
                    let roundTitle = "";
                    if (bracketSize === 4) {
                      roundTitle = rIdx === 0 ? "รอบรองชนะเลิศ (Semi)" : "รอบชิงชนะเลิศ (Final)";
                    } else if (bracketSize === 8) {
                      roundTitle = rIdx === 0 ? "รอบก่อนรองชนะเลิศ (Quarter)" : rIdx === 1 ? "รอบรองชนะเลิศ (Semi)" : "รอบชิงชนะเลิศ (Final)";
                    } else {
                      roundTitle = rIdx === 0 ? "รอบ 16 ทีม" : rIdx === 1 ? "รอบก่อนรองฯ (Quarter)" : rIdx === 2 ? "รอบรองฯ (Semi)" : "รอบชิงชนะเลิศ (Final)";
                    }

                    return (
                      <div key={rIdx} className="flex flex-col justify-between h-full py-2">
                        {/* Round Header */}
                        <div className="text-center border-b border-slate-100 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          {roundTitle}
                        </div>

                        {/* Matches inside the round */}
                        <div className="flex flex-col justify-around flex-grow relative mt-4">
                          {roundMatches.map((m) => {
                            const team1 = teams.find(t => t.id === m.team1Id);
                            const team2 = teams.find(t => t.id === m.team2Id);
                            
                            return (
                              <div key={m.id} className="relative py-2 my-auto">
                                {/* Match Card */}
                                <div className="glass-panel border border-slate-200 rounded-xl bg-slate-50/50 overflow-hidden shadow-sm hover:border-slate-300 transition-colors w-[220px] mx-auto text-xs">
                                  
                                  {/* Team 1 Slot */}
                                  <div className={`p-2.5 flex items-center justify-between border-b border-slate-100 ${
                                    m.status === "completed" && m.winnerId === m.team1Id ? "bg-blue-50/30 text-blue-700" : ""
                                  }`}>
                                    <span className="font-bold truncate max-w-[140px]">
                                      {team1 ? team1.teamName : <span className="text-slate-400 font-normal">รอผลผู้ชนะ</span>}
                                    </span>
                                    {team1 && <span className="font-extrabold font-mono text-[11px]">{m.team1Score}</span>}
                                  </div>

                                  {/* Team 2 Slot */}
                                  <div className={`p-2.5 flex items-center justify-between ${
                                    m.status === "completed" && m.winnerId === m.team2Id ? "bg-blue-50/30 text-blue-700" : ""
                                  }`}>
                                    <span className="font-bold truncate max-w-[140px]">
                                      {team2 ? team2.teamName : <span className="text-slate-400 font-normal">รอผลผู้ชนะ</span>}
                                    </span>
                                    {team2 && <span className="font-extrabold font-mono text-[11px]">{m.team2Score}</span>}
                                  </div>

                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LIVE MATCH TRACKER */}
          {activeTab === "tracker" && (
            <div className="grid gap-8 md:grid-cols-3">
              {/* Left Column: Live Status & Teams Info */}
              <div className="md:col-span-2 space-y-6">
                <div className="glass-panel border border-slate-200/80 bg-white rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-600 absolute"></span>
                    <h3 className="font-bold text-slate-800 text-sm ml-2">ข้อมูลแมตช์ที่กำลังปะทะสด (Live Details)</h3>
                  </div>

                  <div className="grid grid-cols-3 items-center text-center py-4 bg-slate-50/60 border border-slate-100 rounded-xl">
                    {/* Blue Side Team */}
                    <div className="space-y-1">
                      <span className="inline-flex items-center justify-center text-[9px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                        {liveMatch.team1Side === "Blue Side" ? "Blue Side" : "Red Side"}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 truncate">
                        {teams.find(t => t.id === liveMatch.team1Id)?.teamName || "ทีมน้ำเงิน"}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-semibold font-mono uppercase">
                        [{teams.find(t => t.id === liveMatch.team1Id)?.teamTag || "BLUE"}]
                      </span>
                    </div>

                    {/* Mid Score */}
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">ผลแมตช์ (BO3)</div>
                      <div className="text-2xl font-black text-indigo-900 font-mono tracking-widest">
                        {liveMatch.gameScores[0]} - {liveMatch.gameScores[1]}
                      </div>
                      <span className="inline-block mt-2.5 text-[9px] font-bold text-rose-600 border border-rose-100 bg-rose-50 px-2 py-0.5 rounded">
                        เกมที่ {liveMatch.currentGameIndex}
                      </span>
                    </div>

                    {/* Red Side Team */}
                    <div className="space-y-1">
                      <span className="inline-flex items-center justify-center text-[9px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200/60">
                        {liveMatch.team2Side === "Blue Side" ? "Blue Side" : "Red Side"}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 truncate">
                        {teams.find(t => t.id === liveMatch.team2Id)?.teamName || "ทีมแดง"}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-semibold font-mono uppercase">
                        [{teams.find(t => t.id === liveMatch.team2Id)?.teamTag || "RED"}]
                      </span>
                    </div>
                  </div>

                  {/* Rosters list */}
                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">รายชื่อผู้เล่น / OpenID</h5>
                      <div className="space-y-1 bg-blue-50/10 p-3 rounded-lg border border-slate-100 text-[10px] text-slate-600">
                        {teams.find(t => t.id === liveMatch.team1Id)?.players.map((p, idx) => {
                          const isObj = typeof p === "object" && p !== null;
                          const name = isObj ? p.name : `ผู้เล่นที่ ${idx + 1}`;
                          const openid = isObj ? p.openid : p;
                          return (
                            <div key={idx} className="flex justify-between items-center py-0.5 border-b border-slate-50 last:border-0 gap-2">
                              <span className="font-bold text-slate-700 truncate">{idx + 1}. {name}</span>
                              <span className="text-[9px] text-slate-400 font-mono flex-shrink-0">{openid} {idx === 5 && "(สำรอง)"}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">รายชื่อผู้เล่น / OpenID</h5>
                      <div className="space-y-1 bg-rose-50/10 p-3 rounded-lg border border-slate-100 text-[10px] text-slate-600">
                        {teams.find(t => t.id === liveMatch.team2Id)?.players.map((p, idx) => {
                          const isObj = typeof p === "object" && p !== null;
                          const name = isObj ? p.name : `ผู้เล่นที่ ${idx + 1}`;
                          const openid = isObj ? p.openid : p;
                          return (
                            <div key={idx} className="flex justify-between items-center py-0.5 border-b border-slate-50 last:border-0 gap-2">
                              <span className="font-bold text-slate-700 truncate">{idx + 1}. {name}</span>
                              <span className="text-[9px] text-slate-400 font-mono flex-shrink-0">{openid} {idx === 5 && "(สำรอง)"}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Timeline Log */}
              <div className="space-y-6">
                <div className="glass-panel border border-slate-200/80 bg-white rounded-2xl p-5 shadow-sm space-y-4 flex flex-col h-[400px]">
                  <div className="flex items-center space-x-2 border-b border-slate-100 pb-2.5">
                    <History className="h-4.5 w-4.5 text-indigo-600" />
                    <h3 className="font-bold text-slate-800 text-sm">บันทึกเหตุการณ์ (Match Timeline)</h3>
                  </div>

                  {/* Scrollable timeline list */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3.5 pr-1">
                    {liveMatch.timeline.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-10 font-medium">ยังไม่มีการบันทึกเหตุการณ์ในขณะนี้</p>
                    ) : (
                      liveMatch.timeline.map((evt) => (
                        <div key={evt.id} className="relative pl-6 pb-0.5 last:pb-0 text-xs">
                          {/* Dot line */}
                          <div className="absolute left-1.5 top-1.5 bottom-0 w-0.5 bg-slate-200 -ml-[1px]" />
                          
                          {/* Event marker dot */}
                          <div className={`absolute left-0 top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                            evt.side === "blue" 
                              ? "bg-blue-600" 
                              : evt.side === "red" 
                              ? "bg-rose-600" 
                              : "bg-slate-400"
                          }`} />

                          {/* Event info */}
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="font-mono text-[10px] text-slate-400 font-bold">[{evt.time}]</span>
                              <span className={`text-[9px] font-extrabold uppercase px-1 rounded ${
                                evt.side === "blue" ? "text-blue-600 bg-blue-50" : evt.side === "red" ? "text-rose-600 bg-rose-50" : "text-slate-500 bg-slate-50"
                              }`}>
                                {evt.type}
                              </span>
                            </div>
                            <p className="text-slate-600 mt-1 text-[11px] leading-relaxed">
                              {evt.description}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Render Certificate Modal */}
      {certificateTeam && (
        <ECertificateModal 
          team={certificateTeam} 
          onClose={() => setCertificateTeam(null)} 
        />
      )}
    </div>
  );
}
