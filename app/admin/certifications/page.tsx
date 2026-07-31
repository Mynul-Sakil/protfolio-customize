"use client";

import { useEffect, useState } from "react";
import { getCertifications, createCertification, deleteCertification } from "@/actions/certification";
import ImageUpload from "@/components/ImageUpload";
import { Trash2, Plus, Loader2 } from "lucide-react";
import Image from "next/image";

export default function CertificationsPage() {
  const [certs, setCerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    imageUrl: "",
    credentialUrl: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getCertifications();
    setCerts(data || []);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    await createCertification(formData);
    setFormData({ title: "", issuer: "", date: "", imageUrl: "", credentialUrl: "" });
    await fetchData();
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this certification?")) {
      await deleteCertification(id);
      await fetchData();
    }
  };

  if (loading) return <div className="flex justify-center p-10"><Loader2 className="w-8 h-8 animate-spin text-brass" /></div>;

  return (
    <div className="space-y-8">
      <div className="bg-parchment p-6 border border-line rounded shadow-sm">
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Add New Certification</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Certificate Title</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Issuer (e.g. Coursera, VIT)</label>
              <input type="text" required value={formData.issuer} onChange={e => setFormData({...formData, issuer: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Date Issued (e.g. Oct 2023)</label>
              <input type="text" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-1">Credential URL (Optional)</label>
              <input type="url" value={formData.credentialUrl} onChange={e => setFormData({...formData, credentialUrl: e.target.value})} className="w-full bg-transparent border-b border-line px-2 py-2 text-ink focus:border-brass outline-none" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-slate mb-2">Certificate Image</label>
              <ImageUpload value={formData.imageUrl} onChange={(url) => setFormData({...formData, imageUrl: url})} />
            </div>
          </div>
          
          <button type="submit" disabled={saving} className="flex items-center gap-2 py-2 px-6 bg-ink text-page font-mono text-sm uppercase tracking-wider hover:bg-brass disabled:opacity-70">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add Certification
          </button>
        </form>
      </div>

      <div className="bg-page border border-line rounded p-6 shadow-sm">
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Current Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {certs.length === 0 && <p className="text-slate text-sm">No certifications added yet.</p>}
          {certs.map((cert) => (
            <div key={cert._id} className="border border-line rounded bg-parchment relative">
              <button onClick={() => handleDelete(cert._id)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white hover:bg-red-600 rounded z-10 transition">
                <Trash2 className="w-3 h-3" />
              </button>
              
              <div className="aspect-[4/3] relative border-b border-line bg-page flex items-center justify-center overflow-hidden">
                {cert.imageUrl ? (
                  <Image src={cert.imageUrl} alt={cert.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{objectFit: 'cover'}} />
                ) : (
                  <span className="font-mono text-[10px] uppercase text-slate">No Image</span>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-serif font-semibold text-base text-ink line-clamp-1">{cert.title}</h3>
                <p className="text-xs text-slate mt-1 line-clamp-1">{cert.issuer}</p>
                <p className="font-mono text-[10px] text-brass mt-2 uppercase">{cert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
