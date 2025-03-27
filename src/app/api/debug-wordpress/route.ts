import { NextResponse } from 'next/server';

// Replace with your actual WordPress site URL
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://cms.crdd-kenya.org/wp-json/wp/v2';

async function getCategories() {
  const response = await fetch(`${WORDPRESS_API_URL}/categories?per_page=100`, {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }
  
  return await response.json();
}

async function getPostsByCategory(categoryId: number) {
  const response = await fetch(`${WORDPRESS_API_URL}/posts?categories=${categoryId}&per_page=5&_embed=wp:featuredmedia,wp:term`, {
    cache: 'no-store'
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch posts for category ${categoryId}: ${response.status}`);
  }
  
  return await response.json();
}

export async function GET() {
  try {
    // Fetch all categories
    const categories = await getCategories();
    
    // Create debug data structure
    const debugData = [];
    
    // Find team, projects, and articles categories by trying common slugs
    const teamSlugs = ['our-team', 'team', 'staff', 'members'];
    const projectSlugs = ['projects', 'our-projects', 'project'];
    const articleSlugs = ['articles', 'blog', 'posts', 'news'];
    
    // Find categories using different possible slugs
    const teamCat = categories.find((cat: any) => 
      teamSlugs.includes(cat.slug) || cat.name.toLowerCase().includes('team'));
    
    const projectsCat = categories.find((cat: any) => 
      projectSlugs.includes(cat.slug) || cat.name.toLowerCase().includes('project'));
    
    const articlesCat = categories.find((cat: any) => 
      articleSlugs.includes(cat.slug) || cat.name.toLowerCase().includes('article'));
    
    // Fetch posts for each category and add to debug data
    if (teamCat) {
      const teamPosts = await getPostsByCategory(teamCat.id);
      debugData.push({
        categoryId: teamCat.id,
        categorySlug: teamCat.slug,
        categoryName: teamCat.name,
        data: teamPosts
      });
    }
    
    if (projectsCat) {
      const projectsPosts = await getPostsByCategory(projectsCat.id);
      debugData.push({
        categoryId: projectsCat.id,
        categorySlug: projectsCat.slug,
        categoryName: projectsCat.name,
        data: projectsPosts
      });
    }
    
    if (articlesCat) {
      const articlesPosts = await getPostsByCategory(articlesCat.id);
      debugData.push({
        categoryId: articlesCat.id,
        categorySlug: articlesCat.slug,
        categoryName: articlesCat.name,
        data: articlesPosts
      });
    }
    
    // Also include ALL categories with their post counts
    debugData.push({
      categoryId: 'all',
      categorySlug: 'all',
      categoryName: 'All Categories',
      data: categories.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        count: cat.count
      }))
    });
    
    return NextResponse.json(debugData);
  } catch (error) {
    console.error('API Debug error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}