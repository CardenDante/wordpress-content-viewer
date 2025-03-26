import Link from 'next/link';
import Image from 'next/image';

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Abdi Hassan",
      role: "Executive Director",
      bio: "Natural Resource Management",
      image: "/images/team-member-1.jpg"
    },
    {
      id: 2,
      name: "Dr. Fatuma Omar",
      role: "Research Director",
      bio: "Land Governance",
      image: "/images/team-member-2.jpg"
    },
    {
      id: 3,
      name: "Ibrahim Guyo",
      role: "Program Manager",
      bio: "Biodiversity Conservation",
      image: "/images/team-member-3.jpg"
    },
    {
      id: 4,
      name: "Halima Wario",
      role: "Community Liaison",
      bio: "Participatory Research",
      image: "/images/team-member-4.jpg"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            CRDD has been created by scientists originating from Northern Kenya trained in transdisciplinary 
            and social-ecological research. With varied specialization ranging from management of natural 
            resources, land governance, value chain issues and local knowledge in Biodiversity among others.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64 w-full">
                <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${member.image})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}
                ></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                <p className="text-[#A86212] font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-[#A86212]" aria-label="LinkedIn">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#A86212]" aria-label="Twitter">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            href="/team"
            className="inline-flex items-center bg-gray-800 hover:bg-black text-white font-medium px-6 py-3 rounded-md transition duration-300"
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

export default TeamSection;