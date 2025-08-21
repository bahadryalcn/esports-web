import { Metadata } from 'next';
import { getTinaClient } from '@/lib/tina-client';
import { ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Service {
  serviceId: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  link: string;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const client = getTinaClient();
  try {
    const response = await client.queries.homepage(locale);
    const servicesComponent = response.data.homepage.components.find(
      (comp: any) => comp._template === 'services'
    ) as any;
    const title = servicesComponent?.title || 'Hizmetlerimiz';
    const description = servicesComponent?.subtitle || 'Profesyonel e-spor çözümleri ve hizmetleri';
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
      title: 'Hizmetlerimiz - AIM Agency',
      description: 'Profesyonel e-spor çözümleri ve hizmetleri',
    };
  }
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const client = getTinaClient();
  let services: Service[] = [];
  let pageTitle = 'Hizmetlerimiz';
  let pageSubtitle = 'Profesyonel e-spor çözümleri ve hizmetleri';

  try {
    // Get services from homepage services component
    const homepageResponse = await client.queries.homepage(locale);
    const servicesComponent = homepageResponse.data.homepage.components.find(
      (comp: any) => comp._template === 'services'
    ) as any;
    if (servicesComponent) {
      pageTitle = servicesComponent.title || pageTitle;
      pageSubtitle = servicesComponent.subtitle || pageSubtitle;
      
      // Convert selectedServiceIds to full service objects
      const allServices: Record<string, Service> = {
        'esports-management': {
          serviceId: 'esports-management',
          icon: 'Gamepad2',
          title: 'E-spor Yönetimi',
          description: 'Profesyonel oyuncu ve takım yönetimi hizmetleri',
          features: ['Oyuncu Sözleşmeleri', 'Takım Yönetimi', 'Kariyer Planlama'],
          link: '/services/esports-management'
        },
        'tournament-organization': {
          serviceId: 'tournament-organization',
          icon: 'Trophy',
          title: 'Turnuva Organizasyonu',
          description: 'Ulusal ve uluslararası turnuva organizasyonu',
          features: ['Turnuva Planlama', 'Sponsorluk', 'Yayın Hizmetleri'],
          link: '/services/tournament-organization'
        },
        'streaming-content': {
          serviceId: 'streaming-content',
          icon: 'Video',
          title: 'Streaming & İçerik',
          description: 'Profesyonel streaming ve içerik üretimi',
          features: ['Canlı Yayın', 'İçerik Üretimi', 'Sosyal Medya'],
          link: '/services/streaming-content'
        },
        'coaching-training': {
          serviceId: 'coaching-training',
          icon: 'Users',
          title: 'Koçluk & Eğitim',
          description: 'Oyuncu ve takım gelişimi için koçluk',
          features: ['Bireysel Koçluk', 'Takım Eğitimi', 'Strateji Geliştirme'],
          link: '/services/coaching-training'
        },
        'brand-management': {
          serviceId: 'brand-management',
          icon: 'Target',
          title: 'Marka Yönetimi',
          description: 'Oyuncu ve takım marka yönetimi',
          features: ['Marka Stratejisi', 'Sponsorluk', 'Pazarlama'],
          link: '/services/brand-management'
        },
        'consulting': {
          serviceId: 'consulting',
          icon: 'Zap',
          title: 'Danışmanlık',
          description: 'E-spor sektöründe stratejik danışmanlık',
          features: ['Sektör Analizi', 'Strateji Geliştirme', 'Risk Yönetimi'],
          link: '/services/consulting'
        }
      };
      
      services = (servicesComponent.selectedServices || [])
        .map((selected: any) => allServices[selected.serviceId])
        .filter(Boolean);
    }
  } catch (error) {
    console.error('Error fetching services:', error);
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

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {services.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
                <span className="text-4xl">⚙️</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Henüz Hizmet Eklenmemiş</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Hizmetlerimiz yakında burada listelenecek. Ana sayfadaki hizmetler section'ından hizmet ekleyebilirsiniz.
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
                  Tüm Hizmetlerimiz
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Profesyonel takımlar ve oyuncular için tasarlanmış kapsamlı e-spor çözümleri
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                 {services.map((service: Service, index: number) => (
                   <div
                                           key={`service-${service.serviceId}-${index}`}
                    className="group bg-black/60 backdrop-blur-md rounded-2xl border border-red-500/30 hover:bg-black/80 hover:border-red-500/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
                  >
                    <div className="p-8 h-full flex flex-col">
                      {/* Service Icon */}
                      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-500/40 to-red-700/40 rounded-xl flex items-center justify-center group-hover:from-red-500/60 group-hover:to-red-700/60 transition-all duration-300">
                        <span className="text-red-400 text-2xl group-hover:text-white transition-colors">⚙️</span>
                      </div>

                      {/* Service Title */}
                      <h3 className="text-xl font-semibold text-white mb-4 text-center group-hover:text-red-400 transition-colors duration-300">
                        {service.title}
                      </h3>

                      {/* Service Description */}
                      <p className="text-gray-300 mb-6 text-center flex-grow">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature: string, featureIndex: number) => (
                          <li key={featureIndex} className="text-sm text-gray-400 flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <Link
                        href={service.link}
                        className="mt-auto inline-flex items-center justify-center space-x-2 px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border border-red-500/30 hover:border-red-400 group-hover:scale-105"
                      >
                        <span>Detayları Gör</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="text-center mt-20">
                <div className="p-8 max-w-3xl mx-auto bg-black/60 backdrop-blur-md rounded-2xl border border-red-500/30 shadow-xl">
                  <h3 className="text-3xl font-bold text-white mb-6">
                    Başlamaya Hazır mısınız?
                  </h3>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Profesyonel e-spor hizmetlerimizin hedeflerinize ulaşmanıza nasıl yardımcı olabileceğini
                    tartışmak için bizimle iletişime geçin. Takım yönetiminden oyuncu gelişimine kadar
                    kapsamlı çözümler sunuyoruz.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center space-x-2 px-8 py-4 text-white bg-gradient-to-r from-red-600 to-red-800 rounded-xl hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
                    >
                      <span>İletişime Geç</span>
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center space-x-2 px-8 py-4 text-white bg-transparent border-2 border-red-500/50 rounded-xl hover:bg-red-500/10 hover:border-red-400 transition-all duration-300 font-semibold text-lg"
                    >
                      <span>Hakkımızda</span>
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
