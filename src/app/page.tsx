import { getPosts, getCategories, WordPressPost } from './utils/wordpress';
import Link from 'next/link';
import PostCard from './components/PostCard';

export default async function Home() {
  const { posts } = await getPosts({ per_page: '20' });
  const categories = await getCategories();
  
  // Group posts by category - handle the case where posts is not an array
  const postsByCategory: Record<string, WordPressPost[]> = {};
  
  // Check if posts is an array before using forEach
  if (Array.isArray(posts)) {
    posts.forEach(post => {
      if (post._embedded && post._embedded['wp:term']) {
        const postCategories = post._embedded['wp:term'][0];
        if (postCategories && postCategories.length > 0) {
          const categoryId = postCategories[0].id.toString();
          if (!postsByCategory[categoryId]) {
            postsByCategory[categoryId] = [];
          }
          postsByCategory[categoryId].push(post);
        }
      }
    });
  } else {
    console.error('Posts is not an array:', posts);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#A86212] mb-4">Recent Publications & Articles</h1>
        <p className="text-gray-600">
          Explore our latest content organized by category.
        </p>
      </div>

      {Array.isArray(posts) && posts.length === 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">No posts found. Make sure your WordPress API URL is correctly configured.</p>
        </div>
      )}

      {categories.map(category => {
        const categoryPosts = postsByCategory[category.id.toString()] || [];
        if (categoryPosts.length === 0) return null;
        
        return (
          <section key={category.id} className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-[#A86212]">{category.name}</h2>
              <Link 
                href={`/category/${category.slug}`}
                className="text-[#A86212] hover:underline"
              >
                View all
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryPosts.slice(0, 3).map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}