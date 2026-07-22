import { ImageResponse } from "next/og"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

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
          background: "#0A1020",
          color: "#3B9EF5",
          fontSize: 92,
          fontWeight: 800,
        }}
      >
        JC
      </div>
    ),
    { ...size }
  )
}
