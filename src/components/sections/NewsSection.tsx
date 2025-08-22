'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNewsData } from '@/lib/hooks/useNewsData';
import {
  useAdvancedParallax,
  useMultiLayerParallax,
  useTextParallax,
} from '@/lib/hooks/useAdvancedParallax';
import {
  Calendar,
  ArrowRight,
  Clock,
  User,
  ExternalLink,
  Eye,
  MessageCircle,
  Share2,
  BookOpen,
  TrendingUp,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

// Types
interface NewsArticle {
  title: string;
  excerpt: string;
  category: string;
  publishDate: string;
  featuredImage: string;
  author: string;
  featured: boolean;
  slug: string;
  locale: string;
}

interface SelectedNews {
  news: string; // file path for TinaCMS reference
}

interface ResolvedNews {
  news: {
    title: string;
    excerpt: string;
    category: string;
    publishDate: string;
    featuredImage: string;
    author: string;
    featured: boolean;
    slug: string;
    locale: string;
  };
}

interface NewsSectionProps {
  title: string;
  subtitle?: string;
  selectedNews?: SelectedNews[];
  showFeaturedOnly?: boolean;
  maxArticles?: number;
  layout?: 'grid' | 'carousel' | 'list' | 'masonry';
  showCategories?: boolean;
  showReadMore?: boolean;
  cardStyle?: 'modern' | 'minimal' | 'classic';
  background?: {
    image?: string;
    overlay?: {
      color?: string;
      opacity?: number;
    };
  };
  showViewAllButton?: boolean;
  viewAllButtonText?: string;
  viewAllButtonLink?: string;
}

// Category colors with red gaming theme
const categoryColors = {
  tournament:
    'bg-gradient-to-r from-red-600/30 to-red-800/30 text-red-300 border-red-500/50',
  team: 'bg-gradient-to-r from-red-500/30 to-red-700/30 text-red-200 border-red-400/50',
  player:
    'bg-gradient-to-r from-red-700/30 to-red-900/30 text-red-300 border-red-600/50',
  announcement:
    'bg-gradient-to-r from-red-600/30 to-red-800/30 text-red-300 border-red-500/50',
  general:
    'bg-gradient-to-r from-red-500/30 to-red-700/30 text-red-200 border-red-400/50',
  default:
    'bg-gradient-to-r from-red-500/30 to-red-700/30 text-red-200 border-red-400/50',
};

// Mock news data - will be replaced with useNewsData hook
const mockNews: NewsArticle[] = [
  {
    title: 'Valorant Türkiye Şampiyonluğu',
    excerpt:
      "Takımımız Valorant Türkiye Şampiyonluğu'nda büyük başarı elde etti. Finalde rakip takımı 3-1 mağlup ederek şampiyon olduk.",
    category: 'tournament',
    publishDate: '2024-01-15',
    featuredImage: '/assets/news/news-1.jpg',
    author: 'AIM Agency',
    featured: true,
    slug: 'valorant-turkiye-sampiyonlugu',
    locale: 'tr',
  },
  {
    title: 'Yeni Oyuncu Transferi',
    excerpt:
      'Deneyimli oyuncumuz takımımıza katıldı. Geçmiş başarıları ve oyun tecrübesi ile takımımızı güçlendirecek.',
    category: 'player',
    publishDate: '2024-01-10',
    featuredImage: '/assets/news/news-2.jpg',
    author: 'AIM Agency',
    featured: false,
    slug: 'yeni-oyuncu-transferi',
    locale: 'tr',
  },
  {
    title: 'Yeni Gaming House',
    excerpt:
      "Oyuncularımız için modern ve konforlu yeni gaming house'umuzu açtık. En son teknoloji ile donatılmış eğitim ortamı.",
    category: 'announcement',
    publishDate: '2024-01-05',
    featuredImage: '/assets/news/news-3.jpg',
    author: 'AIM Agency',
    featured: true,
    slug: 'yeni-gaming-house',
    locale: 'tr',
  },
];

const NewsCard: React.FC<{
  article: NewsArticle;
  index: number;
  cardStyle: string;
  showCategories: boolean;
  showReadMore: boolean;
}> = ({ article, index, cardStyle, showCategories, showReadMore }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      tournament: 'Turnuva',
      team: 'Takım',
      player: 'Oyuncu',
      announcement: 'Duyuru',
      general: 'Genel',
    };
    return labels[category] || category;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: { type: 'spring', stiffness: 300 },
      }}
      className="group"
    >
      <div className="hover-lift h-full rounded-3xl border border-red-500/20 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-red-400/40 hover:bg-black/60 hover:shadow-xl hover:shadow-red-500/20 group-hover:glass-dark">
        {/* Featured Image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl">
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-red-500/20 to-red-700/30">
            <span className="text-6xl text-red-400/50">📰</span>
          </div>

          {/* Featured Badge */}
          {article.featured && (
            <div className="absolute left-3 top-3 z-20">
              <Badge
                variant="outline"
                className="border-red-500/50 bg-gradient-to-r from-red-500/30 to-red-700/30 text-xs text-red-300 backdrop-blur-sm"
              >
                <TrendingUp className="mr-1 h-3 w-3" />
                Featured
              </Badge>
            </div>
          )}

          {/* Category Badge */}
          {showCategories && (
            <div className="absolute right-3 top-3 z-20">
              <Badge
                variant="outline"
                className={`${categoryColors[article.category as keyof typeof categoryColors] || categoryColors.default} text-xs font-medium backdrop-blur-sm`}
              >
                {getCategoryLabel(article.category)}
              </Badge>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8">
          {/* Meta Info */}
          <div className="mb-3 flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(article.publishDate)}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {article.author}
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-3 line-clamp-2 font-gaming text-xl font-bold text-white transition-colors group-hover:text-red-200 lg:text-2xl">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-gray-300 transition-colors duration-300 group-hover:text-gray-200 lg:text-base">
            {article.excerpt}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            {showReadMore && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={`/news/${article.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-red-400 transition-all duration-300 hover:text-red-300 group-hover:gap-3 group-hover:text-red-200"
                >
                  <span>Devamını Oku</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}

            <div className="flex items-center gap-3 text-gray-400">
              <div className="flex items-center gap-1 text-xs">
                <Eye className="h-3 w-3" />
                <span>1.2K</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <MessageCircle className="h-3 w-3" />
                <span>24</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Background Glow */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
    </motion.article>
  );
};

export default function NewsSection({
  title = 'Haberler',
  subtitle = 'E-spor dünyasından en son gelişmeler ve haberler',
  selectedNews = [],
  background,
  showViewAllButton = true,
  viewAllButtonText = 'Tüm Haberleri Gör',
  viewAllButtonLink = '/haberler',
  layout = 'grid',
  cardStyle = 'modern',
  showCategories = true,
  showReadMore = true,
}: NewsSectionProps) {
  const { resolvedNews, loading, error } = useNewsData(selectedNews);

  // Optimized parallax layers for better performance
  const parallaxLayers = useMemo(() => [
    { speed: 0.2, direction: 'up' as const, easing: 'ease-out' as const }, // Background image
    { speed: 0.4, direction: 'up' as const, easing: 'ease-out' as const }, // Pattern layer
    { speed: 0.1, direction: 'down' as const, easing: 'linear' as const }, // Floating elements
  ], []);

  const { ref: parallaxRef, offsets } = useMultiLayerParallax(parallaxLayers);
  const { ref: titleRef, offset: titleOffset } = useTextParallax(0.3);
  const { ref: contentRef, offset: contentOffset } = useAdvancedParallax({
    speed: 0.3,
    direction: 'up',
    easing: 'ease-out',
  });

  // Process news based on settings
  let newsToShow: NewsArticle[] = [];

  if (loading) {
    newsToShow = [];
  } else if (error) {
    newsToShow = [];
  } else {
    // Show resolved news (all of them)
    newsToShow =
      resolvedNews.length > 0
        ? resolvedNews.map((rn: ResolvedNews) => rn.news)
        : [];
  }

  const backgroundStyle = background?.image
    ? {
        backgroundImage: `url(${background.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : {};

  const overlayStyle = background?.overlay
    ? {
        backgroundColor: background.overlay.color || 'rgba(0, 0, 0, 0.5)',
      }
    : {};

  const getGridCols = () => {
    switch (layout) {
      case 'grid':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 'list':
        return 'grid-cols-1';
      case 'masonry':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <section
      className="section-padding relative overflow-hidden"
      ref={parallaxRef}
    >
      {/* Modern Background Layer */}
      <div className="absolute inset-0">
        {/* Background Image */}
        {background?.image && (
          <motion.div
            className="bg-attachment-fixed absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url("${background.image}")`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        )}

        {/* Fallback Gradient - çok hafif */}
        {!background?.image && (
          <div className="absolute inset-0 bg-gradient-to-br from-gaming-darker/25 via-gaming-dark/15 to-gaming-darker/25" />
        )}

        {/* Custom Overlay */}
        {background?.overlay && (
          <motion.div
            className="absolute inset-0 z-10"
            style={{
              backgroundColor: background?.overlay?.color || '#000000',
              opacity: Math.min(background?.overlay?.opacity || 0.3, 0.4), // Maximum 0.4 opacity
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: Math.min(background?.overlay?.opacity || 0.3, 0.4),
            }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        )}

        {/* Default Overlay - çok hafif */}
        {!background?.overlay && (
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/25 via-transparent to-black/15" />
        )}

        {/* Modern Animated Elements */}
        <motion.div
          className="z-5 absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          {/* Gaming themed floating elements */}
          <div
            className="from-red-500/8 to-red-700/4 absolute right-20 top-20 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br blur-3xl"
            style={{ animationDuration: '6s' }}
          />
          <div
            className="from-red-600/6 to-red-400/3 absolute bottom-40 left-20 h-80 w-80 animate-pulse rounded-full bg-gradient-to-tl blur-2xl"
            style={{ animationDuration: '8s', animationDelay: '1s' }}
          />
          <div
            className="absolute left-1/3 top-1/3 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-red-500/5 to-transparent blur-xl"
            style={{ animationDuration: '10s', animationDelay: '2s' }}
          />

          {/* Geometric gaming elements */}
          <div className="glass-effect absolute left-32 top-32 h-32 w-32 rounded-full border border-red-500/20" />
          <div className="absolute bottom-32 right-32 h-24 w-24 rounded-full border border-red-400/15 glass-red" />
          <div className="absolute right-1/4 top-2/3 h-20 w-20 rounded-full border border-red-600/25 glass-dark" />
        </motion.div>
      </div>

      <div className="container-gaming relative z-20" ref={contentRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mb-12 text-center lg:mb-16"
        >
          {/* Gaming Badge */}
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 glass-red"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Sparkles className="h-4 w-4 text-red-400" />
            <span className="text-sm font-medium text-red-300">
              Latest Gaming News
            </span>
            <Sparkles className="h-4 w-4 text-red-400" />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="text-responsive-3xl mb-4 font-gaming font-black text-white lg:mb-6"
          >
            <span className="text-gaming-gradient">{title}</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            className="text-responsive-lg gaming-text-shadow mx-auto max-w-4xl px-4 leading-relaxed text-gray-200"
          >
            {subtitle}
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="mx-auto mt-6 h-1 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '150px', opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </motion.div>

        {/* News Grid */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="py-16 text-center"
          >
            <div className="mx-auto max-w-md rounded-3xl border border-red-500/30 bg-black/40 p-8 backdrop-blur-md glass-dark">
              <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-red-500 border-t-transparent" />
              <p className="font-display text-lg text-gray-300">
                Loading news...
              </p>
            </div>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="py-16 text-center"
          >
            <div className="mx-auto max-w-md rounded-3xl border border-red-500/30 bg-black/40 p-8 backdrop-blur-md glass-dark">
              <BookOpen className="mx-auto mb-4 h-16 w-16 text-red-400" />
              <p className="mb-2 font-display text-lg text-gray-300">
                Error loading news
              </p>
              <p className="text-sm text-gray-400">{error}</p>
            </div>
          </motion.div>
        ) : newsToShow.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className={`mb-12 grid gap-6 lg:mb-16 lg:gap-8 ${getGridCols()}`}
          >
            {newsToShow.map((article, index) => (
              <NewsCard
                key={article.slug + '-' + index}
                article={article}
                index={index}
                cardStyle={cardStyle}
                showCategories={showCategories}
                showReadMore={showReadMore}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="py-16 text-center"
          >
            <div className="mx-auto max-w-md rounded-3xl border border-red-500/30 bg-black/40 p-8 backdrop-blur-md glass-dark">
              <BookOpen className="mx-auto mb-4 h-16 w-16 text-red-400" />
              <p className="font-display text-lg text-gray-300">
                No news articles to display yet.
              </p>
            </div>
          </motion.div>
        )}

        {/* View All Button */}
        {showViewAllButton && newsToShow.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* CTA Container */}
            <div className="mx-auto max-w-3xl">
              <div className="rounded-3xl border border-red-500/20 p-8 glass-dark lg:p-12">
                {/* CTA Header */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl glass-red">
                    <BookOpen className="h-8 w-8 text-red-400" />
                  </div>

                  <h3 className="mb-4 font-gaming text-2xl font-bold text-white lg:text-3xl">
                    Tüm Haberleri Keşfedin
                  </h3>

                  <p className="leading-relaxed text-gray-300">
                    E-spor dünyasından en son gelişmeler, turnuva sonuçları ve
                    takım haberleri için tüm içeriklerimizi inceleyin.
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={viewAllButtonLink}
                      className="btn-gaming-primary inline-flex items-center gap-3"
                    >
                      <BookOpen className="h-5 w-5" />
                      <span>{viewAllButtonText}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/contact"
                      className="btn-gaming-outline inline-flex items-center gap-3"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Haber Aboneliği</span>
                    </Link>
                  </motion.div>
                </div>

                {/* Trust indicators */}
                <motion.div
                  className="mt-8 grid grid-cols-1 gap-4 border-t border-red-500/20 pt-6 sm:grid-cols-3"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-center">
                    <div className="mb-1 text-xl font-black text-red-400 lg:text-2xl">
                      100+
                    </div>
                    <div className="text-sm text-gray-400">Haber Makalesi</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-xl font-black text-red-400 lg:text-2xl">
                      24/7
                    </div>
                    <div className="text-sm text-gray-400">Güncel İçerik</div>
                  </div>
                  <div className="text-center">
                    <div className="mb-1 text-xl font-black text-red-400 lg:text-2xl">
                      50K+
                    </div>
                    <div className="text-sm text-gray-400">Okuyucu</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
