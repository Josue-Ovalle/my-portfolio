import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono'
})

// ✅ Metadata (sin viewport adentro)
export const metadata = {
  title: 'Alex Chen - AI-Enhanced Web Developer',
  description: 'Emerging coder building fast, affordable websites with AI. Specializing in React, Next.js, and modern web development.',
  keywords: 'web developer, AI development, React, Next.js, Tailwind CSS, modern websites',
  authors: [{ name: 'Alex Chen' }],
  creator: 'Alex Chen',
  publisher: 'Alex Chen',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alexchen.dev',
    title: 'Alex Chen - AI-Enhanced Web Developer',
    description: 'Emerging coder building fast, affordable websites with AI. Specializing in React, Next.js, and modern web development.',
    siteName: 'Alex Chen Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Chen - AI-Enhanced Web Developer',
    description: 'Emerging coder building fast, affordable websites with AI. Specializing in React, Next.js, and modern web development.',
    creator: '@alexchen',
  },
}

// ✅ Viewport exportado separado
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className="font-sans bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
