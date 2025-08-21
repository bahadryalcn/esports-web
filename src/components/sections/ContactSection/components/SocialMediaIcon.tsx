import React from 'react';
import type { SocialMediaIcon as SocialMediaIconType } from '../types';

interface SocialMediaIconProps {
  icon: SocialMediaIconType;
  className?: string;
}

export function SocialMediaIcon({
  icon,
  className = 'w-5 h-5',
}: SocialMediaIconProps) {
  const getIconPath = (iconName: SocialMediaIconType) => {
    switch (iconName) {
      case 'youtube':
        return '/icons/social/youtube.svg';
      case 'twitch':
        return '/icons/social/twitch.svg';
      case 'twitter':
      case 'x':
        return '/icons/social/twitter.svg';
      case 'instagram':
        return '/icons/social/instagram.svg';
      case 'tiktok':
        return '/icons/social/tiktok.svg';
      case 'discord':
        return '/icons/social/discord.svg';
      case 'kick':
        return '/icons/social/kick.svg';
      case 'linkedin':
        return '/icons/social/linkedin.svg';
      case 'facebook':
        return '/icons/social/facebook.svg';
      default:
        return '/icons/social/twitter.svg';
    }
  };

  const getIconFilter = (iconName: SocialMediaIconType) => {
    switch (iconName) {
      case 'youtube':
        return 'brightness(0) saturate(100%) invert(55%) sepia(96%) saturate(3528%) hue-rotate(343deg) brightness(96%) contrast(106%)';
      case 'twitch':
        return 'brightness(0) saturate(100%) invert(76%) sepia(21%) saturate(2082%) hue-rotate(240deg) brightness(103%) contrast(101%)';
      case 'twitter':
      case 'x':
        return 'brightness(0) saturate(100%) invert(69%) sepia(96%) saturate(3157%) hue-rotate(200deg) brightness(103%) contrast(104%)';
      case 'instagram':
        return 'brightness(0) saturate(100%) invert(64%) sepia(96%) saturate(3181%) hue-rotate(310deg) brightness(103%) contrast(106%)';
      case 'tiktok':
        return 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(344deg) brightness(103%) contrast(101%)';
      case 'discord':
        return 'brightness(0) saturate(100%) invert(58%) sepia(96%) saturate(3181%) hue-rotate(230deg) brightness(103%) contrast(106%)';
      case 'kick':
        return 'brightness(0) saturate(100%) invert(69%) sepia(96%) saturate(3157%) hue-rotate(120deg) brightness(103%) contrast(104%)';
      case 'linkedin':
        return 'brightness(0) saturate(100%) invert(40%) sepia(96%) saturate(3181%) hue-rotate(200deg) brightness(103%) contrast(106%)';
      case 'facebook':
        return 'brightness(0) saturate(100%) invert(40%) sepia(96%) saturate(3181%) hue-rotate(200deg) brightness(103%) contrast(106%)';
      default:
        return 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%)';
    }
  };

  const getIconColor = (iconName: SocialMediaIconType) => {
    switch (iconName) {
      case 'youtube':
        return 'group-hover:bg-red-500/20 group-hover:border-red-500/50';
      case 'twitch':
        return 'group-hover:bg-purple-500/20 group-hover:border-purple-500/50';
      case 'twitter':
      case 'x':
        return 'group-hover:bg-blue-500/20 group-hover:border-blue-500/50';
      case 'instagram':
        return 'group-hover:bg-pink-500/20 group-hover:border-pink-500/50';
      case 'tiktok':
        return 'group-hover:bg-gray-800/20 group-hover:border-gray-600/50';
      case 'discord':
        return 'group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50';
      case 'kick':
        return 'group-hover:bg-green-500/20 group-hover:border-green-500/50';
      case 'linkedin':
        return 'group-hover:bg-blue-600/20 group-hover:border-blue-600/50';
      case 'facebook':
        return 'group-hover:bg-blue-700/20 group-hover:border-blue-700/50';
      default:
        return 'group-hover:bg-red-500/20 group-hover:border-red-500/50';
    }
  };

  return (
    <img
      src={getIconPath(icon)}
      alt={icon}
      className={className}
      style={{ filter: getIconFilter(icon) }}
    />
  );
}
