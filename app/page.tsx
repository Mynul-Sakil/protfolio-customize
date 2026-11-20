import Navbar from "@/components/frontend/Navbar";
import HeroSection from "@/components/frontend/HeroSection";
import ImpactSection from "@/components/frontend/ImpactSection";
import ProjectsSection from "@/components/frontend/ProjectsSection";
import ExperienceSection from "@/components/frontend/ExperienceSection";
import SkillsAndServices from "@/components/frontend/SkillsAndServices";
import AboutSection from "@/components/frontend/AboutSection";
import MarqueeSection from "@/components/frontend/MarqueeSection";
import TestimonialsSection from "@/components/frontend/TestimonialsSection";
import ContactSection from "@/components/frontend/ContactSection";
import Footer from "@/components/frontend/Footer";

// Server Actions to fetch data
import { getProfile } from "@/actions/profile";
import { getExperiences } from "@/actions/experience";
import { getSkills } from "@/actions/skill";
import { getServices } from "@/actions/service";
import { getProjects } from "@/actions/project";
import { getCertifications } from "@/actions/certification";
import { getAchievements } from "@/actions/achievement";
import { getTestimonials } from "@/actions/testimonial";
import { getImpactStats } from "@/actions/impact";

export default async function Home() {
  const [
    profile,
    experiences,
    skills,
    services,
    projects,
    certifications,
    achievements,
    testimonials,
    impactStats,
  ] = await Promise.all([
    getProfile(),
    getExperiences(),
    getSkills(),
    getServices(),
    getProjects(),
    getCertifications(),
    getAchievements(),
    getTestimonials(),
    getImpactStats(),
  ]);

  return (
    <main className="min-h-screen bg-page selection:bg-brass selection:text-white font-sans text-ink">
      <Navbar />

      <HeroSection profile={profile} />

      <ImpactSection stats={impactStats || []} />

      <ProjectsSection projects={projects || []} />

      <ExperienceSection experiences={experiences || []} />

      <SkillsAndServices skills={skills || []} services={services || []} />

      <AboutSection profile={profile} />

      <MarqueeSection
        certifications={certifications || []}
        achievements={achievements || []}
      />

      <TestimonialsSection testimonials={testimonials || []} />

      <ContactSection profile={profile} />

      <Footer />
    </main>
  );
}
