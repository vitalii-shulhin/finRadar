'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Wallet,
  Filter,
  Star,
  TrendingUp,
  Calendar,
  Percent,
  CheckCircle,
  Clock,
  Shield,
  DollarSign,
  Smartphone,
  FileText,
  AlertTriangle,
  RefreshCw,
  TrendingDown,
  ChevronDown,
  Info
} from 'lucide-react';
import { LOAN_PRODUCTS, type LoanProduct } from '@/data/loanProducts';
import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';

type SortOption = 'recommended' | 'rate' | 'amount' | 'approval' | 'time';

interface BadCreditHistoryPageClientProps {
  lang: Locale;
}

export default function BadCreditHistoryPageClient({ lang }: BadCreditHistoryPageClientProps) {
  const dict = getDictionary(lang);
  const [loanAmount, setLoanAmount] = useState(3000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [selectedLenders, setSelectedLenders] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [minRate, setMinRate] = useState(0);
  const [maxRate, setMaxRate] = useState(2);
  const [showCalculator, setShowCalculator] = useState(false);

  const lenders = Array.from(new Set(LOAN_PRODUCTS.map(loan => loan.lender)));

  const filteredLoans = useMemo(() => {
    let results = LOAN_PRODUCTS;
    results = results.filter(loan => loanAmount >= loan.minAmount && loanAmount <= loan.maxAmount);
    results = results.filter(loan => loanTerm >= loan.minTerm && loanTerm <= loan.maxTerm);
    if (selectedLenders.length > 0) {
      results = results.filter(loan => selectedLenders.includes(loan.lender));
    }
    results = results.filter(loan => loan.interestRateValue >= minRate && loan.interestRateValue <= maxRate);
    return results;
  }, [loanAmount, loanTerm, selectedLenders, minRate, maxRate]);

  const availableLenderCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    lenders.forEach(lender => {
      const count = LOAN_PRODUCTS.filter(loan =>
        loanAmount >= loan.minAmount &&
        loanAmount <= loan.maxAmount &&
        loanTerm >= loan.minTerm &&
        loanTerm <= loan.maxTerm &&
        loan.interestRateValue >= minRate &&
        loan.interestRateValue <= maxRate &&
        loan.lender === lender
      ).length;
      counts[lender] = count;
    });
    return counts;
  }, [loanAmount, loanTerm, minRate, maxRate, lenders]);

  const sortedLoans = useMemo(() => {
    return [...filteredLoans].sort((a, b) => {
      if (sortBy === 'recommended') {
        if (a.recommended && !b.recommended) return -1;
        if (!a.recommended && b.recommended) return 1;
        return b.rating - a.rating;
      }
      if (sortBy === 'rate') return a.interestRateValue - b.interestRateValue;
      if (sortBy === 'amount') return b.maxAmount - a.maxAmount;
      if (sortBy === 'approval') return b.approvalRate - a.approvalRate;
      if (sortBy === 'time') {
        const aTime = parseInt(a.approvalTime);
        const bTime = parseInt(b.approvalTime);
        return aTime - bTime;
      }
      return 0;
    });
  }, [filteredLoans, sortBy]);

  const toggleLender = (lender: string) => {
    setSelectedLenders(prev =>
      prev.includes(lender)
        ? prev.filter(l => l !== lender)
        : [...prev, lender]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Shield className="w-4 h-4" />
            {lang === 'uk' ? 'Схвалення навіть з простроченнями' : 'Одобрение даже с просрочками'}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
            {lang === 'uk' ? 'Кредит з поганою кредитною історією' : 'Кредит с плохой кредитной историей'}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'uk'
              ? 'Отримайте кредит онлайн з поганою історією без відмов! Працюємо з клієнтами з простроченнями 24/7'
              : 'Получите кредит онлайн с плохой историей без отказов! Работаем с клиентами с просрочками 24/7'
            }
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">92%</div>
            <div className="text-sm text-gray-600">
              {lang === 'uk' ? 'Рівень схвалення' : 'Уровень одобрения'}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">5 хв</div>
            <div className="text-sm text-gray-600">
              {lang === 'uk' ? 'Швидке рішення' : 'Быстрое решение'}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">
              {lang === 'uk' ? 'Доступність' : 'Доступность'}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">40+</div>
            <div className="text-sm text-gray-600">
              {lang === 'uk' ? 'МФО' : 'МФО'}
            </div>
          </div>
        </div>

        {/* Calculator and Filters - Accordion */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="w-full flex items-center justify-between mb-6 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <Wallet className="w-8 h-8 text-indigo-600" />
              <h2 className="text-2xl font-bold font-heading">
                {lang === 'uk' ? 'Розрахуйте свій кредит' : 'Рассчитайте свой кредит'}
              </h2>
            </div>
            <ChevronDown className={`w-6 h-6 text-indigo-600 transition-transform duration-300 ${showCalculator ? 'rotate-180' : ''}`} />
          </button>

          {showCalculator && (
            <>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Amount Slider */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang === 'uk' ? 'Сума кредиту' : 'Сумма кредита'}
              </label>
              <div className="mb-2">
                <span className="text-3xl font-bold text-amber-600">
                  {loanAmount.toLocaleString()} ₴
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>100 ₴</span>
                <span>5,000 ₴</span>
              </div>
            </div>

            {/* Term Slider */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {lang === 'uk' ? 'Термін кредиту' : 'Срок кредита'}
              </label>
              <div className="mb-2">
                <span className="text-3xl font-bold text-amber-600">
                  {loanTerm} {lang === 'uk' ? 'днів' : 'дней'}
                </span>
              </div>
              <input
                type="range"
                min="7"
                max="365"
                step="1"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>7 {lang === 'uk' ? 'днів' : 'дней'}</span>
                <span>365 {lang === 'uk' ? 'днів' : 'дней'}</span>
              </div>
            </div>
          </div>

          {/* Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-4"
          >
            <Filter className="w-5 h-5" />
            {showFilters
              ? (lang === 'uk' ? 'Приховати фільтри' : 'Скрыть фильтры')
              : (lang === 'uk' ? 'Показати фільтри' : 'Показать фильтры')
            }
          </button>

          {/* Filters */}
          {showFilters && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Lender Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {lang === 'uk' ? 'МФО' : 'МФО'}
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {lenders.map(lender => {
                      const count = availableLenderCounts[lender];
                      return (
                        <label key={lender} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedLenders.includes(lender)}
                            onChange={() => toggleLender(lender)}
                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                            disabled={count === 0}
                          />
                          <span className={count === 0 ? 'text-gray-400' : 'text-gray-700'}>
                            {lender} ({count})
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Rate Filter */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {lang === 'uk' ? 'Процентна ставка' : 'Процентная ставка'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600">
                        {lang === 'uk' ? 'Мінімум' : 'Минимум'}: {minRate}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={minRate}
                        onChange={(e) => setMinRate(Number(e.target.value))}
                        className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">
                        {lang === 'uk' ? 'Максимум' : 'Максимум'}: {maxRate}%
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={maxRate}
                        onChange={(e) => setMaxRate(Number(e.target.value))}
                        className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedLenders.length > 0 || minRate > 0 || maxRate < 2) && (
                <button
                  onClick={() => {
                    setSelectedLenders([]);
                    setMinRate(0);
                    setMaxRate(2);
                  }}
                  className="mt-4 text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  {lang === 'uk' ? 'Очистити фільтри' : 'Очистить фильтры'}
                </button>
              )}
            </div>
          )}
            </>
          )}

          {/* Sort Options */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-gray-600 self-center">
              {lang === 'uk' ? 'Сортувати:' : 'Сортировать:'}
            </span>
            {[
              { value: 'recommended', label: lang === 'uk' ? 'Рекомендовані' : 'Рекомендуемые' },
              { value: 'rate', label: lang === 'uk' ? 'За ставкою' : 'По ставке' },
              { value: 'amount', label: lang === 'uk' ? 'За сумою' : 'По сумме' },
              { value: 'approval', label: lang === 'uk' ? 'За схваленням' : 'По одобрению' },
              { value: 'time', label: lang === 'uk' ? 'За швидкістю' : 'По скорости' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value as SortOption)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  sortBy === option.value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center py-4 bg-indigo-50 rounded-lg">
            <span className="text-lg font-semibold text-indigo-700">
              {lang === 'uk' ? 'Знайдено' : 'Найдено'} {sortedLoans.length} {lang === 'uk' ? 'пропозицій' : 'предложений'}
            </span>
          </div>
        </div>

        {/* Loan Products */}
        <div className="space-y-6 mb-12">
          {sortedLoans.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
              <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">
                {lang === 'uk'
                  ? 'За вашими критеріями пропозицій не знайдено. Спробуйте змінити параметри.'
                  : 'По вашим критериям предложений не найдено. Попробуйте изменить параметры.'
                }
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {sortedLoans.map((loan) => {
                const estimatedPayment = (loanAmount * (1 + (loan.interestRateValue / 100) * (loanTerm / 365))).toFixed(0);
                return (
                  <div
                    key={loan.id}
                    className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 ${
                      loan.recommended ? 'ring-2 ring-indigo-500' : ''
                    }`}
                  >
                    {loan.recommended && (
                      <div className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                        <Star className="w-4 h-4 fill-current" />
                        {lang === 'uk' ? 'Рекомендуємо' : 'Рекомендуем'}
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <Image
                            src={loan.lenderLogo}
                            alt={loan.lender}
                            width={256}
                            height={150}
                            className="object-contain"
                        />
                      </div>

                      <div className="flex-grow w-full">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {loan.lender}
                            </h3>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(loan.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-600 ml-1">
                                {loan.rating.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="bg-indigo-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-indigo-600 mb-1">
                              <DollarSign className="w-4 h-4" />
                              <span className="text-xs font-semibold">
                                {lang === 'uk' ? 'Сума' : 'Сумма'}
                              </span>
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {loan.minAmount.toLocaleString()} - {loan.maxAmount.toLocaleString()} ₴
                            </div>
                          </div>

                          <div className="bg-indigo-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-indigo-600 mb-1">
                              <Percent className="w-4 h-4" />
                              <span className="text-xs font-semibold">
                                {lang === 'uk' ? 'Ставка' : 'Ставка'}
                              </span>
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {loan.interestRate}
                            </div>
                          </div>

                          <div className="bg-indigo-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-indigo-600 mb-1">
                              <Calendar className="w-4 h-4" />
                              <span className="text-xs font-semibold">
                                {lang === 'uk' ? 'Термін' : 'Срок'}
                              </span>
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {loan.minTerm} - {loan.maxTerm} {lang === 'uk' ? 'днів' : 'дней'}
                            </div>
                          </div>

                          <div className="bg-indigo-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 text-indigo-600 mb-1">
                              <Clock className="w-4 h-4" />
                              <span className="text-xs font-semibold">
                                {lang === 'uk' ? 'Схвалення' : 'Одобрение'}
                              </span>
                            </div>
                            <div className="text-lg font-bold text-gray-900">
                              {loan.approvalTime}
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-gray-700">
                              {lang === 'uk' ? 'Рівень схвалення' : 'Уровень одобрения'}
                            </span>
                            <span className="text-sm font-bold text-indigo-600">
                              {loan.approvalRate}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{ width: `${loan.approvalRate}%` }}
                            />
                          </div>
                        </div>

                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">
                              {lang === 'uk' ? 'Орієнтовна сума до повернення:' : 'Ориентировочная сумма к возврату:'}
                            </span>
                            <span className="text-2xl font-bold text-indigo-600">
                              {Number(estimatedPayment).toLocaleString()} ₴
                            </span>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-indigo-600" />
                              {lang === 'uk' ? 'Особливості' : 'Особенности'}
                            </h4>
                            <ul className="space-y-1">
                              {loan.features.slice(0, 3).map((feature, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-indigo-600">•</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              <FileText className="w-4 h-4 text-indigo-600" />
                              {lang === 'uk' ? 'Вимоги' : 'Требования'}
                            </h4>
                            <ul className="space-y-1">
                              {loan.requirements.slice(0, 3).map((req, idx) => (
                                <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                                  <span className="text-indigo-600">•</span>
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* NBU Links */}
                        {(loan.essential_characteristics || loan.warning) && (
                          <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-gray-100">
                            {loan.essential_characteristics && (
                              <a href={loan.essential_characteristics} target="_blank" rel="noopener noreferrer"
                                 className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1">
                                <Info className="w-4 h-4" />
                                {dict.allCredits.creditCard.essentialCharacteristics}
                              </a>
                            )}
                            {loan.warning && (
                              <a href={loan.warning} target="_blank" rel="noopener noreferrer"
                                 className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1">
                                <Info className="w-4 h-4" />
                                {dict.allCredits.creditCard.warning}
                              </a>
                            )}
                          </div>
                        )}

                        <div className="flex gap-3">
                          <a
                            href={loan.creditUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors text-center"
                          >
                            {lang === 'uk' ? 'Отримати кредит' : 'Получить кредит'}
                          </a>
                          <Link
                            href={`/${lang}/credits/z-poganoyu-istoriyeyu/${loan.id}`}
                            className="px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-colors text-center"
                          >
                            {lang === 'uk' ? 'Детальніше' : 'Подробнее'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">
            {lang === 'uk' ? 'Потрібна допомога з вибором?' : 'Нужна помощь с выбором?'}
          </h2>
          <p className="text-lg text-indigo-100 mb-6 max-w-2xl mx-auto">
            {lang === 'uk'
              ? 'Наші фахівці підберуть найвигідніший кредит під ваші потреби та можливості'
              : 'Наши специалисты подберут самый выгодный кредит под ваши нужды и возможности'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/calc/credit`} className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {lang === 'uk' ? 'Всі кредити' : 'Все кридиты'}
            </Link>
            {/*<button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors">*/}
            {/*  {lang === 'uk' ? 'Безкоштовна консультація' : 'Бесплатная консультация'}*/}
            {/*</button>*/}
          </div>
        </div>

        {/* Article Section */}
        <article className="mt-12 bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="max-w-4xl mx-auto prose prose-lg">
            {/* Introduction */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.badCreditHistoryArticle.intro}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.badCreditHistoryArticle.introParagraph2}
              </p>
            </div>

            {/* Is Possible */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-indigo-600" />
                {dict.badCreditHistoryArticle.isPossibleTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.badCreditHistoryArticle.isPossibleContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.badCreditHistoryArticle.isPossibleParagraph2}
              </p>
            </section>

            {/* No Refusals */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-indigo-600" />
                {dict.badCreditHistoryArticle.noRefusalsTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.badCreditHistoryArticle.noRefusalsContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.badCreditHistoryArticle.noRefusalsParagraph2}
              </p>
            </section>

            {/* With Overdues */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-indigo-600" />
                {dict.badCreditHistoryArticle.withOverduesTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.badCreditHistoryArticle.withOverduesContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.badCreditHistoryArticle.withOverduesParagraph2}
              </p>
            </section>

            {/* Urgent Credit */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-indigo-600" />
                {dict.badCreditHistoryArticle.urgentCreditTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.badCreditHistoryArticle.urgentCreditContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.badCreditHistoryArticle.urgentCreditParagraph2}
              </p>
            </section>

            {/* Long Term */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-indigo-600" />
                {dict.badCreditHistoryArticle.longTermTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.badCreditHistoryArticle.longTermContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.badCreditHistoryArticle.longTermParagraph2}
              </p>
            </section>

            {/* Refinancing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-indigo-600" />
                {dict.badCreditHistoryArticle.refinancingTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.badCreditHistoryArticle.refinancingContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.badCreditHistoryArticle.refinancingParagraph2}
              </p>
            </section>

            {/* Until Salary */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-indigo-600" />
                {dict.badCreditHistoryArticle.untilSalaryTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.badCreditHistoryArticle.untilSalaryContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.badCreditHistoryArticle.untilSalaryParagraph2}
              </p>
            </section>

            {/* Advantages */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-indigo-600" />
                {dict.badCreditHistoryArticle.advantagesTitle}
              </h2>
              <ul className="list-none space-y-2">
                {dict.badCreditHistoryArticle.advantagesList.map((advantage, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{advantage}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Conclusion */}
            <section className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {dict.badCreditHistoryArticle.conclusionTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {dict.badCreditHistoryArticle.conclusionContent}
              </p>
            </section>
          </div>
        </article>

        {/* Breadcrumbs */}
        <nav className="mt-8 text-sm text-gray-600">
          <ol className="flex items-center gap-2">
            <li>
              <Link href={`/${lang}`} className="hover:text-indigo-600">
                {lang === 'uk' ? 'Головна' : 'Главная'}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${lang}/credits`} className="hover:text-indigo-600">
                {lang === 'uk' ? 'Кредити' : 'Кредиты'}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-semibold">
              {lang === 'uk' ? 'Кредит з поганою історією' : 'Кредит с плохой историей'}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}
