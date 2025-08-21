import { useMemo } from 'react';
import type { HeroSlide, UseHeroSlidesProps } from '../types';

export function useHeroSlides({ 
  title, 
  subtitle, 
  ctaText, 
  ctaLink, 
  backgroundImage, 
  overlay, 
  slides 
}: UseHeroSlidesProps): HeroSlide[] {
  
  return useMemo(() => {
    if (slides && slides.length > 0) {
      return slides;
    }

    // Convert single slide props to slides array for backwards compatibility
    return [{
      headline: title || 'E-spor Dünyasında Öncü',
      subtext: subtitle || 'Profesyonel oyuncu yönetimi, turnuva organizasyonu ve gaming içerik üretimi ile e-spor dünyasında fark yaratıyoruz.',
      buttonText: ctaText || 'Hizmetlerimizi Keşfedin',
      buttonLink: ctaLink || '/hizmetler',
      backgroundImage: backgroundImage || '/bg/1.jpg',
      overlay,
      stats: [
        { value: '25+', label: 'Şampiyonluk', icon: 'trophy' },
        { value: '50+', label: 'Oyuncu', icon: 'users' },
        { value: '100+', label: 'Proje', icon: 'target' },
        { value: '∞', label: 'Potansiyel', icon: 'zap' },
      ]
    }];
  }, [title, subtitle, ctaText, ctaLink, backgroundImage, overlay, slides]);
}
