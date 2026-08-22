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
import Impact from "@/models/Impact";

export async function GET() {
  try {
    await dbConnect();

    // 1. Wipe existing data (keeping User and Resume intact)
    await Promise.all([
      Profile.deleteMany({}),
      Experience.deleteMany({}),
      Skill.deleteMany({}),
      Service.deleteMany({}),
      Project.deleteMany({}),
      Testimonial.deleteMany({}),
      Certification.deleteMany({}),
      Achievement.deleteMany({}),
      Impact.deleteMany({}),
    ]);

    // 2. Profile
    await Profile.create({
      name: "Mynul Islam",
      title: "Full Stack Engineer | AI Full Stack Developer at Cansoft",
      shortIntroduction: "Full Stack Engineer with 3+ years of experience building scalable web applications using React, Next.js, Node.js, TypeScript, and AI tools. Currently working at Cansoft as an AI Full Stack Developer with primary focus on backend architecture, API optimization, and microservices.",
      professionalSummary: "Full Stack Engineer with 3+ years of experience building scalable web applications using React, Next.js, Node.js, and TypeScript. Experienced in designing REST & GraphQL APIs, building reusable frontend components, implementing authentication systems (JWT, RBAC), and optimizing database performance. Strong focus on clean architecture, performance optimization, and delivering production-ready applications.",
      email: "mynul.sakil@gmail.com",
      phone: "+8801581477504",
      location: "Noakhali, Bangladesh",
      linkedin: "linkedin.com/in/mynulislam"
    });

    // 3. Work Experience
    await Experience.insertMany([
      {
        role: "AI Full Stack Developer",
        organization: "Cansoft (https://cansoft.com/)",
        location: "Remote / Canada",
        startDate: "Apr 2026",
        endDate: "Present",
        order: 1,
        responsibilities: [
          "Engineered robust backend services and microservices architecture as primary core focus",
          "Leveraged AI technologies and LLM integrations to enhance full-stack product capabilities",
          "Developed modern, responsive frontend modules when needed for project deliverables",
          "Optimized backend API performance, database query execution, and cache strategies"
        ]
      },
      {
        role: "Full Stack Developer",
        organization: "Aliyah Holdings LLC",
        location: "Remote",
        startDate: "Aug 2024",
        endDate: "Apr 2026",
        order: 2,
        responsibilities: [
          "Developed scalable full-stack web applications using React, Next.js, Node.js, and PostgreSQL/MongoDB",
          "Built reusable frontend components to maintain consistent UI patterns across multiple applications",
          "Designed and implemented RESTful APIs with structured validation and authentication",
          "Implemented JWT-based authentication and role-based access control for secure systems",
          "Optimized database queries and indexing strategies to improve API performance",
          "Integrated third-party services including payment APIs and external business tools",
          "Improved frontend performance using memoization, dynamic imports, and optimized state updates",
          "Collaborated with distributed teams in agile development cycles and code reviews"
        ]
      }
    ]);

    // 4. Skills
    const skillDocs = [
      { name: "React.js", category: "Frontend", order: 1 },
      { name: "Next.js", category: "Frontend", order: 2 },
      { name: "TypeScript", category: "Frontend", order: 3 },
      { name: "JavaScript (ES6+)", category: "Frontend", order: 4 },
      { name: "Tailwind CSS & SCSS", category: "Frontend", order: 5 },
      { name: "Material UI", category: "Frontend", order: 6 },

      { name: "Node.js & Express.js", category: "Backend", order: 1 },
      { name: "RESTful APIs", category: "Backend", order: 2 },
      { name: "GraphQL & tRPC", category: "Backend", order: 3 },
      { name: "JWT Auth & RBAC", category: "Backend", order: 4 },

      { name: "PostgreSQL & Prisma", category: "Databases", order: 1 },
      { name: "MongoDB & Mongoose", category: "Databases", order: 2 },

      { name: "Docker & CI/CD", category: "Tools & DevOps", order: 1 },
      { name: "AWS (EC2, S3) & Linux", category: "Tools & DevOps", order: 2 },
      { name: "Redis Caching", category: "Tools & DevOps", order: 3 },
      { name: "Stripe API Integration", category: "Tools & DevOps", order: 4 },
      { name: "AI Tools (Claude, ChatGPT, Gemini)", category: "Tools & DevOps", order: 5 },
      { name: "Problem Solving (LeetCode, Codeforces)", category: "Tools & DevOps", order: 6 }
    ];
    await Skill.insertMany(skillDocs);

    // 5. Projects
    await Project.insertMany([
      {
        title: "System 3.0 (Gamified Habit Tracker)",
        description: "Full-stack habit tracking system with dynamic stat progression, task tracking, and ranking logic using Next.js, TypeScript, tRPC, Zod, MongoDB, and Mongoose.",
        category: "Full Stack",
        order: 1
      },
      {
        title: "Ticket Fusion (Event Management Platform)",
        description: "Event booking and management platform featuring secure authentication, role-based access control, Stripe payment workflows, Redis caching, and reusable UI components.",
        category: "Web Application",
        order: 2
      },
      {
        title: "Transportation Management System (GQLAB)",
        description: "Enterprise dashboard module for operational tracking, shipment visibility, and large dataset handling built with Next.js, React, GraphQL APIs, and Node.js.",
        category: "Enterprise System",
        order: 3
      },
      {
        title: "Mini Social Feed Mobile App",
        description: "Social feed mobile application built with React Native, Node.js, MongoDB, and Firebase FCM supporting auth, posts, likes, comments, and real-time push notifications.",
        category: "Mobile App",
        order: 4
      }
    ]);

    // 6. Services
    await Service.insertMany([
      {
        title: "Backend API & Microservices",
        description: "Designing scalable RESTful & GraphQL APIs, microservices, database schemas, and robust authentication systems using Node.js, Express, tRPC, and MongoDB/PostgreSQL.",
        order: 1
      },
      {
        title: "Full Stack Web Development",
        description: "End-to-end web application development using Next.js, React, TypeScript, and modern styling solutions for responsive, high-performance web applications.",
        order: 2
      },
      {
        title: "AI Integration & Automation",
        description: "Integrating LLMs, AI APIs (Claude, ChatGPT, Gemini), and automated workflows into web applications for enhanced user experiences and intelligent features.",
        order: 3
      }
    ]);

    // 7. Achievements / Education
    await Achievement.insertMany([
      { title: "B.Sc. in Computer Science - Manarat International University, Dhaka (2020 - 2024)", order: 1 },
      { title: "HSC - Chowmuhani SA College, Noakhali (2018 - 2019 batch)", order: 2 },
      { title: "Competitive Problem Solver on LeetCode, Codeforces & HackerRank", order: 3 }
    ]);

    // 8. Impact Stats
    await Impact.insertMany([
      { value: "3+", label: "Years Experience", order: 1 },
      { value: "10+", label: "Full Stack Apps Built", order: 2 },
      { value: "100%", label: "Backend Production Delivery", order: 3 }
    ]);

    return NextResponse.json({
      success: true,
      message: "Database successfully seeded with Mynul Islam authentic resume data & Cansoft experience!"
    });
  } catch (error: any) {
    console.error("Mynul Seed error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
