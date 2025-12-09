// docusaurus.config.js
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'A Complete 13-Week Program for Industry Professionals in Physical AI & Humanoid Robotics',
  favicon: 'img/favicon.ico',

  url: 'https://aamnaashraf.github.io',
  baseUrl: '/',

  organizationName: 'aamnaashraf',
  projectName: 'Physical-AI-Humanoid-Robotics',
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'ignore',

  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/aamnaashraf/Physical-AI-Humanoid-Robotics/edit/main/',
        },
        blog: false,
        theme: { customCss: require.resolve('./src/css/custom.css') },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      
      },
    ],
  ],
   
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: { alt: 'My Logo', src: '/img/logo.jpg' },
      items: [
        { type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Textbook' },
        { href: 'https://github.com/aamnaashraf/Physical-AI-Humanoid-Robotics', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        { title: 'Documentation', items: [{ label: 'Introduction', to: '/docs/intro' }] },
        { title: 'Resources', items: [{ label: 'Glossary', to: '/docs/references/glossary' }] },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/aamnaashraf/Physical-AI-Humanoid-Robotics' },
            { label: 'Project Constitution', href: 'https://github.com/aamnaashraf/Physical-AI-Humanoid-Robotics' },
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
    colorMode: { defaultMode: 'light', disableSwitch: false, respectPrefersColorScheme: true },
    algolia: {
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'physical-ai-textbook',
      contextualSearch: true,
      searchParameters: {
        attributesToRetrieve: ['hierarchy', 'content', 'url', 'week', 'module', 'capstone_component'],
      },
      searchPagePath: 'search',
    },
    metadata: [
      { name: 'keywords', content: 'robotics, physical AI, humanoid robots, ROS 2, Isaac Sim, VLA' },
      { name: 'description', content: 'Comprehensive 13-week textbook...' },
      { property: 'og:title', content: 'Physical AI & Humanoid Robotics Textbook' },
      { property: 'og:description', content: 'Master Physical AI, ROS 2, Digital Twins...' },
      { property: 'og:type', content: 'website' },
    ],
  },
};

export default config;






