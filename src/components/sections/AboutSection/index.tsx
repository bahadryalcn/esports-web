'use client';

import { useState } from 'react';
import { AboutBackground } from './components/AboutBackground';
import { AboutContent } from './components/AboutContent';
import { AboutValues } from './components/AboutValues';
import { AboutStats } from './components/AboutStats';
import { useAboutValues } from './hooks/useAboutValues';
import { useAboutContent } from './hooks/useAboutContent';
import {
  useAdvancedParallax,
  useMultiLayerParallax,
} from '@/lib/hooks/useAdvancedParallax';
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
  logo,
}: AboutSectionProps) {
  // Use custom values or default ones
  const aboutValues = useAboutValues(values);

  // Use custom content or default ones from TinaCMS
  const { main, secondary, vision } = useAboutContent(content);

  // Multi-layer parallax for background elements
  const { ref: parallaxRef, offsets } = useMultiLayerParallax([
    { speed: 0.2, direction: 'up' }, // Background image
    { speed: 0.4, direction: 'up' }, // Gradient elements
    { speed: 0.1, direction: 'down' }, // Subtle elements
  ]);

  // Advanced parallax for content
  const { ref: contentRef, offset: contentOffset } = useAdvancedParallax({
    speed: 0.3,
    direction: 'up',
    easing: 'ease-out',
  });

  return (
    <section
      className={`relative flex min-h-screen items-center justify-center overflow-hidden ${className}`}
      ref={parallaxRef}
    >
      {/* Background Container */}
      <AboutBackground
        variant={backgroundVariant}
        backgroundImage={image}
        overlay={overlay}
        parallaxOffsets={offsets}
      />

      {/* Main Container with Grid Layout */}
      <div
        className="container relative z-10 mx-auto w-full px-4"
        ref={contentRef}
      >
        <div className="grid min-h-screen grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2">
          {/* Left Side - Logo + Content + Values */}
          <div
            className="transform-gpu space-y-8"
            style={{
              transform: `translate3d(0, ${contentOffset.y * 0.3}px, 0)`,
            }}
          >
            {/* Logo and Content Card */}
            <div className="rounded-3xl border border-red-500/20 p-8 transition-all duration-300 glass-dark hover:border-red-400/30">
              <div className="space-y-6">
                {/* Logo */}
                {logo && (
                  <div className="flex justify-center">
                    <div className="group relative">
                      {/* Glow effect behind image */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/20 to-red-700/20 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"></div>

                      {/* Image container */}
                      <div className="relative rounded-3xl border border-red-500/20 p-6 transition-all duration-300 glass-dark group-hover:border-red-400/40">
                        <img
                          src={logo}
                          alt={`${title} Logo`}
                          className="h-auto max-h-[160px] w-auto max-w-[160px] object-contain lg:max-h-[200px] lg:max-w-[200px]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Title and Content */}
                <div className="space-y-4 text-center">
                  <h2 className="font-gaming text-2xl font-bold text-white lg:text-3xl">
                    <span className="text-gaming-gradient">{title}</span>
                  </h2>

                  <p className="text-base leading-relaxed text-gray-300 lg:text-lg">
                    {main}
                  </p>

                  {/* Decorative line */}
                  <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Values Section - 4 items in a row */}
            {showValues && (
              <div>
                <h3 className="mb-6 text-center font-gaming text-2xl font-bold text-white">
                  <span className="text-gaming-gradient">Değerlerimiz</span>
                </h3>
                <AboutValues values={aboutValues} layout="grid-4" />
              </div>
            )}
          </div>

          {/* Right Side - Mission and Vision */}
          <div
            className="transform-gpu lg:pl-8"
            style={{
              transform: `translate3d(0, ${contentOffset.y * 0.5}px, 0)`,
            }}
          >
            <AboutContent
              title=""
              content={content || ''}
              contentAlignment={contentAlignment}
            >
              {/* Stats */}
              {showStats && stats && stats.length > 0 && (
                <AboutStats stats={stats} variant="compact" />
              )}
            </AboutContent>
          </div>
        </div>
      </div>
    </section>
  );
}
