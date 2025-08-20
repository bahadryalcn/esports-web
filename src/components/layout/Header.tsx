'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Gamepad2 } from 'lucide-react';
import Navigation from './Navigation';
import type { Navigation as NavigationType } from '@/types';

interface HeaderProps {
  navigation?: NavigationType;
}

export default function Header({ navigation }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 w-full bg-gaming-dark/95 backdrop-blur-sm border-b border-gaming-primary/20 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Gamepad2 className="w-8 h-8 text-gaming-primary group-hover:animate-pulse" />
              <div className="absolute inset-0 bg-gaming-primary/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
            </div>
            <span className="text-xl font-gaming font-bold neon-text">AIM AGENCY</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <Navigation navigation={navigation} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gaming-primary hover:bg-gaming-primary/10 rounded-lg transition-colors"
            aria-label="Mobil menüyü aç/kapat"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gaming-primary/20">
            <div className="py-4">
              <Navigation navigation={navigation} mobile onItemClick={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}