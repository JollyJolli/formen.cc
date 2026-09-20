import { ImageResponse } from "next/og";

export const alt =
  "Formen - Computer Science student in Germany. Web tools, games, and experiments.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#101110",
        color: "#efeee8",
        width: "100%",
        height: "100%",
        padding: 72,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
          color: "#d2ff72",
        }}
      >
        <span>~/formen.cc</span>
        <span>Germany / Computer Science</span>
      </div>
      <div style={{ display: "flex", fontSize: 180, fontWeight: 700 }}>
        Formen<span style={{ color: "#d2ff72" }}>.</span>
      </div>
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #30342e",
          paddingTop: 28,
          fontSize: 28,
        }}
      >
        Web tools, games, and experiments.
      </div>
    </div>,
    size,
  );
}
