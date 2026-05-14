'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  CreditCard,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  Star,
  Percent,
  Calendar,
  Wallet,
  Phone,
  Globe,
  AlertCircle,
  Info,
  ArrowLeft,
  ExternalLink,
  FileText,
  Gift,
  Smartphone,
  TrendingUp,
} from 'lucide-react';
import { type MicrocreditProduct } from '@/data/microcreditProducts';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface MicrocreditDetailPageProps {
  product: MicrocreditProduct;
  lang: Locale;
}

export default function MicrocreditDetailPage({ product, lang }: MicrocreditDetailPageProps) {
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
            <Link href={`/${lang}/credits/microcredits`} className="hover:text-indigo-600 transition-colors">
              {lang === 'uk' ? 'Мікрокредити' : 'Микрокредиты'}
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-900">{product.lender}</span>
          </div>
        </div>

        {/* Back Button */}
        <div className="container-custom mb-6">
          <Link
              href={`/${lang}/credits/microcredits`}
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

              {/* Animated particles effect */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              <div className="relative z-10">
                {/* Responsive: stack on mobile, row on md+ */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 mb-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="w-40 h-40 sm:w-32 sm:h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden relative mb-2 sm:mb-0">
                      <Image
                          src={product.logo}
                          alt={`${product.lender} logo`}
                          width={160}
                          height={160}
                          className="object-contain p-4"
                      />
                    </div>
                    <div className="text-center sm:text-left">
                      <div className="text-white/90 text-sm font-bold uppercase tracking-wide mb-1 flex items-center gap-2 drop-shadow-md justify-center sm:justify-start">
                        <Zap className="w-4 h-4" />
                        {lang === 'uk' ? 'Швидкий мікрокредит' : 'Быстрый микрокредит'}
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
                        <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4 text-white" />
                          <span className="text-white font-bold">{product.approvalTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Badges */}
                  <div className="flex flex-row sm:flex-col flex-wrap gap-2 justify-center sm:justify-end mt-3 sm:mt-0">
                    {product.firstLoanFree && (
                        <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <Gift className="w-3 h-3" />
                          {lang === 'uk' ? 'Перший безкоштовно!' : 'Первый бесплатно!'}
                    </span>
                    )}
                    {product.recommended && (
                        <span className="bg-green-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                          {lang === 'uk' ? 'Рекомендуємо' : 'Рекомендуем'}
                    </span>
                    )}
                    {product.popular && (
                        <span className="bg-cyan-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                      {lang === 'uk' ? 'Популярний' : 'Популярный'}
                    </span>
                    )}
                  </div>
                </div>

                {/* Main Stats - mobile 2/row, desktop 4/row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 sm:mt-8">
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="w-6 h-6 text-white drop-shadow-md" />
                      <span className="text-white text-sm font-bold uppercase tracking-wide drop-shadow-md">
                      {lang === 'uk' ? 'Сума' : 'Сумма'}
                    </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">
                      {product.minAmount.toLocaleString()} - {product.maxAmount.toLocaleString()} ₴
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-6 h-6 text-white drop-shadow-md" />
                      <span className="text-white text-sm font-bold uppercase tracking-wide drop-shadow-md">
                      {lang === 'uk' ? 'Ставка' : 'Ставка'}
                    </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">
                      {product.interestRate}
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-6 h-6 text-white drop-shadow-md" />
                      <span className="text-white text-sm font-bold uppercase tracking-wide drop-shadow-md">
                      {lang === 'uk' ? 'Термін' : 'Срок'}
                    </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">
                      до {product.maxTerm}{lang === 'uk' ? 'днів' : 'дней'}
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-6 h-6 text-white drop-shadow-md" />
                      <span className="text-white text-sm font-bold uppercase tracking-wide drop-shadow-md">
                      {lang === 'uk' ? 'Схвалення' : 'Одобрение'}
                    </span>
                    </div>
                    <div className="text-lg sm:text-xl font-black text-white drop-shadow-lg">
                      {product.approvalTime}
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <button className="flex-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-gray-900 px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-black text-lg sm:text-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2">
                    <Zap className="w-6 h-6" />
                    {lang === 'uk' ? 'Отримати зараз' : 'Получить сейчас'}
                  </button>
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
              {/* First Loan Free Banner */}
              {product.firstLoanFree && (
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-lg p-8 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    </div>
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Gift className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black mb-2">
                          {lang === 'uk' ? '🎉 Перший кредит безкоштовно!' : '🎉 Первый кредит бесплатно!'}
                        </h3>
                        <p className="text-white/90 leading-relaxed">
                          {lang === 'uk'
                              ? 'Отримайте свій перший мікрокредит під 0% або 0.01%. Повертайте тільки суму кредиту без переплати!'
                              : 'Получите свой первый микрокредит под 0% или 0.01%. Возвращайте только сумму кредита без переплаты!'}
                        </p>
                      </div>
                    </div>
                  </div>
              )}

              {/* Features */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <CheckCircle className="w-7 h-7 text-indigo-600" />
                  {lang === 'uk' ? 'Переваги' : 'Преимущества'}
                </h2>

                <div className="space-y-3">
                  {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl hover:from-cyan-100 hover:to-blue-100 transition-colors">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              {product.requirements && product.requirements.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                      <FileText className="w-7 h-7 text-blue-600" />
                      {lang === 'uk' ? 'Що потрібно для оформлення' : 'Что нужно для оформления'}
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

              {/* How it works */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6 sm:p-8">
                <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-lg sm:text-xl">
                  <Smartphone className="w-6 h-6 text-purple-600" />
                  {lang === 'uk' ? 'Як це працює' : 'Как это работает'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <div className="font-bold text-gray-900">
                        {lang === 'uk' ? 'Заповніть онлайн-заявку' : 'Заполните онлайн-заявку'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {lang === 'uk' ? 'Займе 2-3 хвилини, без довідок' : 'Займет 2-3 минуты, без справок'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <div className="font-bold text-gray-900">
                        {lang === 'uk' ? 'Миттєве рішення' : 'Мгновенное решение'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {lang === 'uk' ? `Автоматичне схвалення за ${product.approvalTime}` : `Автоматическое одобрение за ${product.approvalTime}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div>
                      <div className="font-bold text-gray-900">
                        {lang === 'uk' ? 'Отримайте гроші' : 'Получите деньги'}
                      </div>
                      <div className="text-sm text-gray-600">
                        {lang === 'uk' ? 'На картку протягом 5-15 хвилин, 24/7' : 'На карту в течение 5-15 минут, 24/7'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Info */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 sm:p-8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-indigo-600" />
                  {lang === 'uk' ? 'Важлива інформація' : 'Важная информация'}
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    {lang === 'uk'
                        ? 'Мікрокредит - це короткострокова позика на невеликі суми'
                        : 'Микрокредит - это краткосрочный займ на небольшие суммы'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    {lang === 'uk'
                        ? 'Відсотки нараховуються щодня, тому погасіть кредит якомога швидше'
                        : 'Проценты начисляются ежедневно, поэтому погасите кредит как можно быстрее'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    {lang === 'uk'
                        ? 'Не потрібні довідки про доходи, але потрібна картка на ваше ім\'я'
                        : 'Не нужны справки о доходах, но нужна карта на ваше имя'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    {lang === 'uk'
                        ? 'Можливе дострокове погашення без штрафів'
                        : 'Возможно досрочное погашение без штрафов'}
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
                            {lang === 'uk' ? 'Підтримка 24/7' : 'Поддержка 24/7'}
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

                {/* Stats */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border border-cyan-100">
                    <div className="text-xs text-gray-600 mb-1">
                      {lang === 'uk' ? 'Рейтинг' : 'Рейтинг'}
                    </div>
                    <div className="text-2xl font-black text-cyan-600 flex items-center gap-1">
                      {product.rating}
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="text-xs text-gray-600 mb-1">
                      {lang === 'uk' ? 'Час схвалення' : 'Время одобрения'}
                    </div>
                    <div className="text-lg font-black text-purple-600">{product.approvalTime}</div>
                  </div>
                </div>

                <a
                    href={product.creditUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-black text-lg hover:scale-105 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                >
                  <Zap className="w-6 h-6" />
                  {lang === 'uk' ? 'Отримати кредит' : 'Получить кредит'}
                </a>

                {/* Trust Badge */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-700 leading-relaxed">
                      {lang === 'uk'
                          ? 'Всі дані захищені. Компанія ліцензована НБУ. Заявка безкоштовна і ні до чого не зобов\'язує.'
                          : 'Все данные защищены. Компания лицензирована НБУ. Заявка бесплатна и ни к чему не обязывает.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Warning Banner */}
        <section className="container-custom py-8">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 mb-2">
                  {lang === 'uk' ? 'Пам\'ятайте про відповідальне кредитування' : 'Помните об ответственном кредитовании'}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {lang === 'uk'
                      ? 'Мікрокредити - це швидкий спосіб отримати невелику суму грошей, але відсотки нараховуються щодня. Переконайтеся, що зможете повернути кредит вчасно. Несплата може призвести до штрафів та погіршення кредитної історії.'
                      : 'Микрокредиты - это быстрый способ получить небольшую сумму денег, но проценты начисляются ежедневно. Убедитесь, что сможете вернуть кредит вовремя. Неуплата может привести к штрафам и ухудшению кредитной истории.'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
}