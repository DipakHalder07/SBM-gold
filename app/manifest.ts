import type { MetadataRoute } from "next";

/** Lets phones save the site to the home screen with the SBM GOLD name, icon and colour. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SBM GOLD",
    short_name: "SBM GOLD",
    description:
      "uPVC doors & windows profiles, WPC door frames, HDPE & uPVC pipes, water tanks and wall putty from SBM GOLD, Siliguri.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#951F17",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
