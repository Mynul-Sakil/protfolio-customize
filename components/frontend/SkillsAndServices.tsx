"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench, CheckCircle, ArrowRight, X } from "lucide-react";
import { createBooking } from "@/actions/booking";

interface SkillsServicesProps {
  skills: any[];
  services: any[];
}

export default function SkillsAndServices({ skills, services }: SkillsServicesProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const serviceOptions = [
    "Business Development",
    "Agent/Partner Management",
    "Marketing Materials / Brochure",
    "Lead Generation",
    "Consultation",
    "Visa Lodge"
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
      <section id="services" className="py-24 bg-parchment border-y border-line">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
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
                <h2 className="font-mono text-sm uppercase tracking-widest text-brass mb-2">What I Do</h2>
                <h3 className="font-serif text-4xl font-semibold text-ink">Services.</h3>
              </motion.div>

              <div className="space-y-6">
                {services.map((service, index) => (
                  <motion.div 
                    key={service._id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setSelectedService(service.title)}
                    className="bg-page border border-line p-6 rounded-sm shadow-sm hover:border-brass transition-colors group cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <CheckCircle className="w-5 h-5 text-brass" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif text-xl font-semibold text-ink group-hover:text-brass transition-colors mb-2">
                          {service.title}
                        </h4>
                        {service.description && (
                          <p className="font-sans text-slate text-sm leading-relaxed mb-4">
                            {service.description}
                          </p>
                        )}
                        <span className="font-mono text-[10px] uppercase tracking-widest text-brass hover:text-ink transition-colors flex items-center gap-1">
                          Book Service <ArrowRight className="w-3 h-3" />
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
                <h2 className="font-mono text-sm uppercase tracking-widest text-brass mb-2">My Toolkit</h2>
                <h3 className="font-serif text-4xl font-semibold text-ink">Skills.</h3>
              </motion.div>

              <div className="space-y-10">
                {categories.map((category, idx) => {
                  const categorySkills = skills.filter(s => s.category === category);
                  return (
                    <motion.div 
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <h4 className="font-mono text-xs uppercase tracking-widest text-slate mb-4 flex items-center gap-2">
                        <Wrench className="w-3 h-3 text-brass" /> {category}
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {categorySkills.map(skill => (
                          <span 
                            key={skill._id}
                            className="px-4 py-2 bg-page border border-line text-ink text-sm font-sans rounded-full hover:border-brass hover:text-brass transition-colors cursor-default shadow-sm"
                          >
                            {skill.name}
                          </span>
                        ))}
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
              onClick={closeModal}
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg max-h-[90vh] bg-page border border-line shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-page/90 backdrop-blur border-b border-line p-6 flex items-center justify-between z-10">
                <div>
                  <h4 className="font-mono text-[10px] tracking-widest uppercase text-brass mb-1">Service Request</h4>
                  <h3 className="font-serif text-2xl font-semibold text-ink">Book a Service</h3>
                </div>
                <button 
                  onClick={closeModal}
                  className="w-8 h-8 flex items-center justify-center bg-parchment border border-line text-slate hover:text-ink hover:border-brass transition-all"
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
                    <h3 className="font-serif text-2xl font-semibold text-ink mb-2">Request Received!</h3>
                    <p className="text-slate font-sans">Thank you. I will get back to you shortly to discuss your requirements.</p>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-6">
                    {submitError && (
                      <div className="p-3 bg-red-50 text-red-600 text-sm border border-red-200">
                        {submitError}
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block font-mono text-[10px] tracking-widest uppercase text-slate mb-2">Full Name *</label>
                        <input 
                          type="text" 
                          name="fullName" 
                          required 
                          className="w-full bg-parchment border border-line p-3 font-sans text-ink focus:outline-none focus:border-brass transition-colors"
                        />
                      </div>
                      
                      <div>
                        <label className="block font-mono text-[10px] tracking-widest uppercase text-slate mb-2">Email Address *</label>
                        <input 
                          type="email" 
                          name="email" 
                          required 
                          className="w-full bg-parchment border border-line p-3 font-sans text-ink focus:outline-none focus:border-brass transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-mono text-[10px] tracking-widest uppercase text-slate mb-2">Phone / WhatsApp</label>
                          <input 
                            type="tel" 
                            name="phone" 
                            className="w-full bg-parchment border border-line p-3 font-sans text-ink focus:outline-none focus:border-brass transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block font-mono text-[10px] tracking-widest uppercase text-slate mb-2">Company / Org</label>
                          <input 
                            type="text" 
                            name="company" 
                            className="w-full bg-parchment border border-line p-3 font-sans text-ink focus:outline-none focus:border-brass transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] tracking-widest uppercase text-slate mb-2">Service Required *</label>
                        <select 
                          name="serviceRequired" 
                          required 
                          defaultValue={selectedService || ""}
                          className="w-full bg-parchment border border-line p-3 font-sans text-ink focus:outline-none focus:border-brass transition-colors appearance-none"
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
                      className="w-full bg-ink text-page font-mono text-xs uppercase tracking-widest py-4 hover:bg-brass transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
    </>
  );
}
