import Link from 'next/link';
import { getPosts, getCategories, getFeaturedImageUrl } from '@/app/utils/wordpress';

const ResourcesSidebar = async () => {
  // Fetch recent posts and categories directly in the component
  const { posts: recentPosts } = await getPosts({ per_page: '5' });
  const categories = await getCategories();
  
  return (
    <div className="space-y-6">
      {/* Recent Articles Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#A86212] text-white px-4 py-3">
          <h3 className="text-lg font-semibold">Recent Articles</h3>
        </div>
        
        {Array.isArray(recentPosts) && recentPosts.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentPosts.map((post) => {
              const featuredImageUrl = getFeaturedImageUrl(post);
              
              return (
                <Link 
                  key={post.id} 
                  href={`/post/${post.slug}`} 
                  className="flex items-center p-3 hover:bg-gray-50 transition-colors"
                >
                  {featuredImageUrl && (
                    <div className="w-16 h-16 mr-3 flex-shrink-0 rounded-md overflow-hidden">
                      <img 
                        src={featuredImageUrl} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-grow min-w-0">
                    <h4 
                      className="text-sm font-medium text-gray-800 mb-1 truncate"
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <p className="text-xs text-gray-500">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="p-4 text-gray-500 text-sm">No recent articles available.</div>
        )}
        
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <Link 
            href="/blog" 
            className="text-[#A86212] font-medium text-sm hover:underline inline-flex items-center"
          >
            View all articles
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Categories Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#A86212] text-white px-4 py-3">
          <h3 className="text-lg font-semibold">Categories</h3>
        </div>
        
        {Array.isArray(categories) && categories.length > 0 ? (
          <div className="p-3 grid grid-cols-2 gap-2">
            {categories
              .filter(category => category.count > 0)
              .map((category) => (
                <Link 
                  key={category.id} 
                  href={`/category/${category.slug}`}
                  className="flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700 truncate mr-2">
                    {category.name}
                  </span>
                  <span className="bg-[#A86212] text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </Link>
              ))}
          </div>
        ) : (
          <div className="p-4 text-gray-500 text-sm">No categories available.</div>
        )}
      </div>
      
      {/* Publications Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#A86212] text-white px-4 py-3">
          <h3 className="text-lg font-semibold">Publications</h3>
        </div>
        
        <div className="p-4">
          <Link 
            href="/publications" 
            className="flex items-center justify-between p-3 mb-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">Research Papers</span>
            <svg className="w-4 h-4 text-[#A86212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          <Link 
            href="/reports" 
            className="flex items-center justify-between p-3 mb-2 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">Reports</span>
            <svg className="w-4 h-4 text-[#A86212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          <Link 
            href="/gallery" 
            className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
          >
            <span className="text-sm font-medium text-gray-700">Media Gallery</span>
            <svg className="w-4 h-4 text-[#A86212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourcesSidebar;