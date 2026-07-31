"use client";

import { useEffect, useState } from "react";
import { getAchievements, createAchievement, deleteAchievement } from "@/actions/achievement";
import ImageUpload from "@/components/ImageUpload";
import { Trash2, Plus, Loader2 } from "lucide-react";
import Image from "next/image";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getAchievements();
    setAchievements(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    await createAchievement(formData);
    setFormData({ title: "", imageUrl: "" });
    await fetchData();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this achievement?")) {
      await deleteAchievement(id);
      await fetchData();
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-brass" /></div>;

  return (
    <div className="space-y-8">
      <div className="bg-parchment p-6 border border-line rounded shadow-sm">
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Add New Achievement</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Achievement Title / Caption</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-2">Achievement Photo</label>
              <ImageUpload value={formData.imageUrl} onChange={(url) => setFormData(prev => ({...prev, imageUrl: url}))} />
            </div>
          </div>
          
          <button type="submit" disabled={saving} className="flex items-center gap-2 py-2 px-6 bg-ink text-page font-mono text-sm uppercase tracking-wider hover:bg-brass disabled:opacity-70">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add Achievement
          </button>
        </form>
      </div>

      <div className="bg-page border border-line rounded p-6 shadow-sm">
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Current Achievements</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {achievements.length === 0 && <p className="text-slate text-sm col-span-full">No achievements added yet.</p>}
          {achievements.map((ach) => (
            <div key={ach._id} className="border border-line rounded bg-ink relative overflow-hidden group">
              <button onClick={() => handleDelete(ach._id)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white hover:bg-red-600 rounded z-10 transition">
                <Trash2 className="w-3 h-3" />
              </button>
              
              <div className="aspect-square relative flex items-center justify-center">
                {ach.imageUrl ? (
                  <Image src={ach.imageUrl} alt={ach.title} fill sizes="(max-width: 768px) 100vw, 25vw" style={{objectFit: 'cover'}} className="opacity-90 group-hover:opacity-100 group-hover:scale-105 transition duration-500" />
                ) : (
                  <span className="font-mono text-[10px] uppercase text-slate/50">No Photo</span>
                )}
                
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent pt-8 pb-2 px-3 text-page text-xs font-medium z-0">
                  {ach.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
