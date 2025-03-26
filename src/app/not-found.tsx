import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-2xl font-bold mb-4 text-[#A86212]">Not Found</h1>
      <p className="mb-6">The resource you're looking for doesn't exist or has been removed.</p>
      <Link href="/" className="bg-[#A86212] text-white px-4 py-2 rounded hover:bg-[#8A5210]">
        Return to Home
      </Link>
    </div>
  );
}