// Replace with your WordPress site URL
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

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
  
  // Add default params
  searchParams.append('_embed', 'wp:featuredmedia,wp:term');
  searchParams.append('per_page', '10');
  
  // Add custom params
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  
  return searchParams.toString();
}

// Fetch posts with category and featured image data
export async function getPosts(params: Record<string, string> = {}) {
  try {
    const queryParams = buildQueryParams(params);
    const apiUrl = `${WORDPRESS_API_URL}/posts?${queryParams}`;
    
    console.log('Fetching posts from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const posts = Array.isArray(data) ? data : [];
    const totalPages = parseInt(response.headers.get('x-wp-totalpages') || '1');
    
    return {
      posts: posts as WordPressPost[],
      totalPages
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { posts: [] as WordPressPost[], totalPages: 0 };
  }
}

// Fetch posts by category
export async function getPostsByCategory(categoryId: number, page = 1) {
  try {
    const params: Record<string, string> = {
      categories: categoryId.toString(),
      page: page.toString()
    };
    
    const queryParams = buildQueryParams(params);
    const apiUrl = `${WORDPRESS_API_URL}/posts?${queryParams}`;
    
    console.log('Fetching category posts from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    const posts = Array.isArray(data) ? data : [];
    const totalPages = parseInt(response.headers.get('x-wp-totalpages') || '1');
    
    return {
      posts: posts as WordPressPost[],
      totalPages
    };
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return { posts: [] as WordPressPost[], totalPages: 0 };
  }
}

// Fetch single post by slug
export async function getPostBySlug(slug: string) {
  try {
    const apiUrl = `${WORDPRESS_API_URL}/posts?slug=${slug}&_embed=wp:featuredmedia,wp:term`;
    
    console.log('Fetching post by slug from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }
    
    const posts = await response.json();
    return Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

// Fetch all categories
export async function getCategories() {
  try {
    const apiUrl = `${WORDPRESS_API_URL}/categories?per_page=100`;
    
    console.log('Fetching categories from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Fetch category by slug
export async function getCategoryBySlug(slug: string) {
  try {
    const apiUrl = `${WORDPRESS_API_URL}/categories?slug=${slug}`;
    
    console.log('Fetching category by slug from:', apiUrl);
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
    }
    
    const categories = await response.json();
    return Array.isArray(categories) && categories.length > 0 ? categories[0] : null;
  } catch (error) {
    console.error('Error fetching category by slug:', error);
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

// Fetch posts by category slug (instead of ID)
export async function getPostsByCategorySlug(slug: string, page = 1) {
  try {
    // First get the category to find its ID
    const category = await getCategoryBySlug(slug);
    if (!category) {
      return { posts: [] as WordPressPost[], totalPages: 0 };
    }
    
    // Then fetch posts by category ID
    return await getPostsByCategory(category.id, page);
  } catch (error) {
    console.error('Error fetching posts by category slug:', error);
    return { posts: [] as WordPressPost[], totalPages: 0 };
  }
}

// Fetch all posts for "Our Team" (useful for team page)
export async function getTeamMembers(page = 1, perPage = 12) {
  // Use the "Our Team" category ID from your WordPress
  return await getPostsByCategory(26, page);
}

// Fetch all posts for "Projects" (useful for projects page)
export async function getProjects(page = 1, perPage = 9) {
  // Use the "Projects" category ID from your WordPress
  return await getPostsByCategory(6, page);
}

// Fetch all posts for "Articles" (useful for blog/articles page)
export async function getArticles(page = 1, perPage = 9) {
  // Use the "Articles" category ID from your WordPress
  return await getPostsByCategory(5, page);
}