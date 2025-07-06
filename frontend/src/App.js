import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, CheckCircleIcon, StarIcon, PhoneIcon, MailIcon, MapPinIcon, MenuIcon, XIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import { 
  HeroSection, 
  NavigationBar, 
  ServicesSection, 
  FundingSection, 
  ConsultingSection, 
  ProcessSection, 
  TestimonialsSection, 
  ContactSection, 
  FooterSection,
  ApplicationModal 
} from './components';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrolled={scrolled}
        scrollToSection={scrollToSection}
        setIsApplicationModalOpen={setIsApplicationModalOpen}
      />
      
      <main>
        <HeroSection setIsApplicationModalOpen={setIsApplicationModalOpen} />
        <ServicesSection />
        <FundingSection setIsApplicationModalOpen={setIsApplicationModalOpen} />
        <ConsultingSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      <FooterSection />
      
      <ApplicationModal 
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
      />
    </div>
  );
}

export default App;