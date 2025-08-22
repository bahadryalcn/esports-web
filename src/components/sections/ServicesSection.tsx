'use client';

import { motion } from 'framer-motion';
import {
  Gamepad2,
  Trophy,
  Users,
  Video,
  Target,
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState, useEffect, useCallback } from 'react';
import {
  useAdvancedParallax,
  useMultiLayerParallax,
} from '@/lib/hooks/useAdvancedParallax';

interface Service {
  serviceId: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  link: string;
}

interface Background {
  image?: string;
  overlay?: {
    color?: string;
    opacity?: number;
  };
}

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  selectedServices?: Array<{
    serviceId: string;
    serviceTitle?: string;
  }>;
  background?: Background;
  showBottomCTA?: boolean;
  bottomCTAText?: string;
  bottomCTALink?: string;
}

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Gamepad2,
  Trophy,
  Video,
  Users,
  Target,
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle,
};

export default function ServicesSection({
  title = 'Hizmetlerimiz',
  subtitle = 'Profesyonel e-spor çözümleri ile başarıya giden yolda yanınızdayız',
  selectedServices = [],
  background,
  showBottomCTA = true,
  bottomCTAText = 'Tüm Hizmetlerimizi Gör',
  bottomCTALink = '/services',
}: ServicesSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const finalBackgroundImage = background?.image || null;

  // Optimized parallax layers for services section
  const parallaxLayers = useMemo(
    () => [
      { speed: 0.2, direction: 'up' as const, easing: 'ease-out' as const },
      { speed: 0.4, direction: 'up' as const, easing: 'ease-out' as const },
      { speed: 0.1, direction: 'down' as const, easing: 'linear' as const },
    ],
    []
  );

  const { ref: parallaxRef, offsets } = useMultiLayerParallax(parallaxLayers);
  const { ref: titleRef, offset: titleOffset } = useAdvancedParallax({
    speed: 0.3,
    direction: 'up',
  });

  // Optimized image loading with intersection observer
  useEffect(() => {
    if (!finalBackgroundImage) {
      setImageLoaded(true);
      return;
    }

    setImageLoaded(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          const img = new Image();
          img.onload = () => setImageLoaded(true);
          img.onerror = () => setImageLoaded(false);
          img.src = finalBackgroundImage;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (parallaxRef.current) {
      observer.observe(parallaxRef.current);
    }

    return () => observer.disconnect();
  }, [finalBackgroundImage, parallaxRef]);

  // Mock services data - In real implementation, this would come from TinaCMS Services Collection
  const allServices = useMemo(
    () => ({
      'esports-management': {
        serviceId: 'esports-management',
        title: 'E-spor Yönetimi',
        icon: 'Gamepad2',
        description:
          'Profesyonel oyuncu ve takım yönetimi hizmetleri ile e-spor kariyerinizi zirveye taşıyın',
        features: [
          'Oyuncu Sözleşmeleri',
          'Takım Yönetimi',
          'Kariyer Planlama',
          'Performance Analizi',
        ],
        link: '/services/esports-management',
      },
      'tournament-organization': {
        serviceId: 'tournament-organization',
        title: 'Turnuva Organizasyonu',
        icon: 'Trophy',
        description:
          'Ulusal ve uluslararası turnuva organizasyonu ile unutulmaz e-spor etkinlikleri',
        features: [
          'Turnuva Planlama',
          'Sponsorluk Yönetimi',
          'Yayın Hizmetleri',
          'Ödül Sistemi',
        ],
        link: '/services/tournament-organization',
      },
      'streaming-content': {
        serviceId: 'streaming-content',
        title: 'Streaming & İçerik',
        icon: 'Video',
        description:
          'Profesyonel streaming ve içerik üretimi ile kitleye ulaşın',
        features: [
          'Canlı Yayın',
          'İçerik Üretimi',
          'Sosyal Medya',
          'Marka İşbirlikleri',
        ],
        link: '/services/streaming-content',
      },
      'coaching-training': {
        serviceId: 'coaching-training',
        title: 'Koçluk & Eğitim',
        icon: 'Users',
        description: 'Oyuncu ve takım gelişimi için uzman koçluk hizmetleri',
        features: [
          'Bireysel Koçluk',
          'Takım Eğitimi',
          'Strateji Geliştirme',
          'Mental Hazırlık',
        ],
        link: '/services/coaching-training',
      },
      'brand-management': {
        serviceId: 'brand-management',
        title: 'Marka Yönetimi',
        icon: 'Target',
        description:
          'Oyuncu ve takım marka yönetimi ile kişisel değerinizi artırın',
        features: [
          'Marka Stratejisi',
          'Sponsorluk Anlaşmaları',
          'Pazarlama Kampanyaları',
          'İmaj Yönetimi',
        ],
        link: '/services/brand-management',
      },
      consulting: {
        serviceId: 'consulting',
        title: 'Danışmanlık',
        icon: 'Zap',
        description:
          'E-spor sektöründe stratejik danışmanlık ile doğru adımları atın',
        features: [
          'Sektör Analizi',
          'Strateji Geliştirme',
          'Risk Yönetimi',
          'Yatırım Danışmanlığı',
        ],
        link: '/services/consulting',
      },
    }),
    []
  );

  // Filter services based on selected services
  const validServices = useMemo(() => {
    if (selectedServices.length === 0) {
      // If no services selected, show all
      return Object.values(allServices);
    }
    return selectedServices
      .map(
        (selected) =>
          allServices[selected.serviceId as keyof typeof allServices]
      )
      .filter(Boolean);
  }, [selectedServices, allServices]);

  // Check if overlay should be shown
  const shouldShowOverlay =
    background?.overlay &&
    background.overlay.opacity !== undefined &&
    background.overlay.opacity > 0;

  return (
    <section
      ref={parallaxRef}
      className="section-padding relative overflow-hidden will-change-transform"
    >
      {/* Optimized Background Layer with Parallax */}
      <div className="absolute inset-0">
        {/* Background Image with Parallax */}
        {finalBackgroundImage && (
          <motion.div
            className="absolute inset-0 h-full w-full transform-gpu bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${finalBackgroundImage}")`,
              transform: `translate3d(0, ${offsets[0] || 0}px, 0)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        {/* Optimized Fallback Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gaming-darker/20 via-gaming-dark/10 to-gaming-darker/20" />

        {/* Custom Overlay */}
        {shouldShowOverlay && (
          <motion.div
            className="absolute inset-0 z-10"
            style={{
              backgroundColor: background?.overlay?.color || '#000000',
              opacity: background?.overlay?.opacity ? Math.min(background.overlay.opacity, 0.4) : 0.3,
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: background?.overlay?.opacity ? Math.min(background.overlay.opacity, 0.4) : 0.3,
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        )}

        {/* Default Overlay - çok hafif */}
        {!shouldShowOverlay && (
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/25 via-transparent to-black/15" />
        )}

        {/* Optimized Animated Elements with Parallax */}
        <motion.div
          className="z-5 absolute inset-0 will-change-transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          style={{
            transform: `translate3d(0, ${offsets[1] || 0}px, 0)`,
          }}
        >
          {/* Optimized Gaming Orbs */}
          <div
            className="from-red-500/6 to-red-700/3 absolute right-20 top-20 h-64 w-64 animate-float rounded-full bg-gradient-to-br backdrop-blur-sm"
            style={{ animationDuration: '8s' }}
          />
          <div
            className="from-red-600/4 to-red-400/2 absolute bottom-40 left-20 h-48 w-48 animate-float rounded-full bg-gradient-to-tl backdrop-blur-sm"
            style={{ animationDuration: '10s', animationDelay: '2s' }}
          />
        </motion.div>

        {/* Geometric Elements with Counter-Parallax */}
        <motion.div
          className="z-5 absolute inset-0 will-change-transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          style={{
            transform: `translate3d(0, ${offsets[2] || 0}px, 0)`,
          }}
        >
          <div className="glass-effect absolute left-32 top-32 h-24 w-24 rounded-full border border-red-500/15" />
          <div className="absolute bottom-32 right-32 h-20 w-20 rounded-full border border-red-400/10 glass-red" />
        </motion.div>
      </div>

      <div className="container-gaming relative z-20">
        {/* Section Header with Parallax */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 text-center will-change-transform lg:mb-16"
          style={{
            transform: `translate3d(0, ${titleOffset.y}px, 0)`,
          }}
        >
          {/* Gaming Badge */}
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 glass-red"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Sparkles className="h-4 w-4 text-red-400" />
            <span className="text-sm font-medium text-red-300">
              Professional Gaming Solutions
            </span>
            <Sparkles className="h-4 w-4 text-red-400" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-responsive-3xl mb-4 font-gaming font-black text-white lg:mb-6"
          >
            <span className="text-gaming-gradient">{title}</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="text-responsive-lg gaming-text-shadow mx-auto max-w-4xl px-4 leading-relaxed text-gray-200"
          >
            {subtitle}
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="mx-auto mt-6 h-1 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '150px', opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.div>

        {/* Optimized Services Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mb-16 lg:gap-8 xl:grid-cols-3">
          {validServices.map((service, index) => (
            <motion.div
              key={service.serviceId}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, margin: '-50px' }}
              className="group relative"
            >
              {/* Optimized Service Card */}
              <div className="h-full transform-gpu rounded-3xl border border-red-500/20 p-6 transition-all duration-300 glass-dark hover:-translate-y-2 hover:scale-105 hover:border-red-400/40 group-hover:glass-red lg:p-8">
                {/* Service Icon */}
                <motion.div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 glass-red group-hover:bg-gaming-gradient lg:h-20 lg:w-20"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  {(() => {
                    const IconComponent = iconMap[service.icon];
                    return IconComponent ? (
                      <IconComponent className="h-8 w-8 text-red-400 transition-colors duration-300 group-hover:text-white lg:h-10 lg:w-10" />
                    ) : null;
                  })()}
                </motion.div>

                {/* Service Title */}
                <h3 className="group-hover:text-gaming mb-4 font-gaming text-xl font-bold text-white transition-colors duration-300 lg:text-2xl">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="mb-6 text-sm leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-200 lg:text-base">
                  {service.description}
                </p>

                {/* Service Features */}
                <ul className="mb-8 space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center text-gray-400 transition-colors duration-300 group-hover:text-gray-300"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + featureIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle className="mr-3 h-4 w-4 flex-shrink-0 text-red-500" />
                      <span className="text-sm lg:text-base">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Service Link */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-2 font-medium text-red-400 transition-all duration-300 hover:text-red-300 group-hover:gap-3"
                  >
                    <span className="text-sm lg:text-base">Detayları Gör</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>

                {/* Card Background Glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optimized Bottom CTA Section */}
        {showBottomCTA && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center"
          >
            {/* CTA Container */}
            <div className="mx-auto max-w-3xl">
              <div className="rounded-3xl border border-red-500/20 p-8 glass-dark lg:p-12">
                {/* CTA Header */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl glass-red">
                    <Zap className="h-8 w-8 text-red-400" />
                  </div>

                  <h3 className="mb-4 font-gaming text-2xl font-bold text-white lg:text-3xl">
                    Profesyonel Hizmetlerimizi Keşfedin
                  </h3>

                  <p className="leading-relaxed text-gray-300">
                    E-spor dünyasında başarılı olmanız için gereken tüm
                    hizmetleri tek çatı altında sunuyoruz.
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={bottomCTALink}
                      className="btn-gaming-primary inline-flex items-center gap-3"
                    >
                      <Trophy className="h-5 w-5" />
                      <span>{bottomCTAText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/contact"
                      className="btn-gaming-outline inline-flex items-center gap-3"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Ücretsiz Danışmanlık</span>
                    </Link>
                  </motion.div>
                </div>

                {/* Trust indicators */}
                <motion.div
                  className="mt-8 grid grid-cols-1 gap-4 border-t border-red-500/20 pt-6 sm:grid-cols-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-center">
                    <div className="mb-1 text-xl font-black text-red-400 lg:text-2xl">
                      50+
                    </div>
                    <div className="text-sm text-gray-400">Başarılı Proje</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-xl font-black text-red-400 lg:text-2xl">
                      24/7
                    </div>
                    <div className="text-sm text-gray-400">Destek Hizmeti</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-xl font-black text-red-400 lg:text-2xl">
                      100%
                    </div>
                    <div className="text-sm text-gray-400">
                      Müşteri Memnuniyeti
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
