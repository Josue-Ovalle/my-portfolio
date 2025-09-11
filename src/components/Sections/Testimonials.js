'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/portfolioData';
import { containerVariants, itemVariants } from '@/utils/animations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Testimonials = () => {
  const { ref, isInView } = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const StarRating = ({ rating }) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating 
              ? 'text-yellow-400 fill-current' 
              : 'text-neutral-300 dark:text-neutral-600'
          }`}
        />
      ))}
    </div>
  );

  const TestimonialCard = ({ testimonial, isActive, isPrev, isNext }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3,
        scale: isActive ? 1 : 0.95,
        x: isPrev ? '-100%' : isNext ? '100%' : '0%'
      }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`absolute inset-0 flex items-center justify-center ${
        isActive ? 'z-10' : 'z-0'
      }`}
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Quote Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: isActive ? 1 : 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Quote className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </motion.div>

        {/* Testimonial Content */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-2xl md:text-3xl lg:text-4xl font-light text-neutral-900 dark:text-neutral-100 leading-relaxed mb-8 italic"
        >
          &quot;{testimonial.content}&quot;
        </motion.blockquote>

        {/* Author Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex items-center justify-center space-x-4"
        >
          {/* Avatar */}
          <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {testimonial.name.charAt(0)}
          </div>

          <div className="text-left">
            <div className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
              {testimonial.name}
            </div>
            <div className="text-neutral-600 dark:text-neutral-400">
              {testimonial.role}
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-500">
              {testimonial.company}
            </div>
          </div>
        </motion.div>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.8 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="flex justify-center mt-6"
        >
          <StarRating rating={testimonial.rating} />
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section id="testimonials" className="section-padding bg-neutral-50 dark:bg-neutral-900/30">
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
              What Clients Say
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Don&apos;t just take my word for it. Here&apos;s what clients have to say about 
              working with me and the results we&apos;ve achieved together.
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <motion.div 
            variants={itemVariants}
            className="relative h-96 md:h-80 overflow-hidden mb-12"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === currentIndex}
                isPrev={index === (currentIndex - 1 + testimonials.length) % testimonials.length}
                isNext={index === (currentIndex + 1) % testimonials.length}
              />
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-neutral-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-neutral-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
            </button>
          </motion.div>

          {/* Dots Indicator */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center space-x-3 mb-12"
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-800 ${
                  index === currentIndex
                    ? 'bg-primary-600 scale-125'
                    : 'bg-neutral-300 dark:bg-neutral-600 hover:bg-primary-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                100%
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                Client Satisfaction
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                48h
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                Average Response Time
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                15+
              </div>
              <div className="text-neutral-600 dark:text-neutral-400">
                Happy Clients
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Ready to Join These Happy Clients?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let&apos;s discuss your project and see how AI-enhanced development 
              can accelerate your success.
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
              Let&apos;s Work Together
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;