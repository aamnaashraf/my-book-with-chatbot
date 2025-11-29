// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'Comprehensive 13-Week Course for Industry Practitioners',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://ameen-alam.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Physical-AI-Humanoid-Robotics-Textbook/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ameen-alam', // Usually your GitHub org/user name.
  projectName: 'Physical-AI-Humanoid-Robotics-Textbook', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ameen-alam/Physical-AI-Humanoid-Robotics-Textbook/tree/main/',
        },
        blog: false, // Disable blog for textbook
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Physical AI & Humanoid Robotics',
        logo: {
          alt: 'Physical AI Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Textbook',
          },
          {
            href: 'https://github.com/ameen-alam/Physical-AI-Humanoid-Robotics-Textbook',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Setup Guides',
                to: '/docs/setup/workstation',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Glossary',
                to: '/docs/references/glossary',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/ameen-alam/Physical-AI-Humanoid-Robotics-Textbook',
              },
              {
                label: 'Project Constitution',
                href: 'https://github.com/ameen-alam/Physical-AI-Humanoid-Robotics-Textbook/blob/main/.specify/memory/constitution.md',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics Textbook. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['python', 'bash', 'yaml'],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // Algolia DocSearch configuration
      // Note: Replace with actual Algolia credentials when ready
      algolia: {
        // The application ID provided by Algolia
        appId: 'YOUR_APP_ID',
        // Public API key: it is safe to commit it
        apiKey: 'YOUR_SEARCH_API_KEY',
        indexName: 'physical-ai-textbook',
        // Optional: see doc section below
        contextualSearch: true,
        // Optional: Algolia search parameters
        searchParameters: {
          attributesToRetrieve: [
            'hierarchy',
            'content',
            'url',
            'week',
            'module',
            'capstone_component'
          ],
        },
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
      },
      metadata: [
        {name: 'keywords', content: 'robotics, physical AI, humanoid robots, ROS 2, Isaac Sim, VLA'},
        {name: 'description', content: 'Comprehensive 13-week textbook for industry practitioners learning Physical AI and Humanoid Robotics'},
        {property: 'og:title', content: 'Physical AI & Humanoid Robotics Textbook'},
        {property: 'og:description', content: 'Master Physical AI, ROS 2, Digital Twins, and Humanoid Robotics in 13 weeks'},
        {property: 'og:type', content: 'website'},
      ],
    }),
};

export default config;
