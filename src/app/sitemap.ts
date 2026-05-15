import { MetadataRoute } from 'next';
import { getNewsDataNews } from '@/lib/api';
import { createSlug } from '@/lib/utils';
import { i18n } from '@/i18n/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.com.ua';

  // Define static routes (without language prefix)
  const routes = [
    '',
    '/calc/credit', '/calc/credit/auto', '/calc/credit/consumer', '/calc/credit/mortgage',
    '/calc/deposit',
    '/cards',
    '/cards/kreditni-kartky',
    '/cards/kreditni-kartky/bez-vidmovy',
    '/cards/kreditni-kartky/reytyng',
    '/cards/kreditnye-karty',
    '/cards/kreditnye-karty/bez-otkaza',
    '/cards/kreditnye-karty/reytyng',
    '/credits',
    '/credits/all',
    '/credits/cash',
    '/credits/credit-24-7',
    '/credits/credit-bez-vidmovy',
    '/credits/credit-line',
    '/credits/credit-na-kartu',
    '/credits/groshi-terminovo',
    '/credits/mfo',
    '/credits/mfo/reytyng',
    '/credits/mfo/spysok',
    '/credits/microcredits',
    '/credits/novi-mfo',
    '/credits/online',
    '/credits/pozyka-online',
    '/credits/refinancing',
    '/credits/secured',
    '/credits/z-poganoyu-istoriyeyu',
    '/crypto',
    '/insurance',
    '/insurance/car-insurance',
    '/insurance/greencard',
    '/insurance/kasko',
    '/insurance/osago',
    '/insurance/osago/in-dnipro',
    '/insurance/osago/in-kharkiv',
    '/insurance/osago/in-kyiv',
    '/insurance/osago/in-lviv',
    '/insurance/osago/in-odesa',
    '/insurance/osago/in-zaporizhzhia',
    '/insurance/osago/motorcycle',
    '/news',
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
