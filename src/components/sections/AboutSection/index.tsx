'use client';

import { useState } from 'react';
import { AboutBackground } from './components/AboutBackground';
import { AboutContent } from './components/AboutContent';
import { AboutValues } from './components/AboutValues';
import { AboutStats } from './components/AboutStats';
import { useAboutValues } from './hooks/useAboutValues';
import { useAboutContent } from './hooks/useAboutContent';
import { useAdvancedParallax, useMultiLayerParallax } from '@/lib/hooks/useAdvancedParallax';
import { AboutSectionProps } from './types';

export default function AboutSection({
  title = 'Hakkımızda',
  content,
  image,
  stats,
  values,
  backgroundVariant = 'default',
  contentAlignment = 'left',
  showStats = true,
  showValues = true,
  className = '',
  overlay,
  logo
}: AboutSectionProps) {
  // Use custom values or default ones
  const aboutValues = useAboutValues(values);
  
  // Use custom content or default ones from TinaCMS
  const { main, secondary, vision } = useAboutContent(content);

  // Multi-layer parallax for background elements
  const { ref: parallaxRef, offsets } = useMultiLayerParallax([
    { speed: 0.2, direction: 'up' },    // Background image
    { speed: 0.4, direction: 'up' },    // Gradient elements
    { speed: 0.1, direction: 'down' }   // Subtle elements
  ]);

  // Advanced parallax for content
  const { ref: contentRef, offset: contentOffset } = useAdvancedParallax({
    speed: 0.3,
    direction: 'up',
    easing: 'ease-out'
  });

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`} ref={parallaxRef}>
      {/* Background Container */}
      <AboutBackground 
        variant={backgroundVariant}
        backgroundImage={image}
        overlay={overlay}
        parallaxOffsets={offsets}
      />

      {/* Main Container with Grid Layout */}
      <div className="relative z-10 container mx-auto px-4 w-full" ref={contentRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Left Side - Logo + Content + Values */}
          <div 
            className="space-y-8 transform-gpu"
            style={{
              transform: `translate3d(0, ${contentOffset.y * 0.3}px, 0)`
            }}
          >
            {/* Logo and Content Card */}
            <div className="glass-dark rounded-3xl p-8 border border-red-500/20 hover:border-red-400/30 transition-all duration-300">
              <div className="space-y-6">
                {/* Logo */}
                {logo && (
                  <div className="flex justify-center">
                    <div className="relative group">
                      {/* Glow effect behind image */}
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-700/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Image container */}
                      <div className="relative glass-dark rounded-3xl p-6 border border-red-500/20 group-hover:border-red-400/40 transition-all duration-300">
                        <img 
                          src={logo} 
                          alt={`${title} Logo`}
                          className="w-auto h-auto max-w-[160px] max-h-[160px] lg:max-w-[200px] lg:max-h-[200px] object-contain"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Title and Content */}
                <div className="text-center space-y-4">
                  <h2 className="text-2xl lg:text-3xl font-gaming font-bold text-white">
                    <span className="text-gaming-gradient">{title}</span>
                  </h2>
                  
                  <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
                    {main}
                  </p>

                  {/* Decorative line */}
                  <div className="mx-auto h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full w-24"></div>
                </div>
              </div>
            </div>

            {/* Values Section - 4 items in a row */}
            {showValues && (
              <div>
                <h3 className="text-2xl font-gaming font-bold text-white mb-6 text-center">
                  <span className="text-gaming-gradient">Değerlerimiz</span>
                </h3>
                <AboutValues 
                  values={aboutValues}
                  layout="grid-4"
                />
              </div>
            )}
          </div>

          {/* Right Side - Mission and Vision */}
          <div 
            className="lg:pl-8 transform-gpu"
            style={{
              transform: `translate3d(0, ${contentOffset.y * 0.5}px, 0)`
            }}
          >
            <AboutContent
              title=""
              content={content || ''}
              contentAlignment={contentAlignment}
            >
              {/* Stats */}
              {showStats && stats && stats.length > 0 && (
                <AboutStats 
                  stats={stats} 
                  variant="compact"
                />
              )}
            </AboutContent>
          </div>
        </div>
      </div>
    </section>
  );
}
