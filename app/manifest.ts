import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mynul Islam — Software Engineer Portfolio",
    short_name: "Mynul Islam",
    description:
      "Full Stack & Backend Software Engineer building scalable multi-tenant SaaS backends, high-throughput APIs, and modern React/Next.js products.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF9F6",
    theme_color: "#FAF9F6",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
