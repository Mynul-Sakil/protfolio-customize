# Mynul Islam — Portfolio & Resume Knowledge Base

This folder consolidates all of Mynul Islam's currently loaded website data (fetched from MongoDB), GitHub project details (`Mynul-Sakil` / `sakil470004` + Cansoft `clinic-booking-app`), and all 5 role-specific resume variants.

## Folder Structure

| Path | Description |
|---|---|
| [profile.md](./profile.md) | Personal details, contact & social links, current photo URL, education, competitive programming, and summaries |
| [experience.md](./experience.md) | Consolidated work history (Cansoft Technology & Aliyah Holdings LLC) merged across DB and resumes |
| [skills.md](./skills.md) | Master categorized technical skills matrix across Backend, Frontend, Mobile, Databases, DevOps, and AI |
| [projects.md](./projects.md) | Full catalog of company, featured, and notable GitHub projects with live links, repos, and tech stacks |
| [linkedin-profile.md](./linkedin-profile.md) | Complete HR/CFO/CTO-audited LinkedIn profile playbook (Headline, About, Experience, Featured, Projects, Certs, Skills & Banner) |
| [current-website-data.json](./current-website-data.json) | Clean snapshot of all public collections currently loaded in the portfolio MongoDB database |
| [resumes/backend-engineer.md](./resumes/backend-engineer.md) | Software Engineer, Backend resume |
| [resumes/full-stack-developer.md](./resumes/full-stack-developer.md) | Full Stack Developer resume |
| [resumes/full-stack-frontend-focus.md](./resumes/full-stack-frontend-focus.md) | Full Stack Developer (Frontend Focus) resume |
| [resumes/frontend-developer.md](./resumes/frontend-developer.md) | Frontend Developer resume |
| [resumes/react-nextjs-developer.md](./resumes/react-nextjs-developer.md) | React / Next.js Developer resume |
| [resumes/react-native-developer.md](./resumes/react-native-developer.md) | React Native Developer resume |
| `../../output/` *(workspace root)* | Generated ATS-safe PDF resumes (`<position-slug>_<YYYY-MM-DD>_<HH-MM>.pdf`) |

## Confirmed Source-of-Truth Decisions

1. **Work Experience Dates**:
   - **Cansoft Technology**: `Apr 2026 – Present`
   - **Aliyah Holdings LLC**: `Aug 2024 – Apr 2026`
2. **Years of Experience**: `2+ years` (accurate based on Aug 2024 start).
3. **Clinic Booking App (`emmai.ca`)**: Approved for public portfolio showcase with live links `https://emmai.ca` and `https://abc.emmai.ca`.
4. **GitHub Handle**: Standardized to `https://github.com/Mynul-Sakil`.
5. **Resume Download Link (`resumeUrl`)**: Kept empty (`""`) by default.

## Sync Status

- [x] **Synced to Live Database & `seed-mynul`**: Updated MongoDB collections and `app/api/seed-mynul/route.ts` with consolidated `mynul/` data (`2+` years experience, Cansoft `Apr 2026 – Present`, `https://github.com/Mynul-Sakil`, `emmai.ca` / `abc.emmai.ca` Clinic Booking SaaS, live project links, and `photoHistory` v1 default).
