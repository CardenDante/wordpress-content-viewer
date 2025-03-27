import React from 'react';
import Link from 'next/link';
import { WordPressPost, getFeaturedImageUrl, getCategoryFromPost } from '@/app/utils/wordpress';

interface PostCardProps {
  post: WordPressPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const featuredImageUrl = getFeaturedImageUrl(post);
  const category = getCategoryFromPost(post);
  
  // Format date
  const date = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
      <Link href={`/post/${post.slug}`} className="block flex-1 flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          {featuredImageUrl ? (
            <div
              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 hover:scale-105"
              style={{ 
                backgroundImage: `url(${featuredImageUrl})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            ></div>
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {category && (
            <div className="absolute top-0 right-0 bg-[#A86212] text-white text-xs font-semibold px-2 py-1 m-2 rounded-md">
              {category}
            </div>
          )}
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <h3 
            className="text-lg font-bold mb-3 text-gray-800 line-clamp-2 hover:text-[#A86212] transition-colors"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          
          <div 
            className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1"
            dangerouslySetInnerHTML={{ 
              __html: post.excerpt?.rendered 
                ? post.excerpt.rendered.replace(/<[^>]*>/g, '').trim() 
                : 'No description available'
            }}
          />
          
          <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
            <span className="text-[#A86212] text-sm font-medium flex items-center">
              Read more
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="text-xs text-gray-500">{date}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;