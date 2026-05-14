'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  CreditCard,
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
  Zap,
} from 'lucide-react';
import { type LoanProduct } from '@/data/loanProducts';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

interface OnlineCreditDetailPageProps {
  product: LoanProduct;
  lang: Locale;
}

export default function OnlineCreditDetailPage({ product, lang }: OnlineCreditDetailPageProps) {
  const dict = getDictionary(lang);

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Breadcrumb */}
        <div className="container-custom py-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <Link href={`/${lang}`} className="hover:text-indigo-600 transition-colors">
              {dict.allCredits.breadcrumb.home}
            </Link>
            <span>/</span>
            <Link href={`/${lang}/credits`} className="hover:text-indigo-600 transition-colors">
              {dict.allCredits.breadcrumb.credits}
            </Link>
            <span>/</span>
            <Link href={`/${lang}/credits/online`} className="hover:text-indigo-600 transition-colors">
              {lang === 'uk' ? 'Онлайн кредити' : 'Онлайн кредиты'}
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-900">{product.lender}</span>
          </div>
        </div>

        {/* Back Button */}
        <div className="container-custom mb-6">
          <Link
              href={`/${lang}/credits/online`}
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {lang === 'uk' ? 'Назад до списку' : 'Назад к списку'}
          </Link>
        </div>

        {/* Hero Section */}
        <section className="container-custom pb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-4 sm:p-8 md:p-12 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="relative z-10">

                {/* Responsive: Stack vertically on mobile, row on md+ */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 mb-6">
                  {/* Logo & Info */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 flex-1 w-full">
                    {/* Logo */}
                    <div className="w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl mb-3 sm:mb-0">
                      <Image
                          src={product.lenderLogo}
                          alt={`${product.lender} logo`}
                          width={128}
                          height={128}
                          className="object-contain p-2 sm:p-3"
                      />
                    </div>
                    {/* Text Info */}
                    <div className="text-center sm:text-left">
                      {/*<div className="text-white/80 text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">*/}
                      {/*  {lang === 'uk' ? 'Онлайн кредит' : 'Онлайн кредит'}*/}
                      {/*</div>*/}
                      <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-1 sm:mb-2 drop-shadow-lg">{product.lender}</h1>
                      {/*<p className="text-lg sm:text-xl text-white/90 font-semibold mb-2 sm:mb-3">{product.productName}</p>*/}
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <div className="flex items-center gap-1 bg-yellow-400 px-2 sm:px-3 py-1 rounded-full">
                          <Star className="w-4 h-4 text-orange-600 fill-orange-600" />
                          <span className="text-gray-900 font-bold text-base">{product.rating}</span>
                        </div>
                        <span className="text-white font-bold text-xs sm:text-sm drop-shadow-md">
                        {product.reviews.toLocaleString()}{lang === 'uk' ? 'відгуків' : 'отзывов'}
                      </span>
                        <div className="flex items-center gap-1 bg-green-400 px-2 sm:px-3 py-1 rounded-full">
                          <CheckCircle className="w-4 h-4 text-gray-900" />
                          <span className="text-gray-900 font-bold text-base">{product.approvalRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Badges */}
                  <div className="flex flex-row sm:flex-col flex-wrap gap-2 justify-center sm:justify-end mt-3 sm:mt-0">
                    {product.recommended && (
                        <span className="bg-cyan-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                      {lang === 'uk' ? 'Рекомендуємо' : 'Рекомендуем'}
                    </span>
                    )}
                    {product.popular && (
                        <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                      {lang === 'uk' ? 'Популярний' : 'Популярный'}
                    </span>
                    )}
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 sm:mt-8">
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="w-6 h-6 text-white" />
                      <span className="text-white text-xs font-bold uppercase tracking-wider drop-shadow-md">
                      {lang === 'uk' ? 'Сума' : 'Сумма'}
                    </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">
                      {product.minAmount.toLocaleString()} - {product.maxAmount.toLocaleString()} ₴
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Percent className="w-6 h-6 text-white" />
                      <span className="text-white text-xs font-bold uppercase tracking-wider drop-shadow-md">
                      {lang === 'uk' ? 'Ставка' : 'Ставка'}
                    </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">
                      {product.interestRate}
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-6 h-6 text-white" />
                      <span className="text-white text-xs font-bold uppercase tracking-wider drop-shadow-md">
                      {lang === 'uk' ? 'Термін' : 'Срок'}
                    </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">
                      до {product.maxTerm}{lang === 'uk' ? 'днів' : 'дней'}
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-4 border-2 border-white/30 hover:bg-white/25 transition-all">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-6 h-6 text-white" />
                      <span className="text-white text-xs font-bold uppercase tracking-wider drop-shadow-md">
                      {lang === 'uk' ? 'Схвалення' : 'Одобрение'}
                    </span>
                    </div>
                    <div className="text-lg sm:text-xl font-black text-white drop-shadow-lg">
                      {product.approvalTime}
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
                  <a
                      href={product.creditUrl || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-gray-900 px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-black text-base sm:text-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-6 h-6" />
                    {lang === 'uk' ? 'Отримати кредит' : 'Получить кредит'}
                  </a>
                  {product.website && (
                      <a
                          href={product.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 border-2 border-white/30 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-xl font-black text-base sm:text-xl hover:scale-105 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
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
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <CheckCircle className="w-7 h-7 text-indigo-600" />
                  {lang === 'uk' ? 'Переваги' : 'Преимущества'}
                </h2>
                <div className="space-y-3">
                  {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                  <FileText className="w-7 h-7 text-indigo-600" />
                  {lang === 'uk' ? 'Вимоги для отримання' : 'Требования для получения'}
                </h2>
                <div className="space-y-3">
                  {product.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 font-medium">{requirement}</span>
                      </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-4 sm:p-8">
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
                        ? 'Розрахунок платежів приблизний, точну суму вкаже кредитор'
                        : 'Расчет платежей приблизительный, точную сумму укажет кредитор'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    {lang === 'uk'
                        ? 'Читайте уважно договір перед підписанням'
                        : 'Внимательно читайте договор перед подписанием'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 font-bold">•</span>
                    {lang === 'uk'
                        ? 'Перший кредит може бути безкоштовним або під зниженою ставкою'
                        : 'Первый кредит может быть бесплатным или под сниженной ставкой'}
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact & Apply card (not sticky on mobile) */}
            <div className="lg:col-span-1 mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-6">
                  {lang === 'uk' ? 'Контактна інформація' : 'Контактная информация'}
                </h3>
                <div className="space-y-4">
                  {product.phone && (
                      <a
                          href={`tel:${product.phone.replace(/\s/g, '')}`}
                          className="flex items-center gap-3 p-3 bg-indigo-100 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 border-2 border-transparent transition-all"
                      >
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <Phone className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 font-semibold">
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
                          className="flex items-center gap-3 p-3 bg-indigo-100 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 border-2 border-transparent transition-all"
                      >
                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <Globe className="w-5 h-5 text-indigo-600" />
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
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-3 border border-emerald-100">
                    <div className="text-xs text-gray-600 mb-1">
                      {lang === 'uk' ? 'Схвалення' : 'Одобрений'}
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-emerald-600">{product.approvalRate}%</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-3 border border-blue-100">
                    <div className="text-xs text-gray-600 mb-1">
                      {lang === 'uk' ? 'Рейтинг' : 'Рейтинг'}
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-blue-600">{product.rating}</div>
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
                          ? 'Ваші дані захищені і не передаються третім особам. Заявка безкоштовна.'
                          : 'Ваши данные защищены и не передаются третьим лицам. Заявка бесплатна.'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Warning Banner */}
        <section className="container-custom py-8">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-4 sm:p-6">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 mb-1 sm:mb-2">
                  {lang === 'uk' ? 'Пам\'ятайте про відповідальне кредитування' : 'Помните об ответственном кредитовании'}
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
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