// import axios from 'axios';
//
// const FMP_API_KEY = process.env.FMP_API_KEY;
// const FMP_BASE_URL = 'https://financialmodelingprep.com/stable';
//
// // Create axios instance
// const apiClient = axios.create({
//   baseURL: FMP_BASE_URL,
//   timeout: 10000,
// });
//
// export interface ForexRate {
//   ticker: string;
//   bid: number;
//   ask: number;
//   open: number;
//   low: number;
//   high: number;
//   changes: number;
//   date: string;
// }
//
// export interface NewsArticle {
//   symbol: string;
//   publishedDate: string;
//   title: string;
//   image: string;
//   site: string;
//   text: string;
//   url: string;
// }
//
// export interface StockQuote {
//   symbol: string;
//   name: string;
//   price: number;
//   changesPercentage: number;
//   change: number;
//   dayLow: number;
//   dayHigh: number;
//   yearHigh: number;
//   yearLow: number;
//   marketCap: number;
//   volume: number;
//   avgVolume: number;
//   open: number;
//   previousClose: number;
//   timestamp: number;
// }
//
// export interface CryptoQuote {
//   symbol: string;
//   name: string;
//   price: number;
//   changesPercentage: number;
//   change: number;
//   dayLow: number;
//   dayHigh: number;
//   yearHigh: number;
//   yearLow: number;
//   marketCap: number;
//   volume: number;
// }
//
// // Forex rates (including UAH pairs)
// export async function getForexRates(): Promise<ForexRate[]> {
//   try {
//     const pairs = ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'AUDUSD'];
//     const response = await apiClient.get(`/fx`, {
//       params: { apikey: FMP_API_KEY }
//     });
//     return response.data.slice(0, 6);
//   } catch (error) {
//     // console.error('Error fetching forex rates:', error); // todo
//     return [];
//   }
// }
//
// // Get major stock indices
// export async function getMarketIndices(): Promise<StockQuote[]> {
//   try {
//     const symbols = ['^GSPC', '^DJI', '^IXIC']; // S&P 500, Dow Jones, NASDAQ
//     const response = await apiClient.get(`/quote/${symbols.join(',')}`, {
//       params: { apikey: FMP_API_KEY }
//     });
//     return response.data;
//   } catch (error) {
//     // console.error('Error fetching market indices:', error); // todo
//     return [];
//   }
// }
//
// // Get cryptocurrency prices
// export async function getCryptoPrices(): Promise<CryptoQuote[]> {
//   try {
//     const response = await apiClient.get(`/quotes/crypto`, {
//       params: { apikey: FMP_API_KEY }
//     });
//     return response.data.slice(0, 5); // Top 5 cryptocurrencies
//
//   } catch (error) {
//     // console.error('Error fetching crypto prices:', error); // todo
//     return [];
//   }
// }
//
// // Get financial news from FMP /stable API
// export async function getFinanceNews(limit: number = 20): Promise<NewsArticle[]> {
//   try {
//     // Try to fetch from FMP stable API
//     const response = await apiClient.get(`/fmp-articles`, {
//       params: {
//         page: 0,
//         size: limit,
//         apikey: FMP_API_KEY
//       }
//     });
//
//     // If we got data from API, return it
//     if (response.data && response.data.length > 0) {
//       return response.data;
//     }
//
//     // Otherwise, fall back to Ukrainian financial mock news
//     // console.log('FMP API returned no data, using fallback mock news');
//     const mockNews: NewsArticle[] = [
//       {
//         symbol: 'MARKET',
//         publishedDate: new Date().toISOString(),
//         title: 'Фінансові ринки України: огляд тижня',
//         image: '',
//         site: 'FinRadar Analytics',
//         text: 'Комплексний аналіз ситуації на українських фінансових ринках. Огляд курсів валют, індексів та основних подій тижня.',
//         url: '#'
//       },
//       {
//         symbol: 'UAH',
//         publishedDate: new Date(Date.now() - 3600000).toISOString(),
//         title: 'Курс долара: прогноз на найближчий місяць',
//         image: '',
//         site: 'Financial Expert',
//         text: 'Експерти прогнозують стабілізацію курсу долара відносно гривні. Детальний аналіз факторів впливу на валютний ринок.',
//         url: '#'
//       },
//       {
//         symbol: 'BANK',
//         publishedDate: new Date(Date.now() - 7200000).toISOString(),
//         title: 'НБУ оновив вимоги до банківської системи',
//         image: '',
//         site: 'Banking News',
//         text: 'Національний банк України впровадив нові регуляторні вимоги для покращення стабільності та надійності банківської системи.',
//         url: '#'
//       },
//       {
//         symbol: 'CREDIT',
//         publishedDate: new Date(Date.now() - 10800000).toISOString(),
//         title: 'Споживче кредитування: тенденції 2026 року',
//         image: '',
//         site: 'Credit Market',
//         text: 'Аналіз ринку споживчого кредитування в Україні. Середні процентні ставки та найпопулярніші кредитні продукти.',
//         url: '#'
//       },
//       {
//         symbol: 'DEPOSIT',
//         publishedDate: new Date(Date.now() - 14400000).toISOString(),
//         title: 'Депозитні ставки досягли річних максимумів',
//         image: '',
//         site: 'Deposit Review',
//         text: 'Українські банки підвищують ставки по депозитах для залучення коштів населення. Порівняння найвигідніших пропозицій.',
//         url: '#'
//       },
//       {
//         symbol: 'INVEST',
//         publishedDate: new Date(Date.now() - 18000000).toISOString(),
//         title: 'Інвестиційні можливості для приватних інвесторів',
//         image: '',
//         site: 'Investment Guide',
//         text: 'Огляд доступних інвестиційних інструментів на українському ринку. Облігації, фонди та альтернативні варіанти.',
//         url: '#'
//       },
//       {
//         symbol: 'INSURANCE',
//         publishedDate: new Date(Date.now() - 21600000).toISOString(),
//         title: 'Страховий ринок показує зростання',
//         image: '',
//         site: 'Insurance Today',
//         text: 'Український ринок страхування демонструє позитивну динаміку. ОСЦПВ та медичне страхування лідирують за обсягами.',
//         url: '#'
//       },
//       {
//         symbol: 'FINTECH',
//         publishedDate: new Date(Date.now() - 25200000).toISOString(),
//         title: 'Фінтех-стартапи залучають інвестиції',
//         image: '',
//         site: 'Tech Finance',
//         text: 'Українські фінтех-компанії активно розвиваються та отримують міжнародне фінансування для масштабування.',
//         url: '#'
//       },
//       {
//         symbol: 'CARDS',
//         publishedDate: new Date(Date.now() - 28800000).toISOString(),
//         title: 'Безконтактні платежі: нові рекорди використання',
//         image: '',
//         site: 'Payment Systems',
//         text: 'Кількість безконтактних транзакцій в Україні зросла на 45% порівняно з минулим роком. Аналіз тенденцій.',
//         url: '#'
//       },
//       {
//         symbol: 'CRYPTO',
//         publishedDate: new Date(Date.now() - 32400000).toISOString(),
//         title: 'Регулювання криптовалют: що зміниться',
//         image: '',
//         site: 'Crypto Law',
//         text: 'Нові законодавчі ініціативи щодо регулювання криптовалютного ринку в Україні. Перспективи та виклики.',
//         url: '#'
//       },
//       {
//         symbol: 'MORTGAGE',
//         publishedDate: new Date(Date.now() - 36000000).toISOString(),
//         title: 'Іпотечне кредитування відновлюється',
//         image: '',
//         site: 'Mortgage News',
//         text: 'Банки повертаються до іпотечного кредитування з новими програмами та пільговими умовами для молодих сімей.',
//         url: '#'
//       },
//       {
//         symbol: 'BUSINESS',
//         publishedDate: new Date(Date.now() - 39600000).toISOString(),
//         title: 'Кредити для бізнесу: доступні програми підтримки',
//         image: '',
//         site: 'Business Finance',
//         text: 'Огляд державних та банківських програм підтримки малого та середнього бізнесу через доступне кредитування.',
//         url: '#'
//       },
//       {
//         symbol: 'TAX',
//         publishedDate: new Date(Date.now() - 43200000).toISOString(),
//         title: 'Податкові зміни для фізичних осіб у 2026',
//         image: '',
//         site: 'Tax Advisor',
//         text: 'Нові податкові правила для громадян України. Що потрібно знати про декларування доходів та пільги.',
//         url: '#'
//       },
//       {
//         symbol: 'PENSION',
//         publishedDate: new Date(Date.now() - 46800000).toISOString(),
//         title: 'Пенсійна реформа: нові можливості накопичення',
//         image: '',
//         site: 'Pension Fund',
//         text: 'Впровадження другого рівня пенсійної системи відкриває нові можливості для формування додаткової пенсії.',
//         url: '#'
//       },
//       {
//         symbol: 'ECOM',
//         publishedDate: new Date(Date.now() - 50400000).toISOString(),
//         title: 'E-commerce та онлайн-платежі: рекордне зростання',
//         image: '',
//         site: 'Digital Commerce',
//         text: 'Українці активно переходять на онлайн-покупки. Безпека платежів та захист споживачів у фокусі уваги.',
//         url: '#'
//       }
//     ];
//
//     return mockNews.slice(0, limit);
//   } catch (error) {
//     // console.error('Error fetching finance news:', error); //todo
//     return [];
//   }
// }
//
// // Get general news from FMP
// export async function getGeneralNews(limit: number = 20): Promise<NewsArticle[]> {
//   try {
//     const response = await apiClient.get(`/stock_news`, {
//       params: {
//         limit,
//         apikey: FMP_API_KEY
//       }
//     });
//     return response.data;
//   } catch (error) {
//     // console.error('Error fetching general news:', error); // todo
//     return [];
//   }
// }
//
// // Get forex news
// export async function getForexNews(limit: number = 10): Promise<NewsArticle[]> {
//   try {
//     const response = await apiClient.get(`/stock_news`, {
//       params: {
//         limit,
//         tickers: 'FOREX',
//         apikey: FMP_API_KEY
//       }
//     });
//     return response.data;
//   } catch (error) {
//     // console.error('Error fetching forex news:', error); // todo
//     return [];
//   }
// }
//
// // Get Ukrainian news from NewsData.io
// export async function getNewsDataNews(limit: number = 20): Promise<NewsArticle[]> {
//   console.log(22222222);
//   try {
//     const FMP_API_KEY = process.env.FMP_API_KEY;
//     console.log(333);
//     if (!FMP_API_KEY) {
//       console.log('❌ No FMP API key found');
//       return [];
//     }
//
//     console.log('🔄 Fetching stock news from FMP...');
//
//     // Fetch stock news for major tickers (mix of US and international)
//     // const tickers = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'JPM', 'GS', 'BTC'];
//     // const response = await axios.get(`https://financialmodelingprep.com/api/v3/stock_news`, {
//     //https://financialmodelingprep.com/stable/news/stock-latest?page=0&limit=20&apikey=
//     const response = await axios.get(`https://financialmodelingprep.com/stable/news/stock-lates`, {
//       params: {
//         // tickers: tickers.join(','),
//         limit: limit,
//         apikey: FMP_API_KEY
//       },
//       timeout: 10000
//     });
//
//     console.log('11111', response)
//     // console.log(`📡 FMP API response: ${response.data?.length || 0} articles`);
//
//     // Transform to match our NewsArticle interface
//     if (response.data && Array.isArray(response.data)) {
//       const transformedNews = response.data
//         .slice(0, limit)
//         .map((article: any) => ({
//           symbol: article.symbol || 'business',
//           publishedDate: article.publishedDate || new Date().toISOString(),
//           title: article.title || 'No title',
//           image: article.image || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
//           site: article.site || 'Financial News',
//           text: article.text || 'Read more...',
//           url: article.url || '#'
//         }))
//         .filter((article: NewsArticle) => article.title && article.title !== 'No title');
//
//       console.log(`✅ Fetched ${transformedNews.length} stock news articles from FMP`);
//       return transformedNews;
//     }
//
//     console.log('⚠️ FMP returned no articles');
//     return [];
//   } catch (error: any) {
//     console.log({ error })
//     console.error('❌ Error fetching news from FMP:', error.message);
//     if (error.response) {
//       console.error('API Response:', error.response.data);
//     }
//     return [];
//   }
// }
//
// // Get Ukrainian news from NewsAPI (legacy)
// export async function getUkrainianNews(limit: number = 20): Promise<NewsArticle[]> {
//   try {
//     const NEWS_API_KEY = process.env.NEWS_API_KEY || process.env.NEXT_PUBLIC_NEWS_API_KEY || '';
//     console.log('NEWS_API_KEY', NEWS_API_KEY)
//     if (!NEWS_API_KEY) {
//       // console.log('No NewsAPI key found, returning mock Ukrainian news');
//       // return getMockUkrainianNews(limit);
//       return [];
//     }
//
//     // Fetch from NewsAPI - Ukrainian business news
//     const response = await axios.get('https://newsapi.org/v2/top-headlines', {
//       params: {
//         country: 'us',
//         category: 'business',
//         language: 'uk',
//         // pageSize: limit,
//         apiKey: NEWS_API_KEY
//       },
//       timeout: 10000
//     });
//
//     console.log('response', response.data)
//
//
//     // Transform to match our NewsArticle interface
//     if (response.data && response.data.articles && response.data.articles.length > 0) {
//       const transformedNews = response.data.articles.map((article: any) => ({
//         symbol: '',
//         publishedDate: article.publishedAt,
//         title: article.title,
//         image: article.urlToImage || '',
//         site: article.source.name,
//         text: article.description || article.content || '',
//         url: article.url
//       }));
//
//       // console.log(`Fetched ${transformedNews.length} Ukrainian news articles from NewsAPI`);
//       return transformedNews;
//     }
//
//     // If no articles, return mock data
//     // console.log('NewsAPI returned no articles, using mock news');
//     return [];
//   } catch (error) {
//     // console.error('Error fetching Ukrainian news:', error); // todo
//     return [];
//   }
// }
//
// // Helper function to format currency
// export function formatCurrency(value: number, currency: string = 'USD'): string {
//   return new Intl.NumberFormat('uk-UA', {
//     style: 'currency',
//     currency: currency,
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   }).format(value);
// }
//
// // Helper function to format percentage
// export function formatPercentage(value: number): string {
//   const sign = value >= 0 ? '+' : '';
//   return `${sign}${value.toFixed(2)}%`;
// }


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

// Forex rates (including UAH pairs)
// export async function getForexRates(): Promise<ForexRate[]> {
//   try {
//     const pairs = ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'USDCAD', 'AUDUSD'];
//     const response = await apiClient.get(`/fx`, {
//       params: { apikey: FMP_API_KEY }
//     });
//     return response.data.slice(0, 6);
//   } catch (error) {
//     // console.error('Error fetching forex rates:', error); // todo
//     return [];
//   }
// }

// Get major stock indices
// export async function getMarketIndices(): Promise<StockQuote[]> {
//   try {
//     const symbols = ['^GSPC', '^DJI', '^IXIC']; // S&P 500, Dow Jones, NASDAQ
//     const response = await apiClient.get(`/quote/${symbols.join(',')}`, {
//       params: { apikey: FMP_API_KEY }
//     });
//     return response.data;
//   } catch (error) {
//     // console.error('Error fetching market indices:', error); // todo
//     return [];
//   }
// }

// Get cryptocurrency prices
// export async function getCryptoPrices(): Promise<CryptoQuote[]> {
//   try {
//     const response = await apiClient.get(`/quotes/crypto`, {
//       params: { apikey: FMP_API_KEY }
//     });
//     return response.data.slice(0, 5); // Top 5 cryptocurrencies
//
//   } catch (error) {
//     // console.error('Error fetching crypto prices:', error); // todo
//     return [];
//   }
// }

// Get financial news from FMP /stable API
// export async function getFinanceNews(limit: number = 20): Promise<NewsArticle[]> {
//   try {
//     // Try to fetch from FMP stable API
//     const response = await apiClient.get(`/fmp-articles`, {
//       params: {
//         page: 0,
//         size: limit,
//         apikey: FMP_API_KEY
//       }
//     });
//
//     // If we got data from API, return it
//     if (response.data && response.data.length > 0) {
//       return response.data;
//     }
//
//     // Otherwise, fall back to Ukrainian financial mock news
//     // console.log('FMP API returned no data, using fallback mock news');
//     const mockNews: NewsArticle[] = [
//       {
//         symbol: 'MARKET',
//         publishedDate: new Date().toISOString(),
//         title: 'Фінансові ринки України: огляд тижня',
//         image: '',
//         site: 'FinRadar Analytics',
//         text: 'Комплексний аналіз ситуації на українських фінансових ринках. Огляд курсів валют, індексів та основних подій тижня.',
//         url: '#'
//       },
//       {
//         symbol: 'UAH',
//         publishedDate: new Date(Date.now() - 3600000).toISOString(),
//         title: 'Курс долара: прогноз на найближчий місяць',
//         image: '',
//         site: 'Financial Expert',
//         text: 'Експерти прогнозують стабілізацію курсу долара відносно гривні. Детальний аналіз факторів впливу на валютний ринок.',
//         url: '#'
//       },
//       {
//         symbol: 'BANK',
//         publishedDate: new Date(Date.now() - 7200000).toISOString(),
//         title: 'НБУ оновив вимоги до банківської системи',
//         image: '',
//         site: 'Banking News',
//         text: 'Національний банк України впровадив нові регуляторні вимоги для покращення стабільності та надійності банківської системи.',
//         url: '#'
//       },
//       {
//         symbol: 'CREDIT',
//         publishedDate: new Date(Date.now() - 10800000).toISOString(),
//         title: 'Споживче кредитування: тенденції 2026 року',
//         image: '',
//         site: 'Credit Market',
//         text: 'Аналіз ринку споживчого кредитування в Україні. Середні процентні ставки та найпопулярніші кредитні продукти.',
//         url: '#'
//       },
//       {
//         symbol: 'DEPOSIT',
//         publishedDate: new Date(Date.now() - 14400000).toISOString(),
//         title: 'Депозитні ставки досягли річних максимумів',
//         image: '',
//         site: 'Deposit Review',
//         text: 'Українські банки підвищують ставки по депозитах для залучення коштів населення. Порівняння найвигідніших пропозицій.',
//         url: '#'
//       },
//       {
//         symbol: 'INVEST',
//         publishedDate: new Date(Date.now() - 18000000).toISOString(),
//         title: 'Інвестиційні можливості для приватних інвесторів',
//         image: '',
//         site: 'Investment Guide',
//         text: 'Огляд доступних інвестиційних інструментів на українському ринку. Облігації, фонди та альтернативні варіанти.',
//         url: '#'
//       },
//       {
//         symbol: 'INSURANCE',
//         publishedDate: new Date(Date.now() - 21600000).toISOString(),
//         title: 'Страховий ринок показує зростання',
//         image: '',
//         site: 'Insurance Today',
//         text: 'Український ринок страхування демонструє позитивну динаміку. ОСЦПВ та медичне страхування лідирують за обсягами.',
//         url: '#'
//       },
//       {
//         symbol: 'FINTECH',
//         publishedDate: new Date(Date.now() - 25200000).toISOString(),
//         title: 'Фінтех-стартапи залучають інвестиції',
//         image: '',
//         site: 'Tech Finance',
//         text: 'Українські фінтех-компанії активно розвиваються та отримують міжнародне фінансування для масштабування.',
//         url: '#'
//       },
//       {
//         symbol: 'CARDS',
//         publishedDate: new Date(Date.now() - 28800000).toISOString(),
//         title: 'Безконтактні платежі: нові рекорди використання',
//         image: '',
//         site: 'Payment Systems',
//         text: 'Кількість безконтактних транзакцій в Україні зросла на 45% порівняно з минулим роком. Аналіз тенденцій.',
//         url: '#'
//       },
//       {
//         symbol: 'CRYPTO',
//         publishedDate: new Date(Date.now() - 32400000).toISOString(),
//         title: 'Регулювання криптовалют: що зміниться',
//         image: '',
//         site: 'Crypto Law',
//         text: 'Нові законодавчі ініціативи щодо регулювання криптовалютного ринку в Україні. Перспективи та виклики.',
//         url: '#'
//       },
//       {
//         symbol: 'MORTGAGE',
//         publishedDate: new Date(Date.now() - 36000000).toISOString(),
//         title: 'Іпотечне кредитування відновлюється',
//         image: '',
//         site: 'Mortgage News',
//         text: 'Банки повертаються до іпотечного кредитування з новими програмами та пільговими умовами для молодих сімей.',
//         url: '#'
//       },
//       {
//         symbol: 'BUSINESS',
//         publishedDate: new Date(Date.now() - 39600000).toISOString(),
//         title: 'Кредити для бізнесу: доступні програми підтримки',
//         image: '',
//         site: 'Business Finance',
//         text: 'Огляд державних та банківських програм підтримки малого та середнього бізнесу через доступне кредитування.',
//         url: '#'
//       },
//       {
//         symbol: 'TAX',
//         publishedDate: new Date(Date.now() - 43200000).toISOString(),
//         title: 'Податкові зміни для фізичних осіб у 2026',
//         image: '',
//         site: 'Tax Advisor',
//         text: 'Нові податкові правила для громадян України. Що потрібно знати про декларування доходів та пільги.',
//         url: '#'
//       },
//       {
//         symbol: 'PENSION',
//         publishedDate: new Date(Date.now() - 46800000).toISOString(),
//         title: 'Пенсійна реформа: нові можливості накопичення',
//         image: '',
//         site: 'Pension Fund',
//         text: 'Впровадження другого рівня пенсійної системи відкриває нові можливості для формування додаткової пенсії.',
//         url: '#'
//       },
//       {
//         symbol: 'ECOM',
//         publishedDate: new Date(Date.now() - 50400000).toISOString(),
//         title: 'E-commerce та онлайн-платежі: рекордне зростання',
//         image: '',
//         site: 'Digital Commerce',
//         text: 'Українці активно переходять на онлайн-покупки. Безпека платежів та захист споживачів у фокусі уваги.',
//         url: '#'
//       }
//     ];
//
//     return mockNews.slice(0, limit);
//   } catch (error) {
//     // console.error('Error fetching finance news:', error); //todo
//     return [];
//   }
// }
//
// // Get general news from FMP
// export async function getGeneralNews(limit: number = 20): Promise<NewsArticle[]> {
//   try {
//     const response = await apiClient.get(`/stock_news`, {
//       params: {
//         limit,
//         apikey: FMP_API_KEY
//       }
//     });
//     return response.data;
//   } catch (error) {
//     // console.error('Error fetching general news:', error); // todo
//     return [];
//   }
// }
//
// // Get forex news
// export async function getForexNews(limit: number = 10): Promise<NewsArticle[]> {
//   try {
//     const response = await apiClient.get(`/stock_news`, {
//       params: {
//         limit,
//         tickers: 'FOREX',
//         apikey: FMP_API_KEY
//       }
//     });
//     return response.data;
//   } catch (error) {
//     // console.error('Error fetching forex news:', error); // todo
//     return [];
//   }
// }

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
