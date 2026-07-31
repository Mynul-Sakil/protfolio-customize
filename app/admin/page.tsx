import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-semibold text-ink">Welcome back, {session?.user?.name || 'Admin'}</h1>
        <p className="text-slate mt-2">Manage your portfolio content from the sidebar navigation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-parchment border border-line p-6 rounded shadow-sm">
          <h3 className="font-mono text-sm tracking-widest uppercase text-brass mb-2">Quick Stats</h3>
          <p className="text-slate text-sm">Dashboard metrics will be displayed here.</p>
        </div>
        <div className="bg-parchment border border-line p-6 rounded shadow-sm">
          <h3 className="font-mono text-sm tracking-widest uppercase text-brass mb-2">Next Steps</h3>
          <p className="text-slate text-sm">Start by updating your Profile information or adding your Experience timeline.</p>
        </div>
      </div>
    </div>
  );
}
