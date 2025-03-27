import { getPostBySlug, getFeaturedImageUrl, getCategoryFromPost } from '@/app/utils/wordpress';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ResourcesSidebar from '@/app/components/ResourcesSidebar';

interface PostParams {
  params: {
    slug: string;
  };
}

export default async function PostDetail({ params }: PostParams) {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const featuredImageUrl = getFeaturedImageUrl(post);
  const category = getCategoryFromPost(post);
  
  // Format date
  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center text-sm">
          <Link href="/" className="text-gray-600 hover:text-[#A86212]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="text-gray-600 hover:text-[#A86212]">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-[#A86212]">{post.title.rendered}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-lg shadow-md overflow-hidden">
              {featuredImageUrl && (
                <div className="relative h-64 md:h-96 w-full">
                  <img 
                    src={featuredImageUrl} 
                    alt={post.title.rendered} 
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center space-x-4 mb-4">
                  <span className="bg-[#A86212] text-white text-xs font-semibold px-2 py-1 rounded">
                    {category}
                  </span>
                  <span className="text-sm text-gray-500">{date}</span>
                </div>
                
                <h1 
                  className="text-2xl md:text-3xl font-bold mb-6 text-gray-800"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
              </div>
            </article>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            
            <ResourcesSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}