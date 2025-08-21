'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Award,
  Handshake,
} from 'lucide-react';
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
  const shouldAutoScroll = useMemo(
    () => showAutoScroll && sponsors.length > 6,
    [showAutoScroll, sponsors.length]
  );
  const maxIndex = useMemo(
    () => Math.max(0, sponsors.length - 6),
    [sponsors.length]
  );
  const finalBackgroundImage = useMemo(
    () => background?.image || null,
    [background?.image]
  );

  // Memoize background style to prevent unnecessary re-renders
  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: finalBackgroundImage
        ? `url("${finalBackgroundImage}")`
        : 'none',
    }),
    [finalBackgroundImage]
  );

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

  const goToSlide = useCallback(
    (index: number) => {
      if (sponsors.length <= 6) return;
      setCurrentIndex(index);
      setIsAutoScrolling(false);
    },
    [sponsors.length]
  );

  // Resume auto-scroll after manual interaction
  useEffect(() => {
    if (!isAutoScrolling && shouldAutoScroll) {
      const timer = setTimeout(() => setIsAutoScrolling(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isAutoScrolling, shouldAutoScroll]);

  // Check if overlay should be shown
  const shouldShowOverlay = useMemo(
    () =>
      background?.overlay &&
      background.overlay.opacity !== undefined &&
      background.overlay.opacity > 0,
    [background?.overlay]
  );

  // Memoize grid style to prevent unnecessary recalculations
  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns:
        sponsors.length <= 6
          ? `repeat(${Math.min(sponsors.length, 6)}, minmax(0, 1fr))`
          : `repeat(${sponsors.length}, minmax(0, 1fr))`,
      width: sponsors.length <= 6 ? '100%' : 'max-content',
    }),
    [sponsors.length]
  );

  // Memoize transform value for better performance
  const transformValue = useMemo(
    () =>
      shouldAutoScroll && sponsors.length > 6
        ? `-${currentIndex * (100 / 6)}%`
        : 0,
    [shouldAutoScroll, sponsors.length, currentIndex]
  );

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Modern Background Layer */}
      <div className="absolute inset-0">
        {/* Background Image - bg-attachment-fixed kaldırıldı */}
        {finalBackgroundImage && (
          <motion.div
            className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
            style={backgroundStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
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
            animate={{
              opacity: Math.min(background!.overlay!.opacity || 0.3, 0.4),
            }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        )}

        {/* Default Overlay - çok hafif */}
        {!shouldShowOverlay && (
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-black/15" />
        )}

        {/* Modern Animated Elements - Optimized */}
        <motion.div
          className="z-5 absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          {/* Floating orbs - Reduced blur for better performance */}
          <div
            className="from-red-500/8 to-red-700/4 absolute right-20 top-20 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br blur-lg"
            style={{ animationDuration: '5s' }}
          />
          <div
            className="from-red-600/6 to-red-400/3 absolute bottom-40 left-20 h-64 w-64 animate-pulse rounded-full bg-gradient-to-tl blur-md"
            style={{ animationDuration: '7s', animationDelay: '1s' }}
          />

          {/* Geometric elements - Reduced count */}
          <div className="glass-effect absolute left-32 top-32 h-24 w-24 rounded-full border border-red-500/15" />
        </motion.div>
      </div>

      <div className="container-gaming relative z-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mb-12 text-center lg:mb-16"
        >
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="text-responsive-3xl mb-4 font-gaming font-black text-white lg:mb-6"
          >
            <span className="text-gaming-gradient">{title}</span>
          </motion.h2>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
              className="text-responsive-lg gaming-text-shadow mx-auto max-w-4xl px-4 leading-relaxed text-gray-200"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Decorative line */}
          <motion.div
            className="mx-auto mt-6 h-1 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '120px', opacity: 1 }}
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
                className="group absolute -left-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-red-500/30 p-3 transition-all duration-300 glass-dark hover:border-red-400/50 lg:-left-6"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <ChevronLeft className="h-5 w-5 text-white transition-colors group-hover:text-red-400" />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="group absolute -right-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-red-500/30 p-3 transition-all duration-300 glass-dark hover:border-red-400/50 lg:-right-6"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <ChevronRight className="h-5 w-5 text-white transition-colors group-hover:text-red-400" />
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
                  key={
                    sponsor.id ||
                    sponsor._sys?.filename ||
                    sponsor.name ||
                    index
                  }
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }} // Reduced delay for better performance
                  className="group w-full max-w-[200px]"
                >
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-lift block rounded-2xl border border-red-500/20 p-4 transition-all duration-300 glass-dark hover:border-red-400/40 group-hover:glass-red lg:p-6"
                  >
                    <div className="flex h-24 flex-col items-center justify-center lg:h-28">
                      {/* Sponsor Logo */}
                      {sponsor.logo ? (
                        <motion.img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="mb-2 max-h-12 max-w-full object-contain brightness-90 filter transition-all duration-300 group-hover:brightness-110 lg:max-h-16"
                          whileHover={{ scale: 1.05 }}
                        />
                      ) : (
                        <motion.div
                          className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 glass-red group-hover:bg-gaming-gradient lg:h-16 lg:w-16"
                          whileHover={{ scale: 1.05, rotate: 5 }}
                        >
                          <Award className="h-6 w-6 text-red-400 transition-colors group-hover:text-white lg:h-8 lg:w-8" />
                        </motion.div>
                      )}

                      {/* Sponsor Name */}
                      <div className="flex items-center gap-1 text-center">
                        <span className="line-clamp-2 text-sm font-medium text-gray-300 transition-colors duration-300 group-hover:text-white lg:text-base">
                          {sponsor.name}
                        </span>
                        <ExternalLink className="h-3 w-3 flex-shrink-0 text-red-400 opacity-0 transition-all duration-300 group-hover:opacity-100" />
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
              className="mt-8 flex justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center gap-2 rounded-full border border-red-500/20 px-4 py-2 glass-dark">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative h-2 w-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'scale-125 bg-red-500'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {index === currentIndex && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-red-500 opacity-50 blur-sm"
                        layoutId="activeSponsorDot"
                        transition={{
                          type: 'spring',
                          stiffness: 200,
                          damping: 25,
                        }}
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
          className="mx-auto max-w-4xl"
        >
          <div className="rounded-3xl border border-red-500/20 p-6 transition-all duration-300 glass-dark hover:border-red-400/30 lg:p-8">
            {/* CTA Header */}
            <div className="mb-8 text-center">
              <motion.div
                className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl glass-red"
                whileHover={{ scale: 1.05, rotate: 5 }}
              >
                <Handshake className="h-8 w-8 text-red-400" />
              </motion.div>

              <h3 className="mb-3 font-gaming text-2xl font-bold text-white lg:text-3xl">
                İş Ortağımız Olmak İster misiniz?
              </h3>

              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-300">
                E-spor dünyasında büyüyen markamızla birlikte büyümek için
                bizimle iletişime geçin.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
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
                    <Award className="h-5 w-5" />
                    <span>{viewAllButtonText}</span>
                    <ExternalLink className="h-4 w-4" />
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
                  <Handshake className="h-5 w-5" />
                  <span>Ortaklık Başvurusu</span>
                </Link>
              </motion.div>
            </div>

            {/* Stats or Additional Info */}
            <motion.div
              className="mt-8 grid grid-cols-1 gap-4 border-t border-red-500/20 pt-6 sm:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center">
                <div className="mb-1 text-2xl font-black text-red-400 lg:text-3xl">
                  {sponsors.length}+
                </div>
                <div className="text-sm text-gray-400">Aktif Partner</div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-2xl font-black text-red-400 lg:text-3xl">
                  100K+
                </div>
                <div className="text-sm text-gray-400">Toplam Erişim</div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-2xl font-black text-red-400 lg:text-3xl">
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
