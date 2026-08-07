import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getDashboardStats, getRecentMessages } from "@/actions/dashboard";
import dbConnect from "@/lib/mongodb";
import Profile from "@/models/Profile";
import Link from "next/link";
import { 
  FolderGit2, 
  Wrench, 
  MessageSquare, 
  Star, 
  ArrowRight, 
  PlusCircle, 
  FileText, 
  Briefcase, 
  Settings 
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  await dbConnect();
  const profile = await Profile.findOne().lean();
  const adminName = profile?.name || session?.user?.name || 'New User';
  
  const statsRes = await getDashboardStats();
  const stats = statsRes.success ? statsRes.data : null;
  const recentMessages = await getRecentMessages(3);

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-semibold text-ink">Welcome back, {adminName}</h1>
        <p className="text-slate mt-2">Here is a quick overview of your portfolio.</p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-parchment border border-line p-6 rounded shadow-sm hover:border-brass transition-colors flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase text-slate mb-1">Total Projects</p>
              <p className="text-3xl font-serif font-semibold text-ink">{stats.projects}</p>
            </div>
            <div className="w-12 h-12 bg-brass/10 text-brass rounded-full flex items-center justify-center">
              <FolderGit2 className="w-6 h-6" />
            </div>
          </div>
          
          <div className="bg-parchment border border-line p-6 rounded shadow-sm hover:border-brass transition-colors flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase text-slate mb-1">Skills & Services</p>
              <p className="text-3xl font-serif font-semibold text-ink">{stats.skills + stats.services}</p>
            </div>
            <div className="w-12 h-12 bg-brass/10 text-brass rounded-full flex items-center justify-center">
              <Wrench className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-parchment border border-line p-6 rounded shadow-sm hover:border-brass transition-colors flex items-center justify-between relative overflow-hidden">
            <div className="relative z-10">
              <p className="font-mono text-[10px] tracking-widest uppercase text-slate mb-1">Unread Messages</p>
              <p className="text-3xl font-serif font-semibold text-ink">{stats.messages.unread}</p>
            </div>
            <div className="relative z-10 w-12 h-12 bg-brass/10 text-brass rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            {stats.messages.unread > 0 && (
              <div className="absolute top-0 right-0 w-2 h-full bg-brass"></div>
            )}
          </div>

          <div className="bg-parchment border border-line p-6 rounded shadow-sm hover:border-brass transition-colors flex items-center justify-between">
            <div>
              <p className="font-mono text-[10px] tracking-widest uppercase text-slate mb-1">Testimonials</p>
              <p className="text-3xl font-serif font-semibold text-ink">{stats.testimonials}</p>
            </div>
            <div className="w-12 h-12 bg-brass/10 text-brass rounded-full flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Messages */}
        <div className="bg-parchment border border-line rounded shadow-sm flex flex-col">
          <div className="p-6 border-b border-line flex justify-between items-center">
            <h3 className="font-mono text-xs tracking-widest uppercase text-brass">Recent Enquiries</h3>
            <Link href="/admin/messages" className="text-xs text-slate hover:text-brass flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex-1 p-6 space-y-4">
            {recentMessages.length > 0 ? (
              recentMessages.map((msg: any) => (
                <div key={msg._id} className="border-b border-line/50 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-serif font-semibold text-ink text-sm flex items-center gap-2">
                      {msg.name} 
                      {msg.status === 'unread' && <span className="w-2 h-2 rounded-full bg-brass"></span>}
                    </p>
                    <span className="text-[10px] text-slate font-mono uppercase">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-ink-2 truncate">{msg.subject}</p>
                </div>
              ))
            ) : (
              <p className="text-slate text-sm italic">No recent messages.</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-parchment border border-line rounded shadow-sm">
          <div className="p-6 border-b border-line">
            <h3 className="font-mono text-xs tracking-widest uppercase text-brass">Quick Actions</h3>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <Link href="/admin/projects" className="flex items-center gap-3 p-4 border border-line hover:border-brass hover:bg-page transition-all group">
              <PlusCircle className="w-5 h-5 text-slate group-hover:text-brass transition-colors" />
              <span className="font-sans text-sm font-medium text-ink">Add New Project</span>
            </Link>
            
            <Link href="/admin/profile" className="flex items-center gap-3 p-4 border border-line hover:border-brass hover:bg-page transition-all group">
              <FileText className="w-5 h-5 text-slate group-hover:text-brass transition-colors" />
              <span className="font-sans text-sm font-medium text-ink">Update Resume</span>
            </Link>

            <Link href="/admin/experience" className="flex items-center gap-3 p-4 border border-line hover:border-brass hover:bg-page transition-all group">
              <Briefcase className="w-5 h-5 text-slate group-hover:text-brass transition-colors" />
              <span className="font-sans text-sm font-medium text-ink">Add Experience</span>
            </Link>

            <Link href="/admin/settings" className="flex items-center gap-3 p-4 border border-line hover:border-brass hover:bg-page transition-all group">
              <Settings className="w-5 h-5 text-slate group-hover:text-brass transition-colors" />
              <span className="font-sans text-sm font-medium text-ink">Security Settings</span>
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}
