'use client';

import { useTheme } from '@/providers/ThemeProvider';
import StickyCTA from '@/components/Layout/StickyCTA';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/Sections/Hero';
import Skills from '@/components/Sections/Skills';
import About from '@/components/Sections/About';
import { lazy, Suspense } from 'react';

// Lazy load components that are below the fold
const Services = lazy(() => import('@/components/Sections/Services'));
const Portfolio = lazy(() => import('@/components/Sections/Portfolio'));
const Testimonials = lazy(() => import('@/components/Sections/Testimonials'));
const Contact = lazy(() => import('@/components/Sections/Contact'));

const SectionLoading = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-neutral-600 dark:text-neutral-400">Loading section...</p>
    </div>
  </div>
);

export default function Home() {
  const { darkMode, setDarkMode, isLoaded } = useTheme();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main>
        <Hero />
        <Skills />
        <About />
        <Suspense fallback={<SectionLoading />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Portfolio />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionLoading />}>
          <Contact />
        </Suspense>
      </main>
      
      <Footer />
      <StickyCTA />
    </div>
  );
}