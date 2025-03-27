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
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
      <Link href={`/post/${post.slug}`}>
        <div className="relative h-48 w-full">
          {featuredImageUrl ? (
            <img 
              src={featuredImageUrl} 
              alt={post.title.rendered} 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          <div className="absolute top-0 right-0 bg-[#A86212] text-white text-xs font-semibold px-2 py-1 m-2 rounded">
            {category}
          </div>
        </div>
        
        <div className="p-4">
          <h3 
            className="text-lg font-bold mb-2 text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          
          <div 
            className="text-sm text-gray-600 mb-3 line-clamp-3"
            dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
          />
          
          <div className="text-xs text-gray-500">{date}</div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;