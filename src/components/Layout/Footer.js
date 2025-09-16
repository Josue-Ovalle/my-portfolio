'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Heart, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { personalInfo } from '@/data/portfolioData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: personalInfo.social.github,
      label: 'GitHub',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      icon: Linkedin,
      href: personalInfo.social.linkedin,
      label: 'LinkedIn',
      color: 'hover:text-blue-600'
    },
    {
      icon: Twitter,
      href: personalInfo.social.twitter,
      label: 'Twitter',
      color: 'hover:text-blue-400'
    },
    {
      icon: Mail,
      href: `mailto:${personalInfo.email}`,
      label: 'Email',
      color: 'hover:text-brand-600'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Web Development',
    'UI/UX Design',
    'E-commerce Solutions',
    'Performance Optimization',
    'AI Integration',
    'Consulting'
  ];

  const handleNavClick = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
  <footer className="bg-neutral-900 dark:bg-neutral-950 text-neutral-300 border-t border-neutral-800 dark:border-neutral-800">
    {/* Main Footer Content */}
    <div className="container mx-auto container-padding py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold text-gradient-brand mb-4">
              {personalInfo.name.split(' ').map(word => word[0]).join('')}
            </div>
            <p className="text-neutral-400 mb-6 leading-relaxed">
              {personalInfo.tagline}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 bg-neutral-800 dark:bg-neutral-900 rounded-lg transition-all duration-300 ${social.color} backdrop-blur-sm`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Links */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-neutral-400 hover:text-brand-400 transition-colors duration-300 cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Services */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-neutral-400">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact Info */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <p className="text-neutral-400">
                Ready to start your project?
              </p>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-brand-400 hover:text-brand-300 transition-colors duration-300"
              >
                {personalInfo.email}
              </a>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-neutral-400">Available for new projects</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="mt-12 pt-8 border-t border-neutral-800 dark:border-neutral-700"
      >
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
          <p className="text-neutral-400 text-sm mb-4">
            Get notified about new projects and development insights.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-neutral-800 dark:bg-neutral-900 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all duration-300 backdrop-blur-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-neutral-900"
              aria-label="Subscribe"
            >
              <Mail className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>

    {/* Bottom Footer */}
    <div className="border-t border-neutral-800 dark:border-neutral-700">
      <div className="container mx-auto container-padding py-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-neutral-400 text-sm mb-4 md:mb-0"
          >
            <span>© {currentYear} {personalInfo.name}. Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>and AI assistance.</span>
          </motion.div>
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-neutral-400 text-sm"
            >
              <span>Built with Next.js & Tailwind CSS</span>
            </motion.div>
            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-2 bg-neutral-800 dark:bg-neutral-900 hover:bg-brand-600 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;