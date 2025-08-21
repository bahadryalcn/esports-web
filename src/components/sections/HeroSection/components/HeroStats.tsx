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
      transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mt-8 lg:mt-12"
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
              ease: "easeOut"
            }}
            whileHover={{ 
              y: -8,
              scale: 1.05,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="group relative"
          >
            {/* Background Glass Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-md rounded-2xl border border-red-500/20 group-hover:border-red-400/40 transition-all duration-300" />
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-700/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            
            {/* Content */}
            <div className="relative p-4 lg:p-6 text-center">
              {/* Icon Container */}
              <div className="flex justify-center mb-3">
                <motion.div 
                  className="relative p-3 bg-gradient-to-br from-red-500/20 via-red-600/10 to-red-700/20 rounded-xl group-hover:from-red-400/30 group-hover:to-red-600/30 transition-all duration-300"
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Icon Glow */}
                  <div className="absolute inset-0 bg-red-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <Icon className="relative w-6 h-6 lg:w-8 lg:h-8 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
                </motion.div>
              </div>
              
              {/* Value */}
              <motion.div 
                className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  delay: 1.6 + index * 0.1 
                }}
              >
                <span className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                  {stat.value}
                </span>
                
                {/* Value Glow */}
                <div className="absolute inset-0 text-2xl md:text-3xl lg:text-4xl font-black text-red-500 opacity-20 blur-lg group-hover:opacity-30 transition-opacity duration-300">
                  {stat.value}
                </div>
              </motion.div>
              
              {/* Label */}
              <motion.div 
                className="text-gray-300 font-medium text-xs lg:text-sm group-hover:text-white transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 + index * 0.1 }}
              >
                {stat.label}
              </motion.div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-red-500/40 rounded-full group-hover:bg-red-400/60 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-red-400/40 rounded-full group-hover:bg-red-300/60 transition-colors duration-300" />
            </div>
          </motion.div>
        );
      })}
      
      {/* Stats Section Decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="col-span-2 md:col-span-4 flex justify-center mt-6"
      >
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
      </motion.div>
    </motion.div>
  );
}