import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ivan Aleksić · AI Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const [regular, medium] = await Promise.all([
    fetch(new URL("./Geist-Regular.ttf", import.meta.url)).then((r) =>
      r.arrayBuffer()
    ),
    fetch(new URL("./Geist-Medium.ttf", import.meta.url)).then((r) =>
      r.arrayBuffer()
    ),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0912",
          color: "#f3f1f9",
          fontFamily: "Geist",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 26, letterSpacing: 4, opacity: 0.55 }}>
            IVAN ALEKSIĆ
          </div>
          {/* spark */}
          <svg width="56" height="56" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="64" y2="64">
                <stop offset="0" stopColor="#7c8cff" />
                <stop offset="0.5" stopColor="#a78bfa" />
                <stop offset="1" stopColor="#e879f9" />
              </linearGradient>
            </defs>
            <path
              d="M32 4c1.8 13.7 11 22.9 24.7 24.7C43 30.5 33.8 39.7 32 53.4 30.2 39.7 21 30.5 7.3 28.7 21 26.9 30.2 17.7 32 4z"
              fill="url(#g)"
            />
          </svg>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.02,
              letterSpacing: -3,
              fontWeight: 500,
            }}
          >
            I design AI products
          </div>
          <div
            style={{
              fontSize: 84,
              lineHeight: 1.02,
              letterSpacing: -3,
              fontWeight: 500,
              backgroundImage:
                "linear-gradient(100deg, #7c8cff 0%, #a78bfa 45%, #e879f9 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            people actually adopt.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            opacity: 0.55,
            letterSpacing: 2,
          }}
        >
          <div>AI PRODUCT DESIGNER · 14 YRS SAAS</div>
          <div>ZENDESK · INSTAPAGE · SONAS</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: medium, weight: 500, style: "normal" },
      ],
    }
  );
}
