'use client';

import { motion } from 'framer-motion';
import { Trophy, Users, Target, Zap } from 'lucide-react';
import type { HeroStatsProps } from '../types';

const iconMap = {
  trophy: Trophy,
  users: Users,
  target: Target,
  zap: Zap,
};

export function HeroStats({ stats }: HeroStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
      className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:mt-12 lg:gap-6"
    >
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap] || Trophy;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: 1.4 + index * 0.15,
              ease: 'easeOut',
            }}
            whileHover={{
              y: -8,
              scale: 1.05,
              transition: { type: 'spring', stiffness: 300, damping: 20 },
            }}
            className="group relative"
          >
            {/* Background Glass Effect */}
            <div className="absolute inset-0 rounded-2xl border border-red-500/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md transition-all duration-300 group-hover:border-red-400/40" />

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-700/5 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

            {/* Content */}
            <div className="relative p-4 text-center lg:p-6">
              {/* Icon Container */}
              <div className="mb-3 flex justify-center">
                <motion.div
                  className="relative rounded-xl bg-gradient-to-br from-red-500/20 via-red-600/10 to-red-700/20 p-3 transition-all duration-300 group-hover:from-red-400/30 group-hover:to-red-600/30"
                  whileHover={{ rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Icon Glow */}
                  <div className="absolute inset-0 rounded-xl bg-red-500/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />

                  <Icon className="relative h-6 w-6 text-red-400 transition-colors duration-300 group-hover:text-red-300 lg:h-8 lg:w-8" />
                </motion.div>
              </div>

              {/* Value */}
              <motion.div
                className="mb-2 text-2xl font-black text-white md:text-3xl lg:text-4xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  delay: 1.6 + index * 0.1,
                }}
              >
                <span className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                  {stat.value}
                </span>

                {/* Value Glow */}
                <div className="absolute inset-0 text-2xl font-black text-red-500 opacity-20 blur-lg transition-opacity duration-300 group-hover:opacity-30 md:text-3xl lg:text-4xl">
                  {stat.value}
                </div>
              </motion.div>

              {/* Label */}
              <motion.div
                className="text-xs font-medium text-gray-300 transition-colors duration-300 group-hover:text-white lg:text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 + index * 0.1 }}
              >
                {stat.label}
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-red-500/40 transition-colors duration-300 group-hover:bg-red-400/60" />
              <div className="absolute bottom-4 left-4 h-1 w-1 rounded-full bg-red-400/40 transition-colors duration-300 group-hover:bg-red-300/60" />
            </div>
          </motion.div>
        );
      })}

      {/* Stats Section Decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="col-span-2 mt-6 flex justify-center md:col-span-4"
      >
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
