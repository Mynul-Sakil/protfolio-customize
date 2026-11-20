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

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://protfolio-customize.vercel.app";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: profile?.name || "Mynul Islam",
        jobTitle:
          profile?.title || "Full Stack & Backend Software Engineer",
        description: profile?.shortIntroduction,
        url: SITE_URL,
        image: profile?.photoUrl || undefined,
        email: profile?.email ? `mailto:${profile.email}` : undefined,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Noakhali",
          addressCountry: "BD",
        },
        worksFor: {
          "@type": "Organization",
          name: "Cansoft Technology",
          url: "https://cansoft.com",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Manarat International University",
        },
        sameAs: [
          profile?.linkedin || "https://www.linkedin.com/in/mynul-islam-sakil/",
          "https://github.com/Mynul-Sakil",
          "https://leetcode.com/u/mynul47/",
          "https://codeforces.com/profile/Sakil470004",
          "https://www.hackerrank.com/profile/mynul_sakil",
        ],
        knowsAbout: [
          "Node.js",
          "TypeScript",
          "Next.js",
          "React",
          "PostgreSQL",
          "MongoDB",
          "Redis",
          "BullMQ",
          "Multi-Tenant SaaS Architecture",
          "REST APIs",
          "GraphQL",
          "Docker",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Mynul Islam — Portfolio",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-page selection:bg-brass selection:text-white font-sans text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
