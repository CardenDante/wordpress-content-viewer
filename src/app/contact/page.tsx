import { getPageBySlug, getFeaturedImageFromPage } from '@/app/utils/wordpress';
import PageLayout from '@/app/components/ui/PageLayout';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Contact() {
  const page = await getPageBySlug('contact');
  
  if (!page) {
    notFound();
  }
  
  const featuredImage = getFeaturedImageFromPage(page) || '/images/default-bg.jpeg';
  
  // Breadcrumb
  const breadcrumb = (
    <div className="flex items-center justify-center space-x-2">
      <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
      <span className="text-gray-400">/</span>
      <span className="text-white">Contact</span>
    </div>
  );

  return (
    <PageLayout 
      title={page.title.rendered.replace(/<[^>]*>/g, '')} 
      backgroundImage={featuredImage}
      breadcrumb={breadcrumb}
    >
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content.rendered }}
          />
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold text-[#A86212] mb-6">Send Us a Message</h3>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A86212] focus:ring focus:ring-[#A86212] focus:ring-opacity-20" 
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A86212] focus:ring focus:ring-[#A86212] focus:ring-opacity-20" 
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A86212] focus:ring focus:ring-[#A86212] focus:ring-opacity-20" 
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                id="message" 
                rows={5} 
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#A86212] focus:ring focus:ring-[#A86212] focus:ring-opacity-20" 
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full py-3 px-4 bg-[#A86212] text-white font-medium rounded-md hover:bg-[#8A5210] transition-colors shadow-sm"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
}