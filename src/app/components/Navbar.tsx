'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
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
      className={`fixed top-0 left-0 right-0 z-50 bg-white ${
        scrolled ? 'shadow-md' : ''
      } transition-shadow duration-300`}
      ref={menuRef}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <Image 
                src="/crdd.png" 
                alt="CRDD Logo" 
                width={180} 
                height={60} 
                className="h-12 w-auto object-contain"
                priority={true}
                quality={100}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-8">
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
                className="px-3 py-2 text-gray-700 hover:text-[#A86212] text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contact-us" 
              className="ml-2 px-5 py-2.5 bg-[#A86212] text-white hover:bg-[#8A5210] rounded-md text-sm font-medium transition-colors duration-200 shadow-sm"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md focus:outline-none text-gray-700 hover:bg-gray-100"
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
        <div className="container mx-auto px-4 py-3 bg-white border-t border-gray-100">
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
                className="py-2 px-3 text-gray-700 hover:text-[#A86212] hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/contact-us" 
              className="py-2.5 px-3 mt-2 bg-[#A86212] text-white rounded-md text-center font-medium hover:bg-[#8A5210]"
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