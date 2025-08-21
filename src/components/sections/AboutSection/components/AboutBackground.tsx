'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { AboutBackgroundProps } from '../types';

export function AboutBackground({ variant = 'default', backgroundImage, overlay }: AboutBackgroundProps) {
  return (
    <div className="absolute inset-0">
      {/* Fallback Gradient Background - Hero tarzı */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gaming-darker to-gaming-dark" />
      
      {/* Background Image */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          />
          
          {/* Custom Overlay */}
          {overlay && overlay.opacity !== undefined && overlay.opacity > 0 && (
            <div 
              className="absolute inset-0"
              style={{
                backgroundColor: overlay.color || '#000000',
                opacity: overlay.opacity
              }}
            />
          )}
          
          {/* Default Dark overlay for readability when no custom overlay */}
          {(!overlay || overlay.opacity === undefined || overlay.opacity === 0) && (
            <div 
              className="absolute inset-0 bg-black/40"
            />
          )}
        </motion.div>
      )}

      {/* Subtle Background Pattern - Hero benzeri */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/assets/hero-pattern.svg')] bg-repeat" />
      </div>

      {/* Gaming Effects */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        {variant === 'gradient' && (
          <>
            <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-gaming-primary/15 to-red-500/15 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-40 left-20 w-64 h-64 bg-gradient-to-tl from-red-500/15 to-gaming-primary/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
          </>
        )}
        
        {variant === 'pattern' && (
          <>
            <div className="absolute top-32 right-32 w-72 h-72 bg-gaming-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-32 left-32 w-48 h-48 bg-red-500/10 rounded-full blur-2xl" />
          </>
        )}
        
        {variant === 'default' && (
          <>
            <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-gaming-primary/8 to-red-500/8 rounded-full blur-3xl" />
            <div className="absolute bottom-40 left-20 w-64 h-64 bg-gradient-to-tl from-red-500/8 to-gaming-primary/8 rounded-full blur-3xl" />
          </>
        )}
      </motion.div>
    </div>
  );
}
