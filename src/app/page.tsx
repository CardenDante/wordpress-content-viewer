import { Suspense } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ApproachSection from './components/ApproachSection';
import TeamSection from './components/TeamSection';
import ProjectsSection from './components/ProjectsSection';
import ArticlesSection from './components/ArticlesSection';
import ResourcesSidebar from './components/ResourcesSidebar';
import CTASection from './components/CTASection';
import { getArticles, getProjects, getTeamMembers } from '@/app/utils/wordpress';
import { ArticlesGridSkeleton, SidebarSkeleton } from './components/ui/LoadingStates';
import DebugComponent from './components/DebugComponent';

export default async function Home() {
  // These functions now use slug-based fetching with proper slugs
  const articlesPromise = getArticles(3);
  const projectsPromise = getProjects(3);
  const teamPromise = getTeamMembers(4, 'date', 'desc');
  
  return (
    <div>
      <HeroSection />
      
      <div id="main-content" className="bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Projects and Articles */}
            <div className="lg:col-span-2 space-y-8">
              <Suspense fallback={<div className="animate-pulse p-8 bg-white rounded-lg shadow-sm mb-8">
                <div className="h-8 bg-gray-200 rounded mb-6 w-1/3"></div>
                <ArticlesGridSkeleton />
              </div>}>
                <ProjectsSection projectsPromise={projectsPromise} />
              </Suspense>
              
              <Suspense fallback={<div className="animate-pulse p-8 bg-white rounded-lg shadow-sm">
                <div className="h-8 bg-gray-200 rounded mb-6 w-1/3"></div>
                <ArticlesGridSkeleton />
              </div>}>
                <ArticlesSection articlesPromise={articlesPromise} />
              </Suspense>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Suspense fallback={<SidebarSkeleton />}>
                <ResourcesSidebar />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      
      <AboutSection />
      <ApproachSection />
      
      <Suspense fallback={<div className="py-16 animate-pulse bg-white">
        <div className="container mx-auto px-4">
          <div className="h-10 bg-gray-200 rounded mb-10 w-1/4 mx-auto"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>}>
        <TeamSection teamPromise={teamPromise} />
      </Suspense>
      
      <CTASection />
      
      {/* Include the debug component in development */}
      {process.env.NODE_ENV === 'development' && <DebugComponent />}
    </div>
  );
}