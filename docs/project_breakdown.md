# Project Breakdown & Development Roadmap
**Sabbir's Portfolio & CMS**

This document breaks down the development process into manageable phases based on the `project_details.md`, `project-information.txt`, and the styling from `sabbir-portfolio1.html`.

---

## Phase 1: Project Setup & Global Architecture
1. **Next.js & Tailwind CSS Initialization**
   - Configure Next.js with App Router.
   - Setup Tailwind CSS, including the custom color palette (Ink, Parchment, Page, Brass/Gold, Slate) and fonts (Fraunces, IBM Plex Sans, JetBrains Mono).
2. **Database Connection**
   - Connect Next.js to MongoDB using Mongoose.
3. **Authentication Setup**
   - Secure the Admin Panel using NextAuth.js (or similar) to prevent unauthorized access.

## Phase 2: Database Models & APIs
1. **Mongoose Schemas**
   - Create schemas for: User (Admin), Profile Info, Experience, Skills, Services, Projects, Certifications, Achievements, Partnerships, Testimonials, and Contact Messages.
2. **API Routes / Server Actions**
   - Create CRUD operations (Create, Read, Update, Delete) for the CMS dashboard.
   - Create public-facing fetch functions for the visitor website.

## Phase 3: The Admin Panel (CMS)
1. **Dashboard Layout**
   - Build a secure, responsive sidebar navigation for the CMS.
2. **Content Management Pages**
   - Develop forms to add/edit/delete: Profile details, Experience, Skills, Services, etc.
3. **File Upload Handling**
   - Setup an image/file upload service for Resumes, Certificates, and Achievement photos.
4. **Contact Enquiries View**
   - A page to read and manage messages submitted via the visitor contact form.

## Phase 4: Visitor-Facing Website (Frontend)
1. **Global Layout & Navigation**
   - Sticky navbar, footer, and responsive wrapper.
2. **Hero Section & About Me**
   - Build the typography-heavy header with the animated "stamp" and professional photo.
3. **Experience, Skills & Services**
   - Develop the ledger-style experience timeline and skills grid.
4. **Projects, Certifications, Achievements & Partnerships**
   - Build the scrolling marquee for certificates and achievements.
5. **Testimonials & Vision**
   - Section for feedback and future goals.
6. **Contact Section**
   - Build the contact form and connect it to the MongoDB database to save enquiries.

## Phase 5: Polish & Animations
1. **Scroll Reveals & Micro-interactions**
   - Implement fade-ins, sliding texts, and hover effects to match the premium feel of the demo.
2. **SEO & Performance**
   - Add dynamic Meta tags and optimize images for fast loading.

---

## Open Questions / Details Needed
*   **Animations:** To match the smooth marquee and "stamp" reveal from the demo, should we use a library like **Framer Motion**, or stick to pure CSS animations?
*   **Image / File Uploads:** Where would you like to store uploaded files (like certificates and your CV)? Options include **Cloudinary** (free/easy), AWS S3, or Vercel Blob.
*   **Admin Login:** Is a simple Email/Password login sufficient for the Admin Panel, or do you want OAuth (e.g., login with Google)?

