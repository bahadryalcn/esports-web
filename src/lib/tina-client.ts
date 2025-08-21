import fs from 'fs';
import path from 'path';
import type { 
  TinaResponse, 
  HomepageResponse, 
  SettingsResponse,
  NavigationResponse,
  NewsListResponse,
  PlayersListResponse,
  ServicesListResponse,
  MatchesListResponse,
  AboutResponse,
  HomepageData,
  SiteSettings,
  Navigation,
  NewsArticle,
  Player,
  Service,
  Match,
  AboutData
} from '@/types';

// Content directory path
const contentDir = path.join(process.cwd(), 'content');

// Helper function to read JSON files
async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content) as T;
    }
    return null;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Helper function to read MDX files (placeholder - would use proper MDX parser in production)
async function readMdxFile(filePath: string): Promise<any | null> {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Simple frontmatter parser (in production, use a proper library like gray-matter)
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const body = content.replace(/^---\n[\s\S]*?\n---\n/, '');
        
        // Parse YAML frontmatter (simplified)
        const data: any = {};
        frontmatter.split('\n').forEach(line => {
          const colonIndex = line.indexOf(':');
          if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
            data[key] = value;
          }
        });
        
        return { ...data, body };
      }
    }
    return null;
  } catch (error) {
    console.error(`Error reading MDX file ${filePath}:`, error);
    return null;
  }
}

// Homepage queries
export async function getHomepage(locale: string = 'tr'): Promise<TinaResponse<HomepageResponse>> {
  try {
    const homepageFile = path.join(contentDir, 'homepage', `${locale}.json`);
    const homepageData = await readJsonFile<HomepageData>(homepageFile);
    
    if (homepageData) {
      return {
        data: {
          homepage: homepageData
        }
      };
    }
    
    // Fallback data
    return getFallbackHomepage();
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return getFallbackHomepage();
  }
}

// Settings queries
export async function getSettings(locale: string = 'tr'): Promise<TinaResponse<SettingsResponse>> {
  try {
    const settingsFile = path.join(contentDir, 'settings', `${locale}.json`);
    const settingsData = await readJsonFile<SiteSettings>(settingsFile);
    
    if (settingsData) {
      return {
        data: {
          settings: settingsData
        }
      };
    }
    
    // Fallback data
    return getFallbackSettings();
  } catch (error) {
    console.error('Error fetching settings data:', error);
    return getFallbackSettings();
  }
}

// Navigation queries
export async function getNavigation(locale: string = 'tr'): Promise<TinaResponse<NavigationResponse>> {
  try {
    const navigationFile = path.join(contentDir, 'navigation', `${locale}.json`);
    const navigationData = await readJsonFile<Navigation>(navigationFile);
    
    if (navigationData) {
      return {
        data: {
          navigation: navigationData
        }
      };
    }
    
    // Fallback data
    return getFallbackNavigation();
  } catch (error) {
    console.error('Error fetching navigation data:', error);
    return getFallbackNavigation();
  }
}

// News queries
export async function getNews(locale: string = 'tr', limit?: number): Promise<TinaResponse<NewsListResponse>> {
  try {
    const newsDir = path.join(contentDir, 'news');
    const files = fs.readdirSync(newsDir);
    
    const newsArticles: NewsArticle[] = [];
    
    for (const file of files) {
      if (file.endsWith(`.${locale}.mdx`)) {
        const filePath = path.join(newsDir, file);
        const articleData = await readMdxFile(filePath);
        
        if (articleData) {
          newsArticles.push(articleData as NewsArticle);
        }
      }
    }
    
    // Sort by publish date (newest first)
    newsArticles.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    
    // Apply limit if specified
    const limitedArticles = limit ? newsArticles.slice(0, limit) : newsArticles;
    
    return {
      data: {
        news: limitedArticles
      }
    };
  } catch (error) {
    console.error('Error fetching news data:', error);
    return {
      data: {
        news: []
      }
    };
  }
}

// Players queries
export async function getPlayers(locale: string = 'tr', limit?: number): Promise<TinaResponse<PlayersListResponse>> {
  try {
    const playersDir = path.join(contentDir, 'players');
    const files = fs.readdirSync(playersDir);
    
    const players: Player[] = [];
    
    for (const file of files) {
      if (file.endsWith(`.${locale}.mdx`)) {
        const filePath = path.join(playersDir, file);
        const playerData = await readMdxFile(filePath);
        
        if (playerData) {
          players.push(playerData as Player);
        }
      }
    }
    
    // Sort by join date (newest first)
    players.sort((a, b) => {
      if (a.joinDate && b.joinDate) {
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      }
      return 0;
    });
    
    // Apply limit if specified
    const limitedPlayers = limit ? players.slice(0, limit) : players;
    
    return {
      data: {
        players: limitedPlayers
      }
    };
  } catch (error) {
    console.error('Error fetching players data:', error);
    return {
      data: {
        players: []
      }
    };
  }
}

// Services queries
export async function getServices(locale: string = 'tr'): Promise<TinaResponse<ServicesListResponse>> {
  try {
    const servicesDir = path.join(contentDir, 'services');
    const files = fs.readdirSync(servicesDir);
    
    const services: Service[] = [];
    
    for (const file of files) {
      if (file.endsWith(`.${locale}.mdx`)) {
        const filePath = path.join(servicesDir, file);
        const serviceData = await readMdxFile(filePath);
        
        if (serviceData) {
          services.push(serviceData as Service);
        }
      }
    }
    
    // Sort by title
    services.sort((a, b) => a.title.localeCompare(b.title));
    
    return {
      data: {
        services
      }
    };
  } catch (error) {
    console.error('Error fetching services data:', error);
    return {
      data: {
        services: []
      }
    };
  }
}

// Matches queries
export async function getMatches(locale: string = 'tr', limit?: number): Promise<TinaResponse<MatchesListResponse>> {
  try {
    const matchesDir = path.join(contentDir, 'matches');
    const files = fs.readdirSync(matchesDir);
    
    const matches: Match[] = [];
    
    for (const file of files) {
      if (file.endsWith(`.${locale}.mdx`)) {
        const filePath = path.join(matchesDir, file);
        const matchData = await readMdxFile(filePath);
        
        if (matchData) {
          matches.push(matchData as Match);
        }
      }
    }
    
    // Sort by match date (newest first)
    matches.sort((a, b) => new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime());
    
    // Apply limit if specified
    const limitedMatches = limit ? matches.slice(0, limit) : matches;
    
    return {
      data: {
        matches: limitedMatches
      }
    };
  } catch (error) {
    console.error('Error fetching matches data:', error);
    return {
      data: {
        matches: []
      }
    };
  }
}

// About page queries
export async function getAbout(locale: string = 'tr'): Promise<TinaResponse<AboutResponse>> {
  try {
    const aboutFile = path.join(contentDir, 'about', `${locale}.json`);
    const aboutData = await readJsonFile<AboutData>(aboutFile);
    
    if (aboutData) {
      return {
        data: {
          about: aboutData
        }
      };
    }
    
    // Fallback data
    return getFallbackAbout();
  } catch (error) {
    console.error('Error fetching about data:', error);
    return getFallbackAbout();
  }
}

// Fallback data functions
function getFallbackHomepage(): TinaResponse<HomepageResponse> {
  return {
    data: {
      homepage: {
        seo: {
          title: 'AIM Agency - Profesyonel E-spor Takım Yönetimi',
          description: 'E-spor dünyasında profesyonel takım yönetimi, oyuncu gelişimi ve danışmanlık hizmetleri.',
          image: '/images/og-image.jpg'
        },
        components: [
          {
            _template: 'hero',
            headline: 'E-spor Dünyasında Zirveye Çıkarıyoruz',
            subtext: 'Profesyonel takım yönetimi ve oyuncu gelişimi ile e-spor kariyerinizi bir üst seviyeye taşıyın',
            buttonText: 'Hizmetlerimizi Keşfedin',
            buttonLink: '/hizmetler',
            backgroundImage: '/images/hero-bg.jpg'
          },
          {
            _template: 'services',
            title: 'Hizmetlerimiz',
            subtitle: 'E-spor dünyasında başarıya ulaşmanız için ihtiyacınız olan tüm hizmetler'
          },
          {
            _template: 'about',
            title: 'Hakkımızda',
            content: 'AIM Agency olarak, e-spor sektöründe yılların deneyimi ile oyuncularımızın ve takımlarımızın başarısı için çalışıyoruz.',
            image: '/images/about-image.jpg'
          }
        ]
      }
    }
  };
}

function getFallbackSettings(): TinaResponse<SettingsResponse> {
  return {
    data: {
      settings: {
        siteName: 'AIM Agency',
        siteDescription: 'Profesyonel E-spor Takım Yönetimi',
        logo: '/images/logo.png',
        favicon: '/images/favicon.ico',
        colors: {
          primary: '#00ff88',
          secondary: '#1a1a1a'
        },
        social: {
          twitter: 'https://twitter.com/aimagency',
          instagram: 'https://instagram.com/aimagency',
          discord: 'https://discord.gg/aimagency'
        },
        contact: {
          email: 'info@aimagency.com',
          phone: '+90 555 123 4567',
          address: 'İstanbul, Türkiye'
        }
      }
    }
  };
}

function getFallbackNavigation(): TinaResponse<NavigationResponse> {
  return {
    data: {
      navigation: {
        header: {
          menuItems: [
            { label: 'Anasayfa', href: '/', external: false },
            { label: 'Hakkımızda', href: '/hakkimizda', external: false },
            { label: 'Hizmetler', href: '/hizmetler', external: false },
            { label: 'Oyuncular', href: '/oyuncular', external: false },
            { label: 'Haberler', href: '/haberler', external: false },
            { label: 'İletişim', href: '/iletisim', external: false }
          ]
        },
        footer: {
          aboutText: 'AIM Agency olarak, e-spor dünyasında profesyonel hizmetler sunuyoruz.',
          copyright: '© 2024 AIM Agency. Tüm hakları saklıdır.'
        }
      }
    }
  };
}

function getFallbackAbout(): TinaResponse<AboutResponse> {
  return {
    data: {
      about: {
        seo: {
          title: 'Hakkımızda - AIM Agency | Profesyonel E-spor Takım Yönetimi',
          description: 'AIM Agency olarak e-spor dünyasında yılların deneyimi ile profesyonel takım yönetimi, oyuncu gelişimi ve danışmanlık hizmetleri sunuyoruz.',
          keywords: 'e-spor, takım yönetimi, oyuncu gelişimi, AIM Agency, profesyonel gaming',
          image: '/images/about-og.jpg',
          canonical: '/hakkimizda'
        },
        hero: {
          title: 'Hakkımızda',
          subtitle: 'E-spor Dünyasında Zirveye Çıkarıyoruz',
          description: 'AIM Agency olarak, e-spor sektöründe yılların deneyimi ile oyuncularımızın ve takımlarımızın başarısı için çalışıyoruz.',
          image: '/images/about-hero.jpg'
        },
        content: {
          mainTitle: 'Bizim Hikayemiz',
          mainContent: 'AIM Agency, 2020 yılında e-spor dünyasında profesyonel hizmetler sunmak amacıyla kuruldu.',
          sections: [
            {
              title: 'Misyonumuz',
              content: 'E-spor dünyasında profesyonel standartları yükseltmek ve oyuncularımızın potansiyellerini en üst seviyeye çıkarmak.',
              icon: 'target'
            },
            {
              title: 'Vizyonumuz',
              content: 'Türkiye\'nin en güvenilir e-spor ajansı olmak ve global e-spor ekosisteminde söz sahibi olmak.',
              icon: 'eye'
            },
            {
              title: 'Değerlerimiz',
              content: 'Şeffaflık, profesyonellik, sürekli gelişim ve oyuncu odaklı yaklaşım temel değerlerimizi oluşturuyor.',
              icon: 'heart'
            }
          ]
        },
        stats: {
          title: 'Rakamlarla AIM Agency',
          items: [
            {
              number: '50+',
              label: 'Profesyonel Oyuncu',
              description: 'Farklı oyunlarda aktif oyuncularımız'
            },
            {
              number: '15+',
              label: 'Takım',
              description: 'Yönettiğimiz profesyonel takımlar'
            },
            {
              number: '100+',
              label: 'Turnuva',
              description: 'Katıldığımız ulusal ve uluslararası turnuvalar'
            },
            {
              number: '25+',
              label: 'Ödül',
              description: 'Kazandığımız şampiyonluklar ve ödüller'
            }
          ]
        },
        team: {
          title: 'Ekibimiz',
          subtitle: 'Uzman Kadromuz',
          description: 'E-spor dünyasında deneyimli uzmanlarımızla oyuncularımızın ve takımlarımızın başarısı için çalışıyoruz.',
          members: [
            {
              name: 'Ahmet Yılmaz',
              position: 'Kurucu & CEO',
              description: '10+ yıl e-spor deneyimi, eski profesyonel oyuncu',
              image: '/images/team/ahmet-yilmaz.jpg'
            },
            {
              name: 'Zeynep Kaya',
              position: 'Takım Yöneticisi',
              description: 'Psikoloji mezunu, oyuncu gelişimi uzmanı',
              image: '/images/team/zeynep-kaya.jpg'
            },
            {
              name: 'Mehmet Demir',
              position: 'Teknik Direktör',
              description: 'CS:GO ve Valorant uzmanı, eski takım kaptanı',
              image: '/images/team/mehmet-demir.jpg'
            },
            {
              name: 'Elif Özkan',
              position: 'Pazarlama Müdürü',
              description: 'Dijital pazarlama uzmanı, sponsorluk ilişkileri',
              image: '/images/team/elif-ozkan.jpg'
            }
          ]
        },
        achievements: {
          title: 'Başarılarımız',
          subtitle: 'Gurur Duyduğumuz Anlar',
          items: [
            {
              year: '2024',
              title: 'Valorant Champions Tour',
              description: 'Türkiye şampiyonluğu ve uluslararası turnuvada 3. sıra',
              image: '/images/achievements/valorant-2024.jpg'
            },
            {
              year: '2023',
              title: 'CS:GO Major Championship',
              description: 'Bölgesel turnuvada şampiyonluk',
              image: '/images/achievements/csgo-2023.jpg'
            },
            {
              year: '2022',
              title: 'League of Legends Championship',
              description: 'Türkiye liginde 2. sıra',
              image: '/images/achievements/lol-2022.jpg'
            },
            {
              year: '2021',
              title: 'Rocket League Championship',
              description: 'Avrupa bölgesel turnuvasında 4. sıra',
              image: '/images/achievements/rocket-league-2021.jpg'
            }
          ]
        },
        cta: {
          title: 'Bizimle Çalışmak İster misiniz?',
          description: 'E-spor kariyerinizi bir üst seviyeye taşımak için bizimle iletişime geçin.',
          buttonText: 'İletişime Geçin',
          buttonLink: '/iletisim'
        },
        components: []
      }
    }
  };
}

// TinaCMS client interface
export const getTinaClient = () => ({
  queries: {
    homepage: getHomepage,
    settings: getSettings,
    navigation: getNavigation,
    news: getNews,
    players: getPlayers,
    services: getServices,
    matches: getMatches,
    about: getAbout
  },
  collections: {
    services: {
      query: async (locale: string = 'tr') => {
        try {
          const servicesDir = path.join(contentDir, 'services');
          const files = fs.readdirSync(servicesDir);
          
          const services: any[] = [];
          
          for (const file of files) {
            if (file.endsWith(`.${locale}.json`)) {
              const filePath = path.join(servicesDir, file);
              const serviceData = await readJsonFile(filePath);
              
              if (serviceData) {
                services.push({
                  ...serviceData,
                  _sys: { filename: file.replace(`.${locale}.json`, '') }
                });
              }
            }
          }
          
          return {
            data: {
              services
            }
          };
        } catch (error) {
          console.error('Error fetching services:', error);
          return {
            data: {
              services: []
            }
          };
        }
      }
    }
  }
});

// Utility functions for getting single items
export async function getNewsArticle(slug: string, locale: string = 'tr'): Promise<NewsArticle | null> {
  try {
    const newsFile = path.join(contentDir, 'news', `${slug}.${locale}.mdx`);
    return await readMdxFile(newsFile);
  } catch (error) {
    console.error('Error fetching news article:', error);
    return null;
  }
}

export async function getPlayer(slug: string, locale: string = 'tr'): Promise<Player | null> {
  try {
    const playerFile = path.join(contentDir, 'players', `${slug}.${locale}.mdx`);
    return await readMdxFile(playerFile);
  } catch (error) {
    console.error('Error fetching player:', error);
    return null;
  }
}

export async function getService(slug: string, locale: string = 'tr'): Promise<Service | null> {
  try {
    const serviceFile = path.join(contentDir, 'services', `${slug}.${locale}.mdx`);
    return await readMdxFile(serviceFile);
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

export async function getMatch(slug: string, locale: string = 'tr'): Promise<Match | null> {
  try {
    const matchFile = path.join(contentDir, 'matches', `${slug}.${locale}.mdx`);
    return await readMdxFile(matchFile);
  } catch (error) {
    console.error('Error fetching match:', error);
    return null;
  }
}