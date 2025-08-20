'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, Target } from 'lucide-react';
import Link from 'next/link';
import type { StatItem } from '@/types';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  overlay?: {
    opacity: number;
    color: string;
  };
}

export default function HeroSection({
  title = 'E-spor Dünyasında Öncü',
  subtitle = 'Profesyonel oyuncu yönetimi, turnuva organizasyonu ve gaming içerik üretimi ile e-spor dünyasında fark yaratıyoruz.',
  ctaText = 'Hizmetlerimizi Keşfedin',
  ctaLink = '/hizmetler',
  backgroundImage,
  overlay
}: HeroSectionProps) {
  const stats: StatItem[] = [
    { icon: Trophy, value: '25+', label: 'Şampiyonluk' },
    { icon: Users, value: '50+', label: 'Oyuncu' },
    { icon: Target, value: '100+', label: 'Proje' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gaming-dark via-gaming-darker to-black">
        <div className="absolute inset-0 bg-[url('/assets/hero-pattern.svg')] opacity-10"></div>
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-gaming-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gaming-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container-custom">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-gaming font-bold">
              <span className="block neon-text animate-neon-pulse">{title}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              {subtitle}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href={ctaLink}
              className="gaming-button inline-flex items-center justify-center space-x-2 group"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border-2 border-gaming-primary text-gaming-primary hover:bg-gaming-primary hover:text-white rounded-lg transition-all duration-300 font-bold"
            >
              İletişime Geç
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          >
            {stats.map((stat: StatItem, index: number) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="gaming-card p-6 text-center group hover:scale-105 transition-transform duration-300"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gaming-primary/20 rounded-full">
                      <Icon className="w-8 h-8 text-gaming-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gaming-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gaming-primary rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
}