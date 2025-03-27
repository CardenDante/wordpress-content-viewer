"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="max-w-md mx-auto">
        <Image 
          src="/images/not-found.png" 
          alt="Guard Dog" 
          width={300} 
          height={300}
          className="mx-auto mb-6"
          priority
        />
        
        <h1 className="text-4xl font-bold mb-4 text-[#A86212]">Woof! Where are you going?</h1>
        
        <p className="text-xl mb-2">This area is under guard!</p>
        <p className="mb-8 text-gray-600">Unfortunately, this page is still under construction. Our loyal guard dog is protecting this area until it's ready.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="bg-[#A86212] text-white px-6 py-3 rounded-md font-medium hover:bg-[#8A5210] transition-colors shadow-md"
          >
            Go Back Home
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
      
      <div className="mt-12 text-gray-500 text-sm flex items-center justify-center">
        <p>Interesting right!😂 Gotch you!🤣</p>
      </div>
    </div>
  );
}