import { useState, useEffect } from 'react';
import { getHomepage } from '../tina-client';
import type { TinaResponse, HomepageResponse } from '@/types';

interface UseTinaContentReturn {
  data: TinaResponse<HomepageResponse> | null;
  loading: boolean;
  error: string | null;
}

export function useTinaContent(): UseTinaContentReturn {
  const [data, setData] = useState<TinaResponse<HomepageResponse> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const homepageData = await getHomepage();
        setData(homepageData);
      } catch (err) {
        console.error('TinaCMS content fetch error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

// Hook for a specific section
export function useHomepageSection<
  T extends keyof HomepageResponse['homepage'],
>(section: T): HomepageResponse['homepage'][T] | null {
  const { data } = useTinaContent();

  if (!data?.data?.homepage) {
    return null;
  }

  return data.data.homepage[section];
}
