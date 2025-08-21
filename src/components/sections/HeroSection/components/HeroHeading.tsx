'use client';

import { motion } from 'framer-motion';
import type { HeroHeadingProps } from '../types';

export function HeroHeading({ headline, subtext }: HeroHeadingProps) {
  return (
    <div className="space-y-6 lg:space-y-8 text-center">
      {/* Main Headline */}
      <motion.h1
        className="relative"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        {/* Background Text Effect - daha hafif */}
        <div className="absolute inset-0 text-4xl md:text-6xl lg:text-7xl font-black text-red-500/10 select-none pointer-events-none transform scale-110">
          {headline}
        </div>
        
        {/* Main Text */}
        <div className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
          <motion.span
            className="inline-block bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            {headline}
          </motion.span>
        </div>
        
        {/* Glow Effect - daha hafif */}
        <div className="absolute inset-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-red-500 blur-xl opacity-10 animate-pulse">
          {headline}
        </div>
      </motion.h1>
      
      {/* Subtitle */}
      {subtext && (
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        >
          <p className="text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed font-medium px-4 gaming-text-shadow">
            <motion.span
              className="inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {subtext}
            </motion.span>
          </p>
          
          {/* Subtitle Accent Line */}
          <motion.div
            className="mx-auto mt-4 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100px", opacity: 1 }}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </div>
  );
}