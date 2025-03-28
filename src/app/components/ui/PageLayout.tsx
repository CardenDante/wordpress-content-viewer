'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  backgroundImage?: string;
  breadcrumb?: React.ReactNode;
}

const PageLayout = ({ title, children, backgroundImage = '/images/default-bg.jpeg', breadcrumb }: PageLayoutProps) => {
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Simulate page load
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    // Add a slight delay after loading is complete before showing content
    // This creates a smoother animation effect
    const visibilityTimer = setTimeout(() => {
      setContentVisible(true);
    }, 850);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(visibilityTimer);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-[#A86212] border-t-transparent animate-spin"></div>
          </div>
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">Loading page content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-500 ${contentVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Page Header */}
      <div 
        className="relative bg-cover bg-center py-20 md:py-32"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})` 
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-shadow-lg">{title}</h1>
            {breadcrumb && (
              <div className="text-white text-sm md:text-base">{breadcrumb}</div>
            )}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6 md:p-8 lg:p-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
