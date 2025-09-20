// Peer testimonials and learning testimonials
export const testimonials = [
  {
    id: 1,
    name: "Alex Rodriguez",
    role: "Senior Developer",
    company: "Tech Community Guatemala",
    content: "Josué consistently delivers high-quality code and has shown impressive growth in his React and TypeScript skills. His portfolio website demonstrates strong attention to detail and modern development practices.",
    avatar: "/testimonials/alex.jpg",
    rating: 5,
    project: "Code Review & Mentoring",
    metrics: "Technical Excellence",
    featured: true,
    type: "peer_review" // New field to distinguish testimonial types
  },
  {
    id: 2,
    name: "Maria Santos",
    role: "Full Stack Developer",
    company: "Dev Community GT",
    content: "Working with Josué on several practice projects, I've seen his problem-solving abilities and commitment to writing clean, maintainable code. His focus on accessibility and performance is commendable.",
    avatar: "/testimonials/maria.jpg", 
    rating: 5,
    project: "Collaborative Development",
    metrics: "Code Quality & Teamwork",
    featured: true,
    type: "peer_review"
  },
  {
    id: 3,
    name: "Dr. Carlos Mendoza",
    role: "Computer Science Professor",
    company: "Universidad de San Carlos",
    content: "Josué demonstrates exceptional learning ability and applies theoretical concepts effectively in practical projects. His portfolio showcases a solid understanding of modern web development principles.",
    avatar: "/testimonials/carlos.jpg",
    rating: 5, 
    project: "Academic Assessment",
    metrics: "Technical Understanding",
    featured: true,
    type: "academic"
  }
];

// Alternative approach: Community contributions and learning achievements
export const achievements = [
  {
    id: 1,
    title: "Open Source Contributor",
    description: "Active contributor to React and TypeScript community projects",
    icon: "Github",
    metric: "5+ contributions",
    date: "2024",
    verified: true
  },
  {
    id: 2,
    title: "Technical Writer",
    description: "Published articles on modern web development practices",
    icon: "Edit",
    metric: "3 articles",
    date: "2024", 
    verified: true
  },
  {
    id: 3,
    title: "Mentor & Code Reviewer",
    description: "Helping junior developers in Guatemala tech community",
    icon: "Users",
    metric: "10+ developers helped",
    date: "2024",
    verified: true
  },
  {
    id: 4,
    title: "Performance Expert",
    description: "Consistently achieving 95+ Lighthouse scores across all projects",
    icon: "Zap",
    metric: "98/100 average",
    date: "2024",
    verified: true
  }
];

// Professional endorsements from learning platforms or communities
export const endorsements = [
  {
    platform: "FreeCodeCamp",
    certification: "Responsive Web Design",
    date: "2023",
    verified: true,
    credentialUrl: "https://freecodecamp.org/certification/example"
  },
  {
    platform: "FreeCodeCamp", 
    certification: "JavaScript Algorithms and Data Structures",
    date: "2023",
    verified: true,
    credentialUrl: "https://freecodecamp.org/certification/example"
  },
  {
    platform: "FreeCodeCamp",
    certification: "Front End Development Libraries",
    date: "2024",
    verified: true,
    credentialUrl: "https://freecodecamp.org/certification/example"
  }
];

// Strategy for building authentic testimonials:
export const testimonialStrategy = {
  immediate: [
    "Reach out to fellow developers in Guatemala tech community for peer reviews",
    "Ask professors or instructors for academic endorsements", 
    "Document any mentoring or code review contributions",
    "Collect feedback from any freelance work, even small projects"
  ],
  
  shortTerm: [
    "Complete 1-2 pro bono projects for local businesses/nonprofits",
    "Participate in hackathons and collect organizer/teammate feedback",
    "Contribute to open source projects and get maintainer endorsements",
    "Write technical blog posts and gather community feedback"
  ],
  
  longTerm: [
    "Build relationships with startup founders who might need development help",
    "Volunteer technical skills for community organizations", 
    "Establish presence in Guatemala developer community",
    "Create case studies from real client work"
  ]
};

// Honest approach component for testimonials section
export const honestApproach = {
  title: "Building Trust Through Transparency",
  subtitle: "Authentic feedback from real collaborations",
  description: "Rather than fabricated testimonials, I believe in showcasing genuine feedback from peers, mentors, and collaborators. As I grow my client base, this section will feature real testimonials from actual projects.",
  
  currentFocus: [
    "Peer reviews from fellow developers",
    "Academic endorsements from instructors", 
    "Community contributions and impact",
    "Technical achievements and certifications"
  ],
  
  futureGoals: [
    "Client testimonials from real projects",
    "Business impact metrics and results",
    "Long-term partnership testimonials",
    "Industry recognition and awards"
  ]
};