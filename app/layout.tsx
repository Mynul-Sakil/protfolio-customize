import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Mynul Islam - Portfolio",
  description: "Portfolio of Mynul Islam.",
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem("portfolio-theme");
    var theme = stored === "light" || stored === "dark" ? stored : "dark";
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
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
      data-theme="dark"
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
