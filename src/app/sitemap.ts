import { MetadataRoute } from 'next';
import { getNewsDataNews } from '@/lib/api';
import { createSlug } from '@/lib/utils';
import { i18n } from '@/i18n/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.ua';

  // Define static routes (without language prefix)
  const routes = [
    '',
    '/credits',
    '/credits/online',
    '/credits/cash',
    '/credits/microcredits',
    '/credits/credit-line',
    '/credits/refinancing',
    '/credits/secured',
    '/credits/all',
    '/cards',
    '/insurance',
    '/insurance/osago',
    '/crypto',
    '/news',
    '/calc/credit',
    '/calc/credit/consumer',
    '/calc/credit/mortgage',
    '/calc/credit/auto',
    '/calc/deposit',
  ];

  // Generate static routes for each language with hreflang alternates
  const staticRoutes: MetadataRoute.Sitemap = routes.flatMap((route) =>
    i18n.locales.map((locale) => {
      const changeFreq = (route === '' || route === '/news') ? 'daily' : 'weekly';
      return {
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: changeFreq as 'daily' | 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            i18n.locales.map((lang) => [lang, `${baseUrl}/${lang}${route}`])
          ),
        },
      };
    })
  );

  // Dynamic news routes for each language
  let newsRoutes: MetadataRoute.Sitemap = [];
  try {
    const news = await getNewsDataNews(50);
    newsRoutes = news.flatMap((article) =>
      i18n.locales.map((locale) => {
        const slug = createSlug(article.title);
        return {
          url: `${baseUrl}/${locale}/news/${slug}`,
          lastModified: new Date(article.publishedDate),
          changeFrequency: 'daily' as const,
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              i18n.locales.map((lang) => [lang, `${baseUrl}/${lang}/news/${slug}`])
            ),
          },
        };
      })
    );
  } catch (error) {
    console.error('Error fetching news for sitemap:', error);
  }

  return [...staticRoutes, ...newsRoutes];
}
