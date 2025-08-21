import { LucideIcon } from 'lucide-react';

export type SocialMediaIcon = 'youtube' | 'twitch' | 'twitter' | 'x' | 'instagram' | 'tiktok' | 'discord' | 'kick' | 'linkedin' | 'facebook';

export interface ContactInfo {
  icon: LucideIcon | SocialMediaIcon;
  label: string;
  value: string;
  href: string;
  isSocialMedia?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  showForm?: boolean;
  backgroundImage?: string;
  overlay?: {
    color?: string;
    opacity?: number;
  };
  backgroundVariant?: 'default' | 'gradient' | 'pattern';
  contentAlignment?: 'left' | 'center' | 'right';
  contactInfo?: ContactInfo[];
  formTitle?: string;
  formSubtitle?: string;
  infoTitle?: string;
  infoSubtitle?: string;
  mapTitle?: string;
  showMap?: boolean;
  className?: string;
}

export interface ContactBackgroundProps {
  variant?: 'default' | 'gradient' | 'pattern';
  backgroundImage?: string;
  overlay?: {
    color?: string;
    opacity?: number;
  };
}

export interface ContactContentProps {
  title: string;
  subtitle?: string;
  contentAlignment?: 'left' | 'center' | 'right';
  children?: React.ReactNode;
}

export interface ContactFormProps {
  title?: string;
  subtitle?: string;
  contentAlignment?: 'left' | 'center' | 'right';
  onSubmit?: (data: ContactFormData) => void;
}

export interface ContactInfoProps {
  title?: string;
  subtitle?: string;
  contactInfo: ContactInfo[];
  mapTitle?: string;
  showMap?: boolean;
  contentAlignment?: 'left' | 'center' | 'right';
}
