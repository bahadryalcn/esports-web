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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const client = getTinaClient();
  try {
    const response = await client.queries.homepage(locale);
    const servicesComponent = response.data.homepage.components.find(
      (comp: any) => comp._template === 'services'
    ) as any;
    const title = servicesComponent?.title || 'Hizmetlerimiz';
    const description =
      servicesComponent?.subtitle ||
      'Profesyonel e-spor çözümleri ve hizmetleri';
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

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
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
          features: [
            'Oyuncu Sözleşmeleri',
            'Takım Yönetimi',
            'Kariyer Planlama',
          ],
          link: '/services/esports-management',
        },
        'tournament-organization': {
          serviceId: 'tournament-organization',
          icon: 'Trophy',
          title: 'Turnuva Organizasyonu',
          description: 'Ulusal ve uluslararası turnuva organizasyonu',
          features: ['Turnuva Planlama', 'Sponsorluk', 'Yayın Hizmetleri'],
          link: '/services/tournament-organization',
        },
        'streaming-content': {
          serviceId: 'streaming-content',
          icon: 'Video',
          title: 'Streaming & İçerik',
          description: 'Profesyonel streaming ve içerik üretimi',
          features: ['Canlı Yayın', 'İçerik Üretimi', 'Sosyal Medya'],
          link: '/services/streaming-content',
        },
        'coaching-training': {
          serviceId: 'coaching-training',
          icon: 'Users',
          title: 'Koçluk & Eğitim',
          description: 'Oyuncu ve takım gelişimi için koçluk',
          features: ['Bireysel Koçluk', 'Takım Eğitimi', 'Strateji Geliştirme'],
          link: '/services/coaching-training',
        },
        'brand-management': {
          serviceId: 'brand-management',
          icon: 'Target',
          title: 'Marka Yönetimi',
          description: 'Oyuncu ve takım marka yönetimi',
          features: ['Marka Stratejisi', 'Sponsorluk', 'Pazarlama'],
          link: '/services/brand-management',
        },
        consulting: {
          serviceId: 'consulting',
          icon: 'Zap',
          title: 'Danışmanlık',
          description: 'E-spor sektöründe stratejik danışmanlık',
          features: ['Sektör Analizi', 'Strateji Geliştirme', 'Risk Yönetimi'],
          link: '/services/consulting',
        },
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

      {/* Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {services.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-500/20">
                <span className="text-4xl">⚙️</span>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">
                Henüz Hizmet Eklenmemiş
              </h3>
              <p className="mx-auto mb-8 max-w-md text-gray-400">
                Hizmetlerimiz yakında burada listelenecek. Ana sayfadaki
                hizmetler section'ından hizmet ekleyebilirsiniz.
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
                  Tüm Hizmetlerimiz
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-300">
                  Profesyonel takımlar ve oyuncular için tasarlanmış kapsamlı
                  e-spor çözümleri
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service: Service, index: number) => (
                  <div
                    key={`service-${service.serviceId}-${index}`}
                    className="group overflow-hidden rounded-2xl border border-red-500/30 bg-black/60 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-red-500/50 hover:bg-black/80 hover:shadow-xl"
                  >
                    <div className="flex h-full flex-col p-8">
                      {/* Service Icon */}
                      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/40 to-red-700/40 transition-all duration-300 group-hover:from-red-500/60 group-hover:to-red-700/60">
                        <span className="text-2xl text-red-400 transition-colors group-hover:text-white">
                          ⚙️
                        </span>
                      </div>

                      {/* Service Title */}
                      <h3 className="mb-4 text-center text-xl font-semibold text-white transition-colors duration-300 group-hover:text-red-400">
                        {service.title}
                      </h3>

                      {/* Service Description */}
                      <p className="mb-6 flex-grow text-center text-gray-300">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="mb-6 space-y-2">
                        {service.features.map(
                          (feature: string, featureIndex: number) => (
                            <li
                              key={featureIndex}
                              className="flex items-center space-x-2 text-sm text-gray-400"
                            >
                              <div className="h-2 w-2 rounded-full bg-red-500"></div>
                              <span>{feature}</span>
                            </li>
                          )
                        )}
                      </ul>

                      {/* CTA Button */}
                      <Link
                        href={service.link}
                        className="mt-auto inline-flex items-center justify-center space-x-2 rounded-xl border border-red-500/30 bg-red-600 px-6 py-3 text-white shadow-lg transition-all duration-300 hover:border-red-400 hover:bg-red-700 hover:shadow-xl group-hover:scale-105"
                      >
                        <span>Detayları Gör</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact CTA */}
              <div className="mt-20 text-center">
                <div className="mx-auto max-w-3xl rounded-2xl border border-red-500/30 bg-black/60 p-8 shadow-xl backdrop-blur-md">
                  <h3 className="mb-6 text-3xl font-bold text-white">
                    Başlamaya Hazır mısınız?
                  </h3>
                  <p className="mb-8 text-xl leading-relaxed text-gray-300">
                    Profesyonel e-spor hizmetlerimizin hedeflerinize ulaşmanıza
                    nasıl yardımcı olabileceğini tartışmak için bizimle
                    iletişime geçin. Takım yönetiminden oyuncu gelişimine kadar
                    kapsamlı çözümler sunuyoruz.
                  </p>
                  <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-red-600 to-red-800 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:from-red-700 hover:to-red-900 hover:shadow-xl"
                    >
                      <span>İletişime Geç</span>
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center space-x-2 rounded-xl border-2 border-red-500/50 bg-transparent px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:border-red-400 hover:bg-red-500/10"
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
