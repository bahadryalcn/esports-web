'use client';

import { useQuery } from '@tanstack/react-query';

interface SiteSettings {
  siteName?: string;
  siteDescription?: string;
  logo?: {
    main?: string;
    footer?: string;
    favicon?: string;
  };
  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    twitch?: string;
    discord?: string;
    linkedin?: string;
    tiktok?: string;
    kick?: string;
  };
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

export const useSiteSettings = (locale: string = 'tr') => {
  return useQuery({
    queryKey: ['siteSettings', locale],
    queryFn: async (): Promise<SiteSettings> => {
      try {
        // TinaCMS'den veri çekme - locale parametresi ile
        const response = await fetch(`/api/settings?locale=${locale}`);
        if (!response.ok) {
          throw new Error('Failed to fetch site settings');
        }
        return response.json();
      } catch (error) {
        console.error('Error fetching site settings:', error);
        // Hata durumunda boş data döndür
        return {};
      }
    },
    staleTime: 5 * 60 * 1000, // 5 dakika
    gcTime: 10 * 60 * 1000, // 10 dakika
  });
};

export type { SiteSettings };
