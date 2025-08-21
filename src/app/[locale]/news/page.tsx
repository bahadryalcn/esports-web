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

export async function generateMetadata({
  params,
}: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'tr' ? 'Haberler - AIM Agency' : 'News - AIM Agency';
  const description =
    locale === 'tr'
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
    const pageSubtitle =
      locale === 'tr'
        ? 'E-spor dünyasından en güncel haberler'
        : 'Latest news from the e-sports world';

    return (
      <div className="min-h-screen bg-gaming-dark">
        <div className="container-custom py-16">
          {/* Page Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-6 font-gaming text-4xl font-bold md:text-6xl">
              <span className="neon-text">{pageTitle}</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              {pageSubtitle}
            </p>
          </div>

          {/* News Grid */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <article
                  key={`${article.slug}-${index}`}
                  className="gaming-card group overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  {/* Featured Image */}
                  {article.featuredImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.featuredImage}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="space-y-4 p-6">
                    {/* Category & Date */}
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Tag size={16} />
                        <span className="bg-gaming-primary/20 text-gaming-primary rounded px-2 py-1">
                          {article.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{formatDate(article.publishDate)}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="group-hover:text-gaming-primary text-xl font-bold text-white transition-colors">
                      {article.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="line-clamp-3 text-gray-300">
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
                      className="text-gaming-primary hover:text-gaming-primary/80 inline-flex items-center font-semibold group-hover:underline"
                    >
                      {locale === 'tr' ? 'Devamını Oku' : 'Read More'}
                      <span className="ml-1 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <h3 className="mb-4 text-2xl font-bold text-gray-400">
                {locale === 'tr' ? 'Henüz haber yok' : 'No news yet'}
              </h3>
              <p className="text-gray-500">
                {locale === 'tr'
                  ? 'Yakında yeni haberlerle karşınızda olacağız.'
                  : 'We will be back with new news soon.'}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading news page:', error);

    return (
      <div className="flex min-h-screen items-center justify-center bg-gaming-dark">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">
            {locale === 'tr' ? 'Hata' : 'Error'}
          </h1>
          <p className="text-gray-400">
            {locale === 'tr'
              ? 'Haberler yüklenirken bir hata oluştu.'
              : 'An error occurred while loading news.'}
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
