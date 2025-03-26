import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ApproachSection from './components/ApproachSection';
import LocationSection from './components/LocationSection';
import TeamSection from './components/TeamSection';
import CTASection from './components/CTASection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ApproachSection />
      <LocationSection />
      <TeamSection />
      <CTASection />
    </div>
  );
}