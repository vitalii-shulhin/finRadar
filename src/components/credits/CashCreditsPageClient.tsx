'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Wallet,
  Building2,
  Star,
  Clock,
  CheckCircle,
  Shield,
  TrendingUp,
  Award,
  Filter,
  ChevronDown,
  ChevronUp,
  Banknote,
  FileCheck,
  Users,
  HandCoins,
  Sparkles,
  Info
} from 'lucide-react';
import { CASH_CREDIT_PRODUCTS } from '@/data/cashCreditProducts';
import { type MicrocreditProduct } from '@/data/microcreditProducts';
import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';

type SortOption = 'recommended' | 'rate' | 'amount' | 'term';

interface CashCreditsPageClientProps {
  lang: Locale;
}

export default function CashCreditsPageClient({ lang }: CashCreditsPageClientProps) {
  const dict = getDictionary(lang);
  const [loanAmount, setLoanAmount] = useState(3000);
  const [loanTerm, setLoanTerm] = useState(15);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [selectedLenders, setSelectedLenders] = useState<string[]>([]);
  const [minAmount, setMinAmount] = useState(500);
  const [showFilters, setShowFilters] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);

  const lenders = Array.from(new Set(CASH_CREDIT_PRODUCTS.map(p => p.lender)));

  const filteredProducts = useMemo(() => {
    let results = CASH_CREDIT_PRODUCTS;

    // results = results.filter(p => loanAmount >= p.minAmount && loanAmount <= p.maxAmount);
    // results = results.filter(p => loanTerm >= p.minTerm && loanTerm <= p.maxTerm);
    // results = results.filter(p => p.maxAmount >= minAmount);
    //
    // if (selectedLenders.length > 0) {
    //   results = results.filter(p => selectedLenders.includes(p.lender));
    // }

    return results;
  }, [loanAmount, loanTerm, selectedLenders, minAmount]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'recommended') {
        if (a.recommended && !b.recommended) return -1;
        if (!a.recommended && b.recommended) return 1;
        return b.rating - a.rating;
      }
      if (sortBy === 'rate') return a.interestRateValue - b.interestRateValue;
      if (sortBy === 'amount') return b.maxAmount - a.maxAmount;
      if (sortBy === 'term') return b.maxTerm - a.maxTerm;
      return 0;
    });
  }, [filteredProducts, sortBy]);

  const toggleLender = (lender: string) => {
    setSelectedLenders(prev =>
      prev.includes(lender) ? prev.filter(l => l !== lender) : [...prev, lender]
    );
  };

  const calculateMonthlyPayment = () => {
    const monthlyRate = 0.015; // Average 1.5% per month
    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
                    (Math.pow(1 + monthlyRate, loanTerm) - 1);
    return Math.round(payment);
  };

  const faqData = lang === 'uk' ? [
    {
      question: 'Які документи потрібні для мікрокредиту?',
      answer: 'Для оформлення мікрокредиту зазвичай потрібні лише: паспорт громадянина України або ID-картка, ІПН (не завжди обов\'язковий), номер мобільного телефону та банківська картка для зарахування коштів. Довідки про доходи не потрібні.',
    },
    {
      question: 'Скільки часу розглядається заявка?',
      answer: 'Мікрокредити розглядаються дуже швидко - від 2 до 10 хвилин. Після автоматичного схвалення гроші зараховуються на картку протягом декількох хвилин, максимум - протягом години.',
    },
    {
      question: 'Що означає "перша позика під 0.01%"?',
      answer: 'Багато мікрокредиторів пропонують першу позику під мінімальну ставку 0.01% на день або навіть безкоштовно. Це дозволяє новим клієнтам скористатися послугою з мінімальною переплатою та оцінити якість обслуговування.',
    },
    {
      question: 'Чи можна погасити кредит достроково?',
      answer: 'Так, українське законодавство дозволяє дострокове погашення без штрафів. При достроковому погашенні кредитор перераховує відсотки лише за фактичні дні користування.',
    },
    {
      question: 'Що робити, якщо не можу вчасно повернути позику?',
      answer: 'Зв\'яжіться з кредитором до дати погашення. Більшість компаній пропонують продовження терміну (пролонгацію) або реструктуризацію боргу. Не ігноруйте проблему - це може призвести до штрафів та погіршення кредитної історії.',
    },
  ] : [
    {
      question: 'Какие документы нужны для микрокредита?',
      answer: 'Для оформления микрокредита обычно требуются только: паспорт гражданина Украины или ID-карта, ИНН (не всегда обязателен), номер мобильного телефона и банковская карта для зачисления средств. Справки о доходах не требуются.',
    },
    {
      question: 'Сколько времени рассматривается заявка?',
      answer: 'Микрокредиты рассматриваются очень быстро - от 2 до 10 минут. После автоматического одобрения деньги зачисляются на карту в течение нескольких минут, максимум - в течение часа.',
    },
    {
      question: 'Что означает "первый займ под 0.01%"?',
      answer: 'Многие микрокредиторы предлагают первый займ под минимальную ставку 0.01% в день или даже бесплатно. Это позволяет новым клиентам воспользоваться услугой с минимальной переплатой и оценить качество обслуживания.',
    },
    {
      question: 'Можно ли погасить кредит досрочно?',
      answer: 'Да, украинское законодательство разрешает досрочное погашение без штрафов. При досрочном погашении кредитор пересчитывает проценты только за фактические дни пользования.',
    },
    {
      question: 'Что делать, если не могу вовремя вернуть займ?',
      answer: 'Свяжитесь с кредитором до даты погашения. Большинство компаний предлагают продление срока (пролонгацию) или реструктуризацию долга. Не игнорируйте проблему - это может привести к штрафам и ухудшению кредитной истории.',
    },
  ];

  const t = dict.cashCredits;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* Breadcrumb */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href={`/${lang}`} className="hover:text-primary transition-colors font-medium">
              {dict.common.home}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/${lang}/credits`} className="hover:text-primary transition-colors font-medium">
              {dict.common.credits}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-slate-900 font-semibold">{t.title}</span>
          </div>
        </div>
      </div>

      {/* Premium Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 overflow-hidden">
        {/* Elegant background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`
          }}></div>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-900/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-blue-900/20 to-transparent"></div>

        <div className="container-custom relative z-10">
          <div className="flex items-start gap-8 mb-10">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-500 via-yellow-600 to-amber-700 rounded-3xl flex items-center justify-center shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
              <Building2 className="w-12 h-12 text-white relative z-10" />
            </div>
            <div className="flex-1">
              <h1 className="text-6xl font-black mb-4 tracking-tight bg-gradient-to-r from-white via-gray-100 to-amber-100 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl leading-relaxed font-light">
                {t.subtitle}
              </p>
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-amber-400">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-semibold">{t.badges.trusted}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-semibold">{t.badges.secure}</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-semibold">{t.badges.fast}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Navigation Tabs */}
          <div className="mt-10 overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-3 min-w-max">
              <Link
                href={`/${lang}/credits/online`}
                className="bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all"
              >
                {t.tabs.online}
              </Link>
              <Link
                href={`/${lang}/credits/microcredits`}
                className="bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all"
              >
                {t.tabs.microcredits}
              </Link>
              <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 px-6 py-3 rounded-xl font-black whitespace-nowrap shadow-2xl border-2 border-amber-400/50">
                {t.tabs.cash}
              </div>
              <Link
                href={`/${lang}/cards`}
                className="bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all"
              >
                {t.tabs.cards}
              </Link>
              <Link
                href={`/${lang}/credits/credit-line`}
                className="bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all"
              >
                {t.tabs.creditLine}
              </Link>
              <Link
                href={`/${lang}/credits/refinancing`}
                className="bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all"
              >
                {t.tabs.refinancing}
              </Link>
              <Link
                href={`/${lang}/credits/secured`}
                className="bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all"
              >
                {t.tabs.secured}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Calculator */}
      <div className="container-custom mt-16 relative z-20 mb-16">
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 relative overflow-hidden">
          {/* Accordion Header */}
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="w-full p-10 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl flex items-center justify-center shadow-xl">
                <Banknote className="w-7 h-7 text-amber-400" />
              </div>
              <div className="text-left">
                <h2 className="text-3xl font-black text-slate-900">{t.calculator.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{t.calculator.description}</p>
              </div>
            </div>
            {showCalculator ? (
              <ChevronUp className="w-8 h-8 text-slate-700 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-8 h-8 text-gray-400 flex-shrink-0" />
            )}
          </button>

          {/* Accordion Content */}
          {showCalculator && (
            <div className="px-10 pb-10">
              {/* Subtle gradient overlay */}
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-amber-50/50 to-transparent pointer-events-none"></div>

              <div className="relative z-10">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-bold mb-4 text-slate-800 uppercase tracking-wide">
                  {t.calculator.amount}
                </label>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #334155 0%, #334155 ${((loanAmount - 100) / 4900) * 100}%, #e5e7eb ${((loanAmount - 100) / 4900) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-500 font-semibold">100 ₴</span>
                  <div className="text-center">
                    <div className="text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      {loanAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-amber-600 font-semibold">{t.calculator.currency}</div>
                  </div>
                  <span className="text-xs text-gray-500 font-semibold">5 000 ₴</span>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-sm font-bold mb-4 text-slate-800 uppercase tracking-wide">
                  {t.calculator.term}
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #334155 0%, #334155 ${((loanTerm - 1) / 29) * 100}%, #e5e7eb ${((loanTerm - 1) / 29) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-500 font-semibold">1 {t.calculator.day}</span>
                  <div className="text-center">
                    <div className="text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                      {loanTerm}
                    </div>
                    <div className="text-sm text-amber-600 font-semibold">
                      {loanTerm === 1 ? t.calculator.day : loanTerm < 5 ? t.calculator.days : t.calculator.daysMany}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-semibold">30 {t.calculator.daysMany}</span>
                </div>
              </div>
            </div>

                {/* Premium Results */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                      <div className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-2">{t.calculator.monthlyPayment}</div>
                      <div className="text-3xl font-black">{calculateMonthlyPayment().toLocaleString()} ₴</div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-500 to-yellow-600 text-slate-900 p-6 rounded-2xl shadow-xl">
                    <div className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-2">{t.calculator.totalAmount}</div>
                    <div className="text-3xl font-black">{(calculateMonthlyPayment() * loanTerm).toLocaleString()} ₴</div>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-2xl shadow-xl">
                    <div className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-2">{t.calculator.overpayment}</div>
                    <div className="text-3xl font-black">{((calculateMonthlyPayment() * loanTerm) - loanAmount).toLocaleString()} ₴</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 rounded-2xl shadow-xl">
                    <div className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-2">{t.calculator.found}</div>
                    <div className="text-3xl font-black">{sortedProducts.length}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Refined Filters Sidebar */}
          <aside className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black flex items-center gap-2 text-slate-900">
                  <Filter className="w-5 h-5 text-slate-700" />
                  {t.filters.title}
                </h2>
                <button
                  onClick={() => {
                    setSelectedLenders([]);
                    setMinAmount(500);
                  }}
                  className="text-sm text-amber-600 hover:text-amber-700 font-bold"
                >
                  {t.filters.clear}
                </button>
              </div>

              {/* Min Amount Filter */}
              <div className="mb-6">
                <h3 className="font-bold mb-3 text-slate-800">{t.filters.minAmount}</h3>
                <input
                  type="range"
                  min="100"
                  max="5000"
                  step="100"
                  value={minAmount}
                  onChange={(e) => setMinAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-slate-700"
                />
                <div className="text-center mt-2">
                  <span className="text-lg font-bold text-slate-900">{minAmount.toLocaleString()} ₴</span>
                </div>
              </div>

              {/* Lenders Filter */}
              <div>
                <h3 className="font-bold mb-3 text-slate-800">{t.filters.lender}</h3>
                <div className="space-y-2">
                  {lenders.map(lender => (
                    <label
                      key={lender}
                      className={`flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-3 rounded-xl transition-all border-2 ${
                        selectedLenders.includes(lender) ? 'bg-slate-50 border-slate-200' : 'border-transparent'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedLenders.includes(lender)}
                        onChange={() => toggleLender(lender)}
                        className="w-5 h-5 text-slate-700 rounded focus:ring-2 focus:ring-slate-700"
                      />
                      <span className="text-sm font-semibold text-slate-800">{lender}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Premium Info Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-400" />
                  {t.security.title}
                </h3>
                <div className="text-sm text-gray-300 space-y-2">
                  <p>{t.security.verified}</p>
                  <p>{t.security.dataProtection}</p>
                  <p>{t.security.transparent}</p>
                  <p>{t.security.official}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Elegant Sort Bar */}
            <div className="bg-white rounded-2xl shadow-xl p-5 mb-8 border-2 border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 font-semibold uppercase tracking-wide">{t.sort.found}</span>
                    <span className="text-2xl font-black text-slate-900">
                      {sortedProducts.length}
                    </span>
                  </div>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-5 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-700 focus:border-slate-700 font-bold text-slate-800"
                  >
                    <option value="recommended">{t.sort.recommended}</option>
                    <option value="rate">{t.sort.byRate}</option>
                    <option value="amount">{t.sort.byAmount}</option>
                    <option value="term">{t.sort.byTerm}</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {t.filters.title}
                </button>
              </div>
            </div>

            {/* Premium Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-16 text-center border-2 border-gray-100">
                <Wallet className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-3 text-slate-900">{t.empty.title}</h3>
                <p className="text-gray-600 mb-6">{t.empty.description}</p>
              </div>
            ) : (
              <div className="space-y-8">
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 overflow-hidden group"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                    }}
                  >
                    <div className="p-8">
                      <div className="flex flex-col sm:flex-row items-start justify-between mb-6 gap-6">
                        <div className="flex flex-col sm:flex-row items-start gap-6 flex-1 w-full">
                          <Image
                            src={product.logo}
                            alt={product.lender}
                            width={256}
                            height={150}
                            className="object-contain"
                          />
                          <div className="flex-1 w-full">
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                              <h3 className="text-2xl font-black text-slate-900">{product.lender}</h3>
                              {product.recommended && (
                                <span className="bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-900 text-xs px-3 py-1.5 rounded-full font-black shadow-lg">
                                  ⭐ {t.badges.recommended}
                                </span>
                              )}
                              {product.popular && (
                                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs px-3 py-1.5 rounded-full font-black shadow-lg">
                                  🔥 {t.badges.popular}
                                </span>
                              )}
                              {product.firstLoanFree && (
                                <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs px-3 py-1.5 rounded-full font-black shadow-lg">
                                  💰 {t.badges.firstLoanFree}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span className="font-bold text-slate-800">{product.rating}</span>
                                <span className="text-gray-500">({product.reviews.toLocaleString()})</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-slate-700">
                                <Clock className="w-4 h-4" />
                                <span className="font-semibold">{product.approvalTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">{t.product.from}</div>
                          <div className="text-4xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            {product.minAmount.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600 font-semibold">{t.product.to} {product.maxAmount.toLocaleString()} ₴</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-4 rounded-2xl border border-slate-200">
                          <div className="text-xs text-gray-600 mb-1 font-semibold uppercase">{t.product.amount}</div>
                          <div className="font-black text-slate-900">
                            {product.minAmount.toLocaleString()} - {product.maxAmount.toLocaleString()} ₴
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-200">
                          <div className="text-xs text-gray-600 mb-1 font-semibold uppercase">{t.product.term}</div>
                          <div className="font-black text-blue-900">
                            до {product.maxTerm} {product.maxTerm === 1 ? t.calculator.day : product.maxTerm < 5 ? t.calculator.days : t.calculator.daysMany}
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-2xl border border-amber-200">
                          <div className="text-xs text-gray-600 mb-1 font-semibold uppercase">{t.product.rate}</div>
                          <div className="font-black text-amber-900">{product.interestRate}</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-sm font-black mb-4 text-slate-800 uppercase tracking-wide">{t.product.advantages}</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm">
                              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-700 font-medium">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {product.requirements && product.requirements.length > 0 && (
                        <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-5 mb-6 border border-slate-200">
                          <h4 className="text-sm font-black mb-3 text-slate-800 uppercase tracking-wide flex items-center gap-2">
                            <FileCheck className="w-4 h-4" />
                            {t.product.requirements}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {product.requirements.map((req, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-slate-600">•</span>
                                <span className="text-slate-700 font-medium">{req}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* NBU Links */}
                      {(product.essential_characteristics || product.warning) && (
                        <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-gray-100">
                          {product.essential_characteristics && (
                            <a href={product.essential_characteristics} target="_blank" rel="noopener noreferrer"
                               className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1">
                              <Info className="w-4 h-4" />
                              {dict.allCredits.creditCard.essentialCharacteristics}
                            </a>
                          )}
                          {product.warning && (
                            <a href={product.warning} target="_blank" rel="noopener noreferrer"
                               className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1">
                              <Info className="w-4 h-4" />
                              {dict.allCredits.creditCard.warning}
                            </a>
                          )}
                        </div>
                      )}

                      <div className="flex gap-4">
                        <a
                          href={product.creditUrl || product.website || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-slate-800 text-white font-black py-4 px-8 rounded-2xl transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl text-center"
                        >
                          {t.product.apply}
                        </a>
                        <Link
                          href={`/${lang}/credits/cash/${product.id}`}
                          className="px-8 py-4 border-3 border-slate-800 text-slate-900 rounded-2xl font-black hover:bg-slate-800 hover:text-white transition-all text-center flex items-center justify-center"
                        >
                          {t.product.details}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Premium FAQ Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-2xl p-10 border-2 border-gray-100">
          <h2 className="text-3xl font-black mb-8 flex items-center gap-3 text-slate-900">
            <HandCoins className="w-8 h-8 text-amber-600" />
            {t.faq.title}
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b-2 border-gray-200 pb-5 last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex items-center justify-between w-full text-left group"
                >
                  <h3 className="font-bold text-lg pr-4 group-hover:text-slate-700 transition-colors text-slate-900">
                    {faq.question}
                  </h3>
                  {openFaq === index ? (
                    <ChevronUp className="w-6 h-6 text-slate-700 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <p className="mt-4 text-gray-700 leading-relaxed font-medium">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Premium CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <Award className="w-16 h-16 mx-auto mb-6 text-amber-400" />
            <h2 className="text-4xl font-black mb-4">
              {t.cta.title}
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">
              {t.cta.subtitle}
            </p>
            <button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-yellow-600 hover:to-amber-500 text-slate-900 font-black py-5 px-10 rounded-2xl transition-all transform hover:scale-105 shadow-2xl">
              {t.cta.button}
            </button>
          </div>
        </div>
      </div>

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
