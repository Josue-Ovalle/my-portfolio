export const personalInfo = {
  name: "Josué Ovalle",
  tagline: "Emerging coder building fast, affordable websites with AI",
  description: "I'm an AI-assisted web developer who creates modern, performant websites using cutting-edge tools and technologies. I combine traditional coding skills with AI automation to deliver exceptional results faster and more efficiently.",
  location: "Guatemala City, GT",
  email: "josueovalle064@gmail.com",
  social: {
    github: "https://github.com/Josue-Ovalle",
    linkedin: "https://www.linkedin.com/in/josu%C3%A9-ovalle-07393437a/",
    twitter: "https://x.com/JosueOvalle_",
  }
};

export const skills = [
  { name: "React/Next.js", level: 90, category: "frontend" },
  { name: "JavaScript/TypeScript", level: 85, category: "language" },
  { name: "Tailwind CSS", level: 95, category: "styling" },
  { name: "Node.js", level: 80, category: "backend" },
  { name: "AI Tools Integration", level: 88, category: "ai" },
  { name: "Responsive Design", level: 92, category: "design" },
  { name: "Performance Optimization", level: 85, category: "optimization" },
  { name: "SEO", level: 80, category: "marketing" }
];

export const services = [
  {
    id: "webflow-development",
    title: "Webflow Development",
    description: "Custom Webflow sites with advanced interactions and CMS integration",
    icon: "Globe",
    features: ["Custom Animations", "CMS Integration", "Responsive Design", "SEO Optimization"],
    price: "From $2,500"
  },
  {
    id: "react-development",
    title: "React/Next.js Development",
    description: "Modern web applications with server-side rendering and optimal performance",
    icon: "Code2",
    features: ["SSR/SSG", "API Integration", "Database Setup", "Deployment"],
    price: "From $3,500"
  },
  {
    id: "ui-design",
    title: "UI/UX Design",
    description: "User-centered design with modern aesthetics and intuitive workflows",
    icon: "Palette",
    features: ["Wireframing", "Prototyping", "User Testing", "Design Systems"],
    price: "From $1,500"
  },
  {
    id: "ecommerce",
    title: "E-commerce Solutions",
    description: "Complete online stores with payment processing and inventory management",
    icon: "ShoppingCart",
    features: ["Payment Integration", "Inventory Management", "Admin Dashboard", "Analytics"],
    price: "From $4,000"
  },
  {
    id: "optimization",
    title: "Performance Optimization",
    description: "Speed up your website with advanced optimization techniques",
    icon: "Zap",
    features: ["Core Web Vitals", "Image Optimization", "Code Splitting", "Caching"],
    price: "From $800"
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description: "Integrate AI tools and automation into your existing workflows",
    icon: "Brain",
    features: ["ChatGPT API", "Content Generation", "Workflow Automation", "Custom AI Tools"],
    price: "From $2,000"
  }
];

export const projects = [
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with Next.js and Framer Motion",
    image: "/projects/portfolio.jpg",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    category: "portfolio",
    demoUrl: "https://josueovalle.com",
    githubUrl: "https://github.com/Josue-Ovalle/my-portfolio",
    featured: true
  },
  {
    id: "ecommerce-store",
    title: "Modern E-commerce Store",
    description: "Full-featured e-commerce platform with payment processing and admin dashboard",
    image: "/projects/ecommerce.jpg",
    technologies: ["React", "Node.js", "Stripe", "MongoDB"],
    category: "ecommerce",
    demoUrl: "https://demo-store.vercel.app",
    githubUrl: "https://github.com/alexchen/ecommerce",
    featured: true
  },
  {
    id: "landing-page",
    title: "SaaS Landing Page",
    description: "High-converting landing page with advanced animations and A/B testing",
    image: "/projects/landing.jpg",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Analytics"],
    category: "landing",
    demoUrl: "https://demo-landing.vercel.app",
    githubUrl: "https://github.com/alexchen/landing",
    featured: false
  },
  {
    id: "blog-platform",
    title: "Content Management Blog",
    description: "Full-featured blog platform with markdown support and comment system",
    image: "/projects/blog.jpg",
    technologies: ["Next.js", "MDX", "Prisma", "PostgreSQL"],
    category: "blog",
    demoUrl: "https://demo-blog.vercel.app",
    githubUrl: "https://github.com/alexchen/blog",
    featured: false
  },
  {
    id: "animated-form",
    title: "Interactive Contact Form",
    description: "Beautiful multi-step form with validation and smooth animations",
    image: "/projects/form.jpg",
    technologies: ["React", "Framer Motion", "React Hook Form", "Zod"],
    category: "component",
    demoUrl: "https://demo-form.vercel.app",
    githubUrl: "https://github.com/alexchen/animated-form",
    featured: false
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    company: "TechStart Inc.",
    content: "Alex delivered an exceptional website that exceeded our expectations. The AI-assisted development approach was incredibly efficient, and the final product is both beautiful and performant.",
    avatar: "/testimonials/sarah.jpg",
    rating: 5
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    role: "Marketing Director",
    company: "GrowthCo",
    content: "Working with Alex was a game-changer for our online presence. The combination of AI tools and solid development skills resulted in a website that converts 40% better than our previous one.",
    avatar: "/testimonials/mike.jpg",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Founder",
    company: "DesignStudio",
    content: "The attention to detail and modern design approach is outstanding. Alex's use of AI to accelerate development without compromising quality is truly impressive.",
    avatar: "/testimonials/emily.jpg",
    rating: 5
  },
  {
    id: 4,
    name: "David Kim",
    role: "Product Manager",
    company: "InnovateLabs",
    content: "Fast delivery, excellent communication, and a final product that perfectly matches our vision. The AI-enhanced workflow made the entire process smooth and efficient.",
    avatar: "/testimonials/david.jpg",
    rating: 5
  }
];

export const timeline = [
  {
    year: "2024",
    title: "AI-Enhanced Web Development",
    description: "Started integrating AI tools into web development workflow, focusing on Next.js and modern frameworks."
  },
  {
    year: "2023",
    title: "Full-Stack Development",
    description: "Expanded skills to include backend development with Node.js and database management."
  },
  {
    year: "2022",
    title: "Frontend Specialization",
    description: "Focused on React, Tailwind CSS, and modern frontend development practices."
  },
  {
    year: "2021",
    title: "Started Web Development Journey",
    description: "Began learning HTML, CSS, and JavaScript through online courses and personal projects."
  }
];