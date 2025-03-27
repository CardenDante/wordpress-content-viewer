'use client';
import { useState } from 'react';

interface DebugData {
  categoryId: string;
  categorySlug: string;
  data: any;
}

export default function DebugComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [debugData, setDebugData] = useState<DebugData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/debug-wordpress');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setDebugData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg"
      >
        WP Debug
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">WordPress Debug</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4">
              <button
                onClick={fetchCategories}
                disabled={isLoading}
                className="mb-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded disabled:opacity-50"
              >
                {isLoading ? 'Loading...' : 'Fetch WordPress Categories'}
              </button>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              
              {debugData.length > 0 ? (
                <div>
                  <h3 className="font-bold mb-2">Category Information:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {debugData.map((item, index) => (
                      <div key={index} className="border rounded-md p-3">
                        <p><span className="font-semibold">Category ID:</span> {item.categoryId}</p>
                        <p><span className="font-semibold">Slug:</span> {item.categorySlug}</p>
                        <p><span className="font-semibold">Posts:</span> {Array.isArray(item.data) ? item.data.length : 'N/A'}</p>
                        {Array.isArray(item.data) && item.data.length > 0 && (
                          <div className="mt-2">
                            <p className="font-semibold">Recent Posts:</p>
                            <ul className="list-disc pl-5">
                              {item.data.slice(0, 3).map((post: any, i: number) => (
                                <li key={i}>{post.title?.rendered || 'No title'}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Click the button to fetch WordPress data</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}