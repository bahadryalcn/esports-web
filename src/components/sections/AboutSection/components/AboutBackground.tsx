'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { AboutBackgroundProps } from '../types';

export function AboutBackground({ 
  variant = 'default', 
  backgroundImage, 
  overlay, 
  parallaxOffsets = [] 
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
  const shouldShowOverlay = overlay && overlay.opacity !== undefined && overlay.opacity > 0;

  return (
    <div className="absolute inset-0">
      {/* Modern Background Layer */}
      <div className="absolute inset-0">
        {/* Background Image */}
        {finalBackgroundImage && (
          <motion.div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-attachment-fixed"
            style={{
              backgroundImage: `url("${finalBackgroundImage}")`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/15 z-10" />
        )}
      </div>

      {/* Modern Animated Elements */}
      <motion.div
        className="absolute inset-0 z-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {/* Variant-based floating elements */}
        {variant === 'gradient' && (
          <>
            <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-red-500/10 to-red-700/6 rounded-full blur-3xl animate-pulse" 
                 style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-tl from-red-600/8 to-red-400/5 rounded-full blur-2xl animate-pulse" 
                 style={{ animationDuration: '6s', animationDelay: '1s' }} />
            <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-red-500/6 to-transparent rounded-full blur-xl animate-pulse" 
                 style={{ animationDuration: '8s', animationDelay: '2s' }} />
          </>
        )}
        
        {variant === 'pattern' && (
          <>
            <div className="absolute top-32 right-32 w-72 h-72 bg-red-500/8 rounded-full blur-3xl animate-pulse" 
                 style={{ animationDuration: '5s' }} />
            <div className="absolute bottom-32 left-32 w-48 h-48 bg-red-600/6 rounded-full blur-2xl animate-pulse" 
                 style={{ animationDuration: '7s', animationDelay: '1.5s' }} />
          </>
        )}
        
        {variant === 'default' && (
          <>
            <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-red-500/6 to-red-700/4 rounded-full blur-3xl animate-pulse" 
                 style={{ animationDuration: '6s' }} />
            <div className="absolute bottom-40 left-20 w-64 h-64 bg-gradient-to-tl from-red-600/5 to-red-400/3 rounded-full blur-2xl animate-pulse" 
                 style={{ animationDuration: '8s', animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-gradient-to-br from-red-500/4 to-transparent rounded-full blur-xl animate-pulse" 
                 style={{ animationDuration: '10s', animationDelay: '2s' }} />
          </>
        )}

        {/* Modern geometric elements */}
        <div className="absolute top-32 left-32 w-32 h-32 border border-red-500/15 rounded-full glass-effect" />
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-red-400/20 rounded-full glass-red" />
        <div className="absolute top-2/3 right-1/4 w-20 h-20 border border-red-600/25 rounded-full glass-dark" />
      </motion.div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>
    </div>
  );
}