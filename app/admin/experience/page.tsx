"use client";

import { useEffect, useState } from "react";
import { getExperiences, createExperience, updateExperience, deleteExperience } from "@/actions/experience";
import { Trash2, Edit2, Plus, Loader2, X } from "lucide-react";
import AdminSkeleton from "@/components/AdminSkeleton";

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    role: "",
    organization: "",
    location: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
    order: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getExperiences();
    setExperiences(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // Split responsibilities by newline and filter empty lines
    const respArray = formData.responsibilities
      .split('\n')
      .map(line => line.trim())
      .filter(line => line !== "");

    if (editingId) {
      await updateExperience(editingId, {
        ...formData,
        responsibilities: respArray
      });
      setEditingId(null);
    } else {
      await createExperience({
        ...formData,
        responsibilities: respArray
      });
    }

    setFormData({ role: "", organization: "", location: "", startDate: "", endDate: "", responsibilities: "", order: 0 });
    await fetchData();
    setSaving(false);
  };

  const handleEdit = (exp: any) => {
    setEditingId(exp._id);
    setFormData({
      role: exp.role || "",
      organization: exp.organization || "",
      location: exp.location || "",
      startDate: exp.startDate || "",
      endDate: exp.endDate || "",
      responsibilities: exp.responsibilities ? exp.responsibilities.join('\n') : "",
      order: exp.order || 0,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ role: "", organization: "", location: "", startDate: "", endDate: "", responsibilities: "", order: 0 });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      await deleteExperience(id);
      await fetchData();
    }
  };

  if (loading) return <AdminSkeleton />;

  return (
    <div className="space-y-8">
      <div className="bg-parchment p-6 border border-line rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-serif font-semibold text-ink">
            {editingId ? "Edit Experience" : "Add New Experience"}
          </h2>
          {editingId && (
            <button onClick={cancelEdit} className="text-slate hover:text-ink text-sm flex items-center gap-1 transition-colors">
              <X className="w-4 h-4" /> Cancel
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Role / Job Title *</label>
              <input type="text" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Organization *</label>
              <input type="text" required value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Location (Optional, e.g., Sydney, Australia)</label>
              <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Start Date *</label>
              <input type="text" required value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">End Date *</label>
              <input type="text" required value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Responsibilities (One per line) *</label>
            <textarea required rows={4} value={formData.responsibilities} onChange={e => setFormData({...formData, responsibilities: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none resize-none"></textarea>
          </div>
          <div className="flex gap-4">
            <button type="submit" disabled={saving} className="flex items-center gap-2 py-2 px-6 bg-ink text-page font-mono text-sm uppercase tracking-wider hover:bg-brass transition-colors rounded-xl disabled:opacity-70">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingId ? <Edit2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />)} 
              {editingId ? "Update Experience" : "Add Experience"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-page border border-line rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Current Experience</h2>
        <div className="space-y-4">
          {experiences.length === 0 && <p className="text-slate text-sm">No experience entries found.</p>}
          {experiences.map((exp) => (
            <div key={exp._id} className="flex flex-col sm:flex-row justify-between items-start border-b border-line pb-4 gap-4">
              <div>
                <h3 className="font-serif font-semibold text-lg text-ink">{exp.role}</h3>
                <p className="text-sm text-slate">
                  {exp.organization} {exp.location && ` • ${exp.location}`} • {exp.startDate} - {exp.endDate}
                </p>
                <ul className="list-disc list-inside mt-2 text-sm text-ink-2">
                  {exp.responsibilities.map((r: string, i: number) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => handleEdit(exp)} className="p-2 text-slate hover:text-ink hover:bg-white/5 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(exp._id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
