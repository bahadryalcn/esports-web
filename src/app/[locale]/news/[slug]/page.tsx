import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Tag, User, ArrowLeft } from 'lucide-react';
import { getNewsArticle, getNews } from '@/lib/tina-client';
import { formatDate } from '@/lib/utils';

interface NewsArticlePageProps {
  params: { locale: string; slug: string };
}

const locales = ['tr', 'en'];

export async function generateMetadata({ params }: NewsArticlePageProps): Promise<Metadata> {
  if (!locales.includes(params.locale)) {
    return {};
  }

  try {
    const article = await getNewsArticle(params.slug, params.locale);
    
    if (!article) {
      return {};
    }

    return {
      title: `${article.title} - AIM Agency`,
      description: article.excerpt,
      openGraph: {
        title: article.title,
        description: article.excerpt,
        images: article.featuredImage ? [{ url: article.featuredImage }] : [],
        locale: params.locale,
        type: 'article',
        publishedTime: article.publishDate,
        authors: article.author ? [article.author] : [],
        tags: article.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.title,
        description: article.excerpt,
        images: article.featuredImage ? [article.featuredImage] : [],
      },
    };
  } catch (error) {
    return {};
  }
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  if (!locales.includes(params.locale)) {
    notFound();
  }

  try {
    const article = await getNewsArticle(params.slug, params.locale);
    
    if (!article) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gaming-dark">
        <article className="container-custom py-16">
          {/* Back Link */}
          <Link
            href={`/${params.locale}/news`}
            className="inline-flex items-center gap-2 text-gaming-primary hover:text-gaming-primary/80 mb-8 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            {params.locale === 'tr' ? 'Haberlere Dön' : 'Back to News'}
          </Link>

          {/* Article Header */}
          <header className="mb-12">
            {/* Featured Image */}
            {article.featuredImage && (
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(article.publishDate)}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Tag size={16} />
                <span className="bg-gaming-primary/20 text-gaming-primary px-2 py-1 rounded">
                  {article.category}
                </span>
              </div>
              
              {article.author && (
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{article.author}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-gaming font-bold text-white mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-300 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gaming-dark border border-gaming-primary/30 text-gaming-primary px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Article Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <div 
              className="text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.body.replace(/\n/g, '<br />') }}
            />
          </div>

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="text-sm text-gray-400">
                {params.locale === 'tr' 
                  ? `Son güncelleme: ${formatDate(article.publishDate)}`
                  : `Last updated: ${formatDate(article.publishDate)}`
                }
              </div>
              
              <Link
                href={`/${params.locale}/news`}
                className="gaming-button"
              >
                {params.locale === 'tr' ? 'Diğer Haberleri Gör' : 'See Other News'}
              </Link>
            </div>
          </footer>
        </article>
      </div>
    );
  } catch (error) {
    console.error('Error loading news article:', error);
    notFound();
  }
}

export async function generateStaticParams() {
  const params = [];
  
  for (const locale of locales) {
    try {
      const newsData = await getNews(locale);
      const articles = newsData.data.news;
      
      for (const article of articles) {
        params.push({
          locale,
          slug: article.slug,
        });
      }
    } catch (error) {
      console.error(`Error generating static params for locale ${locale}:`, error);
    }
  }
  
  return params;
}