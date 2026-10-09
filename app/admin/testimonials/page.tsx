"use client";

import { useEffect, useState, useCallback } from "react";
import { getTestimonials, createTestimonial, deleteTestimonial } from "@/actions/testimonial";
import { Trash2, Plus, Loader2 } from "lucide-react";
import AdminSkeleton from "@/components/AdminSkeleton";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    feedback: "",
  });

  const fetchData = useCallback(async () => {
    const data = await getTestimonials();
    setTestimonials(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    await createTestimonial(formData);
    setFormData({ name: "", role: "", feedback: "" });
    await fetchData();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      await deleteTestimonial(id);
      await fetchData();
    }
  };

  if (loading) return <AdminSkeleton />;

  return (
    <div className="space-y-8">
      <div className="bg-parchment p-6 border border-line rounded shadow-sm">
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Add New Testimonial</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Name</label>
              <input type="text" required placeholder="Jane Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:border-brass outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Role / Organization</label>
              <input type="text" required placeholder="CEO, Tech Innovations" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:border-brass outline-none transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Feedback / Quote</label>
            <textarea required rows={4} placeholder="Working with Mynul was..." value={formData.feedback} onChange={e => setFormData({...formData, feedback: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:border-brass outline-none transition-colors resize-none"></textarea>
          </div>
          <button type="submit" disabled={saving} className="flex items-center gap-2 py-2 px-6 bg-ink text-page font-mono text-sm uppercase tracking-wider hover:bg-brass disabled:opacity-70">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add Testimonial
          </button>
        </form>
      </div>

      <div className="bg-page border border-line rounded p-6 shadow-sm">
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Current Testimonials</h2>
        <div className="grid grid-cols-1 gap-4">
          {testimonials.length === 0 && <p className="text-slate text-sm">No testimonials added yet.</p>}
          {testimonials.map((t) => (
            <div key={t._id} className="border border-line rounded bg-parchment p-4 flex justify-between items-start gap-4">
              <div>
                <p className="text-ink text-sm italic mb-3">&quot;{t.feedback}&quot;</p>
                <div className="flex items-center gap-2">
                  <span className="h-[1px] w-4 bg-brass"></span>
                  <h4 className="font-serif font-semibold text-ink text-sm">{t.name}</h4>
                  <span className="text-slate text-xs font-mono">• {t.role}</span>
                </div>
              </div>
              <button onClick={() => handleDelete(t._id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
