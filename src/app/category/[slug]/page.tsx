import { getCategoryBySlug, getPostsByCategorySlug } from '@/app/utils/wordpress';
import PostCard from '@/app/components/PostCard';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const page = parseInt(searchParams.page || '1');
  const category = await getCategoryBySlug(params.slug);
  
  if (!category) {
    notFound();
  }
  
  // Use the getPostsByCategorySlug function with slug rather than ID
  const { posts, totalPages } = await getPostsByCategorySlug(params.slug, page);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-6 flex items-center">
        <Link href="/" className="text-[#A86212] hover:underline mr-2">
          Home
        </Link>
        <span className="text-gray-500 mx-2">›</span>
        <h1 className="text-3xl font-bold text-[#A86212]">{category.name}</h1>
      </div>
      
      {Array.isArray(posts) && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600">No posts found in this category.</p>
        </div>
      )}
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <a
                key={pageNum}
                href={`/category/${category.slug}?page=${pageNum}`}
                className={`px-3 py-1 rounded ${
                  pageNum === page
                    ? 'bg-[#A86212] text-white'
                    : 'bg-white text-[#A86212] hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}