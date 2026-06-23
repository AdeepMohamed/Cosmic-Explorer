import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adeep Mohamed P — Cosmic Explorer Portfolio",
  description:
    "An immersive 3D space portfolio experience. Explore planets representing AI, Full Stack Development, and cutting-edge innovations by Adeep Mohamed P.",
  keywords: [
    "Adeep Mohamed P",
    "AI Engineer",
    "Data Science",
    "Full Stack Developer",
    "Portfolio",
    "3D Portfolio",
    "Space Portfolio",
  ],
  openGraph: {
    title: "Adeep Mohamed P — Cosmic Explorer",
    description: "Explore my universe of skills, projects, and achievements.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
