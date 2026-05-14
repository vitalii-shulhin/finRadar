'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Wallet,
  Zap,
  Star,
  Clock,
  CheckCircle,
  Shield,
  TrendingUp,
  AlertCircle,
  Filter,
  ChevronDown,
  ChevronUp,
  Smartphone,
  CreditCard,
  Users,
  Award,
  Gift,
  FileText,
  Info
} from 'lucide-react';
import { MICROCREDIT_PRODUCTS, type MicrocreditProduct } from '@/data/microcreditProducts';
import { getDictionary } from '@/i18n/dictionaries';
import { type Locale } from '@/i18n/config';

type SortOption = 'recommended' | 'rate' | 'amount' | 'time';

interface MicrocreditsPageProps {
  lang: Locale;
}

export default function MicrocreditsPage({ lang }: MicrocreditsPageProps) {
  const dict = getDictionary(lang);
  const [loanAmount, setLoanAmount] = useState(2000);
  const [loanTerm, setLoanTerm] = useState(14);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [selectedLenders, setSelectedLenders] = useState<string[]>([]);
  const [onlyFirstFree, setOnlyFirstFree] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);

  const lenders = Array.from(new Set(MICROCREDIT_PRODUCTS.map(p => p.lender)));

  const filteredProducts = useMemo(() => {
    let results = MICROCREDIT_PRODUCTS;

    // results = results.filter(p => loanAmount >= p.minAmount && loanAmount <= p.maxAmount);
    // results = results.filter(p => loanTerm >= p.minTerm && loanTerm <= p.maxTerm);
    //
    // if (selectedLenders.length > 0) {
    //   results = results.filter(p => selectedLenders.includes(p.lender));
    // }
    //
    // if (onlyFirstFree) {
    //   results = results.filter(p => p.firstLoanFree);
    // }

    return results;
  }, [loanAmount, loanTerm, selectedLenders, onlyFirstFree]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'recommended') {
        if (a.recommended && !b.recommended) return -1;
        if (!a.recommended && b.recommended) return 1;
        return b.rating - a.rating;
      }
      if (sortBy === 'rate') return a.interestRateValue - b.interestRateValue;
      if (sortBy === 'amount') return b.maxAmount - a.maxAmount;
      if (sortBy === 'time') {
        const aTime = parseInt(a.approvalTime);
        const bTime = parseInt(b.approvalTime);
        return aTime - bTime;
      }
      return 0;
    });
  }, [filteredProducts, sortBy]);

  const toggleLender = (lender: string) => {
    setSelectedLenders(prev =>
      prev.includes(lender) ? prev.filter(l => l !== lender) : [...prev, lender]
    );
  };

  const calculateTotal = () => {
    const dailyRate = 0.01; // Average rate
    const interest = loanAmount * (dailyRate / 100) * loanTerm;
    return Math.round(loanAmount + interest);
  };

  const faqData = [
    {
      question: 'Що таке мікрокредит?',
      answer: 'Мікрокредит - це невелика грошова позика на короткий термін (від 1 до 30 днів), яку можна отримати онлайн без довідок про доходи. Сума зазвичай становить від 100 до 5000 грн.',
    },
    {
      question: 'Як отримати перший мікрокредит безкоштовно?',
      answer: 'Багато компаній пропонують перший мікрокредит під 0% або 0.01% для нових клієнтів. Це акційна пропозиція для залучення клієнтів. Зверніть увагу на умови: термін безкоштовної позики, максимальну суму та вимоги.',
    },
    {
      question: 'Які документи потрібні для оформлення?',
      answer: 'Для мікрокредиту достатньо паспорта громадянина України, ІПН та банківської картки. Довідки про доходи зазвичай не потрібні. Деякі компанії можуть попросити додаткові контакти.',
    },
    {
      question: 'Скільки часу займає схвалення?',
      answer: 'Більшість мікрокредитів схвалюються за 2-10 хвилин. Гроші надходять на картку протягом 5-15 хвилин після схвалення, цілодобово.',
    },
    {
      question: 'Чи безпечно брати мікрокредит онлайн?',
      answer: 'Так, якщо ви обираєте ліцензовану компанію. Всі компанії в нашому рейтингу мають ліцензію НБУ та захищене з\'єднання. Ваші персональні дані захищені.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href={`/${lang}`} className="hover:text-primary transition-colors">
              {lang === 'uk' ? 'Головна' : 'Главная'}
            </Link>
            <span>/</span>
            <Link href={`/${lang}/credits`} className="hover:text-primary transition-colors">
              {lang === 'uk' ? 'Кредити' : 'Кредиты'}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{lang === 'uk' ? 'Мікрокредити' : 'Микрокредиты'}</span>
          </div>
        </div>
      </div>

      {/* Hero Section with Navigation */}
      <div className="bg-gradient-to-br from-primary via-blue-500 to-indigo-600 text-white py-16 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl font-black mb-3 tracking-tight">
                Мікрокредити
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
                Швидкі гроші від 100 до 5000 грн за 2 хвилини • Перший кредит безкоштовно
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-8 overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-2 min-w-max">
              <Link
                href="/credits/online"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all"
              >
                Онлайн кредити
              </Link>
              <div className="bg-white text-primary px-5 py-2.5 rounded-xl font-bold whitespace-nowrap shadow-xl">
                Мікрокредити
              </div>
              <Link
                href="/credits/cash"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all"
              >
                Готівкові кредити
              </Link>
              <Link
                href="/cards"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all"
              >
                Кредитні картки
              </Link>
              <Link
                href="/credits/credit-line"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all"
              >
                Кредитна лінія
              </Link>
              <Link
                href="/credits/refinancing"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all"
              >
                Рефінансування
              </Link>
              <Link
                href="/credits/secured"
                className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all"
              >
                Під заставу
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Section - Accordion */}
      <div className="container-custom mt-12 relative z-20 mb-12">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="w-full flex items-center justify-between mb-6 hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Розрахуйте свій мікрокредит</h2>
            </div>
            <ChevronDown className={`w-6 h-6 text-primary transition-transform duration-300 ${showCalculator ? 'rotate-180' : ''}`} />
          </button>

          {showCalculator && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Loan Amount */}
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">
                Сума кредиту
              </label>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full appearance-none cursor-pointer accent-primary"
                style={{
                  background: `linear-gradient(to right, #33bbfb 0%, #33bbfb ${((loanAmount - 100) / 4900) * 100}%, #e5e7eb ${((loanAmount - 100) / 4900) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500 font-medium">100 ₴</span>
                <div className="text-3xl font-black text-primary">
                  {loanAmount.toLocaleString()} ₴
                </div>
                <span className="text-xs text-gray-500 font-medium">5 000 ₴</span>
              </div>
            </div>

            {/* Loan Term */}
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700">
                Термін (днів)
              </label>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full appearance-none cursor-pointer accent-primary"
                style={{
                  background: `linear-gradient(to right, #33bbfb 0%, #33bbfb ${((loanTerm - 1) / 29) * 100}%, #e5e7eb ${((loanTerm - 1) / 29) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500 font-medium">1 день</span>
                <div className="text-3xl font-black text-primary">
                  {loanTerm} {loanTerm === 1 ? 'день' : loanTerm < 5 ? 'дні' : 'днів'}
                </div>
                <span className="text-xs text-gray-500 font-medium">30 днів</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-sm opacity-90 mb-2 font-medium">Сума до повернення</div>
              <div className="text-3xl font-black">{calculateTotal().toLocaleString()} ₴</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-sm opacity-90 mb-2 font-medium">Знайдено пропозицій</div>
              <div className="text-3xl font-black">{sortedProducts.length}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-sm opacity-90 mb-2 font-medium">Швидше за</div>
              <div className="text-3xl font-black">5 хвилин</div>
            </div>
          </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom pb-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Фільтри
                </h2>
                <button
                  onClick={() => {
                    setSelectedLenders([]);
                    setOnlyFirstFree(false);
                  }}
                  className="text-sm text-primary hover:text-primary-dark font-semibold"
                >
                  Скинути
                </button>
              </div>

              {/* First Loan Free Filter */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-xl transition-colors">
                  <input
                    type="checkbox"
                    checked={onlyFirstFree}
                    onChange={(e) => setOnlyFirstFree(e.target.checked)}
                    className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary mt-0.5"
                  />
                  <div>
                    <div className="font-bold text-gray-900">Перший кредит безкоштовно</div>
                    <div className="text-xs text-gray-600 mt-1">Під 0% або 0.01%</div>
                  </div>
                </label>
              </div>

              {/* Lenders Filter */}
              <div>
                <h3 className="font-bold mb-3 text-gray-900">Кредитор</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {lenders.map(lender => (
                    <label
                      key={lender}
                      className={`flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-3 rounded-xl transition-colors ${
                        selectedLenders.includes(lender) ? 'bg-primary/5 border-2 border-primary/20' : 'border-2 border-transparent'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedLenders.includes(lender)}
                        onChange={() => toggleLender(lender)}
                        className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary"
                      />
                      <span className="text-sm font-medium">{lender}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-100">
              <h3 className="font-bold mb-3 flex items-center gap-2 text-gray-900">
                <Shield className="w-5 h-5 text-primary" />
                Безпека
              </h3>
              <div className="text-sm text-gray-700 space-y-2">
                <p>✓ Всі компанії ліцензовані</p>
                <p>✓ Захищена передача даних</p>
                <p>✓ Без прихованих платежів</p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 border border-gray-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 font-medium">Знайдено:</span>
                    <span className="text-xl font-black text-primary">
                      {sortedProducts.length}
                    </span>
                  </div>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary font-semibold"
                  >
                    <option value="recommended">Рекомендовані</option>
                    <option value="rate">За ставкою</option>
                    <option value="amount">За сумою</option>
                    <option value="time">За швидкістю</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden btn-secondary flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Фільтри
                </button>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Нічого не знайдено</h3>
                <p className="text-gray-600 mb-4">Спробуйте змінити параметри</p>
              </div>
            ) : (
              <div className="space-y-6">
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row items-start justify-between mb-4 gap-4">
                        <div className="flex flex-col sm:flex-row items-start gap-6 flex-1 w-full">
                          <Image
                              src={product.logo}
                              alt={product.lender}
                              width={256}
                              height={150}
                              className="object-contain"
                          />
                          <div className="flex-1 w-full">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <h3 className="text-xl font-black">{product.lender}</h3>
                              {product.recommended && (
                                <span className="bg-gradient-to-r from-primary to-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                                  Рекомендуємо
                                </span>
                              )}
                              {product.popular && (
                                <span className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                                  Популярний
                                </span>
                              )}
                              {product.firstLoanFree && (
                                <span className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg flex items-center gap-1">
                                  <Gift className="w-3 h-3" />
                                  0%
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="font-bold">{product.rating}</span>
                                <span className="text-gray-400">({product.reviews})</span>
                              </div>
                              <div className="flex items-center gap-1 text-primary">
                                <Clock className="w-4 h-4" />
                                <span className="font-semibold">{product.approvalTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-gray-500 mb-1 font-medium">від</div>
                          <div className="text-3xl font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            {product.minAmount} ₴
                          </div>
                          <div className="text-xs text-gray-500">до {product.maxAmount} ₴</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-100">
                          <div className="text-xs text-gray-600 mb-1 font-medium">Сума</div>
                          <div className="font-bold text-primary text-sm">
                            {product.minAmount} - {product.maxAmount} ₴
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-3 rounded-xl border border-purple-100">
                          <div className="text-xs text-gray-600 mb-1 font-medium">Термін</div>
                          <div className="font-bold text-purple-600 text-sm">
                            до {product.maxTerm} днів
                          </div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-red-50 p-3 rounded-xl border border-orange-100">
                          <div className="text-xs text-gray-600 mb-1 font-medium">Ставка</div>
                          <div className="font-bold text-orange-600 text-sm">{product.interestRate}</div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-3 rounded-xl border border-emerald-100">
                          <div className="text-xs text-gray-600 mb-1 font-medium">Схвалення</div>
                          <div className="font-bold text-emerald-600 text-sm">{product.approvalTime}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-sm font-bold mb-3 text-gray-700">Переваги:</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* NBU Links */}
                      {(product.essential_characteristics || product.warning) && (
                        <div className="flex flex-wrap gap-3 mb-4 pb-4 border-b border-gray-100">
                          {product.essential_characteristics && (
                            <a
                              href={product.essential_characteristics}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                            >
                              <Info className="w-4 h-4" />
                              {dict.allCredits.creditCard.essentialCharacteristics}
                            </a>
                          )}
                          {product.warning && (
                            <a
                              href={product.warning}
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

                      <div className="flex gap-3">
                        <a
                          href={product.creditUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
                        >
                          {lang === 'uk' ? 'Отримати кредит' : 'Получить кредит'}
                        </a>
                        <Link
                          href={`/${lang}/credits/microcredits/${product.id}`}
                          className="px-6 py-3 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition-all text-center flex items-center justify-center"
                        >
                          {lang === 'uk' ? 'Детальніше' : 'Подробнее'}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-primary" />
            Часті запитання
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex items-center justify-between w-full text-left group"
                >
                  <h3 className="font-bold text-lg pr-4 group-hover:text-primary transition-colors">
                    {faq.question}
                  </h3>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <p className="mt-3 text-gray-700 leading-relaxed">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-br from-primary via-blue-600 to-indigo-600 rounded-3xl p-12 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-black mb-4">
              Отримайте гроші прямо зараз!
            </h2>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
              Оформіть мікрокредит онлайн за 2 хвилини • Перший кредит безкоштовно
            </p>
            <button className="bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-xl">
              Вибрати пропозицію
            </button>
          </div>
        </div>

        {/* Article Section */}
        <article className="mt-12 bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="max-w-4xl mx-auto prose prose-lg">
            {/* Introduction */}
            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.microcreditsArticle.intro}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.microcreditsArticle.introParagraph2}
              </p>
            </div>

            {/* What is Microcredit */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-primary" />
                {dict.microcreditsArticle.whatIsTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.microcreditsArticle.whatIsContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.microcreditsArticle.whatIsParagraph2}
              </p>
            </section>

            {/* How to Get */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Smartphone className="w-6 h-6 text-green-600" />
                {dict.microcreditsArticle.howToGetTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.microcreditsArticle.howToGetContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.microcreditsArticle.howToGetParagraph2}
              </p>
            </section>

            {/* No Refusal */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                {dict.microcreditsArticle.noRefusalTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.microcreditsArticle.noRefusalContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.microcreditsArticle.noRefusalParagraph2}
              </p>
            </section>

            {/* Bad Credit History */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
                {dict.microcreditsArticle.badCreditTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.microcreditsArticle.badCreditContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.microcreditsArticle.badCreditParagraph2}
              </p>
            </section>

            {/* All Microcredits */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-indigo-600" />
                {dict.microcreditsArticle.allMicrocreditsTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.microcreditsArticle.allMicrocreditsContent}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {dict.microcreditsArticle.allMicrocreditsParagraph2}
              </p>
            </section>

            {/* Advantages */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                {dict.microcreditsArticle.advantagesTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {dict.microcreditsArticle.advantagesContent}
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                {dict.microcreditsArticle.advantagesList.map((advantage, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">
                    {advantage}
                  </li>
                ))}
              </ul>
              <p className="text-gray-700 leading-relaxed">
                {dict.microcreditsArticle.advantagesParagraph2}
              </p>
            </section>

            {/* Conclusion */}
            <section className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                {dict.microcreditsArticle.conclusionTitle}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {dict.microcreditsArticle.conclusionContent}
              </p>
            </section>
          </div>
        </article>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
