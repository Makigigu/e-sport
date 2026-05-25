"use client";

import React from "react";
import { X, Award, Printer, ShieldCheck } from "lucide-react";
import { Team } from "@/context/AppContext";

interface ECertificateModalProps {
  team: Team;
  onClose: () => void;
}

export const ECertificateModal: React.FC<ECertificateModalProps> = ({ team, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md no-print">
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl rounded-2xl glass-panel overflow-hidden flex flex-col md:max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-900 bg-slate-950/20">
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-cyan-400" />
            <h3 className="font-bold text-white text-base uppercase tracking-wide">ตรวจสอบเกียรติบัตรออนไลน์</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Container for Preview */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 bg-slate-950/10 flex items-center justify-center">
          {/* Printable Certificate Area */}
          <div className="print-container w-full max-w-3xl aspect-[1.414/1] bg-white border-[12px] border-double border-indigo-900/10 p-8 md:p-12 relative flex flex-col justify-between shadow-lg overflow-hidden select-none">
            {/* Watermark Logo Backing */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
              <Award className="w-[400px] h-[400px]" />
            </div>

            {/* Corner Decorative Ornaments */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-indigo-600/30" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-indigo-600/30" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-indigo-600/30" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-indigo-600/30" />

            {/* Header section */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-md shadow-amber-500/10">
                  <Award className="h-8 w-8" />
                </div>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800">เกียรติบัตรการเข้าร่วมแข่งขัน</h2>
              <p className="text-xs uppercase tracking-widest text-indigo-600 font-semibold mt-1">
                E-Sports Tournament Management System
              </p>
            </div>

            {/* Body text */}
            <div className="text-center my-6 md:my-8 space-y-3">
              <p className="text-sm text-slate-500 font-medium">เกียรติบัตรฉบับนี้ให้ไว้เพื่อแสดงว่า</p>
              <h1 className="text-xl md:text-2xl font-bold text-indigo-900">ทีม {team.teamName} ({team.teamTag})</h1>
              <p className="text-sm font-semibold text-slate-700">จาก {team.schoolName}</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                ระดับการแข่งขัน: <span className="font-semibold text-slate-700">{team.level === "ประถม" ? "ประถมศึกษา" : "มัธยมศึกษา"}</span>
              </p>

              {/* Player list */}
              <div className="mt-4 pt-4 border-t border-slate-100 max-w-xl mx-auto">
                <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2">
                  รายชื่อผู้เข้าแข่งขัน
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-[10px] text-slate-600 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {team.players.map((player: any, index) => {
                    const name = typeof player === "object" && player !== null ? player.name : player;
                    return (
                      <div key={index} className="flex items-center space-x-1 justify-center md:justify-start">
                        <ShieldCheck className="h-3 w-3 text-cyan-600 flex-shrink-0" />
                        <span className="truncate">{name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer with signatures / verified metadata */}
            <div className="flex items-end justify-between text-xs pt-4 border-t border-slate-100 mt-2">
              <div className="text-left">
                <p className="font-mono text-[9px] text-slate-400">CERTIFICATE ID: {team.id.toUpperCase()}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">ออกให้ ณ วันที่ 25 พฤษภาคม 2026</p>
              </div>
              <div className="text-right flex flex-col items-center">
                <div className="h-7 w-20 flex items-center justify-center font-serif text-slate-400 italic font-bold select-none border-b border-slate-200">
                  E-Sport Comm
                </div>
                <p className="text-[10px] text-slate-500 font-semibold mt-1">คณะกรรมการจัดการแข่งขัน</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer (Actions) */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-slate-950/40 border-t border-slate-900">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-5 py-2.5 text-xs font-bold bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-xl shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>พิมพ์เกียรติบัตร (Print)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
