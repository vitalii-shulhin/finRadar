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
  Users,
  Award,
  ChevronDown,
  ChevronUp,
  Filter,
  Info
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
  paymentPlans: string[];
  features: string[];
  coverageLimit: number;
  processingTime: string;
  onlineApplication: boolean;
  installments: boolean;
  discount: number;
  popular?: boolean;
  recommended?: boolean;
  color: string;
  insuranceUrl: string;
}

const INSURANCE_COMPANIES: InsuranceCompany[] = [
  {
    id: 1,
    name: 'Hotline Finance',
    logo: '🚗',
    rating: 4.6,
    reviews: 1543,
    minPrice: 4700,
    maxPrice: 8800,
    paymentPlans: ['Оплата повністю', 'Розстрочка 3 місяці'],
    features: [
      'Швидке врегулювання збитків',
      'Мобільний додаток',
      'Партнерська мережа СТО',
      '24/7 підтримка',
      'Безготівковий розрахунок',
    ],
    coverageLimit: 130000,
    processingTime: '10 хвилин',
    onlineApplication: true,
    installments: true,
    discount: 12,
    color: 'from-orange-500 to-orange-600',
    insuranceUrl: 'https://rdr.fmcgsd.net/in/offer/2856?aid=91780&source=osagoua&dlink=https%3A%2F%2Fhotline.finance%2Fua%2Fosago'
  },
];

type BenefitType = 'none' | 'chornobyl' | 'veteran' | 'disabled' | 'pensioner' | 'participant';
type VehicleType = 'car' | 'truck' | 'motorcycle' | 'bus';
type SortOption = 'recommended' | 'price' | 'rating' | 'discount';

interface CarInsurancePageProps {
  lang: Locale;
}

export default function CarInsurancePageContent({ lang }: CarInsurancePageProps) {
  const dict = getDictionary(lang);

  // Calculator state
  const [vehicleType, setVehicleType] = useState<VehicleType>('car');
  const [engineVolume, setEngineVolume] = useState(1600);
  const [vehicleAge, setVehicleAge] = useState(5);
  const [benefit, setBenefit] = useState<BenefitType>('none');
  const [showCalculator, setShowCalculator] = useState(true);

  // Filter state
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [onlyInstallments, setOnlyInstallments] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Calculate base price based on vehicle parameters
  const calculateBasePrice = () => {
    let basePrice = 4000;

    // Vehicle type multiplier
    const typeMultipliers: Record<VehicleType, number> = {
      car: 1,
      truck: 1.5,
      motorcycle: 0.7,
      bus: 1.8,
    };
    basePrice *= typeMultipliers[vehicleType];

    // Engine volume factor
    if (engineVolume < 1500) basePrice *= 0.9;
    else if (engineVolume > 2500) basePrice *= 1.3;
    else if (engineVolume > 2000) basePrice *= 1.15;

    // Vehicle age factor
    if (vehicleAge > 10) basePrice *= 1.1;
    else if (vehicleAge < 3) basePrice *= 0.95;

    // Benefit discount
    const benefitDiscounts: Record<BenefitType, number> = {
      none: 1,
      chornobyl: 0.5,
      veteran: 0.5,
      disabled: 0.5,
      pensioner: 0.7,
      participant: 0.5,
    };
    basePrice *= benefitDiscounts[benefit];

    return Math.round(basePrice);
  };

  const estimatedPrice = calculateBasePrice();

  // Get unique companies
  const companies = Array.from(new Set(INSURANCE_COMPANIES.map(c => c.name)));

  // Filter insurance products
  const filteredProducts = useMemo(() => {
    let results = INSURANCE_COMPANIES;

    // Filter by selected companies
    if (selectedCompanies.length > 0) {
      results = results.filter(p => selectedCompanies.includes(p.name));
    }

    // Filter by max price
    results = results.filter(p => p.minPrice <= maxPrice);

    // Filter by installments
    if (onlyInstallments) {
      results = results.filter(p => p.installments);
    }

    return results;
  }, [selectedCompanies, maxPrice, onlyInstallments]);

  // Sort products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortBy === 'recommended') {
        if (a.recommended && !b.recommended) return -1;
        if (!a.recommended && b.recommended) return 1;
        return b.rating - a.rating;
      }
      if (sortBy === 'price') {
        return a.minPrice - b.minPrice;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'discount') {
        return b.discount - a.discount;
      }
      return 0;
    });
  }, [filteredProducts, sortBy]);

  const toggleCompany = (company: string) => {
    setSelectedCompanies(prev =>
      prev.includes(company) ? prev.filter(c => c !== company) : [...prev, company]
    );
  };

  const resetFilters = () => {
    setSelectedCompanies([]);
    setMaxPrice(10000);
    setOnlyInstallments(false);
  };

  const hasActiveFilters = selectedCompanies.length > 0 || maxPrice !== 10000 || onlyInstallments;

  const faqData = [
    {
      question: 'Що таке автострахування?',
      answer: 'Автострахування - це фінансовий захист водія від непередбачених витрат у разі ДТП, пошкодження авто або іншої страхової події.',
    },
    {
      question: 'Як оформити автострахування онлайн?',
      answer: 'Для оформлення страховки онлайн достатньо ввести дані автомобіля, обрати умови страхування та оплатити поліс. Процес займає всього кілька хвилин.',
    },
    {
      question: 'Скільки коштує страхування авто?',
      answer: 'Вартість залежить від типу автомобіля, стажу водія, регіону реєстрації та інших факторів. Використовуйте калькулятор для розрахунку точної ціни.',
    },
    {
      question: 'Які переваги онлайн страхування?',
      answer: 'Основні переваги: швидке оформлення без відвідування офісу, можливість порівняти ціни різних компаній, економія часу та отримання полісу на email.',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-gray-50"></div>

        {/* Subtle diagonal pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(0,0,0,.03) 40px, rgba(0,0,0,.03) 80px)`
          }}
        ></div>

        {/* Ambient light effects */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-radial from-primary/10 via-blue-500/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/8 to-transparent blur-3xl"></div>
      </div>

      {/* Breadcrumb - Premium Floating Style */}
      <div className="relative">
        <div className="container-custom py-4">
          <div className="inline-flex items-center gap-2 text-sm bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg border border-gray-100">
            <Link href={`/${lang}`} className="hover:text-primary font-medium transition-colors">
              {dict.carInsurance.breadcrumb.home}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/${lang}/insurance`} className="hover:text-primary font-medium transition-colors">
              {dict.carInsurance.breadcrumb.insurance}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-slate-900 font-semibold">{dict.carInsurance.breadcrumb.carInsurance}</span>
          </div>
        </div>
      </div>

      {/* Hero Section - Bold Editorial Design */}
      <section className="relative py-16">
        <div className="container-custom">
          <div
            className="relative"
            style={{
              animation: 'fadeInUp 0.6s ease-out'
            }}
          >
            {/* Eyebrow text */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                {dict.carInsurance.breadcrumb.carInsurance}
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary"></div>
            </div>

            {/* Main heading */}
            <div className="flex items-start gap-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Car className="w-12 h-12 text-white" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 rounded-2xl blur-xl opacity-40"></div>
              </div>

              <div className="flex-1">
                <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                  {dict.carInsurance.hero.title}
                </h1>
                <p className="text-xl text-gray-600 font-medium max-w-2xl">
                  {dict.carInsurance.hero.subtitle}
                </p>
              </div>
            </div>

            {/* Trust indicators grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Мінімальна ціна', value: 'від 4 700 ₴', icon: <TrendingDown className="w-5 h-5" />, gradient: 'from-emerald-500 to-green-600' },
                { label: 'Швидке оформлення', value: '10 хвилин', icon: <Clock className="w-5 h-5" />, gradient: 'from-orange-500 to-amber-600' },
                { label: 'Онлайн поліс', value: 'На email', icon: <Mail className="w-5 h-5" />, gradient: 'from-blue-500 to-indigo-600' },
                { label: 'Цілодобова підтримка', value: '24/7', icon: <Phone className="w-5 h-5" />, gradient: 'from-purple-500 to-pink-600' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="relative group"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${0.1 + idx * 0.1}s both`
                  }}
                >
                  {/* Shadow layer */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-blue-500/5 rounded-xl blur-lg translate-y-1"></div>

                  {/* Card */}
                  <div className="relative bg-white/90 backdrop-blur-xl rounded-xl p-5 border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    {/* Top accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} rounded-t-xl`}></div>

                    <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-lg text-white mb-3 shadow-lg`}>
                      {stat.icon}
                    </div>
                    <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      {stat.label}
                    </div>
                    <div className="text-2xl font-black text-slate-900">
                      {stat.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section - Premium Design */}
      <section className="relative py-12">
        <div className="container-custom">
          <div
            className="relative"
            style={{
              animation: 'fadeInUp 0.6s ease-out 0.4s both'
            }}
          >
            {/* Shadow foundation */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-primary/5 rounded-3xl blur-2xl translate-y-2"></div>

            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-primary via-blue-500 to-indigo-600"></div>

              <div className="p-8 md:p-10">
                <button
                  onClick={() => setShowCalculator(!showCalculator)}
                  className="flex items-center justify-between w-full group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Calculator className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                        {dict.carInsurance.calculator.title}
                      </h2>
                      <p className="text-sm text-gray-600 font-medium mt-1">
                        {dict.carInsurance.calculator.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="ml-4">
                    {showCalculator ? (
                      <ChevronUp className="w-7 h-7 text-primary" />
                    ) : (
                      <ChevronDown className="w-7 h-7 text-gray-400 group-hover:text-primary transition-colors" />
                    )}
                  </div>
                </button>

                {showCalculator && (
                  <div className="mt-8 space-y-6">
                    {/* Vehicle Type Selection */}
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                        {dict.carInsurance.calculator.vehicleType.label}
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { type: 'car' as VehicleType, label: dict.carInsurance.calculator.vehicleType.car, icon: '🚗' },
                          { type: 'truck' as VehicleType, label: dict.carInsurance.calculator.vehicleType.truck, icon: '🚚' },
                          { type: 'motorcycle' as VehicleType, label: dict.carInsurance.calculator.vehicleType.motorcycle, icon: '🏍️' },
                          { type: 'bus' as VehicleType, label: dict.carInsurance.calculator.vehicleType.bus, icon: '🚌' },
                        ].map((option) => (
                          <button
                            key={option.type}
                            onClick={() => setVehicleType(option.type)}
                            className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                              vehicleType === option.type
                                ? 'border-primary bg-primary/5 shadow-lg scale-105'
                                : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
                            }`}
                          >
                            <div className="text-3xl mb-2">{option.icon}</div>
                            <div className={`text-sm font-bold ${vehicleType === option.type ? 'text-primary' : 'text-slate-700'}`}>
                              {option.label}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Engine Volume */}
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                        {dict.carInsurance.calculator.engineVolume}: {engineVolume} см³
                      </label>
                      <input
                        type="range"
                        min="800"
                        max="5000"
                        step="100"
                        value={engineVolume}
                        onChange={(e) => setEngineVolume(Number(e.target.value))}
                        className="w-full h-2 bg-gradient-to-r from-blue-200 to-primary rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>800 см³</span>
                        <span>5000 см³</span>
                      </div>
                    </div>

                    {/* Vehicle Age */}
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                        {dict.carInsurance.calculator.vehicleAge}: {vehicleAge} років
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="30"
                        step="1"
                        value={vehicleAge}
                        onChange={(e) => setVehicleAge(Number(e.target.value))}
                        className="w-full h-2 bg-gradient-to-r from-blue-200 to-primary rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Новий</span>
                        <span>30+ років</span>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                        {dict.carInsurance.calculator.benefit.label}
                      </label>
                      <select
                        value={benefit}
                        onChange={(e) => setBenefit(e.target.value as BenefitType)}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl bg-white text-slate-900 font-medium focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                      >
                        <option value="none">{dict.carInsurance.calculator.benefit.none}</option>
                        <option value="chornobyl">{dict.carInsurance.calculator.benefit.chornobyl}</option>
                        <option value="veteran">{dict.carInsurance.calculator.benefit.veteran}</option>
                        <option value="disabled">{dict.carInsurance.calculator.benefit.disabled}</option>
                        <option value="pensioner">{dict.carInsurance.calculator.benefit.pensioner}</option>
                        <option value="participant">{dict.carInsurance.calculator.benefit.participant}</option>
                      </select>
                    </div>

                    {/* Estimated Price */}
                    <div className="relative mt-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur-xl opacity-40"></div>
                      <div className="relative bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white shadow-2xl">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-bold uppercase tracking-widest opacity-90 mb-2">
                              {dict.carInsurance.calculator.estimatedPrice}
                            </div>
                            <div className="text-5xl font-black">
                              {estimatedPrice.toLocaleString('uk-UA')} ₴
                            </div>
                            <div className="text-sm opacity-75 mt-2">
                              {dict.carInsurance.calculator.disclaimer}
                            </div>
                          </div>
                          <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-xl flex items-center justify-center">
                            <Calculator className="w-10 h-10" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-16"></div>

      {/* Insurance Companies Section */}
      <section className="relative py-12">
        <div className="container-custom">
          <div className="mb-8">
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              {dict.carInsurance.companies.title}
            </h2>
            <p className="text-lg text-gray-600">
              {dict.carInsurance.companies.subtitle}
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl border-2 border-gray-200 hover:border-primary transition-all shadow-md"
            >
              <Filter className="w-5 h-5" />
              <span className="font-bold">{dict.carInsurance.filters.title}</span>
              {hasActiveFilters && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {selectedCompanies.length + (maxPrice !== 10000 ? 1 : 0) + (onlyInstallments ? 1 : 0)}
                </span>
              )}
              {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {showFilters && (
              <div className="mt-4 bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Sort by */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                      {dict.carInsurance.filters.sortBy}
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                    >
                      <option value="recommended">{dict.carInsurance.filters.recommended}</option>
                      <option value="price">{dict.carInsurance.filters.price}</option>
                      <option value="rating">{dict.carInsurance.filters.rating}</option>
                      <option value="discount">{dict.carInsurance.filters.discount}</option>
                    </select>
                  </div>

                  {/* Max price */}
                  <div>
                    <label className="block text-sm font-bold text-slate-900 mb-2">
                      {dict.carInsurance.filters.maxPrice}: {maxPrice} ₴
                    </label>
                    <input
                      type="range"
                      min="3000"
                      max="10000"
                      step="100"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Installments */}
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={onlyInstallments}
                        onChange={(e) => setOnlyInstallments(e.target.checked)}
                        className="w-5 h-5"
                      />
                      <span className="text-sm font-bold text-slate-900">
                        {dict.carInsurance.filters.onlyInstallments}
                      </span>
                    </label>
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="mt-4 text-sm text-primary hover:text-primary/80 font-bold"
                  >
                    {dict.carInsurance.filters.reset}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Companies List */}
          <div className="space-y-6">
            {sortedProducts.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${company.color}`}></div>

                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl">{company.logo}</div>
                        <div>
                          <h3 className="text-2xl font-black text-slate-900">
                            {company.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span className="font-bold text-slate-900">{company.rating}</span>
                            </div>
                            <span className="text-sm text-gray-500">
                              ({company.reviews} {dict.carInsurance.companies.card.reviews})
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 mb-4">
                        {company.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {company.discount > 0 && (
                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
                          <TrendingDown className="w-4 h-4" />
                          {dict.carInsurance.companies.card.discount} {company.discount}%
                        </div>
                      )}
                    </div>

                    <div className="md:text-right">
                      <div className="mb-4">
                        <div className="text-sm text-gray-600 mb-1">{dict.carInsurance.companies.card.from}</div>
                        <div className="text-4xl font-black text-slate-900">
                          {company.minPrice.toLocaleString('uk-UA')} ₴
                        </div>
                        <div className="text-sm text-gray-500">
                          {dict.carInsurance.companies.card.to} {company.maxPrice.toLocaleString('uk-UA')} ₴
                        </div>
                      </div>

                      <a
                        href={company.insuranceUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                      >
                        <span>{dict.carInsurance.companies.card.apply}</span>
                        <Car className="w-5 h-5" />
                      </a>

                      <div className="mt-3 text-sm text-gray-500">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {dict.carInsurance.companies.card.processing}: {company.processingTime}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-16"></div>

      {/* FAQ Section */}
      <section className="relative py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-900 mb-4">
                {dict.carInsurance.faq.title}
              </h2>
              <p className="text-lg text-gray-600">
                {dict.carInsurance.faq.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-bold text-slate-900 pr-4">
                      {faq.question}
                    </span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-6 h-6 text-primary flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="h-16"></div>

      {/* Article Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <article className="prose prose-slate lg:prose-lg max-w-none">
            {/* Article Introduction */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-6">
                {dict.carInsurance.article.intro1}
              </p>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-4">
                {dict.carInsurance.article.intro2}
              </p>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                {dict.carInsurance.article.intro3}
              </p>
            </div>

            {/* Online Insurance Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white text-lg">
                  💻
                </span>
                {dict.carInsurance.article.onlineInsurance.title}
              </h2>
              <p className="text-slate-700 leading-relaxed mb-6">
                {dict.carInsurance.article.onlineInsurance.content}
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {dict.carInsurance.article.onlineInsurance.benefitsTitle}
                </h3>
                <ul className="space-y-3">
                  {dict.carInsurance.article.onlineInsurance.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-slate-600 leading-relaxed">
                {dict.carInsurance.article.onlineInsurance.footer}
              </p>
            </div>

            {/* How to Insure Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-lg">
                  📋
                </span>
                {dict.carInsurance.article.howToInsure.title}
              </h2>
              <p className="text-slate-700 leading-relaxed mb-6">
                {dict.carInsurance.article.howToInsure.content}
              </p>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 mb-6">
                <ol className="space-y-3 list-decimal list-inside">
                  {dict.carInsurance.article.howToInsure.steps.map((step, idx) => (
                    <li key={idx} className="text-slate-700 leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-slate-700 leading-relaxed">
                {dict.carInsurance.article.howToInsure.footer}
              </p>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                {dict.carInsurance.article.conclusion.title}
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                {dict.carInsurance.article.conclusion.content}
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* CSS Animations and Custom Styles */}
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

        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, var(--primary) 0%, rgb(37, 99, 235) 100%);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, var(--primary) 0%, rgb(37, 99, 235) 100%);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}
