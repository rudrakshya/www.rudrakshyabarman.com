import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function AboutPage() {
  const timelineEvents = [
    {
      year: "2012",
      title: "Founded Adytum Technologies",
      description: "Established first technology venture focusing on healthcare digitization and process automation. Developed and shipped UTOPIA - comprehensive healthcare management software for OPD, IPD, and Pathological Labs."
    },
    {
      year: "2014",
      title: "Launched Progati School ERP",
      description: "Conceived and developed comprehensive school management ERP adopted by 100+ educational institutions. Built Flutter mobile applications with 15,000+ active users achieving 4.6★ rating."
    },
    {
      year: "2016",
      title: "Team Expansion & Academic Collaboration",
      description: "Started hiring dedicated developers and began sharing real-world software development experience with academic community. Provided insights on industry trends in healthcare technology and educational software."
    },
    {
      year: "2018",
      title: "Company Establishment & Mobile Innovation",
      description: "Established Adytuminfotech Softwares Pvt Ltd and launched first Android app for Progati ERP enabling seamless parent-teacher communication. Mentored two entrepreneurs in building their technology businesses."
    },
    {
      year: "2020",
      title: "Virtual Classroom Development",
      description: "Developed online virtual classroom software during COVID-19, supporting remote education for institutions. Integrated ML-powered analytics dashboard reducing administrative reporting time by 70%."
    },
    {
      year: "2022",
      title: "Technology Modernization",
      description: "Redesigned and rebuilt Progati mobile apps using Flutter for Android & iOS platforms. Implemented deep learning models for student performance prediction supporting academic counseling."
    },
    {
      year: "2024",
      title: "Solo Venture & Student Mentoring",
      description: "Founded Feedvoty as a solo venture - a scalable feedback analytics platform with real-time ML pipelines for sentiment analysis. Expanded student mentoring in ML/DL concepts and guided entrepreneurs in technology business development."
    }
  ];

  return (
    <div>
      <SEO 
        title="About - Visionary Entrepreneur & Technology Leader"
        description="Learn about Rudrakshya Barman's journey as a software engineer and entrepreneur with 13+ years of experience building enterprise solutions in healthcare and educational technology."
        keywords="software engineer, entrepreneur, technology leader, healthcare technology, educational technology, career journey, professional experience, machine learning, full-stack development"
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Me</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visionary entrepreneur and technology leader with 13+ years of experience building enterprise solutions from ground up. 
              Passionate about industry-academic collaboration, mentoring students, and guiding entrepreneurs.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">My Journey</h2>
                <p className="text-gray-600 mb-6">
                  I'm a visionary entrepreneur and technology leader with over 13 years of experience building enterprise solutions from the ground up. 
                  My journey began in 2012 when I founded Adytum Technologies, focusing on healthcare digitization and process automation.
                </p>
                <p className="text-gray-600 mb-6">
                  Over the years, I've founded and scaled multiple ventures including Adytuminfotech Softwares Pvt Ltd, pioneering healthcare 
                  management systems (UTOPIA), educational ERP platforms (Progati), and innovative communication tools (Feedvoty).
                </p>
                <p className="text-gray-600">
                  I'm passionate about industry-academic collaboration, mentoring college students in ML/DL concepts, and guiding entrepreneurs 
                  in technology business development. I bridge the gap between theoretical knowledge and practical implementation through 
                  real-world product development.
                </p>
              </div>
              
              <div className="flex justify-center">
                <img 
                  src="/brand.png" 
                  alt="Rudrakshya Barman" 
                  className="w-64 h-64 rounded-xl object-cover shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Investors */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Investors</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Demonstrating market validation, growth metrics, and scalable business models
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Proven Track Record</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Founded and scaled Adytuminfotech Softwares Pvt Ltd (2018)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>3 major product launches in healthcare and education sectors</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Private limited company with established business model</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Market Impact</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>100+ educational institutions using Progati ERP</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>15,000+ active mobile app users with 4.6★ rating</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>70% reduction in administrative reporting time through ML analytics</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scalable Innovation</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Scalable feedback analytics platform with real-time ML pipelines</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Deep learning models for student performance prediction</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Microservices architecture on AWS with 99.9% uptime</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* For Engineering Colleges */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Engineering Colleges</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bridging the gap between theoretical knowledge and practical implementation
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Technical Expertise</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Languages & Frameworks</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• Python & FastAPI</li>
                      <li>• JavaScript & ReactJS</li>
                      <li>• Flutter & Dart</li>
                      <li>• PHP</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Technologies</h4>
                    <ul className="text-gray-600 space-y-1">
                      <li>• MySQL & PostgreSQL</li>
                      <li>• AWS Cloud Architecture</li>
                      <li>• Machine Learning</li>
                      <li>• Microservices</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Academic Collaboration</h3>
                <ul className="text-gray-600 space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Sharing real-world software development experience with academic community since 2016</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Providing insights on industry trends in healthcare technology and educational software</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Offering guidance on entrepreneurship journey and technology business development</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Virtual Classroom Software</h4>
                  <p className="text-gray-600 text-sm">
                    Developed during COVID-19 to support remote education, demonstrating rapid response to market needs.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">ML-Powered Analytics</h4>
                  <p className="text-gray-600 text-sm">
                    Dashboard reducing administrative reporting time by 70% through machine learning algorithms.
                  </p>
                </div>
                <div className="border-l-4 border-pink-500 pl-4">
                  <h4 className="font-bold text-gray-900 mb-2">Deep Learning Models</h4>
                  <p className="text-gray-600 text-sm">
                    Student performance prediction systems supporting academic counseling and intervention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Junior Entrepreneurs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Junior Entrepreneurs</span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mentorship and guidance for the next generation of technology entrepreneurs
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Entrepreneur Mentoring</h3>
              <p className="text-gray-600 mb-4">
                Since 2018, I've mentored and guided two entrepreneurs in building their businesses through technology solutions.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Technical architecture guidance</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Technology stack recommendations</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Practical insights on scaling technology-driven businesses</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Student ML/DL Mentoring</h3>
              <p className="text-gray-600 mb-4">
                Since 2020, I've been mentoring college students in machine learning and deep learning concepts.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Hands-on ML/DL project implementation</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Bridging theoretical knowledge with practical industry applications</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Entrepreneurial Lessons</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Start with Real Problems</h4>
                <p className="text-gray-600">
                  My journey began by identifying communication gaps in educational institutions, leading to the development of Progati ERP and Feedvoty.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Continuous Learning & Adaptation</h4>
                <p className="text-gray-600">
                  Transitioned from PHP to modern frameworks like ReactJS and FastAPI, and embraced ML/DL to stay competitive.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Build Scalable Solutions</h4>
                <p className="text-gray-600">
                  Architected microservices on AWS to ensure 99.9% uptime and seamless scaling for educational institutions.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-2">Industry-Academic Bridge</h4>
                <p className="text-gray-600">
                  Connected educational institutions with industry opportunities through student placement tracking systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Timeline</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key milestones and achievements throughout my professional journey
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {timelineEvents.map((event, index) => (
              <div key={index} className="flex">
                <div className="flex flex-col items-center mr-6">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {event.year}
                  </div>
                  {index !== timelineEvents.length - 1 && (
                    <div className="w-1 h-full bg-blue-200 mt-2 flex-grow"></div>
                  )}
                </div>
                <div className="bg-gray-50 rounded-xl p-6 mb-8 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Link 
            to="/" 
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
          >
            Back to Home
          </Link>
        </div>
      </section>
    </div>
  </div>
);
}