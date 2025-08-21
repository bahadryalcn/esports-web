import HeroSection from '@/components/sections/HeroSection';

export default function TestPerformancePage() {
  return (
    <div>
      <HeroSection />
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
