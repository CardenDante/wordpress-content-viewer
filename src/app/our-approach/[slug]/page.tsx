import { getPageBySlug, getFeaturedImageFromPage } from '@/app/utils/wordpress';
import PageLayout from '@/app/components/ui/PageLayout';
import PageFallback from '@/app/components/ui/PageFallback';
import PageContentWrapper from '@/app/components/PageContentWrapper';
import Link from 'next/link';
import LatestArticles from '@/app/components/LatestArticles';
import { Suspense } from 'react';

// Define approach child pages for sidebar navigation
const approachChildPages = [
  { slug: 'enabling-policy', title: 'Enabling Policy' },
  { slug: 'knowledge-and-information-management', title: 'Knowledge and Information Management' },
  { slug: 'sustainable-livelihoods', title: 'Sustainable Livelihoods' },
  { slug: 'knowledge-management', title: 'Knowledge Management' },
  { slug: 'capacity-development', title: 'Capacity Development' },
  { slug: 'enabling-policy-upt', title: 'Enabling Policy UPT' }
];

// Using generateMetadata to handle dynamic params
export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Find the title from our defined pages if possible
  const childPageInfo = approachChildPages.find(p => p.slug === params.slug);
  const pageTitle = childPageInfo?.title || params.slug;
  
  return {
    title: `${pageTitle} - CRDD`,
  };
}

export default async function ApproachChildPage({ params }: { params: { slug: string } }) {
  // Get slug directly from params without destructuring
  const slug = params.slug;
  
  // Ensure we have a slug before proceeding
  if (!slug) {
    return <PageFallback title="Not Found" routeSlug="unknown" />;
  }
  
  const page = await getPageBySlug(slug);
  
  // Breadcrumb - created before checking if page exists
  const childPageInfo = approachChildPages.find(p => p.slug === slug);
  const pageTitle = childPageInfo?.title || (page?.title?.rendered?.replace(/<[^>]*>/g, '') || slug);
  
  const breadcrumb = (
    <div className="flex items-center justify-center space-x-2">
      <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
      <span className="text-gray-400">/</span>
      <Link href="/our-approach" className="text-gray-300 hover:text-white transition-colors">Our Approach</Link>
      <span className="text-gray-400">/</span>
      <span className="text-white">{pageTitle}</span>
    </div>
  );

  if (!page) {
    return <PageFallback title={pageTitle} routeSlug={slug} breadcrumb={breadcrumb} />;
  }
  
  const featuredImage = getFeaturedImageFromPage(page) || '/images/default-bg.jpeg';

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
                    className={`block py-3 transition-colors ${
                      childPage.slug === slug 
                        ? 'text-[#A86212] font-medium' 
                        : 'text-gray-700 hover:text-[#A86212]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{childPage.title}</span>
                      {childPage.slug === slug ? (
                        <svg className="w-5 h-5 text-[#A86212]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
      
      {/* Add Latest Articles Component */}
      <div className="mt-12">
        <Suspense fallback={<div className="h-96 flex items-center justify-center bg-gray-50">
          <div className="animate-pulse text-center">
            <div className="h-8 bg-gray-200 w-64 mb-4 mx-auto rounded"></div>
            <div className="h-4 bg-gray-200 max-w-md mx-auto rounded"></div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5 mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 w-20 bg-gray-200 rounded"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>}>
          <LatestArticles />
        </Suspense>
      </div>
    </>
  );
}