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
  Hexagon,
  Globe
} from "lucide-react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

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
    <div className="min-h-screen bg-page text-ink flex font-sans">
      {/* Mobile Menu Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-parchment text-ink border-b border-white/5 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2 text-brass font-bold">
          <Hexagon className="w-5 h-5" />
          <span>Control Panel</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-brass-light">
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:sticky top-0 left-0 z-40 w-64 h-screen bg-parchment border-r border-white/5 text-ink transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Header */}
        <div className="h-16 md:h-20 flex flex-col justify-center px-6 border-b border-white/5 mt-16 md:mt-0">
          <div className="flex items-center gap-2 font-bold text-lg text-brass">
            <Hexagon className="w-5 h-5 text-brass" />
            <span>Mynul<span className="text-white">.Admin</span></span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate mt-1 font-medium">
            <Globe className="w-3 h-3 text-brass-light" />
            <span>Portfolio Management</span>
          </div>
        </div>
        
        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-4 px-3 text-sm font-medium">
          <div className="text-[10px] text-slate px-3 mb-2 uppercase tracking-widest font-bold">Navigation</div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? "bg-brass/10 border border-brass/20 text-brass shadow-sm shadow-brass/5"
                      : "text-slate hover:bg-white/5 hover:text-ink border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-brass" : "text-slate/60"}`} />
                  <span className="truncate">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin User */}
        <div className="p-4 border-t border-white/5 bg-white/5">
          <div className="mb-3 px-2 text-xs text-ink font-medium truncate flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-brass/20 border border-brass/30 flex items-center justify-center shrink-0">
              <User className="w-3 h-3 text-brass" />
            </div>
            <span className="truncate">{session?.user?.email || "Admin User"}</span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center justify-center gap-2 px-3 py-2.5 w-full rounded-xl text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10 overflow-x-hidden relative">
        <div className="max-w-5xl mx-auto">
          <Toaster position="top-right" />
          {children}
        </div>
      </main>
    </div>
  );
}
