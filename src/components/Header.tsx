"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Gamepad2 } from "lucide-react";

export const Header: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "หน้าแรก",
      href: "/",
      icon: Gamepad2,
    }
  ];

  return (
    <header className="sticky top-0 z-45 w-full border-b border-slate-900/80 bg-slate-950/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and System Name */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative flex h-10 w-10 overflow-hidden items-center justify-center rounded-xl border border-rose-500/20 bg-slate-950/80 shadow-lg shadow-rose-600/20 group-hover:scale-105 transition-transform duration-200">
            <Image src="/es-logo.jpg" alt="ES Logo" width={40} height={40} className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-rose-500 transition-colors">
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
                    ? "bg-rose-600/10 text-rose-500 border border-rose-600/20 shadow-sm"
                    : "text-slate-400 hover:bg-slate-900/50 hover:text-white border border-transparent"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-rose-500" : "text-slate-500 group-hover:text-slate-300"}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile quick-action / Indicator */}
        <div className="flex items-center space-x-2 md:hidden">
          <Link
            href="/register"
            className="flex items-center justify-center rounded-lg bg-gradient-to-r from-rose-600 to-red-600 px-3 py-1.5 text-xs font-bold text-white hover:from-rose-500 hover:to-red-500 shadow-md shadow-rose-600/10 hover:scale-[1.02] transition-all"
          >
            สมัครด่วน
          </Link>
        </div>
      </div>

      {/* Decorative neon bottom line */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-rose-500 via-red-600 to-red-500" />
    </header>
  );
};
