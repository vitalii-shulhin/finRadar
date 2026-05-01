'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Shield,
  Car,
  Calculator,
  CheckCircle,
  AlertCircle,
  Star,
  TrendingDown,
  Clock,
  FileText,
  Phone,
  Mail,
  CreditCard,
  Award,
  ChevronDown,
  ChevronUp,
  Filter,
  Info,
  Flame,
  AlertTriangle,
  Zap,
  UserCheck,
  BadgeCheck,
  Package
} from 'lucide-react';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface InsuranceCompany {
  id: number;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  minPrice: number;
  maxPrice: number;
  packages: string[];
  features: string[];
  hasWarRisks: boolean;
  processingTime: string;
  onlineApplication: boolean;
  installments: boolean;
  discount: number;
  popular?: boolean;
  recommended?: boolean;
  color: string;
  insuranceUrl: string;
}

const KASKO_COMPANIES: InsuranceCompany[] = [
  {
    id: 1,
    name: 'Hotline Finance',
    logo: '🛡️',
    rating: 4.9,
    reviews: 1842,
    minPrice: 18000,
    maxPrice: 45000,
    packages: ['Міні КАСКО', '50/50 КАСКО', 'Повне КАСКО', 'Воєнні ризики'],
    features: [
      'Покриття воєнних ризиків',
      'Виплата за 3 дні',
      'Евакуатор в подарунок',
      'Без огляду для нових авто',
    ],
    hasWarRisks: true,
    processingTime: '15 хвилин',
    onlineApplication: true,
    installments: true,
    discount: 10,
    popular: true,
    recommended: true,
    color: 'from-blue-500 to-blue-600',
    insuranceUrl: 'https://rdr.fmcgsd.net/in/offer/2856?aid=91780&source=minikaskoua&dlink=https%3A%2F%2Fhotline.finance%2Fua%2Fmini-kasko'
  },
  // {
  //   id: 1,
  //   name: 'Arsenal Insurance',
  //   logo: '🛡️',
  //   rating: 4.9,
  //   reviews: 1842,
  //   minPrice: 18000,
  //   maxPrice: 45000,
  //   packages: ['Міні КАСКО', '50/50 КАСКО', 'Повне КАСКО', 'Воєнні ризики'],
  //   features: [
  //     'Покриття воєнних ризиків',
  //     'Виплата за 3 дні',
  //     'Евакуатор в подарунок',
  //     'Без огляду для нових авто',
  //   ],
  //   hasWarRisks: true,
  //   processingTime: '15 хвилин',
  //   onlineApplication: true,
  //   installments: true,
  //   discount: 10,
  //   popular: true,
  //   recommended: true,
  //   color: 'from-blue-500 to-blue-600',
  // },
  // {
  //   id: 2,
  //   name: 'Unika',
  //   logo: '⭐',
  //   rating: 4.8,
  //   reviews: 1523,
  //   minPrice: 16500,
  //   maxPrice: 42000,
  //   packages: ['Міні КАСКО', 'Повне КАСКО', 'Воєнні ризики'],
  //   features: [
  //     'Страхування з воєнними ризиками',
  //     'Розстрочка до 12 місяців',
  //     'Цілодобова підтримка',
  //     'Електронний поліс миттєво',
  //   ],
  //   hasWarRisks: true,
  //   processingTime: '10 хвилин',
  //   onlineApplication: true,
  //   installments: true,
  //   discount: 15,
  //   recommended: true,
  //   color: 'from-purple-500 to-purple-600',
  // },
  // {
  //   id: 3,
  //   name: 'Euroins Ukraine',
  //   logo: '🇪🇺',
  //   rating: 4.7,
  //   reviews: 2156,
  //   minPrice: 17000,
  //   maxPrice: 40000,
  //   packages: ['50/50 КАСКО', 'Повне КАСКО'],
  //   features: [
  //     'Без франшизи',
  //     'Заміна на час ремонту',
  //     'Партнерські СТО',
  //     'Онлайн калькулятор',
  //   ],
  //   hasWarRisks: false,
  //   processingTime: '20 хвилин',
  //   onlineApplication: true,
  //   installments: true,
  //   discount: 8,
  //   color: 'from-green-500 to-green-600',
  // },
  // {
  //   id: 4,
  //   name: 'VUSO',
  //   logo: '💎',
  //   rating: 4.6,
  //   reviews: 987,
  //   minPrice: 19000,
  //   maxPrice: 48000,
  //   packages: ['Повне КАСКО', 'Воєнні ризики'],
  //   features: [
  //     'Покриття воєнних подій',
  //     'VIP сервіс',
  //     'Виплата без затримок',
  //     'Преміум підтримка',
  //   ],
  //   hasWarRisks: true,
  //   processingTime: '15 хвилин',
  //   onlineApplication: true,
  //   installments: false,
  //   discount: 5,
  //   popular: true,
  //   color: 'from-amber-500 to-amber-600',
  // },
  // {
  //   id: 5,
  //   name: 'PZU Ukraine',
  //   logo: '🏆',
  //   rating: 4.8,
  //   reviews: 1745,
  //   minPrice: 17500,
  //   maxPrice: 43000,
  //   packages: ['Міні КАСКО', '50/50 КАСКО', 'Повне КАСКО'],
  //   features: [
  //     'Найшвидша виплата',
  //     'Без огляду авто',
  //     'Гнучкі умови',
  //     'Бонус за безаварійність',
  //   ],
  //   hasWarRisks: false,
  //   processingTime: '12 хвилин',
  //   onlineApplication: true,
  //   installments: true,
  //   discount: 12,
  //   color: 'from-red-500 to-red-600',
  // },
];

export default function KaskoPageContent({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  // States for calculator
  const [carValue, setCarValue] = useState('500000');
  const [packageType, setPackageType] = useState('full');
  const [franchise, setFranchise] = useState('none');

  // States for filtering and sorting
  const [maxPrice, setMaxPrice] = useState(50000);
  const [onlyWarRisks, setOnlyWarRisks] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<'recommended' | 'price' | 'rating'>('recommended');
  const [showFilters, setShowFilters] = useState(false);

  // States for FAQ
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Calculate estimated price
  const estimatedPrice = useMemo(() => {
    const value = parseInt(carValue) || 0;
    let percentage = 0.05; // 5% for full KASKO

    if (packageType === 'mini') percentage = 0.025;
    else if (packageType === 'half') percentage = 0.035;
    else if (packageType === 'war') percentage = 0.07;

    let price = value * percentage;

    if (franchise === 'conditional') price *= 0.85;
    else if (franchise === 'unconditional') price *= 0.80;

    return Math.round(price);
  }, [carValue, packageType, franchise]);

  // Filter and sort companies
  const filteredCompanies = useMemo(() => {
    let filtered = KASKO_COMPANIES.filter(company => {
      if (company.minPrice > maxPrice) return false;
      if (onlyWarRisks && !company.hasWarRisks) return false;
      if (selectedCompanies.length > 0 && !selectedCompanies.includes(company.id)) return false;
      return true;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'price') return a.minPrice - b.minPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      // recommended
      if (a.recommended && !b.recommended) return -1;
      if (!a.recommended && b.recommended) return 1;
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return b.rating - a.rating;
    });
  }, [maxPrice, onlyWarRisks, selectedCompanies, sortBy]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (maxPrice < 50000) count++;
    if (onlyWarRisks) count++;
    if (selectedCompanies.length > 0) count++;
    return count;
  }, [maxPrice, onlyWarRisks, selectedCompanies]);

  const toggleCompanyFilter = (id: number) => {
    setSelectedCompanies(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Link href={`/${lang}`} className="text-gray-500 hover:text-blue-600 transition-colors">
              {dict.kasko.breadcrumb.home}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/${lang}/insurance`} className="text-gray-500 hover:text-blue-600 transition-colors">
              {dict.kasko.breadcrumb.insurance}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-600 font-semibold">{dict.kasko.breadcrumb.kasko}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64">
            <Shield className="w-full h-full text-white" />
          </div>
          <div className="absolute bottom-10 right-10 w-48 h-48">
            <Car className="w-full h-full text-white" />
          </div>
        </div>

        <div className="container-custom relative z-10">
          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              <Shield className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">{dict.kasko.hero.badges.secure}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              <BadgeCheck className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">{dict.kasko.hero.badges.licensed}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              <Award className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">{dict.kasko.hero.badges.experience}</span>
            </div>
          </div>

          {/* Title */}
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
              {dict.kasko.hero.title}
            </h1>
            <p className="text-xl text-blue-100 font-medium mb-8 leading-relaxed">
              {dict.kasko.hero.subtitle}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { icon: Clock, label: dict.kasko.hero.stats.processing.label, value: dict.kasko.hero.stats.processing.value },
                { icon: CreditCard, label: dict.kasko.hero.stats.price.label, value: dict.kasko.hero.stats.price.value },
                { icon: Shield, label: dict.kasko.hero.stats.companies.label, value: dict.kasko.hero.stats.companies.value },
                { icon: Star, label: dict.kasko.hero.stats.rating.label, value: dict.kasko.hero.stats.rating.value },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <Icon className="w-8 h-8 text-blue-200 mb-2 mx-auto" />
                    <div className="text-sm text-blue-200 font-semibold mb-1">{stat.label}</div>
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-bold">
                <Calculator className="w-5 h-5" />
                {dict.kasko.calculator.title}
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
                {dict.kasko.calculator.subtitle}
              </h2>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-xl border-2 border-blue-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Car Value */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    {dict.kasko.calculator.carValue}
                  </label>
                  <input
                    type="number"
                    value={carValue}
                    onChange={(e) => setCarValue(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-slate-900 focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="500000"
                  />
                </div>

                {/* Package Type */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    {dict.kasko.calculator.packageType.label}
                  </label>
                  <select
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-slate-900 focus:border-blue-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="mini">{dict.kasko.calculator.packageType.mini}</option>
                    <option value="half">{dict.kasko.calculator.packageType.half}</option>
                    <option value="full">{dict.kasko.calculator.packageType.full}</option>
                    <option value="war">{dict.kasko.calculator.packageType.war}</option>
                  </select>
                </div>

                {/* Franchise */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    {dict.kasko.calculator.franchise.label}
                  </label>
                  <select
                    value={franchise}
                    onChange={(e) => setFranchise(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-slate-900 focus:border-blue-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="none">{dict.kasko.calculator.franchise.none}</option>
                    <option value="conditional">{dict.kasko.calculator.franchise.conditional}</option>
                    <option value="unconditional">{dict.kasko.calculator.franchise.unconditional}</option>
                  </select>
                </div>
              </div>

              {/* Estimated Price */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-center">
                <div className="text-blue-100 font-bold mb-2">{dict.kasko.calculator.estimatedPrice}</div>
                <div className="text-5xl font-black text-white mb-4">
                  {estimatedPrice.toLocaleString()} ₴
                </div>
                <p className="text-sm text-blue-100 font-medium">
                  {dict.kasko.calculator.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* War Risks Section */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-red-200">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black">{dict.kasko.warRisks.title}</h2>
                    <p className="text-red-100 font-semibold">{dict.kasko.warRisks.subtitle}</p>
                  </div>
                </div>
                <p className="text-lg text-red-50 leading-relaxed">
                  {dict.kasko.warRisks.description}
                </p>
              </div>

              <div className="p-8">
                <h3 className="text-xl font-black text-slate-900 mb-6">{dict.kasko.warRisks.coverage}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {dict.kasko.warRisks.items.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 bg-red-50 rounded-xl p-4">
                      <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      <span className="font-semibold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                  <Info className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                  <p className="text-sm font-semibold text-yellow-800">{dict.kasko.warRisks.note}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Companies Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
              {dict.kasko.companies.title}
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              {dict.kasko.companies.subtitle}
            </p>
          </div>

          {/* Sorting and Filters */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-600">{dict.kasko.companies.sorting.label}</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-semibold text-slate-900 focus:border-blue-500 focus:outline-none transition-colors"
              >
                <option value="recommended">{dict.kasko.companies.sorting.recommended}</option>
                <option value="price">{dict.kasko.companies.sorting.price}</option>
                <option value="rating">{dict.kasko.companies.sorting.rating}</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-600">
                {dict.kasko.companies.sorting.found} <span className="text-blue-600">{filteredCompanies.length}</span> {dict.kasko.companies.sorting.offers}
              </span>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                <Filter className="w-5 h-5" />
                {dict.kasko.filters.title}
                {activeFiltersCount > 0 && (
                  <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-black">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border-2 border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-900">{dict.kasko.filters.title}</h3>
                <button
                  onClick={() => {
                    setMaxPrice(50000);
                    setOnlyWarRisks(false);
                    setSelectedCompanies([]);
                  }}
                  className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  {dict.kasko.filters.reset}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Max Price */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    {dict.kasko.filters.maxPrice}: {maxPrice.toLocaleString()} ₴
                  </label>
                  <input
                    type="range"
                    min="10000"
                    max="50000"
                    step="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* War Risks Filter */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyWarRisks}
                      onChange={(e) => setOnlyWarRisks(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <div>
                      <div className="text-sm font-bold text-slate-700">{dict.kasko.filters.onlyWarRisks}</div>
                      <div className="text-xs text-gray-500">{dict.kasko.filters.warRisksDescription}</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Companies Grid */}
          <div className="grid grid-cols-1 gap-6">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-300"
              >
                {/* Company Header */}
                <div className={`bg-gradient-to-r ${company.color} p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{company.logo}</div>
                      <div>
                        <h3 className="text-xl font-black text-white">{company.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-300 fill-current" />
                            <span className="text-white font-bold ml-1">{company.rating}</span>
                          </div>
                          <span className="text-white/80 text-sm font-medium">
                            ({company.reviews} {dict.kasko.companies.card.reviews})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-col gap-2">
                      {company.recommended && (
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                          {dict.kasko.companies.card.badges.recommended}
                        </span>
                      )}
                      {company.popular && (
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                          {dict.kasko.companies.card.badges.popular}
                        </span>
                      )}
                      {company.hasWarRisks && (
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          {dict.kasko.companies.card.badges.warRisks}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-white/80 text-sm font-semibold mb-1">
                      {dict.kasko.companies.card.policyPrice}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-white/60 text-sm font-bold">{dict.kasko.companies.card.from}</span>
                      <span className="text-3xl font-black text-white">{company.minPrice.toLocaleString()} ₴</span>
                    </div>
                  </div>
                </div>

                {/* Company Details */}
                <div className="p-6">
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-slate-700 mb-3">{dict.kasko.companies.card.features}</h4>
                    <div className="space-y-2">
                      {company.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-slate-600 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Packages */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-slate-700 mb-3">{dict.kasko.companies.card.packages}</h4>
                    <div className="flex flex-wrap gap-2">
                      {company.packages.map((pkg, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full"
                        >
                          {pkg}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      href={company.insuranceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl text-center"
                    >
                      {dict.kasko.companies.card.apply}
                    </Link>
                    {/*<button className="px-6 bg-gray-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">*/}
                    {/*  <Phone className="w-5 h-5" />*/}
                    {/*</button>*/}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KASKO vs OSAGO Comparison */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
                {dict.kasko.comparison.title}
              </h2>
              <p className="text-lg text-gray-600 font-medium">
                {dict.kasko.comparison.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* KASKO Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{dict.kasko.comparison.kasko.name}</h3>
                  <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">
                    {dict.kasko.comparison.kasko.type}
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-bold text-gray-500 mb-1">Покриття:</div>
                    <div className="text-base font-semibold text-slate-900">{dict.kasko.comparison.kasko.coverage}</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-500 mb-1">Ризики:</div>
                    <div className="text-base font-semibold text-slate-900">{dict.kasko.comparison.kasko.risks}</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-500 mb-1">Виплата:</div>
                    <div className="text-base font-semibold text-slate-900">{dict.kasko.comparison.kasko.payment}</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-500 mb-1">Ціна:</div>
                    <div className="text-xl font-black text-blue-600">{dict.kasko.comparison.kasko.price}</div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm font-semibold text-gray-600">{dict.kasko.comparison.kasko.who}</div>
                  </div>
                </div>
              </div>

              {/* OSAGO Card */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Car className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">{dict.kasko.comparison.osago.name}</h3>
                  <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-bold">
                    {dict.kasko.comparison.osago.type}
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-bold text-gray-500 mb-1">Покриття:</div>
                    <div className="text-base font-semibold text-slate-900">{dict.kasko.comparison.osago.coverage}</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-500 mb-1">Ризики:</div>
                    <div className="text-base font-semibold text-slate-900">{dict.kasko.comparison.osago.risks}</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-500 mb-1">Виплата:</div>
                    <div className="text-base font-semibold text-slate-900">{dict.kasko.comparison.osago.payment}</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-500 mb-1">Ціна:</div>
                    <div className="text-xl font-black text-slate-600">{dict.kasko.comparison.osago.price}</div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm font-semibold text-gray-600">{dict.kasko.comparison.osago.who}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
                {dict.kasko.faq.title}
              </h2>
              <p className="text-lg text-gray-600 font-medium">
                {dict.kasko.faq.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              {[
                dict.kasko.faq.question1,
                dict.kasko.faq.question2,
                dict.kasko.faq.question3,
                dict.kasko.faq.question4,
                dict.kasko.faq.question5,
                dict.kasko.faq.question6,
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-black text-slate-900 pr-4">{faq.q}</span>
                    {expandedFaq === idx ? (
                      <ChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === idx && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed font-medium">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96">
            <Shield className="w-full h-full text-white" />
          </div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold mb-6">
              {dict.kasko.cta.badge}
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              {dict.kasko.cta.title}
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              {dict.kasko.cta.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              {/*<button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-black text-lg hover:bg-blue-50 transition-colors shadow-xl">*/}
              {/*  <Phone className="inline-block w-5 h-5 mr-2" />*/}
              {/*  {dict.kasko.cta.phoneButton}*/}
              {/*</button>*/}
              {/*<button className="px-8 py-4 bg-blue-500 text-white rounded-xl font-black text-lg hover:bg-blue-600 transition-colors border-2 border-white/30">*/}
              {/*  <Mail className="inline-block w-5 h-5 mr-2" />*/}
              {/*  {dict.kasko.cta.emailButton}*/}
              {/*</button>*/}
              <Link
                  href={KASKO_COMPANIES[0].insuranceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-blue-500 text-white rounded-xl font-black text-lg hover:bg-blue-600 transition-colors border-2 border-white/30"
              >
                {dict.greenCard.calculator.apply}
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-200" />
                <span className="text-blue-100 font-semibold">{dict.kasko.cta.benefits.fast}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-blue-200" />
                <span className="text-blue-100 font-semibold">{dict.kasko.cta.benefits.expert}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-200" />
                <span className="text-blue-100 font-semibold">{dict.kasko.cta.benefits.free}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Article Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-black text-slate-900 mb-6">{dict.kasko.article.title}</h2>
            <p className="text-gray-700 leading-relaxed mb-8">{dict.kasko.article.intro}</p>

            <h3 className="text-2xl font-black text-slate-900 mb-4">{dict.kasko.article.types.title}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{dict.kasko.article.types.content}</p>
            <ul className="list-disc list-inside space-y-2 mb-8 text-gray-700">
              {dict.kasko.article.types.items.map((item: string, idx: number) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>

            <h3 className="text-2xl font-black text-slate-900 mb-4">{dict.kasko.article.warRisks.title}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{dict.kasko.article.warRisks.intro}</p>
            <p className="text-gray-700 leading-relaxed mb-4">{dict.kasko.article.warRisks.coverage}</p>
            <p className="text-gray-700 leading-relaxed mb-8">{dict.kasko.article.warRisks.availability}</p>

            <h3 className="text-2xl font-black text-slate-900 mb-4">{dict.kasko.article.pricing.title}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{dict.kasko.article.pricing.intro}</p>
            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
              {dict.kasko.article.pricing.factors.map((factor: string, idx: number) => (
                <li key={idx} className="leading-relaxed">{factor}</li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed mb-8">{dict.kasko.article.pricing.summary}</p>

            <h3 className="text-2xl font-black text-slate-900 mb-4">{dict.kasko.article.comparison.title}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{dict.kasko.article.comparison.intro}</p>
            <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
              {Object.values(dict.kasko.article.comparison.table).map((item: string, idx: number) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
            <p className="text-gray-700 leading-relaxed mb-8">{dict.kasko.article.comparison.ideal}</p>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mt-12">
              <h3 className="text-2xl font-black mb-4">{dict.kasko.article.conclusion.title}</h3>
              <p className="text-blue-100 leading-relaxed text-lg">{dict.kasko.article.conclusion.content}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
