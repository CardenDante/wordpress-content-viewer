import React from 'react';
import Image from 'next/image';

// Existing components
export const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export const ArticlesGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array(3).fill(0).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};

export const SidebarSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="h-10 bg-[#A86212] mb-4"></div>
        <div className="p-6">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="h-10 bg-[#A86212] mb-4"></div>
        <div className="p-3 grid grid-cols-2 gap-2">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ErrorDisplay = ({ message }: { message: string }) => {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
      <p>{message || "An error occurred. Please try again later."}</p>
    </div>
  );
};

// New components for page loading
export const PageSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="w-full h-64 bg-gray-300"></div>
      
      {/* Content skeleton */}
      <div className="max-w-6xl mx-auto p-6 mt-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="h-8 bg-gray-200 w-1/2 mb-6 rounded"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Full page loading animation
export default function FullPageLoading() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-bounce mb-4">
          <div className="w-16 h-16 rounded-full bg-[#A86212] flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-800">Loading...</h3>
        <p className="text-sm text-gray-500 mt-1">Please wait while we prepare the content</p>
        
        {/* Loading Progress bar */}
        <div className="mt-8 w-48 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-[#A86212] rounded-full animate-pulse" style={{ width: '75%' }}></div>
        </div>
      </div>
    </div>
  );
}

// Post detail skeleton
export const PostDetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-64 bg-gray-200 mb-6"></div>
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex space-x-2 mb-4">
          <div className="h-5 w-16 bg-[#A86212] rounded"></div>
          <div className="h-5 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>
    </div>
  );
};

// Navigation buttons skeleton
export const NavButtonsSkeleton = () => {
  return (
    <div className="flex justify-between mt-8 animate-pulse">
      <div className="w-32 h-10 bg-gray-200 rounded"></div>
      <div className="w-32 h-10 bg-gray-200 rounded"></div>
    </div>
  );
};

// Contact form skeleton
export const ContactFormSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
      
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-6">
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
          <div className="h-12 bg-[#A86212] rounded"></div>
        </div>
      </div>
    </div>
  );
};