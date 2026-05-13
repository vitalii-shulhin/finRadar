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
  // {
  //   id: 1,
  //   name: 'ARX',
  //   logo: '🛡️',
  //   rating: 4.8,
  //   reviews: 2341,
  //   minPrice: 4308,
  //   maxPrice: 8500,
  //   paymentPlans: ['Оплата повністю', 'Розстрочка 3 місяці', 'Розстрочка 6 місяців'],
  //   features: [
  //     'Миттєве оформлення онлайн',
  //     'Електронний поліс на email',
  //     'Реєстрація в МТСБУ',
  //     'Цілодобова підтримка',
  //     'Безкоштовна доставка',
  //   ],
  //   coverageLimit: 130000,
  //   processingTime: '5 хвилин',
  //   onlineApplication: true,
  //   installments: true,
  //   discount: 15,
  //   popular: true,
  //   recommended: true,
  //   color: 'from-blue-500 to-blue-600',
  // },
  // {
  //   id: 2,
  //   name: 'УСК АСКА',
  //   logo: '🏢',
  //   rating: 4.7,
  //   reviews: 1876,
  //   minPrice: 4500,
  //   maxPrice: 9000,
  //   paymentPlans: ['Оплата повністю', 'Розстрочка 4 місяці'],
  //   features: [
  //     'Знижки для постійних клієнтів',
  //     'Онлайн калькулятор',
  //     'Широка мережа офісів',
  //     'Реєстрація протягом години',
  //     'Консультація експертів',
  //   ],
  //   coverageLimit: 130000,
  //   processingTime: '15 хвилин',
  //   onlineApplication: true,
  //   installments: true,
  //   discount: 10,
  //   popular: true,
  //   color: 'from-green-500 to-green-600',
  // },
  {
    id: 3,
    name: 'Hotline Finance',
    logo: '🚗',
    rating: 4.6,
    reviews: 1543,
    minPrice: 4700,
    maxPrice: 8800,
    paymentPlans: ['Оплата повністю', 'Розстрочка 3 місяці'],
    features:  [
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
  // {
  //   id: 4,
  //   name: 'Уніка',
  //   logo: '⭐',
  //   rating: 4.5,
  //   reviews: 1234,
  //   minPrice: 4600,
  //   maxPrice: 9200,
  //   paymentPlans: ['Оплата повністю', 'Розстрочка 2 місяці'],
  //   features: [
  //     'Гнучкі умови оплати',
  //     'Знижки для безаварійних водіїв',
  //     'Онлайн кабінет',
  //     'Пільги для пенсіонерів',
  //     'Електронний документообіг',
  //   ],
  //   coverageLimit: 130000,
  //   processingTime: '20 хвилин',
  //   onlineApplication: true,
  //   installments: true,
  //   discount: 8,
  //   color: 'from-purple-500 to-purple-600',
  // },
  // {
  //   id: 5,
  //   name: 'Країна',
  //   logo: '🇺🇦',
  //   rating: 4.7,
  //   reviews: 2103,
  //   minPrice: 4400,
  //   maxPrice: 8700,
  //   paymentPlans: ['Оплата повністю', 'Розстрочка 6 місяців'],
  //   features: [
  //     'Висока надійність',
  //     'Понад 15 років на ринку',
  //     'Програма лояльності',
  //     'Швидка виплата компенсацій',
  //     'Професійна команда',
  //   ],
  //   coverageLimit: 130000,
  //   processingTime: '10 хвилин',
  //   onlineApplication: true,
  //   installments: true,
  //   discount: 10,
  //   recommended: true,
  //   color: 'from-indigo-500 to-indigo-600',
  // },
  // {
  //   id: 6,
  //   name: 'ВУСО',
  //   logo: '🏆',
  //   rating: 4.4,
  //   reviews: 987,
  //   minPrice: 4800,
  //   maxPrice: 9500,
  //   paymentPlans: ['Оплата повністю', 'Розстрочка 3 місяці'],
  //   features: [
  //     'Прозорі умови',
  //     'Без прихованих платежів',
  //     'Офіси в усіх регіонах',
  //     'Підтримка в чаті',
  //     'Зручний особистий кабінет',
  //   ],
  //   coverageLimit: 130000,
  //   processingTime: '15 хвилин',
  //   onlineApplication: true,
  //   installments: true,
  //   discount: 7,
  //   color: 'from-teal-500 to-teal-600',
  // },
];

type BenefitType = 'none' | 'chornobyl' | 'veteran' | 'disabled' | 'pensioner' | 'participant';
type VehicleType = 'car' | 'truck' | 'motorcycle' | 'bus';
type SortOption = 'recommended' | 'price' | 'rating' | 'discount';

interface OsagoPageProps {
  lang: Locale;
}

export default function OsagoPageContent({ lang }: OsagoPageProps) {
  const dict = getDictionary(lang);

  // Calculator state
  const [vehicleType, setVehicleType] = useState<VehicleType>('car');
  const [engineVolume, setEngineVolume] = useState(1600);
  const [vehicleAge, setVehicleAge] = useState(5);
  const [benefit, setBenefit] = useState<BenefitType>('none');
  const [showCalculator, setShowCalculator] = useState(false);

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
      question: dict.osago.faq.question1.q,
      answer: dict.osago.faq.question1.a,
    },
    {
      question: dict.osago.faq.question2.q,
      answer: dict.osago.faq.question2.a,
    },
    {
      question: dict.osago.faq.question3.q,
      answer: dict.osago.faq.question3.a,
    },
    {
      question: dict.osago.faq.question4.q,
      answer: dict.osago.faq.question4.a,
    },
    {
      question: dict.osago.faq.question5.q,
      answer: dict.osago.faq.question5.a,
    },
    {
      question: dict.osago.faq.question6.q,
      answer: dict.osago.faq.question6.a,
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
              {dict.osago.breadcrumb.home}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/${lang}/insurance`} className="hover:text-primary font-medium transition-colors">
              {dict.osago.breadcrumb.insurance}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-slate-900 font-semibold">{dict.osago.breadcrumb.osago}</span>
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
                {dict.osago.hero.badge}
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary"></div>
            </div>

            {/* Main heading */}
            <div className="flex items-start gap-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 rounded-2xl blur-xl opacity-40"></div>
              </div>

              <div className="flex-1">
                <h1 className="sm:text-2xl md:text-3xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                  {dict.osago.hero.title}
                </h1>
                <p className="text-sm md:text-sm  text-gray-600 font-medium max-w-2xl">
                  {dict.osago.hero.subtitle}
                </p>
              </div>
            </div>

            {/* Trust indicators grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: dict.osago.hero.stats.minPrice.label, value: dict.osago.hero.stats.minPrice.value, icon: <TrendingDown className="w-5 h-5" />, gradient: 'from-emerald-500 to-green-600' },
                { label: dict.osago.hero.stats.coverage.label, value: dict.osago.hero.stats.coverage.value, icon: <Shield className="w-5 h-5" />, gradient: 'from-primary to-blue-600' },
                { label: dict.osago.hero.stats.companies.label, value: dict.osago.hero.stats.companies.value.replace('{count}', INSURANCE_COMPANIES.length.toString()), icon: <Award className="w-5 h-5" />, gradient: 'from-indigo-500 to-purple-600' },
                { label: dict.osago.hero.stats.processing.label, value: dict.osago.hero.stats.processing.value, icon: <Clock className="w-5 h-5" />, gradient: 'from-orange-500 to-amber-600' },
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
      <section className="relative py-2">
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
                        {dict.osago.calculator.title}
                      </h2>
                      <p className="text-sm text-gray-600 font-medium mt-1">
                        {dict.osago.calculator.subtitle}
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
                  <div className="mt-8 max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
                {/* Vehicle Type */}
                <div>
                  <label className="block text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide flex items-center gap-2">
                    <Car className="w-4 h-4 text-primary" />
                    {dict.osago.calculator.vehicleType.title}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'car' as VehicleType, label: dict.osago.calculator.vehicleType.car, icon: 'car' },
                      { value: 'truck' as VehicleType, label: dict.osago.calculator.vehicleType.truck, icon: 'truck' },
                      { value: 'motorcycle' as VehicleType, label: dict.osago.calculator.vehicleType.motorcycle, icon: 'motorcycle' },
                      { value: 'bus' as VehicleType, label: dict.osago.calculator.vehicleType.bus, icon: 'bus' },
                    ].map(type => (
                      <button
                        key={type.value}
                        onClick={() => setVehicleType(type.value)}
                        className={`relative p-3.5 rounded-xl border-2 transition-all font-medium shadow-sm ${
                          vehicleType === type.value
                            ? 'border-primary bg-primary/10 font-bold text-slate-900 shadow-lg scale-105'
                            : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Benefit Status */}
                <div>
                  <label className="block text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    {dict.osago.calculator.benefits.title}
                  </label>
                  <select
                    value={benefit}
                    onChange={(e) => setBenefit(e.target.value as BenefitType)}
                    className="w-full px-5 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary font-medium shadow-sm hover:border-primary/50 transition-all"
                  >
                    <option value="none">{dict.osago.calculator.benefits.none}</option>
                    <option value="veteran">{dict.osago.calculator.benefits.veteran}</option>
                    <option value="participant">{dict.osago.calculator.benefits.participant}</option>
                    <option value="disabled">{dict.osago.calculator.benefits.disabled}</option>
                    <option value="chornobyl">{dict.osago.calculator.benefits.chornobyl}</option>
                    <option value="pensioner">{dict.osago.calculator.benefits.pensioner}</option>
                  </select>
                </div>

                {/* Engine Volume */}
                <div>
                  <label className="block text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide">
                    {dict.osago.calculator.engineVolume}
                  </label>
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 p-5 rounded-xl border border-gray-200">
                    <input
                      type="range"
                      min="800"
                      max="5000"
                      step="100"
                      value={engineVolume}
                      onChange={(e) => setEngineVolume(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs font-semibold text-gray-500 uppercase">800</span>
                      <div className="text-2xl font-black text-primary bg-white px-4 py-1 rounded-lg shadow-md">
                        {engineVolume} см³
                      </div>
                      <span className="text-xs font-semibold text-gray-500 uppercase">5000</span>
                    </div>
                  </div>
                </div>

                {/* Vehicle Age */}
                <div>
                  <label className="block text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide">
                    {dict.osago.calculator.vehicleAge}
                  </label>
                  <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 p-5 rounded-xl border border-gray-200">
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="1"
                      value={vehicleAge}
                      onChange={(e) => setVehicleAge(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs font-semibold text-gray-500 uppercase">Новий</span>
                      <div className="text-2xl font-black text-primary bg-white px-4 py-1 rounded-lg shadow-md">
                        {vehicleAge === 0 ? 'Новий' : `${vehicleAge} ${vehicleAge === 1 ? 'рік' : vehicleAge < 5 ? 'роки' : 'років'}`}
                      </div>
                      <span className="text-xs font-semibold text-gray-500 uppercase">30+</span>
                    </div>
                  </div>
                </div>
              </div>

                    {/* Result - Premium Card */}
                    <div className="relative overflow-hidden rounded-2xl">
                      {/* Sophisticated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

                      {/* Layered ambient effects */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-blue-500/20"></div>
                      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-primary/40 to-transparent blur-3xl"></div>

                      {/* Subtle pattern overlay */}
                      <div
                        className="absolute inset-0 opacity-5"
                        style={{
                          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,.1) 20px, rgba(255,255,255,.1) 40px)`
                        }}
                      ></div>

                      {/* Content */}
                      <div className="relative z-10 p-8 md:p-10">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full mb-4">
                              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                              <span className="text-xs font-bold text-white uppercase tracking-wider">
                                {dict.osago.calculator.calculationComplete}
                              </span>
                            </div>

                            <div className="text-sm font-semibold text-white/70 uppercase tracking-wide mb-2">
                              {dict.osago.calculator.estimatedPrice}
                            </div>
                            <div className="sm:text-2xl md:text-3xl lg:text-6xl font-black text-white mb-3 tracking-tight">
                              {estimatedPrice.toLocaleString()} ₴
                            </div>
                            <div className="flex items-start gap-2 text-sm text-white/60 font-medium max-w-md">
                              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                              <span>
                                {dict.osago.calculator.disclaimer}
                              </span>
                            </div>
                          </div>

                          {/* Decorative shield */}
                          <div className="hidden lg:block relative">
                            <Shield className="w-28 h-28 text-white/10" />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent blur-2xl"></div>
                          </div>
                        </div>

                        {/* Quick actions */}

                        <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-white/10">
                          <Link
                              href={INSURANCE_COMPANIES[0].insuranceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 bg-white text-slate-900 px-6 py-3.5 rounded-xl font-bold hover:bg-white/90 transition-all shadow-xl hover:shadow-2xl hover:scale-105 text-center"
                          >
                            {dict.greenCard.calculator.apply}
                          </Link>
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

      {/* Main Content Area */}
      <section className="relative py-2">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Filters Sidebar - Magazine Editorial Style */}
            <aside
              className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}
              style={{
                animation: 'fadeInUp 0.6s ease-out 0.5s both'
              }}
            >
              <div className="relative">
                {/* Shadow layer */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-primary/5 rounded-2xl blur-xl translate-y-1"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  {/* Dark premium header */}
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 relative overflow-hidden">
                    {/* Subtle shine */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>

                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                          <Filter className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-lg font-black text-white uppercase tracking-wide">
                            {dict.osago.filters.title}
                          </h2>
                          {hasActiveFilters && (
                            <span className="inline-flex items-center gap-1 bg-primary text-white text-xs px-2 py-0.5 rounded-full font-bold mt-1">
                              {(selectedCompanies.length > 0 ? 1 : 0) + (maxPrice !== 10000 ? 1 : 0) + (onlyInstallments ? 1 : 0)} {dict.osago.filters.active}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={resetFilters}
                        className="text-xs font-bold text-white/70 hover:text-white disabled:opacity-30 uppercase tracking-wider transition-colors"
                        disabled={!hasActiveFilters}
                      >
                        {dict.osago.filters.reset}
                      </button>
                    </div>
                  </div>

                  <div className="p-6">

                    {/* Max Price Filter */}
                    <div className="mb-6">
                      <h3 className="text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide">
                        {dict.osago.filters.maxPrice}
                      </h3>
                      <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 rounded-xl border border-gray-200">
                        <input
                          type="range"
                          min="4000"
                          max="10000"
                          step="100"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs font-semibold text-gray-500">4 000 ₴</span>
                          <div className="text-lg font-black text-primary bg-white px-3 py-1 rounded-lg shadow-md">
                            {maxPrice.toLocaleString()} ₴
                          </div>
                          <span className="text-xs font-semibold text-gray-500">10 000 ₴</span>
                        </div>
                      </div>
                    </div>

                    {/* Installments Filter */}
                    <div className="mb-6">
                      <label className="flex items-center gap-3 cursor-pointer hover:bg-primary/5 p-4 rounded-xl transition-colors border-2 border-transparent hover:border-primary/20">
                        <input
                          type="checkbox"
                          checked={onlyInstallments}
                          onChange={(e) => setOnlyInstallments(e.target.checked)}
                          className="w-5 h-5 text-primary rounded-md focus:ring-2 focus:ring-primary"
                        />
                        <div className="flex-1">
                          <div className="font-bold text-gray-900">{dict.osago.filters.onlyInstallments}</div>
                          <div className="text-xs text-gray-500 font-medium mt-0.5">{dict.osago.filters.installmentsDescription}</div>
                        </div>
                        <CreditCard className="w-5 h-5 text-primary" />
                      </label>
                    </div>

                    {/* Company Filter */}
                    <div>
                      <h3 className="text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide flex items-center justify-between">
                        <span>{dict.osago.filters.company}</span>
                        {selectedCompanies.length > 0 && (
                          <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full font-bold">
                            {selectedCompanies.length}
                          </span>
                        )}
                      </h3>
                      <div className="space-y-1.5 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {companies.map(company => (
                          <label
                            key={company}
                            className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all ${
                              selectedCompanies.includes(company)
                                ? 'bg-primary/10 border-2 border-primary/30'
                                : 'hover:bg-gray-50 border-2 border-transparent'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedCompanies.includes(company)}
                              onChange={() => toggleCompany(company)}
                              className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary"
                            />
                            <span className={`text-sm font-medium ${
                              selectedCompanies.includes(company) ? 'text-slate-900' : 'text-gray-700'
                            }`}>
                              {company}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Card - Premium Design */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl"></div>

                <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-200/50 overflow-hidden">
                  {/* Top accent */}
                  <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600"></div>

                  <div className="p-6">
                    <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Info className="w-4 h-4 text-white" />
                      </div>
                      Важлива інформація
                    </h3>
                    <div className="text-sm space-y-2.5">
                      {[
                        { icon: '✓', text: 'Всі компанії ліцензовані НБУ', color: 'text-green-700' },
                        { icon: '✓', text: 'Автоматична реєстрація в МТСБУ', color: 'text-green-700' },
                        { icon: '✓', text: 'Електронний поліс має юридичну силу', color: 'text-green-700' },
                        { icon: '⚠️', text: 'ОСЦПВ обов\'язкове для всіх водіїв', color: 'text-amber-700' },
                      ].map((item, idx) => (
                        <p key={idx} className={`flex items-start gap-2 font-medium ${item.color}`}>
                          <span className="flex-shrink-0 text-base">{item.icon}</span>
                          <span>{item.text}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div
              className="flex-1"
              style={{
                animation: 'fadeInUp 0.6s ease-out 0.6s both'
              }}
            >
            {/* Sort Bar - Editorial Style */}
            <div className="relative mb-8">
              {/* Shadow layer */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-transparent rounded-2xl blur-lg translate-y-1"></div>

              <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-6 flex-wrap">
                    {/* Results count */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{dict.osago.sorting.found}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-2xl font-black text-slate-900">
                          {sortedProducts.length}
                        </span>
                        <span className="text-sm font-medium text-gray-600">
                          {sortedProducts.length === 1 ? dict.osago.sorting.offer_one : sortedProducts.length < 5 ? dict.osago.sorting.offer_few : dict.osago.sorting.offer_many}
                        </span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

                    {/* Sort selector */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{dict.osago.sorting.label}</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary font-bold text-slate-900 hover:border-primary/50 transition-all shadow-sm"
                      >
                        <option value="recommended">{dict.osago.sorting.recommended}</option>
                        <option value="price">{dict.osago.sorting.price}</option>
                        <option value="rating">{dict.osago.sorting.rating}</option>
                        <option value="discount">{dict.osago.sorting.discount}</option>
                      </select>
                    </div>
                  </div>

                  {/* Mobile filter toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                  >
                    <Filter className="w-4 h-4" />
                    {showFilters ? dict.osago.sorting.hideFilters : dict.osago.sorting.showFilters} {dict.osago.sorting.toggleFilters}
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-transparent rounded-3xl blur-xl"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 p-16 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Shield className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">{dict.osago.empty.title}</h3>
                  <p className="text-gray-600 font-medium mb-6">{dict.osago.empty.description}</p>
                  <button
                    onClick={resetFilters}
                    className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    {dict.osago.empty.resetButton}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6" id="products">
                {sortedProducts.map((product, idx) => (
                  <div
                    key={product.id}
                    className="relative group"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${0.7 + idx * 0.1}s both`
                    }}
                  >
                    {/* Shadow foundation */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-transparent rounded-2xl blur-xl translate-y-1 group-hover:translate-y-2 transition-transform"></div>

                    <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                      {/* Top accent bar with gradient */}
                      <div className={`h-1.5 bg-gradient-to-r ${product.color}`}></div>

                      <div className="p-6 lg:p-8">
                        {/* Product Header */}
                        <div className="flex items-start justify-between flex-wrap mb-6">
                          <div className="flex items-start gap-5 flex-1">
                            {/* Logo with enhanced styling */}
                            <div className="relative">
                              <div className={`w-20 h-20 bg-gradient-to-br ${product.color} rounded-2xl flex items-center justify-center text-4xl shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                {product.logo}
                              </div>
                              {/* Glow effect */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${product.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity`}></div>
                            </div>

                            <div className="flex-1">
                              {/* Company name and badges */}
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h3 className="text-2xl font-black text-slate-900">{product.name}</h3>
                                {product.recommended && (
                                  <span className="bg-primary text-white text-xs px-3 py-1 rounded-lg font-bold uppercase tracking-wide shadow-md">
                                    {dict.osago.companyCard.badges.recommended}
                                  </span>
                                )}
                                {product.popular && (
                                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs px-3 py-1 rounded-lg font-bold uppercase tracking-wide shadow-md">
                                    {dict.osago.companyCard.badges.popular}
                                  </span>
                                )}
                                {product.discount > 0 && (
                                  <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs px-3 py-1 rounded-lg font-bold uppercase tracking-wide shadow-md">
                                    {dict.osago.companyCard.badges.discount.replace('{percent}', product.discount.toString())}
                                  </span>
                                )}
                              </div>

                              {/* Rating and processing time */}
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-lg">
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  <span className="font-black text-slate-900">{product.rating}</span>
                                  <span className="text-gray-500 font-medium">({product.reviews})</span>
                                </div>
                                <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-lg">
                                  <Clock className="w-4 h-4 text-green-600" />
                                  <span className="font-bold text-green-700">{product.processingTime}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Price section */}
                          <div className="text-right ml-4">
                            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{dict.osago.companyCard.from}</div>
                            <div className="text-4xl font-black bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                              {product.minPrice.toLocaleString()} ₴
                            </div>
                            <div className="text-xs text-gray-500 font-medium mt-1">
                              {dict.osago.companyCard.upTo} {product.maxPrice.toLocaleString()} ₴
                            </div>
                          </div>
                        </div>

                        {/* Product Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="relative group/detail">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl blur opacity-0 group-hover/detail:opacity-100 transition-opacity"></div>
                            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200/50">
                              <Shield className="w-5 h-5 text-blue-600 mb-2" />
                              <div className="text-xs text-gray-600 font-bold uppercase tracking-wide mb-1">{dict.osago.companyCard.coverageLimit}</div>
                              <div className="font-black text-lg text-blue-700">{product.coverageLimit.toLocaleString()} ₴</div>
                            </div>
                          </div>

                          <div className="relative group/detail">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl blur opacity-0 group-hover/detail:opacity-100 transition-opacity"></div>
                            <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200/50">
                              <Clock className="w-5 h-5 text-green-600 mb-2" />
                              <div className="text-xs text-gray-600 font-bold uppercase tracking-wide mb-1">{dict.osago.companyCard.processing}</div>
                              <div className="font-black text-lg text-green-700">{product.processingTime}</div>
                            </div>
                          </div>

                          <div className="relative group/detail">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover/detail:opacity-100 transition-opacity"></div>
                            <div className="relative bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200/50">
                              <CreditCard className="w-5 h-5 text-purple-600 mb-2" />
                              <div className="text-xs text-gray-600 font-bold uppercase tracking-wide mb-1">{dict.osago.companyCard.installments}</div>
                              <div className="font-black text-lg text-purple-700">
                                {product.installments ? dict.osago.companyCard.installmentsAvailable : dict.osago.companyCard.installmentsNone}
                              </div>
                            </div>
                          </div>

                          <div className="relative group/detail">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-xl blur opacity-0 group-hover/detail:opacity-100 transition-opacity"></div>
                            <div className="relative bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200/50">
                              <Users className="w-5 h-5 text-orange-600 mb-2" />
                              <div className="text-xs text-gray-600 font-bold uppercase tracking-wide mb-1">{dict.osago.companyCard.onlineApplication}</div>
                              <div className="font-black text-lg text-orange-700">
                                {product.onlineApplication ? dict.osago.companyCard.yes : dict.osago.companyCard.no}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="mb-6">
                          <h4 className="text-sm font-black text-gray-700 uppercase tracking-wide mb-4">{dict.osago.companyCard.features}</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {product.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                                <div className="w-5 h-5 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <CheckCircle className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="font-medium">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Payment Plans */}
                        <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
                          <h4 className="text-sm font-black text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-primary" />
                            {dict.osago.companyCard.paymentMethods}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {product.paymentPlans.map((plan, idx) => (
                              <span
                                key={idx}
                                className="text-xs font-bold bg-white px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary transition-all"
                              >
                                {plan}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            href={product.insuranceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
                          >
                            <CheckCircle className="w-5 h-5" />
                            {dict.osago.companyCard.apply}
                          </Link>
                          {/*<button className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-xl font-black text-lg hover:bg-slate-900 hover:text-white transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">*/}
                          {/*  <Phone className="w-5 h-5" />*/}
                          {/*  Зателефонувати*/}
                          {/*</button>*/}
                        </div>
                    </div>
                  </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* What is Covered */}
          <div
            className="relative group"
            style={{
              animation: 'fadeInUp 0.6s ease-out 0.8s both'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-green-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>

            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
              {/* Top accent */}
              <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-green-600"></div>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">
                    {dict.osago.coverage.title}
                  </h2>
                </div>

                <ul className="space-y-4">
                  {dict.osago.coverage.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* What is NOT Covered */}
          <div
            className="relative group"
            style={{
              animation: 'fadeInUp 0.6s ease-out 0.9s both'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-orange-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>

            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
              {/* Top accent */}
              <div className="h-1.5 bg-gradient-to-r from-red-500 to-orange-600"></div>

              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">
                    {dict.osago.notCovered.title}
                  </h2>
                </div>

                <ul className="space-y-4">
                  {dict.osago.notCovered.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section - Premium Design */}
        <div
          className="mt-16 relative"
          style={{
            animation: 'fadeInUp 0.6s ease-out 1s both'
          }}
        >
          {/* Shadow layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-transparent rounded-3xl blur-2xl translate-y-2"></div>

          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Top accent */}
            <div className="h-1.5 bg-gradient-to-r from-primary via-blue-500 to-indigo-600"></div>

            <div className="p-8 lg:p-12">
              {/* Section header */}
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    Часті запитання про ОСЦПВ
                  </h2>
                  <p className="text-sm text-gray-600 font-medium mt-1">
                    Відповіді на найпопулярніші питання
                  </p>
                </div>
              </div>

              {/* FAQ items */}
              <div className="space-y-3">
                {faqData.map((faq, index) => (
                  <div
                    key={index}
                    className="border-2 border-gray-100 rounded-xl overflow-hidden hover:border-primary/30 transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="flex items-center justify-between w-full text-left p-5 hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-black text-slate-900 pr-4 text-lg">{faq.question}</h3>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        openFaq === index ? 'bg-primary' : 'bg-gray-100'
                      }`}>
                        {openFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-white" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-600" />
                        )}
                      </div>
                    </button>
                    {openFaq === index && (
                      <div className="px-5 pb-5 pt-2">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                          <p className="text-gray-700 leading-relaxed font-medium">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section - Premium Dark Design */}
        <div
          className="mt-16 relative"
          style={{
            animation: 'fadeInUp 0.6s ease-out 1.1s both'
          }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Sophisticated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

            {/* Layered ambient effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/20"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary/30 to-transparent blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-blue-500/20 to-transparent blur-3xl"></div>

            {/* Subtle pattern overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,.1) 30px, rgba(255,255,255,.1) 60px)`
              }}
            ></div>

            {/* Content */}
            <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
              <div className="max-w-3xl mx-auto">
                {/* Icon */}
                <div className="relative inline-block mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 rounded-2xl blur-2xl opacity-50"></div>
                </div>

                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-white uppercase tracking-wider">
                    {dict.osago.cta.badge}
                  </span>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                  {dict.osago.cta.title}
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl text-white/80 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
                  {dict.osago.cta.description}
                </p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                      href={INSURANCE_COMPANIES[0].insuranceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-black text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-xl"
                  >
                    {dict.osago.cta.emailButton}
                  </Link>
                </div>

                {/* Trust badge */}
                <div className="mt-10 pt-8 border-t border-white/10">
                  <div className="flex items-center justify-center gap-8 text-sm text-white/60 font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span>{dict.osago.cta.benefits.fast}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span>{dict.osago.cta.benefits.expert}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <span>{dict.osago.cta.benefits.free}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                {dict.osago.article.title}
              </p>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                {dict.osago.article.intro}
              </p>
            </div>

            {/* Buy Online Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center text-white text-lg">
                  🛒
                </span>
                {dict.osago.article.buyOnline.title}
              </h2>
              <p className="text-slate-700 leading-relaxed mb-6">
                {dict.osago.article.buyOnline.content}
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {dict.osago.article.buyOnline.benefits.title}
                </h3>
                <ul className="space-y-3">
                  {dict.osago.article.buyOnline.benefits.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-slate-600 leading-relaxed">
                {dict.osago.article.buyOnline.footer}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white text-lg">
                  💰
                </span>
                {dict.osago.article.pricing.title}
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                {dict.osago.article.pricing.intro}
              </p>

              <ul className="space-y-2 mb-6">
                {dict.osago.article.pricing.factors.map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700">
                    <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>

              <p className="text-slate-700 leading-relaxed mb-4">
                {dict.osago.article.pricing.summary}
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
                <p className="text-slate-700 leading-relaxed">
                  {dict.osago.article.pricing.calculator}
                </p>
              </div>
            </div>

            {/* Cheapest Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-lg">
                  🏷️
                </span>
                {dict.osago.article.cheapest.title}
              </h2>
              <p className="text-slate-700 leading-relaxed mb-6">
                {dict.osago.article.cheapest.intro}
              </p>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  {dict.osago.article.cheapest.compareTitle}
                </h3>
                <ul className="space-y-3">
                  {dict.osago.article.cheapest.compareItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Companies Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white text-lg">
                  🏢
                </span>
                {dict.osago.article.companies.title}
              </h2>
              <p className="text-slate-700 leading-relaxed mb-4">
                {dict.osago.article.companies.intro}
              </p>
              <p className="text-slate-700 leading-relaxed mb-4">
                {dict.osago.article.companies.popular}
              </p>
              <p className="text-slate-700 leading-relaxed">
                {dict.osago.article.companies.aggregators}
              </p>
            </div>

            {/* Conclusion */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                {dict.osago.article.conclusion.title}
              </h2>
              <p className="text-lg text-white/90 leading-relaxed">
                {dict.osago.article.conclusion.content}
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

        @supports (background: paint(id)) {
          .bg-gradient-radial {
            background: radial-gradient(circle at center, var(--tw-gradient-stops));
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
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
