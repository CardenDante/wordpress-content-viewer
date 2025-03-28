'use client';
import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-[#A86212] mb-6">Oops!</h1>
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            We apologize for the inconvenience. The page you requested couldn't be loaded properly.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={reset}
              className="w-full py-3 px-4 bg-[#A86212] text-white font-medium rounded-md hover:bg-[#8A5210] transition-colors"
            >
              Try Again
            </button>
            
            <Link href="/" className="block w-full py-3 px-4 border border-[#A86212] text-[#A86212] font-medium rounded-md hover:bg-gray-50 transition-colors text-center">
              Return to Homepage
            </Link>
          </div>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <h3 className="text-sm font-semibold text-red-800 mb-2">Error details:</h3>
            <p className="text-xs text-red-700 font-mono">{error.message}</p>
            {error.digest && (
              <p className="text-xs text-red-700 font-mono mt-1">Digest: {error.digest}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}