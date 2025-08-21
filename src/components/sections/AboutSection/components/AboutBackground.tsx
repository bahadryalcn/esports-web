'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { AboutBackgroundProps } from '../types';

export function AboutBackground({
  variant = 'default',
  backgroundImage,
  overlay,
  parallaxOffsets = [],
}: AboutBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const finalBackgroundImage = backgroundImage || null;

  // Handle background image loading
  useEffect(() => {
    if (!finalBackgroundImage) {
      setImageLoaded(true);
      return;
    }

    setImageLoaded(false);
    const img = new Image();
    img.onload = () => {
      console.log('✅ About background loaded:', finalBackgroundImage);
      setImageLoaded(true);
    };
    img.onerror = () => {
      console.error('❌ About background failed:', finalBackgroundImage);
      setImageLoaded(false);
    };
    img.src = finalBackgroundImage;
  }, [finalBackgroundImage]);

  // Check if overlay should be shown
  const shouldShowOverlay =
    overlay && overlay.opacity !== undefined && overlay.opacity > 0;

  return (
    <div className="absolute inset-0">
      {/* Modern Background Layer */}
      <div className="absolute inset-0">
        {/* Background Image */}
        {finalBackgroundImage && (
          <motion.div
            className="bg-attachment-fixed absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${finalBackgroundImage}")`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        )}

        {/* Fallback Gradient - çok hafif */}
        <div className="absolute inset-0 bg-gradient-to-br from-gaming-darker/30 via-gaming-dark/20 to-gaming-darker/30" />

        {/* Custom Overlay */}
        {shouldShowOverlay && (
          <motion.div
            className="absolute inset-0 z-10"
            style={{
              backgroundColor: overlay.color || '#000000',
              opacity: Math.min(overlay.opacity || 0.3, 0.4),
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: Math.min(overlay.opacity || 0.3, 0.4) }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        )}

        {/* Default Overlay - çok hafif */}
        {!shouldShowOverlay && (
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/25 via-transparent to-black/15" />
        )}
      </div>

      {/* Modern Animated Elements */}
      <motion.div
        className="z-5 absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {/* Variant-based floating elements */}
        {variant === 'gradient' && (
          <>
            <div
              className="to-red-700/6 absolute right-20 top-20 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-red-500/10 blur-3xl"
              style={{ animationDuration: '4s' }}
            />
            <div
              className="from-red-600/8 absolute bottom-40 left-20 h-80 w-80 animate-pulse rounded-full bg-gradient-to-tl to-red-400/5 blur-2xl"
              style={{ animationDuration: '6s', animationDelay: '1s' }}
            />
            <div
              className="from-red-500/6 absolute left-1/3 top-1/3 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br to-transparent blur-xl"
              style={{ animationDuration: '8s', animationDelay: '2s' }}
            />
          </>
        )}

        {variant === 'pattern' && (
          <>
            <div
              className="bg-red-500/8 absolute right-32 top-32 h-72 w-72 animate-pulse rounded-full blur-3xl"
              style={{ animationDuration: '5s' }}
            />
            <div
              className="bg-red-600/6 absolute bottom-32 left-32 h-48 w-48 animate-pulse rounded-full blur-2xl"
              style={{ animationDuration: '7s', animationDelay: '1.5s' }}
            />
          </>
        )}

        {variant === 'default' && (
          <>
            <div
              className="from-red-500/6 to-red-700/4 absolute right-20 top-20 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br blur-3xl"
              style={{ animationDuration: '6s' }}
            />
            <div
              className="to-red-400/3 absolute bottom-40 left-20 h-64 w-64 animate-pulse rounded-full bg-gradient-to-tl from-red-600/5 blur-2xl"
              style={{ animationDuration: '8s', animationDelay: '1s' }}
            />
            <div
              className="from-red-500/4 absolute right-1/3 top-1/2 h-48 w-48 animate-pulse rounded-full bg-gradient-to-br to-transparent blur-xl"
              style={{ animationDuration: '10s', animationDelay: '2s' }}
            />
          </>
        )}

        {/* Modern geometric elements */}
        <div className="glass-effect absolute left-32 top-32 h-32 w-32 rounded-full border border-red-500/15" />
        <div className="absolute bottom-32 right-32 h-24 w-24 rounded-full border border-red-400/20 glass-red" />
        <div className="absolute right-1/4 top-2/3 h-20 w-20 rounded-full border border-red-600/25 glass-dark" />
      </motion.div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    </div>
  );
}
