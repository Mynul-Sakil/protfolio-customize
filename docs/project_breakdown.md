# Project Breakdown & Development Roadmap
**Sabbir's Portfolio & CMS**

This document breaks down the development process into manageable phases based on the `project_details.md`, `project-information.txt`, and the styling from `sabbir-portfolio1.html`.

---

## Finalized Decisions
*   **Animations:** We will use **Framer Motion** for smooth, professional scroll reveals and marquee effects.
*   **Image / File Uploads:** We will use **Cloudinary** for storing uploaded files (like certificates and CVs). Cloudinary provides 25 credits on their free tier, which easily covers up to 25 GB of storage and bandwidth—more than enough for a portfolio site.
*   **Admin Login:** We will use a custom Email/Password login via MongoDB. The default Admin password will be `Password1@`, and there will be a "Change Password" option in the admin dashboard.

---

## Phase 1: Project Setup & Global Architecture
1. **Next.js & Tailwind CSS Initialization**
   - Configure Next.js with App Router.
   - Setup Tailwind CSS, including the custom color palette (Ink, Parchment, Page, Brass/Gold, Slate) and fonts (Fraunces, IBM Plex Sans, JetBrains Mono).
2. **Database Connection**
   - Connect Next.js to MongoDB using Mongoose.
3. **Authentication Setup**
   - Secure the Admin Panel using NextAuth.js (Credentials Provider) and `bcryptjs` for hashing passwords.

## Phase 2: Database Models & APIs
1. **Mongoose Schemas**
   - Create schemas for: User (Admin), Profile Info, Experience, Skills, Services, Projects, Certifications, Achievements, Partnerships, Testimonials, and Contact Messages.
   - Seed the initial Admin user with the default password `Password1@`.
2. **API Routes / Server Actions**
   - Create CRUD operations (Create, Read, Update, Delete) for the CMS dashboard.
   - Create public-facing fetch functions for the visitor website.

## Phase 3: The Admin Panel (CMS)
1. **Dashboard Layout**
   - Build a secure, responsive sidebar navigation for the CMS.
2. **Authentication Pages**
   - Build the Admin Login page and a Change Password page within the dashboard.
3. **Content Management Pages**
   - Develop forms to add/edit/delete: Profile details, Experience, Skills, Services, etc.
4. **File Upload Handling**
   - Setup `next-cloudinary` to seamlessly handle image and file uploads directly to your Cloudinary account.
5. **Contact Enquiries View**
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
   - Implement Framer Motion for fade-ins, sliding texts, and hover effects to match the premium feel of the demo.
2. **SEO & Performance**
   - Add dynamic Meta tags and optimize images for fast loading.
