'use client';

import { motion } from 'framer-motion';
import { ContactBackground } from './components/ContactBackground';
import { ContactForm } from './components/ContactForm';
import { ContactInfo } from './components/ContactInfo';
import { ContactHeading } from './components/ContactHeading';
import { ContactContent } from './components/ContactContent';
import { useContactInfo } from './hooks/useContactInfo';
import { ContactSectionProps } from './types';

export default function ContactSection({
  title = 'İletişim',
  subtitle = 'Profesyonel e-spor hizmetleri için bizimle iletişime geçin ve projelerinizi hayata geçirelim.',
  showForm = true,
  backgroundImage,
  overlay,
  backgroundVariant = 'default',
  contentAlignment = 'center',
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

  const handleFormSubmit = async (formData: { name: string; email: string; subject: string; message: string }) => {
    // Form submission logic - can be customized via props
    console.log('Contact form submitted:', formData);
    // Here you could integrate with email service, API, etc.
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Container */}
      <ContactBackground 
        variant={backgroundVariant}
        backgroundImage={backgroundImage}
        overlay={overlay}
      />

      {/* Content Container */}
      <div className="container relative z-20 mx-auto px-4 flex items-center justify-center min-h-screen">
        {/* Main Content */}
        <ContactContent>
          {/* Section Header */}
          <ContactHeading 
            title={title}
            subtitle={subtitle}
          />

          {/* Contact Content Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left: Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="space-y-8"
              >
                <ContactInfo
                  title={infoTitle}
                  subtitle={infoSubtitle}
                  contactInfo={contactInfo}
                  mapTitle=""
                  showMap={false}
                  contentAlignment="left"
                />

                {/* Map */}
                {showMap && (
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    className="backdrop-blur-sm bg-black/20 border border-gaming-primary/20 rounded-3xl p-8 hover:border-gaming-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-gaming-primary/10"
                  >
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                      className="text-2xl font-gaming font-bold text-white mb-6"
                    >
                      {mapTitle}
                    </motion.h3>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                      className="h-64 bg-gaming-primary/10 rounded-2xl flex items-center justify-center border border-gaming-primary/20 hover:border-gaming-primary/40 transition-colors duration-300 group cursor-pointer"
                    >
                      <span className="text-gaming-primary/70 text-6xl group-hover:scale-110 transition-transform duration-300">🗺️</span>
                    </motion.div>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                      className="text-gray-400 text-sm mt-4"
                    >
                      İstanbul merkezli ofisimizden tüm Türkiye&apos;ye hizmet veriyoruz
                    </motion.p>
                  </motion.div>
                )}
              </motion.div>

              {/* Right: Contact Form */}
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
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
        </ContactContent>
      </div>
    </section>
  );
}
