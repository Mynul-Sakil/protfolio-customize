"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Briefcase,
  Wrench,
  Layers,
  FolderDot,
  Award,
  Star,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Calendar,
  TrendingUp,
  Terminal,
  Database
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Profile Info", href: "/admin/profile", icon: User },
  { name: "Work Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Impact Benchmarks", href: "/admin/impact", icon: TrendingUp },
  { name: "Technical Skills", href: "/admin/skills", icon: Wrench },
  { name: "Services Offered", href: "/admin/services", icon: Layers },
  { name: "Software Projects", href: "/admin/projects", icon: FolderDot },
  { name: "Certifications", href: "/admin/certifications", icon: Award },
  { name: "Achievements", href: "/admin/achievements", icon: Star },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Inquiries & Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Service Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "System Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If this is the login page, don't show the sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#06090E] text-ink flex">
      {/* Mobile Menu Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0D1117] text-ink border-b border-white/10 z-50 flex items-center justify-between px-4 font-mono">
        <div className="flex items-center gap-2 text-emerald-400 font-bold">
          <Terminal className="w-5 h-5" />
          <span>&lt;DevStudio /&gt;</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-emerald-400">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:sticky top-0 left-0 z-40 w-64 h-screen bg-[#0D1117] border-r border-white/10 text-ink transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Header */}
        <div className="h-16 md:h-20 flex flex-col justify-center px-6 border-b border-white/10 mt-16 md:mt-0">
          <div className="flex items-center gap-2 font-mono font-extrabold text-lg text-emerald-400">
            <Terminal className="w-5 h-5 text-emerald-400" />
            <span>&lt;DevStudio CMS /&gt;</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate mt-1">
            <Database className="w-3 h-3 text-cyan-400" />
            <span>DB: mynul_portfolio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-auto"></span>
          </div>
        </div>
        
        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-4 px-3 font-mono text-xs">
          <div className="text-[10px] text-slate/50 font-mono px-3 mb-2 uppercase tracking-wider">// System Explorer</div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 font-bold shadow-sm shadow-emerald-500/10"
                      : "text-slate/80 hover:bg-white/5 hover:text-ink"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate/60"}`} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin User */}
        <div className="p-4 border-t border-white/10 bg-[#06090E]/50 font-mono">
          <div className="mb-3 px-2 text-[11px] text-emerald-400 truncate flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="truncate">{session?.user?.email || "mynul.sakil@gmail.com"}</span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center justify-center gap-2 px-3 py-2 w-full rounded-lg text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>$ logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10 overflow-x-hidden">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

