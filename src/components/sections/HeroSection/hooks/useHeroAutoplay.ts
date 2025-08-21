import { useEffect } from 'react';
import type { UseHeroAutoplayProps } from '../types';

export function useHeroAutoplay({
  autoplay,
  autoplaySpeed,
  slidesLength,
  setCurrentSlide,
}: UseHeroAutoplayProps) {
  useEffect(() => {
    if (!autoplay || slidesLength <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesLength);
    }, autoplaySpeed);

    return () => clearInterval(interval);
  }, [autoplay, autoplaySpeed, slidesLength, setCurrentSlide]);
}
