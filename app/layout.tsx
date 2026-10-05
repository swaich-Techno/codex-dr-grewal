import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  return {
    metadataBase,
    title: "Dr. Grewal — Veterinary Care Since 1973",
    description: "Approval demonstration for Grewal Homeo Remedies, Mohali.",
    robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
    manifest: "/manifest.webmanifest",
    openGraph: { title: "Veterinary Care, Trusted Since 1973.", description: "Dr. Grewal · Grewal Homeo Remedies, Mohali", images: [{ url: "/og.png", width: 1792, height: 937, alt: "Dr. Grewal veterinary care website preview" }] },
    twitter: { card: "summary_large_image", title: "Dr. Grewal — Veterinary Care Since 1973", description: "Grewal Homeo Remedies, Mohali", images: ["/og.png"] },
  };
}

export const viewport: Viewport = { themeColor: "#075b3a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
