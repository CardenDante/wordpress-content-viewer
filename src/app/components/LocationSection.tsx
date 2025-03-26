import Link from 'next/link';

const LocationSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6">Where We Are</h2>
            <p className="text-lg text-gray-300 mb-6">
              Located in the heart of Kenya's drylands, CRDD is at the forefront of addressing the unique challenges of these arid regions.
            </p>
            
            <div className="bg-gray-800 rounded-lg p-6 shadow-md">
              <div className="flex items-start mb-4">
                <div className="mr-4 mt-1 text-[#A86212]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Marsabit County, Kenya</h3>
                  <p className="text-gray-400">
                    Our main operations are centered in Northern Kenya, where we work directly with local communities facing dryland challenges.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 text-[#A86212]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1">Regional Impact</h3>
                  <p className="text-gray-400">
                    While based in Marsabit, our research and development initiatives span across Kenya's arid and semi-arid lands.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link 
                href="/contact"
                className="inline-flex items-center text-[#A86212] font-medium hover:underline"
              >
                Visit our locations
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="relative">
              <div className="h-[300px] md:h-[400px] bg-gray-700 rounded-lg overflow-hidden shadow-xl">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ 
                    backgroundImage: 'url(/images/kenya-map.jpg)', 
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}
                ></div>
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                
                {/* Location Pin */}
                <div className="absolute top-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
                  <div className="relative">
                    <svg className="w-10 h-10 text-[#A86212]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white text-black text-xs font-semibold px-2 py-1 rounded-full">
                      CRDD
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 hidden md:block">
                <div className="bg-[#A86212] p-4 rounded-full shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;