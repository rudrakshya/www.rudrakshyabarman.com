import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useLocation, Link, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function LoadingBar() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
    setProgress(70);
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }, 100);
    return () => clearTimeout(timer);
  }, [location]);
  if (!visible) return null;
  return /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-0 w-full h-1 z-50", children: /* @__PURE__ */ jsx(
    "div",
    {
      className: "h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out",
      style: { width: `${progress}%` }
    }
  ) });
}
function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
    { name: "Collaboration", path: "/collaboration" }
  ];
  return /* @__PURE__ */ jsxs("nav", { className: "bg-white shadow-sm sticky top-0 z-40", children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between h-16", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx(Link, { to: "/", className: "flex-shrink-0 flex items-center", children: /* @__PURE__ */ jsx("span", { className: "text-xl font-bold text-blue-600", children: "Rudrakshya Barman" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center space-x-8", children: navItems.map((item) => /* @__PURE__ */ jsx(
        Link,
        {
          to: item.path,
          className: `${location.pathname === item.path ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700 hover:text-blue-600"} px-1 py-2 text-sm font-medium transition-colors duration-200`,
          children: item.name
        },
        item.path
      )) }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center md:hidden", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsMenuOpen(!isMenuOpen),
          className: "text-gray-700 hover:text-blue-600 focus:outline-none",
          "aria-label": "Toggle navigation menu",
          children: isMenuOpen ? /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) : /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) })
        }
      ) })
    ] }) }),
    isMenuOpen && /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx("div", { className: "px-2 pt-2 pb-3 space-y-1 sm:px-3", children: navItems.map((item) => /* @__PURE__ */ jsx(
      Link,
      {
        to: item.path,
        onClick: () => setIsMenuOpen(false),
        className: `${location.pathname === item.path ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"} block px-3 py-2 rounded-md text-base font-medium`,
        children: item.name
      },
      item.path
    )) }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-gray-900 text-white", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-2", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold mb-4", children: "Rudrakshya Barman" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-300 mb-4", children: "Software Engineer & Founder with expertise in full-stack development, DevOps, and building scalable web applications." }),
        /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
          /* @__PURE__ */ jsxs("a", { href: "https://linkedin.com/in/rudrakshyabarman", target: "_blank", rel: "noopener noreferrer", className: "text-gray-300 hover:text-white", children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "LinkedIn" }),
            /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }) })
          ] }),
          /* @__PURE__ */ jsxs("a", { href: "https://github.com/rudrakshyabarman", target: "_blank", rel: "noopener noreferrer", className: "text-gray-300 hover:text-white", children: [
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "GitHub" }),
            /* @__PURE__ */ jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold mb-4", children: "Navigation" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/", className: "text-gray-300 hover:text-white", children: "Home" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/about", className: "text-gray-300 hover:text-white", children: "About" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/projects", className: "text-gray-300 hover:text-white", children: "Projects" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/contact", className: "text-gray-300 hover:text-white", children: "Contact" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/collaboration", className: "text-gray-300 hover:text-white", children: "Collaboration" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "text-lg font-semibold mb-4", children: "Contact" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-gray-300", children: [
          /* @__PURE__ */ jsx("li", { children: "Malda, India" }),
          /* @__PURE__ */ jsx("li", { children: "rudrakshya91@gmail.com" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-gray-800 mt-8 pt-8 text-center text-gray-400", children: /* @__PURE__ */ jsxs("p", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Rudrakshya Barman. All rights reserved."
    ] }) })
  ] }) });
}
function StructuredData() {
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
  return /* @__PURE__ */ jsx(
    "script",
    {
      type: "application/ld+json",
      dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) }
    }
  );
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}, {
  rel: "icon",
  href: "/favicon.ico",
  type: "image/x-icon"
}, {
  rel: "apple-touch-icon",
  href: "/logo.png"
}, {
  rel: "manifest",
  href: "/manifest.json"
}];
const meta$7 = () => {
  return [{
    charSet: "utf-8"
  }, {
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }, {
    title: "Rudrakshya Barman | Software Engineer & Founder"
  }, {
    name: "description",
    content: "Rudrakshya Barman is a software engineer and founder with expertise in full-stack development, DevOps, and building scalable web applications."
  }, {
    name: "keywords",
    content: "software engineer, full-stack developer, DevOps, web applications, React, Node.js, JavaScript, TypeScript, Rudrakshya Barman"
  }, {
    name: "author",
    content: "Rudrakshya Barman"
  }, {
    name: "robots",
    content: "index, follow"
  }, {
    name: "theme-color",
    content: "#0ea5e9"
  }, {
    property: "og:title",
    content: "Rudrakshya Barman | Software Engineer & Founder"
  }, {
    property: "og:description",
    content: "Rudrakshya Barman is a software engineer and founder with expertise in full-stack development, DevOps, and building scalable web applications."
  }, {
    property: "og:type",
    content: "website"
  }, {
    property: "og:url",
    content: "https://rudrakshyabarman.com"
  }, {
    property: "og:image",
    content: "https://rudrakshyabarman.com/logo.png"
  }, {
    property: "og:image:alt",
    content: "Rudrakshya Barman"
  }, {
    property: "og:locale",
    content: "en_US"
  }, {
    name: "twitter:card",
    content: "summary_large_image"
  }, {
    name: "twitter:site",
    content: "@rudrakshya"
  }, {
    name: "twitter:creator",
    content: "@rudrakshya"
  }, {
    name: "twitter:title",
    content: "Rudrakshya Barman | Software Engineer & Founder"
  }, {
    name: "twitter:description",
    content: "Rudrakshya Barman is a software engineer and founder with expertise in full-stack development, DevOps, and building scalable web applications."
  }, {
    name: "twitter:image",
    content: "https://rudrakshyabarman.com/logo.png"
  }, {
    name: "twitter:image:alt",
    content: "Rudrakshya Barman"
  }];
};
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx(StructuredData, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(Navigation, {}), /* @__PURE__ */ jsx(LoadingBar, {}), /* @__PURE__ */ jsx("main", {
        children
      }), /* @__PURE__ */ jsx(Footer, {}), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
function meta$6({}) {
  const title = "Home - Software Engineer & Entrepreneur";
  const description = "Visionary entrepreneur and technology leader with 13+ years of experience building enterprise solutions. Founder of Adytuminfotech Softwares, pioneering healthcare and educational technology platforms.";
  const imageUrl = "https://rudrakshyabarman.com/brand.png";
  const url = "https://rudrakshyabarman.com";
  return [
    {
      title
    },
    {
      name: "description",
      content: description
    },
    {
      name: "keywords",
      content: "software engineer, entrepreneur, technology leader, healthcare technology, educational technology, machine learning, full-stack development, startup founder"
    },
    // Open Graph tags
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:url",
      content: url
    },
    {
      property: "og:image",
      content: imageUrl
    },
    {
      property: "og:image:alt",
      content: "Rudrakshya Barman"
    },
    {
      property: "og:locale",
      content: "en_US"
    },
    // Twitter Card tags
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: imageUrl
    },
    {
      name: "twitter:image:alt",
      content: "Rudrakshya Barman"
    },
    {
      name: "twitter:site",
      content: "@rudrakshya"
    },
    {
      name: "twitter:creator",
      content: "@rudrakshya"
    },
    // Additional meta tags
    {
      name: "robots",
      content: "index, follow"
    },
    {
      name: "author",
      content: "Rudrakshya Barman"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }
  ];
}
const home = UNSAFE_withComponentProps(function Home() {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen",
    children: [/* @__PURE__ */ jsxs("section", {
      className: "py-20 bg-gradient-to-br from-blue-50 to-indigo-50",
      children: [/* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
          children: [/* @__PURE__ */ jsxs("div", {
            className: `transform transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`,
            children: [/* @__PURE__ */ jsx("div", {
              className: "mb-6",
              children: /* @__PURE__ */ jsx("span", {
                className: "inline-block px-4 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full animate-pulse",
                children: "FOUNDER & TECH LEADER"
              })
            }), /* @__PURE__ */ jsxs("h1", {
              className: "text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6",
              children: ["Hi, I'm ", /* @__PURE__ */ jsx("span", {
                className: "text-blue-600",
                children: "Rudrakshya Barman"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xl text-gray-600 mb-8 leading-relaxed",
              children: "Visionary entrepreneur and technology leader with 13+ years of experience building enterprise solutions from ground up. Founder of Adytuminfotech Softwares, pioneering healthcare and educational technology platforms."
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col sm:flex-row gap-4",
              children: [/* @__PURE__ */ jsx(Link, {
                to: "/about",
                className: "px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center",
                children: "Discover My Journey"
              }), /* @__PURE__ */ jsx("a", {
                href: "/Rudrakshya_Barman_CV_updated.pdf",
                target: "_blank",
                className: "px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-300 transform hover:-translate-y-1 transition-all duration-300 text-center",
                children: "Download CV"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-12",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "bg-white p-4 rounded-xl shadow-sm transform hover:scale-105 transition-transform duration-300",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "text-2xl font-bold text-blue-600",
                  children: "13+"
                }), /* @__PURE__ */ jsx("div", {
                  className: "text-gray-600 text-sm",
                  children: "Years Experience"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "bg-white p-4 rounded-xl shadow-sm transform hover:scale-105 transition-transform duration-300",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "text-2xl font-bold text-blue-600",
                  children: "300+"
                }), /* @__PURE__ */ jsx("div", {
                  className: "text-gray-600 text-sm",
                  children: "Institutions Served"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "bg-white p-4 rounded-xl shadow-sm transform hover:scale-105 transition-transform duration-300",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "text-2xl font-bold text-blue-600",
                  children: "150+"
                }), /* @__PURE__ */ jsx("div", {
                  className: "text-gray-600 text-sm",
                  children: "Enterprises Served"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "bg-white p-4 rounded-xl shadow-sm transform hover:scale-105 transition-transform duration-300",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "text-2xl font-bold text-blue-600",
                  children: "350K+"
                }), /* @__PURE__ */ jsx("div", {
                  className: "text-gray-600 text-sm",
                  children: "App Users"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsx("div", {
            className: `flex justify-center transform transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`,
            children: /* @__PURE__ */ jsxs("div", {
              className: "relative",
              children: [/* @__PURE__ */ jsx("div", {
                className: "absolute -top-6 -left-6 w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl -z-10 animate-pulse"
              }), /* @__PURE__ */ jsxs("div", {
                className: "relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl",
                children: [/* @__PURE__ */ jsx("img", {
                  src: "/brand.png",
                  alt: "Rudrakshya Barman",
                  className: "w-full h-full object-cover"
                }), /* @__PURE__ */ jsx("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                })]
              }), /* @__PURE__ */ jsx("div", {
                className: "absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg flex items-center justify-center transform rotate-12 hover:rotate-6 transition-transform duration-500",
                children: /* @__PURE__ */ jsx("span", {
                  className: "text-white font-bold text-xl",
                  children: "2012"
                })
              })]
            })
          })]
        })
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-20 animate-bounce"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute top-40 right-20 w-6 h-6 bg-purple-400 rounded-full opacity-20 animate-ping"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute bottom-40 left-20 w-3 h-3 bg-indigo-400 rounded-full opacity-20 animate-pulse"
      }), /* @__PURE__ */ jsx("div", {
        className: "absolute bottom-20 right-10 w-5 h-5 bg-blue-300 rounded-full opacity-20 animate-bounce delay-1000"
      })]
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4",
            children: ["Key ", /* @__PURE__ */ jsx("span", {
              className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600",
              children: "Achievements"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-3xl mx-auto",
            children: "Demonstrating growth, impact, and market validation across multiple ventures"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-8",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 transform hover:-translate-y-2 transition-all duration-500",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-8 h-8 text-blue-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-3",
              children: "Business Growth"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-3",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Founded and scaled Adytuminfotech Softwares Pvt Ltd (2018)"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Private limited company establishment with proven business model"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Multiple successful product launches in healthcare and education"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-8 h-8 text-purple-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-3",
              children: "Market Impact"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-3",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "300+ educational institutions using Progati ERP"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "350,000+ active mobile app users with 4.6★ rating"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "150+ enterprises served with custom solutions"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "70% reduction in administrative reporting time through ML analytics"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 transform hover:-translate-y-2 transition-all duration-500 delay-200",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mb-6",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-8 h-8 text-pink-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-3",
              children: "Innovation & Tech"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-3",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "First Android app for Progati ERP (2018) enabling parent-teacher communication"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Online virtual classroom software for remote education during COVID-19"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "ML-powered analytics dashboard with deep learning models for student performance prediction"
                })]
              })]
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gradient-to-br from-gray-50 to-blue-50",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4",
            children: ["Career ", /* @__PURE__ */ jsx("span", {
              className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600",
              children: "Milestones"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-3xl mx-auto",
            children: "From pioneering healthcare technology to educational innovation and student mentorship"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-5 gap-6 max-w-6xl mx-auto",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 text-center shadow-sm transform hover:scale-105 transition-transform duration-300",
            children: [/* @__PURE__ */ jsx("div", {
              className: "text-3xl font-bold text-blue-600 mb-2",
              children: "2012"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-lg font-bold text-gray-900 mb-2",
              children: "First Venture"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 text-sm",
              children: "Founded Adytum Technologies focusing on healthcare digitization"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 text-center shadow-sm transform hover:scale-105 transition-transform duration-300 delay-100",
            children: [/* @__PURE__ */ jsx("div", {
              className: "text-3xl font-bold text-blue-600 mb-2",
              children: "2014"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-lg font-bold text-gray-900 mb-2",
              children: "Progati ERP"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 text-sm",
              children: "Developed comprehensive school management ERP adopted by 100+ institutions"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 text-center shadow-sm transform hover:scale-105 transition-transform duration-300 delay-200",
            children: [/* @__PURE__ */ jsx("div", {
              className: "text-3xl font-bold text-blue-600 mb-2",
              children: "2018"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-lg font-bold text-gray-900 mb-2",
              children: "Company & Mobile"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 text-sm",
              children: "Established Pvt Ltd company and launched first Android app"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 text-center shadow-sm transform hover:scale-105 transition-transform duration-300 delay-300",
            children: [/* @__PURE__ */ jsx("div", {
              className: "text-3xl font-bold text-blue-600 mb-2",
              children: "2020"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-lg font-bold text-gray-900 mb-2",
              children: "Virtual Classroom"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 text-sm",
              children: "Built online virtual classroom software supporting remote education"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 text-center shadow-sm transform hover:scale-105 transition-transform duration-300 delay-400",
            children: [/* @__PURE__ */ jsx("div", {
              className: "text-3xl font-bold text-blue-600 mb-2",
              children: "2024"
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-lg font-bold text-gray-900 mb-2",
              children: "Feedvoty"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 text-sm",
              children: "Founded solo venture - scalable feedback analytics platform"
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4",
            children: ["Featured ", /* @__PURE__ */ jsx("span", {
              className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600",
              children: "Ventures"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-2xl mx-auto",
            children: "Building innovative solutions across healthcare and education technology"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-8",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300",
              children: /* @__PURE__ */ jsx("span", {
                className: "text-white font-bold text-2xl",
                children: "U"
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-3",
              children: "UTOPIA"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-blue-600 font-medium mb-3",
              children: "Healthcare Management System"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 mb-6",
              children: "Comprehensive healthcare management software for OPD, IPD, and Pathological Labs with complete workflow systems."
            }), /* @__PURE__ */ jsxs(Link, {
              to: "/projects",
              className: "text-blue-600 font-semibold hover:text-blue-700 flex items-center",
              children: ["Learn more", /* @__PURE__ */ jsx("svg", {
                className: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M9 5l7 7-7 7"
                })
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300",
              children: /* @__PURE__ */ jsx("span", {
                className: "text-white font-bold text-2xl",
                children: "P"
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-3",
              children: "PROGATI"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-purple-600 font-medium mb-3",
              children: "School ERP System"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 mb-6",
              children: "Comprehensive school management ERP adopted by 100+ educational institutions with Flutter mobile apps."
            }), /* @__PURE__ */ jsxs(Link, {
              to: "/projects",
              className: "text-purple-600 font-semibold hover:text-purple-700 flex items-center",
              children: ["Learn more", /* @__PURE__ */ jsx("svg", {
                className: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M9 5l7 7-7 7"
                })
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300",
              children: /* @__PURE__ */ jsx("span", {
                className: "text-white font-bold text-2xl",
                children: "F"
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-3",
              children: "FEEDVOTY"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-pink-600 font-medium mb-3",
              children: "Communication Platform"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 mb-6",
              children: "Scalable feedback analytics platform with real-time ML pipelines for sentiment analysis."
            }), /* @__PURE__ */ jsxs(Link, {
              to: "/projects",
              className: "text-pink-600 font-semibold hover:text-pink-700 flex items-center",
              children: ["Learn more", /* @__PURE__ */ jsx("svg", {
                className: "w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M9 5l7 7-7 7"
                })
              })]
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "text-center mt-12",
          children: /* @__PURE__ */ jsxs(Link, {
            to: "/projects",
            className: "inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300",
            children: ["View All Ventures", /* @__PURE__ */ jsx("svg", {
              className: "w-5 h-5 ml-2",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M14 5l7 7m0 0l-7 7m7-7H3"
              })
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gradient-to-br from-gray-50 to-blue-50",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4",
            children: ["Technical ", /* @__PURE__ */ jsx("span", {
              className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600",
              children: "Expertise"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-2xl mx-auto",
            children: "Cutting-edge technologies and frameworks I've mastered through hands-on experience"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-all duration-300",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-lg font-bold text-gray-900 mb-3",
              children: "Languages & Frameworks"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-2",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-blue-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "Python & FastAPI"]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-blue-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "JavaScript & ReactJS"]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-blue-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "Flutter & Dart"]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-blue-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "PHP"]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-all duration-300 delay-100",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-lg font-bold text-gray-900 mb-3",
              children: "Databases"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-2",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-blue-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "MySQL"]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-blue-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "PostgreSQL"]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-all duration-300 delay-200",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-lg font-bold text-gray-900 mb-3",
              children: "AI & Machine Learning"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-2",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-blue-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "Machine Learning"]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-blue-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "Deep Learning"]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-blue-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "NLP Solutions"]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-all duration-300 delay-300",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-lg font-bold text-gray-900 mb-3",
              children: "Cloud & Architecture"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-2",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-blue-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "AWS Cloud Architecture"]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-blue-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "Microservices"]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-blue-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "CI/CD"]
              })]
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gradient-to-br from-gray-50 to-blue-50",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4",
            children: ["Business ", /* @__PURE__ */ jsx("span", {
              className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600",
              children: "Expertise"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-2xl mx-auto",
            children: "Strategic insights and business acumen developed through 13+ years of entrepreneurship"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mb-6",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-8 h-8 text-white",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-4",
              children: "Strategic Planning"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 mb-6",
              children: "Developed and executed long-term visions for technology ventures spanning healthcare and educational sectors."
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-2",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Market analysis and opportunity identification"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Product roadmap development"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Revenue model optimization"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mb-6",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-8 h-8 text-white",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-4",
              children: "Client Relationship"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 mb-6",
              children: "Built and maintained long-term relationships with 300+ educational institutions and 150+ enterprise clients."
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-2",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Stakeholder management and communication"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Requirements gathering and solution design"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Contract negotiation and SLA management"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-6",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-8 h-8 text-white",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M13 10V3L4 14h7v7l9-11h-7z"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-4",
              children: "Growth & Scaling"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 mb-6",
              children: "Successfully scaled ventures from solo projects to serving 350,000+ app users with sustainable growth strategies."
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-2",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "User acquisition and retention strategies"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Market expansion and diversification"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Operational efficiency optimization"
                })]
              })]
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4",
            children: ["Team Building & ", /* @__PURE__ */ jsx("span", {
              className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600",
              children: "Leadership"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-2xl mx-auto",
            children: "Developing talent and fostering collaborative environments for innovation"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-6",
              children: "Team Development"
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-6",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-blue-600 font-bold",
                    children: "1"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900 mb-1",
                    children: "Talent Acquisition"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Started hiring dedicated developers in 2016, building teams with diverse technical expertise."
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-purple-600 font-bold",
                    children: "2"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900 mb-1",
                    children: "Skill Development"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Continuously upskilled teams on modern technologies including Python FastAPI, ReactJS, and Flutter."
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mr-4 flex-shrink-0",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-pink-600 font-bold",
                    children: "3"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900 mb-1",
                    children: "Performance Management"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Implemented agile methodologies and collaborative workflows to maximize team productivity."
                  })]
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-6",
              children: "Leadership Approach"
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-6",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mr-4 flex-shrink-0",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-green-600 font-bold",
                    children: "1"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900 mb-1",
                    children: "Mentorship Focus"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Mentored two entrepreneurs in building their technology businesses since 2018, providing technical architecture guidance."
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mr-4 flex-shrink-0",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-yellow-600 font-bold",
                    children: "2"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900 mb-1",
                    children: "Student Guidance"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Mentoring college students in ML/DL concepts and hands-on project implementation since 2020."
                  })]
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mr-4 flex-shrink-0",
                  children: /* @__PURE__ */ jsx("span", {
                    className: "text-red-600 font-bold",
                    children: "3"
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900 mb-1",
                    children: "Academic Collaboration"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Sharing real-world software development experience with academic community since 2016."
                  })]
                })]
              })]
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "mt-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto border border-blue-100",
          children: /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-4",
              children: "Leadership Impact"
            }), /* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-3 gap-6 mt-8",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "bg-white rounded-xl p-6 shadow-sm",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "text-3xl font-bold text-blue-600 mb-2",
                  children: "2"
                }), /* @__PURE__ */ jsx("div", {
                  className: "text-gray-600",
                  children: "Entrepreneurs Mentored"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "bg-white rounded-xl p-6 shadow-sm",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "text-3xl font-bold text-purple-600 mb-2",
                  children: "50+"
                }), /* @__PURE__ */ jsx("div", {
                  className: "text-gray-600",
                  children: "Students Guided"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "bg-white rounded-xl p-6 shadow-sm",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "text-3xl font-bold text-pink-600 mb-2",
                  children: "15+"
                }), /* @__PURE__ */ jsx("div", {
                  className: "text-gray-600",
                  children: "Team Members"
                })]
              })]
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4",
            children: ["Mentorship & ", /* @__PURE__ */ jsx("span", {
              className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600",
              children: "Guidance"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-2xl mx-auto",
            children: "Supporting the next generation of entrepreneurs and technologists"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-8",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-all duration-300",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-8 h-8 text-blue-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 mb-4",
              children: "Entrepreneur Mentoring"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 mb-4",
              children: "Mentored and guided two entrepreneurs in building their businesses through technology solutions since 2018."
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-2",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "Technical architecture guidance"]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "Technology stack recommendations"]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "Practical insights on scaling technology-driven businesses"]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-all duration-300 delay-100",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-8 h-8 text-purple-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 mb-4",
              children: "Student ML/DL Mentoring"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 mb-4",
              children: "Mentoring college students in machine learning and deep learning concepts since 2020."
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-2",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "Hands-on ML/DL project implementation"]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "Bridging theoretical knowledge with practical industry applications"]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-all duration-300 delay-200",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mb-6",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-8 h-8 text-pink-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 mb-4",
              children: "Academic Collaboration"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 mb-4",
              children: "Sharing real-world software development experience with academic community since 2016."
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-2",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "Industry trends in healthcare technology and educational software"]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "Entrepreneurship journey guidance"]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), "Technology business development insights"]
              })]
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gradient-to-br from-gray-50 to-blue-50",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4",
            children: ["Latest ", /* @__PURE__ */ jsx("span", {
              className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600",
              children: "Blog Posts"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-2xl mx-auto",
            children: "Thoughts, insights, and tutorials on software engineering, technology, and entrepreneurship"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-all duration-300",
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex items-center mb-4",
              children: /* @__PURE__ */ jsx("span", {
                className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800",
                children: "Software Engineering"
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 mb-3",
              children: "Building Scalable Microservices"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 mb-4",
              children: "Learn how to design and implement scalable microservices architecture using modern technologies."
            }), /* @__PURE__ */ jsxs(Link, {
              to: "/blog",
              className: "text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center",
              children: ["Read more", /* @__PURE__ */ jsx("svg", {
                className: "w-4 h-4 ml-1",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M9 5l7 7-7 7"
                })
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-all duration-300 delay-100",
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex items-center mb-4",
              children: /* @__PURE__ */ jsx("span", {
                className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800",
                children: "AI & Healthcare"
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 mb-3",
              children: "The Future of AI in Healthcare"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 mb-4",
              children: "Exploring how artificial intelligence is transforming healthcare delivery and patient outcomes."
            }), /* @__PURE__ */ jsxs(Link, {
              to: "/blog",
              className: "text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center",
              children: ["Read more", /* @__PURE__ */ jsx("svg", {
                className: "w-4 h-4 ml-1",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M9 5l7 7-7 7"
                })
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transform hover:-translate-y-1 transition-all duration-300 delay-200",
            children: [/* @__PURE__ */ jsx("div", {
              className: "flex items-center mb-4",
              children: /* @__PURE__ */ jsx("span", {
                className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800",
                children: "Entrepreneurship"
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 mb-3",
              children: "Entrepreneurship Lessons"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 mb-4",
              children: "Key insights and lessons learned from building technology ventures in healthcare and education sectors."
            }), /* @__PURE__ */ jsxs(Link, {
              to: "/blog",
              className: "text-pink-600 hover:text-pink-700 font-medium text-sm flex items-center",
              children: ["Read more", /* @__PURE__ */ jsx("svg", {
                className: "w-4 h-4 ml-1",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M9 5l7 7-7 7"
                })
              })]
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "text-center mt-12",
          children: /* @__PURE__ */ jsxs(Link, {
            to: "/blog",
            className: "inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300",
            children: ["View All Articles", /* @__PURE__ */ jsx("svg", {
              className: "w-5 h-5 ml-2",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M14 5l7 7m0 0l-7 7m7-7H3"
              })
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gradient-to-r from-blue-600 to-purple-600",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl md:text-4xl font-bold text-white mb-6",
          children: "Let's Collaborate"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl text-blue-100 mb-10 max-w-2xl mx-auto",
          children: "Whether you're an investor, engineering student, or aspiring entrepreneur, I'm excited to connect and explore opportunities together."
        }), /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col sm:flex-row gap-4 justify-center",
          children: [/* @__PURE__ */ jsx(Link, {
            to: "/contact",
            className: "px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center",
            children: "Get In Touch"
          }), /* @__PURE__ */ jsx(Link, {
            to: "/collaboration",
            className: "px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transform hover:-translate-y-1 transition-all duration-300 text-center",
            children: "Explore Collaboration"
          }), /* @__PURE__ */ jsx("a", {
            href: "mailto:rudrakshya91@gmail.com",
            className: "px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transform hover:-translate-y-1 transition-all duration-300 text-center",
            children: "Send Email"
          })]
        })]
      })
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
function meta$5({}) {
  const title = "About - Visionary Entrepreneur & Technology Leader";
  const description = "Learn about Rudrakshya Barman's journey as a software engineer and entrepreneur with 13+ years of experience building enterprise solutions in healthcare and educational technology.";
  const imageUrl = "https://rudrakshyabarman.com/brand.png";
  const url = "https://rudrakshyabarman.com/about";
  return [
    {
      title
    },
    {
      name: "description",
      content: description
    },
    {
      name: "keywords",
      content: "software engineer, entrepreneur, technology leader, healthcare technology, educational technology, career journey, professional experience, machine learning, full-stack development"
    },
    // Open Graph tags
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:url",
      content: url
    },
    {
      property: "og:image",
      content: imageUrl
    },
    {
      property: "og:image:alt",
      content: "Rudrakshya Barman"
    },
    {
      property: "og:locale",
      content: "en_US"
    },
    // Twitter Card tags
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: imageUrl
    },
    {
      name: "twitter:image:alt",
      content: "Rudrakshya Barman"
    },
    {
      name: "twitter:site",
      content: "@rudrakshya"
    },
    {
      name: "twitter:creator",
      content: "@rudrakshya"
    },
    // Additional meta tags
    {
      name: "robots",
      content: "index, follow"
    },
    {
      name: "author",
      content: "Rudrakshya Barman"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }
  ];
}
const about = UNSAFE_withComponentProps(function About() {
  const timelineEvents = [{
    year: "2012",
    title: "Founded Adytum Technologies",
    description: "Established first technology venture focusing on healthcare digitization and process automation. Developed and shipped UTOPIA - comprehensive healthcare management software for OPD, IPD, and Pathological Labs."
  }, {
    year: "2014",
    title: "Launched Progati School ERP",
    description: "Conceived and developed comprehensive school management ERP adopted by 100+ educational institutions. Built Flutter mobile applications with 15,000+ active users achieving 4.6★ rating."
  }, {
    year: "2016",
    title: "Team Expansion & Academic Collaboration",
    description: "Started hiring dedicated developers and began sharing real-world software development experience with academic community. Provided insights on industry trends in healthcare technology and educational software."
  }, {
    year: "2018",
    title: "Company Establishment & Mobile Innovation",
    description: "Established Adytuminfotech Softwares Pvt Ltd and launched first Android app for Progati ERP enabling seamless parent-teacher communication. Mentored two entrepreneurs in building their technology businesses."
  }, {
    year: "2020",
    title: "Virtual Classroom Development",
    description: "Developed online virtual classroom software during COVID-19, supporting remote education for institutions. Integrated ML-powered analytics dashboard reducing administrative reporting time by 70%."
  }, {
    year: "2022",
    title: "Technology Modernization",
    description: "Redesigned and rebuilt Progati mobile apps using Flutter for Android & iOS platforms. Implemented deep learning models for student performance prediction supporting academic counseling."
  }, {
    year: "2024",
    title: "Solo Venture & Student Mentoring",
    description: "Founded Feedvoty as a solo venture - a scalable feedback analytics platform with real-time ML pipelines for sentiment analysis. Expanded student mentoring in ML/DL concepts and guided entrepreneurs in technology business development."
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gradient-to-br from-gray-50 to-gray-100",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsx("h1", {
            className: "text-4xl md:text-5xl font-bold text-gray-900 mb-6",
            children: "About Me"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-3xl mx-auto",
            children: "Visionary entrepreneur and technology leader with 13+ years of experience building enterprise solutions from ground up. Passionate about industry-academic collaboration, mentoring students, and guiding entrepreneurs."
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto",
          children: /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "lg:col-span-2",
              children: [/* @__PURE__ */ jsx("h2", {
                className: "text-2xl font-bold text-gray-900 mb-6",
                children: "My Journey"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 mb-6",
                children: "I'm a visionary entrepreneur and technology leader with over 13 years of experience building enterprise solutions from the ground up. My journey began in 2012 when I founded Adytum Technologies, focusing on healthcare digitization and process automation."
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 mb-6",
                children: "Over the years, I've founded and scaled multiple ventures including Adytuminfotech Softwares Pvt Ltd, pioneering healthcare management systems (UTOPIA), educational ERP platforms (Progati), and innovative communication tools (Feedvoty)."
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600",
                children: "I'm passionate about industry-academic collaboration, mentoring college students in ML/DL concepts, and guiding entrepreneurs in technology business development. I bridge the gap between theoretical knowledge and practical implementation through real-world product development."
              })]
            }), /* @__PURE__ */ jsx("div", {
              className: "flex justify-center",
              children: /* @__PURE__ */ jsx("img", {
                src: "/brand.png",
                alt: "Rudrakshya Barman",
                className: "w-64 h-64 rounded-xl object-cover shadow-md"
              })
            })]
          })
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-3xl font-bold text-gray-900 mb-4",
            children: ["For ", /* @__PURE__ */ jsx("span", {
              className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600",
              children: "Investors"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-2xl mx-auto",
            children: "Demonstrating market validation, growth metrics, and scalable business models"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-6 h-6 text-blue-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 mb-3",
              children: "Proven Track Record"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-2",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Founded and scaled Adytuminfotech Softwares Pvt Ltd (2018)"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "3 major product launches in healthcare and education sectors"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Private limited company with established business model"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-6 h-6 text-purple-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 mb-3",
              children: "Market Impact"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-2",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "100+ educational institutions using Progati ERP"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "15,000+ active mobile app users with 4.6★ rating"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "70% reduction in administrative reporting time through ML analytics"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-4",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-6 h-6 text-pink-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M13 10V3L4 14h7v7l9-11h-7z"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 mb-3",
              children: "Scalable Innovation"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-2",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Scalable feedback analytics platform with real-time ML pipelines"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Deep learning models for student performance prediction"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Microservices architecture on AWS with 99.9% uptime"
                })]
              })]
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gradient-to-br from-gray-50 to-blue-50",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-3xl font-bold text-gray-900 mb-4",
            children: ["For ", /* @__PURE__ */ jsx("span", {
              className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600",
              children: "Engineering Colleges"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-2xl mx-auto",
            children: "Bridging the gap between theoretical knowledge and practical implementation"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "max-w-5xl mx-auto",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-8 mb-12",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "bg-white rounded-2xl p-8 shadow-sm border border-gray-100",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-2xl font-bold text-gray-900 mb-4",
                children: "Technical Expertise"
              }), /* @__PURE__ */ jsxs("div", {
                className: "grid grid-cols-2 gap-4",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900 mb-2",
                    children: "Languages & Frameworks"
                  }), /* @__PURE__ */ jsxs("ul", {
                    className: "text-gray-600 space-y-1",
                    children: [/* @__PURE__ */ jsx("li", {
                      children: "• Python & FastAPI"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• JavaScript & ReactJS"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• Flutter & Dart"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• PHP"
                    })]
                  })]
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900 mb-2",
                    children: "Technologies"
                  }), /* @__PURE__ */ jsxs("ul", {
                    className: "text-gray-600 space-y-1",
                    children: [/* @__PURE__ */ jsx("li", {
                      children: "• MySQL & PostgreSQL"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• AWS Cloud Architecture"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• Machine Learning"
                    }), /* @__PURE__ */ jsx("li", {
                      children: "• Microservices"
                    })]
                  })]
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "bg-white rounded-2xl p-8 shadow-sm border border-gray-100",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-2xl font-bold text-gray-900 mb-4",
                children: "Academic Collaboration"
              }), /* @__PURE__ */ jsxs("ul", {
                className: "text-gray-600 space-y-3",
                children: [/* @__PURE__ */ jsxs("li", {
                  className: "flex items-start",
                  children: [/* @__PURE__ */ jsx("svg", {
                    className: "w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  }), /* @__PURE__ */ jsx("span", {
                    children: "Sharing real-world software development experience with academic community since 2016"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  className: "flex items-start",
                  children: [/* @__PURE__ */ jsx("svg", {
                    className: "w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  }), /* @__PURE__ */ jsx("span", {
                    children: "Providing insights on industry trends in healthcare technology and educational software"
                  })]
                }), /* @__PURE__ */ jsxs("li", {
                  className: "flex items-start",
                  children: [/* @__PURE__ */ jsx("svg", {
                    className: "w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  }), /* @__PURE__ */ jsx("span", {
                    children: "Offering guidance on entrepreneurship journey and technology business development"
                  })]
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-white rounded-2xl p-8 shadow-sm border border-gray-100",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-4",
              children: "Innovation Projects"
            }), /* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-3 gap-6",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "border-l-4 border-blue-500 pl-4",
                children: [/* @__PURE__ */ jsx("h4", {
                  className: "font-bold text-gray-900 mb-2",
                  children: "Virtual Classroom Software"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-600 text-sm",
                  children: "Developed during COVID-19 to support remote education, demonstrating rapid response to market needs."
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "border-l-4 border-purple-500 pl-4",
                children: [/* @__PURE__ */ jsx("h4", {
                  className: "font-bold text-gray-900 mb-2",
                  children: "ML-Powered Analytics"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-600 text-sm",
                  children: "Dashboard reducing administrative reporting time by 70% through machine learning algorithms."
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "border-l-4 border-pink-500 pl-4",
                children: [/* @__PURE__ */ jsx("h4", {
                  className: "font-bold text-gray-900 mb-2",
                  children: "Deep Learning Models"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-600 text-sm",
                  children: "Student performance prediction systems supporting academic counseling and intervention."
                })]
              })]
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-3xl font-bold text-gray-900 mb-4",
            children: ["For ", /* @__PURE__ */ jsx("span", {
              className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600",
              children: "Junior Entrepreneurs"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-2xl mx-auto",
            children: "Mentorship and guidance for the next generation of technology entrepreneurs"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-6 h-6 text-blue-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 mb-4",
              children: "Entrepreneur Mentoring"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 mb-4",
              children: "Since 2018, I've mentored and guided two entrepreneurs in building their businesses through technology solutions."
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-2",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Technical architecture guidance"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Technology stack recommendations"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Practical insights on scaling technology-driven businesses"
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100",
            children: [/* @__PURE__ */ jsx("div", {
              className: "w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4",
              children: /* @__PURE__ */ jsx("svg", {
                className: "w-6 h-6 text-purple-600",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-xl font-bold text-gray-900 mb-4",
              children: "Student ML/DL Mentoring"
            }), /* @__PURE__ */ jsx("p", {
              className: "text-gray-600 mb-4",
              children: "Since 2020, I've been mentoring college students in machine learning and deep learning concepts."
            }), /* @__PURE__ */ jsxs("ul", {
              className: "text-gray-600 space-y-2",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Hands-on ML/DL project implementation"
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-center",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4 text-green-500 mr-2",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M5 13l4 4L19 7"
                  })
                }), /* @__PURE__ */ jsx("span", {
                  children: "Bridging theoretical knowledge with practical industry applications"
                })]
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto border border-blue-100",
          children: [/* @__PURE__ */ jsx("h3", {
            className: "text-2xl font-bold text-gray-900 mb-4",
            children: "Key Entrepreneurial Lessons"
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-6",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "bg-white rounded-xl p-6 shadow-sm",
              children: [/* @__PURE__ */ jsx("h4", {
                className: "font-bold text-gray-900 mb-2",
                children: "Start with Real Problems"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600",
                children: "My journey began by identifying communication gaps in educational institutions, leading to the development of Progati ERP and Feedvoty."
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "bg-white rounded-xl p-6 shadow-sm",
              children: [/* @__PURE__ */ jsx("h4", {
                className: "font-bold text-gray-900 mb-2",
                children: "Continuous Learning & Adaptation"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600",
                children: "Transitioned from PHP to modern frameworks like ReactJS and FastAPI, and embraced ML/DL to stay competitive."
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "bg-white rounded-xl p-6 shadow-sm",
              children: [/* @__PURE__ */ jsx("h4", {
                className: "font-bold text-gray-900 mb-2",
                children: "Build Scalable Solutions"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600",
                children: "Architected microservices on AWS to ensure 99.9% uptime and seamless scaling for educational institutions."
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "bg-white rounded-xl p-6 shadow-sm",
              children: [/* @__PURE__ */ jsx("h4", {
                className: "font-bold text-gray-900 mb-2",
                children: "Industry-Academic Bridge"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600",
                children: "Connected educational institutions with industry opportunities through student placement tracking systems."
              })]
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-bold text-gray-900 mb-4",
            children: "Career Timeline"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-2xl mx-auto",
            children: "Key milestones and achievements throughout my professional journey"
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "max-w-3xl mx-auto",
          children: timelineEvents.map((event, index) => /* @__PURE__ */ jsxs("div", {
            className: "flex",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex flex-col items-center mr-6",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold",
                children: event.year
              }), index !== timelineEvents.length - 1 && /* @__PURE__ */ jsx("div", {
                className: "w-1 h-full bg-blue-200 mt-2 flex-grow"
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "bg-gray-50 rounded-xl p-6 mb-8 flex-1",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-xl font-bold text-gray-900 mb-2",
                children: event.title
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600",
                children: event.description
              })]
            })]
          }, index))
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-16 bg-gray-50",
      children: /* @__PURE__ */ jsx("div", {
        className: "container mx-auto px-4 text-center",
        children: /* @__PURE__ */ jsx(Link, {
          to: "/",
          className: "inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md",
          children: "Back to Home"
        })
      })
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function meta$4({}) {
  const title = "Projects & Ventures - Healthcare & Educational Technology Solutions";
  const description = "Explore Rudrakshya Barman's innovative technology ventures including UTOPIA healthcare management system, PROGATI school ERP, and Feedvoty communication platform.";
  const imageUrl = "https://rudrakshyabarman.com/brand.png";
  const url = "https://rudrakshyabarman.com/projects";
  return [
    {
      title
    },
    {
      name: "description",
      content: description
    },
    {
      name: "keywords",
      content: "technology ventures, healthcare software, educational technology, SaaS products, software development, machine learning, mobile applications, enterprise solutions"
    },
    // Open Graph tags
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:url",
      content: url
    },
    {
      property: "og:image",
      content: imageUrl
    },
    {
      property: "og:image:alt",
      content: "Rudrakshya Barman Projects"
    },
    {
      property: "og:locale",
      content: "en_US"
    },
    // Twitter Card tags
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: imageUrl
    },
    {
      name: "twitter:image:alt",
      content: "Rudrakshya Barman Projects"
    },
    {
      name: "twitter:site",
      content: "@rudrakshya"
    },
    {
      name: "twitter:creator",
      content: "@rudrakshya"
    },
    // Additional meta tags
    {
      name: "robots",
      content: "index, follow"
    },
    {
      name: "author",
      content: "Rudrakshya Barman"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }
  ];
}
const projects = UNSAFE_withComponentProps(function Projects() {
  const ventures = [{
    name: "Adytuminfotech Softwares Pvt Ltd",
    role: "Founder & Director",
    period: "2018 - Present",
    description: "Private limited company scaling healthcare and educational technology solutions. Focused on building enterprise-grade software with measurable impact.",
    subsidiaries: [{
      name: "UTOPIA",
      type: "Healthcare Management System (SaaS Product)",
      description: "Comprehensive healthcare management system for OPD, IPD, and Laboratory services with real-time data analytics. Architected complete healthcare workflow systems from patient registration to billing and reporting."
    }, {
      name: "PROGATI",
      type: "School ERP System (SaaS Product)",
      description: "End-to-end school management solution covering admissions, academics, examinations, and administrative functions. Built Flutter mobile applications with 15,000+ active users achieving 4.6★ rating. Integrated ML-powered analytics dashboard reducing administrative reporting time by 70%."
    }, {
      name: "Feedvoty",
      type: "Communication Platform (Solo Venture)",
      description: "Scalable feedback analytics platform with real-time ML pipelines for sentiment analysis. Identified communication gaps between software companies and clients, developed as a solution to improve client communication and satisfaction."
    }],
    status: "Active",
    metrics: ["100+ Educational Institutions Served", "15,000+ Active Mobile App Users", "4.6★ App Store Rating", "70% Reduction in Administrative Reporting Time"]
  }];
  const projects2 = [{
    name: "Virtual Classroom Software",
    year: "2020",
    description: "Online virtual classroom software developed during the COVID-19 pandemic to support remote education for institutions. Enabled seamless continuation of educational activities during lockdowns.",
    technologies: ["ReactJS", "Node.js", "WebRTC", "MongoDB"],
    impact: "Supported remote education for 100+ institutions during the pandemic"
  }, {
    name: "Progati Mobile Applications",
    year: "2018 & 2022",
    description: "First Android app for Progati ERP enabling parent-teacher communication (2018). Later redesigned and rebuilt using Flutter for both Android & iOS platforms (2022) to reach a wider audience.",
    technologies: ["Android", "Java", "Flutter", "Dart", "Firebase"],
    impact: "15,000+ active users with 4.6★ rating"
  }, {
    name: "ML-Powered Analytics Dashboard",
    year: "2020",
    description: "Integrated ML-powered analytics dashboard in Progati ERP reducing administrative reporting time by 70%. Provided actionable insights for educational institutions.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "FastAPI"],
    impact: "70% reduction in administrative reporting time for 100+ institutions"
  }, {
    name: "Student Performance Prediction System",
    year: "2022",
    description: "Deep learning models for student performance prediction supporting academic counseling and early intervention strategies. Helped institutions identify at-risk students proactively.",
    technologies: ["Python", "TensorFlow", "Keras", "Pandas", "NumPy"],
    impact: "Enhanced academic counseling capabilities for educational institutions"
  }, {
    name: "Student Placement Tracking System",
    year: "2021",
    description: "System connecting educational institutions with industry opportunities. Bridged the gap between academia and industry by tracking student placements and employment outcomes.",
    technologies: ["ReactJS", "FastAPI", "PostgreSQL", "AWS"],
    impact: "Connected educational institutions with industry opportunities"
  }];
  const technicalSkills = [{
    category: "Languages & Frameworks",
    skills: ["Python", "FastAPI", "JavaScript", "ReactJS", "Flutter", "Dart", "PHP"]
  }, {
    category: "Databases",
    skills: ["MySQL", "PostgreSQL", "MongoDB"]
  }, {
    category: "AI & Machine Learning",
    skills: ["Machine Learning", "Deep Learning", "NLP", "Scikit-learn", "TensorFlow", "Keras"]
  }, {
    category: "Cloud & Architecture",
    skills: ["AWS Cloud Architecture", "Microservices", "CI/CD", "Docker", "Kubernetes"]
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gradient-to-br from-gray-50 to-gray-100",
      children: /* @__PURE__ */ jsx("div", {
        className: "container mx-auto px-4",
        children: /* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsx("h1", {
            className: "text-4xl font-bold text-gray-900 mb-6",
            children: "My Ventures & Projects"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-3xl mx-auto",
            children: "Innovative solutions and technology ventures I've founded, contributed to, and continue to develop. Showcasing measurable impact across healthcare and education sectors."
          })]
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "max-w-4xl mx-auto",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-bold text-gray-900 mb-12 text-center",
            children: "Technology Ventures"
          }), /* @__PURE__ */ jsx("div", {
            className: "space-y-12",
            children: ventures.map((venture, index) => /* @__PURE__ */ jsxs("div", {
              className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex flex-col md:flex-row md:items-center md:justify-between mb-6",
                children: [/* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsxs("div", {
                    className: "flex items-center mb-2",
                    children: [/* @__PURE__ */ jsx("h2", {
                      className: "text-2xl font-bold text-gray-900 mr-4",
                      children: venture.name
                    }), /* @__PURE__ */ jsx("span", {
                      className: "text-sm text-gray-500",
                      children: venture.period
                    })]
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-blue-600 font-medium",
                    children: venture.role
                  })]
                }), /* @__PURE__ */ jsx("span", {
                  className: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mt-4 md:mt-0",
                  children: venture.status
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 mb-6",
                children: venture.description
              }), /* @__PURE__ */ jsx("div", {
                className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8",
                children: venture.metrics.map((metric, metricIndex) => /* @__PURE__ */ jsxs("div", {
                  className: "bg-blue-50 rounded-lg p-3 text-center",
                  children: [/* @__PURE__ */ jsx("p", {
                    className: "text-sm text-blue-800 font-medium",
                    children: metric.split(" ")[0]
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-xs text-blue-600",
                    children: metric.split(" ").slice(1).join(" ")
                  })]
                }, metricIndex))
              }), venture.subsidiaries && venture.subsidiaries.length > 0 && /* @__PURE__ */ jsxs("div", {
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-lg font-bold text-gray-900 mb-4",
                  children: "Key Products:"
                }), /* @__PURE__ */ jsx("div", {
                  className: "grid grid-cols-1 gap-4",
                  children: venture.subsidiaries.map((subsidiary, subIndex) => /* @__PURE__ */ jsx("div", {
                    className: "bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow",
                    children: /* @__PURE__ */ jsx("div", {
                      className: "flex justify-between items-start",
                      children: /* @__PURE__ */ jsxs("div", {
                        children: [/* @__PURE__ */ jsx("h4", {
                          className: "font-bold text-gray-900",
                          children: subsidiary.name
                        }), /* @__PURE__ */ jsx("p", {
                          className: "text-gray-600 text-sm mb-2",
                          children: subsidiary.type
                        }), /* @__PURE__ */ jsx("p", {
                          className: "text-gray-700 text-sm",
                          children: subsidiary.description
                        })]
                      })
                    })
                  }, subIndex))
                })]
              })]
            }, index))
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "max-w-6xl mx-auto mt-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-bold text-gray-900 mb-12 text-center",
            children: "Notable Projects"
          }), /* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-8",
            children: projects2.map((project, index) => /* @__PURE__ */ jsxs("div", {
              className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex justify-between items-start mb-3",
                children: [/* @__PURE__ */ jsx("h3", {
                  className: "text-lg font-bold text-gray-900",
                  children: project.name
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded",
                  children: project.year
                })]
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 text-sm mb-4",
                children: project.description
              }), /* @__PURE__ */ jsx("div", {
                className: "flex flex-wrap gap-1 mb-3",
                children: project.technologies.map((tech, techIndex) => /* @__PURE__ */ jsx("span", {
                  className: "text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded",
                  children: tech
                }, techIndex))
              }), /* @__PURE__ */ jsx("div", {
                className: "text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded inline-block",
                children: project.impact
              })]
            }, index))
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "max-w-4xl mx-auto mt-20",
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-3xl font-bold text-gray-900 mb-12 text-center",
            children: "Technical Expertise"
          }), /* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
            children: technicalSkills.map((skillCategory, index) => /* @__PURE__ */ jsxs("div", {
              className: "bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200",
              children: [/* @__PURE__ */ jsx("h3", {
                className: "text-lg font-bold text-gray-900 mb-4",
                children: skillCategory.category
              }), /* @__PURE__ */ jsx("ul", {
                className: "space-y-2",
                children: skillCategory.skills.map((skill, skillIndex) => /* @__PURE__ */ jsxs("li", {
                  className: "flex items-center",
                  children: [/* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 text-blue-500 mr-2",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  }), /* @__PURE__ */ jsx("span", {
                    className: "text-gray-700 text-sm",
                    children: skill
                  })]
                }, skillIndex))
              })]
            }, index))
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "text-center mt-16",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/",
            className: "inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md",
            children: "Back to Home"
          })
        })]
      })
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: projects,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function meta$3({}) {
  const title = "Blog - Rudrakshya Barman";
  const description = "Thoughts, insights, and tutorials on software engineering, technology, and entrepreneurship.";
  const imageUrl = "https://rudrakshyabarman.com/brand.png";
  const url = "https://rudrakshyabarman.com/blog";
  return [
    {
      title
    },
    {
      name: "description",
      content: description
    },
    {
      name: "keywords",
      content: "blog, software engineering, technology, entrepreneurship, tutorials, insights"
    },
    // Open Graph tags
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:url",
      content: url
    },
    {
      property: "og:image",
      content: imageUrl
    },
    {
      property: "og:image:alt",
      content: "Rudrakshya Barman Blog"
    },
    {
      property: "og:locale",
      content: "en_US"
    },
    // Twitter Card tags
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: imageUrl
    },
    {
      name: "twitter:image:alt",
      content: "Rudrakshya Barman Blog"
    },
    {
      name: "twitter:site",
      content: "@rudrakshya"
    },
    {
      name: "twitter:creator",
      content: "@rudrakshya"
    },
    // Additional meta tags
    {
      name: "robots",
      content: "index, follow"
    },
    {
      name: "author",
      content: "Rudrakshya Barman"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }
  ];
}
const blogPosts = [{
  id: 1,
  title: "Building Scalable Microservices with Node.js and Docker",
  excerpt: "Learn how to design and implement scalable microservices architecture using Node.js and Docker containers.",
  date: "2024-05-15",
  readTime: "8 min read",
  category: "Software Engineering",
  image: "/brand.png"
}, {
  id: 2,
  title: "The Future of AI in Healthcare Technology",
  excerpt: "Exploring how artificial intelligence is transforming healthcare delivery and patient outcomes.",
  date: "2024-04-22",
  readTime: "6 min read",
  category: "AI & Healthcare",
  image: "/brand.png"
}, {
  id: 3,
  title: "Entrepreneurship Lessons from 13 Years in Tech",
  excerpt: "Key insights and lessons learned from building technology ventures in healthcare and education sectors.",
  date: "2024-03-30",
  readTime: "10 min read",
  category: "Entrepreneurship",
  image: "/brand.png"
}, {
  id: 4,
  title: "Mastering React Performance Optimization",
  excerpt: "Practical techniques to optimize React applications for better performance and user experience.",
  date: "2024-02-18",
  readTime: "12 min read",
  category: "Frontend Development",
  image: "/brand.png"
}, {
  id: 5,
  title: "DevOps Best Practices for Modern Teams",
  excerpt: "Essential DevOps practices that can transform your development workflow and deployment processes.",
  date: "2024-01-10",
  readTime: "9 min read",
  category: "DevOps",
  image: "/brand.png"
}, {
  id: 6,
  title: "Building Secure Authentication Systems",
  excerpt: "A comprehensive guide to implementing robust authentication and authorization in web applications.",
  date: "2023-12-05",
  readTime: "11 min read",
  category: "Security",
  image: "/brand.png"
}];
const blog = UNSAFE_withComponentProps(function Blog() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-50",
    children: [/* @__PURE__ */ jsx("section", {
      className: "py-16 bg-gradient-to-br from-blue-50 to-indigo-50",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "text-center",
          children: [/* @__PURE__ */ jsx("h1", {
            className: "text-4xl md:text-5xl font-bold text-gray-900 mb-6",
            children: "Blog"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-3xl mx-auto",
            children: "Thoughts, insights, and tutorials on software engineering, technology, and entrepreneurship."
          })]
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-16",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
          children: blogPosts.map((post, index) => /* @__PURE__ */ jsx("article", {
            className: "bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
            children: /* @__PURE__ */ jsxs("div", {
              className: "p-6",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between mb-4",
                children: [/* @__PURE__ */ jsx("span", {
                  className: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800",
                  children: post.category
                }), /* @__PURE__ */ jsx("span", {
                  className: "text-sm text-gray-500",
                  children: post.readTime
                })]
              }), /* @__PURE__ */ jsx("h2", {
                className: "text-xl font-bold text-gray-900 mb-3 line-clamp-2",
                children: post.title
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600 mb-4 line-clamp-3",
                children: post.excerpt
              }), /* @__PURE__ */ jsxs("div", {
                className: "flex items-center justify-between",
                children: [/* @__PURE__ */ jsx("time", {
                  className: "text-sm text-gray-500",
                  children: new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })
                }), /* @__PURE__ */ jsxs(Link, {
                  to: `/blog/${post.id}`,
                  className: "text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center",
                  children: ["Read more", /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 ml-1",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M9 5l7 7-7 7"
                    })
                  })]
                })]
              })]
            })
          }, post.id))
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-16 bg-gradient-to-r from-blue-600 to-purple-600",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold text-white mb-4",
          children: "Stay Updated"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl text-blue-100 mb-8",
          children: "Get notified when I publish new articles"
        }), /* @__PURE__ */ jsx("form", {
          className: "max-w-md mx-auto",
          children: /* @__PURE__ */ jsxs("div", {
            className: "flex flex-col sm:flex-row gap-4",
            children: [/* @__PURE__ */ jsx("input", {
              type: "email",
              placeholder: "Your email address",
              className: "flex-grow px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            }), /* @__PURE__ */ jsx("button", {
              type: "submit",
              className: "px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-md",
              children: "Subscribe"
            })]
          })
        })]
      })
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: blog,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function meta$2({}) {
  const title = "Contact - Get in Touch for Collaboration";
  const description = "Contact Rudrakshya Barman for business inquiries, collaboration opportunities, or to connect about technology ventures in healthcare and educational sectors.";
  const imageUrl = "https://rudrakshyabarman.com/brand.png";
  const url = "https://rudrakshyabarman.com/contact";
  return [
    {
      title
    },
    {
      name: "description",
      content: description
    },
    {
      name: "keywords",
      content: "contact, business inquiry, collaboration, technology ventures, healthcare technology, educational technology, software development, machine learning"
    },
    // Open Graph tags
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:url",
      content: url
    },
    {
      property: "og:image",
      content: imageUrl
    },
    {
      property: "og:image:alt",
      content: "Contact Rudrakshya Barman"
    },
    {
      property: "og:locale",
      content: "en_US"
    },
    // Twitter Card tags
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: imageUrl
    },
    {
      name: "twitter:image:alt",
      content: "Contact Rudrakshya Barman"
    },
    {
      name: "twitter:site",
      content: "@rudrakshya"
    },
    {
      name: "twitter:creator",
      content: "@rudrakshya"
    },
    // Additional meta tags
    {
      name: "robots",
      content: "index, follow"
    },
    {
      name: "author",
      content: "Rudrakshya Barman"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }
  ];
}
const contact = UNSAFE_withComponentProps(function Contact() {
  const contactMethods = [{
    title: "Email",
    value: "contact@rudrakshyabarman.com",
    icon: /* @__PURE__ */ jsx("svg", {
      className: "w-6 h-6",
      fill: "none",
      stroke: "currentColor",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ jsx("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      })
    })
  }, {
    title: "LinkedIn",
    value: "linkedin.com/in/rudrakshyabarman",
    link: "https://linkedin.com/in/rudrakshyabarman",
    icon: /* @__PURE__ */ jsx("svg", {
      className: "w-6 h-6",
      fill: "currentColor",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ jsx("path", {
        d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
      })
    })
  }, {
    title: "GitHub",
    value: "github.com/rudrakshyabarman",
    link: "https://github.com/rudrakshyabarman",
    icon: /* @__PURE__ */ jsx("svg", {
      className: "w-6 h-6",
      fill: "currentColor",
      viewBox: "0 0 24 24",
      children: /* @__PURE__ */ jsx("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      })
    })
  }];
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gradient-to-br from-gray-50 to-gray-100",
      children: /* @__PURE__ */ jsx("div", {
        className: "container mx-auto px-4",
        children: /* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsx("h1", {
            className: "text-4xl font-bold text-gray-900 mb-6",
            children: "Get In Touch"
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-3xl mx-auto",
            children: "I'm always open to discussing new opportunities, innovative projects, or potential collaborations."
          })]
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "container mx-auto px-4",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "max-w-4xl mx-auto",
          children: [/* @__PURE__ */ jsx("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-16",
            children: contactMethods.map((method, index) => /* @__PURE__ */ jsxs("div", {
              className: "bg-gray-50 rounded-xl p-6 text-center",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-blue-600",
                children: method.icon
              }), /* @__PURE__ */ jsx("h3", {
                className: "text-lg font-bold text-gray-900 mb-2",
                children: method.title
              }), method.link ? /* @__PURE__ */ jsx("a", {
                href: method.link,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-blue-600 hover:text-blue-700 font-medium",
                children: method.value
              }) : /* @__PURE__ */ jsx("a", {
                href: `mailto:${method.value}`,
                className: "text-blue-600 hover:text-blue-700 font-medium",
                children: method.value
              })]
            }, index))
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gray-50 rounded-2xl p-8",
            children: [/* @__PURE__ */ jsx("h2", {
              className: "text-2xl font-bold text-gray-900 mb-6 text-center",
              children: "My Ventures"
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-wrap justify-center gap-4",
              children: [/* @__PURE__ */ jsx("a", {
                href: "https://adytum.in",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "px-6 py-2 bg-white text-gray-900 font-medium rounded-full border border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-300",
                children: "ADYTUM"
              }), /* @__PURE__ */ jsx("a", {
                href: "https://progati.in",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "px-6 py-2 bg-white text-gray-900 font-medium rounded-full border border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-300",
                children: "PROGATI"
              }), /* @__PURE__ */ jsx("a", {
                href: "https://utopia.in",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "px-6 py-2 bg-white text-gray-900 font-medium rounded-full border border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-300",
                children: "UTOPIA"
              }), /* @__PURE__ */ jsx("a", {
                href: "https://bitcodium.com",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "px-6 py-2 bg-white text-gray-900 font-medium rounded-full border border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-300",
                children: "BITCODIUM"
              }), /* @__PURE__ */ jsx("a", {
                href: "https://feedvoty.com",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "px-6 py-2 bg-white text-gray-900 font-medium rounded-full border border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-300",
                children: "FEEDVOTY"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "text-center mt-16",
          children: /* @__PURE__ */ jsx(Link, {
            to: "/",
            className: "inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md",
            children: "Back to Home"
          })
        })]
      })
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: contact,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  const title = "Collaboration - Partner with a Technology Leader";
  const description = "Explore collaboration opportunities with Rudrakshya Barman for investment, academic partnerships, mentorship, technical projects, and community engagement in healthcare and educational technology.";
  const imageUrl = "https://rudrakshyabarman.com/brand.png";
  const url = "https://rudrakshyabarman.com/collaboration";
  return [
    {
      title
    },
    {
      name: "description",
      content: description
    },
    {
      name: "keywords",
      content: "collaboration, partnership, investment, academic partnership, mentorship, technical projects, community engagement, healthcare technology, educational technology"
    },
    // Open Graph tags
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:url",
      content: url
    },
    {
      property: "og:image",
      content: imageUrl
    },
    {
      property: "og:image:alt",
      content: "Collaborate with Rudrakshya Barman"
    },
    {
      property: "og:locale",
      content: "en_US"
    },
    // Twitter Card tags
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: imageUrl
    },
    {
      name: "twitter:image:alt",
      content: "Collaborate with Rudrakshya Barman"
    },
    {
      name: "twitter:site",
      content: "@rudrakshya"
    },
    {
      name: "twitter:creator",
      content: "@rudrakshya"
    },
    // Additional meta tags
    {
      name: "robots",
      content: "index, follow"
    },
    {
      name: "author",
      content: "Rudrakshya Barman"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }
  ];
}
const collaboration = UNSAFE_withComponentProps(function Collaboration() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen",
    children: [/* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gradient-to-br from-blue-50 to-indigo-50",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "text-center",
          children: [/* @__PURE__ */ jsxs("h1", {
            className: "text-4xl md:text-5xl font-bold text-gray-900 mb-6",
            children: ["Let's ", /* @__PURE__ */ jsx("span", {
              className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600",
              children: "Collaborate"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-3xl mx-auto mb-12",
            children: "Whether you're an investor, academic institution, startup founder, or student, I'm excited to explore opportunities for meaningful collaboration."
          }), /* @__PURE__ */ jsxs("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-all duration-300",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 mx-auto",
                children: /* @__PURE__ */ jsx("svg", {
                  className: "w-8 h-8 text-blue-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  })
                })
              }), /* @__PURE__ */ jsx("h3", {
                className: "text-xl font-bold text-gray-900 mb-3",
                children: "For Investors"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600",
                children: "Explore investment opportunities in healthcare and educational technology ventures with proven track records."
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-all duration-300",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 mx-auto",
                children: /* @__PURE__ */ jsx("svg", {
                  className: "w-8 h-8 text-purple-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  })
                })
              }), /* @__PURE__ */ jsx("h3", {
                className: "text-xl font-bold text-gray-900 mb-3",
                children: "For Academia"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600",
                children: "Bridge the gap between theoretical knowledge and practical implementation through industry collaboration."
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "bg-white rounded-2xl p-6 shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-all duration-300",
              children: [/* @__PURE__ */ jsx("div", {
                className: "w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mb-6 mx-auto",
                children: /* @__PURE__ */ jsx("svg", {
                  className: "w-8 h-8 text-pink-600",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx("path", {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  })
                })
              }), /* @__PURE__ */ jsx("h3", {
                className: "text-xl font-bold text-gray-900 mb-3",
                children: "For Entrepreneurs"
              }), /* @__PURE__ */ jsx("p", {
                className: "text-gray-600",
                children: "Get mentorship, technical guidance, and strategic insights to scale your technology ventures."
              })]
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-12 bg-gradient-to-br from-gray-50 to-blue-50",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 text-center border border-blue-100",
            children: [/* @__PURE__ */ jsx("div", {
              className: "text-3xl font-bold text-blue-600 mb-2",
              children: "300+"
            }), /* @__PURE__ */ jsx("div", {
              className: "text-gray-600",
              children: "Institutions Served"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 text-center border border-purple-100",
            children: [/* @__PURE__ */ jsx("div", {
              className: "text-3xl font-bold text-purple-600 mb-2",
              children: "150+"
            }), /* @__PURE__ */ jsx("div", {
              className: "text-gray-600",
              children: "Enterprises Served"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-pink-50 to-white rounded-2xl p-6 text-center border border-pink-100",
            children: [/* @__PURE__ */ jsx("div", {
              className: "text-3xl font-bold text-pink-600 mb-2",
              children: "350K+"
            }), /* @__PURE__ */ jsx("div", {
              className: "text-gray-600",
              children: "App Users"
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 text-center border border-green-100",
            children: [/* @__PURE__ */ jsx("div", {
              className: "text-3xl font-bold text-green-600 mb-2",
              children: "13+"
            }), /* @__PURE__ */ jsx("div", {
              className: "text-gray-600",
              children: "Years Experience"
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-white",
      children: /* @__PURE__ */ jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "text-center mb-16",
          children: [/* @__PURE__ */ jsxs("h2", {
            className: "text-3xl md:text-4xl font-bold text-gray-900 mb-4",
            children: ["Collaboration ", /* @__PURE__ */ jsx("span", {
              className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600",
              children: "Opportunities"
            })]
          }), /* @__PURE__ */ jsx("p", {
            className: "text-xl text-gray-600 max-w-3xl mx-auto",
            children: "I'm open to various forms of collaboration that create mutual value and drive innovation"
          })]
        }), /* @__PURE__ */ jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto",
          children: [/* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-6",
              children: "Investment & Partnership"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "space-y-4",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 text-blue-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900",
                    children: "Startup Investment"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Explore opportunities in healthcare and educational technology ventures"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 text-blue-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900",
                    children: "Strategic Partnerships"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Form alliances to expand market reach and capabilities"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-4 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 text-blue-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900",
                    children: "Joint Ventures"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Collaborate on new product development or market expansion"
                  })]
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-6",
              children: "Knowledge & Mentorship"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "space-y-4",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-4 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 text-purple-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900",
                    children: "Academic Collaboration"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Industry projects, research partnerships, and curriculum development"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-4 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 text-purple-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900",
                    children: "Entrepreneur Mentorship"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Technical guidance and strategic advice for startups"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-4 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 text-purple-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900",
                    children: "Student Training"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Hands-on workshops and internship opportunities"
                  })]
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-6",
              children: "Technical Collaboration"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "space-y-4",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mr-4 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 text-pink-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900",
                    children: "Product Development"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Co-develop innovative solutions in healthcare and education"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mr-4 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 text-pink-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900",
                    children: "Technology Consulting"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Expert guidance on architecture, implementation, and scaling"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center mr-4 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 text-pink-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900",
                    children: "Research Projects"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Collaborate on cutting-edge AI, ML, and software engineering research"
                  })]
                })]
              })]
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100",
            children: [/* @__PURE__ */ jsx("h3", {
              className: "text-2xl font-bold text-gray-900 mb-6",
              children: "Community Engagement"
            }), /* @__PURE__ */ jsxs("ul", {
              className: "space-y-4",
              children: [/* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 text-green-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900",
                    children: "Speaking Engagements"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Keynote speeches, workshops, and panel discussions"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 text-green-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900",
                    children: "Content Creation"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Collaborative articles, videos, and educational content"
                  })]
                })]
              }), /* @__PURE__ */ jsxs("li", {
                className: "flex items-start",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-4 mt-1",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-4 h-4 text-green-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M5 13l4 4L19 7"
                    })
                  })
                }), /* @__PURE__ */ jsxs("div", {
                  children: [/* @__PURE__ */ jsx("h4", {
                    className: "font-bold text-gray-900",
                    children: "Open Source"
                  }), /* @__PURE__ */ jsx("p", {
                    className: "text-gray-600",
                    children: "Contribute to and maintain open-source projects"
                  })]
                })]
              })]
            })]
          })]
        })]
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-20 bg-gradient-to-br from-gray-50 to-blue-50",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: /* @__PURE__ */ jsx("div", {
          className: "bg-white rounded-3xl shadow-xl p-8 md:p-12 max-w-4xl mx-auto",
          children: /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsxs("h2", {
              className: "text-3xl md:text-4xl font-bold text-gray-900 mb-6",
              children: ["Ready to ", /* @__PURE__ */ jsx("span", {
                className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600",
                children: "Collaborate"
              }), "?"]
            }), /* @__PURE__ */ jsx("p", {
              className: "text-xl text-gray-600 mb-10 max-w-2xl mx-auto",
              children: "I'm always excited to explore new opportunities and partnerships. Let's connect and see how we can create value together."
            }), /* @__PURE__ */ jsxs("div", {
              className: "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12",
              children: [/* @__PURE__ */ jsxs("div", {
                className: "bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-left",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4",
                  children: /* @__PURE__ */ jsx("svg", {
                    className: "w-6 h-6 text-blue-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    })
                  })
                }), /* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-bold text-gray-900 mb-2",
                  children: "Email"
                }), /* @__PURE__ */ jsx("a", {
                  href: "mailto:rudrakshya91@gmail.com",
                  className: "text-blue-600 hover:text-blue-700 font-medium",
                  children: "rudrakshya91@gmail.com"
                })]
              }), /* @__PURE__ */ jsxs("div", {
                className: "bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-left",
                children: [/* @__PURE__ */ jsx("div", {
                  className: "w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4",
                  children: /* @__PURE__ */ jsxs("svg", {
                    className: "w-6 h-6 text-purple-600",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: [/* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    }), /* @__PURE__ */ jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    })]
                  })
                }), /* @__PURE__ */ jsx("h3", {
                  className: "text-xl font-bold text-gray-900 mb-2",
                  children: "Location"
                }), /* @__PURE__ */ jsx("p", {
                  className: "text-gray-600",
                  children: "Malda, India"
                })]
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col sm:flex-row gap-4 justify-center",
              children: [/* @__PURE__ */ jsx("a", {
                href: "mailto:rudrakshya91@gmail.com",
                className: "px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 text-center",
                children: "Send Email"
              }), /* @__PURE__ */ jsx(Link, {
                to: "/contact",
                className: "px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-300 transform hover:-translate-y-1 transition-all duration-300 text-center",
                children: "Contact Form"
              })]
            })]
          })
        })
      })
    }), /* @__PURE__ */ jsx("section", {
      className: "py-12 bg-white",
      children: /* @__PURE__ */ jsx("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center",
        children: /* @__PURE__ */ jsxs(Link, {
          to: "/",
          className: "inline-flex items-center text-blue-600 hover:text-blue-700 font-medium",
          children: [/* @__PURE__ */ jsx("svg", {
            className: "w-5 h-5 mr-2",
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx("path", {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M10 19l-7-7m0 0l7-7m-7 7h18"
            })
          }), "Back to Home"]
        })
      })
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: collaboration,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function TestTailwind() {
  useEffect(() => {
    const testElement = document.createElement("div");
    testElement.className = "text-red-500";
    document.body.appendChild(testElement);
    const computedStyles = window.getComputedStyle(testElement);
    const isTailwindWorking = computedStyles.color === "rgb(239, 68, 68)";
    console.log("Tailwind CSS Working:", isTailwindWorking);
    document.body.removeChild(testElement);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-blue-500", children: "Tailwind CSS Test" }),
    /* @__PURE__ */ jsx("p", { className: "text-green-500", children: "If you see this text in blue and green, Tailwind is working!" }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 p-4 bg-purple-100 rounded-lg", children: /* @__PURE__ */ jsx("p", { className: "text-purple-700", children: "This should have a purple background." }) })
  ] });
}
function meta({}) {
  const title = "Test Page";
  const description = "Test page for Rudrakshya Barman's website.";
  const imageUrl = "https://rudrakshyabarman.com/brand.png";
  const url = "https://rudrakshyabarman.com/test";
  return [
    {
      title
    },
    {
      name: "description",
      content: description
    },
    {
      name: "keywords",
      content: "test, website, development"
    },
    // Open Graph tags
    {
      property: "og:title",
      content: title
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:type",
      content: "website"
    },
    {
      property: "og:url",
      content: url
    },
    {
      property: "og:image",
      content: imageUrl
    },
    {
      property: "og:image:alt",
      content: "Test Page"
    },
    {
      property: "og:locale",
      content: "en_US"
    },
    // Twitter Card tags
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: imageUrl
    },
    {
      name: "twitter:image:alt",
      content: "Test Page"
    },
    {
      name: "twitter:site",
      content: "@rudrakshya"
    },
    {
      name: "twitter:creator",
      content: "@rudrakshya"
    },
    // Additional meta tags
    {
      name: "robots",
      content: "noindex, nofollow"
    },
    {
      name: "author",
      content: "Rudrakshya Barman"
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }
  ];
}
const test = UNSAFE_withComponentProps(function Test() {
  return /* @__PURE__ */ jsxs("div", {
    className: "p-8",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-3xl font-bold text-blue-600 mb-4",
      children: "Tailwind CSS Test Page"
    }), /* @__PURE__ */ jsx(TestTailwind, {})]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: test,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-ChacV1-B.js", "imports": ["/assets/chunk-B7RQU5TL-D6f9y3lJ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DBXbC4iw.js", "imports": ["/assets/chunk-B7RQU5TL-D6f9y3lJ.js"], "css": ["/assets/root-Dw5Lk6it.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-Dw-M7Adf.js", "imports": ["/assets/chunk-B7RQU5TL-D6f9y3lJ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/about-CDkzBOZo.js", "imports": ["/assets/chunk-B7RQU5TL-D6f9y3lJ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/projects": { "id": "routes/projects", "parentId": "root", "path": "projects", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/projects-B56p82rT.js", "imports": ["/assets/chunk-B7RQU5TL-D6f9y3lJ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/blog": { "id": "routes/blog", "parentId": "root", "path": "blog", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/blog-BndzatOz.js", "imports": ["/assets/chunk-B7RQU5TL-D6f9y3lJ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/contact": { "id": "routes/contact", "parentId": "root", "path": "contact", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/contact-Bckjota5.js", "imports": ["/assets/chunk-B7RQU5TL-D6f9y3lJ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/collaboration": { "id": "routes/collaboration", "parentId": "root", "path": "collaboration", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/collaboration-C5T1D3w2.js", "imports": ["/assets/chunk-B7RQU5TL-D6f9y3lJ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/test": { "id": "routes/test", "parentId": "root", "path": "test", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/test-Cr94fOOY.js", "imports": ["/assets/chunk-B7RQU5TL-D6f9y3lJ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-dd888436.js", "version": "dd888436", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v8_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/projects": {
    id: "routes/projects",
    parentId: "root",
    path: "projects",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/blog": {
    id: "routes/blog",
    parentId: "root",
    path: "blog",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/contact": {
    id: "routes/contact",
    parentId: "root",
    path: "contact",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/collaboration": {
    id: "routes/collaboration",
    parentId: "root",
    path: "collaboration",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/test": {
    id: "routes/test",
    parentId: "root",
    path: "test",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
