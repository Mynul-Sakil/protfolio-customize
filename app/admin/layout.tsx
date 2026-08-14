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
  Calendar
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Skills", href: "/admin/skills", icon: Wrench },
  { name: "Services", href: "/admin/services", icon: Layers },
  { name: "Projects", href: "/admin/projects", icon: FolderDot },
  { name: "Certifications", href: "/admin/certifications", icon: Award },
  { name: "Achievements", href: "/admin/achievements", icon: Star },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
  { name: "Messages", href: "/admin/messages", icon: MessageSquare },
  { name: "Bookings", href: "/admin/bookings", icon: Calendar },
  { name: "Settings", href: "/admin/settings", icon: Settings },
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
    <div className="min-h-screen bg-page flex">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-parchment text-ink border-b border-line z-50 flex items-center justify-between px-4">
        <span className="font-serif font-semibold text-xl">CMS</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:sticky top-0 left-0 z-40 w-64 h-screen bg-parchment border-r border-line text-ink transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="h-16 md:h-20 flex items-center justify-center border-b border-line mt-16 md:mt-0">
          <span className="font-serif font-semibold text-2xl tracking-wide">Admin CMS</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors font-sans text-sm ${
                    isActive
                      ? "bg-brass text-page font-medium shadow-sm shadow-brass/20"
                      : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-line">
          <div className="mb-4 px-2 text-xs font-mono text-ink/50 truncate">
            {session?.user?.email}
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-md text-sm text-ink/70 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 pt-24 md:pt-10 overflow-x-hidden">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
