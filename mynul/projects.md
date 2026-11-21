# Projects Catalog

Consolidated from Cansoft company repositories, live portfolio database, all 5 resumes, and `github.com/Mynul-Sakil`.

---

## 1. Company / Production Flagship Project

### Clinic Booking & Scheduling SaaS (`emmai.ca`) — Cansoft Technology
- **Live Links**:
  - Main App: https://emmai.ca
  - Multi-Tenant Clinic Subdomain: https://abc.emmai.ca
- **Repositories (Private — Cansoft Organization)**:
  - Backend: `Cansoft-Technologies/clinic-booking-app-backend`
  - Frontend: `Cansoft-Technologies/clinic-booking-app-frontend`
- **Category**: Enterprise Multi-Tenant SaaS / Full Stack & Backend
- **Tech Stack**:
  - **Backend**: Node.js, Express, TypeScript, PostgreSQL (Supabase), Redis (`ioredis`), BullMQ, CASL (`@casl/ability`), JWT/JWKS, Google APIs (OAuth & Calendar), `ics` (iCal), Socket.io, Stripe, AWS S3, Vercel Blob, Nodemailer/IMAPFlow, Winston, Zod, Swagger/OpenAPI, Jest, Supertest, Playwright.
  - **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Redux Toolkit, Radix UI, CASL React, React Big Calendar, Jitsi Telehealth SDK (`@jitsi/react-sdk`), Stripe JS, Socket.io Client, Recharts, React PDF / jsPDF, Signature Canvas, DnD Kit.
- **Key Highlights**:
  - Multi-tenant clinic architecture with subdomain routing, isolated clinic instances, and dynamic base URLs.
  - Granular CASL-based RBAC (owner, practitioner, patient roles) and PostgreSQL trigger-based HIPAA/PIPEDA forensic audit logging.
  - Asynchronous job queues (BullMQ + Redis) for background tasks, calendar sync (Google Calendar OAuth & `.ics`), and email notifications.
  - Complex reporting & aggregation engine for operational metrics, daily revenue trends, and practitioner analytics.
  - Integrated telehealth video consultations (Jitsi), Stripe billing, digital signatures, and PDF generation.

---

## 2. Featured Portfolio & Resume Projects

### DevTools Hub — Developer Utilities Suite
- **Live**: https://devtools-hub-navy.vercel.app/
- **GitHub**: https://github.com/Mynul-Sakil/Dev-Tools-2 *(Public)*
- **Category**: Web Application / Developer Productivity
- **Tech Stack**: Next.js, React, TypeScript, Tailwind CSS, Lucide Icons
- **Highlights**:
  - Browser-based developer toolkit featuring JSON Formatter & Validator, Image Editor, Font Picker, and Markdown-to-LinkedIn formatter.
  - Light/dark theme support and instant client-side processing with zero backend latency.

### Tap Kill — Native Android Arcade Game
- **Google Play Store**: https://play.google.com/store/apps/details?id=com.mynul.tapkill
- **GitHub**: https://github.com/Mynul-Sakil/tap-kill *(Private)*
- **Category**: Android · Google Play (v1.2.0, SDK 36)
- **Tech Stack**: Kotlin, Android SDK, Gradle
- **Highlights**:
  - Published native Android arcade game featuring wave-based gameplay, interactive tutorial, tactile haptic vibration feedback, and local high-score persistence.
  - Privacy-first architecture with zero data collection or tracking.

### AI Task Organizer — Smart AI Prioritization App
- **Live**: https://ai-task-organizer-psi.vercel.app/
- **GitHub**: https://github.com/Mynul-Sakil/ai-task-organizer *(Public)*
- **Category**: Full Stack AI Application
- **Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, Node.js, Express, Zod, Google Gemini API, Vercel
- **Highlights**:
  - Full-stack monorepo that sends user tasks to a secure Express/TypeScript backend (`POST /prioritize`) calling the Google Gemini API with strict JSON prompting to categorize and sort tasks into High/Medium/Low priorities.
  - Built-in resilient backend fallback prioritizer that handles Gemini quota/rate-limit errors gracefully, plus localStorage snapshot persistence and mobile-responsive UI.

### System 3.0 (Gamified Habit Engine)
- **Live**: https://system-3-6czj.vercel.app/
- **GitHub**: https://github.com/Mynul-Sakil/system-3.0 *(Private)*
- **Category**: Full Stack Web Application
- **Tech Stack**: Next.js, TypeScript, tRPC, Zod, MongoDB, Mongoose
- **Highlights**:
  - End-to-end type-safe APIs using tRPC and Zod with zero runtime contract mismatches.
  - Gamified habit tracking with dynamic stat progression, nested document schemas, and real-time user ranking leaderboards.

### Ticket Fusion (Event Booking & Management Platform)
- **Live**: https://ticketfusion-ui.vercel.app/
- **GitHub**:
  - Frontend: https://github.com/Mynul-Sakil/ticketfusion-ui
  - Backend: https://github.com/Mynul-Sakil/ticketfusion-server (`https://ticketfusion-server.vercel.app`)
- **Category**: Full Stack / Web Application
- **Tech Stack**: Next.js, TypeScript, Node.js, tRPC, MongoDB, Mongoose, Redis, Stripe
- **Highlights**:
  - End-to-end event booking and ticketing architecture with multi-tier authentication and RBAC.
  - Redis caching on event inventory and ticket availability endpoints to prevent race conditions during concurrent checkouts.
  - Stripe payment workflows and dashboards with filtering and pagination for large datasets.

### Transportation Management System (GQLAB)
- **Live**: https://gqlab.vercel.app/
- **GitHub**: https://github.com/Mynul-Sakil/GQLAB *(Public)*
- **Category**: Enterprise System / GraphQL Full Stack
- **Tech Stack**: Next.js, React, TypeScript, Node.js, GraphQL, PostgreSQL
- **Highlights**:
  - Flexible GraphQL APIs for operational transit dashboards and shipment visibility.
  - Server-side filtering, sorting, cursor-based pagination, and role-based UI rendering for large transportation datasets.

### Mini Social Feed Mobile App
- **GitHub**: https://github.com/Mynul-Sakil/Mini-social-feed-github_show *(Public)*
- **Category**: Mobile App (Full Stack)
- **Tech Stack**: React Native, Expo, Node.js, Express, MongoDB, JWT, AsyncStorage, Firebase Cloud Messaging (FCM)
- **Highlights**:
  - Full-stack mobile social feed with persistent JWT auth, post creation, likes, comments, pull-to-refresh, and real-time FCM push notifications + notification history.

### Hanzalbd (E-Commerce Platform)
- **Live**: https://hanzal.vercel.app/
- **GitHub**: https://github.com/Mynul-Sakil/hanzal *(Private)*
- **Category**: E-Commerce / Full Stack
- **Tech Stack**: Next.js, TypeScript, tRPC, MongoDB, Mongoose
- **Highlights**:
  - Full product browsing, filtering, shopping cart, and responsive checkout experience across mobile and desktop.

### Meal App (Recipe Mobile Application)
- **GitHub**: https://github.com/Mynul-Sakil/meal-app *(Public)*
- **Category**: Mobile App
- **Tech Stack**: React Native, Expo, Redux Toolkit, React Navigation (Drawer + Stack)
- **Highlights**:
  - Category browsing, dietary filtering, detailed recipe views, and Redux Toolkit favorites management.

### AI Photo Recognition & Image Classification Engine
- **Category**: Computer Vision / AI Backend
- **Tech Stack**: Python, OpenCV, Node.js, REST API
- **Highlights**:
  - Image recognition pipeline for feature extraction and object categorization in visual media.
  - Asynchronous REST endpoints to process, tag, and organize photo uploads for downstream consumers.

---

## 3. Additional Notable GitHub Projects (`Mynul-Sakil`)

| Project | Visibility | Tech | Links |
|---|---|---|---|
| **Task Management System (NestJS + Next.js)** | Public | TypeScript, NestJS, Next.js, Docker | [Repo](https://github.com/Mynul-Sakil/Task-management-system) |
| **Task Manager FastAPI** | Public | Python, FastAPI, JavaScript | [Repo](https://github.com/Mynul-Sakil/Task-Manager-fastAPI) |
| **AI Task Organizer** | Public | TypeScript, Next.js | [Live](https://ai-task-organizer-psi.vercel.app) · [Repo](https://github.com/Mynul-Sakil/ai-task-organizer) |
| **Dev Tools Hub (v2 & v1)** | Public | TypeScript, Next.js | [Live](https://devtools-hub-navy.vercel.app) · [Repo](https://github.com/Mynul-Sakil/Dev-Tools-2) |
| **RealtimeHub** | Public | TypeScript | [Repo](https://github.com/Mynul-Sakil/realtimehub) |
| **FreshBite** | Public | TypeScript, Next.js | [Live](https://fresh-bite-mynul.vercel.app/) · [Repo](https://github.com/Mynul-Sakil/FreshBite) |
| **File Organizer App (macOS)** | Public | JavaScript, Electron.js | [Repo](https://github.com/Mynul-Sakil/file-organizer-app-mac) |
| **Portfolio v3 (Previous)** | Public | TypeScript, Next.js, MongoDB, Nodemailer | [Live](https://mynul-sakil-portfolio.vercel.app/) · [Repo](https://github.com/Mynul-Sakil/portfolio-mynul-3) |
| **Portfolio Customize (Current)** | Public | TypeScript, Next.js 16, MongoDB, Tailwind v4 | [Live](https://protfolio-customize.vercel.app) · [Repo](https://github.com/Mynul-Sakil/protfolio-customize) |
| **Easy Bazaar** | Public | React, React Router, Node.js, Express, MongoDB, Firebase Auth, JWT | [Live](https://easy-bazar-ui.vercel.app/) · [Client](https://github.com/Mynul-Sakil/easy-bazar-ui) · [Server](https://github.com/Mynul-Sakil/easy-bazar-server) |
| **Battle Toys** | Public | Next.js, MongoDB (Seller Dashboard & Inventory) | [Live](https://battle-toys-5a066.web.app/) |
| **DevTools Pro (v1)** | Public | React, Tailwind CSS | [Live](https://devtools-pro.netlify.app/) |
| **70Languages.com** | Production (Aliyah Holdings) | React, Tailwind CSS, Node.js, Socket.io, ChatGPT API, Google Translate API | Production Client Platform |
| **Socket Chat App** | Public | React, Node.js, Express, Socket.io | Earlier Real-Time Chat Project |
