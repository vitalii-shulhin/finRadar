import { getNewsDataNews } from '@/lib/api';
import { Calendar, Newspaper } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { createSlug } from '@/lib/utils';
import NewsImage from '@/components/NewsImage';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.lang);

  return {
    title: dict.meta.news.title,
    description: dict.meta.news.description,
    alternates: {
      languages: {
        'uk': `/uk/news`,
        'ru': `/ru/news`,
      },
    },
  };
}

export default async function NewsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = getDictionary(params.lang);
  const news = await getNewsDataNews(50);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'd MMMM yyyy, HH:mm');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-black text-gray-900">
              {dict.news.title}
            </h1>
          </div>
          <p className="text-lg text-gray-600 font-medium">
            {dict.news.subtitle}
          </p>
        </div>

        {/* News Grid */}
        {news.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-2xl shadow-lg">
            <p className="text-lg">{dict.news.noNews}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <Link
                key={index}
                href={`/${params.lang}/news/${createSlug(article.title)}?title=${encodeURIComponent(article.title)}`}
                className="card overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                {article.image && (
                  <div className="relative h-56 overflow-hidden">
                    <NewsImage
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Category badge */}
                    {article.symbol && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900">
                          {article.symbol}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Meta info */}
                  <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.publishedDate)}
                    </span>
                    {article.site && (
                      <span className="font-semibold text-primary">
                        {article.site}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg mb-3 line-clamp-3 group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {article.text}
                  </p>
                </div>

                {/* Read more indicator */}
                <div className="px-6 pb-6">
                  <div className="inline-flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                    <span>{dict.common.readMore}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Back to home link */}
        <div className="mt-12 text-center">
          <Link
            href={`/${params.lang}`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors font-semibold"
          >
            ← {dict.common.backToHome}
          </Link>
        </div>
      </div>
    </div>
  );
}
