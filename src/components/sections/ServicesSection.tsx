'use client';

import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Trophy, 
  Users, 
  Video, 
  Target, 
  Zap,
  ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  link: string;
}

import type { Variants } from 'framer-motion';

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
}

export default function ServicesSection({
  title = 'Hizmetlerimiz',
  subtitle = 'Profesyonel e-spor çözümleri'
}: ServicesSectionProps) {
  const services: Service[] = [
    {
      icon: Gamepad2,
      title: 'E-spor Yönetimi',
      description: 'Profesyonel oyuncu ve takım yönetimi hizmetleri',
      features: ['Oyuncu Sözleşmeleri', 'Takım Yönetimi', 'Kariyer Planlama'],
      link: '/services/esports'
    },
    {
      icon: Trophy,
      title: 'Turnuva Organizasyonu',
      description: 'Ulusal ve uluslararası turnuva organizasyonu',
      features: ['Turnuva Planlama', 'Sponsorluk', 'Yayın Hizmetleri'],
      link: '/services/tournaments'
    },
    {
      icon: Video,
      title: 'Streaming & İçerik',
      description: 'Profesyonel streaming ve içerik üretimi',
      features: ['Canlı Yayın', 'İçerik Üretimi', 'Sosyal Medya'],
      link: '/services/streaming'
    },
    {
      icon: Users,
      title: 'Koçluk & Eğitim',
      description: 'Oyuncu ve takım gelişimi için koçluk',
      features: ['Bireysel Koçluk', 'Takım Eğitimi', 'Strateji Geliştirme'],
      link: '/services/coaching'
    },
    {
      icon: Target,
      title: 'Marka Yönetimi',
      description: 'Oyuncu ve takım marka yönetimi',
      features: ['Marka Stratejisi', 'Sponsorluk', 'Pazarlama'],
      link: '/services/branding'
    },
    {
      icon: Zap,
      title: 'Danışmanlık',
      description: 'E-spor sektöründe stratejik danışmanlık',
      features: ['Sektör Analizi', 'Strateji Geliştirme', 'Risk Yönetimi'],
      link: '/services/consulting'
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="section-padding bg-gaming-dark/50">
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
            <span className="text-gaming-primary">{title}</span>
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service: Service, index: number) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="gaming-card p-8 group hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gaming-primary/20 rounded-xl group-hover:bg-gaming-primary/30 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-gaming-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-gaming-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature: string, featureIndex: number) => (
                      <li
                        key={featureIndex}
                        className="text-gray-300 text-sm flex items-center justify-center space-x-2"
                      >
                        <div className="w-1.5 h-1.5 bg-gaming-primary rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={service.link}
                    className="inline-flex items-center space-x-2 text-gaming-primary hover:text-white transition-colors duration-300 group/link"
                  >
                    <span className="text-sm font-medium">Detayları Gör</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/services"
            className="gaming-button inline-flex items-center space-x-2 group"
          >
            <span>Tüm Hizmetlerimizi Gör</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}