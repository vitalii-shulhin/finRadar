'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CreditCard,
  Filter,
  Star,
  TrendingUp,
  Gift,
  Percent,
  Calendar,
  Shield,
  Sparkles,
  Award,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { CARDS_DATA } from '@/data/cards';

type CardType = 'all' | 'credit' | 'debit';
type SortOption = 'popular' | 'cashback' | 'limit' | 'rate';

export default function CardsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = getDictionary(params.lang);
  const [cardType, setCardType] = useState<CardType>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const banks = Array.from(new Set(CARDS_DATA.map(card => card.bank)));

  const filteredCards = CARDS_DATA.filter(card => {
    if (cardType !== 'all' && card.type !== cardType) return false;
    if (selectedBanks.length > 0 && !selectedBanks.includes(card.bank)) return false;
    return true;
  });

  const sortedCards = [...filteredCards].sort((a, b) => {
    if (sortBy === 'popular') {
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return b.rating - a.rating;
    }
    if (sortBy === 'cashback') {
      const aCashback = parseFloat(a.cashback?.replace(/[^\d.]/g, '') || '0');
      const bCashback = parseFloat(b.cashback?.replace(/[^\d.]/g, '') || '0');
      return bCashback - aCashback;
    }
    if (sortBy === 'limit') {
      const aLimit = parseFloat(a.creditLimit?.replace(/[^\d]/g, '') || '0');
      const bLimit = parseFloat(b.creditLimit?.replace(/[^\d]/g, '') || '0');
      return bLimit - aLimit;
    }
    if (sortBy === 'rate') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const toggleBank = (bank: string) => {
    setSelectedBanks(prev =>
      prev.includes(bank)
        ? prev.filter(b => b !== bank)
        : [...prev, bank]
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-indigo-500/5 to-transparent blur-3xl"></div>
      </div>

      {/* Breadcrumb - Refined */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Link href={`/${params.lang}`} className="text-gray-600 hover:text-primary transition-colors">
              {dict.common.home}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-slate-900 font-semibold">{dict.common.cards}</span>
          </div>
        </div>
      </div>

      {/* Hero - Magazine-Style Editorial Header */}
      <section className="relative py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>

        <div className="container-custom relative">
          <div className="max-w-6xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
              <span className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                {dict.cards.financialInstruments}
              </span>
            </div>

            {/* Main Heading - Bold Typography */}
            <h1 className="text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-none">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 bg-clip-text text-transparent">
                {dict.cards.title.split(' ')[0]}{' '}
              </span>
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                {dict.cards.title.split(' ')[1]}
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-gray-600 font-medium max-w-2xl leading-relaxed mb-8">
              {filteredCards.length} {cardType === 'credit' ? dict.cards.creditCards.toLowerCase() : cardType === 'debit' ? dict.cards.debitCards.toLowerCase() : dict.cards.allCards.toLowerCase()} {dict.cards.subtitle}
            </p>

            {/* Quick Actions - Refined Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${params.lang}/cards/${params.lang === 'uk' ? 'kreditni-kartky' : 'kreditnye-karty'}`}
                className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  {dict.cards.creditCards}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-30 transition-opacity"></div>
              </Link>
              <Link
                  href={`/${params.lang}/cards/${params.lang === 'uk' ? 'kreditni-kartky' : 'kreditnye-karty'}/reytyng`}
                  className="group relative px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl font-bold overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  {params.lang === 'uk' ? 'Рейтинг TOP-3' : 'Рейтинг TOP-3'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-600 opacity-0 group-hover:opacity-30 transition-opacity"></div>
              </Link>
              <Link
                  href={`/${params.lang}/cards/${params.lang === 'uk' ? 'kreditni-kartky' : 'kreditnye-karty'}/${params.lang === 'uk' ? 'bez-vidmovy' : 'bez-otkaza'}`}
                  className="group relative px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {params.lang === 'uk' ? 'Без відмови' : 'Без отказа'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 opacity-0 group-hover:opacity-30 transition-opacity"></div>
              </Link>

              <Link
                  href={`/${params.lang}/calc/credit`}
                  className="group relative px-6 py-3 bg-slate-900 text-white rounded-xl font-bold overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  {dict.cards.creditCalculator}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>

              <Link
                href={`/${params.lang}/calc/deposit`}
                className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-900 rounded-xl font-bold hover:border-primary hover:text-primary transition-all shadow-sm hover:shadow-lg"
              >
                {dict.cards.depositCalculator}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Magazine Layout */}
      <section className="relative pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Sidebar - Refined Filters (3 columns) */}
            <aside className={`lg:col-span-4 space-y-6 ${showFilters ? '' : 'hidden lg:block'}`}>
              {/* Filter Panel */}
              <div className="sticky top-8">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  {/* Header with accent - Now Accordion Toggle */}
                  <button
                    onClick={() => setShowFilterPanel(!showFilterPanel)}
                    className="w-full bg-gradient-to-r from-slate-900 to-slate-800 p-6"
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-black text-white flex items-center gap-2 uppercase tracking-wide">
                        <Filter className="w-4 h-4" />
                        {dict.cards.filters}
                      </h2>
                      <div className="flex items-center gap-3">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBanks([]);
                            setCardType('all');
                          }}
                          className="text-xs text-white/70 hover:text-white font-bold uppercase tracking-wider"
                        >
                          {dict.cards.clearFilters}
                        </div>
                        {showFilterPanel ? (
                          <ChevronUp className="w-5 h-5 text-white" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-white/70" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Accordion Content */}
                  {showFilterPanel && (
                    <div className="p-6 space-y-6">
                    {/* Card Type Filter - Premium Radio Style */}
                    <div>
                      <h3 className="font-black text-slate-900 mb-4 uppercase tracking-wide text-sm">{dict.cards.filterByType}</h3>
                      <div className="space-y-2">
                        {[
                          { value: 'all' as CardType, label: dict.cards.allCards, count: CARDS_DATA.length },
                          { value: 'credit' as CardType, label: dict.cards.creditCards, count: CARDS_DATA.filter(c => c.type === 'credit').length },
                          { value: 'debit' as CardType, label: dict.cards.debitCards, count: CARDS_DATA.filter(c => c.type === 'debit').length },
                        ].map(option => (
                          <button
                            key={option.value}
                            onClick={() => setCardType(option.value)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all border-2 ${
                              cardType === option.value
                                ? 'bg-slate-900 border-slate-900 text-white shadow-lg'
                                : 'bg-gray-50 border-gray-100 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <span>{option.label}</span>
                            <span className={`float-right text-sm ${cardType === option.value ? 'text-white/70' : 'text-gray-400'}`}>
                              {option.count}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bank Filter - Refined Checkboxes */}
                    <div>
                      <h3 className="font-black text-slate-900 mb-4 uppercase tracking-wide text-sm">{dict.cards.filterByBank}</h3>
                      <div className="space-y-2">
                        {banks.map(bank => (
                          <label
                            key={bank}
                            className={`flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-3 rounded-xl transition-all border ${
                              selectedBanks.includes(bank) ? 'border-slate-200 bg-slate-50' : 'border-transparent'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedBanks.includes(bank)}
                              onChange={() => toggleBank(bank)}
                              className="w-5 h-5 text-slate-900 rounded-lg focus:ring-2 focus:ring-primary"
                            />
                            <span className="text-sm font-semibold text-slate-800 flex-1">{bank}</span>
                            <span className="text-xs font-bold text-gray-400">
                              {CARDS_DATA.filter(c => c.bank === bank).length}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  )}
                </div>

                {/* Info Card - Premium Design */}
                {showFilterPanel && (
                  <div className="mt-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100/50 shadow-lg">
                  <h3 className="font-black mb-4 flex items-center gap-2 text-slate-900 uppercase tracking-wide text-sm">
                    <Shield className="w-5 h-5 text-blue-600" />
                    {dict.cards.security}
                  </h3>
                  <div className="text-sm text-slate-700 space-y-2 font-medium">
                    <p className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">✓</span>
                      <span>{dict.cards.security3D}</span>
                    </p>
                    <p className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">✓</span>
                      <span>{dict.cards.depositGuarantee}</span>
                    </p>
                  </div>
                </div>
                )}
              </div>
            </aside>

            {/* Main Content Area (9 columns) */}
            <div className="lg:col-span-8">
              {/* Sort Bar - Editorial Style */}
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-5 mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-slate-400 uppercase tracking-wider">{dict.cards.sortBy}</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="px-5 py-2.5 bg-slate-50 border-2 border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="popular">{dict.cards.popular}</option>
                        <option value="cashback">{dict.cards.byCashback}</option>
                        <option value="limit">{dict.cards.byLimit}</option>
                        <option value="rate">{dict.cards.byRating}</option>
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    {dict.cards.filters}
                  </button>
                </div>
              </div>

              {/* Cards Grid - Premium Editorial Layout */}
              {sortedCards.length === 0 ? (
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-16 text-center">
                  <CreditCard className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                  <h3 className="text-2xl font-black mb-3 text-slate-900">{dict.cards.noResults}</h3>
                  <p className="text-gray-600 mb-6 font-medium">
                    {dict.cards.noResultsDesc}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedBanks([]);
                      setCardType('all');
                    }}
                    className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
                  >
                    {dict.cards.resetFilters}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {sortedCards.map((card, index) => (
                    <article
                      key={card.id}
                      className="group bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                      }}
                    >
                      {/* Top accent bar */}
                      <div className={`h-1.5 bg-gradient-to-r ${card.color}`}></div>

                      <div className="p-8">
                        {/* Card Header - Magazine Style */}
                        <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-6">
                          <div className="flex flex-col sm:flex-row items-start gap-6 flex-1 w-full">
                            <Image
                              src={card.bankLogo}
                              alt={`${card.bank} logo`}
                              width={256}
                              height={150}
                              className="object-contain"
                            />
                            <div className="flex-1 w-full">
                              <div className="flex items-center gap-3 mb-2 flex-wrap">
                                <h3 className="text-2xl font-black text-slate-900">
                                  {card.bank} {card.name}
                                </h3>
                                {card.recommended && (
                                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-xs px-3 py-1.5 rounded-full font-black shadow-lg">
                                    <Award className="w-3 h-3" />
                                    TOP
                                  </span>
                                )}
                                {card.popular && (
                                  <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1.5 rounded-full font-black shadow-lg">
                                    🔥 Популярна
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-sm flex-wrap">
                                <span className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wide text-xs ${
                                  card.type === 'credit'
                                    ? 'bg-blue-100 text-blue-900'
                                    : 'bg-emerald-100 text-emerald-900'
                                }`}>
                                  {card.type === 'credit' ? 'Кредитна' : 'Дебетова'}
                                </span>
                                <span className="text-gray-600 font-semibold">{card.variant}</span>
                                <div className="flex items-center gap-1.5">
                                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                  <span className="font-black text-slate-900">{card.rating}</span>
                                  <span className="text-gray-500 font-medium">({card.reviews})</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Key Metrics - Premium Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                          {card.creditLimit && (
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-100">
                              <div className="text-xs font-black text-slate-600 uppercase tracking-wider mb-1">Ліміт</div>
                              <div className="font-black text-blue-900 text-lg">{card.creditLimit}</div>
                            </div>
                          )}
                          {card.gracePeriod && (
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-100">
                              <div className="text-xs font-black text-slate-600 uppercase tracking-wider mb-1">Пільговий</div>
                              <div className="font-black text-purple-900 flex items-center gap-1.5 text-lg">
                                <Calendar className="w-4 h-4" />
                                {card.gracePeriod} дн
                              </div>
                            </div>
                          )}
                          {card.cashback && (
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-100">
                              <div className="text-xs font-black text-slate-600 uppercase tracking-wider mb-1">Кешбек</div>
                              <div className="font-black text-emerald-900 flex items-center gap-1.5 text-lg">
                                <Gift className="w-4 h-4" />
                                {card.cashback}
                              </div>
                            </div>
                          )}
                          <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-4 rounded-2xl border border-slate-100">
                            <div className="text-xs font-black text-slate-600 uppercase tracking-wider mb-1">{dict.cards.annualFee}</div>
                            <div className="font-black text-slate-900 text-lg">{card.annualFee}</div>
                          </div>
                        </div>

                        {/* Features - Clean List */}
                        <div className="mb-6">
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-4">{dict.cards.features}</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {card.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-sm">
                                <span className="text-emerald-600 font-black text-base mt-0.5">✓</span>
                                <span className="text-slate-700 font-medium">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {card.interestRate && (
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-2xl p-4 mb-6">
                            <div className="flex items-center gap-2.5 text-sm">
                              <Percent className="w-5 h-5 text-blue-600" />
                              <span className="text-slate-700 font-medium">
                                Ставка: <span className="font-black text-slate-900">{card.interestRate}</span>
                              </span>
                            </div>
                          </div>
                        )}

                        {/* NBU Links */}
                        {(card.essential_characteristics || card.warning) && (
                          <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-gray-100">
                            {card.essential_characteristics && (
                              <a href={card.essential_characteristics} target="_blank" rel="noopener noreferrer"
                                 className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1">
                                <Info className="w-4 h-4" />
                                {dict.allCredits.creditCard.essentialCharacteristics}
                              </a>
                            )}
                            {card.warning && (
                              <a href={card.warning} target="_blank" rel="noopener noreferrer"
                                 className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1">
                                <Info className="w-4 h-4" />
                                {dict.allCredits.creditCard.warning}
                              </a>
                            )}
                          </div>
                        )}

                        {/* Actions - Bold CTA */}
                        <div className="flex gap-4">
                          {card.cardUrl ? (
                            <a
                              href={card.cardUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-slate-800 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl text-center"
                            >
                              {dict.cards.orderCard}
                            </a>
                          ) : card.cardUrlIOS || card.cardUrlAndroid ? (
                            <div className="flex-1 flex gap-2">
                              {card.cardUrlIOS && (
                                <a
                                  href={card.cardUrlIOS}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-slate-800 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl text-center"
                                >
                                  iOS
                                </a>
                              )}
                              {card.cardUrlAndroid && (
                                <a
                                  href={card.cardUrlAndroid}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-slate-800 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl text-center"
                                >
                                  Android
                                </a>
                              )}
                            </div>
                          ) : (
                            <button className="flex-1 bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-slate-800 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl">
                              {dict.cards.orderCard}
                            </button>
                          )}
                          <Link
                            href={`/${params.lang}/cards/${card.id}`}
                            className="px-8 py-4 border-3 border-slate-900 text-slate-900 rounded-xl font-black hover:bg-slate-900 hover:text-white transition-all text-center"
                          >
                            {dict.cards.details}
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative py-20">
        <div className="container-custom">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary/30 to-transparent blur-3xl"></div>

            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
              <Sparkles className="w-12 h-12 text-white mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
                {dict.cards.dontKnowWhichCard}
              </h2>
              <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium">
                {dict.cards.expertsWillHelp}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/*<button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-black hover:bg-gray-100 transition-all shadow-xl hover:scale-105">*/}
                {/*  {dict.cards.expertConsultation}*/}
                {/*</button>*/}
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-black hover:bg-white/20 transition-all">
                  {dict.cards.compareCards}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Section */}
      <section className="relative pb-20">
        <div className="container-custom">
          <article className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-12 lg:p-16 prose prose-lg max-w-none">
              {/* Section 1 */}
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                Кредитні картки та кредити
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Одними з найбільш популярних банківських продуктів залишаються кредитні картки та кредити готівкою. Банки пропонують різні умови кредитування, кредитні ліміти, пільгові періоди та бонусні програми.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Кредитні картки можуть бути корисними для повсякденних покупок, оплати послуг, зняття готівки та інших фінансових потреб. Кредити готівкою часто використовуються для великих покупок, ремонту, лікування або перекредитування.
              </p>

              {/* Section 2 */}
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                Онлайн-банкінг та мобільні додатки
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Сучасні банки активно розвивають онлайн-банкінг та мобільні застосунки. Через особистий кабінет можна:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2.5 text-gray-700">
                  <span className="text-emerald-600 font-black text-base mt-0.5">✓</span>
                  <span>переглядати баланс</span>
                </li>
                <li className="flex items-start gap-2.5 text-gray-700">
                  <span className="text-emerald-600 font-black text-base mt-0.5">✓</span>
                  <span>переказувати кошти</span>
                </li>
                <li className="flex items-start gap-2.5 text-gray-700">
                  <span className="text-emerald-600 font-black text-base mt-0.5">✓</span>
                  <span>оплачувати комунальні послуги</span>
                </li>
                <li className="flex items-start gap-2.5 text-gray-700">
                  <span className="text-emerald-600 font-black text-base mt-0.5">✓</span>
                  <span>оформлювати депозити</span>
                </li>
                <li className="flex items-start gap-2.5 text-gray-700">
                  <span className="text-emerald-600 font-black text-base mt-0.5">✓</span>
                  <span>подавати заявки на кредитні продукти</span>
                </li>
              </ul>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Багато банків також пропонують кешбек, бонусні програми та додаткові сервіси для клієнтів.
              </p>

              {/* Section 3 */}
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                Як обрати банк
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Перед оформленням кредитної картки, кредиту чи іншого банківського продукту рекомендується звернути увагу на:
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start gap-2.5 text-gray-700">
                  <span className="text-emerald-600 font-black text-base mt-0.5">✓</span>
                  <span>процентні ставки</span>
                </li>
                <li className="flex items-start gap-2.5 text-gray-700">
                  <span className="text-emerald-600 font-black text-base mt-0.5">✓</span>
                  <span>умови обслуговування</span>
                </li>
                <li className="flex items-start gap-2.5 text-gray-700">
                  <span className="text-emerald-600 font-black text-base mt-0.5">✓</span>
                  <span>кредитний ліміт</span>
                </li>
                <li className="flex items-start gap-2.5 text-gray-700">
                  <span className="text-emerald-600 font-black text-base mt-0.5">✓</span>
                  <span>комісії</span>
                </li>
                <li className="flex items-start gap-2.5 text-gray-700">
                  <span className="text-emerald-600 font-black text-base mt-0.5">✓</span>
                  <span>мобільний додаток</span>
                </li>
                <li className="flex items-start gap-2.5 text-gray-700">
                  <span className="text-emerald-600 font-black text-base mt-0.5">✓</span>
                  <span>відгуки клієнтів</span>
                </li>
              </ul>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Порівняння кількох банків допоможе знайти найвигідніші умови для ваших потреб.
              </p>

              {/* Conclusion */}
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
                Висновок
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Банки України пропонують широкий вибір фінансових продуктів та послуг. Порівняння умов, тарифів та можливостей різних банків допоможе обрати оптимальний варіант для кредитування, заощаджень або повсякденного використання.
              </p>
            </div>
          </article>
        </div>
      </section>

      <div className="h-20"></div>

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
      `}</style>
    </div>
  );
}
