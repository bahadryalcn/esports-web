'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { HeroBackgroundProps } from '../types';

export function HeroBackground({ currentSlide, backgroundImage, overlay }: HeroBackgroundProps) {
  // Only render overlay if opacity is greater than 0
  const shouldShowOverlay = overlay && overlay.opacity > 0;
  
  return (
    <div className="absolute inset-0">
      {/* Fallback Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950 to-red-900" />
      
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          />
          
          {/* Overlay - only render if opacity > 0 */}
          {shouldShowOverlay && (
            <div 
              className="absolute inset-0"
              style={{
                backgroundColor: overlay.color,
                opacity: overlay.opacity,
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/assets/hero-pattern.svg')] bg-repeat" />
      </div>
    </div>
  );
}
