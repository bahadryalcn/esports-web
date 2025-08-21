'use client';

import { motion } from 'framer-motion';
import type { HeroScrollIndicatorProps } from '../types';

export function HeroScrollIndicator({}: HeroScrollIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.0, duration: 0.6 }}
      className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20"
    >
      <motion.div 
        className="flex flex-col items-center space-y-2 cursor-pointer group"
        whileHover={{ scale: 1.1 }}
        onClick={() => {
          window.scrollTo({ 
            top: window.innerHeight, 
            behavior: 'smooth' 
          });
        }}
      >
        <div className="w-6 h-10 border-2 border-red-500/50 rounded-full flex justify-center relative overflow-hidden group-hover:border-red-500 transition-colors">
          <motion.div 
            className="w-1 h-3 bg-red-400 rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="text-xs text-red-400 font-display opacity-0 group-hover:opacity-100 transition-opacity">
          Scroll
        </div>
      </motion.div>
    </motion.div>
  );
}
