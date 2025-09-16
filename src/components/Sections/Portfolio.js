'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Filter, X } from 'lucide-react';
import { projects } from '@/data/portfolioData';
import { staggerContainer, staggerItem, cardHover } from '@/utils/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Portfolio = () => {
  const { ref, isInView } = useScrollAnimation();
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'portfolio', name: 'Portfolio' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'landing', name: 'Landing Pages' },
    { id: 'blog', name: 'Blog/CMS' },
    { id: 'component', name: 'Components' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const ProjectCard = ({ project, index }) => (
    <motion.div
      variants={staggerItem}
      {...cardHover}
      className="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 shadow-lg"
    >
      {/* Project Image */}
      <div className="relative h-64 bg-gradient-to-br from-brand-100 to-purple-100 dark:from-brand-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-brand-300 dark:text-brand-700">
          {project.title.charAt(0)}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute inset-0 flex items-center justify-center space-x-4">
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors duration-300"
              aria-label="View demo"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors duration-300"
              aria-label="View source code"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.button
              onClick={() => setSelectedProject(project)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors duration-300"
              aria-label="View details"
            >
              <Filter className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-brand-600 text-white text-xs font-semibold rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-xs font-medium rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const ProjectModal = ({ project, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-neutral-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {project.title}
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-4">
                {project.shortDescription}
              </p>
              <div className="flex items-center gap-6 text-sm text-neutral-500 dark:text-neutral-400">
                <span>Timeline: {project.timeline}</span>
                <span>Team: {project.teamSize}</span>
                <span>Year: {project.year}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors duration-300"
            >
              <X className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Project Image */}
            <div className="h-64 bg-gradient-to-br from-brand-100 to-purple-100 dark:from-brand-900 to-purple-900 rounded-xl flex items-center justify-center text-8xl font-bold text-brand-300 dark:text-brand-700">
              {project.title.charAt(0)}
            </div>
            
            {/* Key Results */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Key Results
              </h3>
              <div className="p-4 bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20 rounded-lg">
                <div className="text-2xl font-bold text-brand-600 dark:text-brand-400 mb-1">
                  {project.results.primary}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Primary Impact
                </p>
              </div>
              
              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                {project.results.metrics.slice(0, 4).map((metric, index) => (
                  <div key={index} className="p-3 bg-neutral-50 dark:bg-neutral-700/50 rounded-lg">
                    <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                      {metric.improvement}
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Problem Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              The Challenge
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed pl-10">
              {project.problem}
            </p>
          </div>

          {/* Process Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              My Process
            </h3>
            <div className="pl-10 space-y-3">
              {project.process.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-brand-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed flex-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Solution Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              The Solution
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed pl-10">
              {project.solution}
            </p>
            
            {/* Tech Stack */}
            <div className="pl-10">
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-medium rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
              The Results
            </h3>
            <div className="pl-10">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {project.results.metrics.map((metric, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-700/50 dark:to-neutral-600/50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {metric.label}
                      </span>
                      <span className="text-lg font-bold text-brand-600 dark:text-brand-400">
                        {metric.improvement}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
                      <span>Before: {metric.before}</span>
                      <span>After: {metric.after}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Client Testimonial */}
          {project.testimonial && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Client Testimonial
              </h3>
              <div className="p-6 bg-gradient-to-r from-brand-50 to-purple-50 dark:from-brand-900/20 dark:to-purple-900/20 rounded-xl border border-brand-200 dark:border-brand-800">
                <blockquote className="text-lg text-neutral-700 dark:text-neutral-300 mb-4 italic leading-relaxed">
                  &quot;{project.testimonial.quote}&quot;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold">
                    {project.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                      {project.testimonial.author}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">
                      {project.testimonial.role} at {project.testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 btn-primary text-center flex items-center justify-center gap-2 py-3"
            >
              <ExternalLink className="w-5 h-5" />
              View Live Demo
            </motion.a>
            <motion.a
              href={project.caseStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 btn-secondary text-center flex items-center justify-center gap-2 py-3"
            >
              <Github className="w-5 h-5" />
              Full Case Study
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section id="portfolio" className="section-padding bg-neutral-50 dark:bg-neutral-900/30">
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
              Featured Projects
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              A showcase of recent projects built with modern technologies and AI-enhanced development workflows.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div 
            variants={staggerItem}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setFilter(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-brand-600 text-white shadow-lg'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 hover:text-brand-600 dark:hover:text-brand-400'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">
                No projects found in this category.
              </p>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div 
            variants={staggerItem}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Like What You See?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              These projects represent just a fraction of what&apos;s possible with AI-enhanced development. 
              Let&apos;s create something amazing together.
            </p>
            <motion.button
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  const offsetTop = contactSection.offsetTop - 80;
                  window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                  });
                }
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(14, 165, 233, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
            >
              Start Your Project
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default Portfolio;