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
  CreditCard,
  ChevronDown,
  Info
} from 'lucide-react';
import { LOAN_PRODUCTS, type LoanProduct } from '@/data/loanProducts';
import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';

type SortOption = 'recommended' | 'rate' | 'amount' | 'approval' | 'time';

interface GroshiTerminovoPageClientProps {
  lang: Locale;
}

export default function GroshiTerminovoPageClient({ lang }: GroshiTerminovoPageClientProps) {
  const dict = getDictionary(lang);
  const [loanAmount, setLoanAmount] = useState(3000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [selectedLenders, setSelectedLenders] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [minRate, setMinRate] = useState(0);
  const [maxRate, setMaxRate] = useState(2);
  const [showCalculator, setShowCalculator] = useState(false);

  // Get unique lenders
  const lenders = Array.from(new Set(LOAN_PRODUCTS.map(loan => loan.lender)));

  // Filter loans - step by step for better visibility
  const filteredLoans = useMemo(() => {
    let results = LOAN_PRODUCTS;

    // // Filter by loan amount
    // results = results.filter(loan => loanAmount >= loan.minAmount && loanAmount <= loan.maxAmount);
    //
    // // Filter by loan term
    // results = results.filter(loan => loanTerm >= loan.minTerm && loanTerm <= loan.maxTerm);
    //
    // // Filter by selected lenders
    // if (selectedLenders.length > 0) {
    //   results = results.filter(loan => selectedLenders.includes(loan.lender));
    // }
    //
    // // Filter by interest rate
    // results = results.filter(loan => loan.interestRateValue >= minRate && loan.interestRateValue <= maxRate);

    return results;
  }, [loanAmount, loanTerm, selectedLenders, minRate, maxRate]);

  // Count available products per lender after amount/term filtering (before lender selection)
  const availableLenderCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    lenders.forEach(lender => {
      const count = LOAN_PRODUCTS.filter(loan =>
        // loanAmount >= loan.minAmount &&
        // loanAmount <= loan.maxAmount &&
        // loanTerm >= loan.minTerm &&
        // loanTerm <= loan.maxTerm &&
        // loan.interestRateValue >= minRate &&
        // loan.interestRateValue <= maxRate &&
        loan.lender === lender
      ).length;
      counts[lender] = count;
    });
    return counts;
  }, [loanAmount, loanTerm, minRate, maxRate, lenders]);

  // Sort loans
  const sortedLoans = useMemo(() => {
    return [...filteredLoans].sort((a, b) => {
      if (sortBy === 'recommended') {
        if (a.recommended && !b.recommended) return -1;
        if (!a.recommended && b.recommended) return 1;
        return b.rating - a.rating;
      }
      if (sortBy === 'rate') {
        return a.interestRateValue - b.interestRateValue;
      }
      if (sortBy === 'amount') {
        return b.maxAmount - a.maxAmount;
      }
      if (sortBy === 'approval') {
        return b.approvalRate - a.approvalRate;
      }
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

  const resetAllFilters = () => {
    setSelectedLenders([]);
    setMinRate(0);
    setMaxRate(2);
    setLoanAmount(3000);
    setLoanTerm(30);
  };

  const hasActiveFilters = selectedLenders.length > 0 || minRate !== 0 || maxRate !== 2;

  const calculateMonthlyPayment = (amount: number, term: number, rate: number): number => {
    const dailyRate = rate / 100;
    const totalInterest = amount * dailyRate * term;
    return Math.round((amount + totalInterest) / (term / 30));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href={`/${lang}`} className="hover:text-orange-600">
              {lang === 'uk' ? 'Головна' : 'Главная'}
            </Link>
            <span>/</span>
            <Link href={`/${lang}/credits`} className="hover:text-orange-600">
              {lang === 'uk' ? 'Кредити' : 'Кредиты'}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{lang === 'uk' ? 'Гроші терміново' : 'Деньги срочно'}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-2">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <Wallet className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold font-heading mb-2">
                {lang === 'uk' ? 'Де взяти гроші терміново в Україні' : 'Где взять деньги срочно в Украине'}
              </h1>
              <p className="text-xl text-orange-100">
                {sortedLoans.length} {lang === 'uk' ? 'пропозицій для термінового отримання коштів' : 'предложений для срочного получения средств'}
              </p>
            </div>
          </div>

          {/* Credit Type Navigation Tabs */}
          <div className="mt-6 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              <Link
                href={`/${lang}/credits/online`}
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors"
              >
                {lang === 'uk' ? 'Онлайн кредити' : 'Онлайн кредиты'}
              </Link>
              <Link
                href={`/${lang}/credyty/groshi-terminovo`}
                className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold whitespace-nowrap"
              >
                {lang === 'uk' ? 'Гроші терміново' : 'Деньги срочно'}
              </Link>
              <Link
                href={`/${lang}/credits/pozyka-online`}
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors"
              >
                {lang === 'uk' ? 'Позика онлайн' : 'Займ онлайн'}
              </Link>
              <Link
                href={`/${lang}/credits/credit-na-kartu`}
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors"
              >
                {lang === 'uk' ? 'Кредит на карту' : 'Кредит на карту'}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Calculator Form - Accordion */}
      <div className="bg-white border-b shadow-sm">
        <div className="container-custom py-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-orange-600" />
                {lang === 'uk' ? 'Розрахуйте термінову позику' : 'Рассчитайте срочный займ'}
              </h2>
              <ChevronDown className={`w-6 h-6 text-orange-600 transition-transform duration-300 ${showCalculator ? 'rotate-180' : ''}`} />
            </button>

            {showCalculator && (
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Loan Amount */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      Сума кредиту
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="5000"
                      step="100"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">100 ₴</span>
                      <div className="text-2xl font-bold text-primary">
                        {loanAmount.toLocaleString()} ₴
                      </div>
                      <span className="text-sm text-gray-600">5,000 ₴</span>
                    </div>
                  </div>

                  {/* Loan Term */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      Термін кредиту (днів)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="365"
                      step="1"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-600">1 день</span>
                      <div className="text-2xl font-bold text-primary">
                        {loanTerm} {loanTerm === 1 ? 'день' : loanTerm < 5 ? 'дні' : 'днів'}
                      </div>
                      <span className="text-sm text-gray-600">365 днів</span>
                    </div>
                  </div>
                </div>

                {/* Results Summary */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white p-4 rounded-lg">
                    <div className="text-sm opacity-90 mb-1">{lang === 'uk' ? 'Сума' : 'Сумма'}</div>
                    <div className="text-2xl font-bold">{loanAmount.toLocaleString()} ₴</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg">
                    <div className="text-sm opacity-90 mb-1">Термін</div>
                    <div className="text-2xl font-bold">{loanTerm} днів</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-lg">
                    <div className="text-sm opacity-90 mb-1">Знайдено пропозицій</div>
                    <div className="text-2xl font-bold">{sortedLoans.length}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Filter Header */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Фільтри
                  {hasActiveFilters && (
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                      {(selectedLenders.length > 0 ? 1 : 0) + (minRate !== 0 || maxRate !== 2 ? 1 : 0)}
                    </span>
                  )}
                </h2>
                <button
                  onClick={resetAllFilters}
                  className="text-sm text-primary hover:text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!hasActiveFilters}
                >
                  Скинути все
                </button>
              </div>

              {/* Interest Rate Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center justify-between">
                  <span>Відсоткова ставка (% на день)</span>
                  {(minRate !== 0 || maxRate !== 2) && (
                    <button
                      onClick={() => {
                        setMinRate(0);
                        setMaxRate(2);
                      }}
                      className="text-xs text-primary hover:text-primary-dark"
                    >
                      Скинути
                    </button>
                  )}
                </h3>
                <div className={`space-y-3 p-3 rounded-lg border-2 transition-colors ${
                  minRate !== 0 || maxRate !== 2
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200'
                }`}>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm text-gray-600">Від</label>
                      <span className="text-sm font-semibold text-primary">{minRate}%</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="2"
                      step="0.1"
                      value={minRate}
                      onChange={(e) => setMinRate(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm text-gray-600">До</label>
                      <span className="text-sm font-semibold text-primary">{maxRate}%</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="2"
                      step="0.1"
                      value={maxRate}
                      onChange={(e) => setMaxRate(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Lender Filter */}
              <div>
                <h3 className="font-semibold mb-3">
                  Кредитор
                  {selectedLenders.length > 0 && (
                    <span className="ml-2 text-xs text-primary">
                      ({selectedLenders.length} обрано)
                    </span>
                  )}
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {lenders.map(lender => {
                    const availableCount = availableLenderCounts[lender] || 0;
                    const isDisabled = availableCount === 0;

                    return (
                      <label
                        key={lender}
                        className={`flex items-center gap-3 p-2 rounded transition-colors ${
                          isDisabled
                            ? 'opacity-50 cursor-not-allowed'
                            : 'cursor-pointer hover:bg-gray-50'
                        } ${selectedLenders.includes(lender) ? 'bg-primary/5' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedLenders.includes(lender)}
                          onChange={() => toggleLender(lender)}
                          disabled={isDisabled}
                          className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary disabled:cursor-not-allowed"
                        />
                        <span className="text-sm flex-1">{lender}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          availableCount > 0
                            ? 'bg-primary/10 text-primary'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {availableCount}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="card p-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Важлива інформація
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>✓ Всі кредитори ліцензовані НБУ</p>
                <p>✓ Відсотки розраховуються щодня</p>
                <p>✓ Перший кредит часто безкоштовний</p>
                <p>⚠️ Не беріть більше, ніж можете повернути</p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="card p-4 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600 font-medium">Активні фільтри:</span>
                  {selectedLenders.map(lender => (
                    <button
                      key={lender}
                      onClick={() => toggleLender(lender)}
                      className="inline-flex items-center gap-1 bg-primary text-white text-sm px-3 py-1 rounded-full hover:bg-primary-dark transition-colors"
                    >
                      {lender}
                      <span className="text-xs">✕</span>
                    </button>
                  ))}
                  {(minRate !== 0 || maxRate !== 2) && (
                    <button
                      onClick={() => {
                        setMinRate(0);
                        setMaxRate(2);
                      }}
                      className="inline-flex items-center gap-1 bg-orange-500 text-white text-sm px-3 py-1 rounded-full hover:bg-orange-600 transition-colors"
                    >
                      Ставка: {minRate}% - {maxRate}%
                      <span className="text-xs">✕</span>
                    </button>
                  )}
                  <button
                    onClick={resetAllFilters}
                    className="text-sm text-primary hover:text-primary-dark font-medium ml-auto"
                  >
                    Скинути все
                  </button>
                </div>
              </div>
            )}

            {/* Sort Bar */}
            <div className="card p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Знайдено:</span>
                    <span className="text-lg font-bold text-primary">
                      {sortedLoans.length} {sortedLoans.length === 1 ? 'пропозиція' : sortedLoans.length < 5 ? 'пропозиції' : 'пропозицій'}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Сортувати:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="recommended">Рекомендовані</option>
                      <option value="rate">За ставкою</option>
                      <option value="amount">За максимальною сумою</option>
                      <option value="approval">За швидкістю схвалення</option>
                      <option value="time">За часом видачі</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden btn-secondary flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? 'Сховати фільтри' : 'Показати фільтри'}
                </button>
              </div>
            </div>

            {/* Loans Grid */}
            {sortedLoans.length === 0 ? (
              <div className="card p-12 text-center">
                <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Нічого не знайдено</h3>
                <p className="text-gray-600 mb-4">
                  За заданими параметрами не знайдено жодної пропозиції
                </p>
                <div className="text-sm text-gray-600 mb-4">
                  <p>Поточні параметри:</p>
                  <ul className="mt-2 space-y-1">
                    <li>Сума: <strong>{loanAmount.toLocaleString()} ₴</strong></li>
                    <li>Термін: <strong>{loanTerm} днів</strong></li>
                    <li>Ставка: <strong>{minRate}% - {maxRate}%</strong></li>
                    {selectedLenders.length > 0 && (
                      <li>Кредитори: <strong>{selectedLenders.join(', ')}</strong></li>
                    )}
                  </ul>
                </div>
                <button
                  onClick={resetAllFilters}
                  className="btn-primary"
                >
                  Скинути всі фільтри
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {sortedLoans.map(loan => {
                  const monthlyPayment = calculateMonthlyPayment(loanAmount, loanTerm, loan.interestRateValue);

                  return (
                    <div
                      key={loan.id}
                      className="card hover:shadow-xl transition-shadow duration-200"
                    >
                      <div className="p-6">
                        {/* Loan Header */}
                        <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-6">
                          <div className="flex flex-col sm:flex-row items-start gap-6 flex-1 w-full">
                            <Image
                                src={loan.lenderLogo}
                                alt={loan.lender}
                                width={256}
                                height={150}
                                className="object-contain"
                            />
                            <div className="flex-1 w-full">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="text-xl font-semibold">
                                  {loan.lender}
                                </h3>
                                {loan.recommended && (
                                  <span className="bg-primary text-white text-xs px-2 py-1 rounded font-semibold">
                                    Рекомендуємо
                                  </span>
                                )}
                                {loan.popular && (
                                  <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded font-semibold">
                                    Популярний
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 mb-2">{loan.productName}</p>
                              <div className="flex items-center gap-3 text-sm">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  <span className="font-semibold">{loan.rating}</span>
                                  <span className="text-gray-400">({loan.reviews})</span>
                                </div>
                                <div className="flex items-center gap-1 text-green-600">
                                  <CheckCircle className="w-4 h-4" />
                                  <span>{loan.approvalRate}% схвалень</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Loan Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Сума</div>
                            <div className="font-semibold text-primary text-sm">
                              {loan.minAmount.toLocaleString()} - {loan.maxAmount.toLocaleString()} ₴
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Термін
                            </div>
                            <div className="font-semibold text-green-600 text-sm">
                              до {loan.maxTerm} днів
                            </div>
                          </div>
                          <div className="bg-orange-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                              <Percent className="w-3 h-3" />
                              Ставка
                            </div>
                            <div className="font-semibold text-orange-600 text-sm">
                              {loan.interestRate}
                            </div>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Схвалення
                            </div>
                            <div className="font-semibold text-purple-600 text-sm">
                              {loan.approvalTime}
                            </div>
                          </div>
                        </div>

                        {/* Calculation Result */}
                        <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-4 rounded-lg mb-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm opacity-90 mb-1">Орієнтовний платіж на місяць</div>
                              <div className="text-3xl font-bold">{monthlyPayment.toLocaleString()} ₴</div>
                            </div>
                            <Smartphone className="w-12 h-12 opacity-20" />
                          </div>
                          <div className="text-xs opacity-75 mt-2">
                            * Розрахунок приблизний. Точні умови дізнавайтесь у кредитора
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Переваги
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {loan.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-green-600 font-bold mt-0.5">✓</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Requirements */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-600" />
                            Вимоги
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {loan.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-primary">•</span>
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
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

                        {/* Actions */}
                        <div className="flex gap-3">
                          <a
                            href={loan.creditUrl || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 btn-primary text-center"
                          >
                            Отримати кредит
                          </a>
                          <Link
                            href={`/${lang}/credits/online/${loan.id}`}
                            className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors text-center"
                          >
                            {lang === 'uk' ? 'Детальніше' : 'Подробнее'}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary via-primary-dark to-primary rounded-2xl p-8 md:p-12 text-white text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">
            {lang === 'uk' ? 'Потрібна допомога з вибором?' : 'Нужна помощь с выбором?'}
          </h2>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            {lang === 'uk'
              ? 'Наші фахівці підберуть найвигідніший кредит під ваші потреби та можливості'
              : 'Наши специалисты подберут самый выгодный кредит под ваши нужды и возможности'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/calc/credit`} className="btn-primary bg-white text-primary hover:bg-gray-100">
              {lang === 'uk' ? 'Всі кредити' : 'Все кридиты'}
            </Link>
            {/*<button className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary">*/}
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
                {dict.groshiTerminovoArticle.intro}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.groshiTerminovoArticle.introParagraph2}
              </p>
            </div>

            {/* Where to Get Money */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-orange-600" />
                {dict.groshiTerminovoArticle.whereToGetTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.groshiTerminovoArticle.whereToGetContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.groshiTerminovoArticle.whereToGetParagraph2}
              </p>
            </section>

            {/* Money to Card */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-green-600" />
                {dict.groshiTerminovoArticle.moneyToCardTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.groshiTerminovoArticle.moneyToCardContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.groshiTerminovoArticle.moneyToCardParagraph2}
              </p>
            </section>

            {/* Until Salary */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-blue-600" />
                {dict.groshiTerminovoArticle.untilSalaryTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.groshiTerminovoArticle.untilSalaryContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.groshiTerminovoArticle.untilSalaryParagraph2}
              </p>
            </section>

            {/* How to Get Money Fast */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Smartphone className="w-6 h-6 text-purple-600" />
                {dict.groshiTerminovoArticle.howToGetTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.groshiTerminovoArticle.howToGetContent}
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                {dict.groshiTerminovoArticle.howToGetList.map((step, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">
                    {step}
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 leading-relaxed">
                {dict.groshiTerminovoArticle.howToGetParagraph2}
              </p>
            </section>

            {/* Advantages */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                {dict.groshiTerminovoArticle.advantagesTitle}
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {dict.groshiTerminovoArticle.advantagesList.map((advantage, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">
                    {advantage}
                  </li>
                ))}
              </ul>
            </section>

            {/* Conclusion */}
            <section className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-orange-600" />
                {dict.groshiTerminovoArticle.conclusionTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {dict.groshiTerminovoArticle.conclusionContent}
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
