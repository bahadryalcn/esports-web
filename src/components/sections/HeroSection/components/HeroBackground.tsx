'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import type { HeroBackgroundProps } from '../types';

export function HeroBackground({ 
  currentSlide, 
  backgroundImage, 
  overlay 
}: HeroBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Fallback background image if none provided
  const fallbackImage = '/bg/1.jpg';
  const finalBackgroundImage = backgroundImage || fallbackImage;
  
  // Check if overlay should be shown
  const shouldShowOverlay = overlay && overlay.opacity !== undefined && overlay.opacity > 0;
  
  // Memoize background image style to prevent unnecessary re-renders
  const backgroundStyle = useMemo(() => ({
    backgroundImage: `url("${finalBackgroundImage}")`
  }), [finalBackgroundImage]);
  
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
    <div className="absolute inset-0 overflow-hidden hero-background">
      {/* Main Background Layer */}
      <motion.div 
        key={`bg-${currentSlide}-${finalBackgroundImage}`}
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut"
        }}
      >
        {/* Background Image - bg-attachment-fixed kaldırıldı */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 z-10" />
      )}

      {/* Animated Background Elements - Optimized */}
      <motion.div
        className="absolute inset-0 z-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {/* Gaming Orbs - Reduced blur for better performance */}
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-red-500/10 to-red-700/5 rounded-full blur-lg animate-pulse blur-optimized" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-tl from-red-600/8 to-red-400/4 rounded-full blur-md animate-pulse blur-optimized" 
             style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-red-500/6 to-transparent rounded-full blur-sm animate-pulse blur-optimized" 
             style={{ animationDuration: '8s', animationDelay: '2s' }} />
      </motion.div>

      {/* Geometric Elements - Reduced for better performance */}
      <motion.div
        className="absolute inset-0 z-5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      >
        {/* Modern geometric shapes - Reduced count */}
        <div className="absolute top-24 left-24 w-32 h-32 border border-red-500/20 rounded-full backdrop-blur-sm bg-white/5" />
        <div className="absolute bottom-32 left-1/4 w-20 h-20 border border-red-600/25 rounded-full backdrop-blur-sm bg-red-600/5" />
        
        {/* Modern grid pattern overlay - Simplified */}
        <div 
          className="absolute inset-0 opacity-3"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </motion.div>

      {/* Noise Texture for depth - Reduced opacity */}
      <div className="absolute inset-0 z-5 opacity-10 mix-blend-overlay">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Vignette Effect - Simplified */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        <div className="w-full h-full bg-gradient-radial from-transparent via-transparent to-black/20" />
      </div>
    </div>
  );
}