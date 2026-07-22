import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import siteData from "@/store/site.json"

export const alt = "Jay Clark Anore — Full-Stack Developer & Designer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const photoData = await readFile(
    join(process.cwd(), "public/images/pf-transparent.png")
  )
  const photoSrc = `data:image/png;base64,${photoData.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 72,
          padding: "0 96px",
          background: "#0A1020",
          backgroundImage:
            "radial-gradient(ellipse at 30% 20%, rgba(59,158,245,0.25) 0%, transparent 60%)",
        }}
      >
        <img
          src={photoSrc}
          alt=""
          width={340}
          height={340}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid #3B9EF5",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#3B9EF5",
              marginBottom: 16,
            }}
          >
            {siteData.tagline}
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#EDF1F9",
              lineHeight: 1.1,
            }}
          >
            {siteData.name}
          </div>
          <div style={{ fontSize: 30, color: "#8B98B5", marginTop: 20 }}>
            {`${siteData.location} · Available for Freelance`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
