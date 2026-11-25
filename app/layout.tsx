import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Anjan P - Full-Stack Software Developer & AI / Data Science Enthusiast",
  description:
    "Full-Stack Software Developer & AI / Data Science Enthusiast building AI-powered applications, real-time voice and RAG/LLM pipelines, and data-driven web platforms. B.E. CSE at City Engineering College, Bengaluru.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
