// Remove 'use client' from the top of this file - this needs to be a Server Component
import { WordPressPost } from '@/app/utils/wordpress';
import { ErrorDisplay } from './ui/LoadingStates';
import ArticlesClient from './ArticlesClient';

// Define proper TypeScript interface for props
interface ArticlesSectionProps {
  articlesPromise: Promise<{ posts: WordPressPost[]; totalPages: number }>;
}

// Server Component
const ArticlesSection = async ({ articlesPromise }: ArticlesSectionProps) => {
  try {
    // Fetch articles from WordPress using the passed promise
    const { posts: articles } = await articlesPromise;

    return (
      <section className="py-8 md:py-12 bg-white rounded-lg shadow-sm">
        <div className="px-4 sm:px-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-[#A86212] text-white flex items-center justify-center mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Latest Articles</h2>
          </div>
          
          <ArticlesClient articles={articles || []} />
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    // Return the client component with empty data and error UI
    return (
      <section className="py-8 md:py-12 bg-white rounded-lg shadow-sm">
        <div className="px-4 sm:px-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-[#A86212] text-white flex items-center justify-center mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Latest Articles</h2>
          </div>
          
          <ErrorDisplay message="Unable to load articles. Please try again later." />
          <ArticlesClient articles={[]} />
        </div>
      </section>
    );
  }
};

export default ArticlesSection;