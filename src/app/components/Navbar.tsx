'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Define navigation structure with parent-child relationships
const navItems = [
  { href: '/', label: 'Home', children: [] },
  { href: '/about-us', label: 'About Us', children: [
    { href: '/about-us', label: 'Who we are' },
    { href: '/our-team', label: 'Meet the Team' },
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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoverDropdown, setHoverDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Function to handle mouse enter on menu items
  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setHoverDropdown(label);
  };

  // Function to handle mouse leave on menu items
  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setHoverDropdown(null);
    }, 150); // Small delay to make navigation less jumpy
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  // Check if a navigation item should be highlighted as active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Check if a parent has an active child
  const hasActiveChild = (children: any[]) => {
    return children.some(child => pathname === child.href || pathname.startsWith(child.href));
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
              <div 
                key={item.label} 
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.children.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
                        isActive(item.href) || hasActiveChild(item.children)
                          ? 'text-[#A86212] border-[#A86212]'
                          : 'text-gray-700 hover:text-[#A86212] border-transparent hover:border-[#A86212]/30'
                      }`}
                      aria-expanded={hoverDropdown === item.label}
                    >
                      {item.label}
                      <svg 
                        className={`w-4 h-4 ml-1 transition-transform duration-300 ${hoverDropdown === item.label ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {/* Dropdown Menu */}
                    <div 
                      className={`absolute left-0 mt-1 w-64 transform transition-all duration-300 ${
                        hoverDropdown === item.label 
                          ? 'opacity-100 translate-y-0 visible' 
                          : 'opacity-0 -translate-y-2 invisible'
                      }`}
                    >
                      <div className="py-2 bg-white rounded-md shadow-lg border border-gray-100">
                        {item.children.map((child) => (
                          <Link 
                            key={child.href} 
                            href={child.href}
                            className={`block px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                              isActive(child.href) 
                                ? 'text-[#A86212] font-medium bg-[#A86212]/5' 
                                : 'text-gray-700 hover:text-[#A86212]'
                            }`}
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
                    className={`block px-3 py-2 text-sm font-medium transition-colors duration-200 border-b-2 ${
                      isActive(item.href) 
                        ? 'text-[#A86212] border-[#A86212]' 
                        : 'text-gray-700 hover:text-[#A86212] border-transparent hover:border-[#A86212]/30'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link 
              href="/contact" 
              className="ml-3 px-5 py-2.5 bg-[#A86212] text-white hover:bg-[#8A5210] rounded-md text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
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
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-2 bg-white border-t border-gray-100">
          <div className="flex flex-col space-y-1 py-2">
            {navItems.map((item) => (
              <div key={item.label} className="py-1">
                {item.children.length > 0 ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`flex items-center justify-between w-full px-4 py-2.5 rounded-md font-medium ${
                        isActive(item.href) || hasActiveChild(item.children) 
                          ? 'text-[#A86212] bg-[#A86212]/5'
                          : 'text-gray-700 hover:text-[#A86212] hover:bg-gray-50'
                      }`}
                      aria-expanded={activeDropdown === item.label}
                    >
                      {item.label}
                      <svg 
                        className={`w-4 h-4 ml-1 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        activeDropdown === item.label 
                          ? 'max-h-96 opacity-100' 
                          : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-4 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link 
                            key={child.href} 
                            href={child.href}
                            className={`block px-4 py-2.5 text-sm rounded-md ${
                              isActive(child.href) 
                                ? 'text-[#A86212] font-medium bg-[#A86212]/5'
                                : 'text-gray-700 hover:text-[#A86212] hover:bg-gray-50'
                            }`}
                            onClick={() => setIsOpen(false)}
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
                    className={`block px-4 py-2.5 rounded-md font-medium ${
                      isActive(item.href) 
                        ? 'text-[#A86212] bg-[#A86212]/5'
                        : 'text-gray-700 hover:text-[#A86212] hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-100">
              <Link 
                href="/contact" 
                className="block py-3 px-4 bg-[#A86212] text-white rounded-md text-center font-medium hover:bg-[#8A5210] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;