import Link from 'next/link';

const AboutSection = () => {
  return (
    <section id="main-content" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative">
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 hover:scale-105" 
                style={{ 
                  backgroundImage: 'url(/images/community-research.jpeg)', 
                  backgroundPosition: 'center',
                  backgroundSize: 'cover'
                }}
              ></div>
            </div>
            <div className="absolute -bottom-8 -right-8 hidden md:block">
              <div className="bg-[#A86212] p-6 rounded-lg shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Text Column */}
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Who We Are</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                CRDD promotes multi-actor research to address the complex situations drylands development. It develops and implements programs that contribute to sustainable livelihoods for communities living in drylands of Kenya.
              </p>
              <p>
                We collaborate with local communities, academia and development actors to co-create development solutions by building on the capacities of diverse stakeholders.
              </p>
              <p>
                We target to generate practical solutions through inter-phasing participatory research with development in drylands.
              </p>
            </div>
            
            <div className="mt-8 space-y-6">
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-[#A86212] bg-opacity-10 p-2 rounded-full">
                  <svg className="w-6 h-6 text-[#A86212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Our Vision</h3>
                  <p className="text-gray-600">
                    Empowered local population with the capacity to discuss, plan, implement and monitor development to shape their own future.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1 bg-[#A86212] bg-opacity-10 p-2 rounded-full">
                  <svg className="w-6 h-6 text-[#A86212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">Our Mission</h3>
                  <p className="text-gray-600">
                    To contribute to the sustainable livelihoods of communities living in the drylands by working in partnership with multiple stakeholders to seek solutions to real-world problems.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Link href="/about" className="inline-flex items-center text-[#A86212] font-medium hover:underline">
                Learn more about CRDD
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;