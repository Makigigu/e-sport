"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { ECertificateModal } from "@/components/ECertificateModal";
import { useApp, Team } from "@/context/AppContext";
import { 
  Tv, 
  Search, 
  Award, 
  Users, 
  LayoutGrid, 
  Gamepad,
  HelpCircle,
  TrendingUp,
  History,
  Target,
  Crosshair,
  MousePointer2,
  Play,
  Video
} from "lucide-react";

type SubTab = "standings" | "bracket" | "tracker";

const GAME_CATEGORIES = [
  { id: "rov", name: "ROV: Arena of Valor", icon: <Gamepad className="w-4 h-4" />, mockStreams: ["https://www.youtube.com/embed/d3R28hY1Dlo"] },
  { id: "freefire", name: "Free Fire", icon: <Target className="w-4 h-4" />, mockStreams: ["https://www.youtube.com/embed/oK0B5XyKmbA", "https://www.youtube.com/embed/P66Xl3sZ10k"] },
  { id: "pubg", name: "PUBG Mobile", icon: <Crosshair className="w-4 h-4" />, mockStreams: ["https://www.youtube.com/embed/rVqHIfG9lG0"] },
  { id: "valorant", name: "Valorant", icon: <MousePointer2 className="w-4 h-4" />, mockStreams: ["https://www.youtube.com/embed/h7MYJghRWt0"] },
];

export default function GameHubPage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params?.gameId as string;
  const activeCategory = GAME_CATEGORIES.find(c => c.id === gameId) || GAME_CATEGORIES[0];

  const {
    teams,
    groups,
    bracketSize,
    bracketMatches,
    liveMatch,
    liveStreamUrl,
    setBracketSize
  } = useApp();

  // Determine available streams based on activeCategory
  const availableStreams: { name: string, url: string, isLive: boolean }[] = [];
  
  if (activeCategory.id === "rov") {
    // Parse multiple live stream URLs from admin context
    let contextUrls: string[] = [];
    try {
      if (liveStreamUrl && liveStreamUrl.trim().startsWith("[") && liveStreamUrl.trim().endsWith("]")) {
        contextUrls = JSON.parse(liveStreamUrl);
      } else if (liveStreamUrl && liveStreamUrl.trim() !== "") {
        contextUrls = [liveStreamUrl.trim()];
      }
    } catch {
      if (liveStreamUrl && liveStreamUrl.trim() !== "") {
        contextUrls = [liveStreamUrl.trim()];
      }
    }
    contextUrls.forEach((url, i) => availableStreams.push({ name: `🔴 LIVE STREAM #${i + 1}`, url, isLive: true }));
    availableStreams.push({ name: "▶️ VOD: Grand Final (2025)", url: "https://www.youtube.com/embed/d3R28hY1Dlo", isLive: false });
  } else {
    activeCategory.mockStreams.forEach((url, i) => availableStreams.push({ name: `🔴 LIVE STREAM #${i + 1}`, url, isLive: true }));
    availableStreams.push({ name: "▶️ VOD: Highlight Compilation", url: activeCategory.mockStreams[0], isLive: false });
  }

  const [activeVideo, setActiveVideo] = useState<{name: string, url: string, isLive: boolean} | null>(availableStreams[0] || null);

  useEffect(() => {
    setActiveVideo(availableStreams[0] || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId, liveStreamUrl]);

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
    <div className="flex flex-col min-h-screen bg-transparent cyber-grid">
      <Header />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Category Tabs */}
        <div className="flex overflow-x-auto custom-scrollbar pb-2 mb-6 gap-2 border-b border-slate-900">
          {GAME_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => router.push(`/game/${cat.id}`)}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-xl font-bold text-sm whitespace-nowrap transition-all ${
                activeCategory.id === cat.id
                  ? "bg-rose-600/20 text-rose-500 border-b-2 border-rose-500"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Game Title Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-900 pb-6 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs text-rose-500 font-extrabold tracking-wider uppercase mb-1">
              <Gamepad className="h-4 w-4" />
              <span>E-SPORTS LIVE & GAME HUB</span>
            </div>
            <h1 className="text-3xl font-black text-white uppercase">
              {activeCategory.name}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              ศูนย์รวมการถ่ายทอดสด คลิปไฮไลท์ และข้อมูลการแข่งขันของ {activeCategory.name}
            </p>
          </div>
          
          {/* Quick tournament stats */}
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="glass-panel rounded-xl px-4 py-2.5 shadow-md flex items-center space-x-2.5 bg-slate-950/40 border-slate-900">
              <Users className="h-4 w-4 text-rose-500" />
              <div>
                <span className="block text-[10px] text-slate-500 font-bold uppercase">ทีมสมัครทั้งหมด</span>
                <span className="font-bold text-slate-300">{teams.length} ทีม</span>
              </div>
            </div>
            <div className="glass-panel rounded-xl px-4 py-2.5 shadow-md flex items-center space-x-2.5 bg-slate-950/40 border-slate-900">
              <Award className="h-4 w-4 text-red-500" />
              <div>
                <span className="block text-[10px] text-slate-500 font-bold uppercase">เงินรางวัลรวม</span>
                <span className="font-bold text-slate-300">50,000 บาท</span>
              </div>
            </div>
          </div>
        </div>

        {/* TOP: Unified Video/Live Player & Selection */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <Tv className="h-5 w-5 text-rose-500" />
            <h2 className="text-lg font-bold text-slate-200">
              การถ่ายทอดสด & วิดีโอ (Live & VODs)
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Player Container (Takes up 2/3 width) */}
            <div className="lg:col-span-2 glass-panel rounded-2xl border-slate-900 bg-slate-950/40 p-3 shadow-2xl">
              {activeVideo ? (
                <>
                  <div className="flex items-center justify-between px-2 py-1.5 mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${activeVideo.isLive ? "text-rose-500 bg-rose-600/10 border-rose-600/20" : "text-blue-400 bg-blue-600/10 border-blue-600/20"}`}>
                      {activeVideo.name}
                    </span>
                  </div>
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-slate-900 shadow-inner">
                    <iframe
                      src={activeVideo.url}
                      title={`E-Sports Tournament Video: ${activeVideo.name}`}
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center aspect-video rounded-xl bg-slate-900/50 border border-slate-800 border-dashed">
                  <Tv className="h-10 w-10 text-slate-600 mb-3" />
                  <p className="text-sm font-semibold text-slate-400">ยังไม่มีวิดีโอในหมวดหมู่นี้</p>
                </div>
              )}
            </div>

            {/* Video Selection List */}
            <div className="glass-panel rounded-2xl border-slate-900 bg-slate-950/40 p-5 flex flex-col space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
              <h3 className="text-sm font-bold text-slate-300 border-b border-slate-800 pb-2 uppercase tracking-wide">
                เลือกช่องทางการรับชม
              </h3>
              <div className="flex flex-col gap-2">
                {availableStreams.map((stream, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveVideo(stream)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border text-xs font-bold transition-all text-left ${
                      activeVideo?.url === stream.url
                        ? "bg-rose-600/20 border-rose-500 text-rose-400 shadow-lg shadow-rose-900/20"
                        : "bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {stream.isLive ? <Tv className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                      <span>{stream.name}</span>
                    </div>
                    {activeVideo?.url === stream.url && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MIDDLE: Check Team Status & E-Certificate */}
        <section className="space-y-4">
          <div className="glass-panel rounded-2xl border-slate-900 bg-slate-950/40 p-6 shadow-xl">
            <div className="flex items-center space-x-2 mb-3">
              <Award className="h-5 w-5 text-red-500" />
              <h2 className="text-lg font-bold text-slate-200">ตรวจสอบสถานะการสมัคร & ดาวน์โหลดเกียรติบัตร</h2>
            </div>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              สำหรับผู้เข้าแข่งขันและโรงเรียนต้นสังกัด สามารถกรอก OpenID, ชื่อทีม หรือชื่อโรงเรียนของคุณ เพื่อตรวจสอบสถานะการอนุมัติและดาวน์โหลดเกียรติบัตรอิเล็กทรอนิกส์ได้ทันที
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex gap-2.5">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Search className="h-4.5 w-4.5" />
                </div>
                <input
                  type="text"
                  placeholder="ค้นหาด้วย OpenID, ชื่อทีม หรือชื่อโรงเรียนของคุณ..."
                  value={searchOpenId}
                  onChange={(e) => setSearchOpenId(e.target.value)}
                  className="w-full rounded-xl glass-input pl-10 pr-4 py-3 text-xs text-white bg-slate-950/40 border-slate-900/60 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                />
              </div>
              <button
                type="submit"
                className="rounded-md bg-[#ff003c] hover:bg-[#ff3366] text-slate-900 px-6 py-3 text-xs font-bold transition-colors cursor-pointer"
              >
                ตรวจสอบสิทธิ์
              </button>
            </form>

            {/* Search Results Display */}
            {hasSearched && (
              <div className="mt-6 pt-5 border-t border-slate-900/60 animate-in fade-in duration-200">
                {searchedTeam ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-950 border border-slate-900 rounded-xl gap-4">
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                        พบทีมแข่งขันของคุณ
                      </div>
                      <h4 className="font-bold text-white text-sm">
                        ทีม {searchedTeam.teamName} <span className="text-rose-500 font-mono">[{searchedTeam.teamTag}]</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        สังกัด: {searchedTeam.schoolName} ({searchedTeam.level === "ประถม" ? "ประถมศึกษา" : "มัธยมศึกษา"})
                      </p>
                      
                      {/* Status indicator */}
                      <div className="mt-2.5 flex items-center space-x-1.5">
                        <span className="text-[11px] text-slate-500">สถานะใบสมัคร:</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${
                          searchedTeam.status === "Approved"
                            ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/40"
                            : searchedTeam.status === "Pending"
                            ? "bg-amber-950/40 text-amber-400 border-amber-900/40"
                            : searchedTeam.status === "Waitlisted"
                            ? "bg-slate-900 text-slate-400 border-slate-800"
                            : "bg-rose-950/40 text-rose-400 border-rose-900/40"
                        }`}>
                          {searchedTeam.status === "Approved" ? "อนุมัติเข้าร่วมแล้ว" : searchedTeam.status === "Pending" ? "รอตรวจสอบคุณสมบัติ" : searchedTeam.status === "Waitlisted" ? "อยู่ในรายชื่อสำรอง" : "ปฏิเสธใบสมัคร"}
                        </span>
                      </div>
                    </div>

                    {/* Download E-Certificate Action */}
                    {searchedTeam.status === "Approved" ? (
                      <button
                        onClick={() => setCertificateTeam(searchedTeam)}
                        className="flex items-center space-x-2 rounded-md bg-[#ff003c] hover:bg-[#ff3366] text-slate-900 px-5 py-3 text-xs font-bold transition-colors self-start sm:self-center cursor-pointer"
                      >
                        <Award className="h-4 w-4" />
                        <span>ดาวน์โหลดเกียรติบัตร</span>
                      </button>
                    ) : (
                      <div className="flex items-start space-x-2 text-xs text-slate-500 max-w-xs self-start sm:self-center bg-slate-900 border border-slate-800 p-3 rounded-lg">
                        <HelpCircle className="h-4 w-4 text-slate-500 flex-shrink-0 mt-0.5" />
                        <span>ดาวน์โหลดได้เมื่อใบสมัครได้รับการ &apos;อนุมัติเข้าร่วมแล้ว&apos; เท่านั้น</span>
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
          <div className="flex flex-wrap gap-2 border-b border-slate-900 pb-3">
            <button
              onClick={() => setActiveTab("standings")}
              className={`flex items-center space-x-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${
                activeTab === "standings"
                  ? "border-[#ff003c] text-[#ff003c]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span>ตารางคะแนนแบ่งกลุ่ม (Group Standings)</span>
            </button>

            <button
              onClick={() => setActiveTab("bracket")}
              className={`flex items-center space-x-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${
                activeTab === "bracket"
                  ? "border-[#ff003c] text-[#ff003c]"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>สายการแข่งขัน (Playoffs Bracket)</span>
            </button>

            <button
              onClick={() => setActiveTab("tracker")}
              className={`flex items-center space-x-2 px-5 py-3 text-sm font-bold border-b-2 transition-all ${
                activeTab === "tracker"
                  ? "border-[#ff003c] text-[#ff003c]"
                  : "border-transparent text-slate-400 hover:text-white"
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
                  <div key={group.id} className="glass-panel rounded-2xl border-slate-900 bg-slate-950/40 p-5 space-y-4 shadow-md">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-2.5">
                      <span className="font-extrabold text-slate-200 text-sm">{group.name}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">พบกันหมด (Round Robin)</span>
                    </div>

                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse text-xs min-w-[320px]">
                        <thead>
                          <tr className="border-b border-slate-900 text-slate-500 font-bold uppercase">
                            <th className="py-2.5 w-12 text-center">อันดับ</th>
                            <th className="py-2.5">ทีมแข่งขัน</th>
                            <th className="py-2.5 text-center w-12">ชนะ</th>
                            <th className="py-2.5 text-center w-12">แพ้</th>
                            <th className="py-2.5 text-center w-12">คะแนน</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/60 font-semibold text-slate-300">
                          {sortedGroupTeams.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="py-8 text-center text-slate-500 font-medium">
                                ยังไม่มีทีมในกลุ่มนี้
                              </td>
                            </tr>
                          ) : (
                            sortedGroupTeams.map((team, index) => (
                              <tr key={team.id} className="hover:bg-slate-900/30">
                                <td className="py-2.5 text-center font-bold text-slate-400">
                                  {index + 1}
                                </td>
                                <td className="py-2.5">
                                  <span className="font-bold text-white block sm:inline">{team.teamName}</span>
                                  <span className="text-[9px] text-rose-500 font-bold font-mono uppercase sm:ml-2">[{team.teamTag}]</span>
                                  <span className="block text-[10px] text-slate-500 font-normal">{team.schoolName}</span>
                                </td>
                                <td className="py-2.5 text-center text-rose-500 font-bold">{team.wins}</td>
                                <td className="py-2.5 text-center text-slate-500 font-bold">{team.losses}</td>
                                <td className="py-2.5 text-center font-black text-red-500">{team.points}</td>
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
              <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-200">สายการแข่งขันรอบน็อคเอาท์ (Single Elimination)</h3>
                  <p className="text-xs text-slate-500">ระบบขยายขนาดสายการแข่งขันโดยอัตโนมัติ</p>
                </div>
                <div className="flex gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  {([4, 8, 16] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setBracketSize(size)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                        bracketSize === size
                          ? "bg-slate-800 text-rose-500 shadow-sm border border-slate-700/50"
                          : "text-slate-500 hover:text-white"
                      }`}
                    >
                      {size} ทีม
                    </button>
                  ))}
                </div>
              </div>

              {/* Responsive Scroll Bracket Container */}
              <div className="overflow-x-auto custom-scrollbar border border-slate-900 rounded-2xl bg-slate-950/40 p-6 shadow-xl min-h-[400px]">
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
                        <div className="text-center border-b border-slate-900 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
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
                                <div className="glass-panel border border-white/5 rounded-md bg-[#06080c]/80 overflow-hidden shadow-md hover:border-[#ff003c]/50 transition-colors w-[220px] mx-auto text-xs flex flex-col">
                                  
                                  {m.scheduledTime && m.status === "scheduled" && (
                                    <div className="px-2 py-1 bg-slate-900/80 text-[10px] text-center text-amber-400 font-mono border-b border-white/5 uppercase tracking-widest font-bold">
                                      {new Date(m.scheduledTime).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })} น.
                                    </div>
                                  )}

                                  {/* Team 1 Slot */}
                                  <div className={`p-2.5 flex items-center justify-between border-b border-white/5 ${
                                    m.status === "completed" && m.winnerId === m.team1Id ? "bg-[#ff003c]/10 text-[#ff003c] font-extrabold" : "text-slate-300"
                                  }`}>
                                    <span className="font-bold truncate max-w-[140px]">
                                      {team1 ? team1.teamName : <span className="text-slate-600 font-normal">รอผลผู้ชนะ</span>}
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
                <div className="glass-panel border-slate-900 bg-slate-950/40 rounded-2xl p-6 shadow-xl space-y-6">
                  <div className="flex items-center space-x-2 border-b border-slate-900 pb-3">
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-500 absolute"></span>
                    <h3 className="font-bold text-slate-200 text-sm ml-2">ข้อมูลแมตช์ (Match Details)</h3>
                  </div>

                  {liveMatch.scheduledTime && liveMatch.status === "scheduled" && (
                    <div className="text-sm font-bold text-center text-amber-400 bg-amber-950/20 py-2.5 rounded-xl border border-amber-900/50 shadow-inner">
                      ⏱️ เริ่มการแข่งขัน: {new Date(liveMatch.scheduledTime).toLocaleString('th-TH', { dateStyle: 'long', timeStyle: 'short' })} น.
                    </div>
                  )}

                  <div className="grid grid-cols-3 items-center text-center py-4 bg-slate-900/30 border border-slate-900 rounded-xl">
                    {/* Blue Side Team */}
                    <div className="space-y-1">
                      <span className="inline-flex items-center justify-center text-[9px] font-bold uppercase tracking-wider text-rose-500 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-900/40">
                        {liveMatch.team1Side === "Blue Side" ? "Blue Side" : "Red Side"}
                      </span>
                      <h4 className="text-sm font-bold text-white truncate">
                        {teams.find(t => t.id === liveMatch.team1Id)?.teamName || "ทีมน้ำเงิน"}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-semibold font-mono uppercase">
                        [{teams.find(t => t.id === liveMatch.team1Id)?.teamTag || "BLUE"}]
                      </span>
                    </div>

                    {/* Mid Score */}
                    <div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">ผลแมตช์ (BO3)</div>
                      <div className="text-2xl font-black text-rose-500 font-mono tracking-widest">
                        {liveMatch.gameScores[0]} - {liveMatch.gameScores[1]}
                      </div>
                      <span className="inline-block mt-2.5 text-[9px] font-bold text-red-500 border border-purple-900/40 bg-purple-950/40 px-2 py-0.5 rounded">
                        เกมที่ {liveMatch.currentGameIndex}
                      </span>
                    </div>

                    {/* Red Side Team */}
                    <div className="space-y-1">
                      <span className="inline-flex items-center justify-center text-[9px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-900/40">
                        {liveMatch.team2Side === "Blue Side" ? "Blue Side" : "Red Side"}
                      </span>
                      <h4 className="text-sm font-bold text-white truncate">
                        {teams.find(t => t.id === liveMatch.team2Id)?.teamName || "ทีมแดง"}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-semibold font-mono uppercase">
                        [{teams.find(t => t.id === liveMatch.team2Id)?.teamTag || "RED"}]
                      </span>
                    </div>
                  </div>

                  {/* Rosters list */}
                  <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-900/80">
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">รายชื่อผู้เล่น / OpenID</h5>
                      <div className="space-y-1 bg-rose-950/10 p-3 rounded-lg border border-slate-900 text-[10px] text-slate-400">
                        {teams.find(t => t.id === liveMatch.team1Id)?.players.map((p, idx) => {
                          const isObj = typeof p === "object" && p !== null;
                          const name = isObj ? p.name : `ผู้เล่นที่ ${idx + 1}`;
                          const openid = isObj ? p.openid : p;
                          return (
                            <div key={idx} className="flex justify-between items-center py-0.5 border-b border-slate-900/40 last:border-0 gap-2">
                              <span className="font-bold text-slate-300 truncate">{idx + 1}. {name}</span>
                              <span className="text-[9px] text-slate-500 font-mono flex-shrink-0">{openid} {idx === 5 && "(สำรอง)"}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">รายชื่อผู้เล่น / OpenID</h5>
                      <div className="space-y-1 bg-rose-950/10 p-3 rounded-lg border border-slate-900 text-[10px] text-slate-400">
                        {teams.find(t => t.id === liveMatch.team2Id)?.players.map((p, idx) => {
                          const isObj = typeof p === "object" && p !== null;
                          const name = isObj ? p.name : `ผู้เล่นที่ ${idx + 1}`;
                          const openid = isObj ? p.openid : p;
                          return (
                            <div key={idx} className="flex justify-between items-center py-0.5 border-b border-slate-900/40 last:border-0 gap-2">
                              <span className="font-bold text-slate-300 truncate">{idx + 1}. {name}</span>
                              <span className="text-[9px] text-slate-500 font-mono flex-shrink-0">{openid} {idx === 5 && "(สำรอง)"}</span>
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
                <div className="glass-panel border border-slate-900 bg-slate-950/40 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col h-[400px]">
                  <div className="flex items-center space-x-2 border-b border-slate-900 pb-2.5">
                    <History className="h-4.5 w-4.5 text-red-500" />
                    <h3 className="font-bold text-slate-200 text-sm">บันทึกเหตุการณ์ (Match Timeline)</h3>
                  </div>

                  {/* Scrollable timeline list */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3.5 pr-1">
                    {liveMatch.timeline.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-10 font-medium">ยังไม่มีการบันทึกเหตุการณ์ในขณะนี้</p>
                    ) : (
                      liveMatch.timeline.map((evt) => (
                        <div key={evt.id} className="relative pl-6 pb-0.5 last:pb-0 text-xs">
                          {/* Dot line */}
                          <div className="absolute left-1.5 top-1.5 bottom-0 w-0.5 bg-slate-800 -ml-[1px]" />
                          
                          {/* Event marker dot */}
                          <div className={`absolute left-0 top-1 w-3 h-3 rounded-full border-2 border-slate-950 shadow-sm ${
                            evt.side === "blue" 
                              ? "bg-rose-500" 
                              : evt.side === "red" 
                              ? "bg-rose-500" 
                              : "bg-slate-600"
                          }`} />

                          {/* Event info */}
                          <div>
                            <div className="flex items-center space-x-1.5">
                              <span className="font-mono text-[10px] text-slate-500 font-bold">[{evt.time}]</span>
                              <span className={`text-[9px] font-extrabold uppercase px-1 rounded border ${
                                evt.side === "blue" 
                                  ? "text-rose-500 bg-rose-950/40 border-rose-900/40" 
                                  : evt.side === "red" 
                                  ? "text-rose-400 bg-rose-950/40 border-rose-900/40" 
                                  : "text-slate-400 bg-slate-900 border-slate-800"
                              }`}>
                                {evt.type}
                              </span>
                            </div>
                            <p className="text-slate-400 mt-1 text-[11px] leading-relaxed font-semibold">
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
