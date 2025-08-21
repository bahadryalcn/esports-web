import { LucideIcon } from 'lucide-react';

export interface AboutValue {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface AboutStat {
  value: string;
  label: string;
  subtitle?: string;
}

export interface AboutSectionProps {
  title?: string;
  content?: string;
  image?: string;
  logo?: string;
  overlay?: {
    color?: string;
    opacity?: number;
  };
  stats?: AboutStat[];
  values?: AboutValue[];
  backgroundVariant?: 'default' | 'gradient' | 'pattern';
  contentAlignment?: 'left' | 'center' | 'right';
  showStats?: boolean;
  showValues?: boolean;
  className?: string;
}

export interface AboutBackgroundProps {
  variant?: 'default' | 'gradient' | 'pattern';
  backgroundImage?: string;
  overlay?: {
    color?: string;
    opacity?: number;
  };
}

export interface AboutContentProps {
  title: string;
  content: string;
  image?: string;
  contentAlignment?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
}

export interface AboutValuesProps {
  values: AboutValue[];
  layout?: 'grid' | 'list' | 'carousel';
}

export interface AboutStatsProps {
  stats: AboutStat[];
  variant?: 'default' | 'compact' | 'detailed';
}
