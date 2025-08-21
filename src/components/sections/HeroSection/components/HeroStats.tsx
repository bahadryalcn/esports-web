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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
    >
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon as keyof typeof iconMap] || Trophy;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 1.2 + index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="group"
          >
            <div className="p-6 text-center bg-black/40 backdrop-blur-md rounded-2xl border border-red-500/30 hover:bg-black/60 hover:border-red-500/50 transition-all duration-300">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-br from-red-500/30 to-red-700/30 rounded-xl group-hover:from-red-500/50 group-hover:to-red-700/50 transition-all duration-300">
                  <Icon className="w-8 h-8 text-red-400 group-hover:text-white transition-colors" />
                </div>
              </div>
              
              {/* Value */}
              <div className="text-3xl md:text-4xl font-gaming font-bold text-white mb-2">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-gray-300 font-display text-sm group-hover:text-white transition-colors">
                {stat.label}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
