import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "7px",
          color: "#FAF9F6",
          fontFamily: "Georgia, serif",
          fontSize: "17px",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          position: "relative",
        }}
      >
        <span>M</span>
        <span style={{ color: "#60A5FA" }}>.</span>
      </div>
    ),
    {
      ...size,
    }
  );
}
