// utils/wordpressPages.ts
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.crdd-kenya.org/wp-json/wp/v2';

export interface WordPressPage {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  template: string;
  parent: number;
  menu_order: number;
  acf?: any;
}


// Helper function to safely build query params
function buildQueryParams(params: Record<string, string> = {}): string {
  const searchParams = new URLSearchParams();
  
  // Add default params if not overridden
  if (!params.per_page) {
    searchParams.append('per_page', '100'); // Get more pages at once
  }
  
  // Add custom params
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  
  return searchParams.toString();
}

// Log API responses for debugging
async function debugFetch(url: string, options = {}) {
  console.log('Fetching from:', url);
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(`API response from ${url}:`, 
      Array.isArray(data) ? `Retrieved ${data.length} items` : 'Retrieved data');
    return { response, data };
  } catch (error) {
    console.error('Error fetching from WordPress:', error);
    throw error;
  }
}

// Get all pages
export async function getPages(params: Record<string, string> = {}) {
  try {
    const queryParams = buildQueryParams(params);
    const apiUrl = `${WORDPRESS_API_URL}/pages?${queryParams}`;
    
    const { response, data } = await debugFetch(apiUrl, {
      cache: 'no-store' // Disable caching to ensure fresh data
    });
    
    const pages = Array.isArray(data) ? data : [];
    const totalPages = parseInt(response.headers.get('x-wp-totalpages') || '1');
    
    return {
      pages: pages as WordPressPage[],
      totalPages
    };
  } catch (error) {
    console.error('Error fetching pages:', error);
    // Return empty array but don't throw so we can show fallback UI
    return { pages: [] as WordPressPage[], totalPages: 0 };
  }
}

// Get page by slug
export async function getPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    const apiUrl = `${WORDPRESS_API_URL}/pages?slug=${slug}`;
    
    const { data } = await debugFetch(apiUrl, {
      cache: 'no-store'
    });
    
    if (Array.isArray(data) && data.length > 0) {
      return data[0] as WordPressPage;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching page by slug ${slug}:`, error);
    return null;
  }
}

// Get navigation pages (excluding ones we want to filter)
export async function getNavigationPages() {
  try {
    const { pages } = await getPages();
    
    // Filter out pages that should not be in navigation
    // Based on your requirement to exclude "Our team, Gallery, Global styles, Home"
    const excludeSlugs = ['our-team', 'gallery', 'global-styles', 'home'];
    
    return pages.filter(page => 
      !excludeSlugs.includes(page.slug.toLowerCase()) && 
      page.status === 'publish'
    ).sort((a, b) => a.menu_order - b.menu_order);
  } catch (error) {
    console.error('Error fetching navigation pages:', error);
    return [] as WordPressPage[];
  }
}