'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Interactive Hero Section with parallax scrolling effect
const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transform transition-transform"
        style={{ 
          backgroundImage: 'url(/images/drylands-landscape.jpeg)', 
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          transform: `translateY(${scrollY * 0.2}px)` // Parallax effect
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 md:pt-20">
        <div className="max-w-3xl mx-auto text-center md:text-left md:mx-0">
          <div className="inline-block px-3 py-1 bg-[#A86212] text-white text-sm font-semibold rounded-full mb-6 animate-pulse">
            Empowering Dryland Communities
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Centre for Research in <span className="text-[#A86212]">Drylands Development</span>
          </h1>
          <p className="text-xl text-white opacity-90 mb-8 leading-relaxed">
            Empowering communities and developing sustainable solutions for Kenya's drylands through research and multi-stakeholder collaboration.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link 
              href="/about" 
              className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium bg-[#A86212] text-white rounded-md shadow-2xl transition-all duration-300 ease-out hover:scale-105"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#A86212] via-amber-500 to-[#A86212] opacity-0 group-hover:opacity-100 transition-opacity"></span>
              <span className="relative flex items-center">
                Discover More
                <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
            
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white hover:bg-white hover:text-gray-900 text-white font-medium rounded-md transition-colors duration-300"
            >
              Get In Touch
            </Link>
          </div>
          
          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-center">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-[#A86212] text-3xl font-bold mb-1">10+</div>
              <div className="text-white text-sm">Years Experience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-[#A86212] text-3xl font-bold mb-1">50+</div>
              <div className="text-white text-sm">Research Projects</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-[#A86212] text-3xl font-bold mb-1">30+</div>
              <div className="text-white text-sm">Community Partners</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-[#A86212] text-3xl font-bold mb-1">5+</div>
              <div className="text-white text-sm">Dryland Regions</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <a href="#main-content" className="text-white opacity-80 hover:opacity-100">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
      
      {/* Decorative Shape */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-br from-[#A86212]/20 to-transparent z-0"></div>
    </section>
  );
};

export default HeroSection;