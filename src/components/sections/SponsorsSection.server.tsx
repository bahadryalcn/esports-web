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
        const filename = path
          .replace('content/sponsors/', '')
          .replace('.json', '');

        // Query single sponsor
        const response = await client.queries.sponsors({
          relativePath: `${filename}.json`,
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
  viewAllButtonLink = '/sponsors',
}: SponsorsSectionProps) {
  // Extract sponsor paths from selectedSponsors
  const sponsorPaths =
    selectedSponsors
      ?.map((item) => {
        // If sponsor is a string (file path)
        if (typeof item.sponsor === 'string') {
          return item.sponsor;
        }
        // If sponsor is an object with _sys path
        if (
          item.sponsor &&
          typeof item.sponsor === 'object' &&
          item.sponsor._sys?.path
        ) {
          return item.sponsor._sys.path;
        }
        return null;
      })
      .filter(Boolean) || [];

  // If no sponsor paths selected, show empty state
  if (sponsorPaths.length === 0) {
    return (
      <section className="section-padding relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gaming-darker via-gaming-dark to-gaming-darker" />

        {/* Floating Elements - Optimized for performance */}
        <div className="absolute inset-0">
          <div className="to-red-700/3 absolute right-20 top-20 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-red-500/5 blur-lg" />
          <div className="from-red-600/4 to-red-400/2 absolute bottom-40 left-20 h-48 w-48 animate-pulse rounded-full bg-gradient-to-tl blur-md" />
        </div>

        <div className="container-gaming relative z-20 text-center">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-responsive-3xl mb-4 font-gaming font-black text-white">
              <span className="text-gaming-gradient">{title}</span>
            </h2>
            <p className="text-responsive-lg mx-auto max-w-4xl leading-relaxed text-gray-200">
              {subtitle}
            </p>
            <div className="mx-auto mt-6 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          </div>

          {/* Empty State */}
          <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-red-500/20 p-8 glass-dark lg:p-12">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl glass-red">
                  <Users className="h-8 w-8 text-red-400" />
                </div>
              </div>

              <h3 className="mb-4 font-gaming text-xl font-bold text-white lg:text-2xl">
                Henüz Sponsor Seçilmemiş
              </h3>

              <p className="mb-6 leading-relaxed text-gray-300">
                Bu bölüm için henüz sponsor seçilmemiş. Lütfen daha sonra tekrar
                kontrol edin.
              </p>

              <Link
                href="/admin"
                className="btn-gaming-outline inline-flex items-center gap-2"
              >
                <Award className="h-4 w-4" />
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
      <section className="section-padding relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gaming-darker via-gaming-dark to-gaming-darker" />

        {/* Floating Elements - Optimized for performance */}
        <div className="absolute inset-0">
          <div className="to-red-700/3 absolute right-20 top-20 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-red-500/5 blur-lg" />
          <div className="from-red-600/4 to-red-400/2 absolute bottom-40 left-20 h-48 w-48 animate-pulse rounded-full bg-gradient-to-tl blur-md" />
        </div>

        <div className="container-gaming relative z-20 text-center">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-responsive-3xl mb-4 font-gaming font-black text-white">
              <span className="text-gaming-gradient">{title}</span>
            </h2>
            <p className="text-responsive-lg mx-auto max-w-4xl leading-relaxed text-gray-200">
              {subtitle}
            </p>
            <div className="mx-auto mt-6 h-1 w-32 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent" />
          </div>

          {/* Error State */}
          <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-red-500/30 p-8 glass-dark lg:p-12">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl glass-red">
                  <AlertCircle className="h-8 w-8 text-red-400" />
                </div>
              </div>

              <h3 className="mb-4 font-gaming text-xl font-bold text-white lg:text-2xl">
                Sponsorlar Yüklenemedi
              </h3>

              <p className="mb-6 leading-relaxed text-gray-300">
                Sponsorlar yüklenirken bir hata oluştu. Lütfen daha sonra tekrar
                deneyin.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button
                  onClick={() => window.location.reload()}
                  className="btn-gaming-primary"
                >
                  Tekrar Dene
                </button>

                <Link href="/contact" className="btn-gaming-outline">
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
