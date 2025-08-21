import { Target, Award, Zap, Users, Shield, Rocket, Heart, Star } from 'lucide-react';
import { AboutValue } from '../types';

// TinaCMS'ten gelen values interface'i
interface TinaCMSValue {
  title: string;
  description: string;
  icon?: string;
}

// Icon mapping for TinaCMS icon names to Lucide icons
const iconMap: Record<string, any> = {
  target: Target,
  award: Award,
  zap: Zap,
  users: Users,
  shield: Shield,
  rocket: Rocket,
  heart: Heart,
  star: Star,
};

export const useAboutValues = (customValues?: TinaCMSValue[] | AboutValue[]): AboutValue[] => {
  const defaultValues: AboutValue[] = [
    {
      icon: Target,
      title: 'Mükemmellik',
      description: 'Her projede en yüksek kalite standartlarını hedefliyoruz.'
    },
    {
      icon: Award,
      title: 'Başarı',
      description: 'Oyuncularımızın ve takımlarımızın başarısı bizim başarımızdır.'
    },
    {
      icon: Zap,
      title: 'İnovasyon',
      description: 'Sürekli gelişim ve yenilikçi yaklaşımlarla sektörde öncüyüz.'
    },
    {
      icon: Users,
      title: 'Takım Çalışması',
      description: 'Güçlü ekip ruhu ile birlikte daha büyük başarılar elde ediyoruz.'
    }
  ];

  // Convert TinaCMS values to AboutValue format
  if (customValues && customValues.length > 0) {
    const convertedValues = customValues.map((value: any) => ({
      icon: value.icon ? iconMap[value.icon] || Target : Target,
      title: value.title,
      description: value.description
    }));
    return convertedValues;
  }

  return defaultValues;
};
