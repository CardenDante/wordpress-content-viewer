// app/admin/wp-checker/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Page {
  id: number;
  title: string;
  slug: string;
  status: string;
  link: string;
  date: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

interface ApiResponse {
  pages: Page[];
  categories: Category[];
}

export default function WordPressChecker() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Required page slugs for our site
  const requiredPages = [
    'about-us',
    'contact',
    'our-approach',
    'enabling-policy',
    'knowledge-and-information-management',
    'sustainable-livelihoods',
    'knowledge-management',
    'capacity-development'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/debug');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const apiData = await response.json();
        setData(apiData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Check if a required page exists or has a matching slug
  const checkPageExists = (requiredSlug: string): { exists: boolean; matchingSlugs: string[] } => {
    if (!data) return { exists: false, matchingSlugs: [] };
    
    const matchingSlugs: string[] = [];
    
    // Direct match
    const directMatch = data.pages.find(page => page.slug === requiredSlug);
    if (directMatch) return { exists: true, matchingSlugs: [directMatch.slug] };
    
    // Check for partial matches
    for (const page of data.pages) {
      // Check if the page slug contains the required slug or vice versa
      if (
        page.slug.includes(requiredSlug.replace(/-/g, '')) || 
        page.slug.includes(requiredSlug) ||
        requiredSlug.includes(page.slug) ||
        page.title.toLowerCase().includes(requiredSlug.replace(/-/g, ' '))
      ) {
        matchingSlugs.push(page.slug);
      }
    }
    
    return { exists: matchingSlugs.length > 0, matchingSlugs };
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#A86212] mb-2">WordPress Content Checker</h1>
        <p className="text-gray-600">
          This tool helps you check what content is available in your WordPress API and identify any missing pages.
        </p>
      </div>
      
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#A86212] border-t-transparent mb-4"></div>
          <p>Loading WordPress data...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-md mb-8">
          <h3 className="text-red-700 font-medium mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      {data && (
        <div className="space-y-12">
          {/* Required Pages Check */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Required Pages Check</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Required Slug</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Matching Slugs</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requiredPages.map(slug => {
                    const { exists, matchingSlugs } = checkPageExists(slug);
                    return (
                      <tr key={slug} className={!exists ? 'bg-red-50' : ''}>
                        <td className="px-4 py-3 font-medium">{slug}</td>
                        <td className="px-4 py-3">
                          {exists ? (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Found</span>
                          ) : (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Missing</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {matchingSlugs.length > 0 ? (
                            <ul className="list-disc list-inside">
                              {matchingSlugs.map(match => (
                                <li key={match} className="text-sm">{match}</li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-gray-500 text-sm">No matches</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {!exists && (
                            <a 
                              href={`${process.env.NEXT_PUBLIC_WORDPRESS_ADMIN || 'https://cms.crdd-kenya.org/wp-admin'}/post-new.php?post_type=page`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#A86212] hover:underline text-sm"
                            >
                              Create in WordPress
                            </a>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* All Available Pages */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">All WordPress Pages ({data.pages.length})</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Slug</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.pages.map(page => (
                    <tr key={page.id}>
                      <td className="px-4 py-3">{page.id}</td>
                      <td className="px-4 py-3 font-medium">{page.title}</td>
                      <td className="px-4 py-3">{page.slug}</td>
                      <td className="px-4 py-3">
                        <span 
                          className={`px-2 py-1 rounded-full text-xs ${
                            page.status === 'publish' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {page.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{new Date(page.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Categories */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Categories ({data.categories.length})</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.categories.map(category => (
                <div key={category.id} className="p-4 border rounded-md">
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    <p>Slug: {category.slug}</p>
                    <p>Posts: {category.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}