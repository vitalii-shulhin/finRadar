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
  ChevronDown,
  Info
} from 'lucide-react';
import { LOAN_PRODUCTS, type LoanProduct } from '@/data/loanProducts';
import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';

type SortOption = 'recommended' | 'rate' | 'amount' | 'approval' | 'time';

interface OnlineCreditsPageClientProps {
  lang: Locale;
}

export default function OnlineCreditsPageClient({ lang }: OnlineCreditsPageClientProps) {
  const dict = getDictionary(lang);
  const t = dict.onlineCreditsPage;
  const [loanAmount, setLoanAmount] = useState(3000);
  const [loanTerm, setLoanTerm] = useState(120);
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

    // Filter by loan amount
    // results = results.filter(loan => loanAmount >= loan.minAmount && loanAmount <= loan.maxAmount);
    //
    // // Filter by loan term
    // // results = results.filter(loan => loanTerm >= loan.minTerm && loanTerm <= loan.maxTerm);
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
      //   loanAmount >= loan.minAmount &&
      //   loanAmount <= loan.maxAmount &&
      //   loanTerm >= loan.minTerm &&
      //   loanTerm <= loan.maxTerm &&
      //   loan.interestRateValue >= minRate &&
      //   loan.interestRateValue <= maxRate &&
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
    setLoanTerm(120);
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
            <Link href={`/${lang}`} className="hover:text-primary">
              {t.breadcrumb.home}
            </Link>
            <span>/</span>
            <Link href={`/${lang}/credits`} className="hover:text-primary">
              {t.breadcrumb.credits}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{t.breadcrumb.onlineCredits}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-2">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
              <Wallet className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold font-heading mb-2">
                {t.header.title}
              </h1>
              <p className="text-xl text-blue-100">
                {sortedLoans.length} {t.header.subtitle}
              </p>
            </div>
          </div>

          {/* Credit Type Navigation Tabs */}
          <div className="mt-6 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              <Link
                href={`/${lang}/credits/online`}
                className="bg-white text-primary px-4 py-2 rounded-lg font-semibold whitespace-nowrap"
              >
                {t.tabs.online}
              </Link>
              <Link
                href={`/${lang}/credits/microcredits`}
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors"
              >
                {t.tabs.microcredits}
              </Link>
              <Link
                href={`/${lang}/credits/cash`}
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors"
              >
                {t.tabs.cash}
              </Link>
              <Link
                href={`/${lang}/cards`}
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors"
              >
                {t.tabs.cards}
              </Link>
              <Link
                href={`/${lang}/credits/credit-line`}
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors"
              >
                {t.tabs.creditLine}
              </Link>
              <Link
                href={`/${lang}/credits/refinancing`}
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors"
              >
                {t.tabs.refinancing}
              </Link>
              <Link
                href={`/${lang}/credits/secured`}
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors"
              >
                {t.tabs.secured}
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
                <DollarSign className="w-6 h-6 text-primary" />
                {t.calculator.title}
              </h2>
              <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-300 ${showCalculator ? 'rotate-180' : ''}`} />
            </button>

            {showCalculator && (
              <div className="mt-4 pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Loan Amount */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      {t.calculator.amount}
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="100000"
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
                      <span className="text-sm text-gray-600">100 000 ₴</span>
                    </div>
                  </div>

                  {/* Loan Term */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      {t.calculator.term}
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
                      <span className="text-sm text-gray-600">1 {t.calculator.day}</span>
                      <div className="text-2xl font-bold text-primary">
                        {loanTerm} {loanTerm === 1 ? t.calculator.day : loanTerm < 5 ? t.calculator.days : t.calculator.daysMany}
                      </div>
                      <span className="text-sm text-gray-600">365 {t.calculator.daysMany}</span>
                    </div>
                  </div>
                </div>

                {/* Results Summary */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-primary to-primary-dark text-white p-4 rounded-lg">
                    <div className="text-sm opacity-90 mb-1">{t.calculator.results.amount}</div>
                    <div className="text-2xl font-bold">{loanAmount.toLocaleString()} ₴</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg">
                    <div className="text-sm opacity-90 mb-1">{t.calculator.results.term}</div>
                    <div className="text-2xl font-bold">{loanTerm} {t.calculator.daysMany}</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-lg">
                    <div className="text-sm opacity-90 mb-1">{t.calculator.results.found}</div>
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
                  {t.filters.title}
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
                  {t.filters.resetAll}
                </button>
              </div>

              {/* Interest Rate Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 flex items-center justify-between">
                  <span>{t.filters.interestRate}</span>
                  {(minRate !== 0 || maxRate !== 2) && (
                    <button
                      onClick={() => {
                        setMinRate(0);
                        setMaxRate(2);
                      }}
                      className="text-xs text-primary hover:text-primary-dark"
                    >
                      {t.filters.reset}
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
                      <label className="text-sm text-gray-600">{t.filters.from}</label>
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
                      <label className="text-sm text-gray-600">{t.filters.to}</label>
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
                  {t.filters.lender}
                  {selectedLenders.length > 0 && (
                    <span className="ml-2 text-xs text-primary">
                      ({selectedLenders.length} {t.filters.selected})
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
                {t.info.title}
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>{t.info.licensed}</p>
                <p>{t.info.daily}</p>
                <p>{t.info.firstFree}</p>
                <p>{t.info.warning}</p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="card p-4 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600 font-medium">{t.filters.activeFilters}</span>
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
                      {t.filters.rate}: {minRate}% - {maxRate}%
                      <span className="text-xs">✕</span>
                    </button>
                  )}
                  <button
                    onClick={resetAllFilters}
                    className="text-sm text-primary hover:text-primary-dark font-medium ml-auto"
                  >
                    {t.filters.resetAll}
                  </button>
                </div>
              </div>
            )}

            {/* Sort Bar */}
            <div className="card p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{t.sort.found}</span>
                    <span className="text-lg font-bold text-primary">
                      {sortedLoans.length} {sortedLoans.length === 1 ? t.sort.offer : sortedLoans.length < 5 ? t.sort.offers : t.sort.offersMany}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{t.sort.sortBy}</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="recommended">{t.sort.recommended}</option>
                      <option value="rate">{t.sort.rate}</option>
                      <option value="amount">{t.sort.amount}</option>
                      <option value="approval">{t.sort.approval}</option>
                      <option value="time">{t.sort.time}</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden btn-secondary flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {showFilters ? t.sort.hideFilters : t.sort.showFilters}
                </button>
              </div>
            </div>

            {/* Loans Grid */}
            {sortedLoans.length === 0 ? (
              <div className="card p-12 text-center">
                <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{t.empty.title}</h3>
                <p className="text-gray-600 mb-4">
                  {t.empty.description}
                </p>
                <div className="text-sm text-gray-600 mb-4">
                  <p>{t.empty.currentParams}</p>
                  <ul className="mt-2 space-y-1">
                    <li>{t.empty.amount} <strong>{loanAmount.toLocaleString()} ₴</strong></li>
                    <li>{t.empty.term} <strong>{loanTerm} {t.calculator.daysMany}</strong></li>
                    <li>{t.empty.rate} <strong>{minRate}% - {maxRate}%</strong></li>
                    {selectedLenders.length > 0 && (
                      <li>{t.empty.lenders} <strong>{selectedLenders.join(', ')}</strong></li>
                    )}
                  </ul>
                </div>
                <button
                  onClick={resetAllFilters}
                  className="btn-primary"
                >
                  {t.empty.resetFilters}
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
                        <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
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
                                    {t.loan.recommended}
                                  </span>
                                )}
                                {loan.popular && (
                                  <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded font-semibold">
                                    {t.loan.popular}
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
                                  <span>{loan.approvalRate}% {t.loan.approvalRate}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Loan Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">{t.loan.amount}</div>
                            <div className="font-semibold text-primary text-sm">
                              {loan.minAmount.toLocaleString()} - {loan.maxAmount.toLocaleString()} ₴
                            </div>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {t.loan.term}
                            </div>
                            <div className="font-semibold text-green-600 text-sm">
                              {loan.minTerm} - {loan.maxTerm} {t.calculator.daysMany}
                            </div>
                          </div>
                          <div className="bg-orange-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                              <Percent className="w-3 h-3" />
                              {t.loan.rate}
                            </div>
                            <div className="font-semibold text-orange-600 text-sm">
                              {loan.interestRate}
                            </div>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {t.loan.approval}
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
                              <div className="text-sm opacity-90 mb-1">{t.loan.monthlyPayment}</div>
                              <div className="text-3xl font-bold">{monthlyPayment.toLocaleString()} ₴</div>
                            </div>
                            <Smartphone className="w-12 h-12 opacity-20" />
                          </div>
                          <div className="text-xs opacity-75 mt-2">
                            {t.loan.disclaimer}
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            {t.loan.advantages}
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
                            {t.loan.requirements}
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
                              <a
                                href={loan.essential_characteristics}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                              >
                                <Info className="w-4 h-4" />
                                {dict.allCredits.creditCard.essentialCharacteristics}
                              </a>
                            )}
                            {loan.warning && (
                              <a
                                href={loan.warning}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                              >
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
                            {t.loan.getCredit}
                          </a>
                          <Link
                            href={`/${lang}/credits/online/${loan.id}`}
                            className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors text-center"
                          >
                            {t.loan.details}
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
            {t.cta.title}
          </h2>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${lang}/calc/credit`} className="btn-primary bg-white text-primary hover:bg-gray-100">
              {t.cta.calculator}
            </Link>
            {/*<button className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary">*/}
            {/*  {t.cta.consultation}*/}
            {/*</button>*/}
          </div>
        </div>

        {/* Article Section */}
        <article className="mt-12 bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="max-w-4xl mx-auto prose prose-lg">
            {/* Introduction */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.onlineCreditsArticle.intro}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.onlineCreditsArticle.introParagraph2}
              </p>
            </div>

            {/* How to Get Credit */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-primary" />
                {dict.onlineCreditsArticle.howToGetTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.onlineCreditsArticle.howToGetContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.onlineCreditsArticle.howToGetParagraph2}
              </p>
            </section>

            {/* No Refusal */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                {dict.onlineCreditsArticle.noRefusalTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.onlineCreditsArticle.noRefusalContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.onlineCreditsArticle.noRefusalParagraph2}
              </p>
            </section>

            {/* Fast Credit */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-orange-600" />
                {dict.onlineCreditsArticle.fastCreditTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.onlineCreditsArticle.fastCreditContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.onlineCreditsArticle.fastCreditParagraph2}
              </p>
            </section>

            {/* Types of Credits */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Wallet className="w-6 h-6 text-blue-600" />
                {dict.onlineCreditsArticle.typesTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.onlineCreditsArticle.typesContent}
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                {dict.onlineCreditsArticle.typesList.map((type, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">
                    {type}
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 leading-relaxed">
                {dict.onlineCreditsArticle.typesParagraph2}
              </p>
            </section>

            {/* Advantages */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                {dict.onlineCreditsArticle.advantagesTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.onlineCreditsArticle.advantagesContent}
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                {dict.onlineCreditsArticle.advantagesList.map((advantage, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">
                    {advantage}
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 leading-relaxed">
                {dict.onlineCreditsArticle.advantagesParagraph2}
              </p>
            </section>

            {/* Diya */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Smartphone className="w-6 h-6 text-purple-600" />
                {dict.onlineCreditsArticle.diyaTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {dict.onlineCreditsArticle.diyaContent}
              </p>
            </section>

            {/* All Credits */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-indigo-600" />
                {dict.onlineCreditsArticle.allCreditsTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.onlineCreditsArticle.allCreditsContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.onlineCreditsArticle.allCreditsParagraph2}
              </p>
            </section>

            {/* Conclusion */}
            <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                {dict.onlineCreditsArticle.conclusionTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {dict.onlineCreditsArticle.conclusionContent}
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
