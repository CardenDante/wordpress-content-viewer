import type { Metadata } from 'next'; 
import './globals.css'; 
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';
import PageTransition from './components/ui/PageTransition';

export const metadata: Metadata = {   
  title: 'CRDD - Centre for Research in Drylands Development',   
  description: 'Sustainable development solutions for drylands communities in Kenya',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};  

export default function RootLayout({   
  children, 
}: {   
  children: React.ReactNode; 
}) {   
  return (     
    <html lang="en" className="scroll-smooth">       
      <body className="min-h-screen flex flex-col bg-white text-gray-800 overflow-x-hidden">         
        <Navbar />         
        <main className="flex-grow pt-20">
          <PageTransition>
            {children}
          </PageTransition>        
        </main>         
        <Footer />       
      </body>     
    </html>   
  ); 
}