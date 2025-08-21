'use client';

import { motion } from 'framer-motion';
import { MousePointer2 } from 'lucide-react';
import type { HeroScrollIndicatorProps } from '../types';

export function HeroScrollIndicator({}: HeroScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 transform sm:bottom-6 lg:bottom-8"
    >
      <motion.div
        className="group flex cursor-pointer flex-col items-center space-y-2 sm:space-y-3"
        whileHover={{ scale: 1.1 }}
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
          });
        }}
      >
        {/* Modern Scroll Indicator */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="relative flex h-10 w-6 justify-center overflow-hidden rounded-full border-2 border-red-500/50 bg-black/20 backdrop-blur-sm transition-colors duration-300 group-hover:border-red-400 sm:h-12 sm:w-8">
            {/* Inner Dot */}
            <motion.div
              className="mt-1.5 h-3 w-1 rounded-full bg-gradient-to-b from-red-400 to-red-600 sm:mt-2 sm:h-4 sm:w-1.5"
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-red-500/20 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </div>

        {/* Mouse Icon Alternative */}
        <motion.div
          className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
        >
          <MousePointer2 className="h-4 w-4 text-red-400 sm:h-5 sm:w-5" />
        </motion.div>

        {/* Text Hint */}
        <motion.div
          className="text-xs font-medium text-red-400/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          initial={{ y: 10 }}
          whileHover={{ y: 0 }}
        >
          Scroll Down
        </motion.div>

        {/* Animated Arrow */}
        <motion.div
          className="flex flex-col space-y-1 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <div className="mx-auto h-2 w-[2px] bg-gradient-to-b from-red-500/60 to-transparent" />
          <div className="mx-auto h-1 w-[2px] bg-gradient-to-b from-red-500/40 to-transparent" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
