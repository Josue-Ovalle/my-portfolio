'use client';

import Head from 'next/head';
import { personalInfo } from '@/data/portfolioData';

const EnhancedSEO = ({
  title = 'Josué Ovalle - Frontend Developer & AI-Enhanced Web Development Expert',
  description = 'Professional frontend developer specializing in React, Next.js, and TypeScript. Creating modern, performant websites that deliver measurable business results with AI-enhanced development workflows.',
  keywords = 'frontend developer, React developer, Next.js expert, TypeScript, web development, AI development, Guatemala developer, modern websites, performance optimization, UI/UX design',
  ogImage = '/my-photo.jpg',
  ogType = 'website',
  canonicalUrl = 'https://josueovalle.com',
  publishedTime,
  modifiedTime,
  author = personalInfo.name,
  section = 'Technology'
}) => {
  const siteName = 'Josué Ovalle Portfolio';
  const twitterHandle = '@JosueOvalle_';
  
  // Enhanced structured data for page-specific content
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": canonicalUrl,
    "author": {
      "@type": "Person",
      "name": author,
      "url": "https://josueovalle.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": "https://josueovalle.com"
    },
    "datePublished": publishedTime || "2024-01-01",
    "dateModified": modifiedTime || new Date().toISOString(),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://josueovalle.com"
        }
      ]
    }
  };

  return (
    <Head>
      {/* Enhanced Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Language and Region */}
      <meta name="language" content="en-US" />
      <meta name="geo.region" content="GT" />
      <meta name="geo.placename" content="Guatemala City" />
      <meta name="geo.position" content="14.6349;-90.5069" />
      <meta name="ICBM" content="14.6349, -90.5069" />
      
      {/* Enhanced Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={`https://josueovalle.com${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${author} - Professional Frontend Developer`} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="es_GT" />
      
      {/* Article specific (if applicable) */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      <meta property="article:tag" content="Frontend Development" />
      <meta property="article:tag" content="React" />
      <meta property="article:tag" content="Next.js" />
      <meta property="article:tag" content="TypeScript" />
      <meta property="article:tag" content="Web Development" />
      
      {/* Enhanced Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://josueovalle.com${ogImage}`} />
      <meta name="twitter:image:alt" content={`${author} - Professional Frontend Developer`} />
      
      {/* Additional Social Media */}
      <meta property="fb:app_id" content="your-facebook-app-id" />
      <meta name="pinterest-rich-pin" content="true" />
      
      {/* Mobile and App */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      
      {/* Performance and Caching */}
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema, null, 2)
        }}
      />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* DNS Prefetch for common external resources */}
      <link rel="dns-prefetch" href="//github.com" />
      <link rel="dns-prefetch" href="//linkedin.com" />
      <link rel="dns-prefetch" href="//twitter.com" />
      <link rel="dns-prefetch" href="//dribbble.com" />
      <link rel="dns-prefetch" href="//behance.net" />
    </Head>
  );
};

export default EnhancedSEO;