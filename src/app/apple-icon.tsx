import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
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
          background: "#0a0a0c",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="64" y2="64">
              <stop offset="0" stopColor="#5b8cff" />
              <stop offset="0.5" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#4ade80" />
            </linearGradient>
          </defs>
          <path
            d="M32 10c1.6 12.2 9.8 20.4 22 22-12.2 1.6-20.4 9.8-22 22-1.6-12.2-9.8-20.4-22-22 12.2-1.6 20.4-9.8 22-22z"
            fill="url(#g)"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
