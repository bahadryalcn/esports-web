'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { HeroCTAProps } from '../types';

export function HeroCTA({ buttonText, buttonLink }: HeroCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
      className="flex flex-col sm:flex-row gap-6 justify-center items-center"
    >
      {/* Primary CTA Button */}
      {buttonText && buttonLink && (
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="group relative"
        >
          {/* Button Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300" />
          
          <Link
            href={buttonLink}
            className="relative inline-flex items-center justify-center space-x-3 px-6 py-3 text-base lg:text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 rounded-xl transition-all duration-300 shadow-2xl border border-red-500/20 hover:border-red-400/40 backdrop-blur-sm"
          >
            {/* Button Icon */}
            <Sparkles className="w-5 h-5 text-red-200 group-hover:text-white transition-colors" />
            <span className="font-semibold tracking-wide">{buttonText}</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            
            {/* Button Shine Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </Link>
        </motion.div>
      )}
      
      {/* Secondary CTA Button */}
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
        className="group relative"
      >
        {/* Glass morphism background */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-xl border border-red-500/20 group-hover:border-red-400/40 transition-colors duration-300" />
        
        <Link
          href="/contact"
          className="relative inline-flex items-center justify-center space-x-3 px-6 py-3 text-base lg:text-lg font-semibold text-white hover:text-red-100 rounded-xl transition-all duration-300 backdrop-blur-sm"
        >
          <Zap className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
          <span>İletişime Geç</span>
          
          {/* Hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </motion.div>
      
      {/* Call to Action Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="hidden xl:flex items-center space-x-2 text-xs text-gray-400"
      >
        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-red-500/50" />
        <span className="font-medium">E-spor dünyasına adım atın</span>
        <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-red-500/50" />
      </motion.div>
    </motion.div>
  );
}