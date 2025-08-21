import { createClient } from 'tinacms/dist/client';
import { queries } from 'tina/__generated__/types';

// TinaCloud client for production
export const tinaClient = createClient({
  url: 'https://content.tinajs.io/1.6/content/ebd6ca61-1ec0-4d06-8c35-6317b05f7c18/github/main',
  queries,
  token: process.env.TINA_TOKEN,
});

// Helper function to determine if we're in development or production
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

// Export the appropriate client based on environment
export const getTinaClient = () => {
  if (isLocal) {
    // In development, use local file system
    const { getTinaClient: getLocalClient } = require('./tina-client');
    return getLocalClient();
  } else {
    // In production, use TinaCloud
    return {
      queries: {
        homepage: async (locale: string = 'tr') => {
          try {
            const result = await tinaClient.queries.homepage({
              variables: { relativePath: `${locale}.json` },
            });
            return result;
          } catch (error) {
            console.error('Error fetching homepage from TinaCloud:', error);
            return { data: { homepage: null } };
          }
        },
        settings: async (locale: string = 'tr') => {
          try {
            const result = await tinaClient.queries.settings({
              variables: { relativePath: `${locale}.json` },
            });
            return result;
          } catch (error) {
            console.error('Error fetching settings from TinaCloud:', error);
            return { data: { settings: null } };
          }
        },
        navigation: async (locale: string = 'tr') => {
          try {
            const result = await tinaClient.queries.navigation({
              variables: { relativePath: `${locale}.json` },
            });
            return result;
          } catch (error) {
            console.error('Error fetching navigation from TinaCloud:', error);
            return { data: { navigation: null } };
          }
        },
        news: async (locale: string = 'tr', limit?: number) => {
          try {
            const result = await tinaClient.queries.newsConnection({
              variables: {
                first: limit || 10,
                filter: { locale: { eq: locale } },
              },
            });
            return {
              data: {
                news:
                  result.data.newsConnection.edges?.map((edge) => edge.node) ||
                  [],
              },
            };
          } catch (error) {
            console.error('Error fetching news from TinaCloud:', error);
            return { data: { news: [] } };
          }
        },
        players: async (locale: string = 'tr', limit?: number) => {
          try {
            const result = await tinaClient.queries.playersConnection({
              variables: {
                first: limit || 10,
                filter: { locale: { eq: locale } },
              },
            });
            return {
              data: {
                players:
                  result.data.playersConnection.edges?.map(
                    (edge) => edge.node
                  ) || [],
              },
            };
          } catch (error) {
            console.error('Error fetching players from TinaCloud:', error);
            return { data: { players: [] } };
          }
        },
        services: async (locale: string = 'tr') => {
          try {
            const result = await tinaClient.queries.servicesConnection({
              variables: { first: 100, filter: { locale: { eq: locale } } },
            });
            return {
              data: {
                services:
                  result.data.servicesConnection.edges?.map(
                    (edge) => edge.node
                  ) || [],
              },
            };
          } catch (error) {
            console.error('Error fetching services from TinaCloud:', error);
            return { data: { services: [] } };
          }
        },
        matches: async (locale: string = 'tr', limit?: number) => {
          try {
            const result = await tinaClient.queries.matchesConnection({
              variables: {
                first: limit || 10,
                filter: { locale: { eq: locale } },
              },
            });
            return {
              data: {
                matches:
                  result.data.matchesConnection.edges?.map(
                    (edge) => edge.node
                  ) || [],
              },
            };
          } catch (error) {
            console.error('Error fetching matches from TinaCloud:', error);
            return { data: { matches: [] } };
          }
        },
        about: async (locale: string = 'tr') => {
          try {
            const result = await tinaClient.queries.about({
              variables: { relativePath: `${locale}.json` },
            });
            return result;
          } catch (error) {
            console.error('Error fetching about from TinaCloud:', error);
            return { data: { about: null } };
          }
        },
      },
      collections: {
        services: {
          query: async (locale: string = 'tr') => {
            try {
              const result = await tinaClient.queries.servicesConnection({
                variables: { first: 100, filter: { locale: { eq: locale } } },
              });
              return {
                data: {
                  services:
                    result.data.servicesConnection.edges?.map(
                      (edge) => edge.node
                    ) || [],
                },
              };
            } catch (error) {
              console.error('Error fetching services from TinaCloud:', error);
              return { data: { services: [] } };
            }
          },
        },
      },
    };
  }
};

// Utility functions for getting single items
export async function getNewsArticle(
  slug: string,
  locale: string = 'tr'
): Promise<any | null> {
  if (isLocal) {
    const { getNewsArticle: getLocalNewsArticle } = require('./tina-client');
    return getLocalNewsArticle(slug, locale);
  }

  try {
    const result = await tinaClient.queries.news({
      variables: { relativePath: `${slug}.${locale}.mdx` },
    });
    return result.data.news;
  } catch (error) {
    console.error('Error fetching news article from TinaCloud:', error);
    return null;
  }
}

export async function getPlayer(
  slug: string,
  locale: string = 'tr'
): Promise<any | null> {
  if (isLocal) {
    const { getPlayer: getLocalPlayer } = require('./tina-client');
    return getLocalPlayer(slug, locale);
  }

  try {
    const result = await tinaClient.queries.players({
      variables: { relativePath: `${slug}.${locale}.mdx` },
    });
    return result.data.players;
  } catch (error) {
    console.error('Error fetching player from TinaCloud:', error);
    return null;
  }
}

export async function getService(
  slug: string,
  locale: string = 'tr'
): Promise<any | null> {
  if (isLocal) {
    const { getService: getLocalService } = require('./tina-client');
    return getLocalService(slug, locale);
  }

  try {
    const result = await tinaClient.queries.services({
      variables: { relativePath: `${slug}.${locale}.json` },
    });
    return result.data.services;
  } catch (error) {
    console.error('Error fetching service from TinaCloud:', error);
    return null;
  }
}

export async function getMatch(
  slug: string,
  locale: string = 'tr'
): Promise<any | null> {
  if (isLocal) {
    const { getMatch: getLocalMatch } = require('./tina-client');
    return getLocalMatch(slug, locale);
  }

  try {
    const result = await tinaClient.queries.matches({
      variables: { relativePath: `${slug}.${locale}.mdx` },
    });
    return result.data.matches;
  } catch (error) {
    console.error('Error fetching match from TinaCloud:', error);
    return null;
  }
}
