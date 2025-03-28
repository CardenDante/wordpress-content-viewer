// app/about-us/page.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function AboutUs() {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center pt-32 pb-20 md:py-40"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/default-bg.jpeg')` 
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight text-shadow-lg">
              About the Centre for Research in Drylands Development
            </h1>
            <div className="bg-white/10 backdrop-blur-sm py-4 px-6 rounded-lg inline-block">
              <p className="text-white text-lg md:text-xl">
                Promoting multi-actor research to address complex situations in drylands development
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="w-24 h-2 bg-[#A86212] rounded-full mb-6 md:mb-0 md:w-2 md:h-24 md:mr-8"></div>
              <h2 className="text-3xl font-bold text-gray-800">Who we are</h2>
            </div>
            
            <div className="prose max-w-none text-lg">
              <p className="font-medium text-gray-900 text-xl mb-6">
                CRDD promotes multi-actor research to address the complex situations drylands development. It develops and implements programs that contribute to sustainable livelihoods for communities living in drylands of Kenya.
              </p>
              
              <p className="mb-6">
                We collaborate with local communities, academia and development actors to create development solutions by building on the synergy of diverse stakeholder perspectives.
              </p>
              
              <p className="mb-10">
                We engage to generate practical solutions through inter-placing participatory research with development in outputs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-gray-50 rounded-lg p-8 shadow-sm transform transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="w-12 h-12 rounded-full bg-[#A86212]/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#A86212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Our Team</h3>
                <p className="text-gray-600 mb-4">
                  CRDD has been created by academic originating from Northern Kenya trained in transdisciplinary and social-ecological network, with varied specializations ranging from management of natural resources and bio-chemistry, rural livelihoods and bio-technology to economics among others.
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-8 shadow-sm transform transition-transform hover:-translate-y-1 hover:shadow-md">
                <div className="w-12 h-12 rounded-full bg-[#A86212]/20 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#A86212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Driven by Research</h3>
                <p className="text-gray-600 mb-4">
                  Since its foundation we work for the local communities, the team are embedded in a network of international and national partners following their years of education and professional engagements in various parts of the world.
                </p>
              </div>
            </div>
            
            <div className="mt-12 relative rounded-lg overflow-hidden shadow-md">
              <Image 
                src="/images/eam.jpeg" 
                alt="CRDD Team Meeting with Community" 
                width={800} 
                height={450}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <p className="text-sm font-medium">Community engagement session in Northern Kenya</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-1 bg-[#A86212] rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm h-full">
                  <p className="text-gray-600 mb-6">
                    Empowered local populations with the capacity to discuss, plan, implement and monitor development to shape their own future.
                  </p>
                  <div className="rounded-lg overflow-hidden">
                    <Image 
                      src="/images/community-meeting.jpg" 
                      alt="Community Vision" 
                      width={500} 
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-1 bg-[#A86212] rounded-full mr-4"></div>
                  <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm h-full">
                  <p className="text-gray-600 mb-6">
                    To contribute to the sustainable livelihoods of communities living in the drylands by working in partnership with multiple stakeholders to seek solutions to real-world problems.
                  </p>
                  <div className="rounded-lg overflow-hidden">
                    <Image 
                      src="/images/dryland-mission.jpg" 
                      alt="Our Mission" 
                      width={500} 
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Where We Are Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="w-24 h-2 bg-[#A86212] rounded-full mb-6 md:mb-0 md:w-2 md:h-24 md:mr-8"></div>
              <h2 className="text-3xl font-bold text-gray-800">Where We Are</h2>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-600 text-lg">
                Located in the heart of Kenya's drylands, CRDD is at the forefront of addressing the unique challenges of these arid regions.
              </p>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-[#A86212]/10 flex items-center justify-center">
                  <svg className="w-16 h-16 text-[#A86212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Our Location</h3>
                  <p className="text-gray-600">
                    Strategically positioned to address drylands' unique challenges
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-[#A86212]/10 flex items-center justify-center">
                  <svg className="w-16 h-16 text-[#A86212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Our Reach</h3>
                  <p className="text-gray-600">
                    Working across Northern Kenya's diverse drylands communities
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-[#A86212]/10 flex items-center justify-center">
                  <svg className="w-16 h-16 text-[#A86212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Our Impact</h3>
                  <p className="text-gray-600">
                    Creating sustainable solutions with global relevance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="w-24 h-2 bg-[#A86212] rounded-full mb-6 md:mb-0 md:w-2 md:h-24 md:mr-8"></div>
              <h2 className="text-3xl font-bold text-gray-800">Our Approach</h2>
            </div>
            
            <div className="prose max-w-none mb-8">
              <p className="text-lg text-gray-600">
                We integrate local wisdom and scientific research to develop sustainable solutions to Kenya's drylands, focusing on community-driven strategies, and work towards sustainable resource development by considering local voices in our development process.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Image 
                  src="/images/eam.jpeg" 
                  alt="Our Community Approach" 
                  width={600} 
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Community-Centered Solutions</h3>
                  <p className="text-gray-600 mb-4">
                    We believe that sustainable development must be rooted in the needs, knowledge, and participation of local communities.
                  </p>
                  <Link 
                    href="/our-approach" 
                    className="text-[#A86212] font-medium flex items-center hover:underline"
                  >
                    Learn more about our approach
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Image 
                  src="/images/research-approach.jpg" 
                  alt="Our Research Approach" 
                  width={600} 
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Research-Driven Development</h3>
                  <p className="text-gray-600 mb-4">
                    Our solutions are backed by rigorous research and evidence, allowing us to address complex challenges effectively.
                  </p>
                  <Link 
                    href="/projects" 
                    className="text-[#A86212] font-medium flex items-center hover:underline"
                  >
                    Explore our projects
                    <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section with CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="w-24 h-2 bg-[#A86212] rounded-full mb-6 md:mb-0 md:w-2 md:h-24 md:mr-8"></div>
              <h2 className="text-3xl font-bold text-gray-800">Our Team</h2>
            </div>
            
            <div className="prose max-w-none mb-8">
              <p className="text-lg text-gray-600">
                CRDD has been created by academic originating from Northern Kenya trained in transdisciplinary and social-ecological network, with varied specializations.
              </p>
            </div>
            
            <div className="bg-[#A86212]/10 rounded-lg p-8 text-center mt-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Meet Our Dedicated Team</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our diverse team of experts brings together different perspectives and expertise to address the complex challenges of dryland development.
              </p>
              <Link 
                href="/our-team" 
                className="inline-block px-6 py-3 bg-[#A86212] text-white font-medium rounded-md hover:bg-[#8A5210] transition-colors shadow-sm"
              >
                Meet the Team
              </Link>
            </div>
            
            <div className="mt-12 relative rounded-lg overflow-hidden shadow-md">
              <Image 
                src="/images/default-bg.jpeg" 
                alt="CRDD Team" 
                width={800} 
                height={400}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-[#A86212]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Partner with us for sustainable drylands development
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              We're always looking for partners who share our vision for sustainable development in Kenya's drylands. Get in touch to explore collaboration opportunities.
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-8 py-4 bg-white text-[#A86212] font-bold rounded-md hover:bg-gray-100 transition-colors shadow-md"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}