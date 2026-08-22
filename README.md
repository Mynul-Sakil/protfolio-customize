# Mynul Islam Portfolio CMS

A premium, full-stack portfolio built with Next.js (App Router), Tailwind CSS v4, and MongoDB. It features a complete Admin CMS to manage profile details, experiences, skills, projects, and a custom MongoDB document upload system for resumes.

## Features

- **Public Frontend:** Smooth Framer Motion animations, premium document/ledger aesthetics, responsive design.
- **Admin CMS:** Secure login dashboard to manage all website content directly from the browser.
- **Resume Hosting:** Securely stores and serves your PDF Resume directly from MongoDB (bypassing Cloudinary PDF restrictions).
- **Image Hosting:** Integrated with Cloudinary for fast and optimized profile pictures and project images.
- **Contact Form:** Saves user messages straight to your Admin dashboard.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd portfolio-mynul
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy the example environment file:
```bash
cp .env.example .env
```

Open `.env` and fill in the required variables. Here is how to get them:

#### `DATABASE_URL` (MongoDB)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Build a free cluster and create a database user (remember the password).
3. Click "Connect" -> "Connect your application" and copy the connection string.
4. Replace `<password>` in the string with your actual password.

#### `NEXTAUTH_SECRET` & `NEXTAUTH_URL` (Authentication)
1. Set `NEXTAUTH_URL` to `http://localhost:3000` for local development (change this to your Vercel URL when deploying).
2. For `NEXTAUTH_SECRET`, generate a secure random string by running `openssl rand -base64 32` in your terminal, or just type a long, random password.

#### `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (Image Uploads)
1. Go to [Cloudinary](https://cloudinary.com/) and create a free account.
2. Copy your **Cloud Name** from the dashboard.
3. *Important:* You must also go to Cloudinary Settings -> Upload and create an **Unsigned Upload Preset** named `portfolio_preset`.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the public site.
Go to [http://localhost:3000/admin](http://localhost:3000/admin) to access the CMS Dashboard.

**Default Admin Credentials:**
- **Email:** mynul.sakil@gmail.com
- **Password:** Password1@

*(You can change this password inside the Admin Dashboard after logging in).*

---

## Deployment (Vercel)

1. Push your code to GitHub.
2. Log into [Vercel](https://vercel.com/) and import your repository.
3. During setup, add all the Environment Variables from your `.env` file to Vercel's Environment Variables section.
4. Make sure to change `NEXTAUTH_URL` in Vercel to your actual production domain (e.g., `https://my-portfolio.vercel.app`).
5. Click **Deploy**!
