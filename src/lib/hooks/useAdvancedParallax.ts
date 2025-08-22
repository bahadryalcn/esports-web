'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  easing?: 'linear' | 'ease-out' | 'ease-in' | 'ease-in-out';
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  disabled?: boolean;
}

interface ParallaxLayer {
  speed: number;
  direction?: 'up' | 'down';
  easing?: 'linear' | 'ease-out' | 'ease-in' | 'ease-in-out';
}

interface ParallaxState {
  offset: { x: number; y: number };
  progress: number;
  isVisible: boolean;
  hasTriggered: boolean;
}

// Performance utilities - hydration safe
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768;
};

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Throttle function for better performance
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// RAF-based scroll handler for smooth performance
class ScrollManager {
  private static instance: ScrollManager;
  private callbacks: Set<() => void> = new Set();
  private rafId: number | null = null;
  private lastScrollY = 0;
  private isScrolling = false;
  private isClient = false;

  static getInstance() {
    if (!ScrollManager.instance) {
      ScrollManager.instance = new ScrollManager();
    }
    return ScrollManager.instance;
  }

  private constructor() {
    // SSR safe initialization
    if (typeof window !== 'undefined') {
      this.isClient = true;
      window.addEventListener('scroll', this.handleScroll, { passive: true });
    }
  }

  private handleScroll = () => {
    if (!this.isClient || !this.isScrolling) {
      this.isScrolling = true;
      this.scheduleUpdate();
    }
  };

  private scheduleUpdate = () => {
    if (!this.isClient) return;

    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }

    this.rafId = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - this.lastScrollY) > 1) {
        this.callbacks.forEach((callback) => callback());
        this.lastScrollY = currentScrollY;
      }
      this.isScrolling = false;
    });
  };

  subscribe(callback: () => void) {
    this.callbacks.add(callback);
    return () => {
      this.callbacks.delete(callback);
    };
  }

  destroy() {
    if (this.isClient) {
      window.removeEventListener('scroll', this.handleScroll);
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.callbacks.clear();
  }
}

export const useAdvancedParallax = ({
  speed = 0.5,
  direction = 'up',
  easing = 'ease-out',
  threshold = 0.1,
  disabled = false,
}: ParallaxOptions = {}) => {
  const [state, setState] = useState<ParallaxState>({
    offset: { x: 0, y: 0 },
    progress: 0,
    isVisible: false,
    hasTriggered: false,
  });

  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Hydration safe initialization
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDisabled =
    disabled || !mounted || isMobile() || prefersReducedMotion();

  // Memoized easing function
  const applyEasing = useCallback((progress: number, easingType: string) => {
    switch (easingType) {
      case 'ease-out':
        return 1 - Math.pow(1 - progress, 3);
      case 'ease-in':
        return Math.pow(progress, 3);
      case 'ease-in-out':
        return progress < 0.5
          ? 2 * Math.pow(progress, 3)
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      default:
        return progress;
    }
  }, []);

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    if (!mounted || typeof window === 'undefined') return;

    const element = ref.current;
    if (!element || isDisabled || !state.isVisible) return;

    const rect = element.getBoundingClientRect();
    const scrollY = window.scrollY;
    const elementTop = rect.top + scrollY;
    const elementHeight = rect.height;
    const windowHeight = window.innerHeight;

    // Calculate progress more efficiently
    const scrollProgress =
      (scrollY - elementTop + windowHeight) / (elementHeight + windowHeight);
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    const easedProgress = applyEasing(clampedProgress, easing);

    // Calculate offset with reduced intensity for better performance
    const maxOffset = windowHeight * speed * 0.3; // Reduced multiplier
    const currentOffset = easedProgress * maxOffset;

    setState((prev) => ({
      ...prev,
      progress: clampedProgress,
      offset: {
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
      },
    }));
  }, [
    speed,
    direction,
    easing,
    isDisabled,
    state.isVisible,
    applyEasing,
    mounted,
  ]);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const element = ref.current;
    if (!element || isDisabled) {
      setState((prev) => ({ ...prev, offset: { x: 0, y: 0 } }));
      return;
    }

    // Use Intersection Observer for visibility detection
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setState((prev) => ({
            ...prev,
            isVisible: entry.isIntersecting,
            hasTriggered: prev.hasTriggered || entry.isIntersecting,
          }));
        },
        {
          threshold,
          rootMargin: '50px 0px',
        }
      );

      observerRef.current.observe(element);
    }

    // Subscribe to optimized scroll manager
    const scrollManager = ScrollManager.getInstance();
    const unsubscribe = scrollManager.subscribe(handleScroll);

    // Initial call
    handleScroll();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      unsubscribe();
    };
  }, [handleScroll, threshold, isDisabled, mounted]);

  return {
    ref,
    offset: state.offset,
    progress: state.progress,
    isVisible: state.isVisible,
  };
};

// Multi-layer parallax for background images
export const useMultiLayerParallax = (layers: ParallaxLayer[]) => {
  const [state, setState] = useState({
    offsets: [] as number[],
    isVisible: false,
  });

  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Hydration safe initialization
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDisabled = !mounted || isMobile() || prefersReducedMotion();

  // Memoize layers and easing functions
  const memoizedLayers = useMemo(() => layers, [JSON.stringify(layers)]);

  const applyLayerEasing = useCallback((progress: number, easing?: string) => {
    switch (easing) {
      case 'ease-out':
        return 1 - Math.pow(1 - progress, 2);
      case 'ease-in':
        return Math.pow(progress, 2);
      case 'ease-in-out':
        return progress < 0.5
          ? 2 * Math.pow(progress, 2)
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      default:
        return progress;
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!mounted || typeof window === 'undefined') return;

    const element = ref.current;
    if (!element || isDisabled || !state.isVisible) return;

    const rect = element.getBoundingClientRect();
    const scrollY = window.scrollY;
    const elementTop = rect.top + scrollY;
    const elementHeight = rect.height;
    const windowHeight = window.innerHeight;

    const scrollProgress =
      (scrollY - elementTop + windowHeight) / (elementHeight + windowHeight);
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

    // Calculate offsets for each layer with reduced intensity
    const newOffsets = memoizedLayers.map((layer) => {
      const easedProgress = applyLayerEasing(clampedProgress, layer.easing);
      const maxOffset = windowHeight * layer.speed * 0.2; // Reduced multiplier
      const currentOffset = easedProgress * maxOffset;

      return layer.direction === 'up' ? -currentOffset : currentOffset;
    });

    setState((prev) => ({ ...prev, offsets: newOffsets }));
  }, [memoizedLayers, isDisabled, state.isVisible, applyLayerEasing, mounted]);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const element = ref.current;
    if (!element || isDisabled) {
      setState((prev) => ({
        ...prev,
        offsets: new Array(memoizedLayers.length).fill(0),
      }));
      return;
    }

    // Use Intersection Observer
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setState((prev) => ({ ...prev, isVisible: entry.isIntersecting }));
        },
        {
          threshold: 0.1,
          rootMargin: '100px 0px',
        }
      );

      observerRef.current.observe(element);
    }

    // Subscribe to scroll manager
    const scrollManager = ScrollManager.getInstance();
    const unsubscribe = scrollManager.subscribe(handleScroll);

    handleScroll();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      unsubscribe();
    };
  }, [handleScroll, memoizedLayers, isDisabled, mounted]);

  return { ref, offsets: state.offsets };
};

// Sticky parallax for Apple-style effects
export const useStickyParallax = (stickyDistance: number = 100) => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({
    isSticky: false,
    progress: 0,
    isVisible: false,
  });

  const [mounted, setMounted] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Hydration safe initialization
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDisabled = !mounted || isMobile() || prefersReducedMotion();

  const handleScroll = useCallback(() => {
    if (!mounted || typeof window === 'undefined') return;

    const element = ref.current;
    if (!element || isDisabled || !state.isVisible) return;

    const rect = element.getBoundingClientRect();

    if (rect.top <= stickyDistance) {
      const stickyProgress = Math.min(
        1,
        (stickyDistance - rect.top) / stickyDistance
      );
      setState((prev) => ({
        ...prev,
        isSticky: true,
        progress: stickyProgress,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        isSticky: false,
        progress: 0,
      }));
    }
  }, [stickyDistance, isDisabled, state.isVisible, mounted]);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const element = ref.current;
    if (!element || isDisabled) {
      setState((prev) => ({ ...prev, isSticky: false, progress: 0 }));
      return;
    }

    // Use Intersection Observer
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setState((prev) => ({ ...prev, isVisible: entry.isIntersecting }));
        },
        {
          threshold: 0,
          rootMargin: '200px 0px',
        }
      );

      observerRef.current.observe(element);
    }

    // Subscribe to scroll manager
    const scrollManager = ScrollManager.getInstance();
    const unsubscribe = scrollManager.subscribe(handleScroll);

    handleScroll();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      unsubscribe();
    };
  }, [handleScroll, isDisabled, mounted]);

  return {
    ref,
    isSticky: state.isSticky,
    progress: state.progress,
  };
};

// Cleanup function for scroll manager
export const cleanupScrollManager = () => {
  if (typeof window !== 'undefined') {
    ScrollManager.getInstance().destroy();
  }
};

// High-performance parallax hook for hero sections
export const useHeroParallax = () => {
  const [transform, setTransform] = useState({ y: 0, scale: 1, opacity: 1 });
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Hydration safe initialization
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDisabled = !mounted || isMobile() || prefersReducedMotion();

  const handleScroll = useCallback(() => {
    if (!mounted || typeof window === 'undefined' || isDisabled) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollProgress = Math.min(scrollY / windowHeight, 1);

    setTransform({
      y: scrollY * 0.3, // Subtle parallax
      scale: 1 - scrollProgress * 0.1, // Slight scale effect
      opacity: 1 - scrollProgress * 0.3, // Fade effect
    });
  }, [isDisabled, mounted]);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    if (isDisabled) {
      setTransform({ y: 0, scale: 1, opacity: 1 });
      return;
    }

    const scrollManager = ScrollManager.getInstance();
    const unsubscribe = scrollManager.subscribe(handleScroll);
    handleScroll();

    return unsubscribe;
  }, [handleScroll, isDisabled, mounted]);

  return { ref, transform };
};

// Optimized parallax for text elements
export const useTextParallax = (speed: number = 0.2) => {
  const [offset, setOffset] = useState(0);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Hydration safe initialization
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDisabled = !mounted || isMobile() || prefersReducedMotion();

  const handleScroll = useCallback(() => {
    if (!mounted || typeof window === 'undefined') return;

    const element = ref.current;
    if (!element || isDisabled || !isVisible) return;

    const rect = element.getBoundingClientRect();
    const scrollProgress =
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

    setOffset(clampedProgress * window.innerHeight * speed);
  }, [speed, isDisabled, isVisible, mounted]);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const element = ref.current;
    if (!element || isDisabled) {
      setOffset(0);
      return;
    }

    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0, rootMargin: '50px 0px' }
      );

      observerRef.current.observe(element);
    }

    const scrollManager = ScrollManager.getInstance();
    const unsubscribe = scrollManager.subscribe(handleScroll);
    handleScroll();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      unsubscribe();
    };
  }, [handleScroll, isDisabled, mounted]);

  return { ref, offset };
};
