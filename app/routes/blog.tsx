import { Link } from "react-router";
import type { Route } from "./+types/blog";

export function meta({}: Route.MetaArgs) {
  const title = "Blog - Rudrakshya Barman";
  const description = "Thoughts, insights, and tutorials on software engineering, technology, and entrepreneurship.";
  const imageUrl = "https://rudrakshyabarman.com/brand.png";
  const url = "https://rudrakshyabarman.com/blog";
  
  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: "blog, software engineering, technology, entrepreneurship, tutorials, insights" },
    
    // Open Graph tags
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: imageUrl },
    { property: "og:image:alt", content: "Rudrakshya Barman Blog" },
    { property: "og:locale", content: "en_US" },
    
    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: "Rudrakshya Barman Blog" },
    { name: "twitter:site", content: "@rudrakshya" },
    { name: "twitter:creator", content: "@rudrakshya" },
    
    // Additional meta tags
    { name: "robots", content: "index, follow" },
    { name: "author", content: "Rudrakshya Barman" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
}

// Sample blog posts data - in a real app, this would come from a CMS or database
const blogPosts = [
  {
    id: 1,
    title: "Building Scalable Microservices with Node.js and Docker",
    excerpt: "Learn how to design and implement scalable microservices architecture using Node.js and Docker containers.",
    date: "2024-05-15",
    readTime: "8 min read",
    category: "Software Engineering",
    image: "/brand.png"
  },
  {
    id: 2,
    title: "The Future of AI in Healthcare Technology",
    excerpt: "Exploring how artificial intelligence is transforming healthcare delivery and patient outcomes.",
    date: "2024-04-22",
    readTime: "6 min read",
    category: "AI & Healthcare",
    image: "/brand.png"
  },
  {
    id: 3,
    title: "Entrepreneurship Lessons from 13 Years in Tech",
    excerpt: "Key insights and lessons learned from building technology ventures in healthcare and education sectors.",
    date: "2024-03-30",
    readTime: "10 min read",
    category: "Entrepreneurship",
    image: "/brand.png"
  },
  {
    id: 4,
    title: "Mastering React Performance Optimization",
    excerpt: "Practical techniques to optimize React applications for better performance and user experience.",
    date: "2024-02-18",
    readTime: "12 min read",
    category: "Frontend Development",
    image: "/brand.png"
  },
  {
    id: 5,
    title: "DevOps Best Practices for Modern Teams",
    excerpt: "Essential DevOps practices that can transform your development workflow and deployment processes.",
    date: "2024-01-10",
    readTime: "9 min read",
    category: "DevOps",
    image: "/brand.png"
  },
  {
    id: 6,
    title: "Building Secure Authentication Systems",
    excerpt: "A comprehensive guide to implementing robust authentication and authorization in web applications.",
    date: "2023-12-05",
    readTime: "11 min read",
    category: "Security",
    image: "/brand.png"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient and Animated Elements */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-20 animate-ping"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-indigo-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-5 h-5 bg-blue-300 rounded-full opacity-20 animate-bounce delay-1000"></div>
        
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full animate-pulse">
                WRITING & INSIGHTS
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Thoughts, insights, and tutorials on software engineering, technology, and entrepreneurship.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-12">
              <div className="bg-white p-4 rounded-xl shadow-sm transform hover:scale-105 transition-transform duration-300">
                <div className="text-2xl font-bold text-blue-600">24+</div>
                <div className="text-gray-600 text-sm">Articles</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm transform hover:scale-105 transition-transform duration-300">
                <div className="text-2xl font-bold text-purple-600">10K+</div>
                <div className="text-gray-600 text-sm">Readers</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm transform hover:scale-105 transition-transform duration-300">
                <div className="text-2xl font-bold text-pink-600">13</div>
                <div className="text-gray-600 text-sm">Years Experience</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm transform hover:scale-105 transition-transform duration-300">
                <div className="text-2xl font-bold text-indigo-600">5</div>
                <div className="text-gray-600 text-sm">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article 
                key={post.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <time className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                    <Link 
                      to={`/blog/${post.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                    >
                      Read more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get notified when I publish new articles
          </p>
          
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-md"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}