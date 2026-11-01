import React from "react"
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _spaceGrotesk = Space_Grotesk({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: 'Rajona Novusa Turnīrs',
  description: 'Leģendārais novusa turnīrs - rezultāti, statistika un atmiņas',
  icons: {
    icon: '/icon-48.png',
    shortcut: '/icon-48.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="lv">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
