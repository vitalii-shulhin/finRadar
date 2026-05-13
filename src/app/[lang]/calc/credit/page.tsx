'use client';

import Link from 'next/link';
import { Calculator, ArrowLeft, TrendingUp, Car, Home, ShoppingBag } from 'lucide-react';
import { getDictionary } from '@/i18n/dictionaries';
import type { Locale } from '@/i18n/config';

export default function CreditCalculatorLandingPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);

  const LOAN_TYPES = [
    {
      type: 'consumer',
      title: dict.calculators.creditCalculator.loanTypes.consumer.title,
      description: dict.calculators.creditCalculator.loanTypes.consumer.description,
      icon: ShoppingBag,
      color: 'from-blue-500 to-indigo-600',
      amount: dict.calculators.creditCalculator.loanTypes.consumer.amount,
      rate: dict.calculators.creditCalculator.loanTypes.consumer.rate,
      term: dict.calculators.creditCalculator.loanTypes.consumer.term,
      href: `/${params.lang}/calc/credit/consumer`,
    },
    {
      type: 'mortgage',
      title: dict.calculators.creditCalculator.loanTypes.mortgage.title,
      description: dict.calculators.creditCalculator.loanTypes.mortgage.description,
      icon: Home,
      color: 'from-purple-500 to-pink-600',
      amount: dict.calculators.creditCalculator.loanTypes.mortgage.amount,
      rate: dict.calculators.creditCalculator.loanTypes.mortgage.rate,
      term: dict.calculators.creditCalculator.loanTypes.mortgage.term,
      href: `/${params.lang}/calc/credit/mortgage`,
    },
    {
      type: 'auto',
      title: dict.calculators.creditCalculator.loanTypes.auto.title,
      description: dict.calculators.creditCalculator.loanTypes.auto.description,
      icon: Car,
      color: 'from-green-500 to-teal-600',
      amount: dict.calculators.creditCalculator.loanTypes.auto.amount,
      rate: dict.calculators.creditCalculator.loanTypes.auto.rate,
      term: dict.calculators.creditCalculator.loanTypes.auto.term,
      href: `/${params.lang}/calc/credit/auto`,
    },
  ];
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-indigo-50/20 to-gray-50"></div>
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(0,0,0,.02) 50px, rgba(0,0,0,.02) 100px)`,
          }}
        ></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-indigo-500/10 via-primary/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-purple-500/8 to-transparent blur-3xl"></div>
      </div>

      {/* Breadcrumb */}
      <div className="relative">
        <div className="container-custom py-4">
          <div className="inline-flex items-center gap-2 text-sm bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg border border-gray-100">
            <Link href={`/${params.lang}`} className="hover:text-primary font-medium transition-colors">
              {dict.calculators.creditCalculator.breadcrumb.home}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-slate-900 font-semibold">{dict.calculators.creditCalculator.breadcrumb.calculator}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-2">
        <div className="container-custom">
          <div
            style={{
              animation: 'fadeInUp 0.6s ease-out',
            }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                {dict.calculators.creditCalculator.hero.badge}
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary"></div>
            </div>

            <div className="flex items-start gap-6 mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Calculator className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl blur-xl opacity-40"></div>
              </div>

              <div className="flex-1">
                <h1 className="sm:text-2xl md:text-3xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    {dict.calculators.creditCalculator.hero.title}
                  </span>
                </h1>
                <p className="text-sm md:text-sm  text-gray-600 font-medium max-w-2xl">
                  {dict.calculators.creditCalculator.hero.description}
                </p>
              </div>
            </div>

            <Link
              href={`/${params.lang}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {dict.common.backToHome}
            </Link>
          </div>
        </div>
      </section>

      {/* Loan Type Selection */}
      <section className="relative pb-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LOAN_TYPES.map((loan, index) => {
              const Icon = loan.icon;
              return (
                <Link
                  key={loan.type}
                  href={loan.href}
                  className="group"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${0.1 * (index + 1)}s both`,
                  }}
                >
                  <div className="relative h-full">
                    {/* Shadow */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-transparent rounded-3xl blur-xl translate-y-1 group-hover:translate-y-2 transition-transform"></div>

                    {/* Card */}
                    <div className="relative h-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden group-hover:shadow-3xl group-hover:border-gray-300 transition-all">
                      {/* Top accent */}
                      <div className={`h-2 bg-gradient-to-r ${loan.color}`}></div>

                      <div className="p-8">
                        {/* Icon */}
                        <div className="relative mb-6">
                          <div
                            className={`w-16 h-16 bg-gradient-to-br ${loan.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                          >
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${loan.color} rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity`}
                          ></div>
                        </div>

                        {/* Content */}
                        <h2 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                          {loan.title}
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">{loan.description}</p>

                        {/* Stats */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600 font-medium">{dict.calculators.creditCalculator.loanTypes.labels.amount}:</span>
                            <span className="text-sm font-bold text-slate-900">
                              {loan.amount}
                            </span>
                          </div>
                          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600 font-medium">{dict.calculators.creditCalculator.loanTypes.labels.rate}:</span>
                            <span className="text-sm font-bold text-slate-900">{loan.rate}</span>
                          </div>
                          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600 font-medium">{dict.calculators.creditCalculator.loanTypes.labels.term}:</span>
                            <span className="text-sm font-bold text-slate-900">{loan.term}</span>
                          </div>
                        </div>

                        {/* CTA */}
                        <div
                          className={`flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r ${loan.color} text-white font-bold rounded-xl shadow-lg group-hover:shadow-xl transition-all`}
                        >
                          <Calculator className="w-5 h-5" />
                          <span>{dict.calculators.calculate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Info Section */}
          <div
            className="mt-16 relative"
            style={{
              animation: 'fadeInUp 0.6s ease-out 0.4s both',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent rounded-3xl blur-xl"></div>

            <div className="relative bg-blue-50/80 backdrop-blur-xl rounded-3xl border-2 border-blue-200 p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">
                    {dict.calculators.creditCalculator.info.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <h4 className="font-bold mb-2">{dict.calculators.creditCalculator.info.benefits.accurate.title}</h4>
                      <p className="text-sm">
                        {dict.calculators.creditCalculator.info.benefits.accurate.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">{dict.calculators.creditCalculator.info.benefits.instant.title}</h4>
                      <p className="text-sm">
                        {dict.calculators.creditCalculator.info.benefits.instant.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">{dict.calculators.creditCalculator.info.benefits.compare.title}</h4>
                      <p className="text-sm">
                        {dict.calculators.creditCalculator.info.benefits.compare.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">{dict.calculators.creditCalculator.info.benefits.convenient.title}</h4>
                      <p className="text-sm">
                        {dict.calculators.creditCalculator.info.benefits.convenient.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            style={{
              animation: 'fadeInUp 0.6s ease-out 0.5s both',
            }}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 shadow-lg">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{dict.calculators.creditCalculator.features.effectiveRate.title}</h3>
              <p className="text-sm text-gray-600">
                {dict.calculators.creditCalculator.features.effectiveRate.description}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 shadow-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{dict.calculators.creditCalculator.features.schedule.title}</h3>
              <p className="text-sm text-gray-600">
                {dict.calculators.creditCalculator.features.schedule.description}
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200 p-6 shadow-lg">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💾</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{dict.calculators.creditCalculator.features.save.title}</h3>
              <p className="text-sm text-gray-600">
                {dict.calculators.creditCalculator.features.save.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
