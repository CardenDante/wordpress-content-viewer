'use client';
import { useState } from 'react';
import Link from 'next/link';
import { WordPressPost } from '@/app/utils/wordpress';
import PostCard from './PostCard';
import { ArticlesGridSkeleton } from './ui/LoadingStates';

interface ArticlesClientProps {
  articles: WordPressPost[];
}

// Client component to render articles with interactive features
const ArticlesClient = ({ articles }: ArticlesClientProps) => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <ArticlesGridSkeleton />;
  }

  return (
    <div>
      {Array.isArray(articles) && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <PostCard key={article.id} post={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Articles are currently unavailable. Please check back later.</p>
        </div>
      )}
      
      <div className="mt-8 text-center">
        <Link 
          href="/blog"
          className="inline-flex items-center px-6 py-3 bg-[#A86212] text-white rounded-md hover:bg-[#8A5210] transition-colors"
          onClick={() => setIsLoading(true)}
        >
          View All Articles
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ArticlesClient;