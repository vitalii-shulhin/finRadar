'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  CreditCard,
  TrendingUp,
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
} from 'lucide-react';
import { type CreditOffer } from '@/data/creditOffers';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import CreditArticle from './CreditArticle';

interface CreditDetailPageProps {
  credit: CreditOffer;
  lang: Locale;
}

export default function CreditDetailPage({ credit, lang }: CreditDetailPageProps) {
  const dict = getDictionary(lang);

  const typeName = credit.type === 'credit-line'
    ? dict.allCredits.typeNames.creditLine
    : dict.allCredits.typeNames[credit.type];

  const bankKey = credit.bank.toLowerCase().replace(/\s/g, '').replace('банк', 'bank');
  const offers = dict.allCredits.offers as any;
  const features: string[] = offers[bankKey]?.features || [];

  // Get article data if articleId exists
  const articleData = credit.articleId ? (dict as any)[credit.articleId] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
          <Link href={`/${lang}/credits/all`} className="hover:text-indigo-600 transition-colors">
            {dict.allCredits.breadcrumb.allCredits}
          </Link>
          <span>/</span>
          <span className="font-semibold text-gray-900">{credit.bank}</span>
        </div>
      </div>

      {/* Back Button */}
      <div className="container-custom mb-6">
        <Link
          href={`/${lang}/credits/all`}
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {lang === 'uk' ? 'Назад до списку' : 'Назад к списку'}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container-custom pb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-3xl opacity-30"></div>

          <div className={`relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 sm:p-12 overflow-hidden shadow-2xl`}>
            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/10"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-white/5 to-transparent"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 bg-white rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden relative">
                    <Image
                      src={credit.logo}
                      alt={`${credit.bank} logo`}
                      width={128}
                      height={128}
                      className="object-contain p-3"
                    />
                  </div>
                  <div>
                    <div className="text-white/90 text-base font-bold mb-2 uppercase tracking-wide">{typeName}</div>
                    <h1 className="text-5xl font-black text-white mb-3 drop-shadow-lg">{credit.bank}</h1>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-yellow-400 px-4 py-2 rounded-full shadow-lg border-2 border-yellow-300">
                        <Star className="w-5 h-5 text-orange-600 fill-orange-600 drop-shadow" />
                        <span className="text-gray-900 font-black text-lg">{credit.rating}</span>
                      </div>
                      <span className="text-white font-bold text-base drop-shadow-md">
                        {credit.reviews.toLocaleString()} {lang === 'uk' ? 'відгуків' : 'отзывов'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-3 justify-end">
                  {credit.onlineApplication && (
                    <span className="bg-cyan-400 border-2 border-cyan-300 text-gray-900 text-sm font-black px-4 py-2 rounded-full shadow-lg">
                      {dict.allCredits.creditCard.badges.onlineApplication}
                    </span>
                  )}
                  {credit.instantDecision && (
                    <span className="bg-green-400 border-2 border-green-300 text-gray-900 text-sm font-black px-4 py-2 rounded-full shadow-lg">
                      {dict.allCredits.creditCard.badges.instantDecision}
                    </span>
                  )}
                  {!credit.requiresCollateral && (
                    <span className="bg-yellow-400 border-2 border-yellow-300 text-gray-900 text-sm font-black px-4 py-2 rounded-full shadow-lg">
                      {dict.allCredits.creditCard.badges.noCollateral}
                    </span>
                  )}
                </div>
              </div>

              {/* Main Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border-2 border-white/30 shadow-xl hover:bg-white/25 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <Wallet className="w-6 h-6 text-white drop-shadow" />
                    <span className="text-white font-bold text-sm uppercase tracking-wide">{dict.allCredits.creditCard.amount}</span>
                  </div>
                  <div className="text-2xl font-black text-white drop-shadow-lg">
                    {credit.minAmount.toLocaleString()} - {credit.maxAmount.toLocaleString()} ₴
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border-2 border-white/30 shadow-xl hover:bg-white/25 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <Percent className="w-6 h-6 text-white drop-shadow" />
                    <span className="text-white font-bold text-sm uppercase tracking-wide">{dict.allCredits.creditCard.rate}</span>
                  </div>
                  <div className="text-2xl font-black text-white drop-shadow-lg">
                    {credit.minRate}% - {credit.maxRate}%
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border-2 border-white/30 shadow-xl hover:bg-white/25 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-6 h-6 text-white drop-shadow" />
                    <span className="text-white font-bold text-sm uppercase tracking-wide">{dict.allCredits.creditCard.term}</span>
                  </div>
                  <div className="text-2xl font-black text-white drop-shadow-lg">
                    {credit.minTerm} - {credit.maxTerm} {lang === 'uk' ? 'міс' : 'мес'}
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border-2 border-white/30 shadow-xl hover:bg-white/25 transition-all">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-6 h-6 text-white drop-shadow" />
                    <span className="text-white font-bold text-sm uppercase tracking-wide">{dict.allCredits.creditCard.approval}</span>
                  </div>
                  <div className="text-xl font-black text-white drop-shadow-lg">
                    {offers[bankKey]?.approvalTime || (lang === 'uk' ? '1 день' : '1 день')}
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a
                  href={credit.creditUrl || credit.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 text-gray-900 px-8 py-5 rounded-xl font-black text-xl hover:from-yellow-300 hover:via-orange-300 hover:to-yellow-300 hover:scale-105 transition-all shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3 border-4 border-yellow-300/50"
                >
                  <CreditCard className="w-7 h-7" />
                  {dict.allCredits.creditCard.apply}
                </a>
                {credit.website && (
                  <a
                    href={credit.creditUrl || credit.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-white/30 backdrop-blur-md border-4 border-white/60 text-white px-8 py-5 rounded-xl font-black text-xl hover:bg-white/40 hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3"
                  >
                    <Globe className="w-7 h-7" />
                    {lang === 'uk' ? 'Відвідати сайт' : 'Посетить сайт'}
                    <ExternalLink className="w-5 h-5" />
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
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <Shield className="w-7 h-7 text-indigo-600" />
                {lang === 'uk' ? 'Основні переваги' : 'Основные преимущества'}
              </h2>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 hover:border-indigo-100 border-2 border-transparent transition-all">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-100">
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
                      ? 'Розрахунок платежів приблизний, точну суму вкаже банк'
                      : 'Расчет платежей приблизительный, точную сумму укажет банк'}
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
          </div>

          {/* Contact & Apply Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
              <h3 className="text-xl font-black text-gray-900 mb-6">
                {lang === 'uk' ? 'Контактна інформація' : 'Контактная информация'}
              </h3>

              <div className="space-y-4">
                {/*{credit.phone && (*/}
                {/*  <a*/}
                {/*    href={`tel:${credit.phone.replace(/\s/g, '')}`}*/}
                {/*    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 border-2 border-transparent transition-all"*/}
                {/*  >*/}
                {/*    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">*/}
                {/*      <Phone className="w-5 h-5 text-indigo-600" />*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*      <div className="text-xs text-gray-500 font-semibold">*/}
                {/*        {lang === 'uk' ? 'Гаряча лінія' : 'Горячая линия'}*/}
                {/*      </div>*/}
                {/*      <div className="font-bold text-gray-900">{credit.phone}</div>*/}
                {/*    </div>*/}
                {/*  </a>*/}
                {/*)}*/}

                {credit.website && (
                  <a
                    href={credit.creditUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 border-2 border-transparent transition-all"
                  >
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 font-semibold">
                        {lang === 'uk' ? 'Веб-сайт' : 'Веб-сайт'}
                      </div>
                      <div className="font-bold text-gray-900 text-sm truncate">{credit.website.replace('https://', '')}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </a>
                )}
              </div>

              <a
                href={credit.creditUrl || credit.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-black text-lg hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
              >
                <CreditCard className="w-6 h-6" />
                {dict.allCredits.creditCard.apply}
              </a>

              {/* Trust Badge */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-700 leading-relaxed font-semibold">
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

      {/* Article Section */}
      {articleData && (
        <section className="container-custom pb-12">
          <CreditArticle articleData={articleData} />
        </section>
      )}
    </div>
  );
}
