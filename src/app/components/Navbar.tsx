'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

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
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${sticky ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#A86212] mr-2">CRDD</span>
            {sticky && <span className="hidden md:inline text-sm text-gray-600">Centre for Research in Drylands Development</span>}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#A86212] font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-[#A86212] font-medium transition-colors">
              About Us
            </Link>
            <Link href="/approach" className="text-gray-700 hover:text-[#A86212] font-medium transition-colors">
              Our Approach
            </Link>
            <Link href="/team" className="text-gray-700 hover:text-[#A86212] font-medium transition-colors">
              Our Team
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-[#A86212] font-medium transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="bg-[#A86212] text-white px-4 py-2 rounded hover:bg-[#8A5210] transition-colors">
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
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

      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen bg-white' : 'max-h-0'}`}>
        <div className="container mx-auto px-4 py-4 space-y-3">
          <Link href="/" className="block py-2 text-gray-700 hover:text-[#A86212]" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link href="/about" className="block py-2 text-gray-700 hover:text-[#A86212]" onClick={() => setIsOpen(false)}>
            About Us
          </Link>
          <Link href="/approach" className="block py-2 text-gray-700 hover:text-[#A86212]" onClick={() => setIsOpen(false)}>
            Our Approach
          </Link>
          <Link href="/team" className="block py-2 text-gray-700 hover:text-[#A86212]" onClick={() => setIsOpen(false)}>
            Our Team
          </Link>
          <Link href="/blog" className="block py-2 text-gray-700 hover:text-[#A86212]" onClick={() => setIsOpen(false)}>
            Blog
          </Link>
          <Link href="/contact" className="block w-full bg-[#A86212] text-white px-4 py-2 rounded text-center hover:bg-[#8A5210]" onClick={() => setIsOpen(false)}>
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;