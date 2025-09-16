'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { staggerContainer, staggerItem } from '@/utils/animations';
import { useAdvancedScrollAnimation, use3DTilt } from '@/hooks/useAdvancedScrollAnimation';
import AnimatedButton from '@/components/UI/AnimatedButton';
import { useForm } from '@/hooks/useForm';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
    timeline: ''
  };

  const validationRules = {
    name: {
      required: 'Name is required'
    },
    email: {
      required: 'Email is required',
      email: 'Email is invalid'
    },
    subject: {
      required: 'Subject is required'
    },
    message: {
      required: 'Message is required',
      minLength: {
        value: 10,
        message: 'Message must be at least 10 characters'
      }
    }
  };

  const { values, errors, handleChange, handleSubmit, reset } = useForm(initialValues, validationRules);

  const handleFormSubmit = async (formValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      description: 'Send me an email'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone || '+502 1234-5678',
      href: `tel:${personalInfo.phone || '+50212345678'}`,
      description: 'Give me a call'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
      href: '#',
      description: 'Based in Guatemala'
    }
  ];

  const budgetOptions = [
    '$1,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+'
  ];

  const timelineOptions = [
    '1-2 weeks',
    '2-4 weeks',
    '1-2 months',
    '2+ months'
  ];

  if (isSubmitted) {
    return (
      <section id="contact" className="section-padding bg-neutral-50 dark:bg-neutral-900">
        <div className="container mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-12 shadow-xl">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </motion.div>
              
              <h2 className="heading-md text-neutral-900 dark:text-neutral-100 mb-4">
                Message Sent Successfully!
              </h2>
              
              <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
                Thank you for reaching out. I&apos;ll get back to you within 24 hours.
              </p>
              
              <motion.button
                onClick={() => setIsSubmitted(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Send Another Message
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-padding bg-neutral-50 dark:bg-neutral-900">
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
            <h2 className="heading-lg text-neutral-900 dark:text-neutral-100 mb-6">
              Let&apos;s Work <span className="text-gradient-brand">Together</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Ready to bring your project to life? Let&apos;s discuss your ideas and create something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div variants={staggerItem} className="space-y-8">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  Send a Message
                </h3>
                
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(handleFormSubmit); }} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={values.name}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        className={`form-input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="form-label">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        className={`form-input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="form-label">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={values.subject}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                      className={`form-input ${errors.subject ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Project inquiry, consultation, etc."
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="budget" className="form-label">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={values.budget}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        className="form-input"
                      >
                        <option value="">Select budget range</option>
                        {budgetOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="timeline" className="form-label">
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={values.timeline}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                        className="form-input"
                      >
                        <option value="">Select timeline</option>
                        {timelineOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="form-label">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={values.message}
                      onChange={(e) => handleChange(e.target.name, e.target.value)}
                      className={`form-textarea ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Tell me about your project, goals, and how I can help you..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary w-full flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={staggerItem} className="space-y-8">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  Get in Touch
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    return (
                      <motion.a
                        key={info.label}
                        href={info.href}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors group"
                      >
                        <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-xl flex items-center justify-center group-hover:bg-brand-200 dark:group-hover:bg-brand-800/40 transition-colors">
                          <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                            {info.label}
                          </h4>
                          <p className="text-neutral-600 dark:text-neutral-300 mb-1">
                            {info.value}
                          </p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {info.description}
                          </p>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
              
              {/* Availability Status */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  <h3 className="text-xl font-bold">Currently Available</h3>
                </div>
                <p className="text-green-100 mb-6">
                  I&apos;m accepting new projects and would love to hear about yours. 
                  Let&apos;s create something amazing together!
                </p>
                <div className="flex items-center gap-2 text-sm text-green-100">
                  <CheckCircle className="w-4 h-4" />
                  <span>Usually responds within 24 hours</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  Connect with Me
                </h3>
                
                <div className="flex gap-4">
                  {Object.entries(personalInfo.social).map(([platform, url]) => (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-xl flex items-center justify-center hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors group"
                    >
                      <span className="text-neutral-600 dark:text-neutral-300 group-hover:text-brand-600 dark:group-hover:text-brand-400 font-medium capitalize">
                        {platform.charAt(0).toUpperCase()}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            variants={staggerItem}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-12">
              Frequently Asked Questions
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "What's your typical project timeline?",
                  answer: "Most projects take 2-8 weeks depending on complexity. I'll provide a detailed timeline after our initial consultation."
                },
                {
                  question: "Do you work with startups?",
                  answer: "Absolutely! I love working with startups and understand the unique challenges of early-stage companies."
                },
                {
                  question: "What's included in your services?",
                  answer: "Full project includes design, development, testing, deployment, and post-launch support for 30 days."
                },
                {
                  question: "How do we communicate during the project?",
                  answer: "I use Slack or email for regular updates and schedule weekly video calls to review progress and gather feedback."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                  className="text-left bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg"
                >
                  <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                    {faq.question}
                  </h4>
                  <p className="text-neutral-600 dark:text-neutral-300">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;