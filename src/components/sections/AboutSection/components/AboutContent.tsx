'use client';

import { motion } from 'framer-motion';
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

  


  // Original content display for when title and content are provided
  return (
    <motion.div 
      className={`relative z-20 ${getAlignmentClasses()}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="space-y-8 lg:space-y-12">
        {/* Modern Hero-style Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="space-y-6 lg:space-y-8"
        >
  
          
   

          {/* Decorative line */}
          <motion.div
            className="mx-auto h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "120px", opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.div>

        {/* Mission and Vision - Enhanced Content */}
        {(secondary || vision) && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <div className="space-y-8">
              {secondary && (
                <motion.div 
                  className="glass-dark rounded-3xl p-8 lg:p-10 border border-red-500/20 hover:border-red-400/30 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <h3 className="text-2xl lg:text-3xl font-gaming font-bold text-white">Misyonumuz</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed text-lg lg:text-xl">
                      {secondary}
                    </p>
                  </div>
                </motion.div>
              )}

              {vision && (
                <motion.div 
                  className="glass-dark rounded-3xl p-8 lg:p-10 border border-red-500/20 hover:border-red-400/30 transition-all duration-300"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <h3 className="text-2xl lg:text-3xl font-gaming font-bold text-white">Vizyonumuz</h3>
                    <div className="space-y-4">
                      <p className="text-gray-300 leading-relaxed text-lg lg:text-xl">
                        {vision}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Additional children content */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6, ease: "easeOut" }}
            className="max-w-6xl mx-auto"
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}