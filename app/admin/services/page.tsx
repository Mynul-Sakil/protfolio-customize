"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getServices, createService, deleteService } from "@/actions/service";
import { Trash2, Plus, Loader2 } from "lucide-react";
import AdminSkeleton from "@/components/AdminSkeleton";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await getServices();
    setServices(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    await createService(formData);
    setFormData({ title: "", description: "" });
    toast.success("Successfully saved!");
    await fetchData();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      const toastId = toast.loading("Deleting...");
      await deleteService(id);
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
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Add New Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Service Title</label>
            <input type="text" required placeholder="e.g. Web Development" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:border-brass outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Description (Optional)</label>
            <textarea rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink placeholder-slate/50 focus:border-brass outline-none transition-colors resize-none"></textarea>
          </div>
          <button type="submit" disabled={saving} className="flex items-center gap-2 py-2 px-6 bg-ink text-page font-mono text-sm uppercase tracking-wider hover:bg-brass disabled:opacity-70">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add Service
          </button>
        </form>
      </div>

      <div className="bg-page border border-line rounded p-6 shadow-sm">
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Current Services</h2>
        <div className="space-y-4">
          {services.length === 0 && <p className="text-slate text-sm">No services added yet.</p>}
          {services.map((service) => (
            <div key={service._id} className="flex justify-between items-start border-b border-line pb-4">
              <div>
                <h3 className="font-serif font-semibold text-lg text-ink">{service.title}</h3>
                {service.description && <p className="text-sm text-slate mt-1">{service.description}</p>}
              </div>
              <button onClick={() => handleDelete(service._id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
