'use client';
import { useState } from 'react';
import Link from 'next/link';
import { WordPressPost } from '@/app/utils/wordpress';

interface ProjectCardProps {
  project: WordPressPost;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const featuredImageUrl = project._embedded && 
    project._embedded['wp:featuredmedia'] && 
    project._embedded['wp:featuredmedia'][0] ? 
    project._embedded['wp:featuredmedia'][0].source_url : null;
  
  return (
    <Link 
      href={`/post/${project.slug}`}
      className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white h-full transform hover:-translate-y-1"
    >
      <div className="relative h-52 md:h-48">
        {featuredImageUrl ? (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ 
              backgroundImage: `url(${featuredImageUrl})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          ></div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-[#A86212]"></div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <div className="bg-[#A86212] text-white text-xs font-semibold px-2 py-1 rounded-full inline-block mb-2">
            Project
          </div>
          
          <h3 
            className="text-lg font-bold mb-1 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: project.title.rendered }}
          />
        </div>
      </div>
      
      <div className="p-4">
        <div 
          className="text-sm text-gray-600 mb-3 line-clamp-3"
          dangerouslySetInnerHTML={{ 
            __html: project.excerpt?.rendered
              ? project.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 120) + '...'
              : 'No description available' 
          }}
        />
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#A86212] font-medium">Learn more</span>
          <span className="text-gray-500">
            {new Date(project.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short'
            })}
          </span>
        </div>
      </div>
    </Link>
  );
};

// Client component to render projects with interactive features
interface ProjectsClientProps {
  projects: WordPressPost[];
}

const ProjectsClient = ({ projects }: ProjectsClientProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      {Array.isArray(projects) && projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Project information is currently unavailable. Please check back later.</p>
        </div>
      )}
      
      <div className="mt-8 text-center">
        <Link 
          href="/projects"
          className="inline-flex items-center px-6 py-3 bg-[#A86212] text-white rounded-md hover:bg-[#8A5210] transition-colors"
          onClick={() => setIsLoading(true)}
        >
          View All Projects
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProjectsClient;