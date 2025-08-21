export interface HeroSlide {
  headline: string;
  subtext?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage: string;
  overlay?: {
    opacity: number;
    color: string;
  };
  stats?: {
    value: string;
    label: string;
    icon: string;
  }[];
}

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  overlay?: {
    opacity: number;
    color: string;
  };
  slides?: HeroSlide[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

export interface HeroBackgroundProps {
  currentSlide: number;
  backgroundImage: string;
  overlay?: {
    opacity: number;
    color: string;
  };
}

export interface HeroContentProps {
  currentSlide: number;
  children: React.ReactNode;
}

export interface HeroHeadingProps {
  headline: string;
  subtext?: string;
}

export interface HeroCTAProps {
  buttonText?: string;
  buttonLink?: string;
}

export interface HeroStatsProps {
  stats: {
    value: string;
    label: string;
    icon: string;
  }[];
}

export interface HeroNavigationProps {
  showArrows: boolean;
  showDots: boolean;
  slidesLength: number;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}

export interface HeroScrollIndicatorProps {}

export interface UseHeroSlidesProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  overlay?: {
    opacity: number;
    color: string;
  };
  slides?: HeroSlide[];
}

export interface UseHeroAutoplayProps {
  autoplay: boolean;
  autoplaySpeed: number;
  slidesLength: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}
