"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, CheckCircle, ArrowRight, X, Layers } from "lucide-react";
import { createBooking } from "@/actions/booking";

interface SkillsServicesProps {
  skills: any[];
  services: any[];
}

export default function SkillsAndServices({ skills, services }: SkillsServicesProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const serviceOptions = [
    "Backend API Architecture",
    "Full Stack Web Development",
    "AI Integration & Automation",
    "Database Design & Optimization",
    "Technical Consultation"
  ];

  if (!skills.length && !services.length) return null;

  const categories = Array.from(new Set(skills.map(s => s.category)));

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
      }, 3000);
    } else {
      setSubmitError(result.error || "An error occurred");
    }
    setIsSubmitting(false);
  };

  const closeModal = () => {
    setSelectedService(null);
    setSubmitSuccess(false);
    setSubmitError("");
  };

  return (
    <>
      <section id="services" className="py-24 bg-page border-y border-white/5 relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-brass/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">

          {/* Services Side */}
          {services.length > 0 && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1.5 rounded-full bg-brass/10 border border-brass/20 text-brass font-medium text-xs tracking-wide flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Areas of Expertise
                  </span>
                </div>
                <h3 className="font-sans text-3xl md:text-4xl font-extrabold text-ink">
                  Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-brass to-brass-light">Services</span>
                </h3>
              </motion.div>

              <div className="space-y-4">
                {services.slice(0, 4).map((service, index) => (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setSelectedService(service.title)}
                    className="bg-parchment border border-white/5 p-6 rounded-3xl shadow-lg hover:border-brass/40 hover:shadow-brass/10 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brass-light shrink-0 group-hover:bg-brass/10 group-hover:border-brass/20 transition-colors">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-sans text-lg font-bold text-ink group-hover:text-brass transition-colors mb-2">
                          {service.title}
                        </h4>
                        {service.description && (
                          <p className="font-sans font-light text-slate text-sm leading-relaxed mb-4">
                            {service.description}
                          </p>
                        )}
                        <span className="font-sans text-sm font-semibold text-brass hover:text-brass-light transition-colors flex items-center gap-1">
                          Inquire about this service <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Side */}
          {skills.length > 0 && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1.5 rounded-full bg-brass-light/10 border border-brass-light/20 text-brass-light font-medium text-xs tracking-wide flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" />
                    Core Competencies
                  </span>
                </div>
                <h3 className="font-sans text-3xl md:text-4xl font-extrabold text-ink">
                  Technical <span className="text-brass-light">Capabilities</span>
                </h3>
              </motion.div>

              <div className="space-y-8">
                {categories.map((category, idx) => {
                  const categorySkills = skills.filter(s => s.category === category);
                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="bg-parchment p-6 rounded-3xl border border-white/5"
                    >
                      <h4 className="font-sans text-sm uppercase tracking-widest text-ink font-semibold mb-4 flex items-center gap-2 pb-3 border-b border-white/5">
                        <Wrench className="w-4 h-4 text-brass" /> {category}
                      </h4>
                      <div className="flex flex-wrap gap-2.5">
                        {categorySkills.slice(0, 6).map(skill => (
                          <span
                            key={skill._id}
                            className="px-4 py-2 bg-white/5 border border-white/10 text-ink-2 text-sm font-sans rounded-xl hover:border-brass hover:text-brass hover:bg-brass/5 transition-colors shadow-sm"
                          >
                            {skill.name}
                          </span>
                        ))}
                        {categorySkills.length > 6 && (
                          <button
                            onClick={() => setExpandedCategory(category)}
                            className="px-4 py-2 bg-transparent border border-dashed border-slate/50 text-slate text-sm font-sans rounded-xl hover:border-brass hover:text-brass transition-colors shadow-sm"
                          >
                            + {categorySkills.length - 6} More
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSubmitting && setSelectedService(null)}
              className="absolute inset-0 bg-page/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg max-h-[90vh] bg-page border border-white/10 shadow-2xl overflow-y-auto rounded-3xl"
            >
              <div className="sticky top-0 bg-page/90 backdrop-blur border-b border-white/5 p-6 flex items-center justify-between z-10">
                <div>
                  <h4 className="font-sans text-[10px] tracking-widest uppercase text-brass mb-1 font-bold">Service Request</h4>
                  <h3 className="font-sans text-2xl font-bold text-ink">Inquire</h3>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 text-slate hover:text-ink hover:bg-white/10 transition-all rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-brass/10 text-brass rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="font-sans text-2xl font-bold text-ink mb-2">Request Received!</h3>
                    <p className="text-slate font-sans">Thank you. I will get back to you shortly to discuss your requirements.</p>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-6">
                    {submitError && (
                      <div className="p-3 bg-red-500/10 text-red-400 text-sm border border-red-500/20 rounded-xl">
                        {submitError}
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-slate mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          className="w-full bg-parchment border border-white/10 p-3.5 font-sans text-ink placeholder-slate/50 focus:outline-none focus:border-brass transition-colors rounded-xl"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-slate mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full bg-parchment border border-white/10 p-3.5 font-sans text-ink placeholder-slate/50 focus:outline-none focus:border-brass transition-colors rounded-xl"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-slate mb-2">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            className="w-full bg-parchment border border-white/10 p-3.5 font-sans text-ink placeholder-slate/50 focus:outline-none focus:border-brass transition-colors rounded-xl"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>

                        <div>
                          <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-slate mb-2">Company</label>
                          <input
                            type="text"
                            name="company"
                            className="w-full bg-parchment border border-white/10 p-3.5 font-sans text-ink placeholder-slate/50 focus:outline-none focus:border-brass transition-colors rounded-xl"
                            placeholder="Acme Corp"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-sans text-xs font-semibold uppercase tracking-wider text-slate mb-2">Service Required *</label>
                        <select
                          name="serviceRequired"
                          required
                          defaultValue={selectedService || ""}
                          className="w-full bg-parchment border border-white/10 p-3.5 font-sans text-ink focus:outline-none focus:border-brass transition-colors appearance-none rounded-xl"
                        >
                          <option value="" disabled>Select a service...</option>
                          {serviceOptions.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brass text-white font-sans text-sm font-bold tracking-wide py-4 hover:bg-brass-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-xl shadow-lg shadow-brass/20"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Request"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Category Skills Modal */}
      <AnimatePresence>
        {expandedCategory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedCategory(null)}
              className="absolute inset-0 bg-page/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-parchment border border-white/10 shadow-2xl overflow-y-auto rounded-3xl"
            >
              <div className="sticky top-0 bg-parchment/90 backdrop-blur border-b border-white/5 p-6 flex items-center justify-between z-10">
                <div>
                  <h4 className="font-sans text-[10px] tracking-widest uppercase text-brass mb-1 font-bold">Skills Category</h4>
                  <h3 className="font-sans text-2xl font-bold text-ink">{expandedCategory}</h3>
                </div>
                <button
                  onClick={() => setExpandedCategory(null)}
                  className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 text-slate hover:text-ink hover:bg-white/10 transition-all rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-3">
                  {skills.filter(s => s.category === expandedCategory).map(skill => (
                    <span
                      key={skill._id}
                      className="px-4 py-2 bg-white/5 border border-white/10 text-ink text-sm font-sans rounded-xl shadow-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
