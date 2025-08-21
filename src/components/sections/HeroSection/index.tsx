'use client';

import { useState } from 'react';
import { HeroBackground } from './components/HeroBackground';
import { HeroContent } from './components/HeroContent';
import { HeroNavigation } from './components/HeroNavigation';
import { HeroScrollIndicator } from './components/HeroScrollIndicator';
import { HeroStats } from './components/HeroStats';
import { HeroCTA } from './components/HeroCTA';
import { HeroHeading } from './components/HeroHeading';
import { useHeroSlides } from './hooks/useHeroSlides';
import { useHeroAutoplay } from './hooks/useHeroAutoplay';
import { HeroSectionProps } from './types';

export default function HeroSection({
  title = 'E-spor Dünyasında Öncü',
  subtitle = 'Profesyonel oyuncu yönetimi, turnuva organizasyonu ve gaming içerik üretimi ile e-spor dünyasında fark yaratıyoruz.',
  ctaText = 'Hizmetlerimizi Keşfedin',
  ctaLink = '/hizmetler',
  backgroundImage,
  overlay,
  slides,
  autoplay = true,
  autoplaySpeed = 5000,
  showDots = true,
  showArrows = true,
}: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Convert single slide props to slides array for backwards compatibility
  const heroSlides = useHeroSlides({ title, subtitle, ctaText, ctaLink, backgroundImage, overlay, slides });
  
  // Auto-play functionality
  useHeroAutoplay({ autoplay, autoplaySpeed, slidesLength: heroSlides.length, setCurrentSlide });

  const currentSlideData = heroSlides[currentSlide];
  
  // Eğer slides varsa, onları kullan; yoksa fallback
  const hasSlides = slides && slides.length > 0;
  const currentBackgroundImage = hasSlides ? currentSlideData.backgroundImage : (backgroundImage || '/bg/1.jpg');
  const currentOverlay = hasSlides ? currentSlideData.overlay : overlay;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Container */}
      <HeroBackground 
        currentSlide={currentSlide}
        backgroundImage={currentBackgroundImage}
        overlay={currentOverlay}
      />

      {/* Content Container */}
      <div className="container relative z-20 mx-auto px-4 flex items-center justify-center min-h-screen">
        {/* Main Content */}
        <HeroContent currentSlide={currentSlide}>
          <HeroHeading 
            headline={currentSlideData.headline}
            subtext={currentSlideData.subtext}
          />

          {/* CTA Buttons */}
          {(currentSlideData.buttonText || currentSlideData.buttonLink) && (
            <HeroCTA 
              buttonText={currentSlideData.buttonText}
              buttonLink={currentSlideData.buttonLink}
            />
          )}

          {/* Stats */}
          {currentSlideData.stats && currentSlideData.stats.length > 0 && (
            <HeroStats stats={currentSlideData.stats} />
          )}
        </HeroContent>
      </div>

      {/* Navigation */}
      <HeroNavigation
        showArrows={showArrows}
        showDots={showDots}
        slidesLength={heroSlides.length}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />

      {/* Scroll Indicator */}
      <HeroScrollIndicator />
    </section>
  );
}
