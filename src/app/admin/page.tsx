"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { useApp, Team, Group, Match } from "@/context/AppContext";
import { 
  Users, 
  CheckCircle, 
  FolderPlus, 
  Tv, 
  Gamepad2, 
  Plus, 
  Trash2, 
  Play, 
  PlusCircle, 
  X,
  UserCheck,
  UserX,
  UserCheck2,
  ListOrdered
} from "lucide-react";

type ActiveTab = "approvals" | "groups" | "matches";

export default function AdminDashboard() {
  const {
    teams,
    groups,
    bracketMatches,
    liveMatch,
    liveStreamUrl,
    updateTeamStatus,
    updateTeamStats,
    createGroup,
    deleteGroup,
    assignTeamToGroup,
    updateLiveStream,
    updateBracketMatch,
    updateLiveMatchMeta,
    updateLiveMatchScore,
    addTimelineEvent,
    clearTimeline
  } = useApp();

  const [activeTab, setActiveTab] = useState<ActiveTab>("approvals");
  const [approvalFilter, setApprovalFilter] = useState<Team["status"] | "All">("All");

  // Local state for dynamic group input
  const [newGroupName, setNewGroupName] = useState("");
  const [isSubmittingGroup, setIsSubmittingGroup] = useState(false);

  // Local state for live stream URL input
  const [streamInputUrl, setStreamInputUrl] = useState(liveStreamUrl);

  // Modals / Controllers states
  const [showMatchSetupModal, setShowMatchSetupModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  // States for Live Match Setup form
  const [matchTeam1Id, setMatchTeam1Id] = useState(liveMatch.team1Id);
  const [matchTeam2Id, setMatchTeam2Id] = useState(liveMatch.team2Id);
  const [matchTeam1Side, setMatchTeam1Side] = useState<"Blue Side" | "Red Side">(liveMatch.team1Side);
  const [matchTeam2Side, setMatchTeam2Side] = useState<"Blue Side" | "Red Side">(liveMatch.team2Side);
  const [matchStatus, setMatchStatus] = useState<"scheduled" | "live" | "completed">(liveMatch.status);
  const [t1Score, setT1Score] = useState(liveMatch.gameScores[0] || 0);
  const [t2Score, setT2Score] = useState(liveMatch.gameScores[1] || 0);

  // States for adding timeline events
  const [eventTime, setEventTime] = useState("");
  const [eventType, setEventType] = useState("First Blood");
  const [eventDesc, setEventDesc] = useState("");
  const [eventSide, setEventSide] = useState<"blue" | "red" | "neutral">("neutral");

  // Filtering Teams for approvals
  const filteredTeamsForApprovals = teams.filter(t => 
    approvalFilter === "All" ? true : t.status === approvalFilter
  );

  const approvedTeams = teams.filter(t => t.status === "Approved");

  // Handler for creating a group
  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    const groupName = newGroupName.trim();
    if (!groupName) {
      alert("กรุณากรอกชื่อกลุ่มก่อนกดเพิ่มกลุ่ม");
      return;
    }
    
    setIsSubmittingGroup(true);
    try {
      const res = await createGroup(groupName);
      if (res && !res.success) {
        alert(`ไม่สามารถเพิ่มกลุ่มได้: ${res.error || "เกิดข้อผิดพลาดไม่ทราบสาเหตุ"}`);
      } else {
        setNewGroupName("");
      }
    } catch (err: any) {
      alert(`เกิดข้อผิดพลาด: ${err.message}`);
    } finally {
      setIsSubmittingGroup(false);
    }
  };

  // Handler for updating Live Stream URL
  const handleUpdateStream = (e: React.FormEvent) => {
    e.preventDefault();
    updateLiveStream(streamInputUrl.trim());
    alert("อัปเดตลิงก์สตรีมสดเรียบร้อยแล้ว!");
  };

  // Save Live Match configuration
  const handleSaveLiveMatchMeta = () => {
    if (matchTeam1Id === matchTeam2Id) {
      alert("กรุณาเลือกทีมปะทะที่แตกต่างกัน");
      return;
    }
    updateLiveMatchMeta(matchTeam1Id, matchTeam2Id, matchTeam1Side, matchTeam2Side, matchStatus);
    updateLiveMatchScore(t1Score, t2Score);
    setShowMatchSetupModal(false);
  };

  // Add event to timeline
  const handleAddEvent = () => {
    if (!eventTime.trim() || !eventDesc.trim()) {
      alert("กรุณากรอกข้อมูลเหตุการณ์ให้ครบถ้วน");
      return;
    }
    // current game index from score sum + 1
    const gameIdx = t1Score + t2Score + 1;
    addTimelineEvent(gameIdx, eventTime.trim(), eventType, eventDesc.trim(), eventSide);
    setEventTime("");
    setEventDesc("");
    setShowAddEventModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <div className="flex-1 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
        
        {/* Sleek Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="glass-panel rounded-2xl border border-slate-200/80 bg-white p-4 space-y-1 shadow-sm sticky top-24">
            <div className="px-3 py-2 border-b border-slate-100 mb-3">
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                เมนูผู้ดูแลระบบ
              </span>
            </div>
            
            <button
              onClick={() => setActiveTab("approvals")}
              className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                activeTab === "approvals"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/15"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Users className="h-4.5 w-4.5" />
              <span>อนุมัติทีมสมัคร ({teams.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("groups")}
              className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                activeTab === "groups"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/15"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <FolderPlus className="h-4.5 w-4.5" />
              <span>แบ่งกลุ่มแข่งขัน ({groups.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("matches")}
              className={`flex w-full items-center space-x-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                activeTab === "matches"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/15"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Gamepad2 className="h-4.5 w-4.5" />
              <span>ควบคุมการแข่งขัน & สตรีม</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          
          {/* TAB 1: TEAM APPROVALS */}
          {activeTab === "approvals" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">ตรวจสอบและอนุมัติทีมสมัคร</h1>
                  <p className="mt-1 text-sm text-slate-500">ตรวจสอบสถานะคัดกรองใบสมัครเข้าร่วมแข่งขันทัวร์นาเมนต์</p>
                </div>
                
                {/* Filter Badges */}
                <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl self-start">
                  {(["All", "Pending", "Approved", "Waitlisted", "Rejected"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setApprovalFilter(filter)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        approvalFilter === filter
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {filter === "All" ? "ทั้งหมด" : filter === "Pending" ? "รอตรวจสอบ" : filter === "Approved" ? "อนุมัติแล้ว" : filter === "Waitlisted" ? "สำรอง" : "ปฏิเสธ"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table Card */}
              <div className="glass-panel rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm">
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50/75 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <th className="px-6 py-4">ข้อมูลทีม</th>
                        <th className="px-6 py-4">โรงเรียน/ระดับชั้น</th>
                        <th className="px-6 py-4">รายชื่อผู้เล่น / OpenID</th>
                        <th className="px-6 py-4 text-center">สถานะ</th>
                        <th className="px-6 py-4 text-right">ดำเนินการ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredTeamsForApprovals.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">
                            ไม่มีรายชื่อทีมแข่งขันในสถานะนี้
                          </td>
                        </tr>
                      ) : (
                        filteredTeamsForApprovals.map((team) => (
                          <tr key={team.id} className="hover:bg-slate-50/40 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-bold text-slate-900">{team.teamName}</div>
                              <div className="text-[10px] font-bold text-blue-600 font-mono tracking-wider">TAG: {team.teamTag}</div>
                              {team.managerName && <div className="text-xs text-slate-400 mt-0.5">คุมทีม: {team.managerName}</div>}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-slate-800 font-medium">{team.schoolName}</div>
                              <div className="text-xs text-slate-400">ระดับชั้น: {team.level === "ประถม" ? "ประถมศึกษา" : "มัธยมศึกษา"}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[10px] text-slate-600">
                                {team.players.map((player: any, index) => {
                                  const isObj = typeof player === "object" && player !== null;
                                  const name = isObj ? player.name : `ผู้เล่นที่ ${index + 1}`;
                                  const openid = isObj ? player.openid : player;
                                  return (
                                    <div key={index} className="truncate max-w-[150px]">
                                      <span className="font-bold text-slate-700 block truncate">{name}</span>
                                      <span className="text-[9px] font-mono text-slate-400 block truncate">{openid}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold border ${
                                team.status === "Approved"
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                  : team.status === "Pending"
                                  ? "bg-amber-50 text-amber-600 border-amber-100"
                                  : team.status === "Waitlisted"
                                  ? "bg-blue-50 text-blue-600 border-blue-100"
                                  : "bg-rose-50 text-rose-600 border-rose-100"
                              }`}>
                                {team.status === "Approved" ? "อนุมัติแล้ว" : team.status === "Pending" ? "รอตรวจสอบ" : team.status === "Waitlisted" ? "สำรอง" : "ปฏิเสธ"}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                              {team.status !== "Approved" && (
                                <button
                                  onClick={() => updateTeamStatus(team.id, "Approved")}
                                  title="อนุมัติทีม"
                                  className="inline-flex items-center justify-center p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200/50 transition-colors"
                                >
                                  <UserCheck2 className="h-4 w-4" />
                                </button>
                              )}
                              {team.status !== "Waitlisted" && (
                                <button
                                  onClick={() => updateTeamStatus(team.id, "Waitlisted")}
                                  title="ย้ายไปทีมสำรอง"
                                  className="inline-flex items-center justify-center p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200/50 transition-colors"
                                >
                                  <UserCheck className="h-4 w-4" />
                                </button>
                              )}
                              {team.status !== "Rejected" && (
                                <button
                                  onClick={() => updateTeamStatus(team.id, "Rejected")}
                                  title="ปฏิเสธคำขอ"
                                  className="inline-flex items-center justify-center p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200/50 transition-colors"
                                >
                                  <UserX className="h-4 w-4" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DYNAMIC GROUP ASSIGNMENT */}
          {activeTab === "groups" && (
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">จัดการกลุ่มและแบ่งทีมแข่งขัน</h1>
                  <p className="mt-1 text-sm text-slate-500">สร้างกลุ่มแข่งขันแบบจัดคู่พบกันหมด (Round Robin) และมอบหมายทีม</p>
                </div>

                {/* Create Group Form */}
                <form onSubmit={handleCreateGroup} className="flex gap-2 self-start w-full sm:w-auto">
                  <input
                    type="text"
                    required
                    value={newGroupName}
                    disabled={isSubmittingGroup}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="ชื่อกลุ่ม เช่น กลุ่ม C"
                    className="rounded-xl glass-input px-3.5 py-2.5 text-xs text-slate-800 bg-white disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingGroup}
                    className="flex items-center space-x-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed shadow-md shadow-blue-500/10 transition-colors whitespace-nowrap"
                  >
                    {isSubmittingGroup ? (
                      <span>กำลังเพิ่ม...</span>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        <span>เพิ่มกลุ่ม</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Grid of Groups */}
              <div className="grid gap-6 md:grid-cols-2">
                {groups.map((group) => (
                  <div key={group.id} className="glass-panel rounded-2xl border border-slate-200/80 bg-white p-5 space-y-4 shadow-sm flex flex-col justify-between">
                    <div>
                      {/* Group Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                        <span className="font-bold text-slate-900">{group.name}</span>
                        <div className="flex items-center space-x-3">
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold">
                            {group.teamIds.length} ทีม
                          </span>
                          <button
                            onClick={() => deleteGroup(group.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Group Teams List */}
                      <ul className="divide-y divide-slate-100 mt-2 min-h-[120px]">
                        {group.teamIds.length === 0 ? (
                          <p className="text-xs text-slate-400 text-center py-8 font-medium">ยังไม่มีการเพิ่มทีมแข่งขันในกลุ่มนี้</p>
                        ) : (
                          group.teamIds.map((teamId) => {
                            const team = teams.find((t) => t.id === teamId);
                            if (!team) return null;
                            return (
                              <li key={teamId} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-b border-slate-50 last:border-0">
                                <div>
                                  <span className="font-bold text-slate-800">{team.teamName}</span>
                                  <span className="text-[10px] text-slate-400 font-semibold font-mono uppercase ml-2">[{team.teamTag}]</span>
                                </div>
                                <div className="flex items-center space-x-2 self-end sm:self-auto">
                                  {/* Stats Editors */}
                                  <div className="flex items-center space-x-1.5 text-[10px] text-slate-500">
                                    <span>ชนะ:</span>
                                    <input
                                      type="number"
                                      min="0"
                                      defaultValue={team.wins}
                                      onBlur={async (e) => {
                                        const wins = parseInt(e.target.value) || 0;
                                        await updateTeamStats(team.id, wins, team.losses, team.points);
                                      }}
                                      className="w-9 rounded border border-slate-200 text-center py-0.5 font-mono text-slate-700 bg-white"
                                    />
                                    <span>แพ้:</span>
                                    <input
                                      type="number"
                                      min="0"
                                      defaultValue={team.losses}
                                      onBlur={async (e) => {
                                        const losses = parseInt(e.target.value) || 0;
                                        await updateTeamStats(team.id, team.wins, losses, team.points);
                                      }}
                                      className="w-9 rounded border border-slate-200 text-center py-0.5 font-mono text-slate-700 bg-white"
                                    />
                                    <span>คะแนน:</span>
                                    <input
                                      type="number"
                                      min="0"
                                      defaultValue={team.points}
                                      onBlur={async (e) => {
                                        const pts = parseInt(e.target.value) || 0;
                                        await updateTeamStats(team.id, team.wins, team.losses, pts);
                                      }}
                                      className="w-11 rounded border border-slate-200 text-center py-0.5 font-mono text-slate-700 bg-white"
                                    />
                                  </div>
                                  <button
                                    onClick={() => assignTeamToGroup(teamId, undefined)}
                                    className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
                                    title="ถอนทีมออกจากกลุ่ม"
                                  >
                                    <X className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </li>
                            );
                          })
                        )}
                      </ul>
                    </div>

                    {/* Add Approved Team Dropdown to Group */}
                    <div className="border-t border-slate-100 pt-3">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        มอบหมายทีมเข้า {group.name}
                      </label>
                      <select
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val) assignTeamToGroup(val, group.id);
                          e.target.value = ""; // Reset selector
                        }}
                        defaultValue=""
                        className="w-full rounded-xl glass-input px-3 py-2 text-xs bg-white cursor-pointer"
                      >
                        <option value="" disabled>-- เลือกทีมแข่งขันอนุมัติแล้ว --</option>
                        {approvedTeams
                          .filter((t) => t.groupId !== group.id)
                          .map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.teamName} [{t.teamTag}] {t.groupId ? `(ย้ายจาก ${groups.find(g => g.id === t.groupId)?.name})` : ""}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MATCH CONTROLLER & STREAM SETUP */}
          {activeTab === "matches" && (
            <div className="space-y-8">
              
              {/* SECTION A: STREAM SETUP */}
              <div className="glass-panel rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                  <Tv className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-bold text-slate-800">ตั้งค่าสตรีมลิงก์ไลฟ์สด (Live Stream URL)</h2>
                </div>
                <form onSubmit={handleUpdateStream} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={streamInputUrl}
                    onChange={(e) => setStreamInputUrl(e.target.value)}
                    placeholder="URL วิดีโอ Embed (เช่น https://www.youtube.com/embed/...)"
                    className="flex-1 rounded-xl glass-input px-4 py-3 text-xs text-slate-800"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-6 py-3 text-xs font-bold text-white hover:bg-blue-700 shadow-md shadow-blue-500/10 transition-colors"
                  >
                    อัปเดตสตรีม
                  </button>
                </form>
              </div>

              {/* SECTION B: LIVE MATCH TRACKER CONTROLLER */}
              <div className="glass-panel rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2">
                    <Play className="h-5 w-5 text-blue-600 fill-blue-600" />
                    <h2 className="text-lg font-bold text-slate-800">ผู้ควบคุมไลฟ์แมตช์ (Live Match Controller)</h2>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowMatchSetupModal(true)}
                      className="flex items-center space-x-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition-colors"
                    >
                      <span>ตั้งค่าทีม & ฝ่ายแข่งขัน</span>
                    </button>
                    <button
                      onClick={() => setShowAddEventModal(true)}
                      className="flex items-center space-x-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-bold transition-all shadow-md shadow-blue-500/10"
                    >
                      <PlusCircle className="h-4.5 w-4.5" />
                      <span>เพิ่มเหตุการณ์สด</span>
                    </button>
                  </div>
                </div>

                {/* Active Match Widget Preview */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 md:p-6 grid grid-cols-3 items-center text-center">
                  <div>
                    <h4 className="text-xs text-slate-400 font-bold uppercase mb-1">
                      {liveMatch.team1Side === "Blue Side" ? "BLUE SIDE 🟦" : "RED SIDE 🟥"}
                    </h4>
                    <span className="text-sm font-bold text-slate-900">
                      {teams.find(t => t.id === liveMatch.team1Id)?.teamName || "ทีมน้ำเงิน"}
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-extrabold tracking-wider uppercase mb-1">
                      คะแนนแมตช์ (BO3)
                    </div>
                    <span className="text-2xl font-black text-indigo-900 tracking-wider">
                      {liveMatch.gameScores[0]} - {liveMatch.gameScores[1]}
                    </span>
                    <div className="text-[9px] font-bold text-blue-600 mt-1 uppercase">
                      สถานะ: {liveMatch.status === "live" ? "กำลังแข่ง" : liveMatch.status === "completed" ? "จบแมตช์" : "รอแข่ง"}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-400 font-bold uppercase mb-1">
                      {liveMatch.team2Side === "Blue Side" ? "BLUE SIDE 🟦" : "RED SIDE 🟥"}
                    </h4>
                    <span className="text-sm font-bold text-slate-900">
                      {teams.find(t => t.id === liveMatch.team2Id)?.teamName || "ทีมแดง"}
                    </span>
                  </div>
                </div>

                {/* Timeline Events list inside Admin */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500">ประวัติเหตุการณ์ไทม์ไลน์ ({liveMatch.timeline.length})</span>
                    <button
                      onClick={() => {
                        if (confirm("คุณแน่ใจว่าต้องการล้างไทม์ไลน์ทั้งหมดหรือไม่?")) clearTimeline();
                      }}
                      className="text-rose-600 hover:underline font-bold"
                    >
                      ล้างทั้งหมด
                    </button>
                  </div>

                  <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 max-h-48 overflow-y-auto bg-white custom-scrollbar">
                    {liveMatch.timeline.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-6">ยังไม่มีการบันทึกเหตุการณ์ในเกมนี้</p>
                    ) : (
                      liveMatch.timeline.map((evt) => (
                        <div key={evt.id} className="p-3 text-xs flex justify-between items-start hover:bg-slate-50/50">
                          <div>
                            <span className="font-mono text-blue-600 font-bold mr-2">[{evt.time}]</span>
                            <span className="font-bold text-slate-800 mr-2 bg-slate-100 px-1.5 py-0.5 rounded">{evt.type}</span>
                            <span className="text-slate-600">{evt.description}</span>
                          </div>
                          <span className={`text-[10px] font-bold uppercase px-1 rounded ${
                            evt.side === "blue" ? "text-blue-600 bg-blue-50" : evt.side === "red" ? "text-rose-600 bg-rose-50" : "text-slate-500 bg-slate-50"
                          }`}>
                            Game {evt.gameIndex}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION C: PLAYOFF BRACKET CONTROLLER */}
              <div className="glass-panel rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                  <ListOrdered className="h-5 w-5 text-indigo-600" />
                  <h2 className="text-lg font-bold text-slate-800">จัดการคะแนนสายการแข่งขัน (Playoffs Bracket Manager)</h2>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider">
                        <th className="px-4 py-3">แมตช์ ID</th>
                        <th className="px-4 py-3">รอบการแข่งขัน</th>
                        <th className="px-4 py-3">ทีม 1 (คะแนน)</th>
                        <th className="px-4 py-3">ทีม 2 (คะแนน)</th>
                        <th className="px-4 py-3">สถานะ</th>
                        <th className="px-4 py-3 text-right">บันทึก</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bracketMatches.map((m) => {
                        const t1 = teams.find(t => t.id === m.team1Id);
                        const t2 = teams.find(t => t.id === m.team2Id);
                        return (
                          <tr key={m.id} className="hover:bg-slate-50/20">
                            <td className="px-4 py-3 font-mono font-bold text-slate-500">{m.id.toUpperCase()}</td>
                            <td className="px-4 py-3 font-medium text-slate-700">
                              {m.round === 0 ? "รอบแรก (Quarter)" : m.round === 1 ? "รอบรองชนะเลิศ (Semi)" : "รอบชิงชนะเลิศ (Final)"}
                            </td>
                            <td className="px-4 py-3 font-bold">
                              {t1 ? `${t1.teamName} [${t1.teamTag}]` : <span className="text-slate-400 font-normal">รอผลผู้ชนะ</span>}
                            </td>
                            <td className="px-4 py-3 font-bold">
                              {t2 ? `${t2.teamName} [${t2.teamTag}]` : <span className="text-slate-400 font-normal">รอผลผู้ชนะ</span>}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold border ${
                                m.status === "completed" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                              }`}>
                                {m.status === "completed" ? "จบเกมแล้ว" : "รอแข่งขัน"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              {t1 && t2 ? (
                                <button
                                  onClick={() => {
                                    const sc1 = prompt(`คะแนนสำหรับ ${t1.teamName}:`, m.team1Score?.toString() || "0");
                                    const sc2 = prompt(`คะแนนสำหรับ ${t2.teamName}:`, m.team2Score?.toString() || "0");
                                    if (sc1 !== null && sc2 !== null) {
                                      const n1 = parseInt(sc1) || 0;
                                      const n2 = parseInt(sc2) || 0;
                                      if (n1 === n2) {
                                        alert("ไม่สามารถเสมอในการแข่งอีสปอร์ตได้");
                                        return;
                                      }
                                      updateBracketMatch(m.id, n1, n2, "completed");
                                    }
                                  }}
                                  className="px-2.5 py-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200/50 font-semibold"
                                >
                                  แก้ไขผล
                                </button>
                              ) : (
                                <button disabled className="px-2.5 py-1.5 rounded bg-slate-100 text-slate-400 cursor-not-allowed font-semibold">
                                  ไม่มีทีม
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL 1: LIVE MATCH META SETUP */}
      {showMatchSetupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl space-y-6 p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800">ตั้งค่ารายละเอียดฝ่าย & การปะทะ</h3>
              <button onClick={() => setShowMatchSetupModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Team 1 Selector */}
              <div>
                <label className="block font-bold text-slate-500 mb-1.5">ทีมที่ 1</label>
                <select
                  value={matchTeam1Id}
                  onChange={(e) => setMatchTeam1Id(e.target.value)}
                  className="w-full rounded-xl glass-input px-3 py-2 bg-white"
                >
                  {approvedTeams.map(t => (
                    <option key={t.id} value={t.id}>{t.teamName} [{t.teamTag}]</option>
                  ))}
                </select>
              </div>

              {/* Team 1 Side Selector */}
              <div>
                <label className="block font-bold text-slate-500 mb-1.5">ฝ่ายของทีมที่ 1</label>
                <select
                  value={matchTeam1Side}
                  onChange={(e) => {
                    const side = e.target.value as "Blue Side" | "Red Side";
                    setMatchTeam1Side(side);
                    setMatchTeam2Side(side === "Blue Side" ? "Red Side" : "Blue Side");
                  }}
                  className="w-full rounded-xl glass-input px-3 py-2 bg-white"
                >
                  <option value="Blue Side">Blue Side 🟦</option>
                  <option value="Red Side">Red Side 🟥</option>
                </select>
              </div>

              {/* Team 2 Selector */}
              <div>
                <label className="block font-bold text-slate-500 mb-1.5">ทีมที่ 2</label>
                <select
                  value={matchTeam2Id}
                  onChange={(e) => setMatchTeam2Id(e.target.value)}
                  className="w-full rounded-xl glass-input px-3 py-2 bg-white"
                >
                  {approvedTeams.map(t => (
                    <option key={t.id} value={t.id}>{t.teamName} [{t.teamTag}]</option>
                  ))}
                </select>
              </div>

              {/* Team 2 Side Selector (auto read-only based on side 1) */}
              <div>
                <label className="block font-bold text-slate-500 mb-1.5 font-mono">ฝ่ายของทีมที่ 2</label>
                <input
                  type="text"
                  readOnly
                  value={matchTeam2Side}
                  className="w-full rounded-xl glass-input px-3 py-2 bg-slate-100 text-slate-500"
                />
              </div>

              {/* Game Scores */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-500 mb-1.5">คะแนนทีมที่ 1</label>
                  <input
                    type="number"
                    min="0"
                    max="2"
                    value={t1Score}
                    onChange={(e) => setT1Score(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl glass-input px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1.5">คะแนนทีมที่ 2</label>
                  <input
                    type="number"
                    min="0"
                    max="2"
                    value={t2Score}
                    onChange={(e) => setT2Score(parseInt(e.target.value) || 0)}
                    className="w-full rounded-xl glass-input px-3 py-2"
                  />
                </div>
              </div>

              {/* Match status */}
              <div>
                <label className="block font-bold text-slate-500 mb-1.5">สถานะรวม</label>
                <select
                  value={matchStatus}
                  onChange={(e) => setMatchStatus(e.target.value as any)}
                  className="w-full rounded-xl glass-input px-3 py-2 bg-white"
                >
                  <option value="scheduled">รอลงแข่ง (Scheduled)</option>
                  <option value="live">กำลังปะทะสด (Live)</option>
                  <option value="completed">จบสิ้นกระบวนความ (Completed)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 border-t border-slate-100 pt-3 text-xs">
              <button
                onClick={() => setShowMatchSetupModal(false)}
                className="px-4 py-2 font-bold text-slate-500 hover:text-slate-800"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleSaveLiveMatchMeta}
                className="px-4 py-2 font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                บันทึกการตั้งค่า
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD TIMELINE EVENT */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl space-y-6 p-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800">เพิ่มเหตุการณ์ในไทม์ไลน์สด</h3>
              <button onClick={() => setShowAddEventModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Event Time */}
              <div>
                <label className="block font-bold text-slate-500 mb-1.5">เวลาเหตุการณ์ (นาทีในเกม เช่น 05:30)</label>
                <input
                  type="text"
                  placeholder="เช่น 12:45"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full rounded-xl glass-input px-3 py-2"
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="block font-bold text-slate-500 mb-1.5">ประเภทเหตุการณ์</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full rounded-xl glass-input px-3 py-2 bg-white"
                >
                  <option value="First Blood">First Blood (เฟิรสบลัด)</option>
                  <option value="Abyssal Dragon">Abyssal Dragon (สังหารมังกร)</option>
                  <option value="Dark Slayer">Dark Slayer (สังหารดาร์กสเลเยอร์)</option>
                  <option value="Tower Take Down">Tower Take Down (ทำลายป้อม)</option>
                  <option value="Ace">Ace (กวาดล้างทั้งทีม)</option>
                  <option value="Victory">Victory (ชนะในเกม)</option>
                  <option value="Informational">ประกาศ / อื่นๆ</option>
                </select>
              </div>

              {/* Side Choice */}
              <div>
                <label className="block font-bold text-slate-500 mb-1.5">ฝ่ายที่ทำได้</label>
                <select
                  value={eventSide}
                  onChange={(e) => setEventSide(e.target.value as any)}
                  className="w-full rounded-xl glass-input px-3 py-2 bg-white"
                >
                  <option value="neutral">Neutral (เป็นกลาง / ประกาศหลัก)</option>
                  <option value="blue">Blue Side (ฝ่ายน้ำเงิน)</option>
                  <option value="red">Red Side (ฝ่ายแดง)</option>
                </select>
              </div>

              {/* Event Description */}
              <div>
                <label className="block font-bold text-slate-500 mb-1.5">คำอธิบายรายละเอียด (ภาษาไทย)</label>
                <textarea
                  rows={3}
                  placeholder="รายละเอียด เช่น ทีม BAC สังหาร Abyssal Dragon ได้สำเร็จเพื่อดึงเงินขึ้นนำ..."
                  value={eventDesc}
                  onChange={(e) => setEventDesc(e.target.value)}
                  className="w-full rounded-xl glass-input px-3 py-2"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 border-t border-slate-100 pt-3 text-xs">
              <button
                onClick={() => setShowAddEventModal(false)}
                className="px-4 py-2 font-bold text-slate-500 hover:text-slate-800"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                เพิ่มเข้าไทม์ไลน์
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
