'use client';

import Link from 'next/link';
import { Shield, Car, Home, Heart, Briefcase, Plane, Users, ArrowRight, CheckCircle, Lock, Award, TrendingUp, Globe } from 'lucide-react';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export default function InsurancePage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = getDictionary(params.lang);
  const insuranceTypes = [
    {
      icon: Car,
      title: dict.insurance.types.osago.title,
      description: dict.insurance.types.osago.description,
      link: `/${params.lang}/insurance/osago`,
      price: dict.insurance.types.osago.price,
      color: 'from-blue-500 to-blue-600',
      popular: true,
    },
    {
      icon: Car,
      title: dict.insurance.types.kasko.title,
      description: dict.insurance.types.kasko.description,
      link: `/${params.lang}/insurance/kasko`,
      price: dict.insurance.types.kasko.price,
      color: 'from-green-500 to-green-600',
      popular: false,
    },
    {
      icon: Globe,
      title: dict.insurance.types.greenCard.title,
      description: dict.insurance.types.greenCard.description,
      link: `/${params.lang}/insurance/greencard`,
      price: dict.insurance.types.greenCard.price,
      color: 'from-emerald-500 to-emerald-600',
      popular: false,
    },
    {
      icon: Home,
      title: dict.insurance.types.property.title,
      description: dict.insurance.types.property.description,
      link: '#',
      price: dict.insurance.types.property.price,
      color: 'from-orange-500 to-orange-600',
      soon: true,
    },
    {
      icon: Heart,
      title: dict.insurance.types.health.title,
      description: dict.insurance.types.health.description,
      link: '#',
      price: dict.insurance.types.health.price,
      color: 'from-red-500 to-red-600',
      soon: true,
    },
    {
      icon: Plane,
      title: dict.insurance.types.travel.title,
      description: dict.insurance.types.travel.description,
      link: '#',
      price: dict.insurance.types.travel.price,
      color: 'from-purple-500 to-purple-600',
      soon: true,
    },
    {
      icon: Briefcase,
      title: dict.insurance.types.business.title,
      description: dict.insurance.types.business.description,
      link: '#',
      price: dict.insurance.types.business.price,
      color: 'from-indigo-500 to-indigo-600',
      soon: true,
    },
    {
      icon: Users,
      title: dict.insurance.types.savings.title,
      description: dict.insurance.types.savings.description,
      link: '#',
      price: dict.insurance.types.savings.price,
      color: 'from-teal-500 to-teal-600',
      soon: true,
    },
    {
      icon: Heart,
      title: dict.insurance.types.life.title,
      description: dict.insurance.types.life.description,
      link: '#',
      price: dict.insurance.types.life.price,
      color: 'from-pink-500 to-pink-600',
      soon: true,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sophisticated Security-Themed Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

        {/* Geometric pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,.05) 50px, rgba(255,255,255,.05) 51px),
                            repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,.05) 50px, rgba(255,255,255,.05) 51px)`
          }}
        ></div>

        {/* Ambient security glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-amber-900/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-blue-900/20 to-transparent blur-3xl"></div>

        {/* Shield decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 opacity-5">
          <Shield className="w-full h-full text-white" />
        </div>
      </div>

      {/* Breadcrumb - Dark Theme */}
      <div className="bg-slate-900/90 backdrop-blur-lg border-b border-slate-700/50">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Link href={`/${params.lang}`} className="text-gray-400 hover:text-amber-400 transition-colors">
              {dict.common.home}
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-white font-semibold">{dict.common.insurance}</span>
          </div>
        </div>
      </div>

      {/* Hero - Premium Security Design */}
      <section className="relative py-6 overflow-hidden">
        {/* Decorative angular lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Premium Shield Icon */}
            <div className="relative inline-block mb-8">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl blur-2xl opacity-20"></div>

              {/* Shield container */}
              <div className="relative w-28 h-28 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-700 rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                <Shield className="w-14 h-14 text-white relative z-10" />
              </div>
            </div>

            {/* Bold Typography */}
            <h1 className="text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-none">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                {dict.insurance.heroTitle1}
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                {dict.insurance.heroTitle2}
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed mb-8">
              {dict.insurance.subtitle}
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Lock className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-white">{dict.insurance.badges.secure}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-white">{dict.insurance.badges.licensed}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-bold text-white">{dict.insurance.badges.experience}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Light Section Contrast */}
      <section className="relative bg-gradient-to-b from-white via-gray-50 to-white py-20">
        {/* Decorative top edge */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>

        <div className="container-custom">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500"></div>
              <span className="text-sm font-black text-amber-600 uppercase tracking-wider">
                {dict.insurance.typesLabel}
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
              {dict.insurance.chooseProtection}
            </h2>
            <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
              {dict.insurance.chooseProtectionSubtitle}
            </p>
          </div>

          {/* Insurance Types Grid - Premium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {insuranceTypes.map((type, index) => {
              const Icon = type.icon;
              const isDisabled = type.soon;

              return (
                <Link
                  key={index}
                  href={isDisabled ? '#' : type.link}
                  className={`group relative bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden transition-all duration-500 ${
                    isDisabled
                      ? 'opacity-60 cursor-not-allowed'
                      : 'hover:shadow-2xl hover:-translate-y-2 hover:border-amber-400/50'
                  }`}
                  onClick={isDisabled ? (e) => e.preventDefault() : undefined}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
                  }}
                >
                  {/* Top accent bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${type.color}`}></div>

                  <div className="p-6">
                    {/* Badge */}
                    {type.popular && (
                      <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-black px-3 py-1.5 rounded-full mb-4 shadow-lg">
                        <Award className="w-3 h-3" />
                        {dict.insurance.popular}
                      </span>
                    )}
                    {type.soon && (
                      <span className="inline-block bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                        {dict.insurance.comingSoon}
                      </span>
                    )}

                    {/* Icon */}
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${type.color} rounded-2xl flex items-center justify-center mb-5 shadow-xl ${
                      !isDisabled && 'group-hover:scale-110 group-hover:rotate-3'
                    } transition-all duration-300`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                      <Icon className="w-8 h-8 text-white relative z-10" />
                    </div>

                    {/* Content */}
                    <h3 className={`text-lg font-black mb-3 text-slate-900 ${
                      !isDisabled && 'group-hover:text-amber-600'
                    } transition-colors`}>
                      {type.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-5 leading-relaxed font-medium min-h-[60px]">
                      {type.description}
                    </p>

                    {/* Price & Arrow */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <div className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wide">{dict.insurance.cost}</div>
                        <div className="text-lg font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                          {type.price}
                        </div>
                      </div>
                      {!isDisabled && (
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-amber-500 transition-colors shadow-lg">
                          <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Educational Sections - Side by Side */}
          <div className="grid grid-cols-1 gap-8 mb-16">
            {/* Why Insurance - Premium Card */}
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-8">
                <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                  <Shield className="w-8 h-8 text-amber-400" />
                  {dict.insurance.whySection.title}
                </h2>
                <p className="text-gray-300 font-medium">{dict.insurance.whySection.subtitle}</p>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <Shield className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 mb-2 text-lg">{dict.insurance.whySection.reason1.title}</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      {dict.insurance.whySection.reason1.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 mb-2 text-lg">{dict.insurance.whySection.reason2.title}</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      {dict.insurance.whySection.reason2.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <Briefcase className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 mb-2 text-lg">{dict.insurance.whySection.reason3.title}</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      {dict.insurance.whySection.reason3.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Choose - Premium Card */}
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-8">
                <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                  <CheckCircle className="w-8 h-8" />
                  {dict.insurance.howSection.title}
                </h2>
                <p className="text-amber-100 font-medium">{dict.insurance.howSection.subtitle}</p>
              </div>
              <div className="p-8 space-y-5">
                {[
                  {
                    number: '1',
                    title: dict.insurance.howSection.step1.title,
                    description: dict.insurance.howSection.step1.description
                  },
                  {
                    number: '2',
                    title: dict.insurance.howSection.step2.title,
                    description: dict.insurance.howSection.step2.description
                  },
                  {
                    number: '3',
                    title: dict.insurance.howSection.step3.title,
                    description: dict.insurance.howSection.step3.description
                  },
                  {
                    number: '4',
                    title: dict.insurance.howSection.step4.title,
                    description: dict.insurance.howSection.step4.description
                  }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-slate-900 to-slate-800 text-amber-400 rounded-xl flex items-center justify-center font-black text-lg shadow-lg">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed font-medium">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA - Dark Section */}
      <section className="relative py-24">
        {/* Dark background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

        {/* Layered ambient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-blue-900/20"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-amber-500/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-radial from-blue-500/20 to-transparent blur-3xl"></div>

        {/* Geometric pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,.1) 30px, rgba(255,255,255,.1) 31px)`
          }}
        ></div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon with glow */}
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-amber-500 rounded-full blur-2xl opacity-50"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl">
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
              {dict.insurance.cta.title1}<br />{dict.insurance.cta.title2}
            </h2>

            <p className="text-sm md:text-sm   text-gray-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
              {dict.insurance.cta.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 rounded-xl font-black text-lg overflow-hidden shadow-2xl hover:shadow-amber-500/50 transition-all hover:scale-105">
                <span className="relative z-10">{dict.insurance.cta.consultationButton}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <Link
                href={`/${params.lang}/insurance/osago`}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-black text-lg hover:bg-white/20 transition-all inline-block"
              >
                {dict.insurance.cta.osagoButton}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Article Section - Light Background */}
      <section className="relative bg-gradient-to-b from-white via-gray-50 to-white py-20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>

        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Auto Insurance */}
            <article className="mb-16">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">{dict.insurance.article.autoInsurance.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">{dict.insurance.article.autoInsurance.intro}</p>
              <p className="text-lg font-semibold text-slate-900 mb-3">{dict.insurance.article.autoInsurance.typesTitle}</p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                {dict.insurance.article.autoInsurance.types.map((type: string, idx: number) => (
                  <li key={idx} className="text-lg leading-relaxed">{type}</li>
                ))}
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed">{dict.insurance.article.autoInsurance.conclusion}</p>
            </article>

            {/* Travel Insurance */}
            <article className="mb-16">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">{dict.insurance.article.travelInsurance.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">{dict.insurance.article.travelInsurance.intro}</p>
              <p className="text-lg font-semibold text-slate-900 mb-3">{dict.insurance.article.travelInsurance.coverageTitle}</p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                {dict.insurance.article.travelInsurance.coverage.map((item: string, idx: number) => (
                  <li key={idx} className="text-lg leading-relaxed">{item}</li>
                ))}
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed">{dict.insurance.article.travelInsurance.conclusion}</p>
            </article>

            {/* Medical Insurance */}
            <article className="mb-16">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">{dict.insurance.article.medicalInsurance.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">{dict.insurance.article.medicalInsurance.intro}</p>
              <p className="text-lg font-semibold text-slate-900 mb-3">{dict.insurance.article.medicalInsurance.coverageTitle}</p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                {dict.insurance.article.medicalInsurance.coverage.map((item: string, idx: number) => (
                  <li key={idx} className="text-lg leading-relaxed">{item}</li>
                ))}
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed">{dict.insurance.article.medicalInsurance.conclusion}</p>
            </article>

            {/* Life Insurance */}
            <article className="mb-16">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">{dict.insurance.article.lifeInsurance.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">{dict.insurance.article.lifeInsurance.intro}</p>
              <p className="text-lg font-semibold text-slate-900 mb-3">{dict.insurance.article.lifeInsurance.coverageTitle}</p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                {dict.insurance.article.lifeInsurance.coverage.map((item: string, idx: number) => (
                  <li key={idx} className="text-lg leading-relaxed">{item}</li>
                ))}
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed">{dict.insurance.article.lifeInsurance.conclusion}</p>
            </article>

            {/* Property Insurance */}
            <article className="mb-16">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">{dict.insurance.article.propertyInsurance.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">{dict.insurance.article.propertyInsurance.intro}</p>
              <p className="text-lg font-semibold text-slate-900 mb-3">{dict.insurance.article.propertyInsurance.coverageTitle}</p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                {dict.insurance.article.propertyInsurance.coverage.map((item: string, idx: number) => (
                  <li key={idx} className="text-lg leading-relaxed">{item}</li>
                ))}
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed">{dict.insurance.article.propertyInsurance.conclusion}</p>
            </article>

            {/* Online Benefits */}
            <article className="mb-16">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">{dict.insurance.article.onlineBenefits.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">{dict.insurance.article.onlineBenefits.intro}</p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                {dict.insurance.article.onlineBenefits.benefits.map((item: string, idx: number) => (
                  <li key={idx} className="text-lg leading-relaxed">{item}</li>
                ))}
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed">{dict.insurance.article.onlineBenefits.conclusion}</p>
            </article>

            {/* How to Choose */}
            <article className="mb-16">
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">{dict.insurance.article.howToChoose.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">{dict.insurance.article.howToChoose.intro}</p>
              <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700">
                {dict.insurance.article.howToChoose.factors.map((item: string, idx: number) => (
                  <li key={idx} className="text-lg leading-relaxed">{item}</li>
                ))}
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed">{dict.insurance.article.howToChoose.conclusion}</p>
            </article>

            {/* Final Conclusion */}
            <article className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-6">{dict.insurance.article.finalConclusion.title}</h2>
              <p className="text-xl text-gray-300 leading-relaxed">{dict.insurance.article.finalConclusion.text}</p>
            </article>

            {/* People Often Search Section */}
            <article className="mt-16 bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-8">
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  <Car className="w-8 h-8" />
                  {dict.insurance.peopleOftenSearch.title}
                </h2>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dict.insurance.peopleOftenSearch.links.map((link: { label: string; href: string }, idx: number) => (
                    <Link
                      key={idx}
                      href={`/${params.lang}${link.href}`}
                      className="group flex items-center gap-3 bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-400 rounded-xl p-4 transition-all hover:shadow-lg"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-slate-900 font-bold group-hover:text-amber-700 transition-colors">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

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
      `}</style>
    </div>
  );
}
