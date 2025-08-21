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
  className = '',
}: ContactSectionProps) {
  // Use custom contact info or default ones
  const contactInfo = useContactInfo(customContactInfo);

  const handleFormSubmit = async (formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    // Form submission logic - can be customized via props
    console.log('Contact form submitted:', formData);
    // Here you could integrate with email service, API, etc.
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Container */}
      <ContactBackground
        variant={backgroundVariant}
        backgroundImage={backgroundImage}
        overlay={overlay}
      />

      {/* Content Container */}
      <div className="container relative z-20 mx-auto flex min-h-screen items-center justify-center px-4">
        {/* Main Content */}
        <ContactContent>
          {/* Section Header */}
          <ContactHeading title={title} subtitle={subtitle} />

          {/* Contact Content Grid */}
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
              {/* Left: Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
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
                    transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                    className="border-gaming-primary/20 hover:border-gaming-primary/40 hover:shadow-gaming-primary/10 rounded-3xl border bg-black/20 p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
                  >
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.5,
                        ease: 'easeOut',
                      }}
                      className="mb-6 font-gaming text-2xl font-bold text-white"
                    >
                      {mapTitle}
                    </motion.h3>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.6,
                        ease: 'easeOut',
                      }}
                      className="bg-gaming-primary/10 border-gaming-primary/20 hover:border-gaming-primary/40 group flex h-64 cursor-pointer items-center justify-center rounded-2xl border transition-colors duration-300"
                    >
                      <span className="text-gaming-primary/70 text-6xl transition-transform duration-300 group-hover:scale-110">
                        🗺️
                      </span>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.7,
                        ease: 'easeOut',
                      }}
                      className="mt-4 text-sm text-gray-400"
                    >
                      İstanbul merkezli ofisimizden tüm Türkiye&apos;ye hizmet
                      veriyoruz
                    </motion.p>
                  </motion.div>
                )}
              </motion.div>

              {/* Right: Contact Form */}
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
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
