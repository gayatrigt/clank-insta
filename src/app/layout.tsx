import "~/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: 'Clank.Insta',
  description: 'Discover and trade crypto tokens through short videos',
  // Frame Metadata
  other: {
    'fc:frame': JSON.stringify({
      version: "next",
      imageUrl: "https://www.clank.in/dp.png", // Replace with actual image URL
      button: {
        title: "Trade on Clank.Insta",
        action: {
          type: "launch_frame",
          name: "Clank.Insta",
          url: "https://www.clank.in/frame", // Replace with actual URL
          splashImageUrl: "https://www.clank.in/clank.png", // Replace with actual image URL
          splashBackgroundColor: "#0f172a" // Slate background color
        }
      }
    })
  }
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-slate-900">{children}</body>
    </html>
  );
}