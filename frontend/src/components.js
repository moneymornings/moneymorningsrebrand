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
  ShieldCheckIcon,
  ArrowRightIcon,
  PlayIcon,
  RocketLaunchIcon,
  BanknotesIcon,
  PresentationChartLineIcon,
  BuildingOfficeIcon,
  UserIcon,
  CreditCardIcon,
  BuildingOffice2Icon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  ShareIcon
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
      scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <img 
                src="/money-mornings-logo.png" 
                alt="Money Mornings Empire" 
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold text-gray-900">Money Mornings Empire</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => setIsApplicationModalOpen(true)}
                className="bg-green-500 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Apply Now
              </button>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
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
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => setIsApplicationModalOpen(true)}
                className="block w-full text-left bg-green-500 text-white px-3 py-3 rounded-full text-base font-semibold hover:bg-green-600 mt-2"
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <RocketLaunchIcon className="h-4 w-4 mr-2" />
              Fast-Track Your Business Growth
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Get Business Funding
              <span className="text-green-500 block">in Minutes</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Transform your business with our proven funding strategies. Secure up to 300k in as little as 15 days, and take advantage of our comprehensive consulting services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => setIsApplicationModalOpen(true)}
                className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                Get Pre-Qualified
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </button>
              <button
                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white border-2 border-gray-200 text-gray-800 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition-all flex items-center justify-center"
              >
                <PlayIcon className="h-5 w-5 mr-2" />
                Learn More
              </button>
            </div>
            
            <div className="flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                Soft Pull Credit Check
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                15 Day Approval
              </div>
            </div>
          </motion.div>
          
          {/* Right Content - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                  <BanknotesIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Up to $300K</h3>
                <p className="text-gray-600">Funding Available</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mt-8">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                  <ClockIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">15 Days</h3>
                <p className="text-gray-600">Fast Approval</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 -mt-4">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                  <PresentationChartLineIcon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">98%</h3>
                <p className="text-gray-600">Success Rate</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mt-4">
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-4">
                  <BuildingOfficeIcon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
                <p className="text-gray-600">Businesses Funded</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Services Section Component
export const ServicesSection = () => {
  const services = [
    {
      title: "Business Funding",
      description: "Fast-track your business to 6 figures with our proven funding strategies",
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      color: "blue",
      features: ["Up to $300K funding available", "15 day approval process", "Multiple funding sources", "Soft pull credit check"]
    },
    {
      title: "Business Consulting",
      description: "Comprehensive business establishment and development services",
      icon: <LightBulbIcon className="h-8 w-8" />,
      color: "green",
      features: ["Business EIN establishment", "Business Formation", "Business Address", "Website Development"]
    },
    {
      title: "Personal Funding",
      description: "Personal funding solutions to support your financial goals",
      icon: <UserIcon className="h-8 w-8" />,
      color: "purple",
      features: ["Up to $300K funding available", "15 day approval process", "Multiple funding sources", "Soft pull credit check"]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600"
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="text-green-500 block">Grow Your Business</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From funding to consulting, we provide comprehensive solutions designed to accelerate your business growth
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6 ${getColorClasses(service.color)}`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-700">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
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
      title: "Business Establishment",
      description: "Essential business setup package",
      features: [
        "EIN",
        "LLC"
      ],
      highlight: false,
      color: "blue",
      note: "Annual fees not included"
    },
    {
      title: "Business Builders Package",
      description: "Comprehensive business development package",
      features: [
        "EIN & LLC",
        "411 + Other Directories",
        "Dun & Bradstreet",
        "Experian Registration",
        "Business Address",
        "Business Email",
        "Business Phone Number",
        "Professional Website",
        "Social Media Establishment"
      ],
      highlight: true,
      color: "green",
      note: "Monthly and annual fees not included"
    },
    {
      title: "The Optimum Funding Package",
      description: "Premium funding and business setup",
      features: [
        "Done For You Credit Building",
        "EIN & LLC",
        "411 + Other Directories",
        "Dun & Bradstreet",
        "Experian Registration",
        "Professional Logo",
        "Business Address",
        "Business Email",
        "Business Phone Number",
        "Professional Website",
        "Social Media Establishment"
      ],
      highlight: false,
      color: "purple",
      note: "Monthly and annual fees not included. Graduates to basic funding program"
    }
  ];

  return (
    <section id="funding" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Business Essential Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your
            <span className="text-green-500 block">Business Package</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the business setup package that best fits your needs and growth goals
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {fundingPackages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`rounded-2xl p-8 ${
                pkg.highlight 
                  ? 'bg-green-500 text-white transform scale-105 shadow-2xl border-2 border-green-400' 
                  : 'bg-white text-gray-900 shadow-lg border border-gray-100'
              } hover:shadow-xl transition-all duration-300`}
            >
              {pkg.highlight && (
                <div className="text-center mb-4">
                  <span className="bg-white text-green-500 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">{pkg.title}</h3>
                <p className={`text-sm ${pkg.highlight ? 'text-green-100' : 'text-gray-600'} mb-4`}>
                  {pkg.description}
                </p>
                <p className={`text-xs ${pkg.highlight ? 'text-green-200' : 'text-gray-500'}`}>
                  {pkg.note}
                </p>
              </div>
              
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckCircleIcon className={`h-5 w-5 mr-3 mt-0.5 ${
                      pkg.highlight ? 'text-green-200' : 'text-green-500'
                    }`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => setIsApplicationModalOpen(true)}
                className={`w-full py-4 px-6 rounded-full font-semibold transition-all ${
                  pkg.highlight
                    ? 'bg-white text-green-500 hover:bg-gray-100'
                    : 'bg-green-500 text-white hover:bg-green-600'
                } shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Packages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Diamond Package */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">The Diamond Funding Package</h3>
              <p className="text-sm text-gray-600 mb-2">Premium business credit solution</p>
              <p className="text-xs text-gray-500">Monthly and annual fees not included. Graduates to basic funding program</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Done For You Business Credit Building</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Done For You Credit Building</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">EIN & LLC</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">411 + Other Directories</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Professional Logo</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Business Address</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Business Email</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Business Phone Number</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Professional Website</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Social Media Establishment</span>
                </li>
              </ul>
            </div>
            
            <button
              onClick={() => setIsApplicationModalOpen(true)}
              className="w-full bg-blue-500 text-white py-4 px-6 rounded-full font-semibold hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </motion.div>

          {/* Ultimate Package */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">The Ultimate Funding Package</h3>
              <p className="text-sm text-gray-600 mb-2">Complete business solution</p>
              <p className="text-xs text-gray-500">Monthly and annual fees not included. Graduates to basic funding program</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Done For You Business Credit Building</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Done For You Credit Building</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">EIN & LLC</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">411 + Other Directories</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Professional Logo</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Business Vehicle</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Business Address</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Business Email</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Business Phone Number</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Professional Website</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span className="text-sm">Social Media Establishment</span>
                </li>
              </ul>
            </div>
            
            <button
              onClick={() => setIsApplicationModalOpen(true)}
              className="w-full bg-purple-500 text-white py-4 px-6 rounded-full font-semibold hover:bg-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Consulting Section Component
export const ConsultingSection = () => {
  const consultingServices = [
    {
      title: "Business EIN Establishment",
      description: "Get your federal tax identification number",
      icon: <DocumentTextIcon className="h-6 w-6" />,
      color: "blue"
    },
    {
      title: "Business Formation",
      description: "LLC, Corporation, and other entity setup",
      icon: <BuildingOffice2Icon className="h-6 w-6" />,
      color: "green"
    },
    {
      title: "Business Address",
      description: "Professional mailing and business address",
      icon: <MapPinIcon className="h-6 w-6" />,
      color: "purple"
    },
    {
      title: "Business Email",
      description: "Professional email setup and configuration",
      icon: <MailIcon className="h-6 w-6" />,
      color: "orange"
    },
    {
      title: "Business Phone",
      description: "Dedicated business phone line setup",
      icon: <DevicePhoneMobileIcon className="h-6 w-6" />,
      color: "blue"
    },
    {
      title: "Online Directory Placement",
      description: "411, Dun & Bradstreet, Experian registration",
      icon: <GlobeAltIcon className="h-6 w-6" />,
      color: "green"
    },
    {
      title: "Website Development",
      description: "Professional website design and development",
      icon: <ComputerDesktopIcon className="h-6 w-6" />,
      color: "purple"
    },
    {
      title: "Social Media Establishment",
      description: "Social media profiles and business presence",
      icon: <ShareIcon className="h-6 w-6" />,
      color: "orange"
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600"
    };
    return colors[color] || colors.blue;
  };

  return (
    <section id="consulting" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Business Consulting
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Complete Business
            <span className="text-blue-500 block">Setup Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to establish and legitimize your business presence
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {consultingServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 ${getColorClasses(service.color)}`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Services Section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Business Credit Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Business Credit Services</h3>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-xl font-semibold mb-2">Done For You Business Credit Building</h4>
                <p className="text-sm text-gray-600 mb-4">Monthly and annual fees not included</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                    Various Net 30 vendor accounts
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                    Business Credit Builder Accounts
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                    Primary Business Accounts
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Funding Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Funding Services</h3>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-xl font-semibold mb-2">Basic Funding Program</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      Personal Funding
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      Business Funding
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      Credit Cards
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      $50K - $250K +
                    </li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-center text-sm">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      Loans
                    </li>
                    <li className="flex items-center text-sm">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      Lines of Credit
                    </li>
                    <li className="flex items-center text-sm text-gray-600">
                      <CheckCircleIcon className="h-4 w-4 text-orange-500 mr-2" />
                      Certain Credit Requirements Apply
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
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
      description: "We discuss your business needs, funding requirements, and growth goals in detail."
    },
    {
      step: "02",
      title: "Document Preparation",
      description: "Our team helps prepare all necessary documents and optimizes your application."
    },
    {
      step: "03",
      title: "Business Setup",
      description: "We handle the complete business establishment process including EIN, LLC, and more."
    },
    {
      step: "04",
      title: "Funding & Support",
      description: "Receive funding approval and ongoing support for your business growth."
    }
  ];

  return (
    <section id="process" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Our Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Simple, Straightforward
            <span className="text-purple-500 block">Process</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get your business established and funded with our proven 4-step process
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
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold mb-6 mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
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
      content: "I worked with MME to secure business funding. They were professional and helped me get the funding I needed quickly. The process was smooth and efficient.",
      rating: 5,
      avatar: "CA"
    },
    {
      name: "Autumn Heyward",
      company: "Creative Agency",
      content: "Great people to work with. 1000000/10 great service. They delivered exactly what they promised and exceeded my expectations.",
      rating: 5,
      avatar: "AH"
    },
    {
      name: "Meshia Hamilton",
      company: "Small Business",
      content: "Best customer service, great business acumen. Totally recommend their services to anyone looking for funding. They made the process seamless.",
      rating: 5,
      avatar: "MH"
    }
  ];

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gray-800 text-gray-200 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our Clients
            <span className="text-green-400 block">Say About Us</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real testimonials from businesses we've helped establish and fund
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-green-400 to-blue-400 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-sm mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section Component (Simplified - no contact form)
export const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            Get in Touch
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Get
            <span className="text-green-500 block">Started?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contact us today to discuss your business establishment and funding needs
          </p>
        </motion.div>
        
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="bg-green-100 rounded-full p-4 mr-6">
                  <PhoneIcon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-2xl font-semibold text-gray-900">404.533.5698</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-blue-100 rounded-full p-4 mr-6">
                  <MailIcon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-xl font-semibold text-gray-900">info@moneymornings.cash</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-purple-100 rounded-full p-4 mr-6">
                  <MapPinIcon className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-xl font-semibold text-gray-900">
                    2727 Paces Ferry Rd<br />
                    Atlanta, GA 30339
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Section Component
export const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_funding-expert/artifacts/m82iu1j9_MONEYMORNINGSCOLOR%20copy.png" 
                alt="Money Mornings" 
                className="h-12 w-auto"
              />
              <span className="text-lg font-bold">Money Mornings Empire</span>
            </div>
            <p className="text-gray-400 max-w-sm">
              Transform your business with our comprehensive funding and business establishment services.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">Business Funding</li>
              <li className="hover:text-white transition-colors cursor-pointer">Business Formation</li>
              <li className="hover:text-white transition-colors cursor-pointer">Business Credit</li>
              <li className="hover:text-white transition-colors cursor-pointer">Personal Funding</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-white transition-colors cursor-pointer">Our Process</li>
              <li className="hover:text-white transition-colors cursor-pointer">Testimonials</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-white transition-colors cursor-pointer">Disclaimer</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Money Mornings Empire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Application Modal Component
export const ApplicationModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Prepare data for backend
      const submissionData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        business_name: formData.businessName || null,
        service_interest: formData.businessType,
        funding_amount: formData.fundingAmount || null,
        time_in_business: formData.timeInBusiness || null
      };

      // Get backend URL from environment
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
      
      // Submit to backend
      const response = await fetch(`${backendUrl}/api/applications/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Application submitted successfully:', result);
        setSubmitSuccess(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          onClose();
          setStep(1);
          setSubmitSuccess(false);
          setFormData({
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
        }, 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitError(error.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Apply for Services</h2>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 p-2"
                >
                  <XIcon className="h-6 w-6" />
                </button>
              </div>
              
              {submitSuccess && (
                <div className="text-center">
                  <div className="mb-6">
                    <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
                    <p className="text-gray-600">
                      Thank you for your interest in Money Mornings Empire. We'll review your application and get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              {!submitSuccess && (
                <>
                  {step === 1 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-6 text-gray-900">Personal Information</h3>
                      {submitError && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-red-700 text-sm">{submitError}</p>
                        </div>
                      )}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                            <input
                              type="text"
                              name="firstName"
                              placeholder="John"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                            <input
                              type="text"
                              name="lastName"
                              placeholder="Doe"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="(555) 123-4567"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => setStep(2)}
                        disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                        className="w-full mt-8 bg-green-500 text-white py-4 px-6 rounded-full font-semibold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        Next Step
                      </button>
                    </div>
                  )}
                  
                  {step === 2 && (
                    <div>
                      <h3 className="text-xl font-semibold mb-6 text-gray-900">Service Information</h3>
                      {submitError && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-red-700 text-sm">{submitError}</p>
                        </div>
                      )}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Business Name (if applicable)</label>
                          <input
                            type="text"
                            name="businessName"
                            placeholder="Your Business Name"
                            value={formData.businessName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Service Interest</label>
                          <select
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="">Select Service</option>
                            <option value="business-establishment">Business Establishment</option>
                            <option value="business-builders">Business Builders Package</option>
                            <option value="optimum-funding">Optimum Funding Package</option>
                            <option value="diamond-funding">Diamond Funding Package</option>
                            <option value="ultimate-funding">Ultimate Funding Package</option>
                            <option value="business-credit">Business Credit Services</option>
                                <option value="custom">Custom Package</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Funding Amount Needed (if applicable)</label>
                          <select
                            name="fundingAmount"
                            value={formData.fundingAmount}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="">Select Amount</option>
                            <option value="50k-100k">$50K - $100K</option>
                            <option value="100k-200k">$100K - $200K</option>
                            <option value="200k-300k">$200K - $300K</option>
                            <option value="300k+">$300K+</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Time in Business (if applicable)</label>
                          <select
                            name="timeInBusiness"
                            value={formData.timeInBusiness}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          >
                            <option value="">Select Time</option>
                            <option value="startup">Startup (Less than 1 year)</option>
                            <option value="1-2years">1-2 Years</option>
                            <option value="2-5years">2-5 Years</option>
                            <option value="5+years">5+ Years</option>
                            <option value="new-business">New Business Formation</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex space-x-4 mt-8">
                        <button
                          onClick={() => setStep(1)}
                          disabled={isSubmitting}
                          className="flex-1 bg-gray-200 text-gray-700 py-4 px-6 rounded-full font-semibold hover:bg-gray-300 transition-all disabled:opacity-50"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting || !formData.businessType}
                          className="flex-1 bg-green-500 text-white py-4 px-6 rounded-full font-semibold hover:bg-green-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};// Trigger recompile
