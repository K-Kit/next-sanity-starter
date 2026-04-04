import { Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SanityLive } from "@/sanity/lib/live"
import { VisualEditing } from "next-sanity/visual-editing"
import { draftMode } from "next/headers"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Next.js + Sanity Starter",
    template: "%s | Next.js + Sanity Starter",
  },
  description: "A minimal starter template with Next.js, Sanity CMS, shadcn/ui, and Framer Motion.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <SanityLive />
        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  )
}
