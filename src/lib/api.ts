import axios from 'axios';

// const FMP_API_KEY = process.env.FMP_API_KEY || process.env.NEXT_PUBLIC_FMP_API_KEY || '';
const FMP_BASE_URL = 'https://financialmodelingprep.com/stable';

// Create axios instance
const apiClient = axios.create({
  baseURL: FMP_BASE_URL,
  timeout: 10000,
});

export interface ForexRate {
  ticker: string;
  bid: number;
  ask: number;
  open: number;
  low: number;
  high: number;
  changes: number;
  date: string;
}

export interface NewsArticle {
  symbol: string;
  publishedDate: string;
  title: string;
  image: string;
  site: string;
  text: string;
  url: string;
}

export interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  volume: number;
  avgVolume: number;
  open: number;
  previousClose: number;
  timestamp: number;
}

export interface CryptoQuote {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  volume: number;
}

// Get Ukrainian news from NewsData.io
export async function getNewsDataNews(limit: number = 20): Promise<NewsArticle[]> {
  try {
    const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY || process.env.NEXT_PUBLIC_NEWSDATA_API_KEY || '';

    if (!NEWSDATA_API_KEY) {
      console.log('No NewsData.io API key found');
      return [];
      // return getMockUkrainianNews(limit);
    }

    // Fetch from NewsData.io - Latest news with Ukrainian language filter
    const response = await axios.get('https://newsdata.io/api/1/latest', {
      params: {
        apikey: NEWSDATA_API_KEY,
        country: 'ua',
        category: 'business',
        language: 'uk' // Only Ukrainian language articles
      },
      timeout: 10000
    });

    // Check for API error response
    if (response.data && response.data.status === 'error') {
      console.error('❌ NewsData.io API error:', response.data.results);
      return [];
      // return getMockUkrainianNews(limit);
    }

    // Transform to match our NewsArticle interface
    if (response.data && response.data.results && Array.isArray(response.data.results)) {
      const transformedNews = response.data.results
          .filter((article: any) => article.source_id !== 'finance_ua')
          .slice(0, limit) // Limit results
          .map((article: any) => ({
            symbol: Array.isArray(article.category) && article.category.length > 0
                ? article.category[0]
                : 'business',
            publishedDate: article.pubDate || new Date().toISOString(),
            title: article.title || 'No title',
            image: article.image_url || '',
            site: article.source_name || article.source_id || 'NewsData',
            text: article.description || article.content || 'No description available',
            url: article.link || '#'
          }))
          .filter((article: NewsArticle) => article.title && article.title !== 'No title'); // Filter out invalid articles

      console.log(`✅ Fetched ${transformedNews.length} Ukrainian language news articles from NewsData.io`);
      return transformedNews.length > 0 ? transformedNews : [];
    }

    console.log('⚠️ NewsData.io returned no articles, using mock data');
    // return getMockUkrainianNews(limit);
    return [];
  } catch (error) {
    console.error('❌ Error fetching news from NewsData.io:', error);
    return [];
  }
}

// Get Ukrainian news from NewsAPI (legacy)
export async function getUkrainianNews(limit: number = 20): Promise<NewsArticle[]> {
  try {
    const NEWS_API_KEY = process.env.NEWS_API_KEY || process.env.NEXT_PUBLIC_NEWS_API_KEY || '';
    console.log('NEWS_API_KEY', NEWS_API_KEY)
    if (!NEWS_API_KEY) {
      // console.log('No NewsAPI key found, returning mock Ukrainian news');
      // return getMockUkrainianNews(limit);
      return [];
    }

    // Fetch from NewsAPI - Ukrainian business news
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category: 'business',
        language: 'uk',
        // pageSize: limit,
        apiKey: NEWS_API_KEY
      },
      timeout: 10000
    });

    console.log('response', response.data)


    // Transform to match our NewsArticle interface
    if (response.data && response.data.articles && response.data.articles.length > 0) {
      const transformedNews = response.data.articles.map((article: any) => ({
        symbol: '',
        publishedDate: article.publishedAt,
        title: article.title,
        image: article.urlToImage || '',
        site: article.source.name,
        text: article.description || article.content || '',
        url: article.url
      }));

      // console.log(`Fetched ${transformedNews.length} Ukrainian news articles from NewsAPI`);
      return transformedNews;
    }

    // If no articles, return mock data
    // console.log('NewsAPI returned no articles, using mock news');
    return [];
  } catch (error) {
    // console.error('Error fetching Ukrainian news:', error); // todo
    return [];
  }
}

// Helper function to format currency
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Helper function to format percentage
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}
