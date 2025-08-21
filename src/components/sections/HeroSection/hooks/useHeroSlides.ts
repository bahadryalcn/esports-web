import { useMemo } from 'react';
import type { HeroSlide, UseHeroSlidesProps } from '../types';

export function useHeroSlides({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
  overlay,
  slides,
}: UseHeroSlidesProps): HeroSlide[] {
  return useMemo(() => {
    // Eğer slides array'i varsa, onu direkt kullan
    if (slides && slides.length > 0) {
      console.log('useHeroSlides: Using slides array:', slides);
      return slides;
    }

    // Slides yoksa, single slide props'tan oluştur
    console.log('useHeroSlides: Creating single slide from props');
    return [
      {
        headline: title || 'E-spor Dünyasında Öncü',
        subtext:
          subtitle ||
          'Profesyonel oyuncu yönetimi, turnuva organizasyonu ve gaming içerik üretimi ile e-spor dünyasında fark yaratıyoruz.',
        buttonText: ctaText || 'Hizmetlerimizi Keşfedin',
        buttonLink: ctaLink || '/hizmetler',
        backgroundImage: backgroundImage || '/bg/1.jpg', // Fallback background image
        overlay,
        stats: [
          { value: '25+', label: 'Şampiyonluk', icon: 'trophy' },
          { value: '50+', label: 'Oyuncu', icon: 'users' },
          { value: '100+', label: 'Proje', icon: 'target' },
          { value: '∞', label: 'Potansiyel', icon: 'zap' },
        ],
      },
    ];
  }, [title, subtitle, ctaText, ctaLink, backgroundImage, overlay, slides]);
}
