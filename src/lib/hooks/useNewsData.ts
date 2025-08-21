import { useState, useEffect } from 'react';

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
  news: NewsArticle;
}

export const useNewsData = (selectedNews: SelectedNews[]) => {
  const [resolvedNews, setResolvedNews] = useState<ResolvedNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const resolveNewsData = async () => {
      if (!selectedNews || selectedNews.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const resolvedData: ResolvedNews[] = [];

        for (const newsRef of selectedNews) {
          if (!newsRef.news) continue;

          try {
            const response = await fetch(`/api/news/resolve?path=${encodeURIComponent(newsRef.news)}`);
            
            if (!response.ok) {
              console.warn(`Failed to resolve news: ${newsRef.news}`);
              continue;
            }

            const newsData = await response.json();
            resolvedData.push({ news: newsData });
          } catch (err) {
            console.warn(`Error resolving news ${newsRef.news}:`, err);
            continue;
          }
        }

        setResolvedNews(resolvedData);
      } catch (err) {
        console.error('Error in useNewsData:', err);
        setError('Failed to load news data');
      } finally {
        setLoading(false);
      }
    };

    resolveNewsData();
  }, [selectedNews]);

  return { resolvedNews, loading, error };
};
