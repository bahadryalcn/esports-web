'use client';

import { motion } from 'framer-motion';
import type { HeroHeadingProps } from '../types';

export function HeroHeading({ headline, subtext }: HeroHeadingProps) {
  return (
    <div className="space-y-4 sm:space-y-6 text-center lg:space-y-8">
      {/* Main Headline */}
      <motion.h1
        className="relative"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        {/* Background Text Effect - daha hafif */}
        <div className="pointer-events-none absolute inset-0 scale-110 transform select-none text-3xl font-black text-red-500/10 sm:text-4xl md:text-6xl lg:text-7xl">
          {headline}
        </div>

        {/* Main Text */}
        <div className="relative z-10 text-2xl font-black leading-tight text-white sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          <motion.span
            className="inline-block bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            {headline}
          </motion.span>
        </div>

        {/* Glow Effect - daha hafif ve optimize */}
        <div className="opacity-8 absolute inset-0 animate-pulse text-2xl font-black text-red-500 blur-lg sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          {headline}
        </div>
      </motion.h1>

      {/* Subtitle */}
      {subtext && (
        <motion.div
          className="relative mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
        >
          <p className="gaming-text-shadow px-4 text-base font-medium leading-relaxed text-gray-200 sm:text-lg md:text-xl lg:text-2xl">
            {subtext}
          </p>

          {/* Subtitle Accent Line */}
          <motion.div
            className="mx-auto mt-3 sm:mt-4 h-1 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '100px', opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          />
        </motion.div>
      )}
    </div>
  );
}
