import { getTeamMembers } from '@/app/utils/wordpress';
import Link from 'next/link';

export default async function TeamPage() {
  const { posts: teamMembers, totalPages } = await getTeamMembers(1, 20);
  
  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <div className="bg-[#14181F] text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">Our Team</h1>
            <p className="text-gray-300">
              CRDD has been created by scientists originating from Northern Kenya trained in transdisciplinary 
              and social-ecological research with varied specialization ranging from management of natural 
              resources, land governance, value chain issues and local knowledge in Biodiversity.
            </p>
          </div>
        </div>
      </div>
      
      {/* Team Members Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array.isArray(teamMembers) && teamMembers.length > 0 ? (
            teamMembers.map(member => {
              const featuredImageUrl = member._embedded && 
                member._embedded['wp:featuredmedia'] && 
                member._embedded['wp:featuredmedia'][0] ? 
                member._embedded['wp:featuredmedia'][0].source_url : null;
                
              // Extract bio from excerpt
              const bio = member.excerpt?.rendered 
                ? member.excerpt.rendered.replace(/<[^>]*>/g, '').trim() 
                : '';
              
              return (
                <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  {featuredImageUrl ? (
                    <div className="h-64 relative">
                      <img 
                        src={featuredImageUrl} 
                        alt={member.title.rendered} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                  
                  <div className="p-4">
                    <h2 
                      className="text-xl font-bold mb-1 text-gray-800"
                      dangerouslySetInnerHTML={{ __html: member.title.rendered }}
                    />
                    <p className="text-[#A86212] font-medium mb-2">Team Member</p>
                    <p className="text-gray-600 text-sm line-clamp-4">{bio}</p>
                    
                    <Link 
                      href={`/post/${member.slug}`}
                      className="mt-4 inline-block text-[#A86212] font-medium text-sm hover:underline"
                    >
                      Read full profile
                    </Link>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 bg-gray-100 rounded-lg">
              <p className="text-gray-500">Team information is currently unavailable. Please check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}