// app/components/ui/LoadingStates.tsx
import React from 'react';

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