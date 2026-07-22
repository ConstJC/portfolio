import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jay Clark Anore — Full-Stack Developer & Designer",
    short_name: "Jay Clark Anore",
    description:
      "Full Stack Developer crafting scalable web & mobile apps — from pixel-perfect frontends to robust APIs and real-time systems. Based in Cebu, PH.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A1020",
    theme_color: "#0A1020",
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
  }
}
