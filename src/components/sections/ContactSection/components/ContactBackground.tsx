'use client';

import { motion } from 'framer-motion';
import type { ContactBackgroundProps } from '../types';

export function ContactBackground({ variant = 'default', backgroundImage, overlay, parallaxOffsets = [] }: ContactBackgroundProps) {
  return (
    <div className="absolute inset-0">
      {/* Fallback Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gaming-darker to-gaming-dark" />
      
      {/* Background Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Main Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform-gpu"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            transform: `translate3d(0, ${parallaxOffsets[0] * 2}px, 0)`
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
        </div>

      {/* Subtle Background Pattern with Parallax */}
      <div 
        className="absolute inset-0 opacity-10 transform-gpu"
        style={{
          transform: `translate3d(0, ${parallaxOffsets[1] || 0}px, 0)`
        }}
      >
        <div className="absolute inset-0 bg-[url('/assets/hero-pattern.svg')] bg-repeat" />
      </div>

      {/* Gaming Effects - Her zaman görünür with Parallax */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        {variant === 'gradient' && (
          <>
            <div 
              className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-gaming-primary/15 to-red-500/15 rounded-full blur-3xl animate-pulse transform-gpu"
              style={{
                transform: `translate3d(0, ${parallaxOffsets[1] || 0}px, 0)`
              }}
            />
            <div 
              className="absolute bottom-40 left-20 w-64 h-64 bg-gradient-to-tl from-red-500/15 to-gaming-primary/15 rounded-full blur-3xl animate-pulse transform-gpu"
              style={{
                transform: `translate3d(0, ${parallaxOffsets[1] || 0}px, 0)`,
                animationDelay: '1s'
              }}
            />
            <div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-gaming-primary/10 to-red-500/10 rounded-full blur-2xl animate-pulse transform-gpu"
              style={{
                transform: `translate3d(0, ${parallaxOffsets[1] || 0}px, 0)`,
                animationDelay: '0.5s'
              }}
            />
          </>
        )}
        
        {variant === 'pattern' && (
          <>
            <div 
              className="absolute top-32 right-32 w-72 h-72 bg-gaming-primary/10 rounded-full blur-3xl transform-gpu"
              style={{
                transform: `translate3d(0, ${parallaxOffsets[1] || 0}px, 0)`
              }}
            />
            <div 
              className="absolute bottom-32 left-32 w-48 h-48 bg-red-500/10 rounded-full blur-2xl transform-gpu"
              style={{
                transform: `translate3d(0, ${parallaxOffsets[1] || 0}px, 0)`
              }}
            />
            <div 
              className="absolute top-1/3 left-1/3 w-56 h-56 bg-gaming-primary/5 rounded-full blur-xl transform-gpu"
              style={{
                transform: `translate3d(0, ${parallaxOffsets[1] || 0}px, 0)`
              }}
            />
            <div 
              className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-red-500/5 rounded-full blur-lg transform-gpu"
              style={{
                transform: `translate3d(0, ${parallaxOffsets[1] || 0}px, 0)`
              }}
            />
          </>
        )}
        
        {variant === 'default' && (
          <>
            <div 
              className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-gaming-primary/8 to-red-500/8 rounded-full blur-3xl transform-gpu"
              style={{
                transform: `translate3d(0, ${parallaxOffsets[1] || 0}px, 0)`
              }}
            />
            <div 
              className="absolute bottom-40 left-20 w-64 h-64 bg-gradient-to-tl from-red-500/8 to-gaming-primary/8 rounded-full blur-3xl transform-gpu"
              style={{
                transform: `translate3d(0, ${parallaxOffsets[1] || 0}px, 0)`
              }}
            />
            <div 
              className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-br from-gaming-primary/5 to-red-500/5 rounded-full blur-2xl transform-gpu"
              style={{
                transform: `translate3d(0, ${parallaxOffsets[1] || 0}px, 0)`
              }}
            />
          </>
        )}

        {/* Additional floating elements with parallax */}
        <div 
          className="absolute top-1/2 left-1/4 w-32 h-32 border border-gaming-primary/10 rounded-full opacity-20 transform-gpu"
          style={{
            transform: `translate3d(0, ${parallaxOffsets[2] || 0}px, 0)`
          }}
        />
        <div 
          className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-red-400/10 rounded-full opacity-15 transform-gpu"
          style={{
            transform: `translate3d(0, ${parallaxOffsets[2] || 0}px, 0)`
          }}
        />
      </motion.div>
    </div>
  );
}
