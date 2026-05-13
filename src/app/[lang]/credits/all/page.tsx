'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import Image from 'next/image';
import {
  CreditCard,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  Star,
  Filter,
  ChevronDown,
  ChevronUp,
  Info,
  Percent,
  Calendar,
  Wallet,
} from 'lucide-react';
import { getDictionary } from '@/i18n/dictionaries';
import type { Locale } from '@/i18n/config';
import { CREDIT_OFFERS as CREDIT_OFFERS_BASE } from '@/data/creditOffers';
import {log} from "node:util";

interface CreditOffer {
  id: number;
  bank: string;
  logo: string;
  type: 'cash' | 'online' | 'microcredit' | 'credit-line' | 'refinancing' | 'secured';
  typeName: string;
  rating: number;
  reviews: number;
  minAmount: number;
  maxAmount: number;
  minRate: number;
  minTerm: number;
  maxTerm: number;
  approvalTime: string;
  features: string[];
  requiresCollateral: boolean;
  onlineApplication: boolean;
  instantDecision: boolean;
  color: string;
  creditUrl?: string;
  essential_characteristics?: string;
  warning?: string;
}


type SortOption = 'rating' | 'minRate' | 'maxAmount' | 'approvalTime';
type CreditType = 'all' | 'cash' | 'online' | 'microcredit' | 'credit-line' | 'refinancing' | 'secured';

export default function AllCreditsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = getDictionary(params.lang);

  // Map shared credit data with dictionary translations
  const CREDIT_OFFERS: CreditOffer[] = CREDIT_OFFERS_BASE.map(credit => {
    const bankKey = credit.bank.toLowerCase().replace(/\s/g, '').replace('банк', 'bank');
    const typeKey = credit.type === 'credit-line' ? 'creditLine' : credit.type;
    const offers = dict.allCredits.offers as any;
    console.log(bankKey)
    return {
      ...credit,
      typeName: dict.allCredits.typeNames[typeKey],
      approvalTime: offers[bankKey]?.approvalTime || (params.lang === 'uk' ? '1 день' : '1 день'),
      features: [...(offers[bankKey]?.features || [])],
    };
  });

  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [selectedType, setSelectedType] = useState<CreditType>('all');
  const [minAmount, setMinAmount] = useState(0);
  const [onlyInstant, setOnlyInstant] = useState(false);
  const [onlyOnline, setOnlyOnline] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Filter credits
  const filteredCredits = useMemo(() => {
    let results = CREDIT_OFFERS;

    if (selectedType !== 'all') {
      results = results.filter(c => c.type === selectedType);
    }

    if (minAmount > 0) {
      results = results.filter(c => c.maxAmount >= minAmount);
    }

    if (onlyInstant) {
      results = results.filter(c => c.instantDecision);
    }

    if (onlyOnline) {
      results = results.filter(c => c.onlineApplication);
    }

    return results;
  }, [selectedType, minAmount, onlyInstant, onlyOnline]);

  // Sort credits
  const sortedCredits = useMemo(() => {
    return [...filteredCredits].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'minRate') return a.minRate - b.minRate;
      if (sortBy === 'maxAmount') return b.maxAmount - a.maxAmount;
      return 0;
    });
  }, [filteredCredits, sortBy]);

  const resetFilters = () => {
    setSelectedType('all');
    setMinAmount(0);
    setOnlyInstant(false);
    setOnlyOnline(false);
  };

  const hasActiveFilters = selectedType !== 'all' || minAmount > 0 || onlyInstant || onlyOnline;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://finradar.ua';

  // Generate JSON-LD structured data
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${baseUrl}/${params.lang}/credits/all`,
    name: params.lang === 'uk'
      ? 'Кредит готівкою - Взяти кредит в Україні'
      : 'Кредит наличными - Взять кредит в Украине',
    description: params.lang === 'uk'
      ? 'Кредит готівкою в Україні ✅ рішення в день звернення ✅ заявка в кілька банків'
      : 'Кредит наличными в Украине ✅ решение в день обращения ✅ заявка в несколько банков',
    dateModified: new Date().toISOString(),
    inLanguage: params.lang === 'uk' ? 'uk-UA' : 'ru-UA',
    isPartOf: {
      '@type': 'WebSite',
      url: baseUrl,
      publisher: {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'FinRadar',
        description: params.lang === 'uk'
          ? 'Фінансовий маркетплейс України - порівняння кредитів, карток та страхування'
          : 'Финансовый маркетплейс Украины - сравнение кредитов, карт и страхования',
        url: baseUrl,
      },
    },
    mainEntity: {
      '@type': 'ItemList',
      name: params.lang === 'uk' ? 'Кредити в Україні' : 'Кредиты в Украине',
      numberOfItems: CREDIT_OFFERS.length,
      itemListElement: CREDIT_OFFERS.slice(0, 10).map((credit, index) => ({
        '@type': 'LoanOrCredit',
        position: index + 1,
        name: credit.bank,
        loanTerm: {
          '@type': 'QuantitativeValue',
          minValue: credit.minTerm,
          maxValue: credit.maxTerm,
          unitText: credit.maxTerm >= 12 ? 'months' : 'days',
        },
        interestRate: credit.minRate,
        amount: {
          '@type': 'MonetaryAmount',
          minValue: credit.minAmount,
          maxValue: credit.maxAmount,
          currency: 'UAH',
        },
        description: credit.features[0],
        areaServed: 'Ukraine',
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: params.lang === 'uk' ? 'Головна' : 'Главная',
        item: `${baseUrl}/${params.lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: params.lang === 'uk' ? 'Кредити' : 'Кредиты',
        item: `${baseUrl}/${params.lang}/credits`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: params.lang === 'uk' ? 'Всі кредити' : 'Все кредиты',
        item: `${baseUrl}/${params.lang}/credits/all`,
      },
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FinRadar',
    url: baseUrl,
    description: params.lang === 'uk'
      ? '5 років на ринку. 1.2 млн кредитів оформлено. 3 млрд грн видано в кредит.'
      : '5 лет на рынке. 1.2 млн кредитов оформлено. 3 млрд грн выдано в кредит.',
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Structured Data - JSON-LD */}
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-rose-50/40 to-gray-50"></div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(0,0,0,.02) 50px, rgba(0,0,0,.02) 100px)`
          }}
        ></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-rose-400/8 via-pink-300/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-red-300/6 to-transparent blur-3xl"></div>
      </div>

      {/* Breadcrumb */}
      <div className="relative">
        <div className="container-custom py-4">
          <div className="inline-flex items-center gap-2 text-sm bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg border border-gray-100">
            <Link href={`/${params.lang}`} className="hover:text-primary font-medium transition-colors">
              {dict.allCredits.breadcrumb.home}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/${params.lang}/credits`} className="hover:text-primary font-medium transition-colors">
              {dict.allCredits.breadcrumb.credits}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-slate-900 font-semibold">{dict.allCredits.breadcrumb.allCredits}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-2">
        <div className="container-custom">
          <div
            style={{
              animation: 'fadeInUp 0.6s ease-out both'
            }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                  {dict.allCredits.hero.title}
                </h1>
                <p className="text-lg text-gray-600 mt-2 font-medium">
                  {dict.allCredits.hero.subtitle.replace('{count}', CREDIT_OFFERS.length.toString())}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative pb-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}
              style={{
                animation: 'fadeInUp 0.6s ease-out 0.2s both'
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-primary/5 rounded-2xl blur-xl translate-y-1"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="relative flex items-center gap-3">
                      <Filter className="w-6 h-6 text-white" />
                      <h2 className="text-xl font-black text-white tracking-tight">
                        {dict.allCredits.filters.title}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Credit Type Filter */}
                    <div>
                      <h3 className="text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide">
                        {dict.allCredits.filters.creditType}
                      </h3>
                      <div className="space-y-2">
                        {[
                          { value: 'all', label: dict.allCredits.creditTypes.all },
                          { value: 'online', label: dict.allCredits.creditTypes.online },
                          { value: 'cash', label: dict.allCredits.creditTypes.cash },
                          { value: 'microcredit', label: dict.allCredits.creditTypes.microcredit },
                          { value: 'credit-line', label: dict.allCredits.creditTypes.creditLine },
                          { value: 'refinancing', label: dict.allCredits.creditTypes.refinancing },
                          { value: 'secured', label: dict.allCredits.creditTypes.secured },
                        ].map((type) => (
                          <button
                            key={type.value}
                            onClick={() => setSelectedType(type.value as CreditType)}
                            className={`w-full text-left px-4 py-2.5 rounded-xl font-bold transition-all ${
                              selectedType === type.value
                                ? 'bg-rose-500 text-white shadow-lg'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Min Amount Filter */}
                    <div>
                      <h3 className="text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide">
                        {dict.allCredits.filters.minAmount}
                      </h3>
                      <input
                        type="number"
                        value={minAmount || ''}
                        onChange={(e) => setMinAmount(Number(e.target.value))}
                        className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary font-bold text-slate-900"
                        placeholder="0"
                        min="0"
                        step="1000"
                      />
                    </div>

                    {/* Quick Filters */}
                    <div>
                      <h3 className="text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide">
                        {dict.allCredits.filters.quickFilters}
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={onlyInstant}
                            onChange={(e) => setOnlyInstant(e.target.checked)}
                            className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-2 focus:ring-primary"
                          />
                          <span className="font-medium text-gray-700 group-hover:text-slate-900">
                            {dict.allCredits.filters.instantDecision}
                          </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={onlyOnline}
                            onChange={(e) => setOnlyOnline(e.target.checked)}
                            className="w-5 h-5 rounded border-2 border-gray-300 text-primary focus:ring-2 focus:ring-primary"
                          />
                          <span className="font-medium text-gray-700 group-hover:text-slate-900">
                            {dict.allCredits.filters.onlineApplication}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Reset Filters */}
                    {hasActiveFilters && (
                      <button
                        onClick={resetFilters}
                        className="w-full px-6 py-3 bg-rose-50 text-rose-700 rounded-xl font-bold hover:bg-rose-100 transition-all"
                      >
                        {dict.allCredits.filters.resetFilters}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* Credits List */}
            <div className="flex-1">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full mb-6 px-6 py-4 bg-white rounded-2xl shadow-lg border border-gray-200 flex items-center justify-between font-bold text-slate-900"
              >
                <span className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  {dict.allCredits.filters.mobileToggle}
                  {hasActiveFilters && (
                    <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {dict.allCredits.filters.activeFilters}
                    </span>
                  )}
                </span>
                {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {/* Sort & Results Bar */}
              <div
                className="relative mb-8"
                style={{
                  animation: 'fadeInUp 0.6s ease-out 0.3s both'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-transparent rounded-2xl blur-lg translate-y-1"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-6 flex-wrap">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{dict.allCredits.results.found}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-2xl font-black text-slate-900">
                            {sortedCredits.length}
                          </span>
                          <span className="text-sm font-medium text-gray-600">
                            {sortedCredits.length === 1 ? dict.allCredits.results.offer_one : sortedCredits.length < 5 ? dict.allCredits.results.offer_few : dict.allCredits.results.offer_many}
                          </span>
                        </div>
                      </div>

                      <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{dict.allCredits.sorting.label}</span>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as SortOption)}
                          className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary font-bold text-slate-900 hover:border-primary/50 transition-all shadow-sm"
                        >
                          <option value="rating">{dict.allCredits.sorting.byRating}</option>
                          <option value="minRate">{dict.allCredits.sorting.byRate}</option>
                          <option value="maxAmount">{dict.allCredits.sorting.byAmount}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Credits Grid */}
              {sortedCredits.length === 0 ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-transparent rounded-3xl blur-xl"></div>

                  <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 p-16 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <CreditCard className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">{dict.allCredits.empty.title}</h3>
                    <p className="text-gray-600 font-medium mb-6">{dict.allCredits.empty.description}</p>
                    <button
                      onClick={resetFilters}
                      className="bg-rose-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-rose-600 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                    >
                      {dict.allCredits.empty.resetButton}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {sortedCredits.map((credit, idx) => (
                    <div
                      key={credit.id}
                      className="relative group"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${0.4 + idx * 0.1}s both`
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-transparent rounded-2xl blur-xl translate-y-1 group-hover:translate-y-2 transition-transform"></div>

                      <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all">
                        {/* Top accent bar */}
                        <div className={`h-1.5 bg-gradient-to-r ${credit.color}`}></div>

                        <div className="p-6 sm:p-8">
                          <div className="flex flex-col lg:flex-row gap-6">
                            {/* Bank Info */}
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
                                <Image
                                  src={credit.logo}
                                  alt={credit.bank}
                                  width={256}
                                  height={150}
                                  className="object-contain"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-2xl font-black text-slate-900">
                                      {credit.bank}
                                    </h3>
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                                      {credit.typeName}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                      <span className="font-bold text-slate-900">{credit.rating}</span>
                                      <span className="text-sm text-gray-500">({credit.reviews})</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Clock className="w-4 h-4 text-gray-400" />
                                      <span className="text-sm font-medium text-gray-600">
                                        {credit.approvalTime}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Key Info Grid */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Wallet className="w-4 h-4 text-green-600" />
                                    <span className="text-xs font-bold text-gray-600 uppercase">{dict.allCredits.creditCard.amount}</span>
                                  </div>
                                  <div className="text-lg font-black text-slate-900">
                                    {credit.minAmount.toLocaleString()} - {credit.maxAmount.toLocaleString()} ₴
                                  </div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Percent className="w-4 h-4 text-blue-600" />
                                    <span className="text-xs font-bold text-gray-600 uppercase">{dict.allCredits.creditCard.rate}</span>
                                  </div>
                                  <div className="text-lg font-black text-slate-900">
                                    {credit.minRate}%
                                  </div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-4 h-4 text-purple-600" />
                                    <span className="text-xs font-bold text-gray-600 uppercase">{dict.allCredits.creditCard.term}</span>
                                  </div>
                                  <div className="text-lg font-black text-slate-900">
                                    {`${credit.minTerm} ${dict.allCredits.creditCard.days}`} - {credit.maxTerm > 12 ? `${credit.maxTerm} ${dict.allCredits.creditCard.days}` : `${credit.maxTerm} ${dict.allCredits.creditCard.months}`}
                                  </div>
                                </div>

                                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Clock className="w-4 h-4 text-orange-600" />
                                    <span className="text-xs font-bold text-gray-600 uppercase">{dict.allCredits.creditCard.approval}</span>
                                  </div>
                                  <div className="text-lg font-black text-slate-900">
                                    {credit.approvalTime}
                                  </div>
                                </div>
                              </div>

                              {/* Features */}
                              <div className="mb-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {credit.features.slice(0, expandedCard === credit.id ? undefined : 4).map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                      <span className="text-sm font-medium text-gray-700">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                                {credit.features.length > 4 && (
                                  <button
                                    onClick={() => setExpandedCard(expandedCard === credit.id ? null : credit.id)}
                                    className="mt-3 text-sm font-bold text-primary hover:text-primary/80 flex items-center gap-1"
                                  >
                                    {expandedCard === credit.id ? (
                                      <>
                                        {dict.allCredits.creditCard.collapse} <ChevronUp className="w-4 h-4" />
                                      </>
                                    ) : (
                                      <>
                                        {dict.allCredits.creditCard.showMore} <ChevronDown className="w-4 h-4" />
                                      </>
                                    )}
                                  </button>
                                )}
                              </div>

                              {/* Badges */}
                              <div className="flex flex-wrap gap-2">
                                {credit.onlineApplication && (
                                  <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-lg flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" />
                                    {dict.allCredits.creditCard.badges.onlineApplication}
                                  </span>
                                )}
                                {credit.instantDecision && (
                                  <span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    {dict.allCredits.creditCard.badges.instantDecision}
                                  </span>
                                )}
                                {!credit.requiresCollateral && (
                                  <span className="px-3 py-1.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-lg flex items-center gap-1">
                                    <Shield className="w-3 h-3" />
                                    {dict.allCredits.creditCard.badges.noCollateral}
                                  </span>
                                )}
                              </div>

                              {/* NBU Links */}
                              {(credit.essential_characteristics || credit.warning) && (
                                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                                  {credit.essential_characteristics && (
                                    <a
                                      href={credit.essential_characteristics}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                                    >
                                      <Info className="w-4 h-4" />
                                      {dict.allCredits.creditCard.essentialCharacteristics}
                                    </a>
                                  )}
                                  {credit.warning && (
                                    <a
                                      href={credit.warning}
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
                            </div>

                            {/* Action Buttons */}
                            <div className="lg:w-48 flex flex-col gap-3">
                              <a
                                href={credit.creditUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-rose-500 text-white px-6 py-4 rounded-xl font-black text-lg hover:bg-rose-600 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
                              >
                                <CheckCircle className="w-5 h-5" />
                                {dict.allCredits.creditCard.apply}
                              </a>
                              <Link
                                href={`/${params.lang}/credits/${credit.id}`}
                                className="w-full px-6 py-3 border-2 border-rose-500 text-rose-600 rounded-xl font-bold hover:bg-rose-500 hover:text-white transition-all text-center"
                              >
                                {dict.allCredits.creditCard.details}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="relative pb-16">
        <div className="container-custom">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-700 to-rose-600 rounded-3xl blur-2xl opacity-20"></div>

            <div className="relative bg-gradient-to-r from-rose-500 to-rose-600 rounded-3xl p-8 sm:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>

              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <Info className="w-4 h-4 text-white" />
                  <span className="text-sm font-bold text-white uppercase tracking-wider">
                    {dict.allCredits.infoBanner.badge}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">
                  {dict.allCredits.infoBanner.title}
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                      <Percent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{dict.allCredits.infoBanner.tip1.title}</h3>
                    <p className="text-white/80 leading-relaxed">
                      {dict.allCredits.infoBanner.tip1.description}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{dict.allCredits.infoBanner.tip2.title}</h3>
                    <p className="text-white/80 leading-relaxed">
                      {dict.allCredits.infoBanner.tip2.description}
                    </p>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{dict.allCredits.infoBanner.tip3.title}</h3>
                    <p className="text-white/80 leading-relaxed">
                      {dict.allCredits.infoBanner.tip3.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="relative pb-16">
        <div className="container-custom">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-transparent rounded-3xl blur-xl"></div>

            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 p-8 sm:p-12">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-12 text-center tracking-tight">
                {dict.allCredits.trustSection.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Years Stat */}
                <div className="text-center">
                  <div className="mb-4">
                    <span className="text-5xl md:text-6xl font-black text-rose-500">
                      {dict.allCredits.trustSection.stats.years.value}
                    </span>
                    <span className="text-2xl font-bold text-slate-900 ml-2">
                      {dict.allCredits.trustSection.stats.years.label}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">
                    {dict.allCredits.trustSection.stats.years.description}
                  </p>
                </div>

                {/* Credits Stat */}
                <div className="text-center">
                  <div className="mb-4">
                    <span className="text-5xl md:text-6xl font-black text-rose-500">
                      {dict.allCredits.trustSection.stats.credits.value}
                    </span>
                    <span className="text-2xl font-bold text-slate-900 ml-2">
                      {dict.allCredits.trustSection.stats.credits.label}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">
                    {dict.allCredits.trustSection.stats.credits.description}
                  </p>
                </div>

                {/* Amount Stat */}
                <div className="text-center">
                  <div className="mb-4">
                    <span className="text-5xl md:text-6xl font-black text-rose-500">
                      {dict.allCredits.trustSection.stats.amount.value}
                    </span>
                    <span className="text-2xl font-bold text-slate-900 ml-2">
                      {dict.allCredits.trustSection.stats.amount.label}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">
                    {dict.allCredits.trustSection.stats.amount.description}
                  </p>
                </div>

                {/* Partners Stat */}
                <div className="text-center">
                  <div className="mb-4">
                    <span className="text-5xl md:text-6xl font-black text-rose-500">
                      {dict.allCredits.trustSection.stats.partners.value}
                    </span>
                    <span className="text-2xl font-bold text-slate-900 ml-2">
                      {dict.allCredits.trustSection.stats.partners.label}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">
                    {dict.allCredits.trustSection.stats.partners.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* People Often Search Section */}
      <section className="relative py-8">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 rounded-3xl shadow-xl border border-rose-200 p-8 sm:p-12">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 text-center">
              {dict.allCredits.peopleOftenSearch.title}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {dict.allCredits.peopleOftenSearch.links.map((link, idx) => (
                <Link
                  key={idx}
                  href={`/${params.lang}${link.href}`}
                  className="group relative bg-white hover:bg-gradient-to-br hover:from-rose-500 hover:to-pink-600 rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 border border-rose-100 hover:border-transparent"
                >
                  <span className="text-sm font-bold text-slate-800 group-hover:text-white transition-colors duration-300 text-center block">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Section */}
      <section className="relative pb-16">
        <div className="container-custom">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-transparent rounded-3xl blur-xl"></div>

            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Article Header */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8 sm:p-12">
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {dict.allCredits.articleSection.title}
                </h2>
              </div>

              <div className="p-8 sm:p-12">
                {/* Table of Contents */}
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 mb-8 border border-rose-200">
                  <h3 className="text-xl font-black text-slate-900 mb-4">
                    {dict.allCredits.articleSection.tableOfContents.title}
                  </h3>
                  <ol className="space-y-3">
                    {dict.allCredits.articleSection.tableOfContents.items.map((item, idx) => (
                      <li key={item.id} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-7 h-7 bg-rose-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </span>
                        <a
                          href={`#${item.id}`}
                          className="text-slate-900 font-medium hover:text-rose-600 transition-colors"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  {/* Intro */}
                  <p className="text-gray-700 leading-relaxed mb-8">
                    {dict.allCredits.articleSection.content.intro.text}
                  </p>

                  {/* Who Issues */}
                  <div id="who-issues" className="mb-8">
                    <h3 className="text-2xl font-black text-slate-900 mb-4">
                      {dict.allCredits.articleSection.content.whoIssues.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {dict.allCredits.articleSection.content.whoIssues.text}
                    </p>
                  </div>

                  {/* Comparison */}
                  <div id="comparison" className="mb-8">
                    <h3 className="text-2xl font-black text-slate-900 mb-6">
                      {dict.allCredits.articleSection.content.comparison.title}
                    </h3>

                    {/* Banks */}
                    <div className="mb-6">
                      <h4 className="text-xl font-bold text-slate-900 mb-3">
                        {dict.allCredits.articleSection.content.comparison.banks.title}
                      </h4>
                      <ul className="space-y-2 mb-4">
                        {dict.allCredits.articleSection.content.comparison.banks.advantages.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm font-bold text-gray-600 mb-2">Недоліки:</p>
                      <ul className="space-y-2">
                        {dict.allCredits.articleSection.content.comparison.banks.disadvantages.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Info className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* MFO */}
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">
                        {dict.allCredits.articleSection.content.comparison.mfo.title}
                      </h4>
                      <ul className="space-y-2 mb-4">
                        {dict.allCredits.articleSection.content.comparison.mfo.advantages.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm font-bold text-gray-600 mb-2">Недоліки:</p>
                      <ul className="space-y-2">
                        {dict.allCredits.articleSection.content.comparison.mfo.disadvantages.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Info className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Online Microcredit */}
                  <div id="online-microcredit" className="mb-8">
                    <h3 className="text-2xl font-black text-slate-900 mb-4">
                      {dict.allCredits.articleSection.content.onlineMicrocredit.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {dict.allCredits.articleSection.content.onlineMicrocredit.intro}
                    </p>

                    {/* Steps */}
                    <div className="space-y-6 mb-8">
                      {dict.allCredits.articleSection.content.onlineMicrocredit.steps.map((step) => (
                        <div key={step.number} className="relative pl-16">
                          <div className="absolute left-0 top-0 w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-xl font-black text-white">{step.number}</span>
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
                            <p className="text-gray-700">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Requirements */}
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6 border border-blue-200">
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-blue-600" />
                        {dict.allCredits.articleSection.content.onlineMicrocredit.requirements.title}
                      </h4>
                      <ul className="space-y-2">
                        {dict.allCredits.articleSection.content.onlineMicrocredit.requirements.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tips */}
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
                      <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-amber-600" />
                        {dict.allCredits.articleSection.content.onlineMicrocredit.tips.title}
                      </h4>
                      <ul className="space-y-2">
                        {dict.allCredits.articleSection.content.onlineMicrocredit.tips.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <TrendingUp className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
