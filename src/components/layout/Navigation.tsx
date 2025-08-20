'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Navigation as NavigationType, NavigationProps } from '@/types';

interface ExtendedNavigationProps extends NavigationProps {
  navigation?: NavigationType;
}

export default function Navigation({ navigation, mobile = false, onItemClick }: ExtendedNavigationProps) {
  const pathname = usePathname();

  // Fallback navigation items if TinaCMS data is not available
  const fallbackItems = [
    { href: '/', label: 'Ana Sayfa', external: false },
    { href: '/about', label: 'Hakkımızda', external: false },
    { href: '/services', label: 'Hizmetler', external: false },
    { href: '/players', label: 'Oyuncular', external: false },
    { href: '/news', label: 'Haberler', external: false },
    { href: '/contact', label: 'İletişim', external: false },
  ];

  const navigationItems = navigation?.header?.menuItems || fallbackItems;

  const baseClasses = mobile
    ? "block px-4 py-2 text-white hover:bg-gaming-primary/10 hover:text-gaming-primary transition-colors"
    : "px-4 py-2 text-white hover:text-gaming-primary transition-colors relative";

  const activeClasses = mobile
    ? "bg-gaming-primary/20 text-gaming-primary"
    : "text-gaming-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gaming-primary";

  return (
    <nav className={mobile ? "space-y-1" : "flex space-x-2"}>
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;
        
        if (item.external) {
          return (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={baseClasses}
              onClick={onItemClick}
            >
              {item.label}
            </a>
          );
        }
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`${baseClasses} ${isActive ? activeClasses : ''}`}
            onClick={onItemClick}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}