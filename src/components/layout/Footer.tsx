'use client';

import Link from 'next/link';
import { Gamepad2, Mail, Phone, MapPin, Twitter, Instagram, Youtube, ExternalLink } from 'lucide-react';
import type { Navigation, SiteSettings } from '@/types';

interface FooterProps {
  navigation?: Navigation;
  settings?: SiteSettings;
}

export default function Footer({ navigation, settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Use TinaCMS data or fallback
  const siteName = settings?.siteName || 'AIM Agency';
  const aboutText = navigation?.footer?.aboutText || 'Türkiye\'nin önde gelen e-spor ajansı. Profesyonel oyuncu yönetimi, turnuva organizasyonu ve gaming içerik üretimi.';
  const copyright = navigation?.footer?.copyright || `© ${currentYear} AIM Agency. Tüm hakları saklıdır.`;
  
  const contactInfo = {
    email: settings?.contact?.email || 'info@aimagency.com',
    phone: settings?.contact?.phone || '+90 212 555 00 00',
    address: settings?.contact?.address || 'İstanbul, Türkiye',
  };

  const footerSections = navigation?.footer?.sections || [
    {
      title: 'Hızlı Bağlantılar',
      links: [
        { href: '/', label: 'Ana Sayfa', external: false },
        { href: '/about', label: 'Hakkımızda', external: false },
        { href: '/services', label: 'Hizmetler', external: false },
        { href: '/players', label: 'Oyuncular', external: false },
      ],
    },
  ];

  const getSocialIcon = (url: string) => {
    if (url.includes('twitter.com') || url.includes('x.com')) return Twitter;
    if (url.includes('instagram.com')) return Instagram;
    if (url.includes('youtube.com')) return Youtube;
    return ExternalLink;
  };

  const socialLinks = settings?.social ? Object.entries(settings.social)
    .filter(([, url]) => url && url.trim())
    .map(([platform, url]) => ({
      icon: getSocialIcon(url),
      href: url,
      label: platform.charAt(0).toUpperCase() + platform.slice(1),
    })) : [];

  return (
    <footer className="bg-gaming-darker border-t border-gaming-primary/20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Gamepad2 className="w-8 h-8 text-gaming-primary group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-gaming-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
              </div>
              <span className="text-xl font-gaming font-bold neon-text">{siteName}</span>
            </Link>
            <p className="text-gray-400 text-sm">
              {aboutText}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>{contactInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{contactInfo.address}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-white font-semibold">{section.title}</h3>
              <ul className="space-y-2">
                {section.links?.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 text-sm hover:text-gaming-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 text-sm hover:text-gaming-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-gaming-primary/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 bg-gaming-primary/10 rounded-lg hover:bg-gaming-primary/20 transition-colors group"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5 text-gaming-primary group-hover:scale-110 transition-transform" />
                </a>
              );
            })}
          </div>
          <p className="text-gray-400 text-sm">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}