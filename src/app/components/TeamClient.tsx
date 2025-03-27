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
  
  // Get the title without HTML tags
  const memberName = member.title?.rendered
    ? member.title.rendered.replace(/<[^>]*>/g, '').trim()
    : 'Team Member';
  
  return (
    <div 
      className="relative rounded-lg overflow-hidden shadow-md group bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="relative h-72 md:h-64">
        {featuredImageUrl ? (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ 
              backgroundImage: `url(${featuredImageUrl})`,
              backgroundPosition: 'center top',
              backgroundSize: 'cover'
            }}
          ></div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
            No image available
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}></div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transition-all duration-300 transform">
          <h3 className="text-xl font-bold mb-1">
            {memberName}
          </h3>
          <p className="text-[#A86212] font-medium mb-2 bg-black/30 inline-block px-2 py-1 rounded">
            Team Member
          </p>
          
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-sm text-gray-200 mb-4">
              {bioText}
            </p>
            <div className="flex space-x-3">
              <Link 
                href={`/post/${member.slug}`}
                className="bg-[#A86212] text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-[#8A5210] transition-colors"
              >
                View Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Client component to render team members with interactive features
interface TeamClientProps {
  teamMembers: WordPressPost[];
}

const TeamClient = ({ teamMembers }: TeamClientProps) => {
  return (
    <>
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
          href="/our-team"
          className="inline-flex items-center px-6 py-3 border-2 border-[#A86212] text-[#A86212] hover:bg-[#A86212] hover:text-white rounded-md transition-colors duration-300 font-medium"
        >
          Meet Our Entire Team
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </>
  );
};

export default TeamClient;