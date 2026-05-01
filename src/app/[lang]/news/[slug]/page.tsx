import { Calendar, ExternalLink, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createSlug } from '@/lib/utils';
import NewsImage from '@/components/NewsImage';
import axios from 'axios';
import { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: {
    title?: string;
  };
}

// Fetch article by title search
async function fetchArticleByTitle(title: string) {
  try {
    const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY || process.env.NEXT_PUBLIC_NEWSDATA_API_KEY || '';

    if (!NEWSDATA_API_KEY) {
      return null;
    }

    // Search for the article using the title
    const response = await axios.get('https://newsdata.io/api/1/latest', {
      params: {
        apikey: NEWSDATA_API_KEY,
        q: title, // Search by title
        language: 'uk'
      },
      timeout: 10000
    });

    if (response.data && response.data.results && response.data.results.length > 0) {
      const article = response.data.results[0];
      return {
        symbol: Array.isArray(article.category) && article.category.length > 0
          ? article.category[0]
          : 'business',
        publishedDate: article.pubDate || new Date().toISOString(),
        title: article.title || '',
        image: article.image_url || '',
        site: article.source_name || article.source_id || 'NewsData',
        text: article.description || article.content || '',
        url: article.link || '#',
        fullContent: article.content || article.description || ''
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Generate dynamic metadata for each news article
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const articleTitle = searchParams.title || '';
  const article = await fetchArticleByTitle(articleTitle);

  if (!article) {
    return {
      title: 'Новина не знайдена',
      description: 'Запитану новину не знайдено',
    };
  }

  const description = article.text ? article.text.slice(0, 160) : 'Актуальні фінансові новини України';

  return {
    title: article.title,
    description,
    keywords: [article.symbol, 'новини', 'фінанси', 'Україна', 'бізнес'],
    authors: [{ name: article.site || 'FinRadar' }],
    openGraph: {
      title: article.title,
      description,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: [article.site || 'FinRadar'],
      images: article.image ? [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description,
      images: article.image ? [article.image] : [],
    },
  };
}

export default async function NewsDetailPage({ params, searchParams }: PageProps) {
  const { slug } = params;
  const articleTitle = searchParams.title || '';

  // Fetch the specific article using title search
  const article = await fetchArticleByTitle(articleTitle);

  if (!article) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'd MMMM yyyy, HH:mm');
    } catch {
      return dateString;
    }
  };

  // Fetch related articles
  const relatedArticlesResponse = await axios.get('https://newsdata.io/api/1/latest', {
    params: {
      apikey: process.env.NEWSDATA_API_KEY || process.env.NEXT_PUBLIC_NEWSDATA_API_KEY || '',
      country: 'ua',
      category: 'business',
      language: 'uk'
    },
    timeout: 10000
  }).catch(() => ({ data: { results: [] } }));

  const relatedArticles = relatedArticlesResponse.data.results
    .filter((item: any) => item.title !== article.title)
    .slice(0, 4)
    .map((item: any) => ({
      title: item.title,
      image: item.image_url,
      text: item.description || item.content || '',
      publishedDate: item.pubDate,
      slug: createSlug(item.title)
    }));

  // Generate NewsArticle schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": article.title,
    "description": article.text,
    "image": article.image ? [article.image] : [],
    "datePublished": article.publishedDate,
    "dateModified": article.publishedDate,
    "author": {
      "@type": "Organization",
      "name": article.site || "FinRadar"
    },
    "publisher": {
      "@type": "Organization",
      "name": "FinRadar",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://finradar.ua"}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://finradar.ua"}/news/${slug}`
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="container-custom max-w-4xl">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Назад до головної</span>
        </Link>

        {/* Article Card */}
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Featured Image */}
          {article.image && (
            <div className="relative w-full h-96 overflow-hidden">
              <NewsImage
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(article.publishedDate)}
              </span>
              {article.site && (
                <span className="font-semibold text-primary">
                  {article.site}
                </span>
              )}
              {article.symbol && (
                <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
                  {article.symbol}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Description/Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                {article.fullContent || article.text}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-8"></div>

            {/* Read full article button */}
            <div className="flex justify-center">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 group"
              >
                <span>Читати повну статтю на джерелі</span>
                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </article>

        {/* Related articles section */}
        {relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Більше новин
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((relatedArticle: any, index: number) => (
                <Link
                  key={index}
                  href={`/news/${relatedArticle.slug}?title=${encodeURIComponent(relatedArticle.title)}`}
                  className="card hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                >
                  {relatedArticle.image && (
                    <div className="relative h-48 overflow-hidden">
                      <NewsImage
                        src={relatedArticle.image}
                        alt={relatedArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedArticle.text}
                    </p>
                    <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {formatDate(relatedArticle.publishedDate)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
