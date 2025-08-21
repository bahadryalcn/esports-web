'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { HeroNavigationProps } from '../types';

export function HeroNavigation({ 
  showArrows, 
  showDots, 
  slidesLength, 
  currentSlide, 
  setCurrentSlide 
}: HeroNavigationProps) {
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesLength);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesLength) % slidesLength);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      {/* Navigation Arrows */}
      {showArrows && slidesLength > 1 && (
        <>
          <motion.button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-4 bg-black/70 hover:bg-black/90 border border-red-500/40 hover:border-red-500/60 rounded-full backdrop-blur-sm transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-4 bg-black/70 hover:bg-black/90 border border-red-500/40 hover:border-red-500/60 rounded-full backdrop-blur-sm transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" />
          </motion.button>
        </>
      )}

      {/* Navigation Dots */}
      {showDots && slidesLength > 1 && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          {Array.from({ length: slidesLength }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-red-500 scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {index === currentSlide && (
                <motion.div
                  className="absolute inset-0 bg-red-500 rounded-full"
                  layoutId="activeDot"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </>
  );
}
