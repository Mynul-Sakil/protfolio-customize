"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getMessages, updateMessageStatus, deleteMessage } from "@/actions/message";
import { Trash2, CheckCircle, MailOpen, Loader2 } from "lucide-react";
import AdminSkeleton from "@/components/AdminSkeleton";

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getMessages();
    setMessages(data || []);
    setLoading(false);
  };

  const handleStatusUpdate = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
    await updateMessageStatus(id, newStatus);
    await fetchData();
      toast.success("Status updated!");
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      const toastId = toast.loading("Deleting...");
      await deleteMessage(id);
      await fetchData();
    toast.success("Deleted successfully!", { id: toastId });
    } else {
      // do nothing
    }
  };

  if (loading) return <AdminSkeleton />;

  return (
    <div className="space-y-8">
      <div className="bg-page border border-line rounded p-6 shadow-sm">
        <h2 className="text-xl font-serif font-semibold text-ink mb-4">Contact Enquiries</h2>
        
        <div className="space-y-4">
          {messages.length === 0 && <p className="text-slate text-sm">No messages received yet.</p>}
          
          {messages.map((msg) => (
            <div key={msg._id} className={`border rounded p-5 transition-colors ${msg.status === 'unread' ? 'bg-parchment border-brass' : 'bg-page border-line opacity-80'}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-serif font-semibold text-lg text-ink flex items-center gap-2">
                    {msg.name} 
                    {msg.status === 'unread' && <span className="px-2 py-0.5 bg-brass text-page text-[10px] uppercase font-mono rounded-full">New</span>}
                  </h3>
                  <div className="flex gap-4 text-xs font-mono text-slate mt-1">
                    <a href={`mailto:${msg.email}`} className="hover:text-brass transition-colors">{msg.email}</a>
                    {msg.phone && <a href={`tel:${msg.phone}`} className="hover:text-brass transition-colors">{msg.phone}</a>}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button onClick={() => handleStatusUpdate(msg._id, msg.status)} className="p-1.5 text-slate hover:text-ink transition-colors" title={msg.status === 'unread' ? 'Mark as read' : 'Mark as unread'}>
                    {msg.status === 'unread' ? <CheckCircle className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleDelete(msg._id)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {msg.service && (
                <div className="mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-brass font-mono bg-brass/10 px-2 py-1 rounded-sm">Interested in: {msg.service}</span>
                </div>
              )}
              
              <div className="text-sm text-ink-2 whitespace-pre-wrap mt-2 p-3 bg-white/50 border border-line rounded">
                {msg.message}
              </div>
              
              <div className="mt-3 text-[10px] text-slate font-mono text-right">
                Received: {new Date(msg.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
