'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define navigation structure with parent-child relationships
const navItems = [
  { href: '/', label: 'Home', children: [] },
  { href: '/about-us', label: 'About Us', children: [
    { href: '/about-us', label: 'Who we are', children: [] },
    { href: '/our-team', label: 'Meet the Team', children: [] },
  ] },
  { 
    href: '/our-approach', 
    label: 'Our Approach', 
    children: [
      { href: '/our-approach/enabling-policy', label: 'Enabling Policy' },
      { href: '/our-approach/knowledge-and-information-management', label: 'Knowledge and Information Management' },
      { href: '/our-approach/sustainable-livelihoods', label: 'Sustainable Livelihoods' },
      { href: '/our-approach/knowledge-management', label: 'Knowledge Management' },
      { href: '/our-approach/capacity-development', label: 'Capacity Development' },
      { href: '/our-approach/enabling-policy-upt', label: 'Enabling Policy UPT' }
    ]
  },
  { href: '/contact', label: 'Contact', children: [] }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

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
          <div className="hidden md:flex items-center space-x-1 lg:space-x-6">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.children.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center px-3 py-2 text-gray-700 hover:text-[#A86212] text-sm font-medium transition-colors duration-200 group-hover:text-[#A86212]"
                    >
                      {item.label}
                      <svg 
                        className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition-transform" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                      <div className="py-2 bg-white rounded-md shadow-xl border border-gray-100">
                        {item.children.map((child) => (
                          <Link 
                            key={child.href} 
                            href={child.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#A86212]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link 
                    href={item.href}
                    className="px-3 py-2 text-gray-700 hover:text-[#A86212] text-sm font-medium transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link 
              href="/contact" 
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
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-3 bg-white border-t border-gray-100">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <div key={item.label} className="py-2">
                {item.children.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center justify-between w-full px-3 py-2 text-gray-700 hover:text-[#A86212] hover:bg-gray-50 rounded-md font-medium"
                    >
                      {item.label}
                      <svg 
                        className={`w-4 h-4 ml-1 transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div 
                      className={`pl-4 mt-2 space-y-2 ${activeDropdown === item.label ? 'block' : 'hidden'}`}
                    >
                      {item.children.map((child) => (
                        <Link 
                          key={child.href} 
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#A86212] rounded-md"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link 
                    href={item.href}
                    className="block px-3 py-2 text-gray-700 hover:text-[#A86212] hover:bg-gray-50 rounded-md font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link 
              href="/contact" 
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