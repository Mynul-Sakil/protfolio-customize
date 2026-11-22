import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mynul-portfolo.vercel.app";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F6" },
    { media: "(prefers-color-scheme: dark)", color: "#0C0E12" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mynul Islam — Full Stack & Backend Software Engineer",
    template: "%s | Mynul Islam",
  },
  description:
    "Full Stack & Backend Software Engineer with 2+ years of production experience building multi-tenant SaaS backends, high-throughput Node.js/TypeScript APIs, PostgreSQL, Redis/BullMQ, and modern Next.js applications.",
  keywords: [
    "Mynul Islam",
    "Backend Software Engineer",
    "Full Stack Developer",
    "Node.js Engineer",
    "TypeScript Developer",
    "Next.js Developer",
    "Multi-Tenant SaaS Architecture",
    "PostgreSQL",
    "Redis",
    "BullMQ",
    "Cansoft Technology",
  ],
  authors: [{ name: "Mynul Islam", url: "https://github.com/Mynul-Sakil" }],
  creator: "Mynul Islam",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Mynul Islam",
    title: "Mynul Islam — Full Stack & Backend Software Engineer",
    description:
      "I build reliable software systems that help businesses scale without breaking. Multi-tenant SaaS, Node.js, TypeScript, Next.js, PostgreSQL & Redis.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mynul Islam — Full Stack & Backend Software Engineer",
    description:
      "Full Stack & Backend Software Engineer building scalable multi-tenant SaaS platforms, high-throughput APIs, and modern web/mobile products.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem("portfolio-theme");
    var theme = stored === "light" || stored === "dark" ? stored : "light";
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${fraunces.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col selection:bg-brass selection:text-white" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
