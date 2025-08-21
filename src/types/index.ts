// Global type definitions for the e-sport website

// TinaCMS content types
export interface ServiceItem {
  title: string;
  description: string;
  icon?: string;
  link?: string;
}

export interface SponsorItem {
  name: string;
  logo?: string;
  link: string;
}

// Hero slide interface
export interface HeroSlide {
  headline: string;
  subtext?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage: string;
  overlay?: {
    opacity: number;
    color: string;
  };
  stats?: {
    value: string;
    label: string;
    icon: string;
  }[];
}

// Component templates for TinaCMS
export interface HeroComponent {
  _template: 'hero';
  // New multi-slide format
  slides?: HeroSlide[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  showDots?: boolean;
  showArrows?: boolean;
  // Old single-slide format (backwards compatibility)
  headline?: string;
  subtext?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  overlay?: {
    opacity: number;
    color: string;
  };
  // Stats for single slide format
  stats?: {
    value: string;
    label: string;
    icon: string;
  }[];
}

export interface ServicesComponent {
  _template: 'services';
  title: string;
  subtitle?: string;
  selectedServices?: Array<{
    serviceId: string;
    serviceTitle?: string;
  }>;
  background?: {
    image?: string;
    overlay?: {
      color?: string;
      opacity?: number;
    };
  };
  showBottomCTA?: boolean;
  bottomCTAText?: string;
  bottomCTALink?: string;
}

// Legacy AboutComponent for homepage (different from about page)
export interface HomepageAboutComponent {
  _template: 'about';
  title: string;
  content: string;
  image: string;
  logo?: string;
  overlay?: {
    color?: string;
    opacity?: number;
  };
  stats?: Array<{
    value: string;
    label: string;
    subtitle?: string;
  }>;
  values?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  backgroundVariant?: 'gradient' | 'image' | 'solid';
  contentAlignment?: 'left' | 'center' | 'right';
  showStats?: boolean;
  showValues?: boolean;
}

export interface NewsComponent {
  _template: 'news';
  title: string;
  subtitle?: string;
  selectedNews?: Array<{
    news: string; // file path for TinaCMS reference
  }>;
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

export interface PlayerGame {
  game: string;
  rank: string;
  primary: boolean;
}

export interface PlayerStats {
  label: string;
  value: string;
  icon: string;
}

export interface PlayerSocial {
  twitch?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  discord?: string;
  steam?: string;
  tiktok?: string;
  kick?: string;
}

export interface SelectedPlayer {
  player: string; // TinaCMS reference field - file path
}

export interface PlayersComponent {
  _template: 'players';
  title: string;
  subtitle?: string;
  selectedPlayers?: SelectedPlayer[];
  showFeaturedOnly?: boolean;
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
  socialMediaText?: string;
}

export interface SponsorsComponent {
  _template: 'sponsors';
  title: string;
  subtitle?: string;
  selectedSponsors?: Array<{
    sponsor: Sponsor;
  }>;
  background?: {
    image?: string;
    overlay?: {
      color?: string;
      opacity?: number;
    };
  };
  showAutoScroll?: boolean;
  autoScrollSpeed?: number;
  viewAllButtonText?: string;
  viewAllButtonLink?: string;
}

export interface ContactComponent {
  _template: 'contact';
  title: string;
  subtitle?: string;
  showForm: boolean;
  backgroundImage?: string;
  overlay?: {
    color?: string;
    opacity?: number;
  };
  backgroundVariant?: 'gradient' | 'image' | 'solid';
}

export type PageComponent = 
  | HeroComponent 
  | ServicesComponent 
  | HomepageAboutComponent 
  | NewsComponent 
  | PlayersComponent 
  | SponsorsComponent 
  | ContactComponent;

// Site Settings
export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  colors: {
    primary: string;
    secondary: string;
  };
  social: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    discord?: string;
    twitch?: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

// Navigation
export interface NavigationItem {
  label: string;
  href: string;
  external: boolean;
  children?: NavigationItem[];
}

export interface FooterSection {
  title: string;
  links?: Array<{
    href: string;
    label: string;
    external: boolean;
  }>;
}

export interface Navigation {
  header: {
    menuItems: NavigationItem[];
  };
  footer: {
    aboutText: string;
    copyright: string;
    sections?: FooterSection[];
  };
}

// Homepage data with new structure
export interface HomepageData {
  seo: {
    title: string;
    description: string;
    image: string;
  };
  components: PageComponent[];
}

// News Article
export interface NewsArticle {
  title: string;
  slug: string;
  locale: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  tags: string[];
  featured: boolean;
  publishDate: string;
  author: string;
  body: string;
}

// Player Profile
export interface Player {
  name: string;
  slug: string;
  locale: string;
  nickname: string;
  position: string;
  avatar: string;
  nationality?: string;
  age?: number;
  joinDate?: string;
  social?: {
    twitter?: string;
    instagram?: string;
    twitch?: string;
    youtube?: string;
  };
  stats?: {
    matches: number;
    wins: number;
    kda: number;
  };
  achievements?: Array<{
    title: string;
    description: string;
    date: string;
  }>;
  body: string;
}

// Sponsor
export interface Sponsor {
  id?: number;
  name: string;
  logo: string;
  website: string;
  description: string;
  category: string;
  _sys?: {
    filename: string;
    path: string;
  };
}

// Service
export interface Service {
  title: string;
  slug: string;
  locale: string;
  excerpt: string;
  icon: string;
  featuredImage?: string;
  category: string;
  pricing?: {
    type: string;
    amount: number;
    currency: string;
  };
  features?: Array<{
    title: string;
    description: string;
  }>;
  body: string;
}

// Match
export interface Match {
  title: string;
  slug: string;
  locale: string;
  tournament: string;
  game: string;
  matchDate: string;
  teams: {
    home: string;
    away: string;
  };
  score?: {
    home: number;
    away: number;
  };
  status: string;
  streamUrl?: string;
  thumbnail?: string;
  body: string;
}

// TinaCMS response wrapper
export interface TinaResponse<T> {
  data: T;
}

// Collection response types
export interface HomepageResponse {
  homepage: HomepageData;
}

export interface SettingsResponse {
  settings: SiteSettings;
}

export interface NavigationResponse {
  navigation: Navigation;
}

export interface NewsListResponse {
  news: NewsArticle[];
}

export interface PlayersListResponse {
  players: Player[];
}

export interface ServicesListResponse {
  services: Service[];
}

export interface MatchesListResponse {
  matches: Match[];
}

// About page types
export interface AboutSection {
  title: string;
  content: string;
  icon: string;
}

export interface AboutStats {
  number: string;
  label: string;
  description: string;
}

export interface TeamMember {
  name: string;
  position: string;
  description: string;
  image: string;
}

export interface Achievement {
  year: string;
  title: string;
  description: string;
  image: string;
}

// About page component interfaces based on TinaCMS configuration
export interface AboutHeroComponent {
  _template: 'about-hero';
  title: string;
  subtitle: string;
  description: string;
  image?: string;
}

export interface AboutContentSection {
  title: string;
  content: string;
  icon: string;
}

export interface AboutContentComponent {
  _template: 'about-content';
  mainTitle: string;
  mainContent: string;
  sections: AboutContentSection[];
}

export interface AboutStatsItem {
  number: string;
  label: string;
  description?: string;
}

export interface AboutStatsComponent {
  _template: 'about-stats';
  title: string;
  items: AboutStatsItem[];
}

export interface AboutTeamMember {
  name: string;
  position: string;
  description: string;
  image?: string;
}

export interface AboutTeamComponent {
  _template: 'about-team';
  title: string;
  subtitle: string;
  description: string;
  members: AboutTeamMember[];
}

export interface AboutAchievementItem {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface AboutAchievementsComponent {
  _template: 'about-achievements';
  title: string;
  subtitle: string;
  items: AboutAchievementItem[];
}

export interface AboutCTAComponent {
  _template: 'about-cta';
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export type AboutComponent = 
  | AboutHeroComponent
  | AboutContentComponent
  | AboutStatsComponent
  | AboutTeamComponent
  | AboutAchievementsComponent
  | AboutCTAComponent;

export interface AboutData {
  seo: {
    title: string;
    description: string;
    keywords: string;
    image: string;
    canonical: string;
  };
  hero?: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
  content?: {
    mainTitle: string;
    mainContent: string;
    sections: Array<{
      title: string;
      content: string;
      icon: string;
    }>;
  };
  stats?: {
    title: string;
    items: Array<{
      number: string;
      label: string;
      description: string;
    }>;
  };
  team?: {
    title: string;
    subtitle: string;
    description: string;
    members: Array<{
      name: string;
      position: string;
      description: string;
      image: string;
    }>;
  };
  achievements?: {
    title: string;
    subtitle: string;
    items: Array<{
      year: string;
      title: string;
      description: string;
      image: string;
    }>;
  };
  cta?: {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  components: AboutComponent[];
}

export interface AboutResponse {
  about: AboutData;
}

// Legacy interfaces for backwards compatibility
export interface HeroSection {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface LegacyAboutSection {
  title?: string;
  content?: string;
  image?: string;
}

export interface ServicesSection {
  title?: string;
  subtitle?: string;
  serviceItems: string; // JSON string that parses to ServiceItem[]
}

export interface NewsSection {
  title?: string;
  subtitle?: string;
}

export interface PlayersSection {
  title?: string;
  subtitle?: string;
}

export interface SponsorsSection {
  title?: string;
  sponsorItems: string; // JSON string that parses to SponsorItem[]
}

// Legacy homepage data structure
export interface LegacyHomepageData {
  hero: HeroSection;
  about: LegacyAboutSection;
  services: ServicesSection;
  news: NewsSection;
  players: PlayersSection;
  sponsors: SponsorsSection;
}

export interface LegacyHomepageResponse {
  homepage: LegacyHomepageData;
}

// Component Props
export interface LayoutProps {
  children: React.ReactNode;
}

export interface NavigationProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

export interface StatItem {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}

// TinaCMS client interface
export interface TinaClient {
  queries: {
    homepage: (locale?: string) => Promise<TinaResponse<HomepageResponse>>;
    settings: (locale?: string) => Promise<TinaResponse<SettingsResponse>>;
    navigation: (locale?: string) => Promise<TinaResponse<NavigationResponse>>;
    news: (locale?: string) => Promise<TinaResponse<NewsListResponse>>;
    players: (locale?: string) => Promise<TinaResponse<PlayersListResponse>>;
    services: (locale?: string) => Promise<TinaResponse<ServicesListResponse>>;
    matches: (locale?: string) => Promise<TinaResponse<MatchesListResponse>>;
  };
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// SEO and social media types
export interface SocialMedia {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  discord?: string;
  twitch?: string;
  linkedin?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  city?: string;
  country?: string;
  postalCode?: string;
}

export interface SEODefaults {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultImage: string;
  siteUrl: string;
}