# Mynul Islam — Portfolio & Resume Knowledge Base

This folder consolidates all of Mynul Islam's currently loaded website data (fetched from MongoDB), GitHub project details (`Mynul-Sakil` / `sakil470004` + Cansoft `clinic-booking-app`), and all 5 role-specific resume variants.

## Folder Structure

| Path | Description |
|---|---|
| [profile.md](./profile.md) | Personal details, contact & social links, current photo URL, education, competitive programming, and summaries |
| [experience.md](./experience.md) | Consolidated work history (Cansoft Technology & Aliyah Holdings LLC) merged across DB and resumes |
| [skills.md](./skills.md) | Master categorized technical skills matrix across Backend, Frontend, Mobile, Databases, DevOps, and AI |
| [projects.md](./projects.md) | Full catalog of company, featured, and notable GitHub projects with live links, repos, and tech stacks |
| [current-website-data.json](./current-website-data.json) | Clean snapshot of all public collections currently loaded in the portfolio MongoDB database |
| [resumes/backend-engineer.md](./resumes/backend-engineer.md) | Software Engineer, Backend resume |
| [resumes/full-stack-developer.md](./resumes/full-stack-developer.md) | Full Stack Developer resume |
| [resumes/frontend-developer.md](./resumes/frontend-developer.md) | Frontend Developer resume |
| [resumes/react-nextjs-developer.md](./resumes/react-nextjs-developer.md) | React / Next.js Developer resume |
| [resumes/react-native-developer.md](./resumes/react-native-developer.md) | React Native Developer resume |

## Spotted Discrepancies to Confirm

1. **Cansoft Technology & Aliyah Holdings Dates**:
   - **Current DB (`seed-mynul`)**: Cansoft `Apr 2026 – Present`, Aliyah Holdings `Aug 2024 – Apr 2026`.
   - **Backend Resume**: Cansoft `April 2025 – Present`, Aliyah Holdings `August 2024 – April 2025`.
   - **Other 4 Resumes**: Aliyah Holdings `Aug 2024 – Present` (Cansoft not listed).
2. **Years of Experience**:
   - Backend resume says `2+ years`; current website & other resumes say `3+ years`.
3. **GitHub Username / URL**:
   - Resumes link to `https://github.com/sakil470004/`, while GitHub repos resolve under `https://github.com/Mynul-Sakil` (same account after rename/alias).
4. **Resume Download Link (`resumeUrl`)**:
   - Currently empty (`""`) in the database, so the Resume button on the Hero section is hidden.
5. **Empty DB Sections**:
   - `certifications` and `testimonials` are currently empty arrays in MongoDB, and `projects` in MongoDB do not yet have `link` or `imageUrl` fields populated.
