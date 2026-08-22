# Mynul Islam Portfolio CMS

A premium, full-stack portfolio built with Next.js (App Router), Tailwind CSS v4, and MongoDB. It features a complete Admin CMS to manage profile details, experiences, skills, projects, and a custom MongoDB document upload system for resumes.

## Features

- **Public Frontend:** Smooth Framer Motion animations, premium document/ledger aesthetics, responsive design.
- **Admin CMS:** Secure login dashboard to manage all website content directly from the browser.
- **Resume Hosting:** Securely stores and serves your PDF Resume directly from MongoDB (bypassing Cloudinary PDF restrictions).
- **Image Hosting:** Integrated with Cloudinary for fast and optimized profile pictures and project images.
- **Contact Form:** Saves user messages straight to your Admin dashboard.

---

## 🚀 Step-by-Step Setup Guide

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd portfolio-mynul
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create or update your `.env` file in the root directory:

```bash
cp .env.example .env
```

Open `.env` and configure the following variables:

```env
# Database URL (MongoDB Atlas)
DATABASE_URL="mongodb+srv://mynulsakil:JwpLqHtzb5QWYELB@cluster0.bpciahf.mongodb.net/mynul_portfolio?retryWrites=true&w=majority&appName=Cluster0"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="a_very_secure_secret_key_123"

# Cloudinary Configuration (For Image Uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
```

### 4. Start the Development Server

Run the development server locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the live website.

### 5. Seed the Database & Create Admin Account

Before logging into the Admin CMS for the first time, you must trigger the seed route to create the default Admin account in MongoDB:

1. Open your browser and navigate to:
   **`http://localhost:3000/api/seed`**
2. You will see a JSON confirmation response:
   ```json
   { "message": "Default admin user created successfully." }
   ```

*(Optional)* To populate sample portfolio data (Profile, Experience, Skills, Projects, Achievements), visit:
- **`http://localhost:3000/api/seed-demo`**

### 6. Access the Admin CMS Dashboard

Navigate to **[http://localhost:3000/admin](http://localhost:3000/admin)** and log in with the default credentials:

- **Admin Email:** `mynul.sakil@gmail.com`
- **Admin Password:** `Password1@`

> 💡 *You can update your admin profile and password anytime inside the Admin Dashboard after logging in.*

---

## 🚀 Deployment (Vercel)

1. Push your repository code to GitHub.
2. Log into [Vercel](https://vercel.com/) and import your project repository.
3. Add all Environment Variables from your `.env` file to Vercel's Environment Variables settings.
4. Set `NEXTAUTH_URL` in Vercel to your deployed domain (e.g., `https://mynul-portfolio.vercel.app`).
5. Click **Deploy**.
6. Once deployed, visit `https://your-domain.vercel.app/api/seed` once to seed your production admin user!

