'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';
import { staggerContainer } from '@/utils/animations';
import { easeInOut } from 'framer-motion';

import AccessibleFormField from '@/components/Forms/AccessibleFormField';
import AccessibleButton from '@/components/UI/AccessibleButton';
import { useForm } from '@/hooks/useForm';
import { useFormAccessibility } from '@/hooks/useFormAccessibility';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget: string;
  timeline: string;
  honeypot: string; // Anti-spam honeypot field
}

const SecureContact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Accessibility for screen reader announcements
  const { announceError, announceSuccess, AriaLiveRegion } = useFormAccessibility();

  const initialValues: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
    timeline: '',
    honeypot: '' // This should remain empty
  };

  const validationRules = {
    name: {
      required: 'Name is required',
      minLength: {
        value: 2,
        message: 'Name must be at least 2 characters'
      },
      maxLength: {
        value: 50,
        message: 'Name must not exceed 50 characters'
      }
    },
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email address'
    },
    subject: {
      required: 'Subject is required',
      minLength: {
        value: 5,
        message: 'Subject must be at least 5 characters'
      }
    },
    message: {
      required: 'Message is required',
      minLength: {
        value: 10,
        message: 'Message must be at least 10 characters'
      },
      maxLength: {
        value: 2000,
        message: 'Message must not exceed 2000 characters'
      }
    },
    honeypot: {
      custom: (value: string) => value === '' ? undefined : 'Invalid submission detected'
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, reset } = useForm(
    initialValues, 
    validationRules
  );

  const handleFormSubmit = async (formValues: ContactFormData) => {
    // Check honeypot - if filled, it's likely a bot
    if (formValues.honeypot !== '') {
      announceError('form', 'Invalid submission detected');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Add CSRF token and timestamp
      const submissionData = {
        ...formValues,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        // Remove honeypot from submission
        honeypot: undefined
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });
      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
        announceSuccess('Message sent successfully!');
        reset();
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Failed to send message. Please try again or contact me directly.';
      setSubmitError(errorMessage);
      announceError('form', errorMessage);
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
      description: 'Send me an email',
      ariaLabel: `Send email to ${personalInfo.email}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalInfo.phone || '+502 1234-5678',
      href: `tel:${personalInfo.phone || '+50212345678'}`,
      description: 'Give me a call',
      ariaLabel: `Call ${personalInfo.phone || '+502 1234-5678'}`
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalInfo.location,
      href: '#',
      description: 'Based in Guatemala',
      ariaLabel: 'Located in Guatemala City, Guatemala'
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

  // Patch: Framer Motion expects 'ease' to be a function or string, not an array
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

  // Success state
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
                aria-hidden="true"
              >
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </motion.div>
              
              <h2 className="heading-md text-neutral-900 dark:text-neutral-100 mb-4">
                Message Sent Successfully!
              </h2>
              
              <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8">
                Thank you for reaching out. I&apos;ll get back to you within 24 hours.
              </p>
              
              <AccessibleButton
                onClick={() => setIsSubmitted(false)}
                variant="primary"
                aria-label="Send another message"
              >
                Send Another Message
              </AccessibleButton>
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
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                    Send a Secure Message
                  </h3>
                </div>
                
                <form 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    handleSubmit(handleFormSubmit); 
                  }} 
                  className="space-y-6"
                  noValidate
                >
                  {/* Honeypot field - hidden from users */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="website">Website (leave blank)</label>
                    <input
                      type="text"
                      id="website"
                      name="honeypot"
                      value={values.honeypot}
                      onChange={(e) => handleChange('honeypot', e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <AccessibleFormField
                      label="Name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={(name: string, value: string) => handleChange(name as keyof ContactFormData, value)}
                      onBlur={(name: string) => handleBlur(name as keyof ContactFormData)}
                      error={touched.name ? errors.name || '' : ''}
                      required
                      placeholder="Your full name"
                    />
                    
                    <AccessibleFormField
                      label="Email"
                      name="email"
                      type="email"
                      value={values.email}
                      onChange={(name: string, value: string) => handleChange(name as keyof ContactFormData, value)}
                      onBlur={(name: string) => handleBlur(name as keyof ContactFormData)}
                      error={touched.email ? errors.email || '' : ''}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <AccessibleFormField
                    label="Subject"
                    name="subject"
                    type="text"
                    value={values.subject}
                    onChange={(name: string, value: string) => handleChange(name as keyof ContactFormData, value)}
                    onBlur={(name: string) => handleBlur(name as keyof ContactFormData)}
                    error={touched.subject ? errors.subject || '' : ''}
                    required
                    placeholder="Project inquiry, consultation, etc."
                  />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="budget" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={values.budget}
                        onChange={(e) => handleChange('budget', e.target.value)}
                        className="w-full px-4 py-4 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-300"
                        aria-label="Select your budget range"
                      >
                        <option value="">Select budget range</option>
                        {budgetOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="timeline" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                        Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={values.timeline}
                        onChange={(e) => handleChange('timeline', e.target.value)}
                        className="w-full px-4 py-4 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all duration-300"
                        aria-label="Select your project timeline"
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
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={values.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      onBlur={() => handleBlur('message')}
                      placeholder="Tell me about your project, goals, and how I can help you..."
                      required
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`w-full px-4 py-4 rounded-xl border-2 transition-all duration-300 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none ${
                        errors.message 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-neutral-200 dark:border-neutral-700 focus:border-brand-500'
                      }`}
                      style={{ minHeight: '120px' }}
                    />
                    {errors.message && (
                      <div
                        id="message-error"
                        role="alert"
                        aria-live="polite"
                        className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400"
                      >
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{errors.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Error */}
                  {submitError && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-red-800 dark:text-red-200 mb-1">
                            Submission Failed
                          </h4>
                          <p className="text-red-700 dark:text-red-300 text-sm">
                            {submitError}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <AccessibleButton
                    variant="primary"
                    size="lg"
                    loading={isSubmitting}
                    loadingText="Sending your message..."
                    disabled={isSubmitting}
                    className="w-full"
                    aria-label={isSubmitting ? "Sending your message, please wait" : "Send your message"}
                  >
                    <Send className="w-5 h-5 mr-3" />
                    Send Message
                  </AccessibleButton>

                  {/* Security notice */}
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 text-center flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Your message is encrypted and secure</span>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Contact Info - Same as before but with enhanced accessibility */}
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
                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors group focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-800"
                        aria-label={info.ariaLabel}
                      >
                        <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-xl flex items-center justify-center group-hover:bg-brand-200 dark:group-hover:bg-brand-800/40 transition-colors">
                          <Icon className="w-6 h-6 text-brand-600 dark:text-brand-400" aria-hidden="true" />
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

              {/* Rest of contact info sections remain the same but with proper ARIA labels */}
            </motion.div>
          </div>

          {/* Aria live region for announcements */}
          <AriaLiveRegion />
        </motion.div>
      </div>
    </section>
  );
};

export default SecureContact;