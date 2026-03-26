import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Rion Kudo — Full-stack Developer",
  description:
    "Full-stack developer specializing in React, TypeScript, and AI-powered applications. View my projects and get in touch.",
  metadataBase: new URL("https://rionkudo.vercel.app"),
  openGraph: {
    title: "Rion Kudo — Full-stack Developer",
    description:
      "Full-stack developer specializing in React, TypeScript, and AI-powered applications.",
    url: "https://rionkudo.vercel.app",
    siteName: "Rion Kudo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rion Kudo — Full-stack Developer",
    description:
      "Full-stack developer specializing in React, TypeScript, and AI-powered applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
