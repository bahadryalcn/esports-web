import { Metadata } from 'next';
import { getTinaClient } from '@/lib/tina-client';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  website: string;
  description?: string;
}

interface SponsorsPageData {
  seo: {
    title: string;
    description: string;
    image: string;
  };
  sponsors: Sponsor[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const client = getTinaClient();

  try {
    const response = await client.queries.homepage(locale);
    const sponsorsComponent = response.data.homepage.components.find(
      (comp: any) => comp._template === 'sponsors'
    ) as any;

    const title = sponsorsComponent?.title || 'Sponsorlarımız';
    const description =
      sponsorsComponent?.subtitle ||
      'Bize güvenen ve destekleyen değerli partnerlerimiz';

    return {
      title: `${title} - AIM Agency`,
      description,
      openGraph: {
        title: `${title} - AIM Agency`,
        description,
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'Sponsorlarımız - AIM Agency',
      description: 'Bize güvenen ve destekleyen değerli partnerlerimiz',
    };
  }
}

export default async function SponsorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const client = getTinaClient();
  let sponsors: Sponsor[] = [];
  let pageTitle = 'Sponsorlarımız';
  let pageSubtitle = 'Bize güvenen ve destekleyen değerli partnerlerimiz';

  try {
    const response = await client.queries.homepage(locale);
    const sponsorsComponent = response.data.homepage.components.find(
      (comp: any) => comp._template === 'sponsors'
    ) as any;

    if (sponsorsComponent) {
      // Extract sponsors from TinaCMS reference field structure
      sponsors =
        sponsorsComponent.selectedSponsors
          ?.map((item: any) => item.sponsor)
          .filter(Boolean) || [];
      pageTitle = sponsorsComponent.title || pageTitle;
      pageSubtitle = sponsorsComponent.subtitle || pageSubtitle;
    }
  } catch (error) {
    console.error('Error fetching sponsors:', error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-red-800/20"></div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h1 className="mb-6 font-gaming text-4xl font-bold text-white md:text-6xl">
            {pageTitle}
          </h1>
          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-300 md:text-2xl">
            {pageSubtitle}
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center space-x-2 rounded-xl border border-red-500/30 bg-red-600 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:border-red-400 hover:bg-red-700 hover:shadow-xl"
            >
              <span>Ana Sayfaya Dön</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {sponsors.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/20">
                <span className="text-4xl">🏢</span>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">
                Henüz Sponsor Eklenmemiş
              </h3>
              <p className="mx-auto mb-8 max-w-md text-gray-400">
                Sponsorlarımız yakında burada listelenecek. Ana sayfadaki
                sponsorlar section'ından sponsor ekleyebilirsiniz.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center space-x-2 rounded-xl bg-red-600 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:bg-red-700 hover:shadow-xl"
              >
                <span>Ana Sayfaya Dön</span>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-16 text-center">
                <h2 className="mb-4 font-gaming text-3xl font-bold text-white md:text-4xl">
                  Tüm Sponsorlarımız
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-300">
                  E-spor dünyasında birlikte büyüdüğümüz değerli iş ortaklarımız
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {sponsors.map((sponsor: Sponsor, index: number) => (
                  <div
                    key={sponsor.id}
                    className="group overflow-hidden rounded-2xl border border-red-500/30 bg-black/60 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-red-500/50 hover:bg-black/80 hover:shadow-xl"
                  >
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-48 p-6"
                    >
                      <div className="flex h-full flex-col items-center justify-center text-center">
                        {/* Sponsor Logo */}
                        {sponsor.logo ? (
                          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-white/10 p-2 transition-all duration-300 group-hover:bg-white/20">
                            <img
                              src={sponsor.logo}
                              alt={sponsor.name}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/40 to-red-700/40 transition-all duration-300 group-hover:from-red-500/60 group-hover:to-red-700/60">
                            <span className="text-3xl text-red-400 transition-colors group-hover:text-white">
                              🏢
                            </span>
                          </div>
                        )}

                        {/* Sponsor Name */}
                        <h3 className="mb-2 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-red-400">
                          {sponsor.name}
                        </h3>

                        {/* Visit Website */}
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 transition-colors duration-300 group-hover:text-red-300">
                          <span>Web Sitesini Ziyaret Et</span>
                          <ExternalLink className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              {/* Partnership CTA */}
              <div className="mt-20 text-center">
                <div className="mx-auto max-w-3xl rounded-2xl border border-red-500/30 bg-black/60 p-8 shadow-xl backdrop-blur-md">
                  <h3 className="mb-6 text-3xl font-bold text-white">
                    İş Ortağımız Olmak İster misiniz?
                  </h3>
                  <p className="mb-8 text-xl leading-relaxed text-gray-300">
                    E-spor dünyasında büyüyen markamızla birlikte büyümek için
                    bizimle iletişime geçin. Profesyonel ekip yönetimi, oyuncu
                    gelişimi ve turnuva organizasyonu konularında uzman
                    ekibimizle tanışın.
                  </p>
                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-red-700 hover:to-red-900 hover:shadow-xl"
                    >
                      <span>İletişime Geç</span>
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center space-x-2 rounded-xl border-2 border-red-500/50 bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:border-red-400 hover:bg-red-500/10"
                    >
                      <span>Hizmetlerimizi İncele</span>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
