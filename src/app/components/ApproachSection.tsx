import Link from 'next/link';

const ApproachSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Approach</h2>
          <p className="text-lg text-gray-600">
            We integrate local wisdom and scientific research to develop sustainable solutions in Kenya's drylands. 
            Focusing on community-driven strategies, we work towards sustainable resource management, empowering 
            local voices in our development process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-w-16 aspect-h-9 bg-[#A86212] bg-opacity-10">
              <div className="flex items-center justify-center p-8">
                <svg className="w-16 h-16 text-[#A86212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Collaboration</h3>
              <p className="text-gray-600 mb-4">
                We bring together local communities, researchers, and development actors to co-create solutions that address real-world challenges in drylands.
              </p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-w-16 aspect-h-9 bg-[#A86212] bg-opacity-10">
              <div className="flex items-center justify-center p-8">
                <svg className="w-16 h-16 text-[#A86212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Research Integration</h3>
              <p className="text-gray-600 mb-4">
                We connect scientific research with traditional knowledge, creating practical and culturally appropriate development solutions.
              </p>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-w-16 aspect-h-9 bg-[#A86212] bg-opacity-10">
              <div className="flex items-center justify-center p-8">
                <svg className="w-16 h-16 text-[#A86212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Sustainability</h3>
              <p className="text-gray-600 mb-4">
                Our initiatives focus on long-term sustainability, balancing ecological conservation with community development needs.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/approach"
            className="inline-block bg-[#A86212] hover:bg-[#8A5210] text-white font-medium px-6 py-3 rounded-md transition duration-300"
          >
            Discover Our Methodology
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;