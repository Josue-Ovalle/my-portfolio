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
    linkedin: "https://www.linkedin.com/in/josu%C3%A9-ovalle-07393437a/",
    twitter: "https://x.com/JosueOvalle_",
    dribbble: "https://dribbble.com/josueovalle",
    behance: "https://behance.net/josueovalle"
  }
};

export const skills = [
  { name: "React/Next.js", level: 95, category: "frontend", experience: "3+ years", projects: 25 },
  { name: "TypeScript", level: 90, category: "frontend", experience: "2+ years", projects: 20 },
  { name: "Tailwind CSS", level: 98, category: "styling", experience: "3+ years", projects: 30 },
  { name: "JavaScript", level: 92, category: "language", experience: "3+ years", projects: 35 },
  { name: "Node.js", level: 80, category: "backend", experience: "2+ years", projects: 12 },
  { name: "Framer Motion", level: 85, category: "animation", experience: "2+ years", projects: 15 },
  { name: "Responsive Design", level: 95, category: "design", experience: "3+ years", projects: 28 },
  { name: "Performance Optimization", level: 88, category: "optimization", experience: "2+ years", projects: 18 },
  { name: "SEO", level: 82, category: "marketing", experience: "2+ years", projects: 16 },
  { name: "UI/UX Design", level: 85, category: "design", experience: "2+ years", projects: 22 }
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

export const projects = [
  {
    id: "ecommerce-platform",
    title: "Premium E-commerce Platform",
    shortDescription: "Modern e-commerce solution that increased conversion rates by 45%",
    fullDescription: "A complete e-commerce platform built for a premium fashion brand, featuring advanced filtering, wishlist functionality, and seamless checkout experience.",
    
    // Case Study Format
    problem: "The client's existing e-commerce site had a 68% cart abandonment rate and poor mobile experience, resulting in lost revenue and frustrated customers.",
    
    process: [
      "Conducted user research and analyzed conversion funnels",
      "Redesigned the entire user experience with mobile-first approach",
      "Implemented advanced product filtering and search functionality",
      "Optimized checkout process with guest options and multiple payment methods",
      "Added wishlist and comparison features to increase engagement"
    ],
    
    solution: "Built a modern, responsive e-commerce platform using Next.js, Stripe for payments, and Sanity CMS for content management. Implemented advanced product filtering, wishlist functionality, and a streamlined checkout process.",
    
    results: {
      primary: "45% increase in conversion rate",
      metrics: [
        { label: "Conversion Rate", before: "2.3%", after: "3.3%", improvement: "+45%" },
        { label: "Cart Abandonment", before: "68%", after: "52%", improvement: "-16%" },
        { label: "Mobile Revenue", before: "35%", after: "58%", improvement: "+23%" },
        { label: "Page Load Time", before: "4.2s", after: "1.8s", improvement: "-57%" }
      ]
    },
    
    image: "/projects/ecommerce-hero.jpg",
    gallery: [
      "/projects/ecommerce-1.jpg",
      "/projects/ecommerce-2.jpg",
      "/projects/ecommerce-3.jpg"
    ],
    
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Sanity CMS", "Framer Motion"],
    category: "ecommerce",
    
    demoUrl: "https://premium-store-demo.vercel.app",
    caseStudyUrl: "https://josueovalle.com/case-studies/ecommerce-platform",
    
    featured: true,
    timeline: "6 weeks",
    teamSize: "Solo project",
    year: "2024",
    
    testimonial: {
      quote: "Josué transformed our online store completely. Sales increased by 45% in the first month after launch.",
      author: "Maria Rodriguez",
      role: "Founder, Fashion Boutique",
      company: "Premium Fashion Co."
    }
  },
  
  {
    id: "saas-dashboard",
    title: "Analytics SaaS Dashboard",
    shortDescription: "Data visualization platform that improved user engagement by 65%",
    fullDescription: "A comprehensive analytics dashboard for a SaaS company, featuring real-time data visualization, custom reports, and team collaboration tools.",
    
    problem: "The SaaS company's existing dashboard was cluttered, slow, and difficult to navigate, leading to low user engagement and high churn rates.",
    
    process: [
      "Analyzed user behavior data and conducted interviews with power users",
      "Created user personas and mapped out key user journeys",
      "Designed a clean, intuitive interface with focus on data visualization",
      "Implemented real-time updates and interactive charts",
      "Added collaboration features and custom report builder"
    ],
    
    solution: "Developed a modern dashboard using React, D3.js for visualizations, and WebSocket for real-time updates. Focused on clean design, fast performance, and intuitive user experience.",
    
    results: {
      primary: "65% increase in user engagement",
      metrics: [
        { label: "User Engagement", before: "12 min/session", after: "20 min/session", improvement: "+65%" },
        { label: "Feature Adoption", before: "34%", after: "78%", improvement: "+44%" },
        { label: "User Retention", before: "73%", after: "89%", improvement: "+16%" },
        { label: "Support Tickets", before: "45/week", after: "18/week", improvement: "-60%" }
      ]
    },
    
    image: "/projects/saas-hero.jpg",
    gallery: [
      "/projects/saas-1.jpg",
      "/projects/saas-2.jpg",
      "/projects/saas-3.jpg"
    ],
    
    technologies: ["React", "TypeScript", "D3.js", "Node.js", "PostgreSQL", "WebSocket"],
    category: "saas",
    
    demoUrl: "https://analytics-dashboard-demo.vercel.app",
    caseStudyUrl: "https://josueovalle.com/case-studies/saas-dashboard",
    
    featured: true,
    timeline: "8 weeks",
    teamSize: "2 developers",
    year: "2024",
    
    testimonial: {
      quote: "The new dashboard completely changed how our users interact with our platform. Engagement went through the roof!",
      author: "David Chen",
      role: "Product Manager",
      company: "DataInsights Inc."
    }
  },
  
  {
    id: "healthcare-app",
    title: "Healthcare Patient Portal",
    shortDescription: "HIPAA-compliant patient portal that reduced appointment no-shows by 30%",
    fullDescription: "A comprehensive patient portal for a healthcare provider, featuring appointment scheduling, medical records access, and secure messaging.",
    
    problem: "The healthcare practice was struggling with high no-show rates, paper-based processes, and poor patient communication, affecting both efficiency and patient satisfaction.",
    
    process: [
      "Researched HIPAA compliance requirements and healthcare UX best practices",
      "Interviewed patients and staff to understand pain points",
      "Designed a secure, user-friendly interface for all age groups",
      "Implemented appointment scheduling with automated reminders",
      "Added secure messaging and document sharing capabilities"
    ],
    
    solution: "Built a HIPAA-compliant patient portal with appointment scheduling, secure messaging, medical records access, and automated reminders. Focused on accessibility and ease of use for all age groups.",
    
    results: {
      primary: "30% reduction in appointment no-shows",
      metrics: [
        { label: "No-show Rate", before: "28%", after: "18%", improvement: "-30%" },
        { label: "Patient Satisfaction", before: "7.2/10", after: "9.1/10", improvement: "+26%" },
        { label: "Admin Time", before: "3h/day", after: "1.2h/day", improvement: "-60%" },
        { label: "Paper Usage", before: "100%", after: "15%", improvement: "-85%" }
      ]
    },
    
    image: "/projects/healthcare-hero.jpg",
    gallery: [
      "/projects/healthcare-1.jpg",
      "/projects/healthcare-2.jpg",
      "/projects/healthcare-3.jpg"
    ],
    
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Twilio"],
    category: "healthcare",
    
    demoUrl: "https://patient-portal-demo.vercel.app",
    caseStudyUrl: "https://josueovalle.com/case-studies/healthcare-portal",
    
    featured: true,
    timeline: "10 weeks",
    teamSize: "3 developers",
    year: "2024",
    
    testimonial: {
      quote: "This portal has transformed our practice. Patients love the convenience and our staff saves hours every day.",
      author: "Dr. Sarah Johnson",
      role: "Practice Owner",
      company: "Johnson Family Medicine"
    }
  },
  
  {
    id: "restaurant-website",
    title: "Restaurant Chain Website",
    shortDescription: "Multi-location restaurant website that increased online orders by 85%",
    fullDescription: "A modern website for a restaurant chain with online ordering, location finder, and loyalty program integration.",
    
    problem: "The restaurant chain's outdated website had poor mobile experience and no online ordering capability, missing out on the growing food delivery market.",
    
    process: [
      "Analyzed competitor websites and food ordering trends",
      "Designed a mobile-first experience optimized for food ordering",
      "Integrated with existing POS system and loyalty program",
      "Implemented location-based menu customization",
      "Added online ordering with real-time order tracking"
    ],
    
    solution: "Created a modern, mobile-optimized website with integrated online ordering system, location finder, and loyalty program. Focused on fast ordering flow and beautiful food photography.",
    
    results: {
      primary: "85% increase in online orders",
      metrics: [
        { label: "Online Orders", before: "150/week", after: "280/week", improvement: "+85%" },
        { label: "Mobile Traffic", before: "45%", after: "72%", improvement: "+27%" },
        { label: "Average Order Value", before: "$23", after: "$31", improvement: "+35%" },
        { label: "Customer Retention", before: "42%", after: "68%", improvement: "+26%" }
      ]
    },
    
    image: "/projects/restaurant-hero.jpg",
    gallery: [
      "/projects/restaurant-1.jpg",
      "/projects/restaurant-2.jpg",
      "/projects/restaurant-3.jpg"
    ],
    
    technologies: ["Next.js", "Stripe", "Google Maps API", "Sanity CMS", "Tailwind CSS"],
    category: "restaurant",
    
    demoUrl: "https://restaurant-chain-demo.vercel.app",
    caseStudyUrl: "https://josueovalle.com/case-studies/restaurant-website",
    
    featured: false,
    timeline: "5 weeks",
    teamSize: "Solo project",
    year: "2024",
    
    testimonial: {
      quote: "Our online orders doubled within the first month. The website perfectly captures our brand and makes ordering so easy.",
      author: "Carlos Martinez",
      role: "Marketing Director",
      company: "Sabor Latino Restaurants"
    }
  },
  
  {
    id: "portfolio-website",
    title: "Creative Agency Portfolio",
    shortDescription: "Award-winning portfolio website with advanced animations and 3D elements",
    fullDescription: "A cutting-edge portfolio website for a creative agency, featuring advanced animations, 3D elements, and immersive user experience.",
    
    problem: "The creative agency's portfolio wasn't showcasing their innovative work effectively, and they were losing potential high-value clients to competitors with more impressive online presence.",
    
    process: [
      "Analyzed top creative agency websites for inspiration and best practices",
      "Created an innovative design system with advanced animations",
      "Implemented 3D elements and interactive project showcases",
      "Optimized for performance despite heavy visual content",
      "Added smooth page transitions and micro-interactions"
    ],
    
    solution: "Built an award-winning portfolio website with Three.js 3D elements, advanced Framer Motion animations, and immersive project showcases. Balanced visual impact with performance optimization.",
    
    results: {
      primary: "200% increase in qualified leads",
      metrics: [
        { label: "Qualified Leads", before: "8/month", after: "24/month", improvement: "+200%" },
        { label: "Time on Site", before: "2.1 min", after: "4.8 min", improvement: "+129%" },
        { label: "Project Inquiries", before: "$50k avg", after: "$125k avg", improvement: "+150%" },
        { label: "Bounce Rate", before: "65%", after: "28%", improvement: "-57%" }
      ]
    },
    
    image: "/projects/creative-hero.jpg",
    gallery: [
      "/projects/creative-1.jpg",
      "/projects/creative-2.jpg",
      "/projects/creative-3.jpg"
    ],
    
    technologies: ["Next.js", "Three.js", "Framer Motion", "GSAP", "Tailwind CSS"],
    category: "portfolio",
    
    demoUrl: "https://creative-agency-demo.vercel.app",
    caseStudyUrl: "https://josueovalle.com/case-studies/creative-portfolio",
    
    featured: false,
    timeline: "7 weeks",
    teamSize: "Solo project",
    year: "2024",
    
    testimonial: {
      quote: "This website is pure art. It perfectly represents our creative vision and has brought us incredible new opportunities.",
      author: "Isabella Chen",
      role: "Creative Director",
      company: "Pixel Perfect Studio"
    }
  }
];

export const testimonials = [
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
];

export const timeline = [
  {
    year: "2024",
    title: "Senior Frontend Developer",
    description: "Specializing in React, Next.js, and modern web technologies. Building complex applications for SaaS companies and e-commerce businesses.",
    highlights: ["50+ projects completed", "Advanced TypeScript mastery", "Performance optimization expert"]
  },
  {
    year: "2023",
    title: "Full-Stack Development",
    description: "Expanded into backend development with Node.js, databases, and API integration. Started working with larger clients and complex projects.",
    highlights: ["Backend integration", "Database design", "API development"]
  },
  {
    year: "2022",
    title: "Frontend Specialization",
    description: "Focused on React, Tailwind CSS, and modern frontend development practices. Built my first commercial projects and established client relationships.",
    highlights: ["React mastery", "First commercial projects", "Client relationship building"]
  },
  {
    year: "2021",
    title: "Web Development Journey Begins",
    description: "Started learning HTML, CSS, and JavaScript through online courses and personal projects. Built foundation in web development fundamentals.",
    highlights: ["Web fundamentals", "First personal projects", "Continuous learning mindset"]
  }
];

export const certifications = [
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
];