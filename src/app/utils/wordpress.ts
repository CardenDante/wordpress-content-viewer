// Replace with your actual WordPress site URL
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.crdd-kenya.org/wp-json/wp/v2';

// Types
export interface WordPressPost {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  categories: number[];
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Helper function to safely build query params
function buildQueryParams(params: Record<string, string> = {}): string {
  const searchParams = new URLSearchParams();
  
  // Add default params if not overridden
  if (!params._embed) {
    searchParams.append('_embed', 'wp:featuredmedia,wp:term');
  }
  
  if (!params.per_page) {
    searchParams.append('per_page', '10');
  }
  
  // Add custom params
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  
  return searchParams.toString();
}

// Function to clean HTML content
export function cleanHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .trim();
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

// Fetch posts with category and featured image data
export async function getPosts(params: Record<string, string> = {}) {
  try {
    const queryParams = buildQueryParams(params);
    const apiUrl = `${WORDPRESS_API_URL}/posts?${queryParams}`;
    
    const { response, data } = await debugFetch(apiUrl, {
      cache: 'no-store' // Disable caching to ensure fresh data
    });
    
    const posts = Array.isArray(data) ? data : [];
    const totalPages = parseInt(response.headers.get('x-wp-totalpages') || '1');
    
    return {
      posts: posts as WordPressPost[],
      totalPages
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Return empty array but don't throw so we can show fallback UI
    return { posts: [] as WordPressPost[], totalPages: 0 };
  }
}

// Get all categories
export async function getCategories() {
  try {
    const apiUrl = `${WORDPRESS_API_URL}/categories?per_page=100`;
    
    const { data } = await debugFetch(apiUrl, {
      cache: 'no-store'
    });
    
    return Array.isArray(data) ? data as WordPressCategory[] : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [] as WordPressCategory[];
  }
}

// Find category ID by slug
export async function getCategoryIdBySlug(slug: string): Promise<number | null> {
  try {
    const categories = await getCategories();
    const category = categories.find(cat => cat.slug === slug);
    return category ? category.id : null;
  } catch (error) {
    console.error(`Error finding category "${slug}":`, error);
    return null;
  }
}

// Get specific category by slug
export async function getCategoryBySlug(slug: string): Promise<WordPressCategory | null> {
  try {
    const apiUrl = `${WORDPRESS_API_URL}/categories?slug=${slug}`;
    
    const { data } = await debugFetch(apiUrl, {
      cache: 'no-store'
    });
    
    if (Array.isArray(data) && data.length > 0) {
      return data[0] as WordPressCategory;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching category by slug ${slug}:`, error);
    return null;
  }
}

// Fetch posts by category ID
export async function getPostsByCategory(categoryId: number, page = 1, perPage = 9) {
  try {
    const params: Record<string, string> = {
      categories: categoryId.toString(),
      page: page.toString(),
      per_page: perPage.toString()
    };
    
    return await getPosts(params);
  } catch (error) {
    console.error(`Error fetching posts for category ID ${categoryId}:`, error);
    return { posts: [] as WordPressPost[], totalPages: 0 };
  }
}

// Fetch posts by category slug
export async function getPostsByCategorySlug(slug: string, page = 1, perPage = 9) {
  try {
    // First get the category to find its ID
    const category = await getCategoryBySlug(slug);
    if (!category) {
      console.error(`Category with slug "${slug}" not found`);
      return { posts: [] as WordPressPost[], totalPages: 0 };
    }
    
    console.log(`Found category ID ${category.id} for slug "${slug}"`);
    
    // Then fetch posts by category ID
    return await getPostsByCategory(category.id, page, perPage);
  } catch (error) {
    console.error(`Error fetching posts for category "${slug}":`, error);
    return { posts: [] as WordPressPost[], totalPages: 0 };
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string) {
  try {
    const apiUrl = `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed=wp:featuredmedia,wp:term`;
    
    const { data } = await debugFetch(apiUrl, {
      cache: 'no-store'
    });
    
    if (Array.isArray(data) && data.length > 0) {
      return data[0] as WordPressPost;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching post by slug ${slug}:`, error);
    return null;
  }
}

// Utility to get category name from post
export function getCategoryFromPost(post: WordPressPost): string {
  if (post._embedded && post._embedded['wp:term']) {
    const categories = post._embedded['wp:term'][0];
    return categories && categories.length > 0 ? categories[0].name : 'Uncategorized';
  }
  return 'Uncategorized';
}

// Utility to get featured image URL from post
export function getFeaturedImageUrl(post: WordPressPost): string | null {
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return null;
}

// Specific content type fetchers - using the correct slugs
export async function getTeamMembers(perPage = 4, orderBy = 'date', order = 'desc') {
  try {
    // Get category ID for 'our-team' 
    const categoryId = await getCategoryIdBySlug('our-team');
    if (!categoryId) {
      console.error('Team category not found');
      return { posts: [] as WordPressPost[], totalPages: 0 };
    }
    
    // Build params with ordering
    const params: Record<string, string> = {
      categories: categoryId.toString(),
      per_page: perPage.toString(),
      orderby: orderBy,
      order: order
    };
    
    // Fetch posts with these parameters
    return await getPosts(params);
  } catch (error) {
    console.error('Error fetching team members:', error);
    return { posts: [] as WordPressPost[], totalPages: 0 };
  }
}

export async function getProjects(perPage = 3) {
  // You may need to update this with the correct projects slug
  return await getPostsByCategorySlug('projects', 1, perPage);
}

export async function getArticles(perPage = 3) {
  // You may need to update this with the correct articles slug
  return await getPostsByCategorySlug('articles', 1, perPage);
}