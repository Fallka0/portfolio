import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mykyta Pantelei — Developer',
  description: 'Developer based in Bern, CH. Building full-stack apps with React, Next.js, Go, and TypeScript.',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
