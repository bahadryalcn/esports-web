'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNewsData } from '@/lib/hooks/useNewsData';
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
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: { type: 'spring', stiffness: 300 },
      }}
      className="group"
    >
      <div className="overflow-hidden rounded-2xl border border-red-500/30 bg-black/40 backdrop-blur-md transition-all duration-300 hover:border-red-500/50 hover:bg-black/60 hover:shadow-xl hover:shadow-red-500/20">
        {/* Featured Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
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
        <div className="p-6">
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
          <h3 className="mb-3 line-clamp-2 font-gaming text-xl font-bold text-white transition-colors group-hover:text-red-200">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-300">
            {article.excerpt}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between">
            {showReadMore && (
              <Link
                href={`/news/${article.slug}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-red-400 transition-colors hover:text-red-300 group-hover:text-red-200"
              >
                <span>Devamını Oku</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
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
      </div>
    </motion.article>
  );
};

const NewsSection: React.FC<NewsSectionProps> = ({
  title,
  subtitle,
  selectedNews = [],
  showFeaturedOnly = false,
  maxArticles = 6,
  layout = 'grid',
  showCategories = true,
  showReadMore = true,
  cardStyle = 'modern',
  background,
  showViewAllButton = true,
  viewAllButtonText = 'View All News',
  viewAllButtonLink = '/news',
}) => {
  // Use hook to resolve news references to actual data
  const { resolvedNews, loading, error } = useNewsData(selectedNews);

  // Process news based on settings
  let newsToShow: NewsArticle[] = [];

  if (loading) {
    // Show loading state
  } else if (showFeaturedOnly) {
    // Show only featured news from resolved news
    newsToShow = resolvedNews
      .map((rn: ResolvedNews) => rn.news)
      .filter((news: NewsArticle) => news.featured);
  } else if (selectedNews.length > 0) {
    // Show resolved news (all of them)
    newsToShow =
      resolvedNews.length > 0
        ? resolvedNews.map((rn: ResolvedNews) => rn.news)
        : [];
  } else {
    // Fallback to mock data if no selected news
    newsToShow = mockNews.slice(0, maxArticles);
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
    <section className="relative overflow-hidden py-20" style={backgroundStyle}>
      {/* Fallback Gradient Background - only show if no background image */}
      {!background?.image && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950 to-red-900" />
      )}

      {/* Background Overlay */}
      {background?.overlay && (
        <div className="absolute inset-0 z-10" style={overlayStyle} />
      )}

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ zIndex: 5 }}>
        <div className="absolute inset-0 bg-[url('/assets/hero-pattern.svg')] bg-repeat" />
      </div>

      <div className="container relative z-20 mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="mb-6 font-gaming text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
              className="mx-auto max-w-4xl font-display text-xl leading-relaxed text-gray-200 md:text-2xl lg:text-3xl"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* News Grid */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="py-16 text-center"
          >
            <div className="mx-auto max-w-md rounded-2xl border border-red-500/30 bg-black/40 p-8 backdrop-blur-md">
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
            <div className="mx-auto max-w-md rounded-2xl border border-red-500/30 bg-black/40 p-8 backdrop-blur-md">
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
            className={`mb-16 grid gap-8 ${getGridCols()}`}
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
            <div className="mx-auto max-w-md rounded-2xl border border-red-500/30 bg-black/40 p-8 backdrop-blur-md">
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-block"
            >
              <Link
                href={viewAllButtonLink}
                className="inline-flex items-center justify-center space-x-3 rounded-xl bg-gradient-to-r from-red-600 to-red-800 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:from-red-700 hover:to-red-900 hover:shadow-xl hover:shadow-red-500/25"
              >
                <span>{viewAllButtonText}</span>
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
