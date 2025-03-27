"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-full max-w-md mx-auto">
        <Image 
          src="/images/not-found.png" 
          alt="Guard Dog" 
          width={300} 
          height={300}
          className="mx-auto mb-6 w-auto h-auto max-w-full"
          priority
        />
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#A86212]">Woof! Where are you going?</h1>
        
        <p className="text-lg sm:text-xl mb-2">This area is under guard!</p>
        <p className="mb-8 text-gray-600 text-sm sm:text-base">Unfortunately, this page is still under construction. Our loyal guard dog is protecting this area until it's ready.</p>
        
        <div className="flex justify-center">
          <Link 
            href="/" 
            className="bg-[#A86212] text-white px-6 py-3 rounded-md font-medium hover:bg-[#8A5210] transition-colors shadow-md"
          >
            Go Back Home
          </Link>
        </div>
      </div>
      
      <div className="mt-12 text-gray-500 text-sm flex items-center justify-center">
        <p>Interesting right! 😂🤣</p>
      </div>
    </div>
  );
}