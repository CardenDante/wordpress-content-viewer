import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WordPress Content Viewer',
  description: 'View publications and articles from WordPress',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <header className="bg-[#A86212] text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <a href="/" className="text-2xl font-bold">
                WordPress Content
              </a>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <a href="/" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/all-posts" className="hover:underline">
                      All Posts
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>

          <footer className="bg-[#A86212] text-white p-4">
            <div className="container mx-auto text-center">
              <p>&copy; {new Date().getFullYear()} WordPress Content Viewer</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}