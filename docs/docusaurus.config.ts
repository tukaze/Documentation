import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

function normalizeSiteUrl(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  return value.startsWith('http://') || value.startsWith('https://')
    ? value
    : `https://${value}`;
}

const siteUrl =
  normalizeSiteUrl(process.env.SITE_URL) ??
  normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  normalizeSiteUrl(process.env.VERCEL_URL) ??
  'https://tukazedocumentations.vercel.app';

const config: Config = {
  title: 'Tukaze Documentation',
  tagline: 'Portfolio de documentacao tecnica, arquitetura e produto.',
  favicon: 'img/favicon-tukaze-green.svg',
  future: {
    v4: true,
  },
  url: siteUrl,
  baseUrl: '/',
  organizationName: 'tukaze',
  projectName: 'documentation',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
      disableSwitch: false,
    },
    navbar: {
      title: 'Tukaze',
      logo: {
        alt: 'Tukaze Documentation',
        src: 'img/favicon-tukaze-green.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Projetos',
        },
        {
          to: '/docs/Commit%20Crew/Ludarte%20Dashboard/ludarte',
          label: 'Portfolio',
          position: 'right',
        },
        {
          href: 'https://www.linkedin.com/in/lucastukaze',
          label: 'LinkedIn',
          position: 'right',
        },
        {
          href: 'https://github.com/tukaze',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Tukaze Documentation.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
