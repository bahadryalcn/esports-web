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

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const client = getTinaClient();
  
  try {
    const response = await client.queries.homepage(params.locale);
    const sponsorsComponent = response.data.homepage.components.find(
      (comp: any) => comp._template === 'sponsors'
    );
    
    const title = sponsorsComponent?.title || 'Sponsorlarımız';
    const description = sponsorsComponent?.subtitle || 'Bize güvenen ve destekleyen değerli partnerlerimiz';
    
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

export default async function SponsorsPage({ params }: { params: { locale: string } }) {
  const client = getTinaClient();
  let sponsors: Sponsor[] = [];
  let pageTitle = 'Sponsorlarımız';
  let pageSubtitle = 'Bize güvenen ve destekleyen değerli partnerlerimiz';
  
  try {
    const response = await client.queries.homepage(params.locale);
    const sponsorsComponent = response.data.homepage.components.find(
      (comp: any) => comp._template === 'sponsors'
    );
    
    if (sponsorsComponent) {
      // Extract sponsors from TinaCMS reference field structure
      sponsors = sponsorsComponent.selectedSponsors?.map(item => item.sponsor).filter(Boolean) || [];
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
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-gaming font-bold mb-6 text-white">
            {pageTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {pageSubtitle}
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-red-500/30 hover:border-red-400"
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
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <span className="text-4xl">🏢</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Henüz Sponsor Eklenmemiş</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Sponsorlarımız yakında burada listelenecek. Ana sayfadaki sponsorlar section'ından sponsor ekleyebilirsiniz.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Ana Sayfaya Dön</span>
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-gaming font-bold mb-4 text-white">
                  Tüm Sponsorlarımız
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  E-spor dünyasında birlikte büyüdüğümüz değerli iş ortaklarımız
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {sponsors.map((sponsor: Sponsor, index: number) => (
                  <div
                    key={sponsor.id}
                    className="group bg-black/60 backdrop-blur-md rounded-2xl border border-red-500/30 hover:bg-black/80 hover:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
                  >
                    <a
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-6 h-48"
                    >
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        {/* Sponsor Logo */}
                        {sponsor.logo ? (
                          <div className="w-20 h-20 mx-auto mb-4 bg-white/10 rounded-xl flex items-center justify-center p-2 group-hover:bg-white/20 transition-all duration-300">
                            <img 
                              src={sponsor.logo} 
                              alt={sponsor.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-red-500/40 to-red-700/40 rounded-xl flex items-center justify-center group-hover:from-red-500/60 group-hover:to-red-700/60 transition-all duration-300">
                            <span className="text-red-400 text-3xl group-hover:text-white transition-colors">🏢</span>
                          </div>
                        )}
                        
                        {/* Sponsor Name */}
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                          {sponsor.name}
                        </h3>
                        
                        {/* Visit Website */}
                        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 group-hover:text-red-300 transition-colors duration-300">
                          <span>Web Sitesini Ziyaret Et</span>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>

              {/* Partnership CTA */}
              <div className="text-center mt-20">
                <div className="p-8 max-w-3xl mx-auto bg-black/60 backdrop-blur-md rounded-2xl border border-red-500/30 shadow-xl">
                  <h3 className="text-3xl font-bold text-white mb-6">
                    İş Ortağımız Olmak İster misiniz?
                  </h3>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    E-spor dünyasında büyüyen markamızla birlikte büyümek için bizimle iletişime geçin. 
                    Profesyonel ekip yönetimi, oyuncu gelişimi ve turnuva organizasyonu konularında 
                    uzman ekibimizle tanışın.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center space-x-2 px-8 py-4 text-white bg-gradient-to-r from-red-600 to-red-800 rounded-xl hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
                    >
                      <span>İletişime Geç</span>
                    </Link>
                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center space-x-2 px-8 py-4 text-white bg-transparent border-2 border-red-500/50 rounded-xl hover:bg-red-500/10 hover:border-red-400 transition-all duration-300 font-semibold text-lg"
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
