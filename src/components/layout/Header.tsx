'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Gamepad2, Sparkles } from 'lucide-react';
import Navigation from './Navigation';
import { useSiteSettings } from '@/lib/hooks/useSiteSettings';
import type { Navigation as NavigationType } from '@/types';

interface HeaderProps {
  navigation?: NavigationType;
}

export default function Header({ navigation }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  
  // Site settings hook'u - Türkçe locale ile
  const { data: siteSettings, isLoading: settingsLoading } = useSiteSettings('tr');

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Check if scrolled down
      setIsScrolled(currentScrollY > 20);
      
      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl border-b border-red-500/50 shadow-2xl shadow-red-500/20' 
          : 'bg-black/80 backdrop-blur-md border-b border-red-500/30'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-red-950/20" />
        <div className="absolute inset-0 bg-[url('/assets/hero-pattern.svg')] bg-repeat opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 via-transparent to-transparent" />
      </div>

      {/* Glowing Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/20 to-red-500/0 opacity-30 blur-sm" />

      <div className="container relative mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-4 group relative">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {/* Main Icon Container */}
              <div className="relative z-10 p-4 bg-gradient-to-br from-red-500/30 to-red-700/40 rounded-2xl border border-red-500/50 backdrop-blur-sm shadow-lg shadow-red-500/20">
                {siteSettings?.logo?.main ? (
                  <Image
                    src={siteSettings.logo.main}
                    alt={siteSettings.siteName || 'AIM AGENCY'}
                    width={82}
                    height={82}
                    className="w-8 h-8 object-cover"
                  />
                ) : (
                  <Gamepad2 className="w-8 h-8 text-red-300 group-hover:text-red-200 transition-all duration-300" />
                )}
                
                {/* Animated Sparkles */}
                <motion.div
                  className="absolute -top-1 -right-1"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>
              </div>

              {/* Glowing Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-700/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              
              {/* Animated Ring */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-red-500/30"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>

            {/* Logo Text */}
            <div className="relative">
              <motion.span 
                className="text-2xl font-gaming font-bold bg-gradient-to-r from-red-400 via-red-300 to-red-500 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {siteSettings?.siteName || 'AIM AGENCY'}
              </motion.span>
              
              {/* Text Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-red-300 to-red-500 blur-lg opacity-30 group-hover:opacity-50 transition-all duration-300" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex">
            <Navigation navigation={navigation} />
          </div>

          {/* Enhanced Mobile Menu Button */}
          <motion.button
            onClick={toggleMobileMenu}
            className="lg:hidden relative p-3 text-red-400 hover:text-red-300 rounded-2xl transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Mobil menüyü aç/kapat"
          >
            {/* Button Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-700/30 rounded-2xl border border-red-500/30 backdrop-blur-sm group-hover:border-red-500/50 transition-all duration-300" />
            
            {/* Button Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-700/20 rounded-2xl blur-md group-hover:blur-lg transition-all duration-300" />
            
            {/* Icon */}
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        </div>

        {/* Enhanced Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="lg:hidden border-t border-red-500/30 bg-black/95 backdrop-blur-xl shadow-2xl shadow-red-500/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* Mobile Menu Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 via-transparent to-transparent" />
              
              <div className="relative py-6">
                <Navigation 
                  navigation={navigation} 
                  mobile 
                  onItemClick={() => setIsMobileMenuOpen(false)} 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Glow Line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"
        animate={{ 
          opacity: [0.3, 1, 0.3],
          scaleX: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
    </motion.header>
  );
}