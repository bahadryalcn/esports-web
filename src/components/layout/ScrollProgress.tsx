'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useScrollProgress } from '@/lib/hooks/useScrollAnimation';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const progress = useScrollProgress();

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-destructive to-primary z-50"
        style={{ scaleX, transformOrigin: '0%' }}
      />
      
      {/* Circular Progress Indicator */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: progress > 10 ? 1 : 0,
          scale: progress > 10 ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative w-16 h-16">
          {/* Background Circle */}
          <svg
            className="w-16 h-16 transform -rotate-90"
            viewBox="0 0 64 64"
          >
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="4"
              fill="none"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="175.93"
              strokeDashoffset={175.93 - (175.93 * progress) / 100}
              transition={{ duration: 0.1 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--destructive)" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              className="w-10 h-10 bg-gradient-to-br from-primary/20 to-destructive/20 backdrop-blur-xl rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-black transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 10l7-7m0 0l7 7m-7-7v18" 
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
