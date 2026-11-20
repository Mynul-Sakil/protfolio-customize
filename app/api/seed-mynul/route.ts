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

const DEFAULT_PHOTO_URL =
  "https://res.cloudinary.com/kaddfemv/image/upload/v1795201485/knrwi4zozlrps6gehb10.png";

export async function GET() {
  try {
    await dbConnect();

    const existingProfile = await Profile.findOne({});
    const preservedHistory =
      existingProfile?.photoHistory?.length > 0
        ? existingProfile.photoHistory
        : [
            {
              url: DEFAULT_PHOTO_URL,
              version: 1,
              label: "Default Photo",
              isDefault: true,
              savedAt: new Date(),
            },
          ];

    // 1. Wipe existing portfolio collections (keeping User and Resume intact)
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
      title: "Full Stack & Backend Software Engineer · AI Full Stack Developer at Cansoft Technology",
      shortIntroduction:
        "Software Engineer with 2+ years of experience building multi-tenant SaaS backends, high-throughput APIs, and modern React/Next.js products. I help companies ship reliable software faster while keeping infrastructure costs, latency, and security risks low.",
      professionalSummary:
        "Backend-focused Full Stack Software Engineer with 2+ years of production experience building scalable microservices, multi-tenant SaaS architectures, REST/GraphQL/tRPC APIs, and modern React/Next.js applications using TypeScript, Node.js, PostgreSQL, MongoDB, Redis, and Docker. Proven track record delivering HIPAA/PIPEDA-ready audit logging, granular RBAC (CASL, JWT), BullMQ background job queues, Stripe payment automation, and AI-enabled workflows for distributed teams.",
      email: "mynul.sakil@gmail.com",
      phone: "+8801581477504",
      location: "Noakhali, Bangladesh",
      linkedin: "https://www.linkedin.com/in/mynul-islam-sakil/",
      photoUrl: existingProfile?.photoUrl || DEFAULT_PHOTO_URL,
      photoHistory: preservedHistory,
      resumeUrl: "",
    });

    // 3. Work Experience
    await Experience.insertMany([
      {
        role: "AI Full Stack Developer / Backend Engineer",
        organization: "Cansoft Technology (cansoft.com)",
        location: "Remote / Canada",
        startDate: "Apr 2026",
        endDate: "Present",
        order: 1,
        responsibilities: [
          "Architected multi-tenant SaaS backend supporting subdomain routing, dynamic base URLs, and isolated clinic data instances (emmai.ca / abc.emmai.ca) using Node.js, Express, TypeScript, and PostgreSQL (Supabase)",
          "Engineered high-performance reporting and aggregation modules for operational metrics, daily revenue trends, and practitioner analytics across large datasets",
          "Implemented asynchronous task queues and caching with Redis (ioredis) and BullMQ to reduce API latency and database load during high-concurrency traffic",
          "Built bi-directional calendar synchronization via Google OAuth 2.0 and dynamic .ics generation for doctors and patients",
          "Enforced granular RBAC with CASL and PostgreSQL trigger-based forensic audit logging for HIPAA/PIPEDA compliance",
          "Standardized CI/CD pipelines with GitHub Actions, containerized services with Docker, and automated E2E/API testing with Playwright and Jest",
        ],
      },
      {
        role: "Full Stack / Backend Developer",
        organization: "Aliyah Holdings LLC",
        location: "Remote",
        startDate: "Aug 2024",
        endDate: "Apr 2026",
        order: 2,
        responsibilities: [
          "Designed and scaled modular full-stack web applications and REST/GraphQL APIs using React, Next.js, Node.js, Express, TypeScript, PostgreSQL, and MongoDB",
          "Implemented JWT authentication and role-based access control (RBAC) for secure multi-tenant user workflows",
          "Optimized PostgreSQL and MongoDB schemas with strategic indexing and query tuning to reduce response latency on high-traffic endpoints",
          "Integrated Stripe API for automated invoice billing, transaction webhooks, and split-payment routing",
          "Introduced Redis caching for frequently requested endpoints to eliminate database bottlenecks during traffic spikes",
          "Built reusable UI component libraries and responsive mobile-friendly layouts with memoization and code splitting",
        ],
      },
    ]);

    // 4. Skills
    const skillDocs = [
      { name: "Node.js & Express.js", category: "Backend & APIs", order: 1 },
      { name: "TypeScript & JavaScript (ES6+)", category: "Backend & APIs", order: 2 },
      { name: "REST, GraphQL & tRPC", category: "Backend & APIs", order: 3 },
      { name: "Multi-Tenant SaaS & Microservices", category: "Backend & APIs", order: 4 },
      { name: "JWT, Google OAuth & CASL RBAC", category: "Backend & APIs", order: 5 },
      { name: "NestJS & FastAPI (Python)", category: "Backend & APIs", order: 6 },

      { name: "PostgreSQL (Supabase) & Prisma", category: "Databases & Queues", order: 1 },
      { name: "MongoDB & Mongoose", category: "Databases & Queues", order: 2 },
      { name: "Redis Caching & BullMQ Queues", category: "Databases & Queues", order: 3 },
      { name: "Schema Design, Indexing & Audit Triggers", category: "Databases & Queues", order: 4 },

      { name: "React.js & Next.js", category: "Frontend & Mobile", order: 1 },
      { name: "React Native & Expo", category: "Frontend & Mobile", order: 2 },
      { name: "Tailwind CSS, SCSS & Radix/MUI", category: "Frontend & Mobile", order: 3 },
      { name: "Redux Toolkit & React Query", category: "Frontend & Mobile", order: 4 },

      { name: "Docker & GitHub Actions (CI/CD)", category: "Cloud, DevOps & AI", order: 1 },
      { name: "AWS (EC2, S3) & Linux", category: "Cloud, DevOps & AI", order: 2 },
      { name: "Stripe Payments & Socket.io", category: "Cloud, DevOps & AI", order: 3 },
      { name: "Playwright, Jest & Swagger/OpenAPI", category: "Cloud, DevOps & AI", order: 4 },
      { name: "AI / LLM Integration & OpenCV", category: "Cloud, DevOps & AI", order: 5 },
    ];
    await Skill.insertMany(skillDocs);

    // 5. Projects
    await Project.insertMany([
      {
        title: "Clinic Booking & Scheduling SaaS (Emmai)",
        description:
          "Multi-tenant healthcare scheduling and telehealth platform (emmai.ca & abc.emmai.ca) built with Node.js, Express, TypeScript, Next.js, PostgreSQL (Supabase), Redis/BullMQ, CASL RBAC, Google Calendar OAuth, Stripe billing, Jitsi video consultations, and HIPAA/PIPEDA forensic audit logging.",
        category: "Multi-Tenant SaaS",
        link: "https://emmai.ca",
        order: 1,
      },
      {
        title: "Ticket Fusion — Event & Booking Platform",
        description:
          "End-to-end event ticketing and management platform built with Next.js, TypeScript, Node.js, tRPC, MongoDB, Redis, and Stripe. Features multi-tier authentication, race-condition-safe Redis inventory caching, Stripe checkout workflows, and high-volume admin dashboards.",
        category: "Full Stack SaaS",
        link: "https://ticketfusion-ui.vercel.app/",
        order: 2,
      },
      {
        title: "System 3.0 — Gamified Habit Engine",
        description:
          "Full-stack habit tracking platform built with Next.js, TypeScript, tRPC, Zod, and MongoDB. Features end-to-end type-safe APIs, dynamic stat progression calculations, and real-time ranking leaderboards.",
        category: "Full Stack Web",
        link: "https://system-3-6czj.vercel.app/",
        order: 3,
      },
      {
        title: "Transportation Management System (GQLAB)",
        description:
          "Enterprise transit operations dashboard built with Next.js, React, Node.js, GraphQL, and PostgreSQL. Supports server-side filtering, sorting, cursor-based pagination, and role-based access for large logistics datasets.",
        category: "Enterprise System",
        link: "https://gqlab.vercel.app/",
        order: 4,
      },
      {
        title: "Mini Social Feed Mobile App",
        description:
          "Cross-platform social mobile app built with React Native, Expo, Node.js, Express, MongoDB, and Firebase Cloud Messaging (FCM). Includes persistent JWT auth, posts, likes, comments, and real-time push notifications.",
        category: "Mobile App",
        link: "https://github.com/Mynul-Sakil/Mini-social-feed-github_show",
        order: 5,
      },
      {
        title: "Hanzalbd — E-Commerce Platform",
        description:
          "Responsive online storefront built with Next.js, TypeScript, tRPC, and MongoDB featuring product discovery, multi-criteria filtering, persistent cart management, and streamlined checkout.",
        category: "E-Commerce",
        link: "https://hanzal.vercel.app/",
        order: 6,
      },
    ]);

    // 6. Services
    await Service.insertMany([
      {
        title: "Backend Architecture & Multi-Tenant SaaS",
        description:
          "Designing reliable REST, GraphQL, and tRPC APIs, multi-tenant PostgreSQL/MongoDB schemas, Redis/BullMQ queues, Stripe billing, and compliant RBAC security systems.",
        order: 1,
      },
      {
        title: "Full Stack Web & Mobile Delivery",
        description:
          "Shipping fast, maintainable customer-facing web applications (Next.js, React, TypeScript) and cross-platform mobile apps (React Native, Expo) ready for real business traffic.",
        order: 2,
      },
      {
        title: "Performance Optimization & AI Workflows",
        description:
          "Auditing slow queries and endpoints, introducing caching and automated CI/CD/testing pipelines, and integrating LLM/AI capabilities that save operational time.",
        order: 3,
      },
    ]);

    // 7. Achievements / Education
    await Achievement.insertMany([
      {
        title: "B.Sc. in Computer Science — Manarat International University, Dhaka (Jan 2020 – Apr 2024)",
        order: 1,
      },
      {
        title: "Higher Secondary Certificate (HSC) — Chowmuhani SA College, Noakhali (2018 – 2019)",
        order: 2,
      },
      {
        title: "Active Competitive Programmer on LeetCode, Codeforces & HackerRank",
        order: 3,
      },
    ]);

    // 8. Impact Stats
    await Impact.insertMany([
      { value: "2+", label: "Years Production Experience", order: 1 },
      { value: "10+", label: "Production Apps Delivered", order: 2 },
      { value: "Multi-Tenant", label: "HIPAA/PIPEDA SaaS Architecture", order: 3 },
      { value: "100%", label: "Remote Delivery Track Record", order: 4 },
    ]);

    return NextResponse.json({
      success: true,
      message: "Database successfully seeded with Mynul Islam's confirmed portfolio data!",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Seed error";
    console.error("Mynul Seed error:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
