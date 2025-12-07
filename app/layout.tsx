import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Fredoka } from "next/font/google"
import "./globals.css" // Import globals.css at the top of the file

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const fredoka = Fredoka({ subsets: ["latin"] })

export const metadata: Metadata = {
  generator: "v0.app",
  title: "Hungry Hungry Moo Deng",
  description: "Feed the adorable hippo Moo Deng in this fun fruit-matching game!",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Hungry Hungry Moo Deng",
    description: "Feed the adorable hippo Moo Deng in this fun fruit-matching game!",
    images: ["/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hungry Hungry Moo Deng",
    description: "Feed the adorable hippo Moo Deng in this fun fruit-matching game!",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.className} font-sans antialiased`}>{children}</body>
    </html>
  )
}
