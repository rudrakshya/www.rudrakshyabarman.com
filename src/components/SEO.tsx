import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  author?: string;
}

export default function SEO({
  title,
  description,
  keywords = 'software engineer, entrepreneur, machine learning, full-stack development, healthcare technology, educational technology',
  ogImage = '/brand.png',
  ogUrl = 'https://www.rudrakshyabarman.com',
  author = 'Rudrakshya Barman'
}: SEOProps) {
  const fullTitle = `${title} | Rudrakshya Barman - Software Engineer & Entrepreneur`;
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO */}
      <link rel="canonical" href={ogUrl} />
    </Helmet>
  );
}