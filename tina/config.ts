import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

// Supported locales
const locales = ["tr", "en"];

// Common component templates for page builder
const componentTemplates = [
  {
    name: "hero",
    label: "Hero Section",
    ui: {
      previewSrc: "/blocks/hero.png",
      defaultItem: {
        headline: "Welcome to AIM Agency",
        subtext: "Professional E-sport Team Management",
        buttonText: "Learn More",
        buttonLink: "#",
        backgroundImage: "",
      },
    },
    fields: [
      {
        type: "string",
        name: "headline",
        label: "Headline",
        required: true,
      },
      {
        type: "string",
        name: "subtext",
        label: "Subtext",
      },
      {
        type: "string",
        name: "buttonText",
        label: "Button Text",
      },
      {
        type: "string",
        name: "buttonLink",
        label: "Button Link",
      },
      {
        type: "image",
        name: "backgroundImage",
        label: "Background Image",
      },
    ],
  },
  {
    name: "services",
    label: "Services Section",
    fields: [
      {
        type: "string",
        name: "title",
        label: "Section Title",
        required: true,
      },
      {
        type: "string",
        name: "subtitle",
        label: "Section Subtitle",
      },
    ],
  },
  {
    name: "about",
    label: "About Section",
    fields: [
      {
        type: "string",
        name: "title",
        label: "Section Title",
        required: true,
      },
      {
        type: "rich-text",
        name: "content",
        label: "Content",
        required: true,
      },
      {
        type: "image",
        name: "image",
        label: "Section Image",
      },
    ],
  },
  {
    name: "news",
    label: "News Section",
    fields: [
      {
        type: "string",
        name: "title",
        label: "Section Title",
        required: true,
      },
      {
        type: "number",
        name: "limit",
        label: "Number of Articles to Show",
        ui: {
          parse: (value: any) => Number(value),
        },
      },
    ],
  },
  {
    name: "players",
    label: "Players Section",
    fields: [
      {
        type: "string",
        name: "title",
        label: "Section Title",
        required: true,
      },
      {
        type: "number",
        name: "limit",
        label: "Number of Players to Show",
        ui: {
          parse: (value: any) => Number(value),
        },
      },
    ],
  },
  {
    name: "sponsors",
    label: "Sponsors Section",
    fields: [
      {
        type: "string",
        name: "title",
        label: "Section Title",
        required: true,
      },
    ],
  },
  {
    name: "contact",
    label: "Contact Section",
    fields: [
      {
        type: "string",
        name: "title",
        label: "Section Title",
        required: true,
      },
      {
        type: "boolean",
        name: "showForm",
        label: "Show Contact Form",
      },
    ],
  },
];

export default defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      // Site Settings
      {
        name: "settings",
        label: "Site Settings",
        path: "content/settings",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "*",
        },
        fields: [
          {
            type: "string",
            name: "siteName",
            label: "Site Name",
            required: true,
          },
          {
            type: "string",
            name: "siteDescription",
            label: "Site Description",
          },
          {
            type: "image",
            name: "logo",
            label: "Main Logo",
          },
          {
            type: "image",
            name: "favicon",
            label: "Favicon",
          },
          {
            type: "object",
            name: "colors",
            label: "Brand Colors",
            fields: [
              {
                type: "string",
                name: "primary",
                label: "Primary Color",
                ui: {
                  component: "color",
                },
              },
              {
                type: "string",
                name: "secondary",
                label: "Secondary Color",
                ui: {
                  component: "color",
                },
              },
            ],
          },
          {
            type: "object",
            name: "social",
            label: "Social Media",
            fields: [
              {
                type: "string",
                name: "twitter",
                label: "Twitter/X URL",
              },
              {
                type: "string",
                name: "instagram",
                label: "Instagram URL",
              },
              {
                type: "string",
                name: "youtube",
                label: "YouTube URL",
              },
              {
                type: "string",
                name: "discord",
                label: "Discord URL",
              },
              {
                type: "string",
                name: "twitch",
                label: "Twitch URL",
              },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "Contact Information",
            fields: [
              {
                type: "string",
                name: "email",
                label: "Contact Email",
              },
              {
                type: "string",
                name: "phone",
                label: "Phone Number",
              },
              {
                type: "string",
                name: "address",
                label: "Office Address",
              },
            ],
          },
        ],
      },

      // Navigation
      {
        name: "navigation",
        label: "Navigation",
        path: "content/navigation",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "*",
        },
        fields: [
          {
            type: "object",
            name: "header",
            label: "Header Menu",
            fields: [
              {
                type: "object",
                name: "menuItems",
                label: "Menu Items",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.label };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Menu Label",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Link URL",
                    required: true,
                  },
                  {
                    type: "boolean",
                    name: "external",
                    label: "External Link",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              {
                type: "rich-text",
                name: "aboutText",
                label: "About Text",
              },
              {
                type: "string",
                name: "copyright",
                label: "Copyright Text",
              },
            ],
          },
        ],
      },

      // Homepage
      {
        name: "homepage",
        label: "Homepage",
        path: "content/homepage",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "*",
        },
        fields: [
          {
            type: "object",
            name: "seo",
            label: "SEO Settings",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
              },
              {
                type: "string",
                name: "description",
                label: "Meta Description",
              },
              {
                type: "image",
                name: "image",
                label: "Social Share Image",
              },
            ],
          },
          {
            type: "object",
            name: "components",
            label: "Page Components",
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
        name: "news",
        label: "News & Articles",
        path: "content/news",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Article Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "string",
            name: "locale",
            label: "Language",
            options: locales,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Article Excerpt",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "featuredImage",
            label: "Featured Image",
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              { value: "tournament", label: "Tournament" },
              { value: "team", label: "Team News" },
              { value: "player", label: "Player News" },
              { value: "announcement", label: "Announcement" },
              { value: "general", label: "General" },
            ],
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured Article",
          },
          {
            type: "datetime",
            name: "publishDate",
            label: "Publish Date",
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Article Content",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/news/${document._sys.filename}`,
        },
      },

      // Players
      {
        name: "players",
        label: "Players",
        path: "content/players",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Player Name",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "string",
            name: "locale",
            label: "Language",
            options: locales,
            required: true,
          },
          {
            type: "string",
            name: "nickname",
            label: "Gaming Nickname",
            required: true,
          },
          {
            type: "string",
            name: "position",
            label: "Position/Role",
            options: [
              { value: "carry", label: "Carry" },
              { value: "support", label: "Support" },
              { value: "mid", label: "Mid" },
              { value: "jungle", label: "Jungle" },
              { value: "top", label: "Top" },
            ],
          },
          {
            type: "image",
            name: "avatar",
            label: "Player Photo",
          },
          {
            type: "number",
            name: "age",
            label: "Age",
            ui: {
              parse: (value) => Number(value),
            },
          },
          {
            type: "datetime",
            name: "joinDate",
            label: "Join Date",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Player Bio",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/players/${document._sys.filename}`,
        },
      },

      // Services
      {
        name: "services",
        label: "Services",
        path: "content/services",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Service Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "string",
            name: "locale",
            label: "Language",
            options: locales,
            required: true,
          },
          {
            type: "string",
            name: "excerpt",
            label: "Service Summary",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "icon",
            label: "Service Icon",
          },
          {
            type: "string",
            name: "category",
            label: "Service Category",
            options: [
              { value: "player-management", label: "Player Management" },
              { value: "team-coaching", label: "Team Coaching" },
              { value: "tournament", label: "Tournament Organization" },
              { value: "marketing", label: "Marketing & Branding" },
              { value: "consulting", label: "Consulting" },
            ],
          },
          {
            type: "rich-text",
            name: "body",
            label: "Service Details",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/services/${document._sys.filename}`,
        },
      },

      // Matches
      {
        name: "matches",
        label: "Matches",
        path: "content/matches",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Match Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "slug",
            label: "URL Slug",
            required: true,
          },
          {
            type: "string",
            name: "locale",
            label: "Language",
            options: locales,
            required: true,
          },
          {
            type: "string",
            name: "tournament",
            label: "Tournament Name",
            required: true,
          },
          {
            type: "string",
            name: "game",
            label: "Game",
            options: [
              { value: "lol", label: "League of Legends" },
              { value: "valorant", label: "Valorant" },
              { value: "csgo", label: "CS:GO" },
              { value: "dota2", label: "Dota 2" },
            ],
          },
          {
            type: "datetime",
            name: "matchDate",
            label: "Match Date",
            required: true,
          },
          {
            type: "string",
            name: "status",
            label: "Match Status",
            options: [
              { value: "upcoming", label: "Upcoming" },
              { value: "live", label: "Live" },
              { value: "finished", label: "Finished" },
            ],
          },
          {
            type: "image",
            name: "thumbnail",
            label: "Match Thumbnail",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Match Details",
            isBody: true,
          },
        ],
        ui: {
          router: ({ document }) => `/matches/${document._sys.filename}`,
        },
      },

      // About Pages
      {
        name: "about",
        label: "About Pages",
        path: "content/about",
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "*",
        },
        fields: [
          {
            type: "object",
            name: "seo",
            label: "SEO Settings",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Page Title",
                required: true,
              },
              {
                type: "string",
                name: "description",
                label: "Meta Description",
                required: true,
              },
              {
                type: "string",
                name: "keywords",
                label: "Keywords",
              },
              {
                type: "image",
                name: "image",
                label: "Social Share Image",
              },
              {
                type: "string",
                name: "canonical",
                label: "Canonical URL",
              },
            ],
          },
          {
            type: "object",
            name: "components",
            label: "Page Components",
            list: true,
            templates: [
              {
                name: "about_hero",
                nameOverride: "about-hero",
                label: "About Hero Section",
                ui: {
                  previewSrc: "/blocks/hero.png",
                  defaultItem: {
                    title: "Hakkımızda",
                    subtitle: "E-spor Dünyasında Zirveye Çıkarıyoruz",
                    description: "AIM Agency olarak, e-spor sektöründe yılların deneyimi ile oyuncularımızın ve takımlarımızın başarısı için çalışıyoruz.",
                    image: "",
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Hero Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "subtitle",
                    label: "Hero Subtitle",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Hero Description",
                    ui: {
                      component: "textarea",
                    },
                    required: true,
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Hero Image",
                  },
                ],
              },
              {
                name: "about_content",
                nameOverride: "about-content",
                label: "About Content Section",
                ui: {
                  previewSrc: "/blocks/about.png",
                  defaultItem: {
                    mainTitle: "Bizim Hikayemiz",
                    mainContent: "AIM Agency, 2020 yılında e-spor dünyasında profesyonel hizmetler sunmak amacıyla kuruldu.",
                    sections: [],
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "mainTitle",
                    label: "Main Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "mainContent",
                    label: "Main Content",
                    ui: {
                      component: "textarea",
                    },
                    required: true,
                  },
                  {
                    type: "object",
                    name: "sections",
                    label: "Content Sections",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "title",
                        label: "Section Title",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "content",
                        label: "Section Content",
                        ui: {
                          component: "textarea",
                        },
                        required: true,
                      },
                      {
                        type: "string",
                        name: "icon",
                        label: "Section Icon",
                        options: [
                          { value: "target", label: "Target" },
                          { value: "eye", label: "Eye" },
                          { value: "heart", label: "Heart" },
                          { value: "trophy", label: "Trophy" },
                          { value: "users", label: "Users" },
                          { value: "award", label: "Award" },
                          { value: "calendar", label: "Calendar" },
                          { value: "star", label: "Star" },
                        ],
                        required: true,
                      },
                    ],
                  },
                ],
              },
              {
                name: "about_stats",
                nameOverride: "about-stats",
                label: "About Statistics Section",
                ui: {
                  previewSrc: "/blocks/stats.png",
                  defaultItem: {
                    title: "Rakamlarla AIM Agency",
                    items: [],
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Stats Title",
                    required: true,
                  },
                  {
                    type: "object",
                    name: "items",
                    label: "Statistics Items",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "number",
                        label: "Number/Value",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "label",
                        label: "Label",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: {
                          component: "textarea",
                        },
                      },
                    ],
                  },
                ],
              },
              {
                name: "about_team",
                nameOverride: "about-team",
                label: "About Team Section",
                ui: {
                  previewSrc: "/blocks/team.png",
                  defaultItem: {
                    title: "Ekibimiz",
                    subtitle: "Uzman Kadromuz",
                    description: "E-spor dünyasında deneyimli uzmanlarımızla oyuncularımızın ve takımlarımızın başarısı için çalışıyoruz.",
                    members: [],
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Team Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "subtitle",
                    label: "Team Subtitle",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "Team Description",
                    ui: {
                      component: "textarea",
                    },
                    required: true,
                  },
                  {
                    type: "object",
                    name: "members",
                    label: "Team Members",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "name",
                        label: "Member Name",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "position",
                        label: "Position",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: {
                          component: "textarea",
                        },
                        required: true,
                      },
                      {
                        type: "image",
                        name: "image",
                        label: "Member Photo",
                      },
                    ],
                  },
                ],
              },
              {
                name: "about_achievements",
                nameOverride: "about-achievements",
                label: "About Achievements Section",
                ui: {
                  previewSrc: "/blocks/achievements.png",
                  defaultItem: {
                    title: "Başarılarımız",
                    subtitle: "Gurur Duyduğumuz Anlar",
                    items: [],
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Achievements Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "subtitle",
                    label: "Achievements Subtitle",
                    required: true,
                  },
                  {
                    type: "object",
                    name: "items",
                    label: "Achievement Items",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "year",
                        label: "Year",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "title",
                        label: "Achievement Title",
                        required: true,
                      },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: {
                          component: "textarea",
                        },
                      },
                      {
                        type: "image",
                        name: "image",
                        label: "Achievement Image",
                      },
                    ],
                  },
                ],
              },
              {
                name: "about_cta",
                nameOverride: "about-cta",
                label: "About Call to Action",
                ui: {
                  previewSrc: "/blocks/cta.png",
                  defaultItem: {
                    title: "Bizimle Çalışmak İster misiniz?",
                    description: "E-spor kariyerinizi bir üst seviyeye taşımak için bizimle iletişime geçin.",
                    buttonText: "İletişime Geçin",
                    buttonLink: "/iletisim",
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "CTA Title",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "description",
                    label: "CTA Description",
                    ui: {
                      component: "textarea",
                    },
                    required: true,
                  },
                  {
                    type: "string",
                    name: "buttonText",
                    label: "Button Text",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "buttonLink",
                    label: "Button Link",
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