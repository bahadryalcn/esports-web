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
        const IconComponent = stat?.icon
          ? iconMap[stat?.icon as keyof typeof iconMap]
          : null;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
            viewport={{ once: true }}
            className="group relative"
          >
            {/* Modern Stats Card */}
            <div
              className={`hover-lift h-full rounded-2xl border border-red-500/20 transition-all duration-300 glass-dark hover:border-red-400/40 group-hover:glass-red ${getPaddingClasses()}`}
            >
              {/* Icon if provided */}
              {IconComponent && (
                <motion.div
                  className="mb-4 flex justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 glass-red group-hover:bg-gaming-gradient lg:h-16 lg:w-16">
                    <IconComponent className="h-6 w-6 text-red-400 transition-colors duration-300 group-hover:text-white lg:h-8 lg:w-8" />
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
                  type: 'spring',
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                className="mb-3 text-center"
              >
                <div
                  className={`group-hover:text-gaming mb-2 font-gaming font-black text-white transition-colors duration-300 ${
                    variant === 'compact'
                      ? 'text-xl lg:text-2xl'
                      : 'text-2xl lg:text-3xl xl:text-4xl'
                  }`}
                >
                  <span className="text-gaming-gradient">{stat.value}</span>

                  {/* Value Glow Effect */}
                  <div
                    className={`absolute inset-0 font-gaming font-black text-red-500 opacity-10 blur-lg transition-opacity duration-300 group-hover:opacity-20 ${
                      variant === 'compact'
                        ? 'text-xl lg:text-2xl'
                        : 'text-2xl lg:text-3xl xl:text-4xl'
                    }`}
                  >
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
                <div
                  className={`font-medium text-gray-300 transition-colors duration-300 group-hover:text-white ${
                    variant === 'compact' ? 'text-sm' : 'text-sm lg:text-base'
                  }`}
                >
                  {stat.label}
                </div>

                {/* Subtitle if provided */}
                {stat.subtitle && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="mt-2 text-xs text-gray-400 transition-colors duration-300 group-hover:text-gray-300"
                  >
                    {stat.subtitle}
                  </motion.div>
                )}
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-red-500/40 transition-colors duration-300 group-hover:bg-red-400/60" />
              <div className="absolute bottom-4 left-4 h-1 w-1 rounded-full bg-red-400/40 transition-colors duration-300 group-hover:bg-red-300/60" />

              {/* Card Background Glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
        className="col-span-full mt-8 flex justify-center"
      >
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      </motion.div>
    </motion.div>
  );
};
