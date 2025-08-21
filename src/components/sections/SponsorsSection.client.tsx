'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Award, Handshake } from 'lucide-react';
import Link from 'next/link';
import { Sponsor } from '@/types';

interface Background {
  image?: string;
  overlay?: {
    color?: string;
    opacity?: number;
  };
}

interface SponsorsClientProps {
  title: string;
  subtitle: string;
  sponsors: Sponsor[];
  background?: Background;
  showAutoScroll?: boolean;
  autoScrollSpeed?: number;
  viewAllButtonText?: string;
  viewAllButtonLink?: string;
}

export default function SponsorsClient({
  title,
  subtitle,
  sponsors,
  background,
  showAutoScroll = true,
  autoScrollSpeed = 3000,
  viewAllButtonText = 'Tüm Sponsorlarımız',
  viewAllButtonLink = '/sponsors',
}: SponsorsClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Memoize expensive calculations
  const shouldAutoScroll = useMemo(() => showAutoScroll && sponsors.length > 6, [showAutoScroll, sponsors.length]);
  const maxIndex = useMemo(() => Math.max(0, sponsors.length - 6), [sponsors.length]);
  const finalBackgroundImage = useMemo(() => background?.image || null, [background?.image]);

  // Memoize background style to prevent unnecessary re-renders
  const backgroundStyle = useMemo(() => ({
    backgroundImage: finalBackgroundImage ? `url("${finalBackgroundImage}")` : 'none'
  }), [finalBackgroundImage]);

  // Handle background image loading
  useEffect(() => {
    if (!finalBackgroundImage) {
      setImageLoaded(true);
      return;
    }

    setImageLoaded(false);
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      setImageLoaded(false);
    };
    img.src = finalBackgroundImage;
  }, [finalBackgroundImage]);

  // Auto-scroll functionality - Optimized with useCallback
  const autoScroll = useCallback(() => {
    if (!shouldAutoScroll || !isAutoScrolling || sponsors.length <= 6) return;
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  }, [shouldAutoScroll, isAutoScrolling, maxIndex, sponsors.length]);

  useEffect(() => {
    if (!shouldAutoScroll || !isAutoScrolling || sponsors.length <= 6) return;

    const interval = setInterval(autoScroll, autoScrollSpeed);
    return () => clearInterval(interval);
  }, [shouldAutoScroll, isAutoScrolling, autoScrollSpeed, autoScroll]);

  // Navigation functions - Optimized with useCallback
  const nextSlide = useCallback(() => {
    if (sponsors.length <= 6) return;
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
    setIsAutoScrolling(false);
  }, [sponsors.length, maxIndex]);

  const prevSlide = useCallback(() => {
    if (sponsors.length <= 6) return;
    setCurrentIndex((prev) => (prev - 1 + maxIndex + 1) % (maxIndex + 1));
    setIsAutoScrolling(false);
  }, [maxIndex]);

  const goToSlide = useCallback((index: number) => {
    if (sponsors.length <= 6) return;
    setCurrentIndex(index);
    setIsAutoScrolling(false);
  }, [sponsors.length]);

  // Resume auto-scroll after manual interaction
  useEffect(() => {
    if (!isAutoScrolling && shouldAutoScroll) {
      const timer = setTimeout(() => setIsAutoScrolling(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isAutoScrolling, shouldAutoScroll]);

  // Check if overlay should be shown
  const shouldShowOverlay = useMemo(() => 
    background?.overlay && background.overlay.opacity !== undefined && background.overlay.opacity > 0,
    [background?.overlay]
  );

  // Memoize grid style to prevent unnecessary recalculations
  const gridStyle = useMemo(() => ({
    gridTemplateColumns: sponsors.length <= 6 
      ? `repeat(${Math.min(sponsors.length, 6)}, minmax(0, 1fr))`
      : `repeat(${sponsors.length}, minmax(0, 1fr))`,
    width: sponsors.length <= 6 ? '100%' : 'max-content'
  }), [sponsors.length]);

  // Memoize transform value for better performance
  const transformValue = useMemo(() => 
    shouldAutoScroll && sponsors.length > 6 ? `-${currentIndex * (100 / 6)}%` : 0,
    [shouldAutoScroll, sponsors.length, currentIndex]
  );

  return (
    <section className="relative overflow-hidden section-padding">
      {/* Modern Background Layer */}
      <div className="absolute inset-0">
        {/* Background Image - bg-attachment-fixed kaldırıldı */}
        {finalBackgroundImage && (
          <motion.div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={backgroundStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
        
        {/* Fallback Gradient - çok hafif */}
        <div className="absolute inset-0 bg-gradient-to-br from-gaming-darker/30 via-gaming-dark/20 to-gaming-darker/30" />

        {/* Custom Overlay */}
        {shouldShowOverlay && (
          <motion.div 
            className="absolute inset-0 z-10"
            style={{
              backgroundColor: background!.overlay!.color || '#000000',
              opacity: Math.min(background!.overlay!.opacity || 0.3, 0.4), // Maximum 0.4 opacity
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: Math.min(background!.overlay!.opacity || 0.3, 0.4) }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        )}
        
        {/* Default Overlay - çok hafif */}
        {!shouldShowOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/15 z-10" />
        )}

        {/* Modern Animated Elements - Optimized */}
        <motion.div
          className="absolute inset-0 z-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          {/* Floating orbs - Reduced blur for better performance */}
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-br from-red-500/8 to-red-700/4 rounded-full blur-lg animate-pulse" 
               style={{ animationDuration: '5s' }} />
          <div className="absolute bottom-40 left-20 w-64 h-64 bg-gradient-to-tl from-red-600/6 to-red-400/3 rounded-full blur-md animate-pulse" 
               style={{ animationDuration: '7s', animationDelay: '1s' }} />
          
          {/* Geometric elements - Reduced count */}
          <div className="absolute top-32 left-32 w-24 h-24 border border-red-500/15 rounded-full glass-effect" />
        </motion.div>
      </div>

      <div className="container-gaming relative z-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-center mb-12 lg:mb-16"
        >
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
           className="text-responsive-3xl font-gaming font-black text-white mb-4 lg:mb-6"
          >
            <span className="text-gaming-gradient">{title}</span>
          </motion.h2>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
              className="text-responsive-lg text-gray-200 max-w-4xl mx-auto leading-relaxed px-4 gaming-text-shadow"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Decorative line */}
          <motion.div
            className="mx-auto mt-6 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "120px", opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          />
        </motion.div>

        {/* Sponsors Grid Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
          className="relative mb-12 lg:mb-16"
        >
          {/* Navigation Arrows */}
          {shouldAutoScroll && sponsors.length > 6 && (
            <>
              <motion.button
                onClick={prevSlide}
                className="absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-30 glass-dark p-3 rounded-full border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <ChevronLeft className="w-5 h-5 text-white group-hover:text-red-400 transition-colors" />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-30 glass-dark p-3 rounded-full border border-red-500/30 hover:border-red-400/50 transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <ChevronRight className="w-5 h-5 text-white group-hover:text-red-400 transition-colors" />
              </motion.button>
            </>
          )}

          {/* Sponsors Grid */}
          <div className="relative overflow-hidden">
            <motion.div
              ref={scrollContainerRef}
              animate={{
                x: transformValue,
              }}
              transition={{
                type: 'spring',
                stiffness: 200, // Reduced for better performance
                damping: 25, // Reduced for better performance
                duration: 0.4, // Reduced for better performance
              }}
              className="grid gap-4 lg:gap-6"
              style={gridStyle}
            >
              {sponsors.map((sponsor: Sponsor, index: number) => (
                <motion.div
                  key={sponsor.id || sponsor._sys?.filename || sponsor.name || index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }} // Reduced delay for better performance
                  className="group w-full max-w-[200px]"
                >
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 lg:p-6 glass-dark rounded-2xl border border-red-500/20 hover:border-red-400/40 transition-all duration-300 hover-lift group-hover:glass-red"
                  >
                    <div className="flex flex-col items-center justify-center h-24 lg:h-28">
                      {/* Sponsor Logo */}
                      {sponsor.logo ? (
                        <motion.img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="max-h-12 lg:max-h-16 max-w-full object-contain mb-2 filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                        />
                      ) : (
                        <motion.div 
                          className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl glass-red flex items-center justify-center mb-2 group-hover:bg-gaming-gradient transition-all duration-300"
                          whileHover={{ scale: 1.05, rotate: 5 }}
                        >
                          <Award className="w-6 h-6 lg:w-8 lg:h-8 text-red-400 group-hover:text-white transition-colors" />
                        </motion.div>
                      )}
                      
                      {/* Sponsor Name */}
                      <div className="flex items-center gap-1 text-center">
                        <span className="text-sm lg:text-base font-medium text-gray-300 group-hover:text-white transition-colors duration-300 line-clamp-2">
                          {sponsor.name}
                        </span>
                        <ExternalLink className="w-3 h-3 text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300 flex-shrink-0" />
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Dots */}
          {shouldAutoScroll && sponsors.length > 6 && (
            <motion.div
              className="flex justify-center mt-8 gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 glass-dark rounded-full border border-red-500/20">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-red-500 scale-125' : 'bg-white/30 hover:bg-white/50'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {index === currentIndex && (
                      <motion.div
                        className="absolute inset-0 bg-red-500 rounded-full blur-sm opacity-50"
                        layoutId="activeSponsorDot"
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Partnership CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-dark rounded-3xl p-6 lg:p-8 border border-red-500/20 hover:border-red-400/30 transition-all duration-300">
            {/* CTA Header */}
            <div className="text-center mb-8">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 glass-red rounded-2xl mb-4"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Handshake className="w-8 h-8 text-red-400" />
              </motion.div>
              
              <h3 className="text-2xl lg:text-3xl font-gaming font-bold text-white mb-3">
                İş Ortağımız Olmak İster misiniz?
              </h3>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                E-spor dünyasında büyüyen markamızla birlikte büyümek için bizimle iletişime geçin.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* View All Button */}
              {viewAllButtonText && viewAllButtonLink && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={viewAllButtonLink}
                    className="btn-gaming-primary inline-flex items-center gap-3"
                  >
                    <Award className="w-5 h-5" />
                    <span>{viewAllButtonText}</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </motion.div>
              )}

              {/* Contact Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="btn-gaming-outline inline-flex items-center gap-3"
                >
                  <Handshake className="w-5 h-5" />
                  <span>Ortaklık Başvurusu</span>
                </Link>
              </motion.div>
            </div>

            {/* Stats or Additional Info */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-red-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-black text-red-400 mb-1">
                  {sponsors.length}+
                </div>
                <div className="text-sm text-gray-400">Aktif Partner</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-black text-red-400 mb-1">
                  100K+
                </div>
                <div className="text-sm text-gray-400">Toplam Erişim</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-black text-red-400 mb-1">
                  ∞
                </div>
                <div className="text-sm text-gray-400">Potansiyel</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}