'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  Search,
  Star,
  ArrowUpDown,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  circulating_supply: number;
}

export default function CryptoPage({
                                     params,
                                   }: {
  params: { lang: Locale };
}) {
  const dict = getDictionary(params.lang);
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [filteredData, setFilteredData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'market_cap' | 'price' | 'change' | 'name'>('market_cap');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const itemsPerPage = 20;

  // Fetch crypto data
  const fetchCryptoData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch crypto data');
      }

      const data = await response.json();
      setCryptoData(data);
      setFilteredData(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Не вдалося завантажити дані. Спробуйте пізніше.');
      console.error('Error fetching crypto data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    // Refresh every 60 seconds
    const interval = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Search filter
  useEffect(() => {
    let filtered = cryptoData.filter(
        (crypto) =>
            crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort
    filtered.sort((a, b) => {
      let compareA: number | string;
      let compareB: number | string;

      switch (sortBy) {
        case 'name':
          compareA = a.name.toLowerCase();
          compareB = b.name.toLowerCase();
          break;
        case 'price':
          compareA = a.current_price;
          compareB = b.current_price;
          break;
        case 'change':
          compareA = a.price_change_percentage_24h;
          compareB = b.price_change_percentage_24h;
          break;
        case 'market_cap':
        default:
          compareA = a.market_cap;
          compareB = b.market_cap;
          break;
      }

      if (compareA < compareB) return sortOrder === 'asc' ? -1 : 1;
      if (compareA > compareB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [searchQuery, sortBy, sortOrder, cryptoData]);

  // Toggle favorite
  const toggleFavorite = (cryptoId: string) => {
    setFavorites((prev) =>
        prev.includes(cryptoId)
            ? prev.filter((id) => id !== cryptoId)
            : [...prev, cryptoId]
    );
  };

  // Toggle sort
  const toggleSort = (column: 'market_cap' | 'price' | 'change' | 'name') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  // Format number
  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  // Format price
  const formatPrice = (price: number) => {
    if (price >= 1) return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    return `$${price.toFixed(6)}`;
  };

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-2 sm:px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href={`/${params.lang}`} className="hover:text-primary">
                {dict.common.home}
              </Link>
              <span>/</span>
              <span className="text-gray-900">{dict.common.crypto}</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2">
          <div className="container mx-auto px-2 sm:px-4">
            <h1 className="text-2xl md:text-4xl font-bold font-heading mb-2 md:mb-4">
              {dict.crypto.onlineRatesTitle}
            </h1>
            <p className="text-base md:text-xl text-white/90 mb-2 md:mb-4">
              {dict.crypto.onlineRatesSubtitle}
            </p>
            <div className="flex items-center gap-2 text-white/80 text-xs md:text-sm">
              <RefreshCw className="w-4 h-4" />
              <span>
              {dict.crypto.lastUpdate}:{' '}
                {lastUpdate.toLocaleTimeString(params.lang === 'uk' ? 'uk-UA' : 'ru-RU', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
            </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-2 sm:px-4 py-8">
          {/* Controls */}
          <div className="card p-4 md:p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder={dict.crypto.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
                />
              </div>
              {/* Refresh Button */}
              <button
                  onClick={fetchCryptoData}
                  disabled={loading}
                  className="btn-primary inline-flex items-center gap-2 whitespace-nowrap text-sm md:text-base"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                {dict.crypto.refresh}
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && (
              <div className="card p-4 md:p-6 mb-6 bg-red-50 border-red-200">
                <p className="text-red-700">{error}</p>
              </div>
          )}

          {/* Loading State */}
          {loading && !error && (
              <div className="card p-8 md:p-12 text-center">
                <RefreshCw className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                <p className="text-gray-600">{dict.crypto.loadingData}</p>
              </div>
          )}

          {/* Crypto Table */}
          {!loading && !error && (
              <>
                <div className="card overflow-x-auto rounded-lg">
                  <table className="min-w-full text-xs md:text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-2 py-2 md:px-6 md:py-4 text-left">#</th>
                      <th className="px-2 py-2 md:px-6 md:py-4 text-left">
                        <button
                            onClick={() => toggleSort('name')}
                            className="flex items-center gap-1 text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-primary"
                        >
                          {dict.crypto.cryptocurrency}
                          {sortBy === 'name' && <ArrowUpDown className="w-4 h-4" />}
                        </button>
                      </th>
                      <th className="px-2 py-2 md:px-6 md:py-4 text-right">
                        <button
                            onClick={() => toggleSort('price')}
                            className="flex items-center gap-1 ml-auto text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-primary"
                        >
                          {dict.crypto.price}
                          {sortBy === 'price' && <ArrowUpDown className="w-4 h-4" />}
                        </button>
                      </th>
                      <th className="hidden md:table-cell px-2 md:px-6 py-2 md:py-4 text-right">
                        <button
                            onClick={() => toggleSort('change')}
                            className="flex items-center gap-1 ml-auto text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-primary"
                        >
                          {dict.crypto.change24h}
                          {sortBy === 'change' && <ArrowUpDown className="w-4 h-4" />}
                        </button>
                      </th>
                      <th className="hidden md:table-cell px-2 md:px-6 py-2 md:py-4 text-right">
                        <button
                            onClick={() => toggleSort('market_cap')}
                            className="flex items-center gap-1 ml-auto text-xs font-semibold text-gray-600 uppercase tracking-wider hover:text-primary"
                        >
                          {dict.crypto.marketCap}
                          {sortBy === 'market_cap' && <ArrowUpDown className="w-4 h-4" />}
                        </button>
                      </th>
                      <th className="px-2 py-2 md:px-6 md:py-4 text-center">
                      <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {dict.crypto.actions}
                      </span>
                      </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {currentData.map((crypto, index) => (
                        <tr
                            key={crypto.id}
                            className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-2 py-2 md:px-6 md:py-4 text-sm text-gray-500">
                            {startIndex + index + 1}
                          </td>
                          <td className="px-2 py-2 md:px-6 md:py-4">
                            <div className="flex items-center gap-2 md:gap-3">
                              <button
                                  onClick={() => toggleFavorite(crypto.id)}
                                  className="text-gray-400 hover:text-yellow-500 transition-colors"
                              >
                                <Star
                                    className={`w-4 h-4 md:w-5 md:h-5 ${
                                        favorites.includes(crypto.id)
                                            ? 'fill-yellow-500 text-yellow-500'
                                            : ''
                                    }`}
                                />
                              </button>
                              <img
                                  src={crypto.image}
                                  alt={crypto.name}
                                  className="w-6 h-6 md:w-8 md:h-8"
                              />
                              <div>
                                <div className="font-semibold">{crypto.name}</div>
                                <div className="text-xs md:text-sm text-gray-500 uppercase">
                                  {crypto.symbol}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-2 py-2 md:px-6 md:py-4 text-right font-semibold">
                            {formatPrice(crypto.current_price)}
                          </td>
                          <td className="hidden md:table-cell px-2 md:px-6 py-2 md:py-4 text-right">
                            <div
                                className={`inline-flex items-center gap-1 font-semibold ${
                                    crypto.price_change_percentage_24h >= 0
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                }`}
                            >
                              {crypto.price_change_percentage_24h >= 0 ? (
                                  <TrendingUp className="w-4 h-4" />
                              ) : (
                                  <TrendingDown className="w-4 h-4" />
                              )}
                              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                            </div>
                          </td>
                          <td className="hidden md:table-cell px-2 md:px-6 py-2 md:py-4 text-right text-gray-700">
                            {formatNumber(crypto.market_cap)}
                          </td>
                          <td className="px-2 py-2 md:px-6 md:py-4 text-center">
                            <button className="btn-primary text-xs md:text-sm px-3 py-2">
                              {dict.crypto.buy}
                            </button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-1 md:gap-2 mt-4 md:mt-6">
                      <button
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="flex gap-1 md:gap-2">
                        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                              <button
                                  key={i}
                                  onClick={() => setCurrentPage(pageNum)}
                                  className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-semibold transition-colors ${
                                      currentPage === pageNum
                                          ? 'bg-primary text-white'
                                          : 'bg-white text-gray-700 hover:bg-gray-100'
                                  }`}
                              >
                                {pageNum}
                              </button>
                          );
                        })}
                      </div>
                      <button
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                )}

                {/* Results Info */}
                <div className="text-center mt-2 md:mt-4 text-xs md:text-sm text-gray-600">
                  {dict.crypto.showing}{startIndex + 1}-{Math.min(endIndex, filteredData.length)}{dict.crypto.of}{' '}
                  {filteredData.length}{dict.crypto.cryptocurrencies}
                </div>
              </>
          )}

          {/* Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
            <div className="card p-4 md:p-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-900">
                {dict.crypto.whatIsCrypto}
              </h3>
              <p className="text-xs md:text-sm text-blue-800">
                {dict.crypto.whatIsCryptoText}
              </p>
            </div>
            <div className="card p-4 md:p-6 bg-green-50 border-green-200">
              <h3 className="font-semibold mb-2 text-green-900">
                {dict.crypto.howToBuy}
              </h3>
              <p className="text-xs md:text-sm text-green-800">
                {dict.crypto.howToBuyText}
              </p>
            </div>
            <div className="card p-4 md:p-6 bg-purple-50 border-purple-200">
              <h3 className="font-semibold mb-2 text-purple-900">
                {dict.crypto.investmentRisks}
              </h3>
              <p className="text-xs md:text-sm text-purple-800">
                {dict.crypto.investmentRisksText}
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}