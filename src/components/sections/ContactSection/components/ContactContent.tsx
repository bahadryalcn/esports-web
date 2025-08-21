'use client';

import { motion } from 'framer-motion';
import type { ContactContentProps } from '../types';

export function ContactContent({ 
  title, 
  subtitle, 
  contentAlignment = 'center',
  children 
}: ContactContentProps) {
  const getAlignmentClasses = () => {
    switch (contentAlignment) {
      case 'left':
        return 'text-left items-start';
      case 'right':
        return 'text-right items-end';
      default:
        return 'text-center items-center';
    }
  };

  return (
    <motion.div 
      className={`relative z-10 container mx-auto px-4 ${getAlignmentClasses()}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="space-y-8">
        {/* Hero-style Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="space-y-6 mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-gaming font-bold text-white leading-tight">
            <motion.span 
              className="block text-gaming-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {title}
            </motion.span>
          </h2>
          
          {subtitle && (
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-gray-200 max-w-4xl mx-auto font-display leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}
