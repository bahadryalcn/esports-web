'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

interface NewsSectionProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  showReadMore?: boolean;
}

export default function NewsSection({
  title = 'Son Haberler',
  subtitle = 'E-spor dünyasından en güncel haberler',
  limit = 3,
  showReadMore = true
}: NewsSectionProps) {
  // Mock news data - will be replaced with dynamic content
  const news: NewsArticle[] = [
    {
      id: 1,
      title: 'Valorant Türkiye Şampiyonluğu',
      excerpt: 'Takımımız Valorant Türkiye Şampiyonluğu\'nda büyük başarı elde etti. Finalde rakip takımı 3-1 mağlup ederek şampiyon olduk.',
      category: 'Şampiyonluk',
      date: '2024-01-15',
      image: '/assets/news/news-1.jpg'
    },
    {
      id: 2,
      title: 'Yeni Oyuncu Transferi',
      excerpt: 'Deneyimli oyuncumuz takımımıza katıldı. Geçmiş başarıları ve oyun tecrübesi ile takımımızı güçlendirecek.',
      category: 'Transfer',
      date: '2024-01-10',
      image: '/assets/news/news-2.jpg'
    },
    {
      id: 3,
      title: 'Yeni Gaming House',
      excerpt: 'Oyuncularımız için modern ve konforlu yeni gaming house\'umuzu açtık. En son teknoloji ile donatılmış eğitim ortamı.',
      category: 'Duyuru',
      date: '2024-01-05',
      image: '/assets/news/news-3.jpg'
    }
  ];

  return (
    <section className="section-padding bg-gaming-dark/30">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-gaming font-bold mb-6">
            <span className="text-gaming-primary">{title}</span>
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article: NewsArticle, index: number) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="gaming-card overflow-hidden group hover:scale-105 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 bg-gaming-primary/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-gaming-dark to-transparent z-10"></div>
                {/* Placeholder for image */}
                <div className="w-full h-full bg-gaming-primary/10 flex items-center justify-center">
                  <span className="text-gaming-primary/50 text-4xl">📰</span>
                </div>
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-gaming-primary text-gaming-dark text-xs font-bold rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.date).toLocaleDateString('tr-TR')}</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-gaming-primary transition-colors duration-300 line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                <Link
                  href={`/news/${article.id}`}
                  className="inline-flex items-center space-x-2 text-gaming-primary hover:text-white transition-colors duration-300 group/link"
                >
                  <span className="text-sm font-medium">Devamını Oku</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/news"
            className="gaming-button inline-flex items-center space-x-2 group"
          >
            <span>Tüm Haberlerimizi Gör</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}