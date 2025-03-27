'use client';
import { useState } from 'react';
import Link from 'next/link';
import { WordPressPost } from '@/app/utils/wordpress';

interface TeamMemberProps {
  member: WordPressPost;
}

const TeamMember = ({ member }: TeamMemberProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const featuredImageUrl = member._embedded && 
    member._embedded['wp:featuredmedia'] && 
    member._embedded['wp:featuredmedia'][0] ? 
    member._embedded['wp:featuredmedia'][0].source_url : null;
  
  // Extract a short bio by stripping HTML tags and truncating
  const bioText = member.excerpt?.rendered
    ? member.excerpt.rendered.replace(/<[^>]*>/g, '').trim().slice(0, 120) + '...'
    : '';
  
  return (
    <div 
      className="relative rounded-lg overflow-hidden shadow-md group bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="relative h-64">
        {featuredImageUrl ? (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ 
              backgroundImage: `url(${featuredImageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          ></div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
            No image available
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`}></div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transition-all duration-300 transform">
          <h3 
            className="text-xl font-bold mb-1"
            dangerouslySetInnerHTML={{ __html: member.title.rendered }}
          />
          <p className="text-[#A86212] font-medium mb-2 bg-black/30 inline-block px-2 py-1 rounded">
            Team Member
          </p>
          
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-sm text-gray-200 mb-4">
              {bioText}
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#A86212] transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Client component to render team members with interactive features
const TeamSectionClient = ({ teamMembers }: { teamMembers: WordPressPost[] }) => {
  return (
    <section className="py-16 md:py-24 bg-white text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            CRDD has been created by scientists originating from Northern Kenya trained in transdisciplinary 
            and social-ecological research with varied specialization in natural resource management, 
            land governance, and biodiversity conservation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.isArray(teamMembers) && teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-gray-100 rounded-lg">
              <p className="text-gray-500">Team information is currently unavailable. Please check back later.</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/team"
            className="inline-flex items-center px-6 py-3 border-2 border-[#A86212] text-[#A86212] hover:bg-[#A86212] hover:text-white rounded-md transition-colors duration-300 font-medium"
          >
            Meet Our Entire Team
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Server Component wrapper to fetch data
import { getPosts } from '@/app//utils/wordpress';

const TeamSection = async () => {
  try {
    // Fetch team members from WordPress using the "Our Team" category
    // Use slug instead of ID to match the category structure
    const { posts: teamMembers } = await getPosts({ 
      categories: '26', // 26 is the ID of "Our Team" category per your screenshot
      per_page: '4' 
    });

    // Fallback for testing - if no team members found
    if (!teamMembers || teamMembers.length === 0) {
      console.log("No team members found. Check the category ID or slug.");
      // You could provide fallback data here for testing
    }

    // Pass the fetched data to the client component
    return <TeamSectionClient teamMembers={teamMembers} />;
  } catch (error) {
    console.error("Error fetching team members:", error);
    // Return the client component with empty data in case of error
    return <TeamSectionClient teamMembers={[]} />;
  }
};

export default TeamSection;