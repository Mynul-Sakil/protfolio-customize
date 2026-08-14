import Navbar from "@/components/frontend/Navbar";
import HeroSection from "@/components/frontend/HeroSection";
import AboutSection from "@/components/frontend/AboutSection";
import ExperienceSection from "@/components/frontend/ExperienceSection";
import ImpactSection from "@/components/frontend/ImpactSection";
import SkillsAndServices from "@/components/frontend/SkillsAndServices";
import ProjectsSection from "@/components/frontend/ProjectsSection";
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
  // Fetch all data in parallel
  const [
    profile, 
    experiences, 
    skills, 
    services, 
    projects, 
    certifications, 
    achievements, 
    testimonials,
    impactStats
  ] = await Promise.all([
    getProfile(),
    getExperiences(),
    getSkills(),
    getServices(),
    getProjects(),
    getCertifications(),
    getAchievements(),
    getTestimonials(),
    getImpactStats()
  ]);

  return (
    <main className="min-h-screen bg-page selection:bg-brass selection:text-page font-sans text-ink">
      <Navbar />
      
      <HeroSection profile={profile} />
      
      <AboutSection profile={profile} />
      
      <ExperienceSection experiences={experiences || []} />

      <ImpactSection stats={impactStats || []} />
      
      <SkillsAndServices skills={skills || []} services={services || []} />
      
      <ProjectsSection projects={projects || []} />
      
      <MarqueeSection certifications={certifications || []} achievements={achievements || []} />
      
      <TestimonialsSection testimonials={testimonials || []} />
      
      <ContactSection profile={profile} />
      
      <Footer />
    </main>
  );
}
