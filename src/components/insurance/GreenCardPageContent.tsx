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
  Clock,
  FileText,
  Phone,
  Mail,
  Award,
  ChevronDown,
  ChevronUp,
  Globe,
  MapPin,
  Calendar,
  Zap,
  UserCheck,
  BadgeCheck,
  Info,
  Plane,
  Flag
} from 'lucide-react';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface InsuranceCompany {
  id: number;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  price15Days: number;
  priceMonth: number;
  features: string[];
  processingTime: string;
  onlineApplication: boolean;
  discount: number;
  popular?: boolean;
  recommended?: boolean;
  color: string;
  insuranceUrl: string;
}

const GREEN_CARD_COMPANIES: InsuranceCompany[] = [
  {
    id: 1,
    name: 'Hotline Finance',
    logo: '🛡️',
    rating: 4.9,
    reviews: 2145,
    price15Days: 800,
    priceMonth: 1500,
    features: [
      'Миттєве оформлення',
      'Покриття 48 країн',
      'Підтримка 24/7',
      'Електронний поліс',
    ],
    processingTime: '5 хвилин',
    onlineApplication: true,
    discount: 10,
    popular: true,
    recommended: true,
    color: 'from-blue-500 to-blue-600',
    insuranceUrl: 'https://rdr.fmcgsd.net/in/offer/2856?aid=91780&source=greencardua&dlink=https%3A%2F%2Fhotline.finance%2Fua%2Fgreen-card'
  },
  // {
  //   id: 1,
  //   name: 'Uniqa',
  //   logo: '🛡️',
  //   rating: 4.9,
  //   reviews: 2145,
  //   price15Days: 800,
  //   priceMonth: 1500,
  //   features: [
  //     'Миттєве оформлення',
  //     'Покриття 48 країн',
  //     'Підтримка 24/7',
  //     'Електронний поліс',
  //   ],
  //   processingTime: '5 хвилин',
  //   onlineApplication: true,
  //   discount: 10,
  //   popular: true,
  //   recommended: true,
  //   color: 'from-blue-500 to-blue-600',
  // },
  // {
  //   id: 2,
  //   name: 'Arsenal Insurance',
  //   logo: '⭐',
  //   rating: 4.8,
  //   reviews: 1823,
  //   price15Days: 750,
  //   priceMonth: 1450,
  //   features: [
  //     'Найнижча ціна',
  //     'Без комісії',
  //     'Швидке оформлення',
  //     'Мобільний додаток',
  //   ],
  //   processingTime: '7 хвилин',
  //   onlineApplication: true,
  //   discount: 15,
  //   recommended: true,
  //   color: 'from-purple-500 to-purple-600',
  // },
  // {
  //   id: 3,
  //   name: 'VUSO',
  //   logo: '💎',
  //   rating: 4.7,
  //   reviews: 1567,
  //   price15Days: 850,
  //   priceMonth: 1600,
  //   features: [
  //     'Преміум сервіс',
  //     'Консьєрж служба',
  //     'Всі типи авто',
  //     'Знижки постійним клієнтам',
  //   ],
  //   processingTime: '10 хвилин',
  //   onlineApplication: true,
  //   discount: 5,
  //   popular: true,
  //   color: 'from-amber-500 to-amber-600',
  // },
  // {
  //   id: 4,
  //   name: 'PZU Ukraine',
  //   logo: '🏆',
  //   rating: 4.8,
  //   reviews: 1945,
  //   price15Days: 790,
  //   priceMonth: 1480,
  //   features: [
  //     'Міжнародна мережа',
  //     'Швидка компенсація',
  //     'Онлайн трекінг',
  //     'Багаторічні полісі',
  //   ],
  //   processingTime: '8 хвилин',
  //   onlineApplication: true,
  //   discount: 12,
  //   color: 'from-red-500 to-red-600',
  // },
];

export default function GreenCardPageContent({ lang }: { lang: Locale }) {
  const dict = getDictionary(lang);

  // Calculator states
  const [vehicleType, setVehicleType] = useState('car');
  const [duration, setDuration] = useState('15');
  const [destination, setDestination] = useState('europe');

  // UI states
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Calculate estimated price
  const estimatedPrice = useMemo(() => {
    let basePrice = 800; // Base for 15 days

    // Adjust for duration
    if (duration === '21') basePrice = 1000;
    else if (duration === '30') basePrice = 1500;
    else if (duration === '60') basePrice = 2500;
    else if (duration === '90') basePrice = 3200;
    else if (duration === '180') basePrice = 5500;
    else if (duration === '365') basePrice = 9500;

    // Adjust for vehicle type
    if (vehicleType === 'bus') basePrice *= 2.5;
    else if (vehicleType === 'truck') basePrice *= 2.2;
    else if (vehicleType === 'motorcycle') basePrice *= 0.8;
    else if (vehicleType === 'trailer') basePrice *= 1.5;

    // Adjust for destination
    if (destination === 'moldova') basePrice *= 0.7;

    return Math.round(basePrice);
  }, [vehicleType, duration, destination]);

  const pricePerMonth = useMemo(() => {
    const durationNum = parseInt(duration);
    const months = durationNum / 30;
    return Math.round(estimatedPrice / months);
  }, [estimatedPrice, duration]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Link href={`/${lang}`} className="text-gray-500 hover:text-blue-600 transition-colors">
              {dict.greenCard.breadcrumb.home}
            </Link>
            <span className="text-gray-400">/</span>
            <Link href={`/${lang}/insurance`} className="text-gray-500 hover:text-blue-600 transition-colors">
              {dict.greenCard.breadcrumb.insurance}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-blue-600 font-semibold">{dict.greenCard.breadcrumb.greenCard}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64">
            <Globe className="w-full h-full text-white" />
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
              <span className="text-sm font-bold text-white">{dict.greenCard.hero.badges.secure}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              <Globe className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">{dict.greenCard.hero.badges.international}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              <Zap className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">{dict.greenCard.hero.badges.instant}</span>
            </div>
          </div>

          {/* Title */}
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="sm:text-2xl md:text-3xl lg:text-6xl font-black text-white mb-6 leading-tight">
              {dict.greenCard.hero.title}
            </h1>
            <p className="text-sm md:text-sm  text-green-100 font-medium mb-8 leading-relaxed">
              {dict.greenCard.hero.subtitle}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { icon: Clock, label: dict.greenCard.hero.stats.processing.label, value: dict.greenCard.hero.stats.processing.value },
                { icon: MapPin, label: dict.greenCard.hero.stats.countries.label, value: dict.greenCard.hero.stats.countries.value },
                { icon: Calendar, label: dict.greenCard.hero.stats.duration.label, value: dict.greenCard.hero.stats.duration.value },
                { icon: Star, label: dict.greenCard.hero.stats.rating.label, value: dict.greenCard.hero.stats.rating.value },
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                    <Icon className="w-8 h-8 text-green-200 mb-2 mx-auto" />
                    <div className="text-sm text-green-200 font-semibold mb-1">{stat.label}</div>
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
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4 font-bold">
                <Calculator className="w-5 h-5" />
                {dict.greenCard.calculator.title}
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
                {dict.greenCard.calculator.subtitle}
              </h2>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-xl border-2 border-green-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Vehicle Type */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    {dict.greenCard.calculator.vehicleType.label}
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-slate-900 focus:border-green-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="car">{dict.greenCard.calculator.vehicleType.car}</option>
                    <option value="motorcycle">{dict.greenCard.calculator.vehicleType.motorcycle}</option>
                    <option value="bus">{dict.greenCard.calculator.vehicleType.bus}</option>
                    <option value="truck">{dict.greenCard.calculator.vehicleType.truck}</option>
                    <option value="trailer">{dict.greenCard.calculator.vehicleType.trailer}</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    {dict.greenCard.calculator.duration.label}
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-slate-900 focus:border-green-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="15">{dict.greenCard.calculator.duration.days15}</option>
                    <option value="21">{dict.greenCard.calculator.duration.days21}</option>
                    <option value="30">{dict.greenCard.calculator.duration.month1}</option>
                    <option value="60">{dict.greenCard.calculator.duration.months2}</option>
                    <option value="90">{dict.greenCard.calculator.duration.months3}</option>
                    <option value="180">{dict.greenCard.calculator.duration.months6}</option>
                    <option value="365">{dict.greenCard.calculator.duration.year1}</option>
                  </select>
                </div>

                {/* Destination */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">
                    {dict.greenCard.calculator.destination.label}
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl font-semibold text-slate-900 focus:border-green-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="europe">{dict.greenCard.calculator.destination.europe}</option>
                    <option value="moldova">{dict.greenCard.calculator.destination.moldova}</option>
                  </select>
                </div>
              </div>

              {/* Estimated Price */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-center">
                <div className="text-green-100 font-bold mb-2">{dict.greenCard.calculator.estimatedPrice}</div>
                <div className="text-5xl font-black text-white mb-2">
                  {estimatedPrice.toLocaleString()} ₴
                </div>
                <div className="text-sm text-green-200 font-semibold">
                  {pricePerMonth.toLocaleString()} ₴/{dict.greenCard.calculator.perMonth}
                </div>
                <Link
                  href={GREEN_CARD_COMPANIES[0].insuranceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full md:w-auto px-8 py-4 bg-white text-green-600 rounded-xl font-black text-lg hover:bg-green-50 transition-colors shadow-lg text-center inline-block"
                >
                  {dict.greenCard.calculator.apply}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
                {dict.greenCard.coverage.title}
              </h2>
              <p className="text-lg text-gray-600 font-medium">
                {dict.greenCard.coverage.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dict.greenCard.coverage.items.map((item: any, idx: number) => (
                <div key={idx} className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 font-medium leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 flex items-start gap-4">
              <Info className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-lg font-black text-yellow-900 mb-2">{dict.greenCard.coverage.note.title}</h4>
                <p className="text-yellow-800 font-semibold">{dict.greenCard.coverage.note.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-bold">
                <Flag className="w-5 h-5" />
                {dict.greenCard.countries.badge}
              </div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
                {dict.greenCard.countries.title}
              </h2>
              <p className="text-lg text-gray-600 font-medium mb-8">
                {dict.greenCard.countries.subtitle}
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 border-2 border-blue-100">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {dict.greenCard.countries.list.map((country: string, idx: number) => (
                  <div key={idx} className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
                    <span className="text-sm font-bold text-slate-700">{country}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Companies Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
              {dict.greenCard.companies.title}
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              {dict.greenCard.companies.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">
            {GREEN_CARD_COMPANIES.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-2xl hover:border-green-300 transition-all duration-300"
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
                            ({company.reviews} {dict.greenCard.companies.card.reviews})
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-col gap-2">
                      {company.recommended && (
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                          {dict.greenCard.companies.card.badges.recommended}
                        </span>
                      )}
                      {company.popular && (
                        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                          {dict.greenCard.companies.card.badges.popular}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-white/80 text-sm font-semibold mb-1">
                      {dict.greenCard.companies.card.policyPrice}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-white/60 text-sm font-bold">{dict.greenCard.companies.card.from}</span>
                      <span className="text-3xl font-black text-white">{company.price15Days} ₴</span>
                      <span className="text-white/60 text-sm font-bold">/ 15 {dict.greenCard.companies.card.days}</span>
                    </div>
                  </div>
                </div>

                {/* Company Details */}
                <div className="p-6">
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-slate-700 mb-3">{dict.greenCard.companies.card.features}</h4>
                    <div className="space-y-2">
                      {company.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-slate-600 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Processing Time */}
                  <div className="mb-6 flex items-center gap-2 bg-green-50 rounded-xl p-3">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-bold text-green-700">
                      {dict.greenCard.companies.card.processing}: {company.processingTime}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      href={company.insuranceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl text-center"
                    >
                      {dict.greenCard.companies.card.apply}
                    </Link>
                    <button className="px-6 bg-gray-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">
                      <Phone className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-200">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black">{dict.greenCard.requirements.title}</h2>
                    <p className="text-blue-100 font-semibold">{dict.greenCard.requirements.subtitle}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="space-y-4">
                  {dict.greenCard.requirements.items.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 bg-blue-50 rounded-xl p-4">
                      <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="font-semibold text-slate-700">{item}</span>
                    </div>
                  ))}
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
                {dict.greenCard.faq.title}
              </h2>
              <p className="text-lg text-gray-600 font-medium">
                {dict.greenCard.faq.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              {[
                dict.greenCard.faq.question1,
                dict.greenCard.faq.question2,
                dict.greenCard.faq.question3,
                dict.greenCard.faq.question4,
                dict.greenCard.faq.question5,
                dict.greenCard.faq.question6,
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
                      <ChevronUp className="w-6 h-6 text-green-600 flex-shrink-0" />
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
      <section className="py-16 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96">
            <Globe className="w-full h-full text-white" />
          </div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-bold mb-6">
              {dict.greenCard.cta.badge}
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              {dict.greenCard.cta.title}
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              {dict.greenCard.cta.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href={GREEN_CARD_COMPANIES[0].insuranceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-green-600 rounded-xl font-black text-lg hover:bg-green-50 transition-colors shadow-xl text-center"
              >
                <Plane className="inline-block w-5 h-5 mr-2" />
                {dict.greenCard.cta.applyButton}
              </Link>
              {/*<button className="px-8 py-4 bg-green-500 text-white rounded-xl font-black text-lg hover:bg-green-600 transition-colors border-2 border-white/30">*/}
              {/*  <Phone className="inline-block w-5 h-5 mr-2" />*/}
              {/*  {dict.greenCard.cta.phoneButton}*/}
              {/*</button>*/}
            </div>

            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-200" />
                <span className="text-green-100 font-semibold">{dict.greenCard.cta.benefits.fast}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-green-200" />
                <span className="text-green-100 font-semibold">{dict.greenCard.cta.benefits.support}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-green-200" />
                <span className="text-green-100 font-semibold">{dict.greenCard.cta.benefits.trusted}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg max-w-none">
              {/* Introduction */}
              <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-2 border-gray-100">
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  Зелена карта — це обов'язковий страховий поліс для поїздок за кордон на автомобілі.
                  Він підтверджує наявність страхування цивільної відповідальності водія в інших країнах.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed font-medium mt-4">
                  Без зеленої карти виїзд на власному автомобілі до більшості країн Європи неможливий.
                  Поліс діє в країнах, які входять до міжнародної системи Green Card.
                </p>
              </div>

              {/* Що таке зелена карта */}
              <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-2 border-gray-100">
                <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-green-600" />
                  Що таке зелена карта
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed font-medium mb-4">
                  Зелена карта — це міжнародний аналог автоцивілки. Вона покриває збитки, які водій може
                  завдати іншим учасникам дорожнього руху за кордоном.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed font-medium mb-4">
                  Поліс може покривати:
                </p>
                <ul className="space-y-3 mb-4">
                  <li className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span>ремонт іншого автомобіля</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span>шкоду здоров'ю постраждалих</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span>пошкодження майна третіх осіб</span>
                  </li>
                </ul>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  Водночас зелена карта не покриває пошкодження власного автомобіля винуватця ДТП.
                </p>
              </div>

              {/* Зелена карта онлайн */}
              <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-2 border-gray-100">
                <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <Globe className="w-8 h-8 text-green-600" />
                  Зелена карта онлайн
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed font-medium mb-4">
                  Оформити зелену карту онлайн можна без відвідування офісу страхової компанії.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed font-medium mb-4">
                  Для оформлення зазвичай потрібно:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span>вказати дані автомобіля</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span>обрати країни поїздки</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span>визначити термін дії поліса</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span>оплатити страхування</span>
                  </li>
                </ul>
                <p className="text-lg text-gray-700 leading-relaxed font-medium mt-4">
                  Після оформлення користувач отримує електронний документ або готовий поліс.
                </p>
              </div>

              {/* Ціна зеленої карти */}
              <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-2 border-gray-100">
                <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <Calculator className="w-8 h-8 text-green-600" />
                  Ціна зеленої карти
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed font-medium mb-4">
                  Вартість зеленої карти залежить від кількох факторів:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span>тип транспортного засобу</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span>країни поїздки</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span>термін дії поліса</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span>категорія автомобіля</span>
                  </li>
                </ul>
                <p className="text-lg text-gray-700 leading-relaxed font-medium mt-4">
                  Чим довший термін дії поліса та більша кількість країн покриття, тим вищою може бути ціна страховки.
                </p>
              </div>

              {/* Як купити зелену карту */}
              <div className="bg-white rounded-3xl shadow-lg p-8 mb-8 border-2 border-gray-100">
                <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <BadgeCheck className="w-8 h-8 text-green-600" />
                  Як купити зелену карту
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed font-medium mb-4">
                  Купити зелену карту онлайн можна за кілька хвилин. Для цього достатньо порівняти доступні
                  пропозиції, обрати відповідний варіант та оплатити поліс.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed font-medium mb-4">
                  Перед оформленням рекомендується звернути увагу на:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span>термін дії</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span>перелік країн</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span>ціну</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span>репутацію страхової компанії</span>
                  </li>
                </ul>
              </div>

              {/* Висновок */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-lg p-8 border-2 border-green-100">
                <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <Award className="w-8 h-8 text-green-600" />
                  Висновок
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  Зелена карта — це обов'язкове страхування для поїздок за кордон на автомобілі.
                  Онлайн оформлення дозволяє швидко купити поліс, порівняти ціни та отримати документ
                  без відвідування офісу.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
