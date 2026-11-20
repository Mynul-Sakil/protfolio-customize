import { ImageResponse } from "next/og";

export const alt = "Mynul Islam — Full Stack & Backend Software Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAF9F6",
          color: "#111827",
          padding: "64px 72px",
          border: "12px solid #111827",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top Row: Brand Mark & Availability */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "12px",
                background: "#111827",
                color: "#FAF9F6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "26px",
                fontWeight: 700,
              }}
            >
              MI
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              Mynul Islam
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "sans-serif",
              fontSize: "18px",
              color: "#4B5563",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "999px",
                background: "#059669",
              }}
            />
            <span>Open to Remote Roles &amp; Advisory</span>
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: "960px",
            }}
          >
            I build reliable software systems that help businesses scale.
          </div>
          <div
            style={{
              fontFamily: "sans-serif",
              fontSize: "26px",
              color: "#374151",
              lineHeight: 1.4,
            }}
          >
            Full Stack &amp; Backend Software Engineer · AI Full Stack Developer at Cansoft Technology
          </div>
        </div>

        {/* Bottom Metadata Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(17, 24, 39, 0.12)",
            paddingTop: "24px",
            fontFamily: "sans-serif",
            fontSize: "20px",
            color: "#1D4ED8",
            fontWeight: 600,
          }}
        >
          <span>Multi-Tenant SaaS · Node.js · TypeScript · Next.js · PostgreSQL · Redis</span>
          <span style={{ color: "#6B7280", fontWeight: 500 }}>github.com/Mynul-Sakil</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
