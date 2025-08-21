import SponsorsSection from '@/components/sections/SponsorsSection';

export default function TestSponsorsPerformancePage() {
  return (
    <div>
      <SponsorsSection />
      {/* Add some content to test scrolling */}
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <h1 className="text-4xl text-white">Scroll Test Section</h1>
      </div>
      <div className="flex h-screen items-center justify-center bg-gray-800">
        <h1 className="text-4xl text-white">Another Test Section</h1>
      </div>
    </div>
  );
}
