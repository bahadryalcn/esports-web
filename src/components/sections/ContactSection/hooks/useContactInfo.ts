import { Mail, Phone, MapPin, Globe, MessageCircle, Clock } from 'lucide-react';
import type { ContactInfo, SocialMediaIcon } from '../types';

// TinaCMS'ten gelen contact info interface'i
interface TinaCMSContactInfo {
  label: string;
  value: string;
  href: string;
  icon?: string;
}

// Icon mapping for TinaCMS icon names to Lucide icons
const iconMap: Record<string, any> = {
  mail: Mail,
  phone: Phone,
  'map-pin': MapPin,
  globe: Globe,
  'message-circle': MessageCircle,
  clock: Clock,
};

// Social media icon mapping
const socialMediaIconMap: Record<string, SocialMediaIcon> = {
  youtube: 'youtube',
  twitch: 'twitch',
  twitter: 'twitter',
  x: 'x',
  instagram: 'instagram',
  tiktok: 'tiktok',
  discord: 'discord',
  kick: 'kick',
  linkedin: 'linkedin',
  facebook: 'facebook',
};

export const useContactInfo = (
  customContactInfo?: TinaCMSContactInfo[] | ContactInfo[]
): ContactInfo[] => {
  const defaultContactInfo: ContactInfo[] = [
    {
      icon: Mail,
      label: 'E-mail',
      value: 'info@aimagency.com',
      href: 'mailto:info@aimagency.com',
    },
    {
      icon: Phone,
      label: 'Telefon',
      value: '+90 555 123 45 67',
      href: 'tel:+905551234567',
    },
    {
      icon: MapPin,
      label: 'Adres',
      value: 'İstanbul, Türkiye',
      href: '#',
    },
  ];

  // Convert TinaCMS contact info to ContactInfo format
  if (customContactInfo && customContactInfo.length > 0) {
    const convertedContactInfo = customContactInfo.map(
      (info: TinaCMSContactInfo | ContactInfo) => {
        let icon: any;

        if (info.icon && typeof info.icon === 'string') {
          // Check if it's a social media icon
          if (socialMediaIconMap[info.icon.toLowerCase()]) {
            icon = socialMediaIconMap[info.icon.toLowerCase()];
          } else if (iconMap[info.icon]) {
            // It's a Lucide icon
            icon = iconMap[info.icon];
          } else {
            // Fallback to Mail icon
            icon = Mail;
          }
        } else {
          icon = Mail;
        }

        return {
          icon,
          label: info.label,
          value: info.value,
          href: info.href,
          isSocialMedia: typeof icon === 'string',
        };
      }
    );
    return convertedContactInfo;
  }

  return defaultContactInfo;
};
