'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { AboutContentProps } from '../types';
import { useAboutContent } from '../hooks/useAboutContent';

export function AboutContent({ 
  title, 
  content, 
  image, 
  contentAlignment = 'center',
  children 
}: AboutContentProps) {
  const { main, secondary, vision } = useAboutContent(content);

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
      className={`relative z-10 ${getAlignmentClasses()}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="space-y-8">
        {/* Hero-style Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-gaming font-bold text-white leading-tight">
            <motion.span 
              className="block text-gaming-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              {title}
            </motion.span>
          </h2>
          
          {main && (
            <motion.p 
              className="text-lg md:text-xl text-gray-200 max-w-3xl font-display leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              {main}
            </motion.p>
          )}
        </motion.div>

        {/* Additional Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="space-y-4 max-w-3xl"
        >
          <motion.p 
            className="text-gray-400 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            {secondary}
          </motion.p>
          <motion.p 
            className="text-gray-400 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {vision}
          </motion.p>
        </motion.div>

        {/* Logo - Yazının altında ortalanmış */}
        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
            className="flex justify-center items-center mt-8"
          >
            <img 
              src={image} 
              alt={`${title} Logo`}
              className="w-auto h-auto max-w-[220px] max-h-[220px] object-contain rounded-lg shadow-lg"
            />
          </motion.div>
        )}

        {/* Additional children content */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
