'use client';

import { motion } from 'framer-motion';

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  website: string;
}

interface SponsorsSectionProps {
  title?: string;
  subtitle?: string;
}

export default function SponsorsSection({
  title = 'Sponsorlarımız',
  subtitle = 'Bize güvenen ve destekleyen değerli partnerlerimiz'
}: SponsorsSectionProps) {
  // Mock sponsor data - will be replaced with dynamic content
  const sponsors: Sponsor[] = [
    {
      id: 1,
      name: 'TechGear Pro',
      logo: '/assets/sponsors/sponsor-1.png',
      website: 'https://techgearpro.com'
    },
    {
      id: 2,
      name: 'Gaming Hub',
      logo: '/assets/sponsors/sponsor-2.png',
      website: 'https://gaminghub.com'
    },
    {
      id: 3,
      name: 'E-Sports Arena',
      logo: '/assets/sponsors/sponsor-3.png',
      website: 'https://esportsarena.com'
    },
    {
      id: 4,
      name: 'Digital World',
      logo: '/assets/sponsors/sponsor-4.png',
      website: 'https://digitalworld.com'
    },
    {
      id: 5,
      name: 'Game Studio',
      logo: '/assets/sponsors/sponsor-5.png',
      website: 'https://gamestudio.com'
    },
    {
      id: 6,
      name: 'Cyber League',
      logo: '/assets/sponsors/sponsor-6.png',
      website: 'https://cyberleague.com'
    }
  ];

  return (
    <section className="section-padding bg-gaming-darker">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-gaming font-bold mb-6">
            <span className="text-gaming-primary">Sponsorlarımız</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Güvenilir iş ortaklarımız ile birlikte e-spor dünyasında büyüyoruz.
          </p>
        </motion.div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {sponsors.map((sponsor: Sponsor, index: number) => (
            <motion.div
              key={sponsor.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block gaming-card p-6 h-32 group-hover:scale-105 transition-all duration-300"
              >
                <div className="h-full flex items-center justify-center">
                  {/* Placeholder for sponsor logo */}
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-gaming-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-gaming-primary text-2xl">🏢</span>
                    </div>
                    <span className="text-gray-400 text-sm group-hover:text-gaming-primary transition-colors duration-300">
                      {sponsor.name}
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Partnership CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="gaming-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              İş Ortağımız Olmak İster misiniz?
            </h3>
            <p className="text-gray-400 mb-6">
              E-spor dünyasında büyüyen markamızla birlikte büyümek için bizimle iletişime geçin.
            </p>
            <a
              href="/contact"
              className="gaming-button inline-flex items-center space-x-2 group"
            >
              <span>İletişime Geç</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}