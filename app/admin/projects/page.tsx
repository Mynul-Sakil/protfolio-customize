"use client";

import { useEffect, useState } from "react";
import { getProjects, createProject, deleteProject } from "@/actions/project";
import ImageUpload from "@/components/ImageUpload";
import { Trash2, Plus, Loader2 } from "lucide-react";
import Image from "next/image";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    imageUrl: "",
    link: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getProjects();
    setProjects(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    await createProject(formData);
    setFormData({ title: "", description: "", category: "General", imageUrl: "", link: "" });
    await fetchData();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      await fetchData();
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-brass" /></div>;

  return (
    <div className="space-y-8">
      <div className="bg-parchment p-6 border border-line rounded shadow-sm">
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Add New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Project Title</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Category (e.g. Marketing)</label>
              <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Description</label>
              <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none resize-none"></textarea>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Project Link (Optional)</label>
              <input type="url" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-2">Project Image</label>
              <ImageUpload value={formData.imageUrl} onChange={(url) => setFormData({...formData, imageUrl: url})} />
            </div>
          </div>
          
          <button type="submit" disabled={saving} className="flex items-center gap-2 py-2 px-6 bg-ink text-page font-mono text-sm uppercase tracking-wider hover:bg-brass disabled:opacity-70">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add Project
          </button>
        </form>
      </div>

      <div className="bg-page border border-line rounded p-6 shadow-sm">
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Current Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.length === 0 && <p className="text-slate text-sm">No projects added yet.</p>}
          {projects.map((project) => (
            <div key={project._id} className="border border-line rounded overflow-hidden bg-parchment flex flex-col">
              {project.imageUrl && (
                <div className="relative h-48 w-full border-b border-line">
                  <Image src={project.imageUrl} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" style={{objectFit: 'cover'}} />
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-brass block mb-1">{project.category}</span>
                    <h3 className="font-serif font-semibold text-lg text-ink leading-tight">{project.title}</h3>
                  </div>
                  <button onClick={() => handleDelete(project._id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-slate line-clamp-3 mb-3 flex-1">{project.description}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-ink-2 hover:text-brass transition-colors truncate block">
                    {project.link}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
