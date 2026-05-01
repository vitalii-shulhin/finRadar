'use client';

import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface CurrencyRate {
  currency: string;
  name: string;
  buy: number;
  sell: number;
  nbuRate: number;
  changePercent: number;
}

interface CurrencyRatesProps {
  lang: Locale;
}

export default function CurrencyRates({ lang }: CurrencyRatesProps) {
  const dict = getDictionary(lang);
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        setLoading(true);
        const response = await fetch('/api/currency');
        const data = await response.json();
        setRates(data);
      } catch (error) {
        console.error('Error fetching currency rates:', error);
        setRates([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRates();
  }, []);

  const getCurrencyFlag = (currency: string) => {
    const flags: { [key: string]: string } = {
      USD: '🇺🇸',
      EUR: '🇪🇺',
      GBP: '🇬🇧',
      PLN: '🇵🇱',
    };
    return flags[currency] || '💱';
  };

  return (
    <div className="card p-6" id="currency">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold font-heading flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-primary" />
          {dict.home.currencyRates.title}
        </h2>
        <span className="text-sm text-gray-500">
          {dict.home.currencyRates.subtitle}
        </span>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="animate-pulse space-y-4 py-4">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-600">{dict.home.currencyRates.currency}</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-600">{dict.home.currencyRates.buy}</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-600">{dict.home.currencyRates.sell}</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-600">{dict.home.currencyRates.nbu}</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-600">{dict.home.currencyRates.change}</th>
              </tr>
            </thead>
            <tbody>
              {rates.map((rate) => (
                <tr
                  key={rate.currency}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getCurrencyFlag(rate.currency)}</span>
                      <div>
                        <div className="font-semibold">{rate.currency}</div>
                        <div className="text-xs text-gray-500">{rate.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4 font-medium">
                    {rate.buy.toFixed(2)} ₴
                  </td>
                  <td className="text-right py-4 px-4 font-medium">
                    {rate.sell.toFixed(2)} ₴
                  </td>
                  <td className="text-right py-4 px-4 font-medium">
                    {rate.nbuRate.toFixed(2)} ₴
                  </td>
                  <td className="text-right py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        rate.changePercent >= 0 ? 'text-finance-green' : 'text-finance-red'
                      }`}
                    >
                      {rate.changePercent >= 0 ? (
                        <ArrowUp className="w-4 h-4" />
                      ) : (
                        <ArrowDown className="w-4 h-4" />
                      )}
                      {Math.abs(rate.changePercent).toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500 text-center">
        {dict.home.currencyRates.updateNote}
      </div>
    </div>
  );
}
