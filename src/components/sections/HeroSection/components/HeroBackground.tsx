'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import type { HeroBackgroundProps } from '../types';

export function HeroBackground({
  currentSlide,
  backgroundImage,
  overlay,
}: HeroBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fallback background image if none provided
  const fallbackImage = '/bg/1.jpg';
  const finalBackgroundImage = backgroundImage || fallbackImage;

  // Check if overlay should be shown
  const shouldShowOverlay =
    overlay && overlay.opacity !== undefined && overlay.opacity > 0;

  // Memoize background image style to prevent unnecessary re-renders
  const backgroundStyle = useMemo(
    () => ({
      backgroundImage: `url("${finalBackgroundImage}")`,
    }),
    [finalBackgroundImage]
  );

  // Handle image loading
  useEffect(() => {
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

  return (
    <div className="hero-background absolute inset-0 overflow-hidden">
      {/* Main Background Layer */}
      <motion.div
        key={`bg-${currentSlide}-${finalBackgroundImage}`}
        className="absolute inset-0 h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0 }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
      >
        {/* Background Image - bg-attachment-fixed kaldırıldı */}
        <div
          className="absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
          style={backgroundStyle}
        />

        {/* Fallback Gradient - sadece çok hafif */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-black/10 to-red-900/20" />
      </motion.div>

      {/* Custom Overlay */}
      {shouldShowOverlay && (
        <motion.div
          className="absolute inset-0 z-10"
          style={{
            backgroundColor: overlay.color || '#000000',
            opacity: Math.min(overlay.opacity || 0.3, 0.5), // Maximum 0.5 opacity
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: Math.min(overlay.opacity || 0.3, 0.5) }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      )}

      {/* Default Overlay for Readability - çok hafif */}
      {!shouldShowOverlay && (
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/30 via-transparent to-black/20" />
      )}

      {/* Animated Background Elements - Optimized */}
      <motion.div
        className="z-5 absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {/* Gaming Orbs - Reduced blur for better performance */}
        <div
          className="blur-optimized absolute right-20 top-20 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-red-500/10 to-red-700/5 blur-lg"
          style={{ animationDuration: '4s' }}
        />
        <div
          className="from-red-600/8 to-red-400/4 blur-optimized absolute bottom-40 left-20 h-80 w-80 animate-pulse rounded-full bg-gradient-to-tl blur-md"
          style={{ animationDuration: '6s', animationDelay: '1s' }}
        />
        <div
          className="from-red-500/6 blur-optimized absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-gradient-to-br to-transparent blur-sm"
          style={{ animationDuration: '8s', animationDelay: '2s' }}
        />
      </motion.div>

      {/* Geometric Elements - Reduced for better performance */}
      <motion.div
        className="z-5 absolute inset-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        {/* Modern geometric shapes - Reduced count */}
        <div className="absolute left-24 top-24 h-32 w-32 rounded-full border border-red-500/20 bg-white/5 backdrop-blur-sm" />
        <div className="absolute bottom-32 left-1/4 h-20 w-20 rounded-full border border-red-600/25 bg-red-600/5 backdrop-blur-sm" />

        {/* Modern grid pattern overlay - Simplified */}
        <div
          className="opacity-3 absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </motion.div>

      {/* Noise Texture for depth - Reduced opacity */}
      <div className="z-5 absolute inset-0 opacity-10 mix-blend-overlay">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Vignette Effect - Simplified */}
      <div className="z-15 pointer-events-none absolute inset-0">
        <div className="h-full w-full bg-gradient-radial from-transparent via-transparent to-black/20" />
      </div>
    </div>
  );
}
