
import { ThemeProvider } from "@/components/theme-provider"
import { SanityLive } from "@/sanity/lib/live"
import { VisualEditing } from "next-sanity/visual-editing"
import { draftMode } from "next/headers"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import "./globals.css"

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isEnabled: isDraftMode } = await draftMode()

  return (
    <div>
      <ThemeProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </ThemeProvider>
      <SanityLive />
      {isDraftMode && <VisualEditing />}
    </div>
  )
}
