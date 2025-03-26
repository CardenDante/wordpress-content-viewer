import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('/images/drylands-landscape.jpeg')", 
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Centre for Research in Drylands Development
          </h1>
          <p className="text-xl text-white opacity-90 mb-8">
            Empowering communities and developing sustainable solutions for Kenya's drylands through research and multi-stakeholder collaboration.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/about" className="bg-[#A86212] hover:bg-[#8A5210] text-white font-semibold px-6 py-3 rounded-md transition duration-300 shadow-lg">
              Discover More
            </Link>
            <Link href="/contact" className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold px-6 py-3 rounded-md transition duration-300">
              Get In Touch
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <a href="#main-content" className="text-white opacity-80 hover:opacity-100">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
