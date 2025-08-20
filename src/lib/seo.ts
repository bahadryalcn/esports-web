interface OpenGraphImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

interface OpenGraphConfig {
  type: string;
  locale: string;
  url: string;
  siteName: string;
  title: string;
  description: string;
  images: OpenGraphImage[];
}

interface TwitterConfig {
  handle: string;
  site: string;
  cardType: string;
}

interface MetaTag {
  name: string;
  content: string;
}

interface LinkTag {
  rel: string;
  href: string;
  sizes?: string;
}

interface SEOConfig {
  title: string;
  description: string;
  canonical: string;
  openGraph: OpenGraphConfig;
  twitter: TwitterConfig;
  additionalMetaTags: MetaTag[];
  additionalLinkTags: LinkTag[];
}

export const seoConfig: SEOConfig = {
  title: 'AIM Agency - Professional E-Sports Team',
  description: 'Professional e-sports team and gaming agency. Championship wins, professional players, and cutting-edge gaming services.',
  canonical: 'https://aimagency.com',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://aimagency.com',
    siteName: 'AIM Agency',
    title: 'AIM Agency - Professional E-Sports Team',
    description: 'Professional e-sports team and gaming agency. Championship wins, professional players, and cutting-edge gaming services.',
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AIM Agency E-Sports Team',
      },
    ],
  },
  twitter: {
    handle: '@aimagency',
    site: '@aimagency',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'esports, gaming, professional team, tournaments, championships, AIM Agency, valorant, league of legends, csgo',
    },
    {
      name: 'author',
      content: 'AIM Agency',
    },
    {
      name: 'robots',
      content: 'index,follow',
    },
    {
      name: 'googlebot',
      content: 'index,follow',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
};

interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    images: OpenGraphImage[];
  };
  twitter: {
    title: string;
    description: string;
    image: string;
  };
}

export function generatePageSEO(
  title: string, 
  description: string, 
  path: string = '', 
  image: string | null = null
): PageSEO {
  const url = `https://aimagency.com${path}`;
  
  return {
    title: `${title} | AIM Agency`,
    description,
    canonical: url,
    openGraph: {
      title: `${title} | AIM Agency`,
      description,
      url,
      images: image ? [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : seoConfig.openGraph.images,
    },
    twitter: {
      title: `${title} | AIM Agency`,
      description,
      image: image || seoConfig.openGraph.images[0].url,
    },
  };
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbSchema {
  '@context': string;
  '@type': string;
  itemListElement: Array<{
    '@type': string;
    position: number;
    name: string;
    item: string;
  }>;
}

export function generateBreadcrumbs(items: BreadcrumbItem[]): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://aimagency.com${item.path}`,
    })),
  };
}

interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': string;
    addressLocality: string;
    addressCountry: string;
  };
  contactPoint: {
    '@type': string;
    telephone: string;
    contactType: string;
    email: string;
  };
  sameAs: string[];
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AIM Agency',
    url: 'https://aimagency.com',
    logo: 'https://aimagency.com/assets/logo.png',
    description: 'Professional e-sports team and gaming agency',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Istanbul',
      addressCountry: 'Turkey',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-555-123-45-67',
      contactType: 'customer service',
      email: 'info@aimagency.com',
    },
    sameAs: [
      'https://twitter.com/aimagency',
      'https://instagram.com/aimagency',
      'https://youtube.com/aimagency',
      'https://twitch.tv/aimagency',
    ],
  };
}

interface Article {
  title: string;
  description: string;
  image: string;
  publishDate: string;
  modifiedDate?: string;
}

interface ArticleSchema {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: {
    '@type': string;
    name: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
}

export function generateArticleSchema(article: Article): ArticleSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishDate,
    dateModified: article.modifiedDate || article.publishDate,
    author: {
      '@type': 'Organization',
      name: 'AIM Agency',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AIM Agency',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aimagency.com/assets/logo.png',
      },
    },
  };
}