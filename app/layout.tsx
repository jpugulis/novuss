import React from "react"
import type { Metadata } from 'next'
import { Space_Grotesk, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Rajona Novusa Turnīrs',
  description: 'Leģendārais novusa turnīrs - rezultāti, statistika un atmiņas',
  generator: 'v0.app',
  icons: {
    icon: '/RNT_logo.png',
    shortcut: '/RNT_logo.png',
    apple: '/RNT_logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
