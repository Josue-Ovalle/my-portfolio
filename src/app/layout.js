import './globals.css';
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/providers/ThemeProvider';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import ErrorBoundary from '@/components/ErrorBoundary';
import Analytics from '@/components/Analytics';
import CustomCursor from '@/components/UI/CustomCursor';
import ScrollProgress from '@/components/UI/ScrollProgress';
import StructuredData from '@/components/SEO/StructuredData';

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

export const metadata = {
  metadataBase: new URL('https://josueovalle.com'),
  title: {
    default: 'Josué Ovalle - Frontend Developer & Web Developer from Guatemala',
    template: '%s | Josué Ovalle - Frontend Developer'
  },
  other: {
    'application-name': 'Josué Ovalle Portfolio',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Josué Ovalle',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-TileColor': '#0ea5e9',
    'msapplication-tap-highlight': 'no',
    'theme-color': '#0ea5e9',
  },
  description: 'Frontend developer specializing in React, Next.js, and TypeScript. Based in Guatemala City, creating modern web applications with focus on performance and user experience.',
  keywords: [
    'frontend developer',
    'React developer', 
    'Next.js developer',
    'TypeScript developer',
    'web developer Guatemala',
    'Guatemala developer',
    'modern web applications',
    'JavaScript developer',
    'Tailwind CSS',
    'web development services',
    'Josué Ovalle',
    'Guatemala City developer'
  ].join(', '),
  authors: [{ 
    name: 'Josué Ovalle',
    url: 'https://josueovalle.com'
  }],
  creator: 'Josué Ovalle',
  publisher: 'Josué Ovalle',
  category: 'Technology',
  classification: 'Personal Portfolio',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_GT'],
    url: 'https://josueovalle.com', 
    siteName: 'Josué Ovalle Portfolio',
    title: 'Josué Ovalle - Frontend Developer from Guatemala',
    description: 'Frontend developer specializing in React, Next.js, and TypeScript. Creating modern, performant web applications in Guatemala City.',
    images: [
      {
        url: '/my-photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Josué Ovalle - Frontend Developer specializing in React and Next.js',
        type: 'image/jpeg',
      }
    ],
    countryName: 'Guatemala',
    ttl: 604800,
  },
  twitter: {
    card: 'summary_large_image',
    site: '@JosueOvalle_',
    creator: '@JosueOvalle_',
    title: 'Josué Ovalle - Frontend Developer from Guatemala',
    description: 'Frontend developer specializing in React, Next.js, and TypeScript. Creating modern web applications.',
    images: [{
      url: '/my-photo.jpg',
      alt: 'Josué Ovalle - Frontend Developer',
    }],
  },
  // Uncomment and add actual verification codes when available
  /* verification: {
    google: 'placeholder',
    yandex: 'placeholder',
    yahoo: 'placeholder',
    other: {
      'p:domain_verify': 'placeholder' // Pinterest verification
    }
  }, */
  alternates: {
    canonical: 'https://josueovalle.com', 
    languages: {
      'en-US': 'https://josueovalle.com',
      'es-GT': 'https://josueovalle.com/es' 
    }
  },
}

// Viewport exported separately
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, 
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0ea5e9' },
    { media: '(prefers-color-scheme: dark)', color: '#0ea5e9' }
  ],
}

export default function RootLayout({ children }) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${jetbrainsMono.variable}`} 
      suppressHydrationWarning
    >
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
        {/* Screen reader announcement for theme changes */}
        <div 
          id="theme-announcement" 
          className="sr-only" 
          role="status" 
          aria-live="polite" 
          aria-atomic="true"
        />
        
        <StructuredData />
        <ThemeProvider>
          <ErrorBoundary>
            <CustomCursor />
            <ScrollProgress />
            
            {/* Main application content with proper landmark structure */}
            <div id="app" className="min-h-screen">
              {children}
            </div>
            
            <PerformanceMonitor />
            <Analytics />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}