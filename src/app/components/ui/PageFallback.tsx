import React from 'react';
import PageLayout from './PageLayout';
import Link from 'next/link';

interface PageFallbackProps {
  title: string;
  routeSlug: string;
  breadcrumb?: React.ReactNode;
}

const PageFallback = ({ title, routeSlug, breadcrumb }: PageFallbackProps) => {
  return (
    <PageLayout
      title={title}
      backgroundImage="/images/default-bg.jpeg"
      breadcrumb={breadcrumb}
    >
      <div className="py-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="mb-8">
            <svg className="w-16 h-16 text-[#A86212] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-medium text-gray-800 mb-4">Page Content Not Found</h2>
          
          <div className="mb-8 text-gray-600">
            <p className="mb-4">
              We couldn't find the content for this page in our content management system. 
              This could be because:
            </p>
            
            <ul className="list-disc list-inside mb-4 text-left max-w-md mx-auto">
              <li className="mb-2">The page hasn't been created in WordPress yet</li>
              <li className="mb-2">The page exists but with a different URL structure</li>
              <li className="mb-2">There might be an issue with the connection to our content system</li>
            </ul>
            
            <p>
              You can try refreshing the page or visit our homepage for more information.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-[#A86212] text-white hover:bg-[#8A5210] rounded-md text-sm font-medium transition-colors duration-200 shadow-sm"
            >
              Refresh Page
            </button>
            
            <Link 
              href="/"
              className="px-5 py-2.5 border border-[#A86212] text-[#A86212] hover:bg-gray-50 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PageFallback;