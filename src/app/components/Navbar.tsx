'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle navbar transparency on scroll
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        sticky ? 'bg-white shadow-md py-2' : 'bg-[#14181F] py-4'
      }`}
      ref={menuRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* Logo or image */}
            <div className={`w-10 h-10 rounded-full mr-2 flex items-center justify-center ${
              sticky ? 'bg-[#A86212] text-white' : 'bg-white text-[#A86212]'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <span className={`text-xl font-bold ${sticky ? 'text-[#A86212]' : 'text-white'}`}>
              CRDD
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { href: '/', label: 'Home' },
              { href: '/about-us', label: 'About Us' },
              { href: '/projects', label: 'Projects' },
              { href: '/our-team', label: 'Our Team' },
              { href: '/blog', label: 'Blog' }
            ].map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`font-medium ${
                  sticky ? 'text-gray-700 hover:text-[#A86212]' : 'text-white hover:text-gray-200'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contact-us" 
              className={`px-4 py-2 rounded-md font-medium ${
                sticky 
                  ? 'bg-[#A86212] text-white hover:bg-[#8A5210]' 
                  : 'bg-white text-[#A86212] hover:bg-gray-100'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-md focus:outline-none ${
              sticky ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {!isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`md:hidden transition-all duration-300 overflow-hidden shadow-lg ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-3 bg-white">
          <div className="flex flex-col space-y-2">
            {[
              { href: '/', label: 'Home' },
              { href: '/about-us', label: 'About Us' },
              { href: '/projects', label: 'Projects' },
              { href: '/our-team', label: 'Our Team' },
              { href: '/blog', label: 'Blog' }
            ].map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contact-us" 
              className="py-2 px-3 mt-2 bg-[#A86212] text-white rounded-md text-center font-medium hover:bg-[#8A5210]"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;