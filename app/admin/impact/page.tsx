"use client";

import { useState, useEffect } from "react";
import { getImpactStats, createImpactStat, updateImpactStat, deleteImpactStat } from "@/actions/impact";
import { Plus, Trash2, Edit2, Loader2, Save, X } from "lucide-react";

export default function ImpactStatsAdmin() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    value: "",
    label: "",
    order: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    const data = await getImpactStats();
    if (data) {
      setStats(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const fd = new FormData();
    fd.append("value", formData.value);
    fd.append("label", formData.label);
    fd.append("order", formData.order.toString());

    let res;
    if (isEditing && editingId) {
      res = await updateImpactStat(editingId, fd);
    } else {
      res = await createImpactStat(fd);
    }

    if (res.success) {
      setFormData({ value: "", label: "", order: 0 });
      setIsEditing(false);
      setEditingId(null);
      await fetchStats();
    } else {
      alert("Failed to save impact stat");
    }
    setSaving(false);
  };

  const handleEdit = (stat: any) => {
    setFormData({
      value: stat.value,
      label: stat.label,
      order: stat.order
    });
    setEditingId(stat._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setFormData({ value: "", label: "", order: 0 });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this stat?")) {
      const res = await deleteImpactStat(id);
      if (res.success) {
        await fetchStats();
      } else {
        alert("Failed to delete stat");
      }
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-serif font-semibold text-ink">Impact Stats</h1>
        <p className="text-slate mt-2">Manage the key metrics displayed in the "Built through real-world experience" section.</p>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-parchment p-6 border border-line rounded shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-serif font-semibold text-ink">
            {isEditing ? "Edit Stat" : "Add New Stat"}
          </h2>
          {isEditing && (
            <button 
              onClick={handleCancelEdit}
              className="text-slate hover:text-ink transition-colors flex items-center gap-1 text-sm font-mono uppercase tracking-widest"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Value (e.g. 20+, X+)</label>
              <input type="text" required placeholder="e.g. 20+" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:border-brass outline-none transition-colors" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Label (e.g. Agent relationships)</label>
              <input type="text" required placeholder="e.g. Agent relationships" value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:border-brass outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Display Order</label>
              <input type="number" required value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:border-brass outline-none transition-colors" />
            </div>
          </div>
          
          <button type="submit" disabled={saving} className="flex items-center gap-2 py-2 px-6 bg-ink text-page font-mono text-sm uppercase tracking-wider hover:bg-brass disabled:opacity-70 transition-colors rounded-xl mt-4">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEditing ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />)} 
            {isEditing ? "Update Stat" : "Add Stat"}
          </button>
        </form>
      </div>

      {/* Stats List */}
      <div className="space-y-4">
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Current Stats</h2>
        
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-brass" />
          </div>
        ) : stats.length === 0 ? (
          <div className="bg-parchment border border-line p-8 text-center rounded shadow-sm text-slate">
            No stats added yet. Add your first metric above.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat._id} className="bg-parchment border border-line p-6 rounded shadow-sm flex flex-col justify-between group">
                <div>
                  <h3 className="text-4xl font-serif font-semibold text-ink mb-2 group-hover:text-brass transition-colors">{stat.value}</h3>
                  <p className="font-sans text-sm text-slate">{stat.label}</p>
                  <p className="font-mono text-[10px] text-slate/50 mt-2">Order: {stat.order}</p>
                </div>
                <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-line/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(stat)} className="text-slate hover:text-brass transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(stat._id)} className="text-slate hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
