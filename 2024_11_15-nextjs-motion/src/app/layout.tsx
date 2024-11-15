import type { Metadata } from 'next'
import { Comfortaa } from 'next/font/google'
import './globals.css'

const comfortaa = Comfortaa({
  variable: '--font-comfortaa',
  weight: '400'
})

export const metadata: Metadata = {
  title: 'Create Next App!',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${comfortaa.variable}`}>{children}</body>
    </html>
  )
}
