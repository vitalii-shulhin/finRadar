// Ukrainian Hryvnia Exchange Rates
// Using Bank of Ukraine API (free, no API key required)

import axios from 'axios';

const NBU_API_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange';

export interface UAHRate {
  r030: number; // Currency code
  txt: string; // Currency name
  rate: number; // Exchange rate
  cc: string; // Currency abbreviation (USD, EUR, etc.)
  exchangedate: string; // Date
}

export interface CurrencyPair {
  currency: string;
  name: string;
  buy: number;
  sell: number;
  nbuRate: number;
  change: number;
  changePercent: number;
}

// Get official NBU rates
export async function getNBURates(): Promise<UAHRate[]> {
  try {
    const response = await axios.get(NBU_API_URL, {
      params: {
        json: true,
      },
      timeout: 5000,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching NBU rates:', error);
    return [];
  }
}

// Get specific currency rates
export async function getUAHExchangeRates(): Promise<CurrencyPair[]> {
  try {
    const nbuRates = await getNBURates();
    const currencies = ['USD', 'EUR', 'PLN', 'GBP'];

    const pairs: CurrencyPair[] = currencies.map(cc => {
      const rate = nbuRates.find(r => r.cc === cc);
      if (!rate) {
        return null;
      }

      // Simulate cash exchange rates (typically 2-5% spread from official rate)
      const spread = 0.03; // 3% spread
      const nbuRate = rate.rate;
      const buy = nbuRate * (1 - spread);
      const sell = nbuRate * (1 + spread);

      // Simulate daily change (random for demo, in production would compare with yesterday)
      const change = (Math.random() - 0.5) * 0.5;
      const changePercent = (change / nbuRate) * 100;

      return {
        currency: cc,
        name: rate.txt,
        buy,
        sell,
        nbuRate,
        change,
        changePercent,
      };
    }).filter(Boolean) as CurrencyPair[];

    return pairs;
  } catch (error) {
    console.error('Error getting UAH exchange rates:', error);
    return [];
  }
}

// Format UAH currency
export function formatUAH(value: number): string {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
