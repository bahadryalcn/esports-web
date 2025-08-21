'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink
} from 'lucide-react';
import { useSiteSettings } from '@/lib/hooks/useSiteSettings';
import type { Navigation, SiteSettings, FooterSection } from '@/types';

interface FooterProps {
  navigation?: Navigation;
  settings?: SiteSettings;
}

export default function Footer({ navigation, settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  
  // Site settings hook'u - Türkçe locale ile
  const { data: siteSettings, isLoading: settingsLoading } = useSiteSettings('tr');

  // Use site settings data or fallback
  const siteName = siteSettings?.siteName || 'AIM Agency';
  const aboutText = siteSettings?.siteDescription || 'Türkiye\'nin önde gelen e-spor ajansı. Profesyonel oyuncu yönetimi, turnuva organizasyonu ve gaming içerik üretimi.';
  const copyright = `© ${currentYear} ${siteName}. Tüm hakları saklıdır.`;
  
  const contactInfo = {
    email: siteSettings?.contact?.email || 'info@aimagency.com',
    phone: siteSettings?.contact?.phone || '+90 212 555 00 00',
    address: siteSettings?.contact?.address || 'İstanbul, Türkiye',
  };

  const footerSections = navigation?.footer?.sections || [
    {
      title: 'Hızlı Bağlantılar',
      links: [
        { href: '/', label: 'Ana Sayfa', external: false },
        { href: '/about', label: 'Hakkımızda', external: false },
        { href: '/services', label: 'Hizmetler', external: false },
        { href: '/players', label: 'Oyuncular', external: false },
        { href: '/news', label: 'Haberler', external: false },
        { href: '/contact', label: 'İletişim', external: false },
      ],
    },
    {
      title: 'Hizmetlerimiz',
      links: [
        { href: '/services/esports-management', label: 'E-spor Yönetimi', external: false },
        { href: '/services/tournament-organization', label: 'Turnuva Organizasyonu', external: false },
        { href: '/services/streaming-content', label: 'Streaming & İçerik', external: false },
        { href: '/services/coaching-training', label: 'Koçluk & Eğitim', external: false },
      ],
    },
    {
      title: 'Takım',
      links: [
        { href: '/players', label: 'Oyuncularımız', external: false },
        { href: '/about', label: 'Hakkımızda', external: false },
        { href: '/news', label: 'Haberler', external: false },
        { href: '/sponsors', label: 'Sponsorlar', external: false },
      ],
    },
  ];

  const getSocialIcon = (url: string) => {
    if (url.includes('twitter.com') || url.includes('x.com')) return '/icons/social/twitter.svg';
    if (url.includes('instagram.com')) return '/icons/social/instagram.svg';
    if (url.includes('youtube.com')) return '/icons/social/youtube.svg';
    if (url.includes('twitch.tv')) return '/icons/social/twitch.svg';
    if (url.includes('discord.gg') || url.includes('discord.com')) return '/icons/social/discord.svg';
    if (url.includes('steamcommunity.com') || url.includes('steampowered.com')) return '/icons/social/steam.svg';
    if (url.includes('tiktok.com')) return '/icons/social/tiktok.svg';
    if (url.includes('kick.com')) return '/icons/social/kick.svg';
    if (url.includes('facebook.com')) return '/icons/social/facebook.svg';
    if (url.includes('linkedin.com')) return '/icons/social/linkedin.svg';
    return '/icons/social/twitter.svg'; // fallback
  };

  const getSocialColor = (url: string) => {
    if (url.includes('twitter.com') || url.includes('x.com')) return 'hover:bg-blue-500/20 hover:border-blue-500/50';
    if (url.includes('instagram.com')) return 'hover:bg-pink-500/20 hover:border-pink-500/50';
    if (url.includes('youtube.com')) return 'hover:bg-red-500/20 hover:border-red-500/50';
    if (url.includes('twitch.tv')) return 'hover:bg-purple-500/20 hover:border-purple-500/50';
    if (url.includes('discord.gg') || url.includes('discord.com')) return 'hover:bg-indigo-500/20 hover:border-indigo-500/50';
    if (url.includes('steamcommunity.com') || url.includes('steampowered.com')) return 'hover:bg-gray-500/20 hover:border-gray-500/50';
    if (url.includes('tiktok.com')) return 'hover:bg-gray-800/20 hover:border-gray-600/50';
    if (url.includes('kick.com')) return 'hover:bg-green-500/20 hover:border-green-500/50';
    if (url.includes('facebook.com')) return 'hover:bg-blue-600/20 hover:border-blue-600/50';
    if (url.includes('linkedin.com')) return 'hover:bg-blue-700/20 hover:border-blue-700/50';
    return 'hover:bg-red-500/20 hover:border-red-500/50';
  };

  const getSocialFilter = (url: string) => {
    if (url.includes('twitter.com') || url.includes('x.com')) return 'brightness(0) saturate(100%) invert(69%) sepia(96%) saturate(3157%) hue-rotate(200deg) brightness(103%) contrast(104%)';
    if (url.includes('instagram.com')) return 'brightness(0) saturate(100%) invert(64%) sepia(96%) saturate(3181%) hue-rotate(310deg) brightness(103%) contrast(106%)';
    if (url.includes('youtube.com')) return 'brightness(0) saturate(100%) invert(55%) sepia(96%) saturate(3528%) hue-rotate(343deg) brightness(96%) contrast(106%)';
    if (url.includes('twitch.tv')) return 'brightness(0) saturate(100%) invert(76%) sepia(21%) saturate(2082%) hue-rotate(240deg) brightness(103%) contrast(101%)';
    if (url.includes('discord.gg') || url.includes('discord.com')) return 'brightness(0) saturate(100%) invert(58%) sepia(96%) saturate(3181%) hue-rotate(230deg) brightness(103%) contrast(106%)';
    if (url.includes('steamcommunity.com') || url.includes('steampowered.com')) return 'brightness(0) saturate(100%) invert(75%) sepia(0%) saturate(1969%) hue-rotate(344deg) brightness(103%) contrast(101%)';
    if (url.includes('tiktok.com')) return 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(344deg) brightness(103%) contrast(101%)';
    if (url.includes('kick.com')) return 'brightness(0) saturate(100%) invert(69%) sepia(96%) saturate(3157%) hue-rotate(120deg) brightness(103%) contrast(104%)';
    if (url.includes('facebook.com')) return 'brightness(0) saturate(100%) invert(40%) sepia(96%) saturate(3157%) hue-rotate(200deg) brightness(103%) contrast(104%)';
    if (url.includes('linkedin.com')) return 'brightness(0) saturate(100%) invert(30%) sepia(96%) saturate(3157%) hue-rotate(200deg) brightness(103%) contrast(104%)';
    return 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%)';
  };

  const socialLinks = siteSettings?.social ? Object.entries(siteSettings.social)
    .filter(([, url]) => url && url.trim())
    .map(([platform, url]) => ({
      icon: getSocialIcon(url),
      href: url,
      label: platform.charAt(0).toUpperCase() + platform.slice(1),
      color: getSocialColor(url),
      filter: getSocialFilter(url),
    })) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <footer className="relative overflow-hidden bg-black/90 backdrop-blur-md border-t border-red-500/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/assets/hero-pattern.svg')] bg-repeat" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-950/20 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <div className="relative z-10 p-4 bg-gradient-to-br from-red-500/60 to-red-700/80 rounded-xl border-2 border-red-400 backdrop-blur-sm shadow-xl shadow-red-500/30 min-w-[48px] min-h-[48px] flex items-center justify-center">
                  {siteSettings?.logo?.footer ? (
                    <Image
                      src={siteSettings.logo.footer}
                      alt={siteSettings.siteName || 'AIM AGENCY'}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain"
                      priority
                    />
                  ) : (
                    <Gamepad2 className="w-12 h-12 text-red-200 group-hover:text-red-100 transition-colors" />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-700/30 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
              </motion.div>
              <span className="text-2xl font-gaming font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                {siteName}
              </span>
            </Link>
            
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
              {aboutText}
            </p>
            
            <div className="space-y-3">
              <motion.div 
                className="flex items-center space-x-3 text-gray-400 hover:text-red-300 transition-colors group"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="p-2 bg-gradient-to-br from-red-500/10 to-red-700/20 rounded-lg border border-red-500/20 group-hover:border-red-500/40 transition-all duration-300">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">{contactInfo.email}</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 text-gray-400 hover:text-red-300 transition-colors group"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="p-2 bg-gradient-to-br from-red-500/10 to-red-700/20 rounded-lg border border-red-500/20 group-hover:border-red-500/40 transition-all duration-300">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">{contactInfo.phone}</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 text-gray-400 hover:text-red-300 transition-colors group"
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="p-2 bg-gradient-to-br from-red-500/10 to-red-700/20 rounded-lg border border-red-500/20 group-hover:border-red-500/40 transition-all duration-300">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm">{contactInfo.address}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          {footerSections.map((section: FooterSection, index: number) => (
            <motion.div key={index} variants={itemVariants} className="space-y-6">
              <h3 className="text-white font-gaming font-bold text-lg bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links?.map((link, linkIndex: number) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 text-sm hover:text-red-300 transition-colors duration-300 flex items-center space-x-2 group"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 text-sm hover:text-red-300 transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Social Media & Copyright */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-red-500/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          {/* Social Media */}
          <div className="flex space-x-3 mb-6 md:mb-0">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-gradient-to-br from-red-500/10 to-red-700/20 rounded-xl border border-red-500/30 backdrop-blur-sm transition-all duration-300 ${social.color} group`}
                aria-label={social.label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="relative flex h-5 w-5 items-center justify-center">
                  <img
                    src={social.icon}
                    alt={social.label}
                    className="h-5 w-5 transition-all duration-300 group-hover:scale-110"
                    style={{ filter: social.filter }}
                  />
                </div>
              </motion.a>
            ))}
          </div>
          
          {/* Copyright */}
          <motion.p 
            className="text-gray-400 text-sm text-center md:text-right"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {copyright}
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}