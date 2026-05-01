'use client';

import { useState, useEffect } from 'react';
import { formatPercentage } from '@/lib/api';
import { TrendingUp, TrendingDown, BarChart3, Bitcoin } from 'lucide-react';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface StockQuote {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
}

interface CryptoQuote {
  symbol: string;
  name: string;
  price: number;
  changesPercentage: number;
}

interface MarketOverviewProps {
  lang: Locale;
}

export default function MarketOverview({ lang }: MarketOverviewProps) {
  const dict = getDictionary(lang);
  const [indices, setIndices] = useState<StockQuote[]>([]);
  const [crypto, setCrypto] = useState<CryptoQuote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMarketData() {
      try {
        setLoading(true);
        const response = await fetch('/api/market');
        const data = await response.json();
        setIndices(data.indices || []);
        setCrypto(data.crypto || []);
      } catch (error) {
        console.error('Error fetching market data:', error);
        setIndices([]);
        setCrypto([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMarketData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stock Market Indices */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold font-heading">{dict.home.marketOverview.stockIndices}</h3>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-16 bg-gray-200 rounded-lg"></div>
              <div className="h-16 bg-gray-200 rounded-lg"></div>
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          ) : indices.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              {dict.home.marketOverview.dataUnavailable}
            </p>
          ) : (
            indices.map((index) => (
              <div
                key={index.symbol}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <div className="font-semibold text-sm">
                    {index.symbol.replace('^', '')}
                  </div>
                  <div className="text-xs text-gray-500">{index.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    {index.price?.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div
                    className={`text-xs font-medium flex items-center gap-1 justify-end ${
                      index.changesPercentage >= 0
                        ? 'text-finance-green'
                        : 'text-finance-red'
                    }`}
                  >
                    {index.changesPercentage >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {formatPercentage(index.changesPercentage)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Cryptocurrency */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bitcoin className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold font-heading">{dict.home.marketOverview.cryptocurrency}</h3>
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-16 bg-gray-200 rounded-lg"></div>
              <div className="h-16 bg-gray-200 rounded-lg"></div>
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          ) : crypto.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              {dict.home.marketOverview.dataUnavailable}
            </p>
          ) : (
            crypto.map((coin) => (
              <div
                key={coin.symbol}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <div className="font-semibold text-sm">{coin.symbol}</div>
                  <div className="text-xs text-gray-500">{coin.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">
                    ${coin.price?.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div
                    className={`text-xs font-medium flex items-center gap-1 justify-end ${
                      coin.changesPercentage >= 0
                        ? 'text-finance-green'
                        : 'text-finance-red'
                    }`}
                  >
                    {coin.changesPercentage >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {formatPercentage(coin.changesPercentage)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
