import Link from 'next/link';
import { getPosts, getFeaturedImageUrl, getCategoryFromPost } from '@/app/utils/wordpress';

const LatestArticles = async () => {
  // Fetch articles from WordPress using the "Articles" category
  const { posts: articles } = await getPosts({ 
    categories: '5', // 5 is the ID of "Articles" category
    per_page: '3' 
  });

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest Articles</h2>
          <p className="text-lg text-gray-600">
            Stay informed with our latest research, insights, and developments in drylands management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.isArray(articles) && articles.length > 0 ? (
            articles.map((article) => {
              const featuredImageUrl = getFeaturedImageUrl(article);
              const category = getCategoryFromPost(article);
              
              return (
                <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1">
                  <Link href={`/post/${article.slug}`}>
                    <div className="relative h-48 w-full">
                      {featuredImageUrl ? (
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ 
                            backgroundImage: `url(${featuredImageUrl})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                          }}
                        ></div>
                      ) : (
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                      <div className="absolute top-0 right-0 bg-[#A86212] text-white text-xs font-semibold px-2 py-1 m-2 rounded">
                        {category}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 
                        className="text-lg font-semibold text-gray-800 mb-3 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: article.title.rendered }}
                      />
                      
                      <div 
                        className="text-sm text-gray-600 mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }}
                      />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-[#A86212] font-medium text-sm">Read more</span>
                        <span className="text-xs text-gray-500">
                          {new Date(article.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            // Fallback if no articles are fetched
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Articles are currently unavailable. Please check back later.</p>
            </div>
          )}
        </div>
        
        <div className="mt-10 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center bg-[#A86212] hover:bg-[#8A5210] text-white font-medium px-6 py-3 rounded-md transition duration-300"
          >
            View All Articles
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;