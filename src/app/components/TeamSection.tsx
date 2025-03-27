// Remove 'use client' from the top of this file - this needs to be a Server Component
import { WordPressPost } from '@/app/utils/wordpress';
import { ErrorDisplay } from './ui/LoadingStates';
import TeamClient from './TeamClient';

// Define proper TypeScript interface for props
interface TeamSectionProps {
  teamPromise: Promise<{ posts: WordPressPost[]; totalPages: number }>;
}

// Server Component
const TeamSection = async ({ teamPromise }: TeamSectionProps) => {
  try {
    // Fetch team members from WordPress using the passed promise
    const { posts: teamMembers } = await teamPromise;

    // Pass the fetched data to the client component
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
          
          <TeamClient teamMembers={teamMembers} />
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching team members:", error);
    // Return the client component with empty data and error UI
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
          
          <ErrorDisplay message="Unable to load team information. Please try again later." />
          <TeamClient teamMembers={[]} />
        </div>
      </section>
    );
  }
};

export default TeamSection;