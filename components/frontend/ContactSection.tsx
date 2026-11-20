"use client";

import { useState } from "react";
import { Send, Loader2, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { createMessage } from "@/actions/message";

interface ContactProps {
  profile: {
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
  } | null;
}

export default function ContactSection({ profile }: ContactProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const linkedinHref = profile?.linkedin
    ? profile.linkedin.startsWith("http")
      ? profile.linkedin
      : `https://${profile.linkedin}`
    : null;

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
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-page">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Direct Contact Info */}
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-widest text-brass mb-3">
              06 / Contact
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink mb-4">
              Let&apos;s discuss your team or project.
            </h2>
            <p className="font-sans text-base text-ink-2 leading-relaxed mb-10">
              Whether you are hiring for a backend/full-stack role or need help scaling a SaaS product, send a note and I will reply promptly.
            </p>

            <div className="space-y-5 border-t border-line pt-6">
              {profile?.email && (
                <div className="flex items-center gap-3.5">
                  <Mail className="w-4 h-4 text-brass shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-slate">
                      Email
                    </div>
                    <a
                      href={`mailto:${profile.email}`}
                      className="font-sans text-sm font-medium text-ink hover:text-brass transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
              )}

              {profile?.phone && (
                <div className="flex items-center gap-3.5">
                  <Phone className="w-4 h-4 text-brass shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-slate">
                      Phone
                    </div>
                    <a
                      href={`tel:${profile.phone}`}
                      className="font-sans text-sm font-medium text-ink hover:text-brass transition-colors"
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>
              )}

              {profile?.location && (
                <div className="flex items-center gap-3.5">
                  <MapPin className="w-4 h-4 text-brass shrink-0" />
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-slate">
                      Location
                    </div>
                    <div className="font-sans text-sm font-medium text-ink">
                      {profile.location} (Remote Worldwide)
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-3 flex flex-wrap gap-3">
                {linkedinHref && (
                  <a
                    href={linkedinHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-ink hover:text-brass transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href="https://github.com/Mynul-Sakil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-ink hover:text-brass transition-colors"
                >
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Clean Inquiry Form */}
          <div className="lg:col-span-7 bg-parchment border border-line p-7 md:p-9 rounded-xl">
            {success ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 bg-brass/10 text-brass rounded-full flex items-center justify-center mx-auto">
                  <Send className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-2xl font-medium text-ink">Message Sent</h3>
                <p className="text-sm text-slate">
                  Thank you for reaching out. I will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-4 px-5 py-2.5 rounded-lg border border-line-strong text-sm font-medium text-ink hover:border-brass hover:text-brass transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3.5 bg-red-500/10 text-red-600 dark:text-red-400 text-sm border border-red-500/20 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-mono text-[11px] uppercase tracking-wider text-slate mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Jane Doe"
                      className="w-full bg-page border border-line-strong px-3.5 py-2.5 text-sm text-ink placeholder-slate/60 focus:border-brass outline-none transition-colors rounded-lg"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-mono text-[11px] uppercase tracking-wider text-slate mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      placeholder="jane@company.com"
                      className="w-full bg-page border border-line-strong px-3.5 py-2.5 text-sm text-ink placeholder-slate/60 focus:border-brass outline-none transition-colors rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block font-mono text-[11px] uppercase tracking-wider text-slate mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    required
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Role inquiry / Technical consultation"
                    className="w-full bg-page border border-line-strong px-3.5 py-2.5 text-sm text-ink placeholder-slate/60 focus:border-brass outline-none transition-colors rounded-lg"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-mono text-[11px] uppercase tracking-wider text-slate mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Share a brief overview of what you're looking for..."
                    className="w-full bg-page border border-line-strong px-3.5 py-2.5 text-sm text-ink placeholder-slate/60 focus:border-brass outline-none transition-colors resize-none rounded-lg"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-ink text-page text-sm font-medium hover:bg-brass hover:text-white disabled:opacity-60 transition-colors rounded-lg cursor-pointer"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
