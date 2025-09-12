import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import ErrorBoundary from '@/components/ErrorBoundary';
import { url } from 'zod';
import Analytics from '@/components/Analytics';

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
  title: {
    default: 'Josué Ovalle - AI-Enhanced Web Developer',
    template: '%s | Josué Ovalle'
  },
  description: 'Emerging coder building fast, affordable websites with AI. Specializing in React, Next.js, and modern web development.',
  keywords: 'web developer, AI development, React, Next.js, Tailwind CSS, modern websites, Guatemala developer',
  authors: [{ name: 'Josué Ovalle' }],
  creator: 'Josué Ovalle',
  publisher: 'Josué Ovalle',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://josueovalle.com',
    siteName: 'Josué Ovalle Portfolio',
    title: 'Josué Ovalle - AI-Enhanced Web Developer',
    description: 'Emerging coder building fast, affordable websites with AI. Specializing in React, Next.js, and modern web development.',
    images: [
      {
        url: '/public/my-photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Josué Ovalle - Web Developer',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Josué Ovalle - AI-Enhanced Web Developer',
    description: 'Emerging coder building fast, affordable websites with AI. Specializing in React, Next.js, and modern web development.',
    creator: '@JosueOvalle_',
    images: ['/public/my-photo.jpg'],
  },
  verification: {
    google: 'placeholder', //do later
  }
}

// Viewport exportado separado
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0ea5e9" />
      </head>
      <body className="font-sans bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
          <ThemeProvider>
            <ErrorBoundary>
              <div id="root">{children}</div>
              <PerformanceMonitor />
              <Analytics />
            </ErrorBoundary>
          </ThemeProvider>
      </body>
    </html>
  )
}
