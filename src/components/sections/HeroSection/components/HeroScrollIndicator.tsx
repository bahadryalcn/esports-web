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
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
    >
      <motion.div 
        className="flex flex-col items-center space-y-3 cursor-pointer group"
        whileHover={{ scale: 1.1 }}
        onClick={() => {
          window.scrollTo({ 
            top: window.innerHeight, 
            behavior: 'smooth' 
          });
        }}
      >
        {/* Modern Scroll Indicator */}
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-8 h-12 border-2 border-red-500/50 rounded-full flex justify-center relative overflow-hidden group-hover:border-red-400 transition-colors duration-300 bg-black/20 backdrop-blur-sm">
            {/* Inner Dot */}
            <motion.div 
              className="w-1.5 h-4 bg-gradient-to-b from-red-400 to-red-600 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-red-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
          </div>
        </div>
        
        {/* Mouse Icon Alternative */}
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
        >
          <MousePointer2 className="w-5 h-5 text-red-400" />
        </motion.div>
        
        {/* Text Hint */}
        <motion.div 
          className="text-xs text-red-400/80 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ y: 10 }}
          whileHover={{ y: 0 }}
        >
          Scroll Down
        </motion.div>
        
        {/* Animated Arrow */}
        <motion.div
          className="flex flex-col space-y-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          animate={{ y: [0, 5, 0] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <div className="w-[2px] h-2 bg-gradient-to-b from-red-500/60 to-transparent mx-auto" />
          <div className="w-[2px] h-1 bg-gradient-to-b from-red-500/40 to-transparent mx-auto" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}