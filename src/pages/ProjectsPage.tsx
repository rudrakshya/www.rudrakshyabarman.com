import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function ProjectsPage() {
  const ventures = [
    {
      name: "Adytuminfotech Softwares Pvt Ltd",
      role: "Founder & Director",
      period: "2018 - Present",
      description: "Private limited company scaling healthcare and educational technology solutions. Focused on building enterprise-grade software with measurable impact.",
      subsidiaries: [
        { 
          name: "UTOPIA", 
          type: "Healthcare Management System (SaaS Product)",
          description: "Comprehensive healthcare management system for OPD, IPD, and Laboratory services with real-time data analytics. Architected complete healthcare workflow systems from patient registration to billing and reporting."
        },
        { 
          name: "PROGATI", 
          type: "School ERP System (SaaS Product)",
          description: "End-to-end school management solution covering admissions, academics, examinations, and administrative functions. Built Flutter mobile applications with 15,000+ active users achieving 4.6★ rating. Integrated ML-powered analytics dashboard reducing administrative reporting time by 70%."
        },
        {
          name: "Feedvoty",
          type: "Communication Platform (Solo Venture)",
          description: "Scalable feedback analytics platform with real-time ML pipelines for sentiment analysis. Identified communication gaps between software companies and clients, developed as a solution to improve client communication and satisfaction."
        }
      ],
      status: "Active",
      metrics: [
        "100+ Educational Institutions Served",
        "15,000+ Active Mobile App Users",
        "4.6★ App Store Rating",
        "70% Reduction in Administrative Reporting Time"
      ]
    }
  ];

  const projects = [
    {
      name: "Virtual Classroom Software",
      year: "2020",
      description: "Online virtual classroom software developed during the COVID-19 pandemic to support remote education for institutions. Enabled seamless continuation of educational activities during lockdowns.",
      technologies: ["ReactJS", "Node.js", "WebRTC", "MongoDB"],
      impact: "Supported remote education for 100+ institutions during the pandemic"
    },
    {
      name: "Progati Mobile Applications",
      year: "2018 & 2022",
      description: "First Android app for Progati ERP enabling parent-teacher communication (2018). Later redesigned and rebuilt using Flutter for both Android & iOS platforms (2022) to reach a wider audience.",
      technologies: ["Android", "Java", "Flutter", "Dart", "Firebase"],
      impact: "15,000+ active users with 4.6★ rating"
    },
    {
      name: "ML-Powered Analytics Dashboard",
      year: "2020",
      description: "Integrated ML-powered analytics dashboard in Progati ERP reducing administrative reporting time by 70%. Provided actionable insights for educational institutions.",
      technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "FastAPI"],
      impact: "70% reduction in administrative reporting time for 100+ institutions"
    },
    {
      name: "Student Performance Prediction System",
      year: "2022",
      description: "Deep learning models for student performance prediction supporting academic counseling and early intervention strategies. Helped institutions identify at-risk students proactively.",
      technologies: ["Python", "TensorFlow", "Keras", "Pandas", "NumPy"],
      impact: "Enhanced academic counseling capabilities for educational institutions"
    },
    {
      name: "Student Placement Tracking System",
      year: "2021",
      description: "System connecting educational institutions with industry opportunities. Bridged the gap between academia and industry by tracking student placements and employment outcomes.",
      technologies: ["ReactJS", "FastAPI", "PostgreSQL", "AWS"],
      impact: "Connected educational institutions with industry opportunities"
    }
  ];

  const technicalSkills = [
    {
      category: "Languages & Frameworks",
      skills: ["Python", "FastAPI", "JavaScript", "ReactJS", "Flutter", "Dart", "PHP"]
    },
    {
      category: "Databases",
      skills: ["MySQL", "PostgreSQL", "MongoDB"]
    },
    {
      category: "AI & Machine Learning",
      skills: ["Machine Learning", "Deep Learning", "NLP", "Scikit-learn", "TensorFlow", "Keras"]
    },
    {
      category: "Cloud & Architecture",
      skills: ["AWS Cloud Architecture", "Microservices", "CI/CD", "Docker", "Kubernetes"]
    }
  ];

  return (
    <div>
      <SEO 
        title="Projects & Ventures - Healthcare & Educational Technology Solutions"
        description="Explore Rudrakshya Barman's innovative technology ventures including UTOPIA healthcare management system, PROGATI school ERP, and Feedvoty communication platform."
        keywords="technology ventures, healthcare software, educational technology, SaaS products, software development, machine learning, mobile applications, enterprise solutions"
      />
      <div className="min-h-screen">
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">My Ventures & Projects</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Innovative solutions and technology ventures I've founded, contributed to, and continue to develop. 
              Showcasing measurable impact across healthcare and education sectors.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Technology Ventures</h2>
            
            <div className="space-y-12">
              {ventures.map((venture, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <h2 className="text-2xl font-bold text-gray-900 mr-4">{venture.name}</h2>
                        <span className="text-sm text-gray-500">{venture.period}</span>
                      </div>
                      <p className="text-blue-600 font-medium">{venture.role}</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mt-4 md:mt-0">
                      {venture.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{venture.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {venture.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="bg-blue-50 rounded-lg p-3 text-center">
                        <p className="text-sm text-blue-800 font-medium">{metric.split(' ')[0]}</p>
                        <p className="text-xs text-blue-600">{metric.split(' ').slice(1).join(' ')}</p>
                      </div>
                    ))}
                  </div>
                  
                  {venture.subsidiaries && venture.subsidiaries.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Key Products:</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {venture.subsidiaries.map((subsidiary, subIndex) => (
                          <div 
                            key={subIndex} 
                            className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-bold text-gray-900">{subsidiary.name}</h4>
                                <p className="text-gray-600 text-sm mb-2">{subsidiary.type}</p>
                                <p className="text-gray-700 text-sm">{subsidiary.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Notable Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                    <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded inline-block">
                    {project.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Technical Expertise</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {technicalSkills.map((skillCategory, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{skillCategory.category}</h3>
                  <ul className="space-y-2">
                    {skillCategory.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-center">
                        <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 text-sm">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/" 
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  </div>
);
}