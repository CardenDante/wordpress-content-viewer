// Remove any 'use client' directive here - this needs to be a Server Component
import Link from 'next/link';
import { getPosts, getCategories, getFeaturedImageUrl } from '@/app/utils/wordpress';
import { SidebarSkeleton } from './ui/LoadingStates';
import { Suspense } from 'react';
import ResourcesSidebarClient from './ResourcesSidebarClient';

const ResourcesSidebar = async () => {
  try {
    // Fetch recent posts and categories directly in the component
    // Use Promise.allSettled to handle partial failures
    const [postsResult, categoriesResult] = await Promise.allSettled([
      getPosts({ per_page: '5' }),
      getCategories()
    ]);
    
    // Extract data or provide fallbacks
    const { posts: recentPosts = [] } = 
      postsResult.status === 'fulfilled' ? postsResult.value : { posts: [] };
    
    const categories = 
      categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];
    
    return <ResourcesSidebarClient recentPosts={recentPosts} categories={categories} />;
  } catch (error) {
    console.error('Error in ResourcesSidebar:', error);
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resources</h3>
        <div className="p-4 text-center">
          <p className="text-gray-500">Unable to load resources. Please try again later.</p>
        </div>
      </div>
    );
  }
};

// Create a wrapper component to handle suspense
const ResourcesSidebarWithSuspense = () => {
  return (
    <Suspense fallback={<SidebarSkeleton />}>
      <ResourcesSidebar />
    </Suspense>
  );
};

export default ResourcesSidebarWithSuspense;

