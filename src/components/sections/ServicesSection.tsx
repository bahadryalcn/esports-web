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
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

interface Service {
  id: number;
  icon: string;
  title: string;
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
  Sparkles
};

export default function ServicesSection({
  title = 'Hizmetlerimiz',
  subtitle = 'Profesyonel e-spor çözümleri',
  selectedServices = [],
  background,
  showBottomCTA = true,
  bottomCTAText = 'Tüm Hizmetlerimizi Gör',
  bottomCTALink = '/services'
}: ServicesSectionProps) {
  
  // Mock services data - In real implementation, this would come from TinaCMS Services Collection
  const allServices = useMemo(() => ({
    'esports-management': {
      serviceId: 'esports-management',
      title: 'E-spor Yönetimi',
      icon: 'Gamepad2',
      description: 'Profesyonel oyuncu ve takım yönetimi hizmetleri',
      features: ['Oyuncu Sözleşmeleri', 'Takım Yönetimi', 'Kariyer Planlama'],
      link: '/services/esports-management'
    },
    'tournament-organization': {
      serviceId: 'tournament-organization',
      title: 'Turnuva Organizasyonu',
      icon: 'Trophy',
      description: 'Ulusal ve uluslararası turnuva organizasyonu',
      features: ['Turnuva Planlama', 'Sponsorluk', 'Yayın Hizmetleri'],
      link: '/services/tournament-organization'
    },
    'streaming-content': {
      serviceId: 'streaming-content',
      title: 'Streaming & İçerik',
      icon: 'Video',
      description: 'Profesyonel streaming ve içerik üretimi',
      features: ['Canlı Yayın', 'İçerik Üretimi', 'Sosyal Medya'],
      link: '/services/streaming-content'
    },
    'coaching-training': {
      serviceId: 'coaching-training',
      title: 'Koçluk & Eğitim',
      icon: 'Users',
      description: 'Oyuncu ve takım gelişimi için koçluk',
      features: ['Bireysel Koçluk', 'Takım Eğitimi', 'Strateji Geliştirme'],
      link: '/services/coaching-training'
    },
    'brand-management': {
      serviceId: 'brand-management',
      title: 'Marka Yönetimi',
      icon: 'Target',
      description: 'Oyuncu ve takım marka yönetimi',
      features: ['Marka Stratejisi', 'Sponsorluk', 'Pazarlama'],
      link: '/services/brand-management'
    },
    'consulting': {
      serviceId: 'consulting',
      title: 'Danışmanlık',
      icon: 'Zap',
      description: 'E-spor sektöründe stratejik danışmanlık',
      features: ['Sektör Analizi', 'Strateji Geliştirme', 'Risk Yönetimi'],
      link: '/services/consulting'
    }
  }), []);

  // Filter services based on selected services
  const validServices = useMemo(() => {
    return selectedServices
      .map(selected => allServices[selected.serviceId as keyof typeof allServices])
      .filter(Boolean);
  }, [selectedServices, allServices]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
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
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      {background?.image && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${background.image})` }}
        />
      )}
      
      {/* Background Overlay */}
      {background?.overlay && background.overlay.opacity && background.overlay.opacity > 0 && (
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: background.overlay.color || 'rgba(0, 0, 0, 0.9)',
            opacity: background.overlay.opacity
          }}
        />
      )}

      {/* Default Background Gradient */}
      {!background?.image && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      )}

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-red-500/10 to-red-700/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-64 h-64 bg-gradient-to-tl from-red-700/10 to-red-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center space-x-2 text-red-400/80 text-sm font-medium mb-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-4 h-4" />
            <span>Professional Gaming Solutions</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl lg:text-7xl font-gaming font-bold mb-6 text-white"
            style={{
              textShadow: "0 0 30px rgba(239, 68, 68, 0.5), 0 0 60px rgba(239, 68, 68, 0.3)",
            }}
          >
            {title}
          </motion.h2>
          
          {subtitle && (
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Services Grid */}
        {validServices.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {validServices.map((service, index: number) => {
              const IconComponent = iconMap[service.icon] || Zap;
              return (
                <motion.div
                  key={`service-${service.serviceId}-${index}`}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl"
                >
                  {/* Animated Background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-gray-900/95 to-black/90 backdrop-blur-xl rounded-2xl border border-gray-700/50"
                    whileHover={{
                      background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))",
                      borderColor: "rgb(239, 68, 68)"
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative p-8">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <motion.div 
                        className="p-5 bg-gradient-to-br from-slate-800/80 to-slate-700/80 rounded-2xl border border-slate-600/30"
                        whileHover={{
                          background: "linear-gradient(135deg, rgba(239, 68, 68, 0.4), rgba(220, 38, 38, 0.4))",
                          scale: 1.1,
                          borderColor: "rgb(239, 68, 68)"
                        }}
                        animate={{
                          boxShadow: [
                            "0 0 0 rgba(239, 68, 68, 0)",
                            "0 0 30px rgba(239, 68, 68, 0.4)",
                            "0 0 0 rgba(239, 68, 68, 0)"
                          ]
                        }}
                        transition={{ 
                          boxShadow: { duration: 3, repeat: Infinity, delay: index * 0.5 },
                          default: { type: "spring", stiffness: 300 }
                        }}
                      >
                        <IconComponent className="w-10 h-10 text-red-400 group-hover:text-white transition-colors" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-6">
                      <motion.h3 
                        className="text-2xl font-gaming font-bold text-white group-hover:text-red-400 transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {service.title}
                      </motion.h3>
                      
                      <p className="text-gray-300 text-base leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-3">
                        {service.features.map((feature: string, featureIndex: number) => (
                          <motion.li
                            key={featureIndex}
                            className="text-gray-200 text-sm flex items-center justify-center space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * featureIndex }}
                          >
                            <motion.div 
                              className="w-2 h-2 bg-red-500 rounded-full"
                              animate={{ 
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 1, 0.7]
                              }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                delay: featureIndex * 0.3 
                              }}
                            />
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          href={service.link}
                          className="group/link inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-slate-800/60 to-slate-700/60 border border-slate-600/50 rounded-xl hover:from-red-600 hover:to-red-700 hover:text-white hover:border-red-500 text-gray-200 transition-all duration-500 font-medium"
                        >
                          <span>Detayları Gör</span>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
              <span className="text-4xl">⚙️</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Henüz Hizmet Eklenmemiş</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Hizmetleriniz burada listelenecek. TinaCMS üzerinden hizmet ekleyebilirsiniz.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        {showBottomCTA && validServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={bottomCTALink}
                className="group relative inline-flex items-center space-x-4 px-10 py-5 text-xl font-gaming font-bold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
                <span className="relative z-10">{bottomCTAText}</span>
                <motion.div
                  className="relative z-10"
                  animate={{ 
                    x: [0, 8, 0],
                    rotate: [0, 15, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}