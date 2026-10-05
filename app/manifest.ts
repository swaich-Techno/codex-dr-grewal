import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Dr. Grewal Website Demo", short_name: "Dr. Grewal", description: "Approval demonstration for Grewal Homeo Remedies.", start_url: "/", display: "standalone", background_color: "#ffffff", theme_color: "#075b3a", icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }] };
}
