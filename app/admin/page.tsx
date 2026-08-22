import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDashboardStats, getRecentMessages, getRecentBookings } from "@/actions/dashboard";
import dbConnect from "@/lib/mongodb";
import Profile from "@/models/Profile";
import Link from "next/link";
import { 
  FolderGit2, 
  MessageSquare, 
  Star, 
  ArrowRight, 
  Calendar,
  Terminal,
  Cpu,
  CheckCircle2,
  Database
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  await dbConnect();
  const profile = await Profile.findOne().lean();
  const adminName = profile?.name || session?.user?.name || 'Mynul Islam';
  
  const statsRes = await getDashboardStats();
  const stats = statsRes.success ? statsRes.data : null;
  const recentMessages = await getRecentMessages(3);
  const recentBookings = await getRecentBookings(3);

  return (
    <div className="space-y-8 font-mono text-ink">
      
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0D1117] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Terminal className="w-48 h-48 text-emerald-400" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs mb-3 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>[STATUS: DEVSTUDIO CMS ACTIVE]</span>
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight">
            System Operational, <span className="text-emerald-400">{adminName}</span>
          </h1>
          <p className="text-slate text-xs md:text-sm mt-2 max-w-xl font-sans">
            Manage your full-stack developer portfolio, experiences, projects, and backend API settings.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs">
            <a 
              href="/api/seed-mynul"
              target="_blank"
              className="px-4 py-2 rounded-lg bg-emerald-500 text-[#06090E] font-extrabold hover:brightness-110 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>$ run seed-mynul-data</span>
            </a>

            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-lg bg-[#161B22] border border-white/10 text-ink hover:border-cyan-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>View Public Live Site</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Operations Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/admin/projects" className="bg-[#0D1117] border border-white/10 p-6 rounded-2xl shadow-xl hover:border-emerald-500/40 transition-all group flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase text-slate tracking-wider mb-1">// Total Projects</p>
              <p className="text-3xl font-extrabold text-ink group-hover:text-emerald-400 transition-colors">{stats.projects}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl flex items-center justify-center">
              <FolderGit2 className="w-6 h-6" />
            </div>
          </Link>

          <Link href="/admin/messages" className="bg-[#0D1117] border border-white/10 p-6 rounded-2xl shadow-xl hover:border-emerald-500/40 transition-all group flex items-center justify-between relative overflow-hidden">
            <div>
              <p className="text-[10px] uppercase text-slate tracking-wider mb-1">// Unread Inquiries</p>
              <p className="text-3xl font-extrabold text-ink group-hover:text-emerald-400 transition-colors">{stats.messages.unread}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            {stats.messages.unread > 0 && (
              <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500"></div>
            )}
          </Link>

          <Link href="/admin/testimonials" className="bg-[#0D1117] border border-white/10 p-6 rounded-2xl shadow-xl hover:border-emerald-500/40 transition-all group flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase text-slate tracking-wider mb-1">// Testimonials</p>
              <p className="text-3xl font-extrabold text-ink group-hover:text-emerald-400 transition-colors">{stats.testimonials}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
          </Link>

          <Link href="/admin/bookings" className="bg-[#0D1117] border border-white/10 p-6 rounded-2xl shadow-xl hover:border-emerald-500/40 transition-all group flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase text-slate tracking-wider mb-1">// Service Bookings</p>
              <p className="text-3xl font-extrabold text-ink group-hover:text-emerald-400 transition-colors">{stats.bookings.pending}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </Link>
        </div>
      )}

      {/* Logs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Messages */}
        <div className="bg-[#0D1117] border border-white/10 rounded-2xl shadow-xl flex flex-col overflow-hidden">
          <div className="p-5 bg-[#161B22] border-b border-white/10 flex justify-between items-center text-xs">
            <span className="text-emerald-400 font-bold flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              // Recent_Inquiries.log
            </span>
            <Link href="/admin/messages" className="text-slate hover:text-emerald-400 flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="p-6 space-y-4 font-sans text-xs">
            {recentMessages.length > 0 ? (
              recentMessages.map((msg: any) => (
                <div key={msg._id} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-mono font-bold text-ink flex items-center gap-2">
                      {msg.name} 
                      {msg.status === 'unread' && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
                    </p>
                    <span className="text-[10px] text-slate font-mono">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate truncate font-sans text-xs">{msg.subject}</p>
                </div>
              ))
            ) : (
              <p className="text-slate/60 text-xs italic font-mono">No recent messages logged.</p>
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-[#0D1117] border border-white/10 rounded-2xl shadow-xl flex flex-col overflow-hidden">
          <div className="p-5 bg-[#161B22] border-b border-white/10 flex justify-between items-center text-xs">
            <span className="text-cyan-400 font-bold flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              // Recent_Bookings.log
            </span>
            <Link href="/admin/bookings" className="text-slate hover:text-cyan-400 flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="p-6 space-y-4 font-sans text-xs">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking: any) => (
                <div key={booking._id} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-mono font-bold text-ink flex items-center gap-2">
                      {booking.fullName} 
                      {booking.status === 'pending' && <span className="w-2 h-2 rounded-full bg-cyan-400"></span>}
                    </p>
                    <span className="text-[10px] text-slate font-mono">
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-slate truncate font-sans text-xs">{booking.serviceRequired}</p>
                </div>
              ))
            ) : (
              <p className="text-slate/60 text-xs italic font-mono">No recent bookings logged.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

