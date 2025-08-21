'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
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
  viewAllButtonLink = '/sponsors'
}: SponsorsClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const shouldAutoScroll = showAutoScroll && sponsors.length > 6;
  const maxIndex = Math.max(0, sponsors.length - 6);

  // Auto-scroll functionality - only when enabled and more than 6 sponsors
  useEffect(() => {
    if (!shouldAutoScroll || !isAutoScrolling || sponsors.length <= 6) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
    }, autoScrollSpeed);

    return () => clearInterval(interval);
  }, [shouldAutoScroll, isAutoScrolling, maxIndex, autoScrollSpeed, sponsors.length]);

  // Manual navigation
  const nextSlide = () => {
    if (sponsors.length <= 6) return;
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
    setIsAutoScrolling(false);
  };

  const prevSlide = () => {
    if (sponsors.length <= 6) return;
    setCurrentIndex((prev) => (prev - 1 + maxIndex + 1) % (maxIndex + 1));
    setIsAutoScrolling(false);
  };

  const goToSlide = (index: number) => {
    if (sponsors.length <= 6) return;
    setCurrentIndex(index);
    setIsAutoScrolling(false);
  };

  // Resume auto-scroll after manual interaction
  useEffect(() => {
    if (!isAutoScrolling && shouldAutoScroll) {
      const timer = setTimeout(() => setIsAutoScrolling(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [isAutoScrolling, shouldAutoScroll]);

  return (
    <section className="relative py-16 lg:py-24">
      {/* Background Image */}
      {background?.image && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${background.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}
      
      {/* Background Overlay */}
      {background?.overlay && background.overlay.opacity && background.overlay.opacity > 0 && (
        <div 
          className="absolute inset-0 z-10"
          style={{
            backgroundColor: background.overlay.color || 'rgba(0, 0, 0, 0.7)',
            opacity: background.overlay.opacity
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-gaming font-bold mb-6">
            <span className="text-white">{title}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Sponsors Container */}
        <div className="relative">
          {/* Navigation Arrows - Only show if more than 6 sponsors AND auto-scroll is enabled */}
          {shouldAutoScroll && sponsors.length > 6 && (
            <>
              <motion.button
                onClick={prevSlide}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/80 hover:bg-black/95 border border-red-500/50 hover:border-red-500/70 rounded-full backdrop-blur-sm transition-all duration-300 group shadow-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/80 hover:bg-black/95 border border-red-500/50 hover:border-red-500/70 rounded-full backdrop-blur-sm transition-all duration-300 group shadow-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" />
              </motion.button>
            </>
          )}

          {/* Sponsors Grid */}
          <div className="relative overflow-hidden">
            <motion.div
              ref={scrollContainerRef}
              animate={{ 
                x: shouldAutoScroll && sponsors.length > 6 ? `-${currentIndex * (100 / 6)}%` : 0 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                duration: 0.5
              }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-max"
              style={{
                gridTemplateColumns: `repeat(${sponsors.length}, minmax(0, 1fr))`
              }}
            >
              {sponsors.map((sponsor: Sponsor, index: number) => (
                <motion.div
                  key={sponsor.id || sponsor._sys?.filename || sponsor.name || index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group w-48"
                >
                  <a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 h-32 bg-black/60 backdrop-blur-md rounded-2xl border border-red-500/30 hover:bg-black/80 hover:border-red-500/50 group-hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <div className="h-full flex items-center justify-center">
                      {/* Sponsor logo or placeholder */}
                      <div className="text-center">
                        {sponsor.logo ? (
                          <img 
                            src={sponsor.logo} 
                            alt={sponsor.name}
                            className="w-16 h-16 mx-auto mb-2 object-contain"
                          />
                        ) : (
                          <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-red-500/40 to-red-700/40 rounded-xl flex items-center justify-center group-hover:from-red-500/60 group-hover:to-red-700/60 transition-all duration-300">
                            <span className="text-red-400 text-2xl group-hover:text-white transition-colors">🏢</span>
                          </div>
                        )}
                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300 flex items-center justify-center gap-1">
                          {sponsor.name}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </span>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Dots - Only show if more than 6 sponsors AND auto-scroll is enabled */}
          {shouldAutoScroll && sponsors.length > 6 && (
            <motion.div
              className="flex justify-center space-x-2 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-red-500 scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-red-500 rounded-full"
                      layoutId="activeSponsorDot"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>

        {/* View All Sponsors Button - Centered below sponsors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Link
            href={viewAllButtonLink}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-lg transition-all duration-200 backdrop-blur-sm"
          >
            <span className="text-white text-sm font-medium">
              {viewAllButtonText}
            </span>
            <svg 
              className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Partnership CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="p-8 max-w-2xl mx-auto bg-black/60 backdrop-blur-md rounded-2xl border border-red-500/30 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              İş Ortağımız Olmak İster misiniz?
            </h3>
            <p className="text-gray-300 mb-6">
              E-spor dünyasında büyüyen markamızla birlikte büyümek için bizimle iletişime geçin.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3 text-white bg-gradient-to-r from-red-600 to-red-800 rounded-xl hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>İletişime Geç</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
