'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, memo } from 'react';
import { 
  Code2, 
  Palette, 
  Zap, 
  Globe, 
  Smartphone, 
  Database,
  Brain,
  TrendingUp,
  CheckCircle,
  Star
} from 'lucide-react';
import { staggerContainer, staggerItem, cardHover } from '@/utils/animations';
import { useAdvancedScrollAnimation, useStaggerChildren } from '@/hooks/useAdvancedScrollAnimation';

const Skills = memo(() => {
  const { ref: containerRef, isInView } = useAdvancedScrollAnimation({ threshold: 0.1 });
  const { ref: skillsGridRef, container, item, controls } = useStaggerChildren(0.08);
  const [activeCategory, setActiveCategory] = useState('all');

  const skillCategories = [
    { id: 'all', name: 'All Skills', icon: Star },
    { id: 'frontend', name: 'Frontend', icon: Code2 },
    { id: 'design', name: 'Design', icon: Palette },
    { id: 'performance', name: 'Performance', icon: Zap },
    { id: 'tools', name: 'Tools', icon: Database }
  ];

  const skills = [
    {
      name: "React & Next.js",
      level: 95,
      category: "frontend",
      icon: Code2,
      color: "from-blue-500 to-cyan-500",
      experience: "3+ years",
      projects: 25,
      description: "Advanced React patterns, hooks, and Next.js full-stack applications"
    },
    {
      name: "TypeScript",
      level: 90,
      category: "frontend",
      icon: Code2,
      color: "from-blue-600 to-indigo-600",
      experience: "2+ years",
      projects: 20,
      description: "Type-safe development with advanced TypeScript features"
    },
    {
      name: "Tailwind CSS",
      level: 98,
      category: "design",
      icon: Palette,
      color: "from-teal-500 to-green-500",
      experience: "3+ years",
      projects: 30,
      description: "Custom design systems and responsive layouts"
    },
    {
      name: "Framer Motion",
      level: 85,
      category: "design",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      experience: "2+ years",
      projects: 15,
      description: "Complex animations and micro-interactions"
    },
    {
      name: "Performance Optimization",
      level: 88,
      category: "performance",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      experience: "2+ years",
      projects: 18,
      description: "Core Web Vitals, bundle optimization, and caching strategies"
    },
    {
      name: "Responsive Design",
      level: 95,
      category: "design",
      icon: Smartphone,
      color: "from-green-500 to-teal-500",
      experience: "3+ years",
      projects: 28,
      description: "Mobile-first design and cross-device compatibility"
    },
    {
      name: "Node.js & APIs",
      level: 80,
      category: "frontend",
      icon: Database,
      color: "from-emerald-500 to-green-600",
      experience: "2+ years",
      projects: 12,
      description: "Backend integration and API development"
    },
    {
      name: "UI/UX Design",
      level: 85,
      category: "design",
      icon: Palette,
      color: "from-pink-500 to-rose-500",
      experience: "2+ years",
      projects: 22,
      description: "User-centered design and prototyping"
    },
    {
      name: "SEO & Analytics",
      level: 82,
      category: "performance",
      icon: TrendingUp,
      color: "from-violet-500 to-purple-500",
      experience: "2+ years",
      projects: 16,
      description: "Technical SEO and conversion optimization"
    }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="skills" className="section-padding bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-pattern opacity-40" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-brand-500/10 to-transparent rounded-full blur-3xl" />
      
      <div ref={containerRef} className="relative z-10 container mx-auto container-padding">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4" />
            <span>Technical Expertise</span>
          </motion.div>
          
          <h2 className="heading-lg text-gray-900 dark:text-white mb-6">
            Skills & <span className="text-gradient-brand">Technologies</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Mastering modern technologies to build exceptional web experiences. 
            Each skill represents countless hours of practice and real-world application.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                variants={staggerItem}
                className="group"
              >
                <motion.div
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="card p-8 relative overflow-hidden cursor-pointer"
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {skill.level}%
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Proficiency
                      </div>
                    </div>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Globe className="w-4 h-4" />
                      <span>{skill.experience}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>{skill.projects} projects</span>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent rounded-2xl"
                    animate={{
                      borderColor: skill.level > 90 ? "rgba(16, 185, 129, 0.3)" : "rgba(0, 0, 0, 0)"
                    }}
                    whileHover={{
                      borderColor: `rgba(14, 165, 233, 0.5)`,
                      transition: { duration: 0.3 }
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="text-3xl font-bold text-gradient-brand mb-2">9+</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Core Technologies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-brand mb-2">200+</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Hours of Learning</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-brand mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Projects Built</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-brand mb-2">3+</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">Years Experience</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );

});

Skills.displayName = "Skills";

export default Skills;