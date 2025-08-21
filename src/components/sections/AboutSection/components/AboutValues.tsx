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
      className={`${getLayoutClasses()} mx-auto max-w-7xl`}
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
              ease: 'easeOut',
            }}
            viewport={{ once: true }}
            className={`group relative ${
              layout === 'carousel' ? 'min-w-[300px] flex-shrink-0' : ''
            }`}
          >
            {/* Modern Value Card */}
            <div
              className={`rounded-3xl glass-dark ${getCardSize()} hover-lift h-full border border-red-500/20 transition-all duration-300 hover:border-red-400/40 group-hover:glass-red`}
            >
              {/* Icon Container */}
              <div className="mb-4 flex justify-center lg:mb-6">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Icon Glow Background */}
                  <div className="absolute inset-0 rounded-2xl bg-red-500/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Icon Container */}
                  <div
                    className={`relative ${getIconSize()} flex items-center justify-center rounded-2xl border border-red-500/30 transition-all duration-300 glass-red group-hover:border-red-400/50 group-hover:bg-gaming-gradient`}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon
                        className={`${getIconInnerSize()} text-red-400 transition-colors duration-300 group-hover:text-white`}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Value Title */}
              <motion.h3
                className={`${getTitleSize()} group-hover:text-gaming mb-3 text-center font-gaming font-bold text-white transition-colors duration-300 lg:mb-4`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {value.title}
              </motion.h3>

              {/* Value Description */}
              <motion.p
                className={`${getDescriptionSize()} text-center leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-200`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
              >
                {value.description}
              </motion.p>

              {/* Decorative Elements */}
              <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-red-500/30 transition-colors duration-300 group-hover:bg-red-400/50 lg:h-3 lg:w-3" />
              <div className="absolute bottom-4 left-4 h-1.5 w-1.5 rounded-full bg-red-400/30 transition-colors duration-300 group-hover:bg-red-300/50 lg:h-2 lg:w-2" />

              {/* Card Background Glow */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
          className="col-span-full mt-8 flex justify-center"
        >
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-red-500/50" />
            <div className="h-3 w-3 animate-pulse rounded-full bg-red-500/50" />
            <div className="bg-gradient-l h-[1px] w-16 from-transparent to-red-500/50" />
          </div>
        </motion.div>
      )}

      {/* Carousel scroll indicator */}
      {layout === 'carousel' && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 flex justify-center"
        >
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Kaydırarak daha fazlasını görün</span>
            <div className="h-1 w-1 animate-pulse rounded-full bg-red-500" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
