import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#A86212] to-[#8A5210]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join Us in Creating Sustainable Solutions for Kenya's Drylands
          </h2>
          <p className="text-lg text-white text-opacity-90 mb-8">
            Whether you're a community member, researcher, or development partner, 
            there are many ways to collaborate with CRDD for a sustainable future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-[#A86212] hover:bg-gray-100 font-semibold px-6 py-3 rounded-md shadow-lg transition duration-300">
              Get In Touch
            </Link>
            <Link href="/blog" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#A86212] font-semibold px-6 py-3 rounded-md transition duration-300">
              Read Our Latest Updates
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
