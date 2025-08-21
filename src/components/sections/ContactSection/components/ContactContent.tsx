'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ContactContentProps {
  children?: React.ReactNode;
}

export function ContactContent({ children }: ContactContentProps) {
  return (
    <div className="relative z-20 min-h-screen flex items-center justify-center px-4">
      <AnimatePresence mode="wait">
        <motion.div 
          className="container mx-auto max-w-7xl text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94] // easeOutQuart
          }}
        >
          <div className="space-y-8 lg:space-y-12">
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
