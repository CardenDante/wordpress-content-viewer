import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ApproachSection from './components/ApproachSection';
import LocationSection from './components/LocationSection';
import TeamSection from './components/TeamSection';
import ProjectsSection from './components/ProjectsSection';
import ArticlesSection from './components/ArticlesSection';
import ResourcesSidebar from './components/ResourcesSidebar';
import CTASection from './components/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      
      <div id="main-content" className="bg-gray-50 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Projects and Articles */}
            <div className="lg:col-span-2 space-y-12">
              <ProjectsSection />
              <ArticlesSection />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <ResourcesSidebar />
            </div>
          </div>
        </div>
      </div>
      
      <AboutSection />
      <ApproachSection />
      <LocationSection />
      <TeamSection />
      <CTASection />
    </div>
  );
}