'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Shield,
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
  Info,
  MapPin
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
    insuranceUrl: 'https://rdr.fmcgsd.net/in/offer/2856?aid=91780&source=osagoru&dlink=https%3A%2F%2Fhotline.finance%2Fua%2Fosago'
  },
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
  //     'Широка мережа офісів',
  //     'Досвід з 1990 року',
  //     'Європротокол',
  //     'Онлайн консультації',
  //     'Знижки постійним клієнтам',
  //   ],
  //   coverageLimit: 130000,
  //   processingTime: '10 хвилин',
  //   onlineApplication: true,
  //   installments: true,
  //   discount: 10,
  //   recommended: true,
  //   color: 'from-emerald-500 to-emerald-600',
  // },
  // {
  //   id: 3,
  //   name: 'VUSO',
  //   logo: '💎',
  //   rating: 4.6,
  //   reviews: 1523,
  //   minPrice: 4400,
  //   maxPrice: 8800,
  //   paymentPlans: ['Оплата повністю', 'Розстрочка 3 місяці'],
  //   features: [
  //     'Швидке врегулювання збитків',
  //     'Мобільний додаток',
  //     'Безкоштовні консультації юриста',
  //     'Цілодобова аварійна служба',
  //     'Партнерська мережа СТО',
  //   ],
  //   coverageLimit: 130000,
  //   processingTime: '7 хвилин',
  //   onlineApplication: true,
  //   installments: true,
  //   discount: 12,
  //   popular: true,
  //   color: 'from-purple-500 to-purple-600',
  // },
  // {
  //   id: 4,
  //   name: 'УНІКА',
  //   logo: '⭐',
  //   rating: 4.5,
  //   reviews: 1342,
  //   minPrice: 4600,
  //   maxPrice: 9200,
  //   paymentPlans: ['Оплата повністю', 'Розстрочка 6 місяців'],
  //   features: [
  //     'Гнучкі умови оплати',
  //     'Особистий менеджер',
  //     'Безкоштовна евакуація',
  //     'Страхування з доставкою',
  //     'Програма лояльності',
  //   ],
  //   coverageLimit: 130000,
  //   processingTime: '15 хвилин',
  //   onlineApplication: true,
  //   installments: true,
  //   discount: 8,
  //   color: 'from-amber-500 to-amber-600',
  // },
  // {
  //   id: 5,
  //   name: 'PZU Україна',
  //   logo: '🔷',
  //   rating: 4.7,
  //   reviews: 1998,
  //   minPrice: 4700,
  //   maxPrice: 9500,
  //   paymentPlans: ['Оплата повністю', 'Розстрочка 3 місяці', 'Розстрочка 12 місяців'],
  //   features: [
  //     'Міжнародний досвід',
  //     'Надійність та стабільність',
  //     'Асистанс 24/7',
  //     'Онлайн кабінет',
  //     'Бонуси за безаварійну їзду',
  //   ],
  //   coverageLimit: 130000,
  //   processingTime: '10 хвилин',
  //   onlineApplication: true,
  //   installments: true,
  //   discount: 10,
  //   color: 'from-red-500 to-red-600',
  // },
  // {
  //   id: 6,
  //   name: 'ІНГО Україна',
  //   logo: '🛡️',
  //   rating: 4.6,
  //   reviews: 1654,
  //   minPrice: 4550,
  //   maxPrice: 9100,
  //   paymentPlans: ['Оплата повністю', 'Розстрочка 4 місяці'],
  //   features: [
  //     'Швидка виплата',
  //     'Електронний документообіг',
  //     'Дорожня допомога',
  //     'Знижки для молодих водіїв',
  //     'Партнерство з банками',
  //   ],
  //   coverageLimit: 130000,
  //   processingTime: '12 хвилин',
  //   onlineApplication: true,
  //   installments: true,
  //   discount: 9,
  //   color: 'from-indigo-500 to-indigo-600',
  // },
];

type VehicleType = 'car' | 'truck' | 'motorcycle' | 'bus';
type BenefitType = 'none' | 'chornobyl' | 'veteran' | 'disabled' | 'pensioner' | 'participant';
type SortOption = 'recommended' | 'price' | 'rating' | 'discount';

interface OsagoLocationPageProps {
  city: 'kyiv' | 'kharkiv' | 'dnipro' | 'lviv' | 'odesa' | 'zaporizhzhia' | 'motorcycle';
  lang: Locale;
}

export default function OsagoLocationPage({ city, lang }: OsagoLocationPageProps) {
  const dict = getDictionary(lang);
  const cityData = dict.osago.cities[city];
  const cityName = cityData.name;
  const cityNameGenitive = cityData.nameGenitive;
  // Calculator state
  const [vehicleType, setVehicleType] = useState<VehicleType>(city === 'motorcycle' ? 'motorcycle' : 'car');
  const [engineVolume, setEngineVolume] = useState(city === 'motorcycle' ? 600 : 1600);
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

  const pageTitle = city === 'motorcycle'
    ? dict.osago.cities.motorcycle.title
    : cityData.title;

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
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-gray-50"></div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(0,0,0,.03) 40px, rgba(0,0,0,.03) 80px)`
          }}
        ></div>
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-radial from-primary/10 via-blue-500/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/8 to-transparent blur-3xl"></div>
      </div>

      {/* Breadcrumb */}
      <div className="relative">
        <div className="container-custom py-4">
          <div className="inline-flex items-center gap-2 text-sm bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg border border-gray-100">
            <Link href="/" className="hover:text-primary font-medium transition-colors">
              {dict.osago.breadcrumb.home}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/insurance" className="hover:text-primary font-medium transition-colors">
              {dict.osago.breadcrumb.insurance}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/insurance/osago" className="hover:text-primary font-medium transition-colors">
              {dict.osago.breadcrumb.osago}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-slate-900 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {cityName}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16">
        <div className="container-custom">
          <div
            className="relative"
            style={{
              animation: 'fadeInUp 0.6s ease-out'
            }}
          >
            {/* Premium badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-bold text-emerald-700">{dict.osago.hero.badges.secure}</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-blue-700">{dict.osago.hero.badges.licensed}</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Award className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-bold text-amber-700">{dict.osago.hero.badges.experience}</span>
              </div>
            </div>

            {/* Main heading */}
            <h1 className="sm:text-2xl md:text-3xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
              {pageTitle}
            </h1>

            {/* Subheading */}
            <p className="text-sm md:text-sm  text-gray-600 mb-8 font-medium max-w-3xl leading-relaxed">
              {city === 'motorcycle'
                ? dict.osago.cities.motorcycle.subtitle
                : dict.osago.cities[city].subtitle
              }
            </p>

            {/* Key stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
              {[
                { icon: Clock, label: dict.osago.hero.stats.processing.label, value: dict.osago.hero.stats.processing.value },
                { icon: TrendingDown, label: dict.osago.hero.stats.minPrice.label, value: city === 'motorcycle' ? '2 800 ₴' : dict.osago.hero.stats.minPrice.value },
                { icon: Users, label: dict.osago.hero.stats.companies.label, value: dict.osago.hero.stats.companies.value.replace('{count}', String(INSURANCE_COMPANIES.length)) },
                { icon: Star, label: 'Рейтинг', value: '4.7/5' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <stat.icon className="w-8 h-8 text-primary mb-3" />
                  <div className="text-sm text-gray-600 font-semibold mb-1">{stat.label}</div>
                  <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section - Similar to main OSAGO page */}
      <section className="relative py-2">
        <div className="container-custom">
          <div
            className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
            style={{
              animation: 'fadeInUp 0.6s ease-out 0.3s both'
            }}
          >
            <div className="h-1.5 bg-gradient-to-r from-primary via-blue-500 to-indigo-600"></div>

            <div className="p-8 lg:p-12">
              <button
                onClick={() => setShowCalculator(!showCalculator)}
                className="flex items-center justify-between w-full mb-8"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <Calculator className="w-7 h-7 text-white" />
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
                {showCalculator ? (
                  <ChevronUp className="w-8 h-8 text-gray-400" />
                ) : (
                  <ChevronDown className="w-8 h-8 text-gray-400" />
                )}
              </button>

              {showCalculator && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Vehicle Type */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                        {dict.osago.calculator.vehicleType.label}
                      </label>
                      <select
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value as VehicleType)}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        disabled={city === 'motorcycle'}
                      >
                        <option value="car">{dict.osago.calculator.vehicleType.car}</option>
                        <option value="truck">{dict.osago.calculator.vehicleType.truck}</option>
                        <option value="motorcycle">{dict.osago.calculator.vehicleType.motorcycle}</option>
                        <option value="bus">{dict.osago.calculator.vehicleType.bus}</option>
                      </select>
                    </div>

                    {/* Engine Volume */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                        {dict.osago.calculator.engineVolume}
                      </label>
                      <input
                        type="number"
                        value={engineVolume}
                        onChange={(e) => setEngineVolume(Number(e.target.value))}
                        min={city === 'motorcycle' ? 50 : 800}
                        max={city === 'motorcycle' ? 2000 : 6000}
                        step="100"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    {/* Vehicle Age */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                        {dict.osago.calculator.vehicleAge}
                      </label>
                      <input
                        type="number"
                        value={vehicleAge}
                        onChange={(e) => setVehicleAge(Number(e.target.value))}
                        min="0"
                        max="30"
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    {/* Benefits */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                        {dict.osago.calculator.benefits.label}
                      </label>
                      <select
                        value={benefit}
                        onChange={(e) => setBenefit(e.target.value as BenefitType)}
                        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      >
                        <option value="none">{dict.osago.calculator.benefits.none}</option>
                        <option value="chornobyl">{dict.osago.calculator.benefits.chornobyl}</option>
                        <option value="veteran">{dict.osago.calculator.benefits.veteran}</option>
                        <option value="disabled">{dict.osago.calculator.benefits.disabled}</option>
                        <option value="pensioner">{dict.osago.calculator.benefits.pensioner}</option>
                        <option value="participant">{dict.osago.calculator.benefits.participant}</option>
                      </select>
                    </div>
                  </div>

                  {/* Estimated Price */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl"></div>
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center">
                      <div className="text-sm font-bold text-white/70 uppercase tracking-wider mb-2">
                        {dict.osago.calculator.estimatedPrice}
                      </div>
                      <div className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4">
                        {estimatedPrice.toLocaleString()} ₴
                      </div>
                      <p className="text-white/60 text-sm font-medium max-w-2xl mx-auto">
                        {dict.osago.calculator.disclaimer}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Filters and Insurance Companies */}
      <section className="relative py-2">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Filters Sidebar */}
            <aside
              className={`lg:w-80 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}
              style={{
                animation: 'fadeInUp 0.6s ease-out 0.5s both'
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-primary/5 rounded-2xl blur-xl translate-y-1"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 relative overflow-hidden">
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

              {/* Info Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl"></div>

                <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg border border-blue-200/50 overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600"></div>

                  <div className="p-6">
                    <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Info className="w-4 h-4 text-white" />
                      </div>
                      {dict.osago.infoCard.title}
                    </h3>
                    <div className="text-sm space-y-2.5">
                      {[
                        { icon: '✓', text: dict.osago.infoCard.item1, color: 'text-green-700' },
                        { icon: '✓', text: dict.osago.infoCard.item2, color: 'text-green-700' },
                        { icon: '✓', text: dict.osago.infoCard.item3, color: 'text-green-700' },
                        { icon: '⚠️', text: dict.osago.infoCard.item4, color: 'text-amber-700' },
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
              {/* Sort Bar */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/5 to-transparent rounded-2xl blur-lg translate-y-1"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-6 flex-wrap">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-bold text-gray-700">
                          {dict.osago.sorting.found} <span className="text-primary">{sortedProducts.length}</span> {sortedProducts.length === 1 ? dict.osago.sorting.offer_one : sortedProducts.length < 5 ? dict.osago.sorting.offer_few : dict.osago.sorting.offer_many}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-gray-700 hidden sm:block">{dict.osago.sorting.label}</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-semibold text-sm text-gray-900 hover:border-primary transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="recommended">{dict.osago.sorting.recommended}</option>
                        <option value="price">{dict.osago.sorting.price}</option>
                        <option value="rating">{dict.osago.sorting.rating}</option>
                        <option value="discount">{dict.osago.sorting.discount}</option>
                      </select>

                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="lg:hidden px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2"
                      >
                        <Filter className="w-4 h-4" />
                        {dict.osago.sorting.toggleFilters}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Insurance Companies Grid */}
              {sortedProducts.length === 0 ? (
                <div className="text-center py-16">
                  <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">{dict.osago.empty.title}</h3>
                  <p className="text-gray-500 mb-6">{dict.osago.empty.description}</p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all"
                  >
                    {dict.osago.empty.resetButton}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {sortedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/5 to-transparent rounded-3xl blur-lg translate-y-1 group-hover:blur-xl transition-all"></div>

                      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
                        {/* Top gradient accent */}
                        <div className={`h-1.5 bg-gradient-to-r ${product.color}`}></div>

                        <div className="p-8">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                              <div className={`w-16 h-16 bg-gradient-to-br ${product.color} rounded-2xl flex items-center justify-center text-3xl shadow-2xl`}>
                                {product.logo}
                              </div>
                              <div>
                                <h3 className="text-2xl font-black text-slate-900 mb-1">{product.name}</h3>
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                    <span className="font-bold text-gray-900">{product.rating}</span>
                                  </div>
                                  <span className="text-sm text-gray-500 font-medium">
                                    {product.reviews.toLocaleString()} {dict.osago.companyCard.reviews}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Badges */}
                            <div className="flex flex-wrap gap-2 justify-end">
                              {product.popular && (
                                <span className="bg-amber-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                                  {dict.osago.companyCard.badges.popular}
                                </span>
                              )}
                              {product.recommended && (
                                <span className="bg-emerald-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                                  {dict.osago.companyCard.badges.recommended}
                                </span>
                              )}
                              {product.discount > 0 && (
                                <span className="bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide">
                                  {dict.osago.companyCard.badges.discount.replace('{percent}', String(product.discount))}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Price */}
                          <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 mb-6 border-2 border-gray-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-bold text-gray-600 uppercase tracking-wide mb-2">
                                  {dict.osago.companyCard.policyPrice}
                                </div>
                                <div className="flex items-baseline gap-2">
                                  <span className="text-4xl font-black text-slate-900">
                                    {product.minPrice.toLocaleString()}
                                  </span>
                                  <span className="text-2xl font-bold text-gray-500">₴</span>
                                </div>
                                {product.minPrice !== product.maxPrice && (
                                  <div className="text-sm text-gray-500 font-medium mt-1">
                                    {dict.osago.companyCard.upTo} {product.maxPrice.toLocaleString()} ₴
                                  </div>
                                )}
                              </div>
                              <div className="text-right">
                                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl border-2 border-emerald-500/30 mb-2">
                                  <Clock className="w-4 h-4 text-emerald-600" />
                                  <span className="text-sm font-bold text-emerald-700">{product.processingTime}</span>
                                </div>
                                <div className="text-xs text-gray-600 font-semibold">
                                  {dict.osago.companyCard.coverageLimit}: {product.coverageLimit.toLocaleString()} грн
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-xl p-5 mb-6 border border-blue-100">
                            <h4 className="text-sm font-black text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-600" />
                              {dict.osago.companyCard.features}
                            </h4>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
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
                            {/*<button className="flex-1 bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2">*/}
                            {/*  <CheckCircle className="w-5 h-5" />*/}
                            {/*  {dict.osago.companyCard.apply}*/}
                            {/*</button>*/}
                            <Link
                                href={INSURANCE_COMPANIES[0].insuranceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-2"
                            >
                              {dict.osago.cta.emailButton}
                            </Link>
                            {/*<button className="px-8 py-4 border-2 border-slate-900 text-slate-900 rounded-xl font-black text-lg hover:bg-slate-900 hover:text-white transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">*/}
                            {/*  <Phone className="w-5 h-5" />*/}
                            {/*  {dict.osago.companyCard.call}*/}
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
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-2">
        <div className="container-custom">
          <div
            className="mt-16 relative"
            style={{
              animation: 'fadeInUp 0.6s ease-out 1s both'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-transparent rounded-3xl blur-2xl translate-y-2"></div>

            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-primary via-blue-500 to-indigo-600"></div>

              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                    <FileText className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                      {dict.osago.faq.title}
                    </h2>
                    <p className="text-sm text-gray-600 font-medium mt-1">
                      {dict.osago.faq.subtitle}
                    </p>
                  </div>
                </div>

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
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-2">
        <div className="container-custom">
          <div
            className="mt-16 relative"
            style={{
              animation: 'fadeInUp 0.6s ease-out 1.1s both'
            }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-blue-500/20"></div>
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-primary/30 to-transparent blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-blue-500/20 to-transparent blur-3xl"></div>

              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,.1) 30px, rgba(255,255,255,.1) 60px)`
                }}
              ></div>

              <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center">
                <div className="max-w-3xl mx-auto">
                  <div className="relative inline-block mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 rounded-2xl blur-2xl opacity-50"></div>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-white uppercase tracking-wider">
                      {dict.osago.cta.badge}
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                    {dict.osago.cta.title}
                  </h2>

                  <p className="text-lg md:text-xl text-white/80 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
                    {dict.osago.cta.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/*<button className="group relative px-8 py-4 bg-white text-slate-900 rounded-xl font-black text-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2">*/}
                    {/*  <Phone className="w-5 h-5 text-primary" />*/}
                    {/*  <span className="relative z-10">{dict.osago.cta.phoneButton}</span>*/}
                    {/*  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>*/}
                    {/*</button>*/}

                    {/*<button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-black text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-xl">*/}
                    {/*  <Mail className="w-5 h-5" />*/}
                    {/*  {dict.osago.cta.emailButton}*/}
                    {/*</button>*/}
                    <Link
                        href={INSURANCE_COMPANIES[0].insuranceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-black text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-xl"
                    >
                      {dict.osago.cta.emailButton}
                    </Link>
                  </div>

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
