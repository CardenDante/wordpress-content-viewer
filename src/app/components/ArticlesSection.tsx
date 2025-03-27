'use client';
import { useState } from 'react';
import Link from 'next/link';
import { WordPressPost, getCategoryFromPost } from '@/app/utils/wordpress';

interface ArticleCardProps {
  article: WordPressPost;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const featuredImageUrl = article._embedded && 
    article._embedded['wp:featuredmedia'] && 
    article._embedded['wp:featuredmedia'][0] ? 
    article._embedded['wp:featuredmedia'][0].source_url : null;
    
  const category = getCategoryFromPost(article);
  
  return (
    <Link 
      href={`/post/${article.slug}`}
      className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white h-full"
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-[#A86212] bg-[#A86212]/10 px-2 py-1 rounded-full">
              {category}
            </span>
            <span className="text-xs text-gray-500">
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          
          <h3 
            className="text-lg font-bold text-gray-800 mb-2 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: article.title.rendered }}
          />
        </div>
        
        {featuredImageUrl && (
          <div className="relative h-40 w-full">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${featuredImageUrl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            ></div>
          </div>
        )}
        
        <div className="p-4 flex-grow">
          <div 
            className="text-sm text-gray-600 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ 
              __html: article.excerpt?.rendered
                ? article.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 120) + '...'
                : 'No description available'
            }}
          />
        </div>
        
        <div className="p-4 pt-0 mt-auto">
          <span className="text-sm font-medium text-[#A86212] flex items-center">
            Read more
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
};

// Client component to render articles with interactive features
const ArticlesClient = ({ articles }: { articles: WordPressPost[] }) => {
  return (
    <div>
      {Array.isArray(articles) && articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <p className="text-gray-500">Articles are currently unavailable. Please check back later.</p>
        </div>
      )}
      
      <div className="mt-8 text-center">
        <Link 
          href="/blog"
          className="inline-flex items-center px-6 py-3 bg-[#A86212] text-white rounded-md hover:bg-[#8A5210] transition-colors"
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

// Server Component wrapper to fetch data
import { getPosts } from '@/app/utils/wordpress';

const ArticlesSection = async () => {
  try {
    // Fetch articles from WordPress using the "Articles" category
    const { posts: articles } = await getPosts({ 
      categories: '5', // 5 is the ID of "Articles" category as per your screenshot
      per_page: '3' 
    });

    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-full bg-[#A86212] text-white flex items-center justify-center mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Latest Articles</h2>
          </div>
          
          <ArticlesClient articles={articles} />
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    // Return the client component with empty data in case of error
    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-full bg-[#A86212] text-white flex items-center justify-center mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Latest Articles</h2>
          </div>
          
          <ArticlesClient articles={[]} />
        </div>
      </section>
    );
  }
};

export default ArticlesSection;