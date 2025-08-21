'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { HeroNavigationProps } from '../types';

export function HeroNavigation({
  showArrows,
  showDots,
  slidesLength,
  currentSlide,
  setCurrentSlide,
}: HeroNavigationProps) {
  const nextSlide = () => {
    setCurrentSlide((prev: number) => (prev + 1) % slidesLength);
  };

  const prevSlide = () => {
    setCurrentSlide((prev: number) => (prev - 1 + slidesLength) % slidesLength);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {/* Navigation Arrows */}
      {showArrows && slidesLength > 1 && (
        <>
          {/* Previous Arrow */}
          <motion.button
            onClick={prevSlide}
            className="group absolute left-6 top-1/2 z-30 -translate-y-1/2 lg:left-8"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            {/* Button Background */}
            <div className="relative rounded-2xl border border-red-500/20 bg-black/40 p-4 backdrop-blur-md transition-all duration-300 hover:border-red-400/40 group-hover:bg-black/60">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-red-500/10 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />

              <ChevronLeft className="relative h-6 w-6 text-white transition-colors duration-300 group-hover:text-red-300" />
            </div>
          </motion.button>

          {/* Next Arrow */}
          <motion.button
            onClick={nextSlide}
            className="group absolute right-6 top-1/2 z-30 -translate-y-1/2 lg:right-8"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            {/* Button Background */}
            <div className="relative rounded-2xl border border-red-500/20 bg-black/40 p-4 backdrop-blur-md transition-all duration-300 hover:border-red-400/40 group-hover:bg-black/60">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-red-500/10 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />

              <ChevronRight className="relative h-6 w-6 text-white transition-colors duration-300 group-hover:text-red-300" />
            </div>
          </motion.button>
        </>
      )}

      {/* Navigation Dots */}
      {showDots && slidesLength > 1 && (
        <motion.div
          className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          {/* Dots Container */}
          <div className="flex items-center space-x-3 rounded-full border border-red-500/20 bg-black/40 px-4 py-3 backdrop-blur-md">
            {Array.from({ length: slidesLength }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className="group relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Dot Background */}
                <div
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'scale-125 bg-red-500'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />

                {/* Active Dot Glow */}
                {index === currentSlide && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-red-500 opacity-50 blur-sm"
                    layoutId="activeDotGlow"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-full bg-red-400/50 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
              </motion.button>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="mt-2 h-[1px] overflow-hidden rounded-full bg-white/20">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-red-600"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentSlide + 1) / slidesLength) * 100}%`,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </motion.div>
      )}
    </>
  );
}
