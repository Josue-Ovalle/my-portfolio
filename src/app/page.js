'use client';

import { useTheme } from '@/providers/ThemeProvider';
import StickyCTA from '@/components/Layout/StickyCTA';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/Sections/Hero';
import Skills from '@/components/Sections/Skills';
import About from '@/components/Sections/About';
import { Suspense } from 'react';
import { LazyComponentWrapper, createLazyComponent } from '@/components/LazyComponentWrapper';

// Create lazy components with proper error handling
const Services = createLazyComponent(
  () => import('@/components/Sections/Services'),
  'Services'
);

const HonestTestimonials = createLazyComponent(
  () => import('@/components/Sections/HonestTestimonials'),
  'Achievements'
);

const Contact = createLazyComponent(
  () => import('@/components/Sections/Contact'),
  'Contact'
);

// Enhanced loading component with better UX
const SectionLoading = ({ name = 'section' }) => (
  <div 
    className="min-h-[60vh] flex items-center justify-center" 
    role="status" 
    aria-label={`Loading ${name} section`}
  >
    <div className="text-center">
      <div className="relative">
        <div 
          className="w-16 h-16 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin mx-auto mb-6" 
          aria-hidden="true"
        />
        <div 
          className="absolute inset-0 w-16 h-16 border-4 border-transparent border-l-brand-300 rounded-full animate-spin mx-auto" 
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} 
        />
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        Loading {name}
      </h3>
      <p className="text-neutral-600 dark:text-neutral-400">
        Preparing content for you...
      </p>
      <div className="mt-4 w-32 h-1 bg-neutral-200 dark:bg-neutral-700 rounded-full mx-auto overflow-hidden">
        <div className="h-full bg-brand-500 rounded-full animate-pulse" style={{ width: '60%' }} />
      </div>
    </div>
  </div>
);

// Coming Soon Component for Portfolio
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
            In Development
          </h3>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
            {description}
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 rounded-full text-sm font-medium">
            <div 
              className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" 
              aria-hidden="true"
            />
            <span>Working on authentic case studies</span>
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

  // Enhanced loading state
  if (!isLoaded) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950"
        role="status"
        aria-label="Loading portfolio website"
      >
        <div className="text-center">
          <div className="relative mb-8">
            <div 
              className="w-20 h-20 border-4 border-brand-500/20 border-t-brand-500 rounded-full animate-spin mx-auto" 
              aria-hidden="true"
            />
            <div 
              className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-brand-300 rounded-full animate-spin mx-auto" 
              style={{ animationDirection: 'reverse', animationDuration: '2s' }} 
            />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            JosuÉ Ovalle
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">Loading portfolio...</p>
          <span className="sr-only">Loading portfolio website</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      <Suspense fallback={<div>Loading header...</div>}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </Suspense>
      
      <main id="main-content" role="main" className="pt-16 md:pt-20">
        <Hero />
        <Skills />
        <About />
        
        <LazyComponentWrapper 
          fallback={<SectionLoading name="Services" />}
          name="Services"
        >
          <Services />
        </LazyComponentWrapper>
        
        {/* Portfolio Section - Honest approach */}
        <ComingSoon 
          title="Portfolio Case Studies"
          description="I'm currently developing detailed case studies of real projects with authentic metrics and client outcomes. Rather than showcase placeholder projects, I'm focusing on building genuine client work that demonstrates real business impact."
        />
        
        {/* Replace Testimonials with Achievements */}
        <LazyComponentWrapper 
          fallback={<SectionLoading name="Achievements" />}
          name="Achievements"
        >
          <HonestTestimonials />
        </LazyComponentWrapper>
        
        <LazyComponentWrapper 
          fallback={<SectionLoading name="Contact" />}
          name="Contact"
        >
          <Contact />
        </LazyComponentWrapper>
      </main>
      
      <Footer />
      
      <Suspense fallback={<div>Loading quick actions...</div>}>
        <StickyCTA />
      </Suspense>
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