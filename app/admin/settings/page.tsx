"use client";

import { useState } from "react";
import { changePassword } from "@/actions/settings";
import { Save, Loader2, ShieldCheck, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{type: 'success' | 'error' | '', message: string}>({type: '', message: ''});
  
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setStatus({ type: 'error', message: "New passwords do not match." });
      return;
    }
    
    if (formData.newPassword.length < 6) {
      setStatus({ type: 'error', message: "Password must be at least 6 characters." });
      return;
    }

    setSaving(true);
    setStatus({ type: '', message: '' });
    
    const res = await changePassword(formData.currentPassword, formData.newPassword);
    
    if (res.success) {
      setStatus({ type: 'success', message: "Password updated successfully!" });
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      setStatus({ type: 'error', message: res.error || "Failed to update password." });
    }
    
    setSaving(false);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="bg-parchment p-6 md:p-8 border border-line rounded shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-serif font-semibold text-ink flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brass" /> 
            Security Settings
          </h2>
          <p className="text-slate text-sm mt-1">Update your admin login password.</p>
        </div>

        {status.message && (
          <div className={`p-4 rounded-md mb-6 flex items-start gap-3 ${status.type === 'error' ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-700'}`}>
            {status.type === 'error' ? <ShieldAlert className="w-5 h-5 shrink-0" /> : <ShieldCheck className="w-5 h-5 shrink-0" />}
            <span className="text-sm font-medium">{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Current Password</label>
            <input type="password" required value={formData.currentPassword} onChange={e => setFormData({...formData, currentPassword: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">New Password</label>
            <input type="password" required minLength={6} value={formData.newPassword} onChange={e => setFormData({...formData, newPassword: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Confirm New Password</label>
            <input type="password" required minLength={6} value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
          </div>
          
          <div className="pt-2">
            <button type="submit" disabled={saving} className="flex items-center gap-2 py-2.5 px-6 bg-ink text-page font-mono text-sm uppercase tracking-wider hover:bg-brass disabled:opacity-70 transition-colors">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
