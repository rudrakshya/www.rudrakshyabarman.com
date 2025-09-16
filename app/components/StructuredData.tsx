export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Rudrakshya Barman",
    "url": "https://rudrakshyabarman.com",
    "image": "https://rudrakshyabarman.com/brand.png",
    "jobTitle": "Software Engineer & Founder",
    "worksFor": {
      "@type": "Organization",
      "name": "Adytuminfotech Softwares Pvt Ltd"
    },
    "description": "Visionary entrepreneur and technology leader with 13+ years of experience building enterprise solutions. Founder of Adytuminfotech Softwares, pioneering healthcare and educational technology platforms.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Malda",
      "addressCountry": "India"
    },
    "sameAs": [
      "https://linkedin.com/in/rudrakshyabarman",
      "https://github.com/rudrakshyabarman"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}