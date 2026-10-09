"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getSkills, createSkill, deleteSkill } from "@/actions/skill";
import { Trash2, Plus, Loader2 } from "lucide-react";
import AdminSkeleton from "@/components/AdminSkeleton";

export default function SkillsPage() {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "Core Competencies",
  });

  const categories = ["Core Competencies", "Technical Skills", "Other Skills"];

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await getSkills();
    setSkills(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    await createSkill(formData);
    setFormData({ ...formData, name: "" }); // keep category selected
    toast.success("Successfully saved!");
    await fetchData();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      const toastId = toast.loading("Deleting...");
      await deleteSkill(id);
      await fetchData();
    toast.success("Deleted successfully!", { id: toastId });
    } else {
      // do nothing
    }
  };

  if (loading) return <AdminSkeleton />;

  return (
    <div className="space-y-8">
      <div className="bg-parchment p-6 border border-line rounded shadow-sm">
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Add New Skill</h2>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Skill Name</label>
            <input type="text" required placeholder="e.g. React.js" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:border-brass outline-none transition-colors" />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Category</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:border-brass outline-none transition-colors">
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <button type="submit" disabled={saving} className="flex items-center justify-center gap-2 py-2 px-6 bg-ink text-page font-mono text-sm uppercase tracking-wider hover:bg-brass disabled:opacity-70 h-[42px] w-full md:w-auto">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add
          </button>
        </form>
      </div>

      <div className="bg-page border border-line rounded p-6 shadow-sm">
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Current Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map(category => {
            const categorySkills = skills.filter(s => s.category === category);
            if (categorySkills.length === 0) return null;
            
            return (
              <div key={category}>
                <h3 className="font-mono text-xs uppercase tracking-widest text-brass mb-3">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map(skill => (
                    <div key={skill._id} className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 border border-line rounded-sm bg-parchment text-ink-2">
                      {skill.name}
                      <button onClick={() => handleDelete(skill._id)} className="text-slate hover:text-red-500 transition-colors ml-1">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
          {skills.length === 0 && <p className="text-slate text-sm">No skills added yet.</p>}
        </div>
      </div>
    </div>
  );
}
