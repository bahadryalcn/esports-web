'use client';

import { motion } from 'framer-motion';
import { AboutValuesProps } from '../types';

export const AboutValues = ({ values, layout = 'grid' }: AboutValuesProps) => {
  const getLayoutClasses = () => {
    switch (layout) {
      case 'list':
        return 'flex flex-col space-y-6';
      case 'carousel':
        return 'flex space-x-6 overflow-x-auto pb-4';
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 gap-6';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`${getLayoutClasses()} max-w-6xl mx-auto`}
    >
      {values.map((value, index) => {
        const Icon = value.icon;
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 }
            }}
            className={`backdrop-blur-sm bg-black/20 border border-gaming-primary/20 rounded-xl p-6 text-center group cursor-pointer hover:border-gaming-primary/40 transition-all duration-300 ${
              layout === 'carousel' ? 'min-w-[280px] flex-shrink-0' : ''
            }`}
          >
            <div className="flex justify-center mb-4">
              <motion.div 
                className="p-4 bg-gaming-primary/20 rounded-full group-hover:bg-gaming-primary/30 transition-colors duration-300 border border-gaming-primary/30"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Icon className="w-8 h-8 text-gaming-primary" />
              </motion.div>
            </div>
            
            <motion.h3 
              className="text-xl font-gaming font-bold text-white mb-3 group-hover:text-gaming-primary transition-colors duration-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {value.title}
            </motion.h3>
            
            <motion.p 
              className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors duration-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {value.description}
            </motion.p>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
