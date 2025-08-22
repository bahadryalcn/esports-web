'use client';

import { useState, useMemo, useEffect } from 'react';
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
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  // Hydration sorununu önlemek için mounted state'i
  useEffect(() => {
    setMounted(true);
  }, []);

  // Convert single slide props to slides array for backwards compatibility
  const heroSlides = useHeroSlides({
    title,
    subtitle,
    ctaText,
    ctaLink,
    backgroundImage,
    overlay,
    slides,
  });

  // Auto-play functionality - sadece mount olduktan sonra başlat
  useHeroAutoplay({
    autoplay: autoplay && mounted,
    autoplaySpeed,
    slidesLength: heroSlides.length,
    setCurrentSlide,
  });

  // Memoize current slide data to prevent unnecessary re-renders
  const currentSlideData = useMemo(() => {
    // Mount olmadan önce güvenli fallback döndür
    if (!mounted) {
      return (
        heroSlides[0] || {
          headline: title || 'E-spor Dünyasında Öncü',
          subtext:
            subtitle ||
            'Profesyonel oyuncu yönetimi, turnuva organizasyonu ve gaming içerik üretimi ile e-spor dünyasında fark yaratıyoruz.',
          buttonText: ctaText || 'Hizmetlerimizi Keşfedin',
          buttonLink: ctaLink || '/hizmetler',
          backgroundImage: backgroundImage || '/bg/1.jpg',
          overlay,
        }
      );
    }
    return heroSlides[currentSlide] || heroSlides[0];
  }, [
    heroSlides,
    currentSlide,
    mounted,
    title,
    subtitle,
    ctaText,
    ctaLink,
    backgroundImage,
    overlay,
  ]);

  // Memoize background image and overlay to prevent unnecessary re-renders
  const { currentBackgroundImage, currentOverlay } = useMemo(() => {
    const hasSlides = slides && slides.length > 0;
    return {
      currentBackgroundImage:
        hasSlides && mounted
          ? currentSlideData.backgroundImage
          : backgroundImage || '/bg/1.jpg',
      currentOverlay: hasSlides && mounted ? currentSlideData.overlay : overlay,
    };
  }, [slides, currentSlideData, backgroundImage, overlay, mounted]);

  // Hydration hatalarını önlemek için loading state
  if (!mounted) {
    return (
      <section className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden pt-0">
        {/* Background Container */}
        <HeroBackground
          currentSlide={0}
          backgroundImage={backgroundImage || '/bg/1.jpg'}
          overlay={overlay}
        />

        {/* Content Container */}
        <div className="container relative z-20 mx-auto flex min-h-screen items-center justify-center px-4 pt-0">
          {/* Main Content */}
          <HeroContent currentSlide={0}>
            <HeroHeading
              headline={title || 'E-spor Dünyasında Öncü'}
              subtext={
                subtitle ||
                'Profesyonel oyuncu yönetimi, turnuva organizasyonu ve gaming içerik üretimi ile e-spor dünyasında fark yaratıyoruz.'
              }
            />

            {/* CTA Buttons */}
            {(ctaText || ctaLink) && (
              <HeroCTA buttonText={ctaText} buttonLink={ctaLink} />
            )}
          </HeroContent>
        </div>

        {/* Scroll Indicator */}
        <HeroScrollIndicator />
      </section>
    );
  }

  return (
    <section className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden pt-0">
      {/* Background Container */}
      <HeroBackground
        currentSlide={currentSlide}
        backgroundImage={currentBackgroundImage}
        overlay={currentOverlay}
      />

      {/* Content Container */}
      <div className="container relative z-20 mx-auto flex min-h-screen items-center justify-center px-4 pt-0">
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

      {/* Navigation - sadece mount olduktan sonra göster */}
      {heroSlides.length > 1 && (
        <HeroNavigation
          showArrows={showArrows}
          showDots={showDots}
          slidesLength={heroSlides.length}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
      )}

      {/* Scroll Indicator */}
      <HeroScrollIndicator />
    </section>
  );
}
