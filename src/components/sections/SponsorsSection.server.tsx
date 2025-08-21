import Link from 'next/link';
import { Sponsor } from '@/types';
import { client } from '../../../tina/__generated__/client';
import SponsorsClient from './SponsorsSection.client';
import { AlertCircle, Users, Award } from 'lucide-react';

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
    return results.filter(Boolean) as unknown as Sponsor[];
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

  // If no sponsor paths selected, show empty state
  if (sponsorPaths.length === 0) {
    return (
      <section className="relative section-padding overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gaming-darker via-gaming-dark to-gaming-darker" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-red-500/5 to-red-700/3 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 left-20 w-48 h-48 bg-gradient-to-tl from-red-600/4 to-red-400/2 rounded-full blur-2xl animate-pulse" />
        </div>

        <div className="container-gaming relative z-20 text-center">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-responsive-3xl font-gaming font-black text-white mb-4">
              <span className="text-gaming-gradient">{title}</span>
            </h2>
            <p className="text-responsive-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
              {subtitle}
            </p>
            <div className="mx-auto mt-6 h-1 w-32 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full" />
          </div>

          {/* Empty State */}
          <div className="max-w-2xl mx-auto">
            <div className="glass-dark rounded-3xl p-8 lg:p-12 border border-red-500/20">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 glass-red rounded-2xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-red-400" />
                </div>
              </div>
              
              <h3 className="text-xl lg:text-2xl font-gaming font-bold text-white mb-4">
                Henüz Sponsor Seçilmemiş
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Bu bölüm için henüz sponsor seçilmemiş. Lütfen daha sonra tekrar kontrol edin.
              </p>

              <Link
                href="/admin"
                className="btn-gaming-outline inline-flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>Sponsor Ekle</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Fetch sponsors server-side
  const sponsors = await fetchSponsors(sponsorPaths as string[]);

  // If no sponsors after fetching, show error state
  if (!sponsors || sponsors.length === 0) {
    return (
      <section className="relative section-padding overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gaming-darker via-gaming-dark to-gaming-darker" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-red-500/5 to-red-700/3 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-40 left-20 w-48 h-48 bg-gradient-to-tl from-red-600/4 to-red-400/2 rounded-full blur-2xl animate-pulse" />
        </div>

        <div className="container-gaming relative z-20 text-center">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-responsive-3xl font-gaming font-black text-white mb-4">
              <span className="text-gaming-gradient">{title}</span>
            </h2>
            <p className="text-responsive-lg text-gray-200 max-w-4xl mx-auto leading-relaxed">
              {subtitle}
            </p>
            <div className="mx-auto mt-6 h-1 w-32 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full" />
          </div>

          {/* Error State */}
          <div className="max-w-2xl mx-auto">
            <div className="glass-dark rounded-3xl p-8 lg:p-12 border border-red-500/30">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 glass-red rounded-2xl flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
              </div>
              
              <h3 className="text-xl lg:text-2xl font-gaming font-bold text-white mb-4">
                Sponsorlar Yüklenemedi
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Sponsorlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.reload()}
                  className="btn-gaming-primary"
                >
                  Tekrar Dene
                </button>
                
                <Link
                  href="/contact"
                  className="btn-gaming-outline"
                >
                  Destek Al
                </Link>
              </div>
            </div>
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