import SponsorsSection from '@/components/sections/SponsorsSection';

export default function TestSponsorsPerformancePage() {
  return (
    <div>
      <SponsorsSection />
      {/* Add some content to test scrolling */}
      <div className="h-screen bg-gray-900 flex items-center justify-center">
        <h1 className="text-white text-4xl">Scroll Test Section</h1>
      </div>
      <div className="h-screen bg-gray-800 flex items-center justify-center">
        <h1 className="text-white text-4xl">Another Test Section</h1>
      </div>
    </div>
  );
}
