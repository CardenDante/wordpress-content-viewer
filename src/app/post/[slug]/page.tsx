import { getPostBySlug, getFeaturedImageUrl, getCategoryFromPost } from '@/app/utils/wordpress';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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
    <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
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
        <div className="flex items-center space-x-4 mb-4">
          <span className="bg-[#A86212] text-white text-xs font-semibold px-2 py-1 rounded">
            {category}
          </span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        
        <h1 
          className="text-2xl md:text-3xl font-bold mb-6 text-[#A86212]"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
      
      <div className="mt-8 text-center pb-8">
        <Link href="/" className="inline-block bg-[#A86212] text-white px-4 py-2 rounded hover:bg-[#8A5210]">
          Back to Home
        </Link>
      </div>
    </article>
  );
}