import Head from 'next/head';
import { personalInfo } from '@/data/portfolioData';

interface EnhancedSEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

export default function EnhancedSEO({
  title = 'Josué Ovalle - Frontend Developer & Modern Web Development Expert',
  description = 'Professional frontend developer ...',
  keywords = 'frontend developer, React developer, ...',
  ogImage = '/my-photo.jpg',
  ogType = 'website',
  canonicalUrl = 'https://josueovalle.com',
  publishedTime,
  modifiedTime,
  author = personalInfo.name,
  section = 'Technology'
}: EnhancedSEOProps) {
  const siteName = 'Josué Ovalle Portfolio';
  const twitterHandle = '@JosueOvalle_';
  
  // Enhanced structured data
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
      {/* Core Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Geographic targeting */}
      <meta name="geo.region" content="GT-GU" />
      <meta name="geo.placename" content="Guatemala City" />
      <meta name="geo.position" content="14.6349;-90.5069" />
      
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
      
      {/* Article specific meta tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://josueovalle.com${ogImage}`} />
      
      {/* Performance and UX hints */}
      <meta name="format-detection" content="telephone=no" />
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema, null, 0)
        }}
      />
      
      {/* Performance optimizations */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//github.com" />
      <link rel="dns-prefetch" href="//linkedin.com" />
    </Head>
  );
};