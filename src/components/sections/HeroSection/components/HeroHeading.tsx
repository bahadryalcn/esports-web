'use client';

import { motion } from 'framer-motion';
import type { HeroHeadingProps } from '../types';

export function HeroHeading({ headline, subtext }: HeroHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="space-y-6"
    >
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-gaming font-bold text-white leading-tight">
        <motion.span 
          className="block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {headline}
        </motion.span>
      </h1>
      
      {subtext && (
        <motion.p 
          className="text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl mx-auto font-display leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          {subtext}
        </motion.p>
      )}
    </motion.div>
  );
}
