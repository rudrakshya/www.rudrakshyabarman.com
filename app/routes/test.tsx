import TestTailwind from "../components/TestTailwind";
import type { Route } from "./+types/test";

export function meta({}: Route.MetaArgs) {
  const title = "Test Page";
  const description = "Test page for Rudrakshya Barman's website.";
  const imageUrl = "https://rudrakshyabarman.com/brand.png";
  const url = "https://rudrakshyabarman.com/test";
  
  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: "test, website, development" },
    
    // Open Graph tags
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },
    { property: "og:image:alt", content: "Test Page" },
    { property: "og:locale", content: "en_US" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: "Test Page" },
    { name: "twitter:site", content: "@rudrakshya" },
    { name: "twitter:creator", content: "@rudrakshya" },
    
    // Additional meta tags
    { name: "robots", content: "noindex, nofollow" },
    { name: "author", content: "Rudrakshya Barman" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
}

export default function Test() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Tailwind CSS Test Page</h1>
      <TestTailwind />
    </div>
  );
}