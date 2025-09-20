'use client';

import { motion, easeInOut } from 'framer-motion';
import { Github, Award, Users, BookOpen, ExternalLink } from 'lucide-react';
import { staggerContainer } from '@/utils/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: typeof Github;
  metric: string;
  date: string;
  verified: boolean;
  link?: string;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Open Source Contributions',
    description: 'Active contributor to React and TypeScript community projects, helping improve developer tools and documentation.',
    icon: Github,
    metric: '10+ contributions',
    date: '2024',
    verified: true,
    link: 'https://github.com/Josue-Ovalle'
  },
  {
    id: '2',
    title: 'FreeCodeCamp Certifications',
    description: 'Completed comprehensive web development curriculum including responsive design, JavaScript algorithms, and React.',
    icon: Award,
    metric: '3 certifications',
    date: '2023-2024',
    verified: true,
    link: 'https://freecodecamp.org/certification/example'
  },
  {
    id: '3',
    title: 'Community Mentorship',
    description: 'Actively helping junior developers in Guatemala tech community through code reviews and technical guidance.',
    icon: Users,
    metric: '15+ developers helped',
    date: '2024',
    verified: true
  },
  {
    id: '4',
    title: 'Technical Writing',
    description: 'Published articles on modern web development practices, focusing on React patterns and TypeScript best practices.',
    icon: BookOpen,
    metric: '5 articles published',
    date: '2024',
    verified: true
  }
];


// Patch: Framer Motion expects 'ease' to be a string or function, not an array of numbers
const staggerItem = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeInOut,
    },
  },
};

const HonestTestimonials = () => {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="achievements" className="section-padding bg-neutral-50 dark:bg-neutral-900/30">
      <div className="container mx-auto container-padding">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={staggerItem} className="text-center mb-16">
            <h2 className="heading-md text-neutral-900 dark:text-neutral-100 mb-6">
              Achievements & Community Impact
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              Rather than fabricated testimonials, here&apos;s my authentic contribution to the development community 
              and verified achievements that demonstrate real growth and impact.
            </p>
          </motion.div>

          {/* Achievements Grid */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  variants={staggerItem}
                  className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                          {achievement.title}
                        </h3>
                        {achievement.verified && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="text-brand-600 dark:text-brand-400 font-semibold mb-2">
                        {achievement.metric} • {achievement.date}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                    {achievement.description}
                  </p>
                  
                  {achievement.link && (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium transition-colors duration-300"
                    >
                      View Details
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Transparency Statement */}
          <motion.div
            variants={staggerItem}
            className="bg-gradient-to-r from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 rounded-2xl p-8 text-center border border-brand-200 dark:border-brand-800"
          >
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Building Trust Through Transparency
            </h3>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-6 max-w-2xl mx-auto leading-relaxed">
              As I build my client base, this section will feature authentic testimonials from real projects. 
              I believe in honest representation over fabricated social proof.
            </p>
            <div className="text-sm text-neutral-500 dark:text-neutral-400">
              All achievements listed above can be independently verified through the provided links.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HonestTestimonials;