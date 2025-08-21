'use client';

import { motion } from 'framer-motion';
import { AboutStatsProps } from '../types';

export const AboutStats = ({ stats, variant = 'default' }: AboutStatsProps) => {
  if (!stats || stats.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'grid grid-cols-2 md:grid-cols-4 gap-4';
      case 'detailed':
        return 'grid grid-cols-1 md:grid-cols-3 gap-8';
      default:
        return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`mt-8 ${getVariantClasses()}`}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            y: -5,
            transition: { duration: 0.2 }
          }}
          className={`group relative overflow-hidden rounded-xl border border-gaming-primary/20 bg-black/20 backdrop-blur-sm transition-all duration-300 hover:border-gaming-primary/40 hover:bg-black/30 hover:shadow-lg hover:shadow-gaming-primary/20 ${
            variant === 'detailed' 
              ? 'p-6' 
              : variant === 'compact'
              ? 'p-4'
              : 'p-5'
          }`}
        >
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-gaming-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className={`font-gaming font-bold text-gaming-primary mb-2 group-hover:text-white transition-colors duration-300 ${
                variant === 'compact' ? 'text-xl' : 'text-2xl md:text-4xl'
              }`}
            >
              {stat.value}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              viewport={{ once: true }}
              className={`text-gray-300 font-medium group-hover:text-white transition-colors duration-300 ${
                variant === 'compact' ? 'text-sm' : 'text-base'
              }`}
            >
              {stat.label}
            </motion.div>
            
            {stat.subtitle && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="text-gray-400 text-xs mt-2 group-hover:text-gray-300 transition-colors duration-300"
              >
                {stat.subtitle}
              </motion.div>
            )}
          </div>
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-xl border border-gaming-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
        </motion.div>
      ))}
    </motion.div>
  );
};
