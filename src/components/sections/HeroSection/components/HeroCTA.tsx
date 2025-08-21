'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { HeroCTAProps } from '../types';

export function HeroCTA({ buttonText, buttonLink }: HeroCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-4 sm:gap-6 sm:flex-row"
    >
      {/* Primary CTA Button */}
      {buttonText && buttonLink && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative"
        >
          {/* Button Glow Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600 to-red-800 opacity-50 blur-xl transition-opacity duration-300 group-hover:opacity-75" />

          <Link
            href={buttonLink}
            className="relative inline-flex items-center justify-center space-x-2 sm:space-x-3 rounded-xl border border-red-500/20 bg-gradient-to-r from-red-600 to-red-800 px-4 py-3 text-sm font-bold text-white shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-red-400/40 hover:from-red-700 hover:to-red-900 sm:px-6 sm:text-base lg:text-lg"
          >
            {/* Button Icon */}
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-red-200 transition-colors group-hover:text-white" />
            <span className="font-semibold tracking-wide">{buttonText}</span>
            <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:translate-x-1" />

            {/* Button Shine Effect */}
            <div className="absolute inset-0 translate-x-[-200%] -skew-x-12 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[200%]" />
          </Link>
        </motion.div>
      )}

      {/* Secondary CTA Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group relative"
      >
        {/* Glass morphism background */}
        <div className="absolute inset-0 rounded-xl border border-red-500/20 bg-white/5 backdrop-blur-md transition-colors duration-300 group-hover:border-red-400/40" />

        <Link
          href="/contact"
          className="relative inline-flex items-center justify-center space-x-2 sm:space-x-3 rounded-xl px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:text-red-100 sm:px-6 sm:text-base lg:text-lg"
        >
          <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 transition-colors group-hover:text-red-300" />
          <span>İletişime Geç</span>

          {/* Hover gradient */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>
      </motion.div>

      {/* Call to Action Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="hidden items-center space-x-2 text-xs text-gray-400 xl:flex"
      >
        <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-red-500/50" />
        <span className="font-medium">E-spor dünyasına adım atın</span>
        <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-red-500/50" />
      </motion.div>
    </motion.div>
  );
}
