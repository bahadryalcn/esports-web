'use client';

import { motion } from 'framer-motion';
import type { AboutContentProps } from '../types';
import { useAboutContent } from '../hooks/useAboutContent';

export function AboutContent({
  title,
  content,
  image,
  contentAlignment = 'center',
  children,
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
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="space-y-8 lg:space-y-12">
        {/* Modern Hero-style Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="space-y-6 lg:space-y-8"
        >
          {/* Decorative line */}
          <motion.div
            className="mx-auto h-1 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '120px', opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.div>

        {/* Mission and Vision - Enhanced Content */}
        {(secondary || vision) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="mx-auto max-w-5xl"
          >
            <div className="space-y-8">
              {secondary && (
                <motion.div
                  className="rounded-3xl border border-red-500/20 p-8 transition-all duration-300 glass-dark hover:border-red-400/30 lg:p-10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <h3 className="font-gaming text-2xl font-bold text-white lg:text-3xl">
                      Misyonumuz
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-lg leading-relaxed text-gray-300 lg:text-xl">
                      {secondary}
                    </p>
                  </div>
                </motion.div>
              )}

              {vision && (
                <motion.div
                  className="rounded-3xl border border-red-500/20 p-8 transition-all duration-300 glass-dark hover:border-red-400/30 lg:p-10"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <h3 className="font-gaming text-2xl font-bold text-white lg:text-3xl">
                      Vizyonumuz
                    </h3>
                    <div className="space-y-4">
                      <p className="text-lg leading-relaxed text-gray-300 lg:text-xl">
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
            transition={{ duration: 0.8, delay: 1.6, ease: 'easeOut' }}
            className="mx-auto max-w-6xl"
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
