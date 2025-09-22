'use client';

import { personalInfo, projects, services } from '@/data/portfolioData';
import { testimonials } from '@/data/testimonials';

const StructuredData = () => {
  // Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://josueovalle.com/#person",
    "name": personalInfo.name,
    "alternateName": "Josué Ovalle",
    "description": personalInfo.description,
    "url": "https://josueovalle.com",
    "image": {
      "@type": "ImageObject",
      "url": "https://josueovalle.com/my-photo.jpg",
      "width": 400,
      "height": 400
    },
    "sameAs": [
      personalInfo.social.linkedin,
      personalInfo.social.github,
      personalInfo.social.twitter,
      personalInfo.social.dribbble,
      personalInfo.social.behance
    ],
    "jobTitle": "Frontend Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Guatemala City",
      "addressCountry": "Guatemala"
    },
    "email": personalInfo.email,
    "telephone": personalInfo.phone,
    "knowsAbout": [
      "React.js",
      "Next.js", 
      "TypeScript",
      "Tailwind CSS",
      "Frontend Development",
      "Web Performance",
      "UI/UX Design",
      "JavaScript",
      "Node.js"
    ]
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://josueovalle.com/#website",
    "url": "https://josueovalle.com",
    "name": "Josué Ovalle Portfolio",
    "description": "Professional portfolio showcasing modern web development projects and expertise in React, Next.js, and premium user experiences.",
    "publisher": {
      "@id": "https://josueovalle.com/#person"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://josueovalle.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Professional Service Schema
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://josueovalle.com/#service",
    "name": "Josué Ovalle Web Development",
    "description": "Professional web development services specializing in React, Next.js, and modern frontend technologies",
    "url": "https://josueovalle.com",
    "telephone": personalInfo.phone,
    "email": personalInfo.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Guatemala City",
      "addressCountry": "Guatemala"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "14.6349",
      "longitude": "-90.5069"
    },
    "serviceType": "Web Development",
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services",
      "itemListElement": services.map((service, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.title,
          "description": service.description
        },
        "price": service.price.replace(/[^\d]/g, ''),
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "deliveryLeadTime": {
          "@type": "QuantitativeValue",
          "value": service.timeline,
          "unitText": "WEEK"
        }
      }))
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": testimonials ? testimonials.length : 0,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": testimonials.slice(0, 3).map(testimonial => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating
      },
      "author": {
        "@type": "Person",
        "name": testimonial.name
      },
      "reviewBody": testimonial.content,
      "datePublished": "2024-01-01"
    }))
  };

  // Portfolio/Creative Work Schema
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": "https://josueovalle.com/#portfolio",
    "name": "Josué Ovalle Portfolio",
    "description": "Collection of professional web development projects showcasing expertise in modern technologies",
    "creator": {
      "@id": "https://josueovalle.com/#person"
    },
    "url": "https://josueovalle.com",
    "dateCreated": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US",
    "about": [
      "Web Development",
      "React.js",
      "Next.js",
      "TypeScript",
      "Frontend Development"
    ],
    "hasPart": projects.slice(0, 5).map(project => ({
      "@type": "CreativeWork",
      "name": project.title,
      "description": project.shortDescription,
      "url": project.demoUrl,
      "creator": {
        "@id": "https://josueovalle.com/#person"
      },
      "dateCreated": `${project.year}-01-01`,
      "programmingLanguage": project.technologies,
      "about": project.category
    }))
  };

  const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What's your typical project timeline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most projects take 2-8 weeks depending on complexity. I provide a detailed timeline after our initial consultation."
      }
    },
    // Add more FAQ items
  ]
};

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://josueovalle.com"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Portfolio",
        "item": "https://josueovalle.com#portfolio"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Services",
        "item": "https://josueovalle.com#services"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Contact",
        "item": "https://josueovalle.com#contact"
      }
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://josueovalle.com/#organization",
    "name": "Josué Ovalle Development",
    "alternateName": "JO Dev",
    "description": "Professional web development services specializing in modern frontend technologies",
    "url": "https://josueovalle.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://josueovalle.com/my-photo.jpg"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": personalInfo.phone,
      "contactType": "customer service",
      "email": personalInfo.email,
      "availableLanguage": ["English", "Spanish"]
    },
    "founder": {
      "@id": "https://josueovalle.com/#person"
    },
    "foundingDate": "2021-01-01",
    "slogan": "Crafting exceptional web experiences"
  };

  const allSchemas = [
    personSchema,
    websiteSchema,
    professionalServiceSchema,
    portfolioSchema,
    breadcrumbSchema,
    organizationSchema
  ];

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}
    </>
  );
};

export default StructuredData;