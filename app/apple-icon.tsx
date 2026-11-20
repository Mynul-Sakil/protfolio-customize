import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111827",
          borderRadius: "36px",
          color: "#FAF9F6",
          fontFamily: "Georgia, serif",
          fontSize: "88px",
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        <span>MI</span>
        <span style={{ color: "#60A5FA" }}>.</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
