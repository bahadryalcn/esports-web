import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'master';

// Supported locales
const locales = ['tr', 'en'];

// Common component templates for page builder
const componentTemplates = [
  {
    name: 'hero',
    label: 'Hero Section',
    ui: {
      previewSrc: '/blocks/hero.png',
      defaultItem: {
        slides: [
          {
            headline: 'E-spor Dünyasında Zirveye Çıkarıyoruz',
            subtext:
              'Profesyonel takım yönetimi ve oyuncu gelişimi ile e-spor kariyerinizi bir üst seviyeye taşıyın',
            buttonText: 'Hizmetlerimizi Keşfedin',
            buttonLink: '/hizmetler',
            backgroundImage: '',
            overlay: {
              opacity: 0.6,
              color: '#000000',
            },
          },
        ],
        autoplay: true,
        autoplaySpeed: 5000,
        showDots: true,
        showArrows: true,
      },
    },
    fields: [
      {
        type: 'object',
        name: 'slides',
        label: 'Hero Slides',
        list: true,
        ui: {
          itemProps: (item: any) => {
            return { label: item?.headline || 'New Slide' };
          },
        },
        fields: [
          {
            type: 'string',
            name: 'headline',
            label: 'Slide Headline',
            required: true,
          },
          {
            type: 'string',
            name: 'subtext',
            label: 'Slide Subtext',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'buttonText',
            label: 'Button Text',
          },
          {
            type: 'string',
            name: 'buttonLink',
            label: 'Button Link',
          },
          {
            type: 'image',
            name: 'backgroundImage',
            label: 'Background Image',
            required: true,
          },
          {
            type: 'object',
            name: 'overlay',
            label: 'Background Overlay',
            fields: [
              {
                type: 'number',
                name: 'opacity',
                label: 'Overlay Opacity (0-1)',
                ui: {
                  parse: (value: any) => Number(value),
                  component: 'number',
                },
              },
              {
                type: 'string',
                name: 'color',
                label: 'Overlay Color',
                ui: {
                  component: 'color',
                },
              },
            ],
          },
          {
            type: 'object',
            name: 'stats',
            label: 'Slide Statistics (Optional)',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'value',
                label: 'Stat Value',
                required: true,
              },
              {
                type: 'string',
                name: 'label',
                label: 'Stat Label',
                required: true,
              },
              {
                type: 'string',
                name: 'icon',
                label: 'Icon',
                options: [
                  { value: 'trophy', label: 'Trophy' },
                  { value: 'users', label: 'Users' },
                  { value: 'target', label: 'Target' },
                  { value: 'zap', label: 'Zap' },
                  { value: 'award', label: 'Award' },
                  { value: 'star', label: 'Star' },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'boolean',
        name: 'autoplay',
        label: 'Auto Play Slides',
      },
      {
        type: 'number',
        name: 'autoplaySpeed',
        label: 'Autoplay Speed (ms)',
        ui: {
          parse: (value: any) => Number(value),
        },
      },
      {
        type: 'boolean',
        name: 'showDots',
        label: 'Show Navigation Dots',
      },
      {
        type: 'boolean',
        name: 'showArrows',
        label: 'Show Navigation Arrows',
      },
    ],
  },
  {
    name: 'services',
    label: 'Services Section',
    ui: {
      previewSrc: '/blocks/services.png',
      defaultItem: {
        title: 'Hizmetlerimiz',
        subtitle: 'Profesyonel e-spor çözümleri',
        selectedServices: [],
        background: {
          image: '',
          overlay: {
            color: 'rgba(0, 0, 0, 0.9)',
            opacity: 0.9,
          },
        },
        showBottomCTA: true,
        bottomCTAText: 'Tüm Hizmetlerimizi Gör',
        bottomCTALink: '/services',
      },
    },
    fields: [
      {
        type: 'string',
        name: 'title',
        label: 'Section Title',
        required: true,
      },
      {
        type: 'string',
        name: 'subtitle',
        label: 'Section Subtitle',
        ui: {
          component: 'textarea',
        },
      },
      {
        type: 'object',
        name: 'selectedServices',
        label: 'Select Services to Display (Max 6)',
        list: true,
        ui: {
          itemProps: (item: any) => {
            return { label: item?.serviceTitle || 'Select Service' };
          },
          max: 6,
        },
        fields: [
          {
            type: 'string',
            name: 'serviceId',
            label: 'Choose Service',
            required: true,
            ui: {
              component: 'select',
              options: [
                { label: 'E-sports Management', value: 'esports-management' },
                {
                  label: 'Tournament Organization',
                  value: 'tournament-organization',
                },
                { label: 'Streaming & Content', value: 'streaming-content' },
                { label: 'Coaching & Training', value: 'coaching-training' },
                { label: 'Brand Management', value: 'brand-management' },
                { label: 'Consulting', value: 'consulting' },
              ],
            },
          },
          {
            type: 'string',
            name: 'serviceTitle',
            label: 'Service Title (Auto-filled)',
            description: 'This will be auto-filled based on your selection',
          },
        ],
      },
      {
        type: 'object',
        name: 'background',
        label: 'Background Settings',
        fields: [
          {
            type: 'image',
            name: 'image',
            label: 'Background Image',
          },
          {
            type: 'object',
            name: 'overlay',
            label: 'Background Overlay',
            fields: [
              {
                type: 'string',
                name: 'color',
                label: 'Overlay Color',
                ui: {
                  component: 'color',
                },
              },
              {
                type: 'number',
                name: 'opacity',
                label: 'Overlay Opacity (0-1)',
                ui: {
                  parse: (value: any) => Number(value),
                  component: 'number',
                },
              },
            ],
          },
        ],
      },
      {
        type: 'boolean',
        name: 'showBottomCTA',
        label: 'Show Bottom CTA Button',
      },
      {
        type: 'string',
        name: 'bottomCTAText',
        label: 'Bottom CTA Button Text',
        required: true,
      },
      {
        type: 'string',
        name: 'bottomCTALink',
        label: 'Bottom CTA Button Link',
        required: true,
      },
    ],
  },
  {
    name: 'about',
    label: 'About Section',
    ui: {
      previewSrc: '/blocks/about.png',
      defaultItem: {
        title: 'Hakkımızda',
        content:
          'AIM Agency olarak, e-spor dünyasında profesyonel hizmetler sunan bir ajansız. Oyuncularımızın ve takımlarımızın başarısı için sürekli çalışıyor, onların kariyerlerinde fark yaratacak çözümler sunuyoruz.',
        backgroundVariant: 'default',
        contentAlignment: 'left',
        showStats: true,
        showValues: true,
      },
    },
    fields: [
      {
        type: 'string',
        name: 'title',
        label: 'Section Title',
        required: true,
      },
      {
        type: 'rich-text',
        name: 'content',
        label: 'Content',
        required: true,
      },
      {
        type: 'image',
        name: 'image',
        label: 'Background Image',
      },
      {
        type: 'image',
        name: 'logo',
        label: 'Logo/Content Image',
      },
      {
        type: 'object',
        name: 'overlay',
        label: 'Background Overlay',
        fields: [
          {
            type: 'string',
            name: 'color',
            label: 'Overlay Color',
            ui: {
              component: 'color',
            },
          },
          {
            type: 'number',
            name: 'opacity',
            label: 'Overlay Opacity',
            ui: {
              parse: (val: any) => Number(val),
              component: 'number',
            },
          },
        ],
      },
      {
        type: 'string',
        name: 'backgroundVariant',
        label: 'Background Variant',
        options: [
          { value: 'default', label: 'Default' },
          { value: 'gradient', label: 'Gradient' },
          { value: 'pattern', label: 'Pattern' },
        ],
      },
      {
        type: 'string',
        name: 'contentAlignment',
        label: 'Content Alignment',
        options: [
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'Right' },
        ],
      },
      {
        type: 'boolean',
        name: 'showStats',
        label: 'Show Statistics',
      },
      {
        type: 'boolean',
        name: 'showValues',
        label: 'Show Values Section',
      },
      {
        type: 'object',
        name: 'stats',
        label: 'Statistics',
        list: true,
        fields: [
          {
            type: 'string',
            name: 'value',
            label: 'Statistic Value',
            required: true,
          },
          {
            type: 'string',
            name: 'label',
            label: 'Statistic Label',
            required: true,
          },
          {
            type: 'string',
            name: 'subtitle',
            label: 'Statistic Subtitle',
          },
        ],
      },
      {
        type: 'object',
        name: 'values',
        label: 'Company Values',
        list: true,
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Value Title',
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Value Description',
            required: true,
          },
          {
            type: 'string',
            name: 'icon',
            label: 'Icon Name',
            description: 'Lucide icon name (e.g., target, award, zap, users)',
          },
        ],
      },
    ],
  },
  {
    name: 'news',
    label: 'News Section',
    ui: {
      previewSrc: '/blocks/news.png',
      defaultItem: {
        title: 'Latest News',
        subtitle: 'Stay updated with the latest e-sports news and team updates',
        selectedNews: [],
        showFeaturedOnly: false,
        maxArticles: 6,
        layout: 'grid',
        showCategories: true,
        showReadMore: true,
        background: {
          image: '',
          overlay: {
            color: 'rgba(0, 0, 0, 0.8)',
            opacity: 0.8,
          },
        },
        showViewAllButton: true,
        viewAllButtonText: 'View All News',
        viewAllButtonLink: '/news',
        cardStyle: 'modern',
      },
    },
    fields: [
      {
        type: 'string',
        name: 'title',
        label: 'Section Title',
        required: true,
      },
      {
        type: 'string',
        name: 'subtitle',
        label: 'Section Subtitle',
        ui: {
          component: 'textarea',
        },
      },
      {
        type: 'object',
        name: 'selectedNews',
        label: 'Select News Articles from News Collection',
        list: true,
        ui: {
          itemProps: (item: any) => {
            return { label: item?.news?.title || 'Select News Article' };
          },
        },
        fields: [
          {
            type: 'reference',
            name: 'news',
            label: 'Choose News Article',
            collections: ['news'],
            ui: {
              itemProps: (item: any) => {
                return { label: item?.title || 'Select News Article' };
              },
            },
          },
        ],
      },
      {
        type: 'boolean',
        name: 'showFeaturedOnly',
        label: 'Show Only Featured News',
        description:
          'If enabled, only shows featured news articles (selected news will be ignored)',
      },
      {
        type: 'number',
        name: 'maxArticles',
        label: 'Maximum Number of Articles to Show',
        description:
          'Maximum number of articles to display (if not using selectedNews)',
        ui: {
          parse: (value: any) => Number(value),
        },
      },
      {
        type: 'string',
        name: 'layout',
        label: 'Layout Style',
        options: [
          { value: 'grid', label: 'Grid Layout' },
          { value: 'carousel', label: 'Carousel Layout' },
          { value: 'list', label: 'List Layout' },
          { value: 'masonry', label: 'Masonry Layout' },
        ],
      },
      {
        type: 'boolean',
        name: 'showCategories',
        label: 'Show Category Badges',
        description: 'Display category badges on news cards',
      },
      {
        type: 'boolean',
        name: 'showReadMore',
        label: 'Show Read More Button',
        description: 'Display read more button on each news card',
      },
      {
        type: 'string',
        name: 'cardStyle',
        label: 'Card Style',
        options: [
          { value: 'modern', label: 'Modern Gaming Style' },
          { value: 'minimal', label: 'Minimal Style' },
          { value: 'classic', label: 'Classic Style' },
        ],
      },
      {
        type: 'object',
        name: 'background',
        label: 'Background Settings',
        fields: [
          {
            type: 'image',
            name: 'image',
            label: 'Background Image',
          },
          {
            type: 'object',
            name: 'overlay',
            label: 'Background Overlay',
            fields: [
              {
                type: 'string',
                name: 'color',
                label: 'Overlay Color',
                description:
                  'Use rgba() format for transparency (e.g., rgba(0, 0, 0, 0.8))',
              },
              {
                type: 'number',
                name: 'opacity',
                label: 'Overlay Opacity (0-1)',
                description:
                  'Note: This is deprecated, use alpha in rgba() color instead',
                ui: {
                  parse: (value: any) => Number(value),
                },
              },
            ],
          },
        ],
      },
      {
        type: 'boolean',
        name: 'showViewAllButton',
        label: 'Show View All Button',
        description: 'Display a button to view all news articles',
      },
      {
        type: 'string',
        name: 'viewAllButtonText',
        label: 'View All Button Text',
        description: 'Text for the view all button',
      },
      {
        type: 'string',
        name: 'viewAllButtonLink',
        label: 'View All Button Link',
        description: 'Link for the view all button',
      },
    ],
  },
  {
    name: 'players',
    label: 'Players Section',
    ui: {
      previewSrc: '/blocks/players.png',
      defaultItem: {
        title: 'Our Players',
        subtitle: 'Meet the talented players of our professional team',
        selectedPlayers: [],
        showFeaturedOnly: false,
        background: {
          image: '',
          overlay: {
            color: 'rgba(0, 0, 0, 0.8)',
            opacity: 0.8,
          },
        },
        showViewAllButton: true,
        viewAllButtonText: 'View All Players',
        viewAllButtonLink: '/players',
        socialMediaText: 'Social Media',
      },
    },
    fields: [
      {
        type: 'string',
        name: 'title',
        label: 'Section Title',
        required: true,
      },
      {
        type: 'string',
        name: 'subtitle',
        label: 'Section Subtitle',
        ui: {
          component: 'textarea',
        },
      },
      {
        type: 'object',
        name: 'selectedPlayers',
        label: 'Select Players from Players Collection',
        list: true,
        ui: {
          itemProps: (item: any) => {
            return { label: item?.player?.name || 'Select Player' };
          },
        },
        fields: [
          {
            type: 'reference',
            name: 'player',
            label: 'Choose Player',
            collections: ['players'],
          },
        ],
      },
      {
        type: 'boolean',
        name: 'showFeaturedOnly',
        label: 'Show Only Featured Players',
        description:
          'If enabled, only shows featured players (selected players will be ignored)',
      },

      {
        type: 'object',
        name: 'background',
        label: 'Background Settings',
        fields: [
          {
            type: 'image',
            name: 'image',
            label: 'Background Image',
          },
          {
            type: 'object',
            name: 'overlay',
            label: 'Background Overlay',
            fields: [
              {
                type: 'string',
                name: 'color',
                label: 'Overlay Color',
                ui: {
                  component: 'color',
                },
              },
              {
                type: 'number',
                name: 'opacity',
                label: 'Overlay Opacity (0-1)',
                ui: {
                  parse: (value: any) => Number(value),
                  component: 'number',
                },
              },
            ],
          },
        ],
      },
      {
        type: 'boolean',
        name: 'showViewAllButton',
        label: 'Show View All Players Button',
      },
      {
        type: 'string',
        name: 'viewAllButtonText',
        label: 'View All Players Button Text',
      },
      {
        type: 'string',
        name: 'viewAllButtonLink',
        label: 'View All Players Button Link',
        description:
          'Where the button should redirect (e.g., /players, /oyuncular)',
      },
      {
        type: 'string',
        name: 'socialMediaText',
        label: 'Social Media Section Title',
        description:
          "Text displayed above social media icons (e.g., 'Social Media', 'Sosyal Medya')",
      },
    ],
  },
  {
    name: 'sponsors',
    label: 'Sponsors Section',
    ui: {
      previewSrc: '/blocks/sponsors.png',
      defaultItem: {
        title: 'Sponsorlarımız',
        subtitle: 'Bize güvenen ve destekleyen değerli partnerlerimiz',
        selectedSponsors: [],
        background: {
          image: '',
          overlay: {
            color: 'rgba(0, 0, 0, 0.8)',
            opacity: 0.8,
          },
        },
        showAutoScroll: true,
        autoScrollSpeed: 3000,
        viewAllButtonText: 'Tüm Sponsorlarımız',
        viewAllButtonLink: '/sponsors',
      },
    },
    fields: [
      {
        type: 'string',
        name: 'title',
        label: 'Section Title',
        required: true,
      },
      {
        type: 'string',
        name: 'subtitle',
        label: 'Section Subtitle',
        ui: {
          component: 'textarea',
        },
      },
      {
        type: 'object',
        name: 'selectedSponsors',
        label: 'Select Sponsors from Sponsors Collection',
        list: true,
        ui: {
          itemProps: (item: any) => {
            return { label: item?.sponsor?.name || 'Select Sponsor' };
          },
        },
        fields: [
          {
            type: 'reference',
            name: 'sponsor',
            label: 'Choose Sponsor',
            collections: ['sponsors'],
          },
        ],
      },
      {
        type: 'object',
        name: 'background',
        label: 'Background Settings',
        fields: [
          {
            type: 'image',
            name: 'image',
            label: 'Background Image',
          },
          {
            type: 'object',
            name: 'overlay',
            label: 'Background Overlay',
            fields: [
              {
                type: 'string',
                name: 'color',
                label: 'Overlay Color',
                ui: {
                  component: 'color',
                },
              },
              {
                type: 'number',
                name: 'opacity',
                label: 'Overlay Opacity (0-1)',
                ui: {
                  parse: (value: any) => Number(value),
                  component: 'number',
                },
              },
            ],
          },
        ],
      },
      {
        type: 'boolean',
        name: 'showAutoScroll',
        label: 'Enable Auto Scroll',
      },
      {
        type: 'number',
        name: 'autoScrollSpeed',
        label: 'Auto Scroll Speed (ms)',
        ui: {
          parse: (value: any) => Number(value),
        },
      },
      {
        type: 'string',
        name: 'viewAllButtonText',
        label: 'View All Sponsors Button Text',
      },
      {
        type: 'string',
        name: 'viewAllButtonLink',
        label: 'View All Sponsors Button Link',
        description:
          'Where the button should redirect (e.g., /sponsors, /sponsorlar)',
      },
    ],
  },
  {
    name: 'contact',
    label: 'Contact Section',
    ui: {
      previewSrc: '/blocks/contact.png',
      defaultItem: {
        title: 'İletişim',
        subtitle:
          'Profesyonel e-spor hizmetleri için bizimle iletişime geçin ve projelerinizi hayata geçirelim.',
        showForm: true,
        backgroundVariant: 'default',
        contentAlignment: 'center',
        showMap: true,
      },
    },
    fields: [
      {
        type: 'string',
        name: 'title',
        label: 'Section Title',
        required: true,
      },
      {
        type: 'string',
        name: 'subtitle',
        label: 'Section Subtitle',
        ui: {
          component: 'textarea',
        },
      },
      {
        type: 'image',
        name: 'backgroundImage',
        label: 'Background Image',
      },
      {
        type: 'object',
        name: 'overlay',
        label: 'Background Overlay',
        fields: [
          {
            type: 'string',
            name: 'color',
            label: 'Overlay Color',
            ui: {
              component: 'color',
            },
          },
          {
            type: 'number',
            name: 'opacity',
            label: 'Overlay Opacity',
            ui: {
              parse: (val: any) => Number(val),
              component: 'number',
            },
          },
        ],
      },
      {
        type: 'string',
        name: 'backgroundVariant',
        label: 'Background Variant',
        options: [
          { value: 'default', label: 'Default' },
          { value: 'gradient', label: 'Gradient' },
          { value: 'pattern', label: 'Pattern' },
        ],
      },
      {
        type: 'string',
        name: 'contentAlignment',
        label: 'Content Alignment',
        options: [
          { value: 'left', label: 'Left' },
          { value: 'center', label: 'Center' },
          { value: 'right', label: 'Right' },
        ],
      },
      {
        type: 'boolean',
        name: 'showForm',
        label: 'Show Contact Form',
      },
      {
        type: 'string',
        name: 'formTitle',
        label: 'Form Title',
      },
      {
        type: 'string',
        name: 'formSubtitle',
        label: 'Form Subtitle',
      },
      {
        type: 'string',
        name: 'infoTitle',
        label: 'Contact Info Title',
      },
      {
        type: 'string',
        name: 'infoSubtitle',
        label: 'Contact Info Subtitle',
      },
      {
        type: 'object',
        name: 'contactInfo',
        label: 'Contact Information',
        list: true,
        fields: [
          {
            type: 'string',
            name: 'label',
            label: 'Label',
            required: true,
          },
          {
            type: 'string',
            name: 'value',
            label: 'Value',
            required: true,
          },
          {
            type: 'string',
            name: 'href',
            label: 'Link (URL/mailto/tel)',
            required: true,
          },
          {
            type: 'string',
            name: 'icon',
            label: 'Icon Name',
            description: 'Lucide icon name (e.g., mail, phone, map-pin)',
          },
        ],
      },
      {
        type: 'boolean',
        name: 'showMap',
        label: 'Show Map Section',
      },
      {
        type: 'string',
        name: 'mapTitle',
        label: 'Map Section Title',
      },
    ],
  },
];

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  url: 'https://tina.io',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    loadCustomStore: async () => {
      const pack = await import('next-tinacms-cloudinary');
      return pack.TinaCloudCloudinaryMediaStore;
    },
  },

  schema: {
    collections: [
      // Sponsors Collection
      {
        name: 'sponsors',
        label: 'Sponsors',
        path: 'content/sponsors',
        format: 'json',
        ui: {
          router: ({ document }) => {
            return `/sponsors`;
          },
        },
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Sponsor Name',
            required: true,
          },
          {
            type: 'image',
            name: 'logo',
            label: 'Sponsor Logo',
            required: true,
          },
          {
            type: 'string',
            name: 'website',
            label: 'Website URL',
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Sponsor Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'category',
            label: 'Sponsor Category',
            ui: {
              component: 'select',
              list: [
                { label: 'Technology', value: 'technology' },
                { label: 'Gaming', value: 'gaming' },
                { label: 'Sports', value: 'sports' },
                { label: 'Energy Drink', value: 'energy-drink' },
                { label: 'Hardware', value: 'hardware' },
                { label: 'Software', value: 'software' },
                { label: 'Other', value: 'other' },
              ],
            },
          },
          {
            type: 'boolean',
            name: 'isActive',
            label: 'Active Sponsor',
            description: 'Show this sponsor on the website',
          },
          {
            type: 'boolean',
            name: 'isFeatured',
            label: 'Featured Sponsor',
            description: 'Show as featured sponsor',
          },
          {
            type: 'number',
            name: 'displayOrder',
            label: 'Display Order',
            description: 'Lower numbers appear first',
            ui: {
              parse: (value) => Number(value),
            },
          },
        ],
      },
      // Services Collection
      {
        name: 'services',
        label: 'Services',
        path: 'content/services',
        format: 'json',
        ui: {
          router: ({ document }) => {
            return `/services`;
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Service Title',
            required: true,
          },
          {
            type: 'string',
            name: 'icon',
            label: 'Icon Name',
            required: true,
            ui: {
              component: 'select',
              options: [
                { label: 'Gamepad2', value: 'Gamepad2' },
                { label: 'Trophy', value: 'Trophy' },
                { label: 'Video', value: 'Video' },
                { label: 'Users', value: 'Users' },
                { label: 'Target', value: 'Target' },
                { label: 'Zap', value: 'Zap' },
                { label: 'ArrowRight', value: 'ArrowRight' },
                { label: 'Sparkles', value: 'Sparkles' },
              ],
            },
          },
          {
            type: 'string',
            name: 'description',
            label: 'Service Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'features',
            label: 'Features',
            list: true,
            ui: {
              itemProps: (item: any) => {
                return { label: item || 'New Feature' };
              },
            },
          },
          {
            type: 'string',
            name: 'link',
            label: 'Service Link',
            required: true,
          },
          {
            type: 'image',
            name: 'image',
            label: 'Service Image',
          },
          {
            type: 'string',
            name: 'category',
            label: 'Service Category',
            ui: {
              component: 'select',
              options: [
                { label: 'Team Management', value: 'team-management' },
                { label: 'Tournament', value: 'tournament' },
                { label: 'Content', value: 'content' },
                { label: 'Coaching', value: 'coaching' },
                { label: 'Branding', value: 'branding' },
                { label: 'Consulting', value: 'consulting' },
              ],
            },
          },
          {
            type: 'boolean',
            name: 'isActive',
            label: 'Active Service',
            description: 'Show this service on the website',
          },
        ],
      },
      // Site Settings
      {
        name: 'settings',
        label: 'Site Settings',
        path: 'content/settings',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: '*',
        },
        fields: [
          {
            type: 'string',
            name: 'siteName',
            label: 'Site Name',
            required: true,
          },
          {
            type: 'string',
            name: 'siteDescription',
            label: 'Site Description',
          },
          {
            type: 'image',
            name: 'logo',
            label: 'Main Logo',
          },
          {
            type: 'image',
            name: 'favicon',
            label: 'Favicon',
          },
          {
            type: 'object',
            name: 'colors',
            label: 'Brand Colors',
            fields: [
              {
                type: 'string',
                name: 'primary',
                label: 'Primary Color',
                ui: {
                  component: 'color',
                },
              },
              {
                type: 'string',
                name: 'secondary',
                label: 'Secondary Color',
                ui: {
                  component: 'color',
                },
              },
            ],
          },
          {
            type: 'object',
            name: 'social',
            label: 'Social Media',
            fields: [
              {
                type: 'string',
                name: 'twitter',
                label: 'Twitter/X URL',
              },
              {
                type: 'string',
                name: 'instagram',
                label: 'Instagram URL',
              },
              {
                type: 'string',
                name: 'youtube',
                label: 'YouTube URL',
              },
              {
                type: 'string',
                name: 'discord',
                label: 'Discord URL',
              },
              {
                type: 'string',
                name: 'twitch',
                label: 'Twitch URL',
              },
            ],
          },
          {
            type: 'object',
            name: 'contact',
            label: 'Contact Information',
            fields: [
              {
                type: 'string',
                name: 'email',
                label: 'Contact Email',
              },
              {
                type: 'string',
                name: 'phone',
                label: 'Phone Number',
              },
              {
                type: 'string',
                name: 'address',
                label: 'Office Address',
              },
            ],
          },
        ],
      },

      // Navigation
      {
        name: 'navigation',
        label: 'Navigation',
        path: 'content/navigation',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: '*',
        },
        fields: [
          {
            type: 'object',
            name: 'header',
            label: 'Header Menu',
            fields: [
              {
                type: 'object',
                name: 'menuItems',
                label: 'Menu Items',
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.label };
                  },
                },
                fields: [
                  {
                    type: 'string',
                    name: 'label',
                    label: 'Menu Label',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'href',
                    label: 'Link URL',
                    required: true,
                  },
                  {
                    type: 'boolean',
                    name: 'external',
                    label: 'External Link',
                  },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'footer',
            label: 'Footer',
            fields: [
              {
                type: 'rich-text',
                name: 'aboutText',
                label: 'About Text',
              },
              {
                type: 'string',
                name: 'copyright',
                label: 'Copyright Text',
              },
            ],
          },
        ],
      },

      // Homepage
      {
        name: 'homepage',
        label: 'Homepage',
        path: 'content/homepage',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: '*',
        },
        fields: [
          {
            type: 'object',
            name: 'seo',
            label: 'SEO Settings',
            fields: [
              {
                type: 'string',
                name: 'title',
                label: 'Page Title',
              },
              {
                type: 'string',
                name: 'description',
                label: 'Meta Description',
              },
              {
                type: 'image',
                name: 'image',
                label: 'Social Share Image',
              },
            ],
          },
          {
            type: 'object',
            name: 'components',
            label: 'Page Components',
            list: true,
            templates: componentTemplates as any,
            ui: {
              visualSelector: true,
            },
          },
        ],
      },

      // News
      {
        name: 'news',
        label: 'News & Articles',
        path: 'content/news',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Article Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'slug',
            label: 'URL Slug',
            required: true,
          },
          {
            type: 'string',
            name: 'locale',
            label: 'Language',
            options: locales,
            required: true,
          },
          {
            type: 'string',
            name: 'excerpt',
            label: 'Article Excerpt',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'image',
            name: 'featuredImage',
            label: 'Featured Image',
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            options: [
              { value: 'tournament', label: 'Tournament' },
              { value: 'team', label: 'Team News' },
              { value: 'player', label: 'Player News' },
              { value: 'announcement', label: 'Announcement' },
              { value: 'general', label: 'General' },
            ],
          },
          {
            type: 'boolean',
            name: 'featured',
            label: 'Featured Article',
          },
          {
            type: 'datetime',
            name: 'publishDate',
            label: 'Publish Date',
          },
          {
            type: 'string',
            name: 'author',
            label: 'Author',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Article Content',
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/news/${document._sys.filename}`,
        },
      },

      // Players
      {
        name: 'players',
        label: 'Players',
        path: 'content/players',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Player Name',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'slug',
            label: 'URL Slug',
            required: true,
          },
          {
            type: 'string',
            name: 'locale',
            label: 'Language',
            options: locales,
            required: true,
          },
          {
            type: 'string',
            name: 'nickname',
            label: 'Gaming Nickname',
            required: true,
          },
          {
            type: 'string',
            name: 'position',
            label: 'Position/Role',
            options: [
              { value: 'adc', label: 'ADC (Attack Damage Carry)' },
              { value: 'support', label: 'Support' },
              { value: 'mid', label: 'Mid Lane' },
              { value: 'jungle', label: 'Jungle' },
              { value: 'top', label: 'Top Lane' },
              { value: 'entry-fragger', label: 'Entry Fragger' },
              { value: 'awper', label: 'AWPer' },
              { value: 'igl', label: 'In-Game Leader' },
              { value: 'rifler', label: 'Rifler' },
              { value: 'lurker', label: 'Lurker' },
              { value: 'duelist', label: 'Duelist' },
              { value: 'initiator', label: 'Initiator' },
              { value: 'controller', label: 'Controller' },
              { value: 'sentinel', label: 'Sentinel' },
            ],
          },
          {
            type: 'image',
            name: 'avatar',
            label: 'Player Photo',
            required: true,
          },
          {
            type: 'number',
            name: 'age',
            label: 'Age',
            ui: {
              parse: (value) => Number(value),
            },
          },
          {
            type: 'string',
            name: 'nationality',
            label: 'Nationality',
            ui: {
              component: 'select',
              options: [
                { value: 'TR', label: 'Turkey' },
                { value: 'US', label: 'United States' },
                { value: 'DE', label: 'Germany' },
                { value: 'FR', label: 'France' },
                { value: 'SE', label: 'Sweden' },
                { value: 'DK', label: 'Denmark' },
                { value: 'UK', label: 'United Kingdom' },
                { value: 'FI', label: 'Finland' },
                { value: 'NO', label: 'Norway' },
                { value: 'BR', label: 'Brazil' },
                { value: 'KR', label: 'South Korea' },
                { value: 'CN', label: 'China' },
                { value: 'JP', label: 'Japan' },
                { value: 'RU', label: 'Russia' },
                { value: 'UA', label: 'Ukraine' },
                { value: 'PL', label: 'Poland' },
                { value: 'CZ', label: 'Czech Republic' },
                { value: 'Other', label: 'Other' },
              ],
            },
          },
          {
            type: 'datetime',
            name: 'joinDate',
            label: 'Join Date',
          },
          {
            type: 'boolean',
            name: 'featured',
            label: 'Featured Player',
            description: 'Show this player in featured sections',
          },
          {
            type: 'boolean',
            name: 'active',
            label: 'Active Player',
            description: 'Is this player currently active in the team?',
          },
          {
            type: 'string',
            name: 'status',
            label: 'Player Status',
            ui: {
              component: 'select',
              options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'substitute', label: 'Substitute' },
                { value: 'coach', label: 'Coach' },
                { value: 'retired', label: 'Retired' },
                { value: 'transfer', label: 'On Transfer' },
              ],
            },
          },
          {
            type: 'object',
            name: 'games',
            label: 'Games',
            list: true,
            ui: {
              itemProps: (item) => {
                return {
                  label: `${item?.game || 'New Game'} - ${item?.rank || 'No Rank'}`,
                };
              },
            },
            fields: [
              {
                type: 'string',
                name: 'game',
                label: 'Game',
                required: true,
                ui: {
                  component: 'select',
                  options: [
                    { value: 'valorant', label: 'Valorant' },
                    { value: 'csgo', label: 'CS:GO' },
                    { value: 'cs2', label: 'Counter-Strike 2' },
                    { value: 'lol', label: 'League of Legends' },
                    { value: 'dota2', label: 'Dota 2' },
                    { value: 'apex', label: 'Apex Legends' },
                    { value: 'fortnite', label: 'Fortnite' },
                    { value: 'overwatch', label: 'Overwatch 2' },
                    { value: 'rainbow6', label: 'Rainbow Six Siege' },
                  ],
                },
              },
              {
                type: 'string',
                name: 'rank',
                label: 'Current Rank',
              },
              {
                type: 'boolean',
                name: 'primary',
                label: 'Primary Game',
                description: "Is this the player's main game?",
              },
            ],
          },
          {
            type: 'object',
            name: 'stats',
            label: 'Player Statistics',
            fields: [
              {
                type: 'object',
                name: 'career',
                label: 'Career Stats',
                list: true,
                ui: {
                  itemProps: (item) => {
                    return {
                      label: `${item?.label || 'New Stat'}: ${item?.value || '0'}`,
                    };
                  },
                },
                fields: [
                  {
                    type: 'string',
                    name: 'label',
                    label: 'Stat Label',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'value',
                    label: 'Stat Value',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'icon',
                    label: 'Icon',
                    ui: {
                      component: 'select',
                      options: [
                        { value: 'trophy', label: 'Trophy' },
                        { value: 'target', label: 'Target' },
                        { value: 'zap', label: 'Zap' },
                        { value: 'award', label: 'Award' },
                        { value: 'star', label: 'Star' },
                        { value: 'sword', label: 'Sword' },
                        { value: 'shield', label: 'Shield' },
                        { value: 'crosshair', label: 'Crosshair' },
                      ],
                    },
                  },
                ],
              },
              {
                type: 'object',
                name: 'achievements',
                label: 'Major Achievements',
                list: true,
                ui: {
                  itemProps: (item) => {
                    return {
                      label: `${item?.year || 'Year'} - ${item?.title || 'Achievement'}`,
                    };
                  },
                },
                fields: [
                  {
                    type: 'string',
                    name: 'year',
                    label: 'Year',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'title',
                    label: 'Achievement Title',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'tournament',
                    label: 'Tournament/Event',
                  },
                  {
                    type: 'string',
                    name: 'placement',
                    label: 'Placement (1st, 2nd, etc.)',
                  },
                  {
                    type: 'string',
                    name: 'game',
                    label: 'Game',
                  },
                ],
              },
            ],
          },
          {
            type: 'object',
            name: 'social',
            label: 'Social Media',
            fields: [
              {
                type: 'string',
                name: 'twitch',
                label: 'Twitch URL',
              },
              {
                type: 'string',
                name: 'youtube',
                label: 'YouTube URL',
              },
              {
                type: 'string',
                name: 'twitter',
                label: 'Twitter/X URL',
              },
              {
                type: 'string',
                name: 'instagram',
                label: 'Instagram URL',
              },
              {
                type: 'string',
                name: 'discord',
                label: 'Discord Username',
              },
              {
                type: 'string',
                name: 'steam',
                label: 'Steam Profile URL',
              },
              {
                type: 'string',
                name: 'tiktok',
                label: 'TikTok URL',
              },
              {
                type: 'string',
                name: 'kick',
                label: 'Kick URL',
              },
            ],
          },
          {
            type: 'object',
            name: 'settings',
            label: 'Gaming Setup',
            fields: [
              {
                type: 'string',
                name: 'mouse',
                label: 'Mouse',
              },
              {
                type: 'string',
                name: 'keyboard',
                label: 'Keyboard',
              },
              {
                type: 'string',
                name: 'headset',
                label: 'Headset',
              },
              {
                type: 'string',
                name: 'monitor',
                label: 'Monitor',
              },
              {
                type: 'string',
                name: 'mousepad',
                label: 'Mousepad',
              },
              {
                type: 'object',
                name: 'sensitivity',
                label: 'Game Sensitivity Settings',
                list: true,
                fields: [
                  {
                    type: 'string',
                    name: 'game',
                    label: 'Game',
                  },
                  {
                    type: 'string',
                    name: 'sensitivity',
                    label: 'Sensitivity',
                  },
                  {
                    type: 'string',
                    name: 'dpi',
                    label: 'DPI',
                  },
                  {
                    type: 'string',
                    name: 'edpi',
                    label: 'eDPI',
                  },
                ],
              },
            ],
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Player Bio',
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/players/${document._sys.filename}`,
        },
      },

      // Matches
      {
        name: 'matches',
        label: 'Matches',
        path: 'content/matches',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Match Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'slug',
            label: 'URL Slug',
            required: true,
          },
          {
            type: 'string',
            name: 'locale',
            label: 'Language',
            options: locales,
            required: true,
          },
          {
            type: 'string',
            name: 'tournament',
            label: 'Tournament Name',
            required: true,
          },
          {
            type: 'string',
            name: 'game',
            label: 'Game',
            options: [
              { value: 'lol', label: 'League of Legends' },
              { value: 'valorant', label: 'Valorant' },
              { value: 'csgo', label: 'CS:GO' },
              { value: 'dota2', label: 'Dota 2' },
            ],
          },
          {
            type: 'datetime',
            name: 'matchDate',
            label: 'Match Date',
            required: true,
          },
          {
            type: 'string',
            name: 'status',
            label: 'Match Status',
            options: [
              { value: 'upcoming', label: 'Upcoming' },
              { value: 'live', label: 'Live' },
              { value: 'finished', label: 'Finished' },
            ],
          },
          {
            type: 'image',
            name: 'thumbnail',
            label: 'Match Thumbnail',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Match Details',
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/matches/${document._sys.filename}`,
        },
      },

      // About Pages
      {
        name: 'about',
        label: 'About Pages',
        path: 'content/about',
        format: 'json',
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: '*',
        },
        fields: [
          {
            type: 'object',
            name: 'seo',
            label: 'SEO Settings',
            fields: [
              {
                type: 'string',
                name: 'title',
                label: 'Page Title',
                required: true,
              },
              {
                type: 'string',
                name: 'description',
                label: 'Meta Description',
                required: true,
              },
              {
                type: 'string',
                name: 'keywords',
                label: 'Keywords',
              },
              {
                type: 'image',
                name: 'image',
                label: 'Social Share Image',
              },
              {
                type: 'string',
                name: 'canonical',
                label: 'Canonical URL',
              },
            ],
          },
          {
            type: 'object',
            name: 'components',
            label: 'Page Components',
            list: true,
            templates: [
              {
                name: 'about_hero',
                nameOverride: 'about-hero',
                label: 'About Hero Section',
                ui: {
                  previewSrc: '/blocks/hero.png',
                  defaultItem: {
                    title: 'Hakkımızda',
                    subtitle: 'E-spor Dünyasında Zirveye Çıkarıyoruz',
                    description:
                      'AIM Agency olarak, e-spor sektöründe yılların deneyimi ile oyuncularımızın ve takımlarımızın başarısı için çalışıyoruz.',
                    image: '',
                  },
                },
                fields: [
                  {
                    type: 'string',
                    name: 'title',
                    label: 'Hero Title',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'subtitle',
                    label: 'Hero Subtitle',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'description',
                    label: 'Hero Description',
                    ui: {
                      component: 'textarea',
                    },
                    required: true,
                  },
                  {
                    type: 'image',
                    name: 'image',
                    label: 'Hero Image',
                  },
                ],
              },
              {
                name: 'about_content',
                nameOverride: 'about-content',
                label: 'About Content Section',
                ui: {
                  previewSrc: '/blocks/about.png',
                  defaultItem: {
                    mainTitle: 'Bizim Hikayemiz',
                    mainContent:
                      'AIM Agency, 2020 yılında e-spor dünyasında profesyonel hizmetler sunmak amacıyla kuruldu.',
                    sections: [],
                  },
                },
                fields: [
                  {
                    type: 'string',
                    name: 'mainTitle',
                    label: 'Main Title',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'mainContent',
                    label: 'Main Content',
                    ui: {
                      component: 'textarea',
                    },
                    required: true,
                  },
                  {
                    type: 'object',
                    name: 'sections',
                    label: 'Content Sections',
                    list: true,
                    fields: [
                      {
                        type: 'string',
                        name: 'title',
                        label: 'Section Title',
                        required: true,
                      },
                      {
                        type: 'string',
                        name: 'content',
                        label: 'Section Content',
                        ui: {
                          component: 'textarea',
                        },
                        required: true,
                      },
                      {
                        type: 'string',
                        name: 'icon',
                        label: 'Section Icon',
                        options: [
                          { value: 'target', label: 'Target' },
                          { value: 'eye', label: 'Eye' },
                          { value: 'heart', label: 'Heart' },
                          { value: 'trophy', label: 'Trophy' },
                          { value: 'users', label: 'Users' },
                          { value: 'award', label: 'Award' },
                          { value: 'calendar', label: 'Calendar' },
                          { value: 'star', label: 'Star' },
                        ],
                        required: true,
                      },
                    ],
                  },
                ],
              },
              {
                name: 'about_stats',
                nameOverride: 'about-stats',
                label: 'About Statistics Section',
                ui: {
                  previewSrc: '/blocks/stats.png',
                  defaultItem: {
                    title: 'Rakamlarla AIM Agency',
                    items: [],
                  },
                },
                fields: [
                  {
                    type: 'string',
                    name: 'title',
                    label: 'Stats Title',
                    required: true,
                  },
                  {
                    type: 'object',
                    name: 'items',
                    label: 'Statistics Items',
                    list: true,
                    fields: [
                      {
                        type: 'string',
                        name: 'number',
                        label: 'Number/Value',
                        required: true,
                      },
                      {
                        type: 'string',
                        name: 'label',
                        label: 'Label',
                        required: true,
                      },
                      {
                        type: 'string',
                        name: 'description',
                        label: 'Description',
                        ui: {
                          component: 'textarea',
                        },
                      },
                    ],
                  },
                ],
              },
              {
                name: 'about_team',
                nameOverride: 'about-team',
                label: 'About Team Section',
                ui: {
                  previewSrc: '/blocks/team.png',
                  defaultItem: {
                    title: 'Ekibimiz',
                    subtitle: 'Uzman Kadromuz',
                    description:
                      'E-spor dünyasında deneyimli uzmanlarımızla oyuncularımızın ve takımlarımızın başarısı için çalışıyoruz.',
                    members: [],
                  },
                },
                fields: [
                  {
                    type: 'string',
                    name: 'title',
                    label: 'Team Title',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'subtitle',
                    label: 'Team Subtitle',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'description',
                    label: 'Team Description',
                    ui: {
                      component: 'textarea',
                    },
                    required: true,
                  },
                  {
                    type: 'object',
                    name: 'members',
                    label: 'Team Members',
                    list: true,
                    fields: [
                      {
                        type: 'string',
                        name: 'name',
                        label: 'Member Name',
                        required: true,
                      },
                      {
                        type: 'string',
                        name: 'position',
                        label: 'Position',
                        required: true,
                      },
                      {
                        type: 'string',
                        name: 'description',
                        label: 'Description',
                        ui: {
                          component: 'textarea',
                        },
                        required: true,
                      },
                      {
                        type: 'image',
                        name: 'image',
                        label: 'Member Photo',
                      },
                    ],
                  },
                ],
              },
              {
                name: 'about_achievements',
                nameOverride: 'about-achievements',
                label: 'About Achievements Section',
                ui: {
                  previewSrc: '/blocks/achievements.png',
                  defaultItem: {
                    title: 'Başarılarımız',
                    subtitle: 'Gurur Duyduğumuz Anlar',
                    items: [],
                  },
                },
                fields: [
                  {
                    type: 'string',
                    name: 'title',
                    label: 'Achievements Title',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'subtitle',
                    label: 'Achievements Subtitle',
                    required: true,
                  },
                  {
                    type: 'object',
                    name: 'items',
                    label: 'Achievement Items',
                    list: true,
                    fields: [
                      {
                        type: 'string',
                        name: 'year',
                        label: 'Year',
                        required: true,
                      },
                      {
                        type: 'string',
                        name: 'title',
                        label: 'Achievement Title',
                        required: true,
                      },
                      {
                        type: 'string',
                        name: 'description',
                        label: 'Description',
                        ui: {
                          component: 'textarea',
                        },
                      },
                      {
                        type: 'image',
                        name: 'image',
                        label: 'Achievement Image',
                      },
                    ],
                  },
                ],
              },
              {
                name: 'about_cta',
                nameOverride: 'about-cta',
                label: 'About Call to Action',
                ui: {
                  previewSrc: '/blocks/cta.png',
                  defaultItem: {
                    title: 'Bizimle Çalışmak İster misiniz?',
                    description:
                      'E-spor kariyerinizi bir üst seviyeye taşımak için bizimle iletişime geçin.',
                    buttonText: 'İletişime Geçin',
                    buttonLink: '/iletisim',
                  },
                },
                fields: [
                  {
                    type: 'string',
                    name: 'title',
                    label: 'CTA Title',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'description',
                    label: 'CTA Description',
                    ui: {
                      component: 'textarea',
                    },
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'buttonText',
                    label: 'Button Text',
                    required: true,
                  },
                  {
                    type: 'string',
                    name: 'buttonLink',
                    label: 'Button Link',
                    required: true,
                  },
                ],
              },
            ] as any,
            ui: {
              visualSelector: true,
            },
          },
        ],
      },
    ],
  },
});
