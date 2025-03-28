// app/our-approach/page.tsx (example)
import { getPageByRouteSlug, getFeaturedImageFromPage } from '@/app/utils/wordpress';
import PageLayout from '@/app/components/ui/PageLayout';
import PageContentWrapper from '@/app/components/PageContentWrapper';
import PageFallback from '@/app/components/ui/PageFallback';
import Link from 'next/link';
import LatestArticles from '@/app/components/LatestArticles';
import { Suspense } from 'react';

// Define approach child pages
const approachChildPages = [
  { slug: 'enabling-policy', title: 'Enabling Policy' },
  { slug: 'knowledge-and-information-management', title: 'Knowledge and Information Management' },
  { slug: 'sustainable-livelihoods', title: 'Sustainable Livelihoods' },
  { slug: 'knowledge-management', title: 'Knowledge Management' },
  { slug: 'capacity-development', title: 'Capacity Development' },
  { slug: 'enabling-policy-upt', title: 'Enabling Policy UPT' }
];

export default async function OurApproach() {
  const page = await getPageByRouteSlug('our-approach');
  
  // Breadcrumb
  const breadcrumb = (
    <div className="flex items-center justify-center space-x-2">
      <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
      <span className="text-gray-400">/</span>
      <span className="text-white">Our Approach</span>
    </div>
  );
  
  if (!page) {
    return <PageFallback title="Our Approach" routeSlug="our-approach" breadcrumb={breadcrumb} />;
  }
  
  const featuredImage = getFeaturedImageFromPage(page) || '/images/default-bg.jpg';
  const pageTitle = page.title.rendered.replace(/<[^>]*>/g, '');

  return (
    <>
      <PageLayout 
        title={pageTitle} 
        backgroundImage={featuredImage}
        breadcrumb={breadcrumb}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PageContentWrapper>
              <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
            </PageContentWrapper>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-[#A86212] mb-6">Our Focus Areas</h3>
              
              <div className="divide-y divide-gray-200">
                {approachChildPages.map((childPage) => (
                  <Link 
                    key={childPage.slug}
                    href={`/our-approach/${childPage.slug}`}
                    className="block py-3 text-gray-700 hover:text-[#A86212] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span>{childPage.title}</span>
                      <svg className="w-5 h-5 text-[#A86212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
      
      {/* Add Latest Articles Component */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-200 w-64 mb-4 mx-auto rounded"></div>
          <div className="h-4 bg-gray-200 max-w-md mx-auto rounded"></div>
        </div>
      </div>}>
        <LatestArticles />
      </Suspense>
    </>
  );
}