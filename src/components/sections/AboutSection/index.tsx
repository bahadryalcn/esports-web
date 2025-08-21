'use client';

import { useState } from 'react';
import { AboutBackground } from './components/AboutBackground';
import { AboutContent } from './components/AboutContent';
import { AboutValues } from './components/AboutValues';
import { AboutStats } from './components/AboutStats';
import { useAboutValues } from './hooks/useAboutValues';
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

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Container */}
      <AboutBackground 
        variant={backgroundVariant}
        backgroundImage={image}
        overlay={overlay}
      />

      {/* Main Container with Grid Layout */}
      <div className="relative z-10 container mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Left Side - Content */}
          <div className="space-y-8">
            <AboutContent
              title={title}
              content={content || ''}
              image={logo} // Logo as content image
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

          {/* Right Side - Values */}
          {showValues && (
            <div className="lg:pl-8">
              <AboutValues 
                values={aboutValues}
                layout="grid"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
