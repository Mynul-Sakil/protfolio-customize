"use client";

import { useEffect, useState } from "react";
import { getBookings, updateBookingStatus, deleteBooking } from "@/actions/admin/bookings";
import { Trash2, CheckCircle, MailOpen } from "lucide-react";
import AdminSkeleton from "@/components/AdminSkeleton";
import { formatDistanceToNow } from "date-fns";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getBookings();
    setBookings(data || []);
    setLoading(false);
  };

  const handleStatusUpdate = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
    await updateBookingStatus(id, newStatus);
    await fetchData();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this booking request? This action cannot be undone.")) {
      await deleteBooking(id);
      await fetchData();
    }
  };

  if (loading) return <AdminSkeleton />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-semibold text-ink">Service Bookings</h1>
        <p className="text-slate mt-2">Manage incoming service requests and bookings.</p>
      </div>

      <div className="bg-parchment border border-line rounded shadow-sm overflow-hidden flex flex-col">
        {bookings.length > 0 ? (
          <div className="divide-y divide-line">
            {bookings.map((booking: any) => (
              <div key={booking._id} className={`p-6 transition-colors ${booking.status === 'unread' ? 'bg-page border-l-4 border-l-brass' : ''}`}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-serif text-lg font-semibold text-ink flex items-center gap-2">
                          {booking.fullName}
                          {booking.status === 'unread' && (
                            <span className="w-2 h-2 rounded-full bg-brass shrink-0"></span>
                          )}
                        </h3>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-slate bg-slate/10 px-2 py-0.5 rounded-sm">
                          {formatDistanceToNow(new Date(booking.createdAt), { addSuffix: true })}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleStatusUpdate(booking._id, booking.status)} 
                          className="p-1.5 text-slate hover:text-ink hover:bg-slate/10 rounded transition-colors" 
                          title={booking.status === 'unread' ? 'Mark as Read' : 'Mark as Unread'}
                        >
                          {booking.status === 'unread' ? <CheckCircle className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                        </button>
                        <button 
                          onClick={() => handleDelete(booking._id)} 
                          className="p-1.5 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                          title="Delete Booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="font-mono text-xs uppercase tracking-widest text-brass mb-3">
                      Requested: {booking.serviceRequired}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mt-4 text-sm text-ink-2">
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase text-slate">Email</span>
                        <a href={`mailto:${booking.email}`} className="hover:text-brass transition-colors">{booking.email}</a>
                      </div>
                      
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase text-slate">Phone / WhatsApp</span>
                        <span>{booking.phone || "Not provided"}</span>
                      </div>
                      
                      <div className="flex flex-col sm:col-span-2">
                        <span className="font-mono text-[10px] uppercase text-slate">Company / Organisation</span>
                        <span>{booking.company || "Not provided"}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-slate font-sans">No service bookings found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
