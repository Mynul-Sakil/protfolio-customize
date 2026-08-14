"use client";

import { useState } from "react";
import { changePassword, changeEmail } from "@/actions/settings";
import { Save, Loader2, ShieldCheck, ShieldAlert, Mail } from "lucide-react";

export default function SettingsPage() {
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  
  const [passwordStatus, setPasswordStatus] = useState<{type: 'success' | 'error' | '', message: string}>({type: '', message: ''});
  const [emailStatus, setEmailStatus] = useState<{type: 'success' | 'error' | '', message: string}>({type: '', message: ''});
  
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [emailFormData, setEmailFormData] = useState({
    currentPassword: "",
    newEmail: "",
  });

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordFormData.newPassword !== passwordFormData.confirmPassword) {
      setPasswordStatus({ type: 'error', message: "New passwords do not match." });
      return;
    }
    
    if (passwordFormData.newPassword.length < 6) {
      setPasswordStatus({ type: 'error', message: "Password must be at least 6 characters." });
      return;
    }

    setSavingPassword(true);
    setPasswordStatus({ type: '', message: '' });
    
    const res = await changePassword(passwordFormData.currentPassword, passwordFormData.newPassword);
    
    if (res.success) {
      setPasswordStatus({ type: 'success', message: "Password updated successfully!" });
      setPasswordFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } else {
      setPasswordStatus({ type: 'error', message: res.error || "Failed to update password." });
    }
    
    setSavingPassword(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailFormData.newEmail || !emailFormData.newEmail.includes('@')) {
      setEmailStatus({ type: 'error', message: "Please enter a valid email address." });
      return;
    }

    setSavingEmail(true);
    setEmailStatus({ type: '', message: '' });
    
    const res = await changeEmail(emailFormData.currentPassword, emailFormData.newEmail);
    
    if (res.success) {
      setEmailStatus({ type: 'success', message: "Email updated successfully! Please use this new email on your next login." });
      setEmailFormData({ currentPassword: "", newEmail: "" });
    } else {
      setEmailStatus({ type: 'error', message: res.error || "Failed to update email." });
    }
    
    setSavingEmail(false);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      
      {/* Email Change Section */}
      <div className="bg-parchment p-6 md:p-8 border border-line rounded shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-serif font-semibold text-ink flex items-center gap-2">
            <Mail className="w-5 h-5 text-brass" /> 
            Email Settings
          </h2>
          <p className="text-slate text-sm mt-1">Update your admin login email address.</p>
        </div>

        {emailStatus.message && (
          <div className={`p-4 rounded-md mb-6 flex items-start gap-3 ${emailStatus.type === 'error' ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-700'}`}>
            {emailStatus.type === 'error' ? <ShieldAlert className="w-5 h-5 shrink-0" /> : <ShieldCheck className="w-5 h-5 shrink-0" />}
            <span className="text-sm font-medium">{emailStatus.message}</span>
          </div>
        )}

        <form onSubmit={handleEmailSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">New Login Email</label>
            <input type="email" required placeholder="new@example.com" value={emailFormData.newEmail} onChange={e => setEmailFormData({...emailFormData, newEmail: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:border-brass outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Current Password (For Security)</label>
            <input type="password" required placeholder="Current password" value={emailFormData.currentPassword} onChange={e => setEmailFormData({...emailFormData, currentPassword: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:border-brass outline-none transition-colors" />
          </div>
          
          <div className="pt-2">
            <button type="submit" disabled={savingEmail} className="flex items-center gap-2 py-2.5 px-6 bg-ink text-page font-mono text-sm uppercase tracking-wider hover:bg-brass disabled:opacity-70 transition-colors">
              {savingEmail ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Update Email
            </button>
          </div>
        </form>
      </div>

      {/* Password Change Section */}
      <div className="bg-parchment p-6 md:p-8 border border-line rounded shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-serif font-semibold text-ink flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brass" /> 
            Security Settings
          </h2>
          <p className="text-slate text-sm mt-1">Update your admin login password.</p>
        </div>

        {passwordStatus.message && (
          <div className={`p-4 rounded-md mb-6 flex items-start gap-3 ${passwordStatus.type === 'error' ? 'bg-red-500/10 text-red-600' : 'bg-green-500/10 text-green-700'}`}>
            {passwordStatus.type === 'error' ? <ShieldAlert className="w-5 h-5 shrink-0" /> : <ShieldCheck className="w-5 h-5 shrink-0" />}
            <span className="text-sm font-medium">{passwordStatus.message}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Current Password</label>
            <input type="password" required placeholder="Current password" value={passwordFormData.currentPassword} onChange={e => setPasswordFormData({...passwordFormData, currentPassword: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:border-brass outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">New Password</label>
            <input type="password" required minLength={6} placeholder="New password" value={passwordFormData.newPassword} onChange={e => setPasswordFormData({...passwordFormData, newPassword: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:border-brass outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Confirm New Password</label>
            <input type="password" required minLength={6} placeholder="Confirm new password" value={passwordFormData.confirmPassword} onChange={e => setPasswordFormData({...passwordFormData, confirmPassword: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:border-brass outline-none transition-colors" />
          </div>
          
          <div className="pt-2">
            <button type="submit" disabled={savingPassword} className="flex items-center gap-2 py-2.5 px-6 bg-ink text-page font-mono text-sm uppercase tracking-wider hover:bg-brass disabled:opacity-70 transition-colors">
              {savingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Update Password
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
