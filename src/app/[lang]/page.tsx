'use client';

import CurrencyRates from "@/components/CurrencyRates";
import NewsSection from "@/components/NewsSection";
import MarketOverview from "@/components/MarketOverview";
import BankingProducts from "@/components/BankingProducts";
import HeroSection from "@/components/HeroSection";
import ServicesBlock from "@/components/ServicesBlock";
import FeaturedBanks from "@/components/FeaturedBanks";
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export default function Home({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = getDictionary(params.lang);
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sophisticated Background with Depth */}
      {/*<div className="fixed inset-0 -z-10">*/}
      {/*  /!* Base gradient *!/*/}
      {/*  <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50"></div>*/}

      {/*  /!* Subtle pattern overlay *!/*/}
      {/*  <div*/}
      {/*    className="absolute inset-0 opacity-[0.03]"*/}
      {/*    style={{*/}
      {/*      backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(0,0,0,.02) 60px, rgba(0,0,0,.02) 120px)`*/}
      {/*    }}*/}
      {/*  ></div>*/}

      {/*  /!* Ambient light effects *!/*/}
      {/*  <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-primary/10 via-primary/5 to-transparent blur-3xl"></div>*/}
      {/*  <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-blue-500/10 via-indigo-500/5 to-transparent blur-3xl"></div>*/}
      {/*</div>*/}

      {/* Hero Section - Full Bleed */}
      <section className="relative">
        <HeroSection lang={params.lang} />
      </section>

      {/* Services Block - Editorial Layout */}
      <section className="relative">
        {/* Background decoration */}
        {/*<div className="absolute inset-0 overflow-hidden">*/}
        {/*  <div className="absolute top-1/2 left-0 w-1 h-64 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>*/}
        {/*  <div className="absolute top-1/2 right-0 w-1 h-64 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>*/}
        {/*</div>*/}

        <ServicesBlock lang={params.lang} />
      </section>

      {/* Currency Rates - Premium Floating Design */}
      <section className="relative mt-16 z-20">
        <div className="container-custom">
          <div className="backdrop-blur-xl bg-white/90 rounded-3xl shadow-2xl border border-white/50 p-8 relative overflow-hidden">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <CurrencyRates lang={params.lang} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Sophisticated Asymmetric Layout */}
      <section className="relative py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Primary Content - News (Editorial 7 columns) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Section Header with Accent Line */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-primary to-blue-600 rounded-full"></div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                    {dict.home.latestNews}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    {dict.home.latestNewsSubtitle}
                  </p>
                </div>
              </div>

              {/* News Content with Premium Card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <NewsSection lang={params.lang} />
              </div>
            </div>

            {/* Sidebar - Market Data (5 columns) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-1 h-12 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {dict.home.marketData}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    {dict.home.marketDataSubtitle}
                  </p>
                </div>
              </div>

              {/* Market Overview Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden relative group">
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Decorative corner gradient */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <MarketOverview lang={params.lang} />
                </div>
              </div>

              {/* Banking Products Card with Elevated Design */}
              <div className="relative">
                {/* Card shadow foundation */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-blue-500/5 rounded-2xl blur-xl translate-y-2"></div>

                <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  {/* Top accent bar */}
                  <div className="h-1 bg-gradient-to-r from-primary via-blue-500 to-indigo-600"></div>

                  <BankingProducts lang={params.lang} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Banks - Premium Full-Width Section */}
      <section className="relative py-20 mt-16">
        {/* Sophisticated background treatment */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/[0.02] to-transparent"></div>

        {/* Geometric accent elements */}
        <div className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute bottom-0 right-1/4 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>

        <div className="relative">
          {/* Section Header - Centered Premium Style */}
          <div className="container-custom mb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary"></div>
                <span className="text-sm font-bold text-primary uppercase tracking-wider">
                  {dict.home.partnersLabel}
                </span>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary"></div>
              </div>

              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
                {dict.home.trustedPartners}
              </h2>

              <p className="text-lg text-gray-600 font-medium">
                {dict.home.trustedPartnersSubtitle}
              </p>
            </div>
          </div>

          {/* Featured Banks Component with Enhanced Container */}
          <div className="relative">
            {/* Subtle glow underneath */}
            <div className="absolute inset-x-0 top-1/2 h-1/2 bg-gradient-to-t from-primary/5 to-transparent blur-2xl"></div>

            <FeaturedBanks lang={params.lang} />
          </div>
        </div>
      </section>

      {/* Premium Trust Indicators Bar */}
      <section className="relative py-12 border-t border-gray-200/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '15+', label: dict.home.statistics.yearsOnMarket, icon: '📅' },
              { number: '500К+', label: dict.home.statistics.satisfiedClients, icon: '👥' },
              { number: '50+', label: dict.home.statistics.partners, icon: '🤝' },
              { number: '24/7', label: dict.home.statistics.support, icon: '💬' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Footer CTA */}
      <section className="relative py-20 mt-12">
        <div className="container-custom">
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
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <span className="text-sm font-bold text-white">🎯</span>
                  <span className="text-sm font-semibold text-white/90">
                    {dict.home.cta.badge}
                  </span>
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                  {dict.home.cta.title}<br />{dict.home.cta.titleLine2}
                </h2>

                <p className="text-lg md:text-xl text-white/80 mb-10 font-medium max-w-2xl mx-auto">
                  {dict.home.cta.subtitle}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="group relative px-8 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <span className="relative z-10">{dict.home.cta.startNow}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </button>

                  <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300">
                    {dict.home.cta.learnMore}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for visual balance */}
      <div className="h-20"></div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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
      `}</style>
    </div>
  );
}
