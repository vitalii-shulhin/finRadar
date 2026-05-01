'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  CreditCard,
  Building2,
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
  Banknote,
  Award,
  TrendingUp,
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
            {lang === 'uk' ? 'Готівкові кредити' : 'Наличные кредиты'}
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
          <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 rounded-3xl blur-2xl opacity-20"></div>

          <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl p-3">
                    <Image
                      src={product.logo}
                      alt={`${product.lender} logo`}
                      width={128}
                      height={128}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-white/80 text-sm font-bold mb-1 flex items-center gap-2 uppercase tracking-wide drop-shadow-md">
                      <Building2 className="w-4 h-4" />
                      {lang === 'uk' ? 'Готівковий кредит' : 'Наличный кредит'}
                    </div>
                    <h1 className="text-5xl font-black text-white mb-2 drop-shadow-lg">{product.lender}</h1>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 bg-yellow-400 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                        <span className="text-gray-900 font-bold">{product.rating}</span>
                      </div>
                      <span className="text-white font-bold text-sm drop-shadow-md">
                        {product.reviews.toLocaleString()} {lang === 'uk' ? 'відгуків' : 'отзывов'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 justify-end">
                  {product.recommended && (
                    <span className="bg-yellow-400 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {lang === 'uk' ? 'Рекомендуємо' : 'Рекомендуем'}
                    </span>
                  )}
                  {product.popular && (
                    <span className="bg-cyan-400 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {lang === 'uk' ? 'Популярний' : 'Популярный'}
                    </span>
                  )}
                  {product.firstLoanFree && (
                    <span className="bg-green-400 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      💰 {lang === 'uk' ? 'Перша позика 0%' : 'Первый заем 0%'}
                    </span>
                  )}
                </div>
              </div>

              {/* Main Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 hover:scale-105 transition-all drop-shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-6 h-6 text-white drop-shadow-md" />
                    <span className="text-white text-sm font-bold uppercase tracking-wide drop-shadow-md">
                      {lang === 'uk' ? 'Сума кредиту' : 'Сумма кредита'}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-white drop-shadow-lg">
                    {product.minAmount.toLocaleString()} - {product.maxAmount.toLocaleString()} ₴
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 hover:scale-105 transition-all drop-shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Percent className="w-6 h-6 text-white drop-shadow-md" />
                    <span className="text-white text-sm font-bold uppercase tracking-wide drop-shadow-md">
                      {lang === 'uk' ? 'Ставка на день' : 'Ставка в день'}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-white drop-shadow-lg">
                    {product.interestRate}
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 hover:scale-105 transition-all drop-shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-6 h-6 text-white drop-shadow-md" />
                    <span className="text-white text-sm font-bold uppercase tracking-wide drop-shadow-md">
                      {lang === 'uk' ? 'Термін' : 'Срок'}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-white drop-shadow-lg">
                    {product.minTerm} - {product.maxTerm} {lang === 'uk' ? 'днів' : 'дней'}
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 hover:scale-105 transition-all drop-shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-6 h-6 text-white drop-shadow-md" />
                    <span className="text-white text-sm font-bold uppercase tracking-wide drop-shadow-md">
                      {lang === 'uk' ? 'Час схвалення' : 'Время одобрения'}
                    </span>
                  </div>
                  <div className="text-xl font-black text-white drop-shadow-lg">
                    {product.approvalTime}
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a
                  href={product.creditUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-gray-900 px-8 py-5 rounded-xl font-black text-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-6 h-6" />
                  {lang === 'uk' ? 'Подати заявку' : 'Подать заявку'}
                </a>
                {product.website && (
                  <a
                    href={product.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-5 rounded-xl font-black text-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
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
            {/* Features */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-black text-indigo-600 mb-6 flex items-center gap-3">
                <CheckCircle className="w-7 h-7 text-green-600" />
                {lang === 'uk' ? 'Основні переваги' : 'Основные преимущества'}
              </h2>

              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            {product.requirements && product.requirements.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <FileText className="w-7 h-7 text-slate-700" />
                  {lang === 'uk' ? 'Вимоги для отримання' : 'Требования для получения'}
                </h2>

                <div className="space-y-3">
                  {product.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                      <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 font-medium">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Process Info */}
            <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl border border-slate-200 p-8">
              <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-xl">
                <Clock className="w-6 h-6 text-slate-700" />
                {lang === 'uk' ? 'Етапи отримання кредиту' : 'Этапы получения кредита'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-700 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {lang === 'uk' ? 'Заповніть заявку онлайн' : 'Заполните заявку онлайн'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {lang === 'uk' ? 'Вкажіть паспортні дані та суму' : 'Укажите паспортные данные и сумму'}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-700 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {lang === 'uk' ? 'Пройдіть верифікацію' : 'Пройдите верификацию'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {lang === 'uk' ? 'Фото паспорта та селфі' : 'Фото паспорта и селфи'}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-700 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {lang === 'uk' ? 'Миттєве рішення' : 'Мгновенное решение'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {lang === 'uk' ? 'Автоматичне схвалення за 2-10 хвилин' : 'Автоматическое одобрение за 2-10 минут'}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {lang === 'uk' ? 'Гроші на картку' : 'Деньги на карту'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {lang === 'uk' ? 'Зарахування протягом декількох хвилин' : 'Зачисление в течение нескольких минут'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-600" />
                {lang === 'uk' ? 'Важлива інформація' : 'Важная информация'}
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  {lang === 'uk'
                    ? 'Для нових клієнтів часто діє знижена ставка або 0%'
                    : 'Для новых клиентов часто действует сниженная ставка или 0%'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  {lang === 'uk'
                    ? 'Можливе дострокове погашення без штрафів'
                    : 'Возможно досрочное погашение без штрафов'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  {lang === 'uk'
                    ? 'Не потрібні довідки про доходи'
                    : 'Не требуются справки о доходах'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  {lang === 'uk'
                    ? 'При затримці платежу нараховуються штрафи'
                    : 'При задержке платежа начисляются штрафы'}
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
                      <div className="text-xs text-gray-600 font-semibold">
                        {lang === 'uk' ? 'Гаряча лінія' : 'Горячая линия'}
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
                      <div className="text-xs text-gray-600 font-semibold">
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
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl p-4 border border-slate-200">
                  <div className="text-xs text-gray-600 mb-1">
                    {lang === 'uk' ? 'Рейтинг' : 'Рейтинг'}
                  </div>
                  <div className="text-2xl font-black text-slate-700 flex items-center gap-1">
                    {product.rating}
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-100">
                  <div className="text-xs text-gray-600 mb-1">
                    {lang === 'uk' ? 'Від' : 'От'}
                  </div>
                  <div className="text-2xl font-black text-amber-700">{product.interestRateValue}%</div>
                </div>
              </div>

              <a
                href={product.creditUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-black text-lg hover:scale-105 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
              >
                <Banknote className="w-6 h-6" />
                {lang === 'uk' ? 'Подати заявку' : 'Подать заявку'}
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
                  ? 'Перед оформленням кредиту переконайтеся, що зможете вчасно сплачувати платежі. Несплата кредиту може призвести до додаткових штрафів та погіршення кредитної історії.'
                  : 'Перед оформлением кредита убедитесь, что сможете вовремя оплачивать платежи. Неуплата кредита может привести к дополнительным штрафам и ухудшению кредитной истории.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
