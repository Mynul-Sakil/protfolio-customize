"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { createMessage } from "@/actions/message";

interface ContactProps {
  profile: any;
}

export default function ContactSection({ profile }: ContactProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      await createMessage(data);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-parchment border-t border-line">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16 lg:gap-24">
        
        {/* Contact Info */}
        <div className="flex-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-mono text-sm uppercase tracking-widest text-brass mb-2">Get in touch</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-semibold text-ink mb-6">Contact.</h3>
            <p className="text-slate font-sans mb-12 max-w-md leading-relaxed">
              Have a project in mind or just want to say hello? Fill out the form and I'll get back to you as soon as possible.
            </p>

            <div className="space-y-6">
              {profile?.email && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-page border border-line text-brass rounded-full">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate mb-1">Email</p>
                    <a href={`mailto:${profile.email}`} className="font-serif text-lg text-ink hover:text-brass transition-colors">
                      {profile.email}
                    </a>
                  </div>
                </div>
              )}
              {profile?.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-page border border-line text-brass rounded-full">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate mb-1">Phone</p>
                    <a href={`tel:${profile.phone}`} className="font-serif text-lg text-ink hover:text-brass transition-colors">
                      {profile.phone}
                    </a>
                  </div>
                </div>
              )}
              {profile?.location && (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-page border border-line text-brass rounded-full">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate mb-1">Location</p>
                    <p className="font-serif text-lg text-ink">{profile.location}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-page border border-line p-8 md:p-10 shadow-sm rounded-2xl"
          >
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-brass/10 text-brass rounded-full flex items-center justify-center mb-4">
                  <Send className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-2xl font-semibold text-ink">Message Sent!</h4>
                <p className="text-slate font-sans">Thank you for reaching out. I'll get back to you shortly.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-4 px-6 py-2 bg-ink text-page font-mono text-xs uppercase tracking-widest hover:bg-brass transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="p-3 bg-red-50 text-red-500 text-sm border border-red-200">{error}</div>}
                
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-widest text-slate mb-2">Name</label>
                  <input required type="text" id="name" name="name" className="w-full bg-parchment border border-line px-3 py-3 text-ink focus:border-brass outline-none transition-colors rounded-xl" />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-slate mb-2">Email</label>
                  <input required type="email" id="email" name="email" className="w-full bg-parchment border border-line px-3 py-3 text-ink focus:border-brass outline-none transition-colors rounded-xl" />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-widest text-slate mb-2">Subject</label>
                  <input required type="text" id="subject" name="subject" className="w-full bg-parchment border border-line px-3 py-3 text-ink focus:border-brass outline-none transition-colors rounded-xl" />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-widest text-slate mb-2">Message</label>
                  <textarea required id="message" name="message" rows={4} className="w-full bg-parchment border border-line px-3 py-3 text-ink focus:border-brass outline-none transition-colors resize-none rounded-xl"></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-ink text-page font-mono text-sm uppercase tracking-widest hover:bg-brass disabled:opacity-70 transition-colors rounded-xl"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
