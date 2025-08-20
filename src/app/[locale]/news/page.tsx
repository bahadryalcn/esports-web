import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Tag, User } from 'lucide-react';
import { getNews } from '@/lib/tina-client';
import { formatDate } from '@/lib/utils';

interface NewsPageProps {
  params: Promise<{ locale: string }>;
}

const locales = ['tr', 'en'];

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  const title = locale === 'tr' ? 'Haberler - AIM Agency' : 'News - AIM Agency';
  const description = locale === 'tr' 
    ? 'E-spor dünyasından en güncel haberler, turnuva sonuçları ve takım haberleri.'
    : 'Latest news from the e-sports world, tournament results and team news.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: locale,
    },
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  
  if (!locales.includes(locale)) {
    notFound();
  }

  try {
    const newsData = await getNews(locale);
    const articles = newsData.data.news;

    const pageTitle = locale === 'tr' ? 'Haberler' : 'News';
    const pageSubtitle = locale === 'tr' 
      ? 'E-spor dünyasından en güncel haberler'
      : 'Latest news from the e-sports world';

    return (
      <div className="min-h-screen bg-gaming-dark">
        <div className="container-custom py-16">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-gaming font-bold mb-6">
              <span className="neon-text">{pageTitle}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {pageSubtitle}
            </p>
          </div>

          {/* News Grid */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <article
                  key={`${article.slug}-${index}`}
                  className="gaming-card overflow-hidden group hover:scale-105 transition-all duration-300"
                >
                  {/* Featured Image */}
                  {article.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Category & Date */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Tag size={16} />
                        <span className="bg-gaming-primary/20 text-gaming-primary px-2 py-1 rounded">
                          {article.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{formatDate(article.publishDate)}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-white group-hover:text-gaming-primary transition-colors">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-300 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* Author */}
                    {article.author && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <User size={16} />
                        <span>{article.author}</span>
                      </div>
                    )}

                    {/* Read More Link */}
                    <Link
                      href={`/${locale}/news/${article.slug}`}
                      className="inline-flex items-center text-gaming-primary hover:text-gaming-primary/80 font-semibold group-hover:underline"
                    >
                      {locale === 'tr' ? 'Devamını Oku' : 'Read More'}
                      <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-400 mb-4">
                {locale === 'tr' ? 'Henüz haber yok' : 'No news yet'}
              </h3>
              <p className="text-gray-500">
                {locale === 'tr' 
                  ? 'Yakında yeni haberlerle karşınızda olacağız.'
                  : 'We will be back with new news soon.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading news page:', error);
    
    return (
      <div className="min-h-screen bg-gaming-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {locale === 'tr' ? 'Hata' : 'Error'}
          </h1>
          <p className="text-gray-400">
            {locale === 'tr' 
              ? 'Haberler yüklenirken bir hata oluştu.'
              : 'An error occurred while loading news.'
            }
          </p>
        </div>
      </div>
    );
  }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}