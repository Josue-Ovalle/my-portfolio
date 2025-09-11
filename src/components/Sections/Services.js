'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Check, Globe, Code2, Palette, ShoppingCart, Zap, Brain } from 'lucide-react';
import { services } from '@/data/portfolioData';
import { containerVariants, itemVariants, cardHover } from '@/utils/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Services = () => {
  const { ref, isInView } = useScrollAnimation();
  const [hoveredService, setHoveredService] = useState(null);

  const iconComponents = {
    Globe,
    Code2,
    Palette,
    ShoppingCart,
    Zap,
    Brain
  };

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const offsetTop = contactSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="services" className="section-padding bg-neutral-50 dark:bg-neutral-900/30">
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
              Services I Offer
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              From concept to launch, I provide comprehensive web development services 
              enhanced by AI tools for faster delivery and superior results.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconComponents[service.icon];
              
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  {...cardHover} // This is what needs to be updated
                  onHoverStart={() => setHoveredService(service.id)}
                  onHoverEnd={() => setHoveredService(null)}
                  className="card group relative overflow-hidden"
                >
                  {/* Background Gradient */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredService === service.id ? 0.1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary-500 to-purple-500"
                  />

                  <div className="relative p-8">
                    {/* Icon */}
                    <motion.div 
                      className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors duration-300"
                      whileHover={{ rotate: 3, scale: 1.05 }} // Updated from rotate: 5, scale: 1.1
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <IconComponent className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + featureIndex * 0.05 }}
                          className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                        >
                          <Check className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                        {service.price}
                      </span>
                      
                      <motion.button
                        onClick={handleContactClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-300"
                      >
                        Get Quote
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: hoveredService === service.id ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-purple-500 origin-left"
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Process Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-12">
              My Development Process
            </h3>

            <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "Understanding your needs, goals, and target audience"
                },
                {
                  step: "02", 
                  title: "Planning",
                  description: "Creating wireframes, choosing tech stack, and project timeline"
                },
                {
                  step: "03",
                  title: "Development",
                  description: "Building with modern tools and AI-enhanced coding practices"
                },
                {
                  step: "04",
                  title: "Launch",
                  description: "Testing, optimization, deployment, and ongoing support"
                }
              ].map((phase, index) => (
                <motion.div
                  key={phase.step}
                  variants={itemVariants}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                      {phase.step}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    {phase.title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {phase.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how AI-enhanced development can accelerate your project 
                and deliver exceptional results within your budget.
              </p>
              <motion.button
                onClick={handleContactClick}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/30"
              >
                Get in Touch
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;