'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import type { Navigation as NavigationType, NavigationProps } from '@/types';

interface ExtendedNavigationProps extends NavigationProps {
  navigation?: NavigationType;
}

export default function Navigation({
  navigation,
  mobile = false,
  onItemClick,
}: ExtendedNavigationProps) {
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

  // Desktop Navigation Item Component
  const DesktopNavItem = ({
    item,
    isActive,
  }: {
    item: any;
    isActive: boolean;
  }) => (
    <motion.div
      className="relative"
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={item.href}
        className={`relative px-4 py-2 font-gaming text-base font-medium tracking-wide transition-all duration-300 ${
          isActive ? 'text-red-400' : 'text-gray-300 hover:text-red-300'
        }`}
        onClick={onItemClick}
      >
        {item.label}

        {/* Active Indicator */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-red-300"
            layoutId="activeIndicator"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Hover Underline */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400/50"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.2 }}
        />
      </Link>
    </motion.div>
  );

  // Mobile Navigation Item Component
  const MobileNavItem = ({
    item,
    isActive,
  }: {
    item: any;
    isActive: boolean;
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={item.href}
        className={`block px-6 py-3 font-gaming text-lg font-medium transition-all duration-300 ${
          isActive
            ? 'border-l-2 border-red-400 bg-red-500/10 text-red-400'
            : 'text-gray-300 hover:bg-red-500/5 hover:text-red-300'
        }`}
        onClick={onItemClick}
      >
        {item.label}
      </Link>
    </motion.div>
  );

  // External Link Component
  const ExternalNavItem = ({ item }: { item: any }) => (
    <motion.a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center space-x-2 px-4 py-2 font-gaming text-base font-medium text-gray-300 transition-all duration-300 hover:text-red-300 ${
        mobile ? 'block px-6 py-3 text-lg' : ''
      }`}
      onClick={onItemClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <span>{item.label}</span>
      <span className="text-sm text-red-400">↗</span>
    </motion.a>
  );

  if (mobile) {
    return (
      <motion.nav
        className="space-y-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;

          if (item.external) {
            return <ExternalNavItem key={item.href} item={item} />;
          }

          return (
            <MobileNavItem key={item.href} item={item} isActive={isActive} />
          );
        })}
      </motion.nav>
    );
  }

  return (
    <motion.nav
      className="flex items-center space-x-1"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {navigationItems.map((item) => {
        const isActive = pathname === item.href;

        if (item.external) {
          return <ExternalNavItem key={item.href} item={item} />;
        }

        return (
          <DesktopNavItem key={item.href} item={item} isActive={isActive} />
        );
      })}
    </motion.nav>
  );
}
