import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "../src/index.css";
import LoadingBar from "./components/LoadingBar";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { StructuredData } from "./components/StructuredData";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "icon",
    href: "/favicon.ico",
    type: "image/x-icon",
  },
  {
    rel: "apple-touch-icon",
    href: "/logo.png",
  },
  {
    rel: "manifest",
    href: "/manifest.json",
  },
];

// Default meta tags for the entire site
export const meta: Route.MetaFunction = () => {
  return [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
    { title: "Rudrakshya Barman | Software Engineer & Founder" },
    { 
      name: "description", 
      content: "Rudrakshya Barman is a software engineer and founder with expertise in full-stack development, DevOps, and building scalable web applications." 
    },
    { 
      name: "keywords", 
      content: "software engineer, full-stack developer, DevOps, web applications, React, Node.js, JavaScript, TypeScript, Rudrakshya Barman" 
    },
    { name: "author", content: "Rudrakshya Barman" },
    { name: "robots", content: "index, follow" },
    { name: "theme-color", content: "#0ea5e9" },
    { property: "og:title", content: "Rudrakshya Barman | Software Engineer & Founder" },
    { 
      property: "og:description", 
      content: "Rudrakshya Barman is a software engineer and founder with expertise in full-stack development, DevOps, and building scalable web applications." 
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://rudrakshyabarman.com" },
    { property: "og:image", content: "https://rudrakshyabarman.com/logo.png" },
    { property: "og:image:alt", content: "Rudrakshya Barman" },
    { property: "og:locale", content: "en_US" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: "@rudrakshya" },
    { name: "twitter:creator", content: "@rudrakshya" },
    { 
      name: "twitter:title", 
      content: "Rudrakshya Barman | Software Engineer & Founder" 
    },
    { 
      name: "twitter:description", 
      content: "Rudrakshya Barman is a software engineer and founder with expertise in full-stack development, DevOps, and building scalable web applications." 
    },
    { name: "twitter:image", content: "https://rudrakshyabarman.com/logo.png" },
    { name: "twitter:image:alt", content: "Rudrakshya Barman" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <StructuredData />
      </head>
      <body>
        <Navigation />
        <LoadingBar />
        <main>
          {children}
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}