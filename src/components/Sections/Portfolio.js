'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Filter, X } from 'lucide-react';
import { projects } from '@/data/portfolioData';
import { containerVariants, itemVariants, cardHover } from '@/utils/animations';
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
      variants={itemVariants}
      {...cardHover}
      className="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 shadow-lg"
    >
      {/* Project Image */}
      <div className="relative h-64 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900 to-purple-900 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-primary-300 dark:text-primary-700">
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
          <div className="absolute top-4 left-4 px-3 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
            Featured
          </div>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium rounded"
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
        className="bg-white dark:bg-neutral-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {project.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors duration-300"
          >
            <X className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Project Image */}
          <div className="h-64 bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900 to-purple-900 rounded-lg mb-6 flex items-center justify-center text-8xl font-bold text-primary-300 dark:text-primary-700">
            {project.title.charAt(0)}
          </div>

          {/* Description */}
          <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <motion.a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 btn-primary text-center flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              View Demo
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 btn-secondary text-center flex items-center justify-center gap-2"
            >
              <Github className="w-5 h-5" />
              Source Code
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
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"} 
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="heading-md text-neutral-900 dark:text-neutral-100 mb-6">
              Featured Projects
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              A showcase of recent projects built with modern technologies and AI-enhanced development workflows.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div 
            variants={itemVariants}
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
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
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
            variants={itemVariants}
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