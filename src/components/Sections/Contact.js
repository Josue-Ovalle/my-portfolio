'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm, validationRules, FormField } from '@/hooks/useForm';
import { containerVariants, itemVariants } from '@/utils/animations';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(
    {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    validationRules.contact
  );

  const onSubmit = async (formData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@alexchen.dev',
      href: 'mailto:hello@alexchen.dev'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: 'https://maps.google.com/?q=San Francisco, CA'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/alexchen',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/alexchen',
      color: 'hover:text-blue-600'
    },
    {
      icon: Twitter,
      label: 'Twitter',
      href: 'https://twitter.com/alexchen',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <section id="contact" className="section-padding bg-neutral-50 dark:bg-neutral-900/50">
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
              Get in Touch
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
              Ready to build your website fast and affordable with AI-assisted development? 
              Let&apos;s discuss your project and bring your vision to life.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  Send Message
                </h3>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg mb-6"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg mb-6"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>Failed to send message. Please try again or email me directly.</span>
                  </motion.div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit);
                  }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      name="name"
                      label="Full Name"
                      placeholder="Your full name"
                      value={values.name}
                      error={errors.name}
                      touched={touched.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    
                    <FormField
                      name="email"
                      label="Email Address"
                      type="email"
                      placeholder="your.email@example.com"
                      value={values.email}
                      error={errors.email}
                      touched={touched.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                  </div>

                  <FormField
                    name="subject"
                    label="Subject"
                    placeholder="Project inquiry, collaboration, etc."
                    value={values.subject}
                    error={errors.subject}
                    touched={touched.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />

                  <FormField
                    name="message"
                    label="Message"
                    type="textarea"
                    placeholder="Tell me about your project, timeline, budget, and any specific requirements..."
                    value={values.message}
                    error={errors.message}
                    touched={touched.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    rows={6}
                  />

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full btn-primary flex items-center justify-center gap-2 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors duration-300">
                        <info.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          {info.label}
                        </div>
                        <div className="text-neutral-900 dark:text-neutral-100 font-medium">
                          {info.value}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Connect With Me
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 bg-white dark:bg-neutral-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-neutral-600 dark:text-neutral-400 ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-6 text-white">
                <h4 className="text-xl font-bold mb-3">
                  Currently Available
                </h4>
                <p className="text-primary-100 mb-4">
                  I&apos;m accepting new projects and would love to hear about yours. 
                  Let&apos;s create something amazing together!
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Usually responds within 24 hours</span>
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  Quick FAQ
                </h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                      What&apos;s your typical project timeline?
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400">
                      Most projects are completed within 2-4 weeks, depending on complexity.
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                      Do you provide ongoing support?
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400">
                      Yes! I offer maintenance packages and ongoing support for all projects.
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900 dark:text-neutral-100 mb-1">
                      What makes your development different?
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400">
                      I leverage AI tools to accelerate development while maintaining high quality standards.
                    </div>
                  </div>
                </div>
              </div>

              {/* Process Timeline */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                  What to Expect
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-xs">1</span>
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">
                        Initial Response (24h)
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400">
                        I&apos;ll review your project and get back to you with questions and initial thoughts.
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-xs">2</span>
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">
                        Project Proposal (2-3 days)
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400">
                        Detailed proposal with timeline, features, and pricing.
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-xs">3</span>
                    </div>
                    <div>
                      <div className="font-medium text-neutral-900 dark:text-neutral-100">
                        Development & Updates
                      </div>
                      <div className="text-neutral-600 dark:text-neutral-400">
                        Regular progress updates and opportunities for feedback.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action Section */}
          <motion.div 
            variants={itemVariants}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Let&apos;s Build Something Amazing Together
              </h3>
              <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                Ready to accelerate your project with AI-enhanced development? 
                I&apos;m here to help you create a website that stands out and performs exceptionally.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="mailto:hello@alexchen.dev"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                  Send Direct Email
                </motion.a>
                <motion.a
                  href="https://calendly.com/alexchen"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                  Schedule a Call
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;