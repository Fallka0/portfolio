import type { Metadata, Viewport } from 'next'
import { THEME_INIT_SCRIPT } from '@/lib/theme'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mykyta Pantelei',
  description: 'Developer based in Bern, CH. Building full-stack apps with React, Next.js, Go, and TypeScript.',
  icons: { icon: '/favicon.svg', shortcut: '/favicon.svg' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // Matches --black in each palette, so the browser chrome tracks the page.
  themeColor: [
    { media: '(prefers-color-scheme: dark)',  color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#f3f2ef' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // the inline script writes data-theme before React sees the tree, so the
    // server markup and the hydrated markup legitimately differ on <html>
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
