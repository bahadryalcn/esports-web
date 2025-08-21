'use client';

import { motion } from 'framer-motion';
import { AboutValuesProps } from '../types';

export const AboutValues = ({ values, layout = 'grid' }: AboutValuesProps) => {
  const getLayoutClasses = () => {
    switch (layout) {
      case 'list':
        return 'flex flex-col space-y-6 lg:space-y-8';
      case 'carousel':
        return 'flex space-x-6 overflow-x-auto pb-4 scrollbar-hide';
      case 'grid-4':
        return 'grid grid-cols-2 gap-4 lg:gap-6';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8';
    }
  };

  const getCardSize = () => {
    switch (layout) {
      case 'grid-4':
        return 'p-4 lg:p-5';
      default:
        return 'p-6 lg:p-8';
    }
  };

  const getIconSize = () => {
    switch (layout) {
      case 'grid-4':
        return 'w-12 h-12 lg:w-14 lg:h-14';
      default:
        return 'w-16 h-16 lg:w-20 lg:h-20';
    }
  };

  const getIconInnerSize = () => {
    switch (layout) {
      case 'grid-4':
        return 'w-6 h-6 lg:w-7 lg:h-7';
      default:
        return 'w-8 h-8 lg:w-10 lg:h-10';
    }
  };

  const getTitleSize = () => {
    switch (layout) {
      case 'grid-4':
        return 'text-lg lg:text-xl';
      default:
        return 'text-xl lg:text-2xl';
    }
  };

  const getDescriptionSize = () => {
    switch (layout) {
      case 'grid-4':
        return 'text-xs lg:text-sm';
      default:
        return 'text-sm lg:text-base';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className={`${getLayoutClasses()} max-w-7xl mx-auto`}
    >
      {values.map((value, index) => {
        const Icon = value.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.15,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
            className={`group relative ${
              layout === 'carousel' ? 'min-w-[300px] flex-shrink-0' : ''
            }`}
          >
            {/* Modern Value Card */}
            <div className={`glass-dark rounded-3xl ${getCardSize()} border border-red-500/20 hover:border-red-400/40 transition-all duration-300 hover-lift group-hover:glass-red h-full`}>
              
              {/* Icon Container */}
              <div className="flex justify-center mb-4 lg:mb-6">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Icon Glow Background */}
                  <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Icon Container */}
                  <div className={`relative ${getIconSize()} glass-red rounded-2xl flex items-center justify-center group-hover:bg-gaming-gradient transition-all duration-300 border border-red-500/30 group-hover:border-red-400/50`}>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className={`${getIconInnerSize()} text-red-400 group-hover:text-white transition-colors duration-300`} />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
              
              {/* Value Title */}
              <motion.h3 
                className={`${getTitleSize()} font-gaming font-bold text-white mb-3 lg:mb-4 group-hover:text-gaming transition-colors duration-300 text-center`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {value.title}
              </motion.h3>
              
              {/* Value Description */}
              <motion.p 
                className={`${getDescriptionSize()} text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 text-center`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {value.description}
              </motion.p>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-2 h-2 lg:w-3 lg:h-3 bg-red-500/30 rounded-full group-hover:bg-red-400/50 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-red-400/30 rounded-full group-hover:bg-red-300/50 transition-colors duration-300" />

              {/* Card Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </motion.div>
        );
      })}

      {/* Layout-specific decorations */}
      {layout === 'grid' && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
          className="col-span-full flex justify-center mt-8"
        >
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-red-500/50" />
            <div className="w-3 h-3 bg-red-500/50 rounded-full animate-pulse" />
            <div className="h-[1px] w-16 bg-gradient-l from-transparent to-red-500/50" />
          </div>
        </motion.div>
      )}

      {/* Carousel scroll indicator */}
      {layout === 'carousel' && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center mt-6"
        >
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <span>Kaydırarak daha fazlasını görün</span>
            <div className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};