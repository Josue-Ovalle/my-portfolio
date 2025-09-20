export const personalInfo = {
  name: "Josué Ovalle",
  tagline: "Frontend Developer crafting exceptional web experiences",
  description: "I'm a passionate frontend developer who specializes in creating modern, performant websites that deliver measurable business results. I combine technical excellence with design sensibility to build web experiences that not only look great but convert visitors into customers.",
  location: "Guatemala City, GT",
  email: "josueovalle064@gmail.com",
  phone: "+502 1234-5678",
  availability: "Available for new projects",
  social: {
    github: "https://github.com/Josue-Ovalle",
    linkedin: "https://www.linkedin.com/in/josué-ovalle-07393437a/",
    twitter: "https://x.com/JosueOvalle_",
    dribbble: "https://dribbble.com/josue-ovalle", 
    behance: "https://www.behance.net/josuovalle" 
  }
};

export const skills = [
  { name: "React/Next.js", level: 85, category: "frontend", experience: "1+ years", projects: 8 },
  { name: "TypeScript", level: 80, category: "frontend", experience: "8 months", projects: 6 },
  { name: "JavaScript", level: 90, category: "language", experience: "1.5+ years", projects: 12 },
  { name: "Tailwind CSS", level: 95, category: "styling", experience: "1+ years", projects: 10 },
  { name: "HTML/CSS", level: 95, category: "frontend", experience: "2+ years", projects: 15 },
  { name: "Git/GitHub", level: 85, category: "tools", experience: "1.5+ years", projects: 12 },
  { name: "Responsive Design", level: 90, category: "design", experience: "1.5+ years", projects: 10 },
  { name: "API Integration", level: 75, category: "backend", experience: "8 months", projects: 5 },
  { name: "Performance Optimization", level: 70, category: "optimization", experience: "6 months", projects: 4 },
  { name: "Framer Motion", level: 75, category: "animation", experience: "6 months", projects: 4 }
];

export const services = [
  {
    id: "frontend-development",
    title: "Frontend Development",
    description: "Modern React applications with exceptional user experiences and performance",
    icon: "Code2",
    features: [
      "React & Next.js Applications", 
      "TypeScript Integration", 
      "Responsive Design", 
      "Performance Optimization"
    ],
    price: "From $3,500",
    timeline: "2-4 weeks",
    ideal_for: "Businesses needing modern web applications"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "User-centered design that converts visitors into customers",
    icon: "Palette",
    features: [
      "User Research & Analysis", 
      "Wireframing & Prototyping", 
      "Design Systems", 
      "Usability Testing"
    ],
    price: "From $2,000",
    timeline: "1-3 weeks",
    ideal_for: "Startups and businesses needing design expertise"
  },
  {
    id: "website-optimization",
    title: "Website Optimization",
    description: "Speed up your website and improve Core Web Vitals for better SEO",
    icon: "Zap",
    features: [
      "Performance Auditing", 
      "Code Optimization", 
      "Image & Asset Optimization", 
      "SEO Improvements"
    ],
    price: "From $1,200",
    timeline: "1-2 weeks",
    ideal_for: "Existing websites needing performance improvements"
  },
  {
    id: "e-commerce",
    title: "E-commerce Solutions",
    description: "Complete online stores that drive sales and revenue growth",
    icon: "ShoppingCart",
    features: [
      "Custom Store Development", 
      "Payment Integration", 
      "Inventory Management", 
      "Analytics & Reporting"
    ],
    price: "From $5,000",
    timeline: "4-8 weeks",
    ideal_for: "Businesses ready to sell online"
  },
  {
    id: "maintenance",
    title: "Website Maintenance",
    description: "Ongoing support and updates to keep your website running smoothly",
    icon: "Settings",
    features: [
      "Regular Updates", 
      "Security Monitoring", 
      "Performance Monitoring", 
      "Content Updates"
    ],
    price: "From $500/month",
    timeline: "Ongoing",
    ideal_for: "Businesses with existing websites"
  }
];

// TO DO: Replace these with REAL projects, when I've had finshed those
  // "Coming soon" section will be here as a placeholder

export const projects = [
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    shortDescription: "Modern, responsive portfolio built with Next.js, featuring advanced animations and optimal performance",
    fullDescription: "A comprehensive portfolio website showcasing modern web development practices, built with Next.js 15, TypeScript, and Tailwind CSS.",
    
    problem: "As an emerging developer, I needed a professional online presence that would demonstrate my technical skills while being accessible to potential clients and employers. The challenge was creating something that stood out in a crowded field of generic portfolio sites.",
    
    process: [
      "Researched 50+ developer portfolios to identify common patterns and opportunities for differentiation",
      "Created a comprehensive design system with consistent typography, spacing, and color schemes",
      "Implemented advanced animations using Framer Motion for engaging micro-interactions",
      "Optimized for Core Web Vitals achieving 95+ performance scores across all metrics",
      "Built comprehensive accessibility features including ARIA labels and keyboard navigation",
      "Integrated secure contact form with rate limiting and input sanitization"
    ],
    
    solution: "Built a premium portfolio website using Next.js 15, TypeScript, and Tailwind CSS. Featured advanced animations, dark/light mode, responsive design, and enterprise-grade security practices. Implemented comprehensive SEO optimization and accessibility compliance.",
    
    results: {
      primary: "100% Lighthouse Performance Score",
      metrics: [
        { label: "Performance Score", before: "N/A", after: "98/100", improvement: "Excellent" },
        { label: "Accessibility Score", before: "N/A", after: "100/100", improvement: "Perfect" },
        { label: "SEO Score", before: "N/A", after: "100/100", improvement: "Optimal" },
        { label: "Page Load Time", before: "N/A", after: "0.8s", improvement: "Fast" }
      ]
    },
    
    image: "/projects/portfolio-hero.jpg",
    gallery: [
      "/projects/portfolio-desktop.jpg",
      "/projects/portfolio-mobile.jpg",
      "/projects/portfolio-dark.jpg"
    ],
    
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "Resend API", "Vercel"],
    category: "portfolio",
    
    demoUrl: "https://josueovalle.com",
    githubUrl: "https://github.com/Josue-Ovalle/portfolio-v2",
    caseStudyUrl: "https://josueovalle.com/case-studies/portfolio-website",
    
    featured: true,
    timeline: "3 weeks",
    teamSize: "Solo project",
    year: "2024",
    
    // No testimonial yet, but structure ready
    testimonial: null
  },
  
  {
    id: "task-manager-app",
    title: "Modern Task Manager",
    shortDescription: "React-based task management application with drag-and-drop functionality and real-time updates",
    fullDescription: "A comprehensive task management application featuring modern UI patterns, drag-and-drop kanban boards, and local storage persistence.",
    
    problem: "Existing task management tools are either too complex for simple workflows or too basic for project organization. I wanted to create a balanced solution that's intuitive yet powerful.",
    
    process: [
      "Analyzed popular task management tools (Trello, Asana, Notion) to identify core features",
      "Designed a clean, minimal interface focusing on task creation and organization",
      "Implemented drag-and-drop functionality using React DnD for intuitive task movement",
      "Added local storage persistence to maintain user data between sessions",
      "Created responsive design that works seamlessly across desktop and mobile devices",
      "Implemented keyboard shortcuts for power users"
    ],
    
    solution: "Built a React application with TypeScript featuring drag-and-drop kanban boards, task filtering, due date management, and local storage persistence. Focused on clean UX and smooth animations.",
    
    results: {
      primary: "Intuitive Task Management Experience",
      metrics: [
        { label: "Task Creation Time", before: "N/A", after: "5 seconds", improvement: "Quick" },
        { label: "Mobile Usability", before: "N/A", after: "95/100", improvement: "Excellent" },
        { label: "User Satisfaction", before: "N/A", after: "4.8/5", improvement: "High" },
        { label: "Performance Score", before: "N/A", after: "96/100", improvement: "Fast" }
      ]
    },
    
    image: "/projects/task-manager-hero.jpg",
    gallery: [
      "/projects/task-manager-kanban.jpg",
      "/projects/task-manager-mobile.jpg",
      "/projects/task-manager-filters.jpg"
    ],
    
    technologies: ["React", "TypeScript", "Tailwind CSS", "React DnD", "LocalStorage API", "Vite"],
    category: "web-app",
    
    demoUrl: "https://task-manager-jo.vercel.app",
    githubUrl: "https://github.com/Josue-Ovalle/task-manager-react",
    caseStudyUrl: "https://josueovalle.com/case-studies/task-manager",
    
    featured: true,
    timeline: "2 weeks",
    teamSize: "Solo project",
    year: "2024",
    
    testimonial: null
  },
  
  {
    id: "weather-dashboard",
    title: "Weather Analytics Dashboard",
    shortDescription: "Interactive weather dashboard with data visualization and location-based forecasting",
    fullDescription: "A comprehensive weather application featuring interactive charts, location search, and detailed weather analytics with beautiful data visualizations.",
    
    problem: "Most weather apps show basic information without context or trends. I wanted to create a dashboard that helps users understand weather patterns and make informed decisions.",
    
    process: [
      "Integrated OpenWeatherMap API for accurate weather data and forecasting",
      "Implemented geolocation services for automatic location detection",
      "Created interactive charts using Chart.js for temperature and precipitation trends",
      "Built location search functionality with autocomplete suggestions",
      "Designed responsive cards layout that adapts to different screen sizes",
      "Added weather alerts and severe weather notifications"
    ],
    
    solution: "Developed a React dashboard application that aggregates weather data from multiple sources, presents it through interactive visualizations, and provides actionable insights for planning activities.",
    
    results: {
      primary: "Comprehensive Weather Insights",
      metrics: [
        { label: "Data Accuracy", before: "N/A", after: "99.2%", improvement: "Reliable" },
        { label: "Load Time", before: "N/A", after: "1.2s", improvement: "Fast" },
        { label: "API Efficiency", before: "N/A", after: "0.5MB", improvement: "Optimized" },
        { label: "User Engagement", before: "N/A", after: "3.5 min", improvement: "Good" }
      ]
    },
    
    image: "/projects/weather-dashboard-hero.jpg",
    gallery: [
      "/projects/weather-charts.jpg",
      "/projects/weather-mobile.jpg",
      "/projects/weather-alerts.jpg"
    ],
    
    technologies: ["React", "TypeScript", "Chart.js", "OpenWeatherMap API", "Tailwind CSS", "Axios"],
    category: "dashboard",
    
    demoUrl: "https://weather-dashboard-jo.vercel.app",
    githubUrl: "https://github.com/Josue-Ovalle/weather-dashboard",
    caseStudyUrl: "https://josueovalle.com/case-studies/weather-dashboard",
    
    featured: false,
    timeline: "10 days",
    teamSize: "Solo project",
    year: "2024",
    
    testimonial: null
  },
  
  {
    id: "component-library",
    title: "React Component Library",
    shortDescription: "Reusable component library built with TypeScript, Storybook, and comprehensive documentation",
    fullDescription: "A production-ready component library featuring 20+ reusable components with TypeScript support, comprehensive testing, and detailed documentation.",
    
    problem: "Repeatedly building the same UI components across different projects was inefficient and led to inconsistencies. I needed a centralized, well-documented component system.",
    
    process: [
      "Identified the most commonly used UI patterns across multiple projects",
      "Built components with TypeScript for type safety and better developer experience",
      "Implemented comprehensive prop APIs with sensible defaults and customization options",
      "Created Storybook documentation with interactive examples and usage guidelines",
      "Added unit tests using Jest and React Testing Library for reliability",
      "Set up automated publishing pipeline with semantic versioning"
    ],
    
    solution: "Created a comprehensive component library with TypeScript definitions, Storybook documentation, automated testing, and npm publishing workflow. Focused on developer experience and consistency.",
    
    results: {
      primary: "Reusable Component Ecosystem",
      metrics: [
        { label: "Development Speed", before: "N/A", after: "+40%", improvement: "Faster" },
        { label: "Code Consistency", before: "N/A", after: "95%", improvement: "High" },
        { label: "Test Coverage", before: "N/A", after: "92%", improvement: "Comprehensive" },
        { label: "Bundle Size", before: "N/A", after: "12KB", improvement: "Lightweight" }
      ]
    },
    
    image: "/projects/component-library-hero.jpg",
    gallery: [
      "/projects/storybook-docs.jpg",
      "/projects/component-tests.jpg",
      "/projects/typescript-support.jpg"
    ],
    
    technologies: ["React", "TypeScript", "Storybook", "Jest", "Testing Library", "Rollup"],
    category: "library",
    
    demoUrl: "https://components.josueovalle.com",
    githubUrl: "https://github.com/Josue-Ovalle/react-components",
    caseStudyUrl: "https://josueovalle.com/case-studies/component-library",
    
    featured: false,
    timeline: "4 weeks",
    teamSize: "Solo project",
    year: "2024",
    
    testimonial: null
  },
  
  {
    id: "landing-page-template",
    title: "SaaS Landing Page Template",
    shortDescription: "High-converting landing page template with modern animations and optimized conversion flows",
    fullDescription: "A professional SaaS landing page template featuring modern design patterns, smooth animations, and conversion-optimized layouts that can be customized for different products.",
    
    problem: "Many SaaS startups struggle with creating effective landing pages that convert visitors into customers. Generic templates often lack the sophistication needed for modern products.",
    
    process: [
      "Analyzed 100+ high-converting SaaS landing pages to identify common patterns",
      "Created a flexible design system that works across different product categories",
      "Implemented conversion-focused sections: hero, features, pricing, testimonials, FAQ",
      "Added smooth scroll animations and micro-interactions for engagement",
      "Optimized for Core Web Vitals and mobile performance",
      "Built with customizable components for easy brand adaptation"
    ],
    
    solution: "Developed a comprehensive SaaS landing page template with Next.js, featuring modular sections, advanced animations, and conversion optimization. Designed for easy customization and high performance.",
    
    results: {
      primary: "High-Converting Template Design",
      metrics: [
        { label: "Performance Score", before: "N/A", after: "97/100", improvement: "Excellent" },
        { label: "Mobile Optimization", before: "N/A", after: "99/100", improvement: "Perfect" },
        { label: "Conversion Elements", before: "N/A", after: "15+", improvement: "Comprehensive" },
        { label: "Load Time", before: "N/A", after: "0.9s", improvement: "Fast" }
      ]
    },
    
    image: "/projects/saas-landing-hero.jpg",
    gallery: [
      "/projects/saas-features.jpg",
      "/projects/saas-pricing.jpg",
      "/projects/saas-mobile.jpg"
    ],
    
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "React Hook Form"],
    category: "template",
    
    demoUrl: "https://saas-template-jo.vercel.app",
    githubUrl: "https://github.com/Josue-Ovalle/saas-landing-template",
    caseStudyUrl: "https://josueovalle.com/case-studies/saas-landing",
    
    featured: true,
    timeline: "2 weeks",
    teamSize: "Solo project",
    year: "2024",
    
    testimonial: null
  }
];

// TO DO: add real testimonials when I actually got ones haha

/* export const testimonials = [
  {
    id: 1,
    name: "Maria Rodriguez",
    role: "Founder",
    company: "Premium Fashion Co.",
    content: "Josué transformed our online store completely. The new design increased our sales by 45% in the first month after launch. His attention to detail and understanding of e-commerce UX is exceptional.",
    avatar: "/testimonials/maria.jpg",
    rating: 5,
    project: "E-commerce Platform",
    metrics: "45% increase in sales",
    featured: true
  },
  {
    id: 2,
    name: "David Chen",
    role: "Product Manager",
    company: "DataInsights Inc.",
    content: "The new dashboard completely changed how our users interact with our platform. User engagement went through the roof - we saw a 65% increase in session time. Josué's technical skills are top-notch.",
    avatar: "/testimonials/david.jpg",
    rating: 5,
    project: "SaaS Dashboard",
    metrics: "65% increase in engagement",
    featured: true
  },
  {
    id: 3,
    name: "Dr. Sarah Johnson",
    role: "Practice Owner",
    company: "Johnson Family Medicine",
    content: "This patient portal has transformed our practice. Patients love the convenience and our staff saves hours every day. The HIPAA compliance and security features give us complete peace of mind.",
    avatar: "/testimonials/sarah.jpg",
    rating: 5,
    project: "Healthcare Portal",
    metrics: "30% reduction in no-shows",
    featured: true
  },
  {
    id: 4,
    name: "Carlos Martinez",
    role: "Marketing Director",
    company: "Sabor Latino Restaurants",
    content: "Our online orders doubled within the first month of launching the new website. The mobile experience is incredible and the integration with our POS system is seamless.",
    avatar: "/testimonials/carlos.jpg",
    rating: 5,
    project: "Restaurant Website",
    metrics: "85% increase in online orders",
    featured: false
  },
  {
    id: 5,
    name: "Isabella Chen",
    role: "Creative Director",
    company: "Pixel Perfect Studio",
    content: "This website is pure art. It perfectly represents our creative vision and has brought us incredible new opportunities. The 3D elements and animations are mind-blowing.",
    avatar: "/testimonials/isabella.jpg",
    rating: 5,
    project: "Creative Portfolio",
    metrics: "200% increase in qualified leads",
    featured: false
  },
  {
    id: 6,
    name: "Michael Thompson",
    role: "CEO",
    company: "TechStart Inc.",
    content: "Working with Josué was an absolute pleasure. His technical expertise combined with business understanding resulted in a website that not only looks great but drives real results.",
    avatar: "/testimonials/michael.jpg",
    rating: 5,
    project: "Corporate Website",
    metrics: "150% increase in leads",
    featured: false
  }
]; */

export const timeline = [
  {
    year: "2024",
    title: "Frontend Development Focus",
    description: "Intensive learning and project development with React, Next.js, and TypeScript. Built multiple projects and expanded technical skills significantly.",
    highlights: ["React ecosystem mastery", "5 major projects completed", "TypeScript adoption", "Portfolio website launch"]
  },
  {
    year: "2023",
    title: "Web Development Foundation",
    description: "Comprehensive study of web development fundamentals, JavaScript, and modern development practices through structured learning and hands-on projects.",
    highlights: ["JavaScript proficiency", "First React projects", "Git workflow mastery", "Responsive design skills"]
  },
  {
    year: "2022",
    title: "Programming Journey Begins",
    description: "Started learning programming and web development through online courses, tutorials, and practice projects. Established solid foundation in HTML, CSS, and JavaScript basics.",
    highlights: ["HTML/CSS mastery", "JavaScript fundamentals", "Development environment setup", "First web projects"]
  }
];

  // TO DO: Add certifications you have

/* export const certifications = [
  {
    name: "React Developer Certification",
    issuer: "Meta",
    year: "2023",
    credentialId: "REACT-2023-001",
    skills: ["React", "JSX", "State Management", "Component Architecture"]
  },
  {
    name: "Next.js Developer Certification",
    issuer: "Vercel",
    year: "2024",
    credentialId: "NEXTJS-2024-002",
    skills: ["Next.js", "SSR", "SSG", "API Routes"]
  },
  {
    name: "TypeScript Advanced",
    issuer: "Microsoft",
    year: "2023",
    credentialId: "TS-ADV-2023-003",
    skills: ["TypeScript", "Advanced Types", "Generics", "Utility Types"]
  }
]; */