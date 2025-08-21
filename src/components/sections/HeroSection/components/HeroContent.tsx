'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { HeroContentProps } from '../types';

export function HeroContent({ currentSlide, children }: HeroContentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={currentSlide}
        className="relative z-10 container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="space-y-8">
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
