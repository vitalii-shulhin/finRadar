'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Bitcoin } from 'lucide-react';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

interface MarketOverviewProps {
  lang: Locale;
}

export default function MarketOverview({ lang }: MarketOverviewProps) {
  const dict = getDictionary(lang);
  const [crypto, setCrypto] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);

  const TOP_CRYPTO_IDS = ['bitcoin', 'ethereum', 'tether', 'solana'];

  useEffect(() => {
    async function fetchCryptoData() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${TOP_CRYPTO_IDS.join(',')}&order=market_cap_desc&sparkline=false`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch crypto data');
        }

        const data = await response.json();
        setCrypto(data);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        setCrypto([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCryptoData();
  }, []);

  return (
    <div className="space-y-6">
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
              <div className="h-16 bg-gray-200 rounded-lg"></div>
            </div>
          ) : crypto.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              {dict.home.marketOverview.dataUnavailable}
            </p>
          ) : (
            crypto.map((coin) => (
              <div
                key={coin.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-8 h-8"
                  />
                  <div>
                    <div className="font-semibold text-sm">{coin.name}</div>
                    <div className="text-xs text-gray-500 uppercase">{coin.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">
                    ${coin.current_price?.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div
                    className={`text-xs font-medium flex items-center gap-1 justify-end ${
                      coin.price_change_percentage_24h >= 0
                        ? 'text-finance-green'
                        : 'text-finance-red'
                    }`}
                  >
                    {coin.price_change_percentage_24h >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
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
