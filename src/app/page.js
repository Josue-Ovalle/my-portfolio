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
// const Portfolio = lazy(() => import('@/components/Sections/Portfolio')); // Commented until I got one project done.
// const Testimonials = lazy(() => import('@/components/Sections/Testimonials')); // Commented until I got one testimonial.
const Contact = lazy(() => import('@/components/Sections/Contact'));

const SectionLoading = () => (
  <div 
    className="min-h-[50vh] flex items-center justify-center" 
    role="status" 
    aria-label="Loading content"
  >
    <div className="text-center">
      <div 
        className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" 
        aria-hidden="true"
      />
      <p className="text-neutral-600 dark:text-neutral-400">Loading section...</p>
    </div>
  </div>
);

// Coming Soon Section Component
const ComingSoon = ({ title, description }) => (
  <section 
    className="section-padding bg-neutral-50 dark:bg-neutral-900/30"
    aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`}
  >
    <div className="container mx-auto container-padding">
      <div className="max-w-4xl mx-auto text-center">
        <h2 
          id={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`}
          className="heading-md text-neutral-900 dark:text-neutral-100 mb-6"
        >
          {title}
        </h2>
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-12 shadow-lg border border-neutral-200 dark:border-neutral-700">
          <div 
            className="w-20 h-20 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
            aria-hidden="true"
          >
            <span className="text-3xl">🚧</span>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Coming Soon
          </h3>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
            {description}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded-full text-sm font-medium">
            <div 
              className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" 
              aria-hidden="true"
            />
            <span>In Development</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);


export default function Home() {
  const { darkMode, setDarkMode, isLoaded } = useTheme();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    
    // Announce theme change to screen readers
    const announcement = document.getElementById('theme-announcement');
    if (announcement) {
      announcement.textContent = `Switched to ${!darkMode ? 'dark' : 'light'} mode`;
      setTimeout(() => {
        announcement.textContent = '';
      }, 1000);
    }
  };

  if (!isLoaded) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950"
        role="status"
        aria-label="Loading portfolio website"
      >
        <div className="text-center">
          <div 
            className="w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" 
            aria-hidden="true"
          />
          <p className="text-neutral-600 dark:text-neutral-400">Loading...</p>
          <span className="sr-only">Loading portfolio website</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main id="main-content" role="main">
        <Hero />
        <Skills />
        <About />
        
        <Suspense fallback={<SectionLoading />}>
          <Services />
        </Suspense>
        
        {/* Portfolio Section - Coming Soon */}
        <ComingSoon 
          title="Portfolio"
          description="I'm currently working on showcasing my best projects with detailed case studies, metrics, and real results. This section will feature live projects you can explore and the impact they've created."
        />
        
        {/* Testimonials Section - Coming Soon */}
        <ComingSoon 
          title="Client Testimonials"
          description="Real testimonials from actual clients will be featured here once I've completed more client projects. I believe in authentic feedback over fabricated reviews."
        />
        
        <Suspense fallback={<SectionLoading />}>
          <Contact />
        </Suspense>
      </main>
      
      <Footer />
      <StickyCTA />
    </div>
  );
}
  
  // I'll be using this when I finished the other projects, until then the "Coming soon" section will replace this block of code.
  /* return (
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
} */