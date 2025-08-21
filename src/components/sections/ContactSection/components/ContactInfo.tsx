'use client';

import { motion } from 'framer-motion';
import { SocialMediaIcon } from './SocialMediaIcon';
import type { ContactInfoProps, ContactInfo as ContactInfoType } from '../types';

export function ContactInfo({ 
  title = 'İletişim Bilgileri',
  subtitle = 'Profesyonel e-spor hizmetleri için bizimle iletişime geçin.',
  contactInfo,
  contentAlignment = 'left'
}: ContactInfoProps) {
  const renderIcon = (contactItem: ContactInfoType) => {
    if (typeof contactItem.icon === 'string') {
      // Social media icon
      return (
        <SocialMediaIcon 
          icon={contactItem.icon} 
          className="w-5 h-5 text-gaming-primary group-hover:text-white transition-colors duration-300" 
        />
      );
    } else {
      // Lucide icon
      const Icon = contactItem.icon;
      return <Icon className="w-5 h-5 text-gaming-primary group-hover:text-white transition-colors duration-300" />;
    }
  };

  const getIconBackgroundColor = (contactItem: ContactInfoType) => {
    if (typeof contactItem.icon === 'string') {
      // Social media specific colors
      switch (contactItem.icon) {
        case 'youtube':
          return 'bg-red-500/20 border-red-500/30 group-hover:bg-red-500/40 group-hover:border-red-500/50';
        case 'twitch':
          return 'bg-purple-500/20 border-purple-500/30 group-hover:bg-purple-500/40 group-hover:border-purple-500/50';
        case 'twitter':
        case 'x':
          return 'bg-blue-500/20 border-blue-500/30 group-hover:bg-blue-500/40 group-hover:border-blue-500/50';
        case 'instagram':
          return 'bg-pink-500/20 border-pink-500/30 group-hover:bg-pink-500/40 group-hover:border-pink-500/50';
        case 'tiktok':
          return 'bg-gray-800/20 border-gray-600/30 group-hover:bg-gray-800/40 group-hover:border-gray-600/50';
        case 'discord':
          return 'bg-indigo-500/20 border-indigo-500/30 group-hover:bg-indigo-500/40 group-hover:border-indigo-500/50';
        case 'kick':
          return 'bg-green-500/20 border-green-500/30 group-hover:bg-green-500/40 group-hover:border-green-500/50';
        case 'linkedin':
          return 'bg-blue-600/20 border-blue-600/30 group-hover:bg-blue-600/40 group-hover:border-blue-600/50';
        case 'facebook':
          return 'bg-blue-700/20 border-blue-700/30 group-hover:bg-blue-700/40 group-hover:border-blue-700/50';
        default:
          return 'bg-gaming-primary/20 border-gaming-primary/30 group-hover:bg-gaming-primary/40 group-hover:border-gaming-primary/50';
      }
    } else {
      // Default gaming primary color for Lucide icons
      return 'bg-gaming-primary/20 border-gaming-primary/30 group-hover:bg-gaming-primary/40 group-hover:border-gaming-primary/50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Info Header - Minimalist */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="space-y-3"
      >
        <h3 className="text-2xl md:text-3xl font-gaming font-bold text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="text-gray-400 leading-relaxed text-base max-w-md">
            {subtitle}
          </p>
        )}
      </motion.div>

      {/* Contact Items - Grid layout: 1 column on mobile, 2 columns on large screens */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        {contactInfo.map((info, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="flex items-center space-x-3 group cursor-pointer"
            >
              <div className={`p-2.5 rounded-lg border backdrop-blur-sm transition-all duration-300 flex-shrink-0 ${getIconBackgroundColor(info)}`}>
                {renderIcon(info)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-xs font-medium mb-1 uppercase tracking-wider">{info.label}</p>
                {info.href !== '#' ? (
                  <a
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : '_self'}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-white hover:text-gaming-primary transition-colors duration-300 font-medium text-sm truncate block"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-white font-medium text-sm truncate">{info.value}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
