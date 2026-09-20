import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://formen.cc"),
  title: {
    default: "Formen | Computer Science",
    template: "%s | Formen",
  },
  description:
    "Personal website of Formen, a Computer Science student in Germany who likes web development and small technical projects.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Formen | Computer Science",
    description:
      "A personal index for web tools, games, visualizers, and small technical projects by Formen.",
    url: "https://formen.cc",
    siteName: "Formen",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#101110",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
