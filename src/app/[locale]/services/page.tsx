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

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const client = getTinaClient();
  try {
    const response = await client.queries.homepage(params.locale);
    const servicesComponent = response.data.homepage.components.find(
      (comp: any) => comp._template === 'services'
    );
    const title = servicesComponent?.title || 'Services';
    const description = servicesComponent?.subtitle || 'Professional e-sports solutions and services';
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
      title: 'Services - AIM Agency',
      description: 'Professional e-sports solutions and services',
    };
  }
}

export default async function ServicesPage({ params }: { params: { locale: string } }) {
  const client = getTinaClient();
  let services: Service[] = [];
  let pageTitle = 'Services';
  let pageSubtitle = 'Professional e-sports solutions and services';

  try {
    // Get services from homepage services component
    const homepageResponse = await client.queries.homepage(params.locale);
    const servicesComponent = homepageResponse.data.homepage.components.find(
      (comp: any) => comp._template === 'services'
    );
    if (servicesComponent) {
      pageTitle = servicesComponent.title || pageTitle;
      pageSubtitle = servicesComponent.subtitle || pageSubtitle;
      
      // Convert selectedServiceIds to full service objects
      const allServices: Record<string, Service> = {
        'esports-management': {
          serviceId: 'esports-management',
          icon: 'Gamepad2',
          title: 'E-sports Management',
          description: 'Professional player and team management services',
          features: ['Player Contracts', 'Team Management', 'Career Planning'],
          link: '/services/esports-management'
        },
        'tournament-organization': {
          serviceId: 'tournament-organization',
          icon: 'Trophy',
          title: 'Tournament Organization',
          description: 'National and international tournament organization',
          features: ['Tournament Planning', 'Sponsorship', 'Broadcasting Services'],
          link: '/services/tournament-organization'
        },
        'streaming-content': {
          serviceId: 'streaming-content',
          icon: 'Video',
          title: 'Streaming & Content',
          description: 'Professional streaming and content production',
          features: ['Live Streaming', 'Content Creation', 'Social Media'],
          link: '/services/streaming-content'
        },
        'coaching-training': {
          serviceId: 'coaching-training',
          icon: 'Users',
          title: 'Coaching & Training',
          description: 'Player and team development coaching',
          features: ['Individual Coaching', 'Team Training', 'Strategy Development'],
          link: '/services/coaching-training'
        },
        'brand-management': {
          serviceId: 'brand-management',
          icon: 'Target',
          title: 'Brand Management',
          description: 'Player and team brand management',
          features: ['Brand Strategy', 'Sponsorship', 'Marketing'],
          link: '/services/brand-management'
        },
        'consulting': {
          serviceId: 'consulting',
          icon: 'Zap',
          title: 'Consulting',
          description: 'Strategic consulting in e-sports sector',
          features: ['Sector Analysis', 'Strategy Development', 'Risk Management'],
          link: '/services/consulting'
        }
      };
      
      services = (servicesComponent.selectedServices || [])
        .map(selected => allServices[selected.serviceId])
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
              <span>Back to Homepage</span>
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
              <h3 className="text-2xl font-bold text-white mb-4">No Services Added Yet</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Our services will be listed here soon. You can add services from the services section on the homepage.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Back to Homepage</span>
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-gaming font-bold mb-4 text-white">
                  All Our Services
                </h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Comprehensive e-sports solutions designed for professional teams and players
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
                        <span>Learn More</span>
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
                    Ready to Get Started?
                  </h3>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Contact us to discuss how our professional e-sports services can help you achieve your goals.
                    From team management to player development, we provide comprehensive solutions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center space-x-2 px-8 py-4 text-white bg-gradient-to-r from-red-600 to-red-800 rounded-xl hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold text-lg"
                    >
                      <span>Contact Us</span>
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center space-x-2 px-8 py-4 text-white bg-transparent border-2 border-red-500/50 rounded-xl hover:bg-red-500/10 hover:border-red-400 transition-all duration-300 font-semibold text-lg"
                    >
                      <span>About Us</span>
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
