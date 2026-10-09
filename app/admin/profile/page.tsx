"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getProfile, updateProfile } from "@/actions/profile";
import ImageUpload from "@/components/ImageUpload";
import { Save, Loader2 } from "lucide-react";
import AdminSkeleton from "@/components/AdminSkeleton";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
    name: "",
    title: "",
    shortIntroduction: "",
    professionalSummary: "",
    photoUrl: "",
    resumeUrl: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) {
        setFormData({
          name: data.name || "",
          title: data.title || "",
          shortIntroduction: data.shortIntroduction || "",
          professionalSummary: data.professionalSummary || "",
          photoUrl: data.photoUrl || "",
          resumeUrl: data.resumeUrl || "",
          email: data.email || "",
          phone: data.phone || "",
          location: data.location || "",
          linkedin: data.linkedin || "",
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await updateProfile(formData);
    if (res.success) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Failed to update profile.");
    }
    setSaving(false);
      };

  if (loading) {
    return <AdminSkeleton />;
  }

  return (
    <div className="bg-parchment p-6 md:p-8 border border-line rounded shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-ink">Profile Information</h2>
          <p className="text-slate text-sm">Update your core details and contact information.</p>
        </div>
        
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-2">Profile Photo</label>
            <ImageUpload 
              value={formData.photoUrl} 
              onChange={(url) => setFormData(prev => ({ ...prev, photoUrl: url }))} 
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-2">Resume / CV (PDF)</label>
            <div className="flex items-center gap-4">
              <input 
                type="file" 
                accept="application/pdf"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  const uploadData = new FormData();
                  uploadData.append("file", file);
                  
                  try {
                    setSaving(true);
                    const res = await fetch("/api/resume", {
                      method: "POST",
                      body: uploadData
                    });
                    const data = await res.json();
                    if (data.success) {
                      setFormData(prev => ({ ...prev, resumeUrl: "/api/resume" }));
                      toast.success("Resume uploaded! Don't forget to Save Changes.");
                    } else {
                      toast.error("Failed to upload resume.");
                    }
                  } catch (error) {
                    toast.error("Error uploading resume.");
                  } finally {
                    setSaving(false);
                                      }
                }}
                className="block w-full text-sm text-slate file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-mono file:uppercase file:bg-brass/10 file:text-brass hover:file:bg-brass/20 transition-colors" 
              />
              {formData.resumeUrl && formData.resumeUrl === "/api/resume" && (
                <a href={formData.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-brass underline whitespace-nowrap">View Current</a>
              )}
            </div>
            <p className="text-xs text-slate mt-2">Uploading will overwrite the previous resume. PDF format only.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Full Name</label>
              <input type="text" name="name" value={formData.name} placeholder="John Doe" onChange={handleChange} required className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:outline-none focus:border-brass transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Professional Title</label>
              <input type="text" name="title" value={formData.title} placeholder="e.g. Marketing Executive" onChange={handleChange} required className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:outline-none focus:border-brass transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Short Introduction (Hero Section)</label>
            <textarea name="shortIntroduction" value={formData.shortIntroduction} placeholder="I am a professional..." onChange={handleChange} rows={5} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:outline-none focus:border-brass transition-colors resize-none"></textarea>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Professional Summary (About Me)</label>
            <textarea name="professionalSummary" value={formData.professionalSummary} placeholder="Detailed career overview..." onChange={handleChange} rows={4} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:outline-none focus:border-brass transition-colors resize-none"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Email</label>
              <input type="email" name="email" value={formData.email} placeholder="john@example.com" onChange={handleChange} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:outline-none focus:border-brass transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Phone</label>
              <input type="text" name="phone" value={formData.phone} placeholder="+1 (555) 000-0000" onChange={handleChange} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:outline-none focus:border-brass transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Location</label>
              <input type="text" name="location" value={formData.location} placeholder="Sydney, Australia" onChange={handleChange} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:outline-none focus:border-brass transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">LinkedIn URL</label>
              <input type="url" name="linkedin" value={formData.linkedin} placeholder="https://linkedin.com/in/johndoe" onChange={handleChange} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:outline-none focus:border-brass transition-colors" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button type="submit" disabled={saving} className="flex items-center gap-2 py-2 px-6 bg-ink text-page font-mono text-sm uppercase tracking-wider hover:bg-brass transition-colors disabled:opacity-70">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
