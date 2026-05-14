'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  CreditCard,
  Star,
  Percent,
  Calendar,
  Wallet,
  Clock,
  Phone,
  Globe,
  ArrowLeft,
  ExternalLink,
  Info,
  Shield,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { type MicrocreditProduct } from '@/data/microcreditProducts';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface CashCreditDetailPageProps {
  product: MicrocreditProduct;
  lang: Locale;
}

export default function CashCreditDetailPage({ product, lang }: CashCreditDetailPageProps) {
  const dict = getDictionary(lang);

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50/50 to-purple-50">
        {/* Breadcrumb */}
        <div className="container-custom py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href={`/${lang}`} className="hover:text-indigo-600 transition-colors">
              {dict.allCredits.breadcrumb.home}
            </Link>
            <span>/</span>
            <Link href={`/${lang}/credits`} className="hover:text-indigo-600 transition-colors">
              {dict.allCredits.breadcrumb.credits}
            </Link>
            <span>/</span>
            <Link href={`/${lang}/credits/cash`} className="hover:text-indigo-600 transition-colors">
              {lang === 'uk' ? 'Кредити готівкою' : 'Кредиты наличными'}
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-900">{product.lender}</span>
          </div>
        </div>

        {/* Back Button */}
        <div className="container-custom mb-6">
          <Link
              href={`/${lang}/credits/cash`}
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {lang === 'uk' ? 'Назад до списку' : 'Назад к списку'}
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container-custom pb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 sm:p-12 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>

              <div className="relative z-10">
                {/* Logo, Name, and Score */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                  <div className="w-40 h-40 sm:w-32 sm:h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden relative mx-auto mb-3 sm:mb-0">
                    <Image
                        src={product.logo}
                        alt={`${product.lender} logo`}
                        width={160}
                        height={160}
                        className="object-contain p-4"
                    />
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="text-white/90 text-sm font-bold uppercase tracking-wide mb-2">
                      {lang === 'uk' ? 'Готівковий кредит' : 'Наличный кредит'}
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black text-white mb-2 drop-shadow-lg">{product.lender}</h1>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                      <div className="flex items-center gap-1 bg-yellow-400 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-orange-600 fill-orange-600" />
                        <span className="text-gray-900 font-bold">{product.rating}</span>
                      </div>
                      <span className="text-white font-bold drop-shadow-md">
                      {product.reviews.toLocaleString()}{lang === 'uk' ? 'відгуків' : 'отзывов'}
                    </span>
                    </div>
                  </div>
                </div>

                {/* Main Stats: 2 per row mobile, 4 per row desktop */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="w-6 h-6 text-white drop-shadow" />
                      <span className="text-white text-sm font-bold uppercase tracking-wide">{dict.allCredits.creditCard.amount}</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">
                      {product.minAmount.toLocaleString()} - {product.maxAmount.toLocaleString()} ₴
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-6 h-6 text-white drop-shadow" />
                      <span className="text-white text-sm font-bold uppercase tracking-wide">{dict.allCredits.creditCard.rate}</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">
                      {product.interestRate}
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-6 h-6 text-white drop-shadow" />
                      <span className="text-white text-sm font-bold uppercase tracking-wide">{dict.allCredits.creditCard.term}</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">
                      до {product.maxTerm}{lang === 'uk' ? 'міс.' : 'мес.'}
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-6 h-6 text-white drop-shadow" />
                      <span className="text-white text-sm font-bold uppercase tracking-wide">{dict.allCredits.creditCard.approval}</span>
                    </div>
                    <div className="text-lg sm:text-xl font-black text-white drop-shadow-lg">
                      {product.approvalTime}
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <a
                      href={product.creditUrl || product.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-gray-900 px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-black text-lg sm:text-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-6 h-6" />
                    {dict.allCredits.creditCard.apply}
                  </a>
                  {product.website && (
                      <a
                          href={product.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-black text-lg sm:text-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                      >
                        <Globe className="w-6 h-6" />
                        {lang === 'uk' ? 'Відвідати сайт' : 'Посетить сайт'}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features & Details */}
        <section className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Features */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <CheckCircle className="w-7 h-7 text-indigo-600" />
                  {lang === 'uk' ? 'Переваги' : 'Преимущества'}
                </h2>
                <div className="space-y-3">
                  {product.features?.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 hover:border-indigo-100 border-2 border-transparent transition-all">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                  ))}
                </div>
              </div>
              {/* Requirements (if present) */}
              {product.requirements && product.requirements.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                    <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                      <FileText className="w-7 h-7 text-blue-600" />
                      {lang === 'uk' ? 'Вимоги для отримання' : 'Требования для получения'}
                    </h2>
                    <div className="space-y-3">
                      {product.requirements.map((requirement, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <span className="text-gray-700 font-medium">{requirement}</span>
                          </div>
                      ))}
                    </div>
                  </div>
              )}

              {/* Important Info */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-indigo-600" />
                  {lang === 'uk' ? 'Важлива інформація' : 'Важная информация'}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    {lang === 'uk'
                        ? 'Фінальна ставка та умови залежать від вашої кредитної історії'
                        : 'Финальная ставка и условия зависят от вашей кредитной истории'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    {lang === 'uk'
                        ? 'Читайте уважно договір перед підписанням'
                        : 'Внимательно читайте договор перед подписанием'}
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact & Apply Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
                <h3 className="text-xl font-black text-gray-900 mb-6">
                  {lang === 'uk' ? 'Контактна інформація' : 'Контактная информация'}
                </h3>

                <div className="space-y-4">
                  {product.phone && (
                      <a
                          href={`tel:${product.phone.replace(/\s/g, '')}`}
                          className="flex items-center gap-3 p-4 bg-indigo-100 rounded-xl hover:bg-indigo-200 hover:border-indigo-300 border-2 border-transparent transition-all"
                      >
                        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 font-semibold">
                            {lang === 'uk' ? 'Підтримка' : 'Поддержка'}
                          </div>
                          <div className="font-bold text-gray-900">{product.phone}</div>
                        </div>
                      </a>
                  )}
                  {product.website && (
                      <a
                          href={product.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-indigo-100 rounded-xl hover:bg-indigo-200 hover:border-indigo-300 border-2 border-transparent transition-all"
                      >
                        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                          <Globe className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 font-semibold">
                            {lang === 'uk' ? 'Веб-сайт' : 'Веб-сайт'}
                          </div>
                          <div className="font-bold text-gray-900 text-sm truncate">{product.website.replace('https://', '')}</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </a>
                  )}
                </div>

                <a
                    href={product.creditUrl || product.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-black text-lg hover:scale-105 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-6 h-6" />
                  {dict.allCredits.creditCard.apply}
                </a>

                {/* Trust Badge */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-700 leading-relaxed">
                      {lang === 'uk'
                          ? 'Перевірений кредитор. Ваші персональні дані захищені. Заявка безкоштовна.'
                          : 'Проверенный кредитор. Ваши персональные данные защищены. Заявка бесплатна.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}