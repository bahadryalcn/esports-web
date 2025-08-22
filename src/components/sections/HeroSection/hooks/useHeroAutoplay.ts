import { useEffect, useRef } from 'react';
import type { UseHeroAutoplayProps } from '../types';

export function useHeroAutoplay({
  autoplay,
  autoplaySpeed,
  slidesLength,
  setCurrentSlide,
}: UseHeroAutoplayProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Hydration sorunlarını önlemek için autoplay'i sadece client-side başlat
    if (!autoplay || slidesLength <= 1 || typeof window === 'undefined') {
      return;
    }

    // Önceki interval'ı temizle
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Yeni interval'ı başlat
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesLength);
    }, autoplaySpeed);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoplay, autoplaySpeed, slidesLength, setCurrentSlide]);

  // Component unmount olduğunda interval'ı temizle
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
}
