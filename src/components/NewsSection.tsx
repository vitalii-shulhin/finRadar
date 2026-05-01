'use client';

import { useState, useEffect } from 'react';
import { Calendar, Newspaper } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { createSlug } from '@/lib/utils';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface NewsArticle {
  symbol: string;
  publishedDate: string;
  title: string;
  image: string;
  site: string;
  text: string;
  url: string;
}

interface NewsSectionProps {
  lang: Locale;
}

export default function NewsSection({ lang }: NewsSectionProps) {
  const dict = getDictionary(lang);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews([]);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'd MMM yyyy, HH:mm');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="card p-6" id="news">
      <div className="flex items-center gap-2 mb-6">
        <Newspaper className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold font-heading">{dict.news.newsFeed}</h2>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12 text-gray-500">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>{dict.news.newsUnavailable}</p>
          </div>
        ) : (
          news.map((article, index) => (
            <article
              key={index}
              className="border-b border-gray-200 last:border-0 pb-6 last:pb-0 hover:bg-gray-50 -mx-6 px-6 py-4 rounded-lg transition-colors group"
            >
              <Link
                href={`/${lang}/news/${createSlug(article.title)}?title=${encodeURIComponent(article.title)}`}
                className="flex flex-col md:flex-row gap-4"
              >
                {article.image && (
                  <div className="md:w-48 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {article.text}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(article.publishedDate)}
                    </span>
                    {article.site && (
                      <span className="font-medium text-primary">{article.site}</span>
                    )}
                    {article.symbol && (
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {article.symbol}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))
        )}
      </div>

      {news.length > 0 && (
        <div className="mt-6 text-center">
          <Link href={`/${lang}/news`} className="btn-secondary inline-block">
            {dict.home.viewAllNews}
          </Link>
        </div>
      )}
    </div>
  );
}
