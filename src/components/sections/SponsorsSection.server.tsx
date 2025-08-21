import Link from 'next/link';
import { Sponsor } from '@/types';
import { client } from '../../../tina/__generated__/client';
import SponsorsClient from './SponsorsSection.client';

interface Background {
  image?: string;
  overlay?: {
    color?: string;
    opacity?: number;
  };
}

interface SponsorsSectionProps {
  title?: string;
  subtitle?: string;
  selectedSponsors?: Array<{
    sponsor: Sponsor;
  }>;
  background?: Background;
  showAutoScroll?: boolean;
  autoScrollSpeed?: number;
  viewAllButtonText?: string;
  viewAllButtonLink?: string;
}

async function fetchSponsors(sponsorPaths: string[]): Promise<Sponsor[]> {
  if (!sponsorPaths.length) return [];

  try {
    const sponsorPromises = sponsorPaths.map(async (path) => {
      try {
        // Extract filename from path
        const filename = path.replace('content/sponsors/', '').replace('.json', '');
        
        // Query single sponsor
        const response = await client.queries.sponsors({
          relativePath: `${filename}.json`
        });
        
        return response.data.sponsors;
      } catch (error) {
        console.error(`Error fetching sponsor ${path}:`, error);
        return null;
      }
    });

    const results = await Promise.all(sponsorPromises);
    return results.filter(Boolean) as Sponsor[];
  } catch (error) {
    console.error('Error fetching sponsors:', error);
    return [];
  }
}

export default async function SponsorsSection({
  title = 'Sponsorlarımız',
  subtitle = 'Bize güvenen ve destekleyen değerli partnerlerimiz',
  selectedSponsors = [],
  background,
  showAutoScroll = true,
  autoScrollSpeed = 3000,
  viewAllButtonText = 'Tüm Sponsorlarımız',
  viewAllButtonLink = '/sponsors'
}: SponsorsSectionProps) {
  
  // Extract sponsor paths from selectedSponsors
  const sponsorPaths = selectedSponsors?.map(item => {
    // If sponsor is a string (file path)
    if (typeof item.sponsor === 'string') {
      return item.sponsor;
    }
    // If sponsor is an object with _sys path
    if (item.sponsor && typeof item.sponsor === 'object' && item.sponsor._sys?.path) {
      return item.sponsor._sys.path;
    }
    return null;
  }).filter(Boolean) || [];

  // If no sponsor paths selected, don't show anything
  if (sponsorPaths.length === 0) {
    return null;
  }

  // Fetch sponsors server-side
  const sponsors = await fetchSponsors(sponsorPaths);

  // If no sponsors after fetching, show error state
  if (!sponsors || sponsors.length === 0) {
    return (
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-gaming font-bold mb-6 text-white">
            {title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
          <div className="mt-8 p-8 bg-black/60 backdrop-blur-md rounded-2xl border border-red-500/30">
            <p className="text-gray-400">Sponsorlar yüklenemedi.</p>
          </div>
        </div>
      </section>
    );
  }

  // Pass data to client component for interactivity
  return (
    <SponsorsClient
      title={title}
      subtitle={subtitle}
      sponsors={sponsors}
      background={background}
      showAutoScroll={showAutoScroll}
      autoScrollSpeed={autoScrollSpeed}
      viewAllButtonText={viewAllButtonText}
      viewAllButtonLink={viewAllButtonLink}
    />
  );
}
