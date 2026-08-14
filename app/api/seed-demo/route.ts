import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Profile from "@/models/Profile";
import Experience from "@/models/Experience";
import Skill from "@/models/Skill";
import Service from "@/models/Service";
import Project from "@/models/Project";
import Testimonial from "@/models/Testimonial";
import Certification from "@/models/Certification";
import Achievement from "@/models/Achievement";

export async function GET() {
  try {
    await dbConnect();

    // 1. Wipe old data (leaving User and Resume intact)
    await Promise.all([
      Profile.deleteMany({}),
      Experience.deleteMany({}),
      Skill.deleteMany({}),
      Service.deleteMany({}),
      Project.deleteMany({}),
      Testimonial.deleteMany({}),
      Certification.deleteMany({}),
      Achievement.deleteMany({}),
    ]);

    // 2. Insert Profile
    await Profile.create({
      name: "MD Rakibul Islam Sabbir",
      title: "Marketing Executive working across business development, partnerships and student recruitment in Australia's international education sector.",
      shortIntroduction: "Results-driven marketing executive with experience in business development, partnership management, education marketing, student recruitment, admissions and visa support within Australia's international education sector — building strategic partnerships, generating leads, and using AI-assisted marketing to drive growth.",
      professionalSummary: "Results-driven marketing executive with experience in business development, partnership management, education marketing, student recruitment, admissions and visa support within Australia's international education sector — building strategic partnerships, generating leads, and using AI-assisted marketing to drive growth.",
      email: "adrakib0@gmail.com",
      phone: "+61 491 767 377",
      location: "Sydney, NSW",
      linkedin: "linkedin.com/in/islamsabbir"
    });

    // 3. Insert Experience
    await Experience.insertMany([
      {
        role: "Marketing Executive",
        organization: "Australian Polytechnic College · Monash Polytechnic College, Sydney",
        startDate: "Mar 2026",
        endDate: "Present",
        responsibilities: [
          "Develop and execute marketing strategies to increase student enrolments",
          "Build partnerships with domestic and international education agents",
          "Conduct market and competitor analysis; generate leads for student recruitment",
          "Develop new education products, HTML email campaigns and promotional materials",
          "Use AI tools (ChatGPT, Microsoft Copilot) to support marketing content",
          "Represent the colleges in business development and partnership meetings"
        ]
      },
      {
        role: "Student Counsellor & Admissions Officer (Part-Time)",
        organization: "One Career, Sydney",
        startDate: "Jul 2024",
        endDate: "Mar 2026",
        responsibilities: [
          "Managed end-to-end student admissions and CoE processing",
          "Prepared Subclass 500, 485 and Subsequent Entrant visa documentation",
          "Maintained records using AgentCis CRM and Microsoft SharePoint",
          "Liaised with education providers and supported recruitment initiatives"
        ]
      },
      {
        role: "Warehouse Supervisor",
        organization: "Linda's Discount Warehouse, Bankstown",
        startDate: "Feb 2024",
        endDate: "Feb 2026",
        responsibilities: [
          "Supervised warehouse operations and team performance",
          "Managed inventory, stock control and order fulfilment",
          "Ensured WHS compliance and operational efficiency"
        ]
      }
    ]);

    // 4. Insert Skills
    const coreSkills = [
      "Business Development", "Partnership Management", "Market Analysis", 
      "Education Marketing", "Lead Generation & Sales", "Product Development", 
      "Student Recruitment & Admissions", "Stakeholder Relationship Management"
    ];
    const otherSkills = [
      "Communication", "Media Work"
    ];
    const techSkills = [
      "Microsoft Office Suite", "SharePoint", "AgentCis CRM", "Google Workspace", 
      "ChatGPT & Copilot", "HTML Email Marketing", "Social Media Marketing", 
      "Data Analysis & Reporting"
    ];

    const skillDocs = [
      ...coreSkills.map((s, i) => ({ name: s, category: "Core Competencies", order: i })),
      ...otherSkills.map((s, i) => ({ name: s, category: "Other Skills", order: i })),
      ...techSkills.map((s, i) => ({ name: s, category: "Technical Skills", order: i }))
    ];
    await Skill.insertMany(skillDocs);

    // 5. Insert Education/Leadership as Achievements
    await Achievement.insertMany([
      { title: "Bachelor of Information Technology and Systems - VIT", order: 1 },
      { title: "College Captain (2018-2020)", order: 2 },
      { title: "Student Executive - IUBAT Relationship Wing (2021-2023)", order: 3 },
      { title: "Football Team Captain (2012-2017)", order: 4 }
    ]);
    
    // 6. Insert Demo Projects
    await Project.insertMany([
      {
        title: "Marketing Campaign Analytics",
        description: "A comprehensive analysis of recent marketing campaigns to optimize student recruitment efforts.",
        category: "Marketing",
        order: 1
      },
      {
        title: "Partnership Growth Strategy",
        description: "Developed and executed a strategy to build partnerships with international education agents.",
        category: "Business Development",
        order: 2
      }
    ]);

    return NextResponse.json({ success: true, message: "Database successfully seeded with MD Rakibul Islam Sabbir real data!" });
  } catch (error: any) {
    console.error("Seed error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
