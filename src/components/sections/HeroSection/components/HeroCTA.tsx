'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import type { HeroCTAProps } from '../types';

export function HeroCTA({ buttonText, buttonLink }: HeroCTAProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
      className="flex flex-col sm:flex-row gap-6 justify-center"
    >
      {buttonText && buttonLink && (
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          className="group"
        >
          <Link
            href={buttonLink}
            className="inline-flex items-center justify-center space-x-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-800 rounded-xl hover:from-red-700 hover:to-red-900 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      )}
      
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/contact"
          className="inline-flex items-center justify-center space-x-3 px-8 py-4 text-lg font-bold text-white border-2 border-red-500/50 rounded-xl hover:bg-red-500/20 hover:border-red-500 transition-all duration-300 backdrop-blur-sm"
        >
          <span>İletişime Geç</span>
          <Zap className="w-5 h-5" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
