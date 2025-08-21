'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ContactBackground } from './components/ContactBackground';
import { ContactForm } from './components/ContactForm';
import { ContactInfo } from './components/ContactInfo';
import { useContactInfo } from './hooks/useContactInfo';
import { useAdvancedParallax, useMultiLayerParallax } from '@/lib/hooks/useAdvancedParallax';
import { ContactSectionProps } from './types';

export default function ContactSection({
  title = 'İletişim',
  subtitle = 'Profesyonel e-spor hizmetleri için bizimle iletişime geçin ve projelerinizi hayata geçirelim.',
  showForm = true,
  backgroundImage,
  overlay,
  backgroundVariant = 'default',
  contentAlignment = 'left',
  contactInfo: customContactInfo,
  formTitle = 'Mesaj Gönder',
  formSubtitle = 'Proje detaylarınızı bizimle paylaşın',
  infoTitle = 'İletişim Bilgileri',
  infoSubtitle = 'Profesyonel e-spor hizmetleri için bizimle iletişime geçin.',
  mapTitle = 'Konumumuz',
  showMap = true,
  className = ''
}: ContactSectionProps) {
  // Use custom contact info or default ones
  const contactInfo = useContactInfo(customContactInfo);

  // Multi-layer parallax for background elements
  const { ref: parallaxRef, offsets } = useMultiLayerParallax([
    { speed: 0.2, direction: 'up' },    // Background image
    { speed: 0.4, direction: 'up' },    // Gradient elements
    { speed: 0.1, direction: 'down' }   // Subtle elements
  ]);

  // Advanced parallax for content
  const { ref: contentRef, offset: contentOffset } = useAdvancedParallax({
    speed: 0.3,
    direction: 'up',
    easing: 'ease-out'
  });

  const handleFormSubmit = async (formData: { name: string; email: string; subject: string; message: string }) => {
    // Form submission logic - can be customized via props
    console.log('Contact form submitted:', formData);
    // Here you could integrate with email service, API, etc.
  };

  return (
    <section 
      className="relative py-16 lg:py-24 overflow-hidden" 
      ref={parallaxRef}
      style={{ zIndex: 10 }} // Z-index eklendi
    >
      {/* Background Container */}
      <ContactBackground 
        variant={backgroundVariant}
        backgroundImage={backgroundImage}
        overlay={overlay}
        parallaxOffsets={offsets}
      />

      {/* Main Content - Hero-style layout with Parallax */}
      <AnimatePresence mode="wait">
        <motion.div 
          ref={contentRef}
          className="relative z-10 container mx-auto px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mb-16 text-center transform-gpu"
            style={{
              transform: `translate3d(0, ${contentOffset.y * 1.5}px, 0)`,
              marginTop: '2rem' // Üst margin eklendi
            }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-gaming font-bold text-white leading-tight mb-6">
              <span className="text-gaming-primary">{title}</span>
            </h2>
            {subtitle && (
              <p className={`text-lg md:text-xl text-gray-200 font-display leading-relaxed ${contentAlignment === 'center' ? 'max-w-4xl mx-auto' : 'max-w-4xl'}`}>
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Contact Content Grid - Side by side layout with Parallax */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Sol: Contact Info - Minimalist with Parallax */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="space-y-8 transform-gpu"
                style={{
                  transform: `translate3d(0, ${contentOffset.y * 0.4}px, 0)`
                }}
              >
                <ContactInfo
                  title={infoTitle}
                  subtitle={infoSubtitle}
                  contactInfo={contactInfo}
                  mapTitle=""
                  showMap={false}
                  contentAlignment="left"
                />

                {/* Map - Minimalist design with Parallax */}
                {showMap && (
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    className="backdrop-blur-sm bg-black/20 border border-gaming-primary/20 rounded-3xl p-8 hover:border-gaming-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-gaming-primary/10"
                  >
                    <h3 className="text-2xl font-gaming font-bold text-white mb-6">
                      {mapTitle}
                    </h3>
                    <div className="h-64 bg-gaming-primary/10 rounded-2xl flex items-center justify-center border border-gaming-primary/20 hover:border-gaming-primary/40 transition-colors duration-300 group cursor-pointer">
                      <span className="text-gaming-primary/70 text-6xl group-hover:scale-110 transition-transform duration-300">🗺️</span>
                    </div>
                    <p className="text-gray-400 text-sm mt-4">
                      İstanbul merkezli ofisimizden tüm Türkiye&apos;ye hizmet veriyoruz
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Sağ: Contact Form - Minimalist with Parallax */}
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="transform-gpu"
                  style={{
                    transform: `translate3d(0, ${contentOffset.y * 0.5}px, 0)`
                  }}
                >
                  <ContactForm
                    title={formTitle}
                    subtitle={formSubtitle}
                    onSubmit={handleFormSubmit}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
