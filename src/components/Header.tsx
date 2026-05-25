"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Gamepad2, UserPlus, ShieldAlert } from "lucide-react";

export const Header: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "หน้าแรก",
      href: "/",
      icon: Gamepad2,
    },
    {
      name: "ศูนย์รวมการแข่งขัน ROV",
      href: "/game/rov",
      icon: Trophy,
    },
    {
      name: "สมัครเข้าร่วมแข่งขัน",
      href: "/register",
      icon: UserPlus,
    },
    {
      name: "ผู้ดูแลระบบ",
      href: "/admin",
      icon: ShieldAlert,
    },
  ];

  return (
    <header className="sticky top-0 z-45 w-full border-b border-slate-900/80 bg-slate-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and System Name */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-cyan-500/10 group-hover:scale-105 transition-transform duration-200">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              E-Sports Tournament
            </span>
            <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">
              Management System
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm"
                    : "text-slate-400 hover:bg-slate-900/50 hover:text-white border border-transparent"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile quick-action / Indicator */}
        <div className="flex items-center space-x-2 md:hidden">
          <Link
            href="/register"
            className="flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 px-3 py-1.5 text-xs font-bold text-white hover:from-cyan-400 hover:to-purple-400 shadow-md shadow-cyan-500/10 hover:scale-[1.02] transition-all"
          >
            สมัครด่วน
          </Link>
        </div>
      </div>

      {/* Decorative neon bottom line */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500" />
    </header>
  );
};
