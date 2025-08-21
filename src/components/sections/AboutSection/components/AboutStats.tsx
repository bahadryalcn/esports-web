'use client';

import { motion } from 'framer-motion';
import { Trophy, Users, Target, Zap, Award, Star } from 'lucide-react';
import { AboutStatsProps } from '../types';

// Icon mapping for stats
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  trophy: Trophy,
  users: Users,
  target: Target,
  zap: Zap,
  award: Award,
  star: Star,
};

export const AboutStats = ({ stats, variant = 'default' }: AboutStatsProps) => {
  if (!stats || stats.length === 0) return null;

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6';
      case 'detailed':
        return 'grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8';
      default:
        return 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6';
    }
  };

  const getPaddingClasses = () => {
    switch (variant) {
      case 'compact':
        return 'p-4 lg:p-6';
      case 'detailed':
        return 'p-6 lg:p-8';
      default:
        return 'p-4 lg:p-6';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className={`${getVariantClasses()}`}
    >
      {stats.map((stat, index) => {
        // Get icon component if specified
        const IconComponent = stat?.icon ? iconMap[stat?.icon as keyof typeof iconMap] : null;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            viewport={{ once: true }}
            className="group relative"
          >
            {/* Modern Stats Card */}
            <div className={`glass-dark rounded-2xl border border-red-500/20 hover:border-red-400/40 transition-all duration-300 hover-lift group-hover:glass-red h-full ${getPaddingClasses()}`}>
              
              {/* Icon if provided */}
              {IconComponent && (
                <motion.div 
                  className="flex justify-center mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-12 h-12 lg:w-16 lg:h-16 glass-red rounded-xl flex items-center justify-center group-hover:bg-gaming-gradient transition-all duration-300">
                    <IconComponent className="w-6 h-6 lg:w-8 lg:h-8 text-red-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </motion.div>
              )}

              {/* Stat Value */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="text-center mb-3"
              >
                <div className={`font-gaming font-black text-white mb-2 group-hover:text-gaming transition-colors duration-300 ${
                  variant === 'compact' ? 'text-xl lg:text-2xl' : 'text-2xl lg:text-3xl xl:text-4xl'
                }`}>
                  <span className="text-gaming-gradient">{stat.value}</span>
                  
                  {/* Value Glow Effect */}
                  <div className={`absolute inset-0 font-gaming font-black text-red-500 opacity-10 blur-lg group-hover:opacity-20 transition-opacity duration-300 ${
                    variant === 'compact' ? 'text-xl lg:text-2xl' : 'text-2xl lg:text-3xl xl:text-4xl'
                  }`}>
                    {stat.value}
                  </div>
                </div>
              </motion.div>

              {/* Stat Label */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className={`text-gray-300 font-medium group-hover:text-white transition-colors duration-300 ${
                  variant === 'compact' ? 'text-sm' : 'text-sm lg:text-base'
                }`}>
                  {stat.label}
                </div>
                
                {/* Subtitle if provided */}
                {stat.subtitle && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-gray-400 text-xs mt-2 group-hover:text-gray-300 transition-colors duration-300"
                  >
                    {stat.subtitle}
                  </motion.div>
                )}
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-red-500/40 rounded-full group-hover:bg-red-400/60 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-red-400/40 rounded-full group-hover:bg-red-300/60 transition-colors duration-300" />

              {/* Card Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </motion.div>
        );
      })}

      {/* Section Decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        viewport={{ once: true }}
        className="col-span-full flex justify-center mt-8"
      >
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      </motion.div>
    </motion.div>
  );
};