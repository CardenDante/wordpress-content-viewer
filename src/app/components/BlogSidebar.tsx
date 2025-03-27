import Link from 'next/link';
import { getPosts, WordPressPost, getCategories, WordPressCategory } from '@/app/utils/wordpress';

interface BlogSidebarProps {
  categories?: WordPressCategory[];
  recentPosts?: WordPressPost[];
}

const BlogSidebar = async () => {
  // Fetch recent posts and categories directly in the component
  const { posts: recentPosts } = await getPosts({ per_page: '5' });
  const categories = await getCategories();
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Articles</h3>
        {Array.isArray(recentPosts) && recentPosts.length > 0 ? (
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="group">
                <Link href={`/post/${post.slug}`} className="block">
                  <h4 
                    className="text-gray-700 group-hover:text-[#A86212] font-medium mb-1 transition-colors line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  <p className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No recent articles available.</p>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Categories</h3>
        {Array.isArray(categories) && categories.length > 0 ? (
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center justify-between group">
                <Link 
                  href={`/category/${category.slug}`}
                  className="flex-1 py-2 text-gray-700 hover:text-[#A86212] transition-colors"
                >
                  {category.name}
                </Link>
                <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default BlogSidebar;