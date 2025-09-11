'use client';

import { useTheme } from '@/providers/ThemeProvider';
import StickyCTA from '@/components/Layout/StickyCTA';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import Hero from '@/components/Sections/Hero';
import About from '@/components/Sections/About';
import Services from '@/components/Sections/Services';
import Portfolio from '@/components/Sections/Portfolio';
import Testimonials from '@/components/Sections/Testimonials';
import Contact from '@/components/Sections/Contact';

export default function Home() {
  const { darkMode, setDarkMode, isLoaded } = useTheme();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
        <About />
        <Services />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
      <StickyCTA />
    </div>
  );
}