import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import LenisProvider from '@/components/LenisProvider'

export const metadata: Metadata = {
  title: 'Mykyta Pantelei — Developer',
  description:
    'Full-stack developer based in Bern, Switzerland. Building with React, Next.js, TypeScript, and Go. Seeking apprenticeship opportunities.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LenisProvider>
            {children}
          </LenisProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
