// Remove 'use client' from the top of this file - this needs to be a Server Component
import Link from 'next/link';
import { WordPressPost } from '@/app/utils/wordpress';
import { ErrorDisplay } from './ui/LoadingStates';
import ProjectsClient from './ProjectsClient';

// Define proper TypeScript interface for props
interface ProjectsSectionProps {
  projectsPromise: Promise<{ posts: WordPressPost[]; totalPages: number }>;
}

// This is a Server Component
const ProjectsSection = async ({ projectsPromise }: ProjectsSectionProps) => {
  try {
    // Fetch projects from WordPress using the passed promise
    const { posts: projects } = await projectsPromise;

    return (
      <section className="py-8 md:py-12 bg-white rounded-lg shadow-sm">
        <div className="px-4 sm:px-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-[#A86212] text-white flex items-center justify-center mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Current Projects</h2>
          </div>
          
          <ProjectsClient projects={projects} />
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return (
      <section className="py-8 md:py-12 bg-white rounded-lg shadow-sm">
        <div className="px-4 sm:px-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-[#A86212] text-white flex items-center justify-center mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Current Projects</h2>
          </div>
          
          <ErrorDisplay message="Unable to load projects. Please try again later." />
          <ProjectsClient projects={[]} />
        </div>
      </section>
    );
  }
};

export default ProjectsSection;