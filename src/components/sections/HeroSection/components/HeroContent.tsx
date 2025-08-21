'use client';

import { motion } from 'framer-motion';
import type { HeroContentProps } from '../types';

export function HeroContent({ currentSlide, children }: HeroContentProps) {
  return (
    <div className="hero-content relative z-20 flex min-h-screen items-center justify-center px-4 pt-0">
      <motion.div
        key={`slide-${currentSlide}`}
        className="container mx-auto max-w-7xl text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6, // Reduced from 0.8 for better performance
          ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
        }}
      >
        <div className="space-y-6 sm:space-y-8 lg:space-y-12">{children}</div>
      </motion.div>
    </div>
  );
}
