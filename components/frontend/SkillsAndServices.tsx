"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, X } from "lucide-react";
import { createBooking } from "@/actions/booking";

interface SkillItem {
  _id?: string;
  name: string;
  category: string;
}

interface ServiceItem {
  _id?: string;
  title: string;
  description?: string;
}

interface SkillsServicesProps {
  skills: SkillItem[];
  services: ServiceItem[];
}

export default function SkillsAndServices({ skills, services }: SkillsServicesProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  if (!skills.length && !services.length) return null;

  const categories = Array.from(new Set(skills.map((s) => s.category)));
  const serviceOptions = Array.from(
    new Set([
      ...services.map((s) => s.title),
      "Backend API Architecture",
      "Full Stack Web Development",
      "AI Integration & Automation",
      "Technical Consultation",
    ])
  );

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    const formData = new FormData(e.currentTarget);
    const result = await createBooking(formData);

    if (result.success) {
      setSubmitSuccess(true);
      setTimeout(() => {
        setSelectedService(null);
        setSubmitSuccess(false);
      }, 2800);
    } else {
      setSubmitError(result.error || "An error occurred");
    }
    setIsSubmitting(false);
  };

  const closeModal = () => {
    if (isSubmitting) return;
    setSelectedService(null);
    setSubmitSuccess(false);
    setSubmitError("");
  };

  return (
    <>
      <section id="services" className="py-20 md:py-24 bg-page border-b border-line">
        <div className="max-w-6xl mx-auto px-6 md:px-10 space-y-20">
          {/* Part A: Services / Engagement Areas */}
          {services.length > 0 && (
            <div>
              <div className="max-w-2xl mb-12">
                <p className="font-mono text-xs uppercase tracking-widest text-brass mb-3">
                  04 / How I Can Help
                </p>
                <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
                  Areas of ownership &amp; advisory.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <div
                    key={service._id || service.title}
                    onClick={() => setSelectedService(service.title)}
                    className="p-7 rounded-xl border border-line bg-parchment hover:border-line-strong transition-colors cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-mono text-xs text-slate mb-4">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <h3 className="font-serif text-xl font-medium text-ink group-hover:text-brass transition-colors mb-3 leading-snug">
                        {service.title}
                      </h3>
                      {service.description && (
                        <p className="font-sans text-sm text-ink-2 leading-relaxed mb-6">
                          {service.description}
                        </p>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink group-hover:text-brass transition-colors">
                      <span>Request consultation</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Part B: Clean Technical Stack Matrix */}
          {skills.length > 0 && (
            <div>
              <div className="max-w-2xl mb-10">
                <p className="font-mono text-xs uppercase tracking-widest text-slate mb-2">
                  Technical Stack
                </p>
                <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-ink">
                  Core technologies used in production.
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category) => {
                  const categorySkills = skills.filter((s) => s.category === category);
                  return (
                    <div
                      key={category}
                      className="p-6 rounded-xl border border-line bg-parchment"
                    >
                      <h4 className="font-mono text-xs uppercase tracking-widest text-brass pb-3 mb-4 border-b border-line">
                        {category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <span
                            key={skill._id || skill.name}
                            className="px-3 py-1.5 rounded-md bg-surface-subtle border border-line text-sm font-sans text-ink-2"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Consultation / Booking Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.18 }}
              className="relative w-full max-w-lg max-h-[90vh] bg-parchment border border-line-strong shadow-2xl overflow-y-auto rounded-xl z-10"
            >
              <div className="sticky top-0 bg-parchment border-b border-line px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-brass">
                    Consultation Request
                  </p>
                  <h3 className="font-serif text-xl font-medium text-ink">
                    Discuss Your Project
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="Close modal"
                  onClick={closeModal}
                  className="w-8 h-8 rounded-lg border border-line flex items-center justify-center text-slate hover:text-ink hover:bg-surface-subtle transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 bg-brass/10 text-brass rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-2xl font-medium text-ink mb-2">
                      Request Received
                    </h4>
                    <p className="text-sm text-slate">
                      Thank you. I will respond shortly to coordinate next steps.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-4">
                    {submitError && (
                      <div className="p-3 bg-red-500/10 text-red-600 dark:text-red-400 text-sm border border-red-500/20 rounded-lg">
                        {submitError}
                      </div>
                    )}

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-slate mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        className="w-full bg-page border border-line-strong px-3.5 py-2.5 text-sm text-ink placeholder-slate/60 focus:outline-none focus:border-brass rounded-lg"
                        placeholder="Jane Doe"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-slate mb-1.5">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full bg-page border border-line-strong px-3.5 py-2.5 text-sm text-ink placeholder-slate/60 focus:outline-none focus:border-brass rounded-lg"
                        placeholder="jane@company.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-slate mb-1.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full bg-page border border-line-strong px-3.5 py-2.5 text-sm text-ink placeholder-slate/60 focus:outline-none focus:border-brass rounded-lg"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-slate mb-1.5">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          className="w-full bg-page border border-line-strong px-3.5 py-2.5 text-sm text-ink placeholder-slate/60 focus:outline-none focus:border-brass rounded-lg"
                          placeholder="Acme Corp"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-slate mb-1.5">
                        Area of Interest *
                      </label>
                      <select
                        name="serviceRequired"
                        required
                        defaultValue={selectedService || ""}
                        className="w-full bg-page border border-line-strong px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-brass rounded-lg"
                      >
                        <option value="" disabled>
                          Select a service...
                        </option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 bg-ink text-page text-sm font-medium py-3 hover:bg-brass hover:text-white transition-colors disabled:opacity-50 rounded-lg cursor-pointer"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
