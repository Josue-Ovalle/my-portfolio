'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Zap, Brain, Trophy } from 'lucide-react';
import { personalInfo, skills, timeline } from '@/data/portfolioData';
import { containerVariants, itemVariants, skillAnimations } from '@/utils/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Image from 'next/image';

const About = () => {
  const { ref, isInView } = useScrollAnimation();

  const features = [
    {
      icon: Brain,
      title: "AI-Enhanced Workflow",
      description: "Leveraging Claude, GitHub Copilot, and other AI tools to accelerate development and improve code quality."
    },
    {
      icon: Zap,
      title: "Rapid Prototyping",
      description: "From concept to working prototype in days, not weeks, using modern frameworks and AI assistance."
    },
    {
      icon: Code2,
      title: "Modern Stack",
      description: "React, Next.js, Tailwind CSS, and the latest web technologies for optimal performance."
    },
    {
      icon: Trophy,
      title: "Quality Focused",
      description: "Clean, maintainable code with comprehensive testing and performance optimization."
    }
  ];

  const SkillBar = ({ skill, index }) => (
    <motion.div
      variants={skillAnimations.item}
      custom={index}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed">
          {skill.name}
        </span>
        <span className="text-primary-600 dark:text-primary-400">
          {skill.level}%
        </span>
      </div>
      <div className="skill-bar">
        <motion.div
          className="skill-progress"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </motion.div>
  );

  return (
    <section id="about" className="section-padding bg-neutral-50 dark:bg-neutral-900/30">
      <div className="container mx-auto container-padding">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"} 
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="heading-md text-neutral-900 dark:text-neutral-100 mb-6">
              About Me
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed">
              I&apos;m an emerging developer passionate about combining traditional web development 
              skills with AI-powered tools to create exceptional digital experiences.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Profile */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Profile Image */}
              <div className="flex justify-center lg:justify-start">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative"
                >
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 p-1 relative">
                    <div className="w-full h-full rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                      <Image
                        src="/my-photo.jpg"
                        alt="Profile photo of Josué Ovalle"
                        width={192}
                        height={192}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 rounded-full border-2 border-dashed border-primary-300 dark:border-primary-700 opacity-50"
                  />
                </motion.div>
              </div>

              {/* Description */}
              <div className="space-y-6">
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {personalInfo.description}
                </p>
                
                <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  My approach focuses on efficiency without compromising quality. By integrating 
                  AI tools into my workflow, I can deliver projects faster while maintaining 
                  high standards of code quality and user experience.
                </p>

                {/* Contact Info */}
                <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Available for projects</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Skills */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  Skills & Expertise
                </h3>
                <motion.div
                  variants={skillAnimations.container}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="space-y-6"
                >
                  {skills.map((skill, index) => (
                    <SkillBar key={skill.name} skill={skill} index={index} />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
                className="card card-hover p-6 text-center backdrop-blur-sm"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants} className="mt-20">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-12 text-center">
              My Journey
            </h3>
            <div className="max-w-3xl mx-auto">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  variants={itemVariants}
                  className="timeline-item"
                >
                  <div className="bg-white dark:bg-neutral-900 rounded-lg p-6 shadow-lg backdrop-blur-sm">
                    <div className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2">
                      {item.year}
                    </div>
                    <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;