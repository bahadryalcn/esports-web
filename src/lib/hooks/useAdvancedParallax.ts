'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  easing?: 'linear' | 'ease-out' | 'ease-in' | 'ease-in-out';
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface ParallaxLayer {
  speed: number;
  direction?: 'up' | 'down';
}

interface ParallaxState {
  offset: { x: number; y: number };
  progress: number;
  isVisible: boolean;
  hasTriggered: boolean;
}

export const useAdvancedParallax = ({
  speed = 1.5, // Default speed artırıldı
  direction = 'up',
  easing = 'ease-out',
  threshold = 0.1,
}: ParallaxOptions = {}) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate how much of the element is visible
      const visibleRatio = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + elementHeight))
      );

      // Apply threshold
      if (visibleRatio < threshold) return;

      // Calculate offset based on scroll position and element position
      const scrollProgress =
        (scrollY - elementTop + windowHeight) / (elementHeight + windowHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      // Apply easing
      let easedProgress = clampedProgress;
      if (easing === 'ease-out') {
        easedProgress = 1 - Math.pow(1 - clampedProgress, 3);
      } else if (easing === 'ease-in') {
        easedProgress = Math.pow(clampedProgress, 3);
      } else if (easing === 'ease-in-out') {
        easedProgress =
          clampedProgress < 0.5
            ? 2 * Math.pow(clampedProgress, 3)
            : 1 - Math.pow(-2 * clampedProgress + 2, 3) / 2;
      }

      // Calculate final offset
      const maxOffset = windowHeight * speed;
      const currentOffset = easedProgress * maxOffset;

      setOffset({
        x:
          direction === 'left'
            ? -currentOffset
            : direction === 'right'
              ? currentOffset
              : 0,
        y:
          direction === 'up'
            ? -currentOffset
            : direction === 'down'
              ? currentOffset
              : 0,
      });
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction, easing, threshold]);

  return { ref, offset };
};

// Multi-layer parallax for background images
export const useMultiLayerParallax = (layers: ParallaxLayer[]) => {
  const [offsets, setOffsets] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  // Memoize layers to prevent infinite re-renders
  const memoizedLayers = useMemo(() => layers, [JSON.stringify(layers)]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate how much of the element is visible
      const visibleRatio = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + elementHeight))
      );

      // Apply threshold
      if (visibleRatio < 0.1) return;

      // Calculate scroll progress
      const scrollProgress =
        (scrollY - elementTop + windowHeight) / (elementHeight + windowHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

      // Calculate offsets for each layer
      const newOffsets = memoizedLayers.map((layer) => {
        const maxOffset = windowHeight * layer.speed;
        const currentOffset = clampedProgress * maxOffset;

        return layer.direction === 'up' ? -currentOffset : currentOffset;
      });

      setOffsets(newOffsets);
    };

    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [memoizedLayers]); // Use memoized layers

  return { ref, offsets };
};

// Sticky parallax for Apple-style effects
export const useStickyParallax = (stickyDistance: number = 100) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;

      if (rect.top <= stickyDistance) {
        setIsSticky(true);
        const stickyProgress = Math.min(
          1,
          (stickyDistance - rect.top) / stickyDistance
        );
        setProgress(stickyProgress);
      } else {
        setIsSticky(false);
        setProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [stickyDistance]);

  return { ref, isSticky, progress };
};
