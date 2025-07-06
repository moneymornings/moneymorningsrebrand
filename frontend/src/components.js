import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDownIcon, 
  ChevronUpIcon, 
  CheckCircleIcon, 
  StarIcon, 
  PhoneIcon, 
  EnvelopeIcon as MailIcon, 
  MapPinIcon, 
  Bars3Icon as MenuIcon, 
  XMarkIcon as XIcon,
  ClockIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  LightBulbIcon,
  UserGroupIcon,
  DocumentTextIcon,
  TrophyIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/solid';

// Navigation Bar Component
export const NavigationBar = ({ isMenuOpen, setIsMenuOpen, scrolled, scrollToSection, setIsApplicationModalOpen }) => {
  const navItems = [
    { name: 'Home', href: 'hero' },
    { name: 'Services', href: 'services' },
    { name: 'Funding', href: 'funding' },
    { name: 'Consulting', href: 'consulting' },
    { name: 'Process', href: 'process' },
    { name: 'Contact', href: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-900">Money Mornings</h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => setIsApplicationModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => setIsApplicationModalOpen(true)}
                className="block w-full text-left bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 mt-2"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Hero Section Component
export const HeroSection = ({ setIsApplicationModalOpen }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(30, 58, 138, 0.8)), url('https://images.unsplash.com/photo-1599090738077-75d2187fd892?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMHN1Y2Nlc3N8ZW58MHx8fGJsdWV8MTc1MTgxNjAwNHww&ixlib=rb-4.1.0&q=85')`
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Get Business Funding
            <span className="text-green-400"> in Minutes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Fast-track your business to 6 figures in funding. From $50K to $300K in just 10-15 business days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsApplicationModalOpen(true)}
              className="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors transform hover:scale-105"
            >
              Get Pre-Qualified
            </button>
            <button
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Learn More
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-white">
            <ClockIcon className="h-8 w-8 text-green-400 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Fast Approval</h3>
            <p className="text-sm">Get approved in 10-15 business days</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-white">
            <CurrencyDollarIcon className="h-8 w-8 text-green-400 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">$50K - $300K</h3>
            <p className="text-sm">Funding range for your business needs</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-white">
            <ShieldCheckIcon className="h-8 w-8 text-green-400 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Trusted Process</h3>
            <p className="text-sm">Proven track record of success</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Services Section Component
export const ServicesSection = () => {
  const services = [
    {
      title: "Business Funding",
      description: "Fast-track your business to 6 figures in funding with our proven process",
      icon: <CurrencyDollarIcon className="h-12 w-12 text-blue-600" />,
      features: ["$50K - $300K funding range", "10-15 business day approval", "Multiple funding options", "No collateral required"]
    },
    {
      title: "Business Consulting",
      description: "Comprehensive brand development and creative consulting services",
      icon: <LightBulbIcon className="h-12 w-12 text-green-600" />,
      features: ["Brand development", "Creative consulting", "Content production", "Monetization strategies"]
    },
    {
      title: "Financial Planning",
      description: "Strategic financial planning to optimize your business growth",
      icon: <ChartBarIcon className="h-12 w-12 text-purple-600" />,
      features: ["Cash flow analysis", "Growth planning", "Risk assessment", "Financial optimization"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive financial and consulting services designed to accelerate your business growth
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">{service.title}</h3>
              <p className="text-gray-600 mb-6 text-center">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Funding Section Component
export const FundingSection = ({ setIsApplicationModalOpen }) => {
  const fundingPackages = [
    {
      title: "Starter Package",
      range: "$50K - $100K",
      features: [
        "Basic funding application",
        "Document preparation",
        "Initial consultation",
        "Funding source identification",
        "Application submission"
      ],
      highlight: false
    },
    {
      title: "Professional Package",
      range: "$100K - $200K",
      features: [
        "Advanced funding strategies",
        "Multiple funding sources",
        "Personal credit optimization",
        "Business credit building",
        "Ongoing support"
      ],
      highlight: true
    },
    {
      title: "Enterprise Package",
      range: "$200K - $300K",
      features: [
        "Comprehensive funding program",
        "Business plan development",
        "Financial projections",
        "Investor pitch preparation",
        "Premium support"
      ],
      highlight: false
    }
  ];

  return (
    <section id="funding" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Funding Packages</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the funding package that best fits your business needs
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fundingPackages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`rounded-xl p-8 ${
                pkg.highlight 
                  ? 'bg-blue-600 text-white transform scale-105 shadow-xl' 
                  : 'bg-white text-gray-900 shadow-lg'
              } hover:shadow-xl transition-all`}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>
                <p className={`text-3xl font-bold ${pkg.highlight ? 'text-green-300' : 'text-blue-600'}`}>
                  {pkg.range}
                </p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircleIcon className={`h-5 w-5 mr-3 mt-0.5 ${
                      pkg.highlight ? 'text-green-300' : 'text-green-500'
                    }`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => setIsApplicationModalOpen(true)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  pkg.highlight
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Consulting Section Component
export const ConsultingSection = () => {
  const consultingServices = [
    {
      title: "Brand Development",
      description: "Complete brand identity creation and development",
      icon: <TrophyIcon className="h-8 w-8 text-purple-600" />,
      features: [
        "Brand strategy development",
        "Logo and visual identity",
        "Brand guidelines creation",
        "Market positioning"
      ]
    },
    {
      title: "Creative Consulting",
      description: "Strategic creative direction for your business",
      icon: <LightBulbIcon className="h-8 w-8 text-orange-600" />,
      features: [
        "Creative strategy",
        "Campaign development",
        "Content planning",
        "Digital asset creation"
      ]
    },
    {
      title: "Content Production",
      description: "High-quality content creation and production",
      icon: <DocumentTextIcon className="h-8 w-8 text-green-600" />,
      features: [
        "Video production",
        "Content creation",
        "Social media content",
        "Marketing materials"
      ]
    },
    {
      title: "Business Strategy",
      description: "Comprehensive business development planning",
      icon: <ChartBarIcon className="h-8 w-8 text-blue-600" />,
      features: [
        "Business planning",
        "Growth strategies",
        "Market analysis",
        "Competitive positioning"
      ]
    }
  ];

  return (
    <section id="consulting" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Business Consulting</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive consulting services to establish, expand, and monetize your business
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {consultingServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3 text-center">{service.title}</h3>
              <p className="text-gray-600 text-sm mb-4 text-center">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Process Section Component
export const ProcessSection = () => {
  const steps = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "We discuss your business needs, funding requirements, and growth goals."
    },
    {
      step: "02",
      title: "Document Preparation",
      description: "We help prepare all necessary documents and optimize your application."
    },
    {
      step: "03",
      title: "Funding Application",
      description: "We submit your application to our network of funding sources."
    },
    {
      step: "04",
      title: "Approval & Funding",
      description: "Receive approval and access your funding within 10-15 business days."
    }
  ];

  return (
    <section id="process" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, straightforward process to get your business funded quickly
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section Component
export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Chrystal Anderson",
      company: "Tech Startup",
      content: "I worked with MME to secure business funding. They were professional and helped me get the funding I needed quickly.",
      rating: 5
    },
    {
      name: "Autumn Heyward",
      company: "Creative Agency",
      content: "Great people to work with. 1000000/10 great service. They delivered exactly what they promised.",
      rating: 5
    },
    {
      name: "Meshia Hamilton",
      company: "Small Business",
      content: "Best customer service, great business acumen. Totally recommend their services to anyone looking for funding.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real testimonials from businesses we've helped secure funding
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
              <div className="border-t border-gray-700 pt-4">
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-sm text-gray-400">{testimonial.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to get started? Contact us today to discuss your funding needs
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <PhoneIcon className="h-6 w-6 text-blue-600 mr-3" />
                <span className="text-gray-700">(555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MailIcon className="h-6 w-6 text-blue-600 mr-3" />
                <span className="text-gray-700">info@moneymornings.com</span>
              </div>
              <div className="flex items-center">
                <MapPinIcon className="h-6 w-6 text-blue-600 mr-3" />
                <span className="text-gray-700">123 Financial District, Business City, BC 12345</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 rounded-xl p-6"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your message here..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Section Component
export const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Money Mornings</h3>
            <p className="text-gray-400">
              Fast-track your business to success with our comprehensive funding and consulting services.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Business Funding</li>
              <li>Brand Development</li>
              <li>Creative Consulting</li>
              <li>Content Production</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>About Us</li>
              <li>Our Process</li>
              <li>Testimonials</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Disclaimer</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Money Mornings. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Application Modal Component
export const ApplicationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    businessType: '',
    fundingAmount: '',
    timeInBusiness: '',
    monthlyRevenue: '',
    creditScore: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
    setStep(1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Apply for Funding</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>
              
              {step === 1 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Next Step
                  </button>
                </div>
              )}
              
              {step === 2 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Business Information</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="businessName"
                      placeholder="Business Name"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Business Type</option>
                      <option value="llc">LLC</option>
                      <option value="corporation">Corporation</option>
                      <option value="partnership">Partnership</option>
                      <option value="sole-proprietorship">Sole Proprietorship</option>
                    </select>
                    <select
                      name="fundingAmount"
                      value={formData.fundingAmount}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Funding Amount Needed</option>
                      <option value="50k-100k">$50K - $100K</option>
                      <option value="100k-200k">$100K - $200K</option>
                      <option value="200k-300k">$200K - $300K</option>
                    </select>
                    <select
                      name="timeInBusiness"
                      value={formData.timeInBusiness}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Time in Business</option>
                      <option value="startup">Startup (Less than 1 year)</option>
                      <option value="1-2years">1-2 Years</option>
                      <option value="2-5years">2-5 Years</option>
                      <option value="5+years">5+ Years</option>
                    </select>
                  </div>
                  <div className="flex space-x-4 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};