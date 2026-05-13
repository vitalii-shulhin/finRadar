'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, ArrowLeft, Download, Share2, Info } from 'lucide-react';
import { format, addMonths } from 'date-fns';
import { getDictionary } from '@/i18n/dictionaries';
import type { Locale } from '@/i18n/config';

interface DepositPeriod {
  month: number;
  date: string;
  deposit: number;
  topUp: number;
  withdrawal: number;
  interest: number;
  total: number;
}

type Currency = 'UAH' | 'USD' | 'EUR';
type Capitalization = 'none' | 'monthly' | 'quarterly' | 'annual' | 'atEnd';
type TopUpFrequency = 'none' | 'monthly' | 'quarterly' | 'annual';

export default function DepositCalculatorPage({ params }: { params: { lang: Locale } }) {
  const dict = getDictionary(params.lang);
  // Main parameters
  const [currency, setCurrency] = useState<Currency>('UAH');
  const [depositAmount, setDepositAmount] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(12);
  const [depositTerm, setDepositTerm] = useState<number>(12);
  const [startDate, setStartDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd')
  );

  // Additional parameters
  const [capitalization, setCapitalization] = useState<Capitalization>('monthly');
  const [topUpFrequency, setTopUpFrequency] = useState<TopUpFrequency>('none');
  const [topUpAmount, setTopUpAmount] = useState<number>(0);
  const [inflationRate, setInflationRate] = useState<number>(0);
  const [withdrawalEnabled, setWithdrawalEnabled] = useState<boolean>(false);
  const [withdrawalMonth, setWithdrawalMonth] = useState<number>(6);
  const [withdrawalPercent, setWithdrawalPercent] = useState<number>(0);

  // Results
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalTopUps, setTotalTopUps] = useState<number>(0);
  const [totalWithdrawals, setTotalWithdrawals] = useState<number>(0);
  const [effectiveRate, setEffectiveRate] = useState<number>(0);
  const [inflationAdjusted, setInflationAdjusted] = useState<number>(0);
  const [schedule, setSchedule] = useState<DepositPeriod[]>([]);

  // Calculate deposit
  useEffect(() => {
    if (!depositAmount || depositAmount <= 0 || !interestRate || interestRate <= 0 || !depositTerm || depositTerm <= 0) {
      setTotalAmount(0);
      setTotalInterest(0);
      setTotalTopUps(0);
      setTotalWithdrawals(0);
      setEffectiveRate(0);
      setInflationAdjusted(0);
      setSchedule([]);
      return;
    }

    const schedule: DepositPeriod[] = [];
    let currentBalance = depositAmount;
    let totalInterestEarned = 0;
    let totalTopUpsAmount = 0;
    let totalWithdrawalsAmount = 0;
    let accumulatedInterest = 0;

    const start = new Date(startDate);
    const monthlyRate = interestRate / 100 / 12;

    // Determine capitalization frequency
    const getCapitalizationMonths = () => {
      if (capitalization === 'monthly') return 1;
      if (capitalization === 'quarterly') return 3;
      if (capitalization === 'annual') return 12;
      return depositTerm; // 'none' or 'atEnd'
    };

    const capMonths = getCapitalizationMonths();

    // Determine top-up frequency
    const shouldTopUp = (month: number) => {
      if (topUpFrequency === 'none') return false;
      if (topUpFrequency === 'monthly') return true;
      if (topUpFrequency === 'quarterly') return month % 3 === 0;
      if (topUpFrequency === 'annual') return month % 12 === 0;
      return false;
    };

    for (let month = 1; month <= depositTerm; month++) {
      const periodDate = addMonths(start, month);

      // Calculate interest for this month
      const monthInterest = currentBalance * monthlyRate;
      accumulatedInterest += monthInterest;
      totalInterestEarned += monthInterest;

      // Check if we should capitalize this month
      let capitalizedThisMonth = 0;
      if (month % capMonths === 0) {
        currentBalance += accumulatedInterest;
        capitalizedThisMonth = accumulatedInterest;
        accumulatedInterest = 0;
      }

      // Top-up
      let monthTopUp = 0;
      if (shouldTopUp(month)) {
        monthTopUp = topUpAmount;
        currentBalance += topUpAmount;
        totalTopUpsAmount += topUpAmount;
      }

      // Withdrawal
      let monthWithdrawal = 0;
      if (withdrawalEnabled && month === withdrawalMonth) {
        monthWithdrawal = (currentBalance * withdrawalPercent) / 100;
        currentBalance -= monthWithdrawal;
        totalWithdrawalsAmount += monthWithdrawal;
      }

      // If last month and no capitalization yet, add remaining interest
      if (month === depositTerm && capitalization === 'atEnd') {
        currentBalance += accumulatedInterest;
        capitalizedThisMonth = accumulatedInterest;
        accumulatedInterest = 0;
      }

      schedule.push({
        month,
        date: format(periodDate, 'dd.MM.yyyy'),
        deposit: currentBalance,
        topUp: monthTopUp,
        withdrawal: monthWithdrawal,
        interest: capitalizedThisMonth,
        total: currentBalance,
      });
    }

    // Calculate effective rate
    const totalIncome = totalInterestEarned;
    const avgDeposit = depositAmount + totalTopUpsAmount / 2;
    const effectiveAnnualRate =
      (totalIncome / avgDeposit / (depositTerm / 12)) * 100;

    // Adjust for inflation
    const totalInflation = Math.pow(1 + inflationRate / 100, depositTerm / 12) - 1;
    const inflationAdjustedValue = currentBalance / (1 + totalInflation);

    setTotalAmount(currentBalance);
    setTotalInterest(totalInterestEarned);
    setTotalTopUps(totalTopUpsAmount);
    setTotalWithdrawals(totalWithdrawalsAmount);
    setEffectiveRate(effectiveAnnualRate);
    setInflationAdjusted(inflationAdjustedValue);
    setSchedule(schedule);
  }, [
    depositAmount,
    interestRate,
    depositTerm,
    startDate,
    capitalization,
    topUpFrequency,
    topUpAmount,
    inflationRate,
    withdrawalEnabled,
    withdrawalMonth,
    withdrawalPercent,
  ]);

  const getCurrencySymbol = () => {
    if (currency === 'UAH') return '₴';
    if (currency === 'USD') return '$';
    if (currency === 'EUR') return '€';
    return '';
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('uk-UA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-green-50/20 to-gray-50"></div>

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(0,0,0,.02) 50px, rgba(0,0,0,.02) 100px)`,
          }}
        ></div>

        {/* Ambient light effects */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-green-500/10 via-emerald-500/5 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-radial from-teal-500/8 to-transparent blur-3xl"></div>
      </div>

      {/* Breadcrumb - Premium Floating Style */}
      <div className="relative">
        <div className="container-custom py-4">
          <div className="inline-flex items-center gap-2 text-sm bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg border border-gray-100">
            <Link href={`/${params.lang}`} className="hover:text-primary font-medium transition-colors">
              {dict.calculators.depositCalculator.breadcrumb.home}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-slate-900 font-semibold">{dict.calculators.depositCalculator.breadcrumb.calculator}</span>
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
            {/* Eyebrow text */}
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-green-600"></div>
              <span className="text-xs font-bold text-green-600 uppercase tracking-widest">
                {dict.calculators.depositCalculator.hero.badge}
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-green-600"></div>
            </div>

            {/* Main heading */}
            <div className="flex items-start gap-6 mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl blur-xl opacity-40"></div>
              </div>

              <div className="flex-1">
                <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                    {dict.calculators.depositCalculator.hero.title}
                  </span>
                </h1>
                <p className="text-xl text-gray-600 font-medium max-w-2xl">
                  {dict.calculators.depositCalculator.hero.description}
                </p>
              </div>
            </div>

            {/* Back link */}
            <Link
              href={`/${params.lang}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-green-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {dict.common.backToHome}
            </Link>
          </div>
        </div>
      </section>

      <section className="relative pb-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Input Form */}
            <div
              className="lg:col-span-2 space-y-6"
              style={{
                animation: 'fadeInUp 0.6s ease-out 0.2s both',
              }}
            >
              {/* Main Parameters */}
              <div className="relative">
                {/* Shadow layer */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-transparent rounded-3xl blur-xl translate-y-1"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                  {/* Top accent bar */}
                  <div className="h-1.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600"></div>

                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        {dict.calculators.depositCalculator.form.mainParameters}
                      </h2>
                    </div>

                    <div className="space-y-8">
                      {/* Currency */}
                      <div>
                        <label className="block text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide">
                          {dict.calculators.depositCalculator.form.currency}
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          {(['UAH', 'USD', 'EUR'] as Currency[]).map((curr) => {
                            const currencyLabels = {
                              UAH: dict.calculators.depositCalculator.form.uah,
                              USD: dict.calculators.depositCalculator.form.usd,
                              EUR: dict.calculators.depositCalculator.form.eur,
                            };
                            return (
                              <button
                                key={curr}
                                onClick={() => setCurrency(curr)}
                                className={`py-3 px-4 rounded-xl font-bold transition-all ${
                                  currency === curr
                                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {currencyLabels[curr]}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Deposit Amount */}
                      <div>
                        <label className="block text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide">
                          {`${dict.calculators.depositCalculator.form.amount} (${getCurrencySymbol()})`}
                        </label>
                        <input
                          type="number"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(Number(e.target.value) || 0)}
                          className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-bold text-lg text-slate-900 shadow-sm hover:border-green-500/50 transition-all"
                          min="1000"
                          step="1000"
                        />
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200/50 mt-4">
                          <input
                            type="range"
                            value={depositAmount}
                            onChange={(e) => setDepositAmount(Number(e.target.value))}
                            min="1000"
                            max="1000000"
                            step="5000"
                            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                          />
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs font-semibold text-gray-500 uppercase">1 {dict.calculators.depositCalculator.form.thousand}</span>
                            <div className="text-xl font-black text-green-600 bg-white px-4 py-1 rounded-lg shadow-md">
                              {`${(depositAmount / 1000).toFixed(0)} ${dict.calculators.depositCalculator.form.thousand} ${getCurrencySymbol()}`}
                            </div>
                            <span className="text-xs font-semibold text-gray-500 uppercase">1 {dict.calculators.depositCalculator.form.million}</span>
                          </div>
                        </div>
                      </div>

                      {/* Interest Rate */}
                      <div>
                        <label className="block text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide">
                          {dict.calculators.depositCalculator.form.rate} ({dict.calculators.depositCalculator.form.ratePerYear})
                        </label>
                        <input
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                          className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-bold text-lg text-slate-900 shadow-sm hover:border-green-500/50 transition-all"
                          min="0"
                          max="50"
                          step="0.1"
                        />
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200/50 mt-4">
                          <input
                            type="range"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            min="0"
                            max="25"
                            step="0.5"
                            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                          />
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs font-semibold text-gray-500 uppercase">0%</span>
                            <div className="text-xl font-black text-green-600 bg-white px-4 py-1 rounded-lg shadow-md">
                              {`${interestRate.toFixed(1)}%`}
                            </div>
                            <span className="text-xs font-semibold text-gray-500 uppercase">25%</span>
                          </div>
                        </div>
                      </div>

                      {/* Deposit Term */}
                      <div>
                        <label className="block text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide">
                          {dict.calculators.depositCalculator.form.term} ({dict.calculators.depositCalculator.form.months})
                        </label>
                        <input
                          type="number"
                          value={depositTerm}
                          onChange={(e) => setDepositTerm(Number(e.target.value) || 0)}
                          className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-bold text-lg text-slate-900 shadow-sm hover:border-green-500/50 transition-all"
                          min="1"
                          max="120"
                        />
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200/50 mt-4">
                          <input
                            type="range"
                            value={depositTerm}
                            onChange={(e) => setDepositTerm(Number(e.target.value))}
                            min="3"
                            max="60"
                            step="3"
                            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                          />
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs font-semibold text-gray-500 uppercase">3 {dict.calculators.depositCalculator.form.monthsShort}</span>
                            <div className="text-xl font-black text-green-600 bg-white px-4 py-1 rounded-lg shadow-md">
                              {`${depositTerm} ${dict.calculators.depositCalculator.form.monthsShort}`}
                            </div>
                            <span className="text-xs font-semibold text-gray-500 uppercase">5 {dict.calculators.depositCalculator.form.yearsShort}</span>
                          </div>
                        </div>
                      </div>

                      {/* Start Date */}
                      <div>
                        <label className="block text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide">
                          {dict.calculators.depositCalculator.form.openingDate}
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 font-bold text-slate-900 shadow-sm hover:border-green-500/50 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Settings */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-transparent rounded-3xl blur-xl translate-y-1"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <Info className="w-6 h-6 text-green-600" />
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        {dict.calculators.depositCalculator.advanced.title}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Capitalization */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          {dict.calculators.depositCalculator.advanced.capitalization}
                        </label>
                        <select
                          value={capitalization}
                          onChange={(e) => setCapitalization(e.target.value as Capitalization)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        >
                          <option value="none">{dict.calculators.depositCalculator.advanced.capitalizationOptions.none}</option>
                          <option value="monthly">{dict.calculators.depositCalculator.advanced.topUpFrequencyOptions.monthly}</option>
                          <option value="quarterly">{dict.calculators.depositCalculator.advanced.topUpFrequencyOptions.quarterly}</option>
                          <option value="annual">{dict.calculators.depositCalculator.advanced.topUpFrequencyOptions.yearly}</option>
                          <option value="atEnd">{dict.calculators.depositCalculator.advanced.capitalizationOptions.atEnd}</option>
                        </select>
                      </div>

                      {/* Top-up Frequency */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          {dict.calculators.depositCalculator.advanced.topUp}
                        </label>
                        <select
                          value={topUpFrequency}
                          onChange={(e) => setTopUpFrequency(e.target.value as TopUpFrequency)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        >
                          <option value="none">{dict.calculators.depositCalculator.advanced.topUpFrequencyOptions.none}</option>
                          <option value="monthly">{dict.calculators.depositCalculator.advanced.topUpFrequencyOptions.monthly}</option>
                          <option value="quarterly">{dict.calculators.depositCalculator.advanced.topUpFrequencyOptions.quarterly}</option>
                          <option value="annual">{dict.calculators.depositCalculator.advanced.topUpFrequencyOptions.yearly}</option>
                        </select>
                      </div>

                      {/* Top-up Amount */}
                      {topUpFrequency !== 'none' && (
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            {`${dict.calculators.depositCalculator.advanced.topUpAmount} (${getCurrencySymbol()})`}
                          </label>
                          <input
                            type="number"
                            value={topUpAmount}
                            onChange={(e) => setTopUpAmount(Number(e.target.value) || 0)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                            min="0"
                            step="100"
                          />
                        </div>
                      )}

                      {/* Inflation */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          {dict.calculators.depositCalculator.advanced.inflation} ({dict.calculators.depositCalculator.advanced.inflationPerYear})
                        </label>
                        <input
                          type="number"
                          value={inflationRate}
                          onChange={(e) => setInflationRate(Number(e.target.value) || 0)}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                          min="0"
                          max="50"
                          step="0.5"
                        />
                      </div>

                      {/* Withdrawal Option */}
                      <div className="md:col-span-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={withdrawalEnabled}
                            onChange={(e) => setWithdrawalEnabled(e.target.checked)}
                            className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                          />
                          <span className="text-sm font-medium">
                            {dict.calculators.depositCalculator.advanced.withdrawal}
                          </span>
                        </label>
                      </div>

                      {withdrawalEnabled && (
                        <>
                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                              {dict.calculators.depositCalculator.advanced.withdrawalMonth}
                            </label>
                            <input
                              type="number"
                              value={withdrawalMonth}
                              onChange={(e) => setWithdrawalMonth(Number(e.target.value) || 1)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                              min="1"
                              max={depositTerm}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                              {dict.calculators.depositCalculator.advanced.withdrawalPercent} (%)
                            </label>
                            <input
                              type="number"
                              value={withdrawalPercent}
                              onChange={(e) => setWithdrawalPercent(Number(e.target.value) || 0)}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                              min="0"
                              max="100"
                              step="5"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Table */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-transparent rounded-3xl blur-xl translate-y-1"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        {dict.calculators.depositCalculator.table.title}
                      </h2>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-sm transition-all">
                        <Download className="w-4 h-4" />
                        {dict.calculators.depositCalculator.actions.download}
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-4 px-3 font-bold text-gray-700 uppercase tracking-wide text-xs">
                              {dict.calculators.depositCalculator.table.period}
                            </th>
                            <th className="text-left py-4 px-3 font-bold text-gray-700 uppercase tracking-wide text-xs">
                              {dict.calculators.depositCalculator.table.date}
                            </th>
                            <th className="text-right py-4 px-3 font-bold text-gray-700 uppercase tracking-wide text-xs">
                              {dict.calculators.depositCalculator.table.topUp}
                            </th>
                            <th className="text-right py-4 px-3 font-bold text-gray-700 uppercase tracking-wide text-xs">
                              {dict.calculators.depositCalculator.table.withdrawal}
                            </th>
                            <th className="text-right py-4 px-3 font-bold text-gray-700 uppercase tracking-wide text-xs">
                              {dict.calculators.depositCalculator.table.interest}
                            </th>
                            <th className="text-right py-4 px-3 font-bold text-gray-700 uppercase tracking-wide text-xs">
                              {dict.calculators.depositCalculator.table.total}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {schedule.map((period) => (
                            <tr
                              key={period.month}
                              className="border-b border-gray-100 hover:bg-green-50/50 transition-colors"
                            >
                              <td className="py-4 px-3 font-semibold text-gray-900">
                                {period.month}
                              </td>
                              <td className="py-4 px-3 text-gray-600">{period.date}</td>
                              <td className="text-right py-4 px-3 font-semibold text-green-600">
                                {period.topUp > 0 ? `+${formatCurrency(period.topUp)}` : '-'}
                              </td>
                              <td className="text-right py-4 px-3 font-semibold text-red-600">
                                {period.withdrawal > 0
                                  ? `-${formatCurrency(period.withdrawal)}`
                                  : '-'}
                              </td>
                              <td className="text-right py-4 px-3 font-semibold text-emerald-600">
                                {period.interest > 0
                                  ? `+${formatCurrency(period.interest)}`
                                  : '-'}
                              </td>
                              <td className="text-right py-4 px-3 font-bold text-slate-900">
                                {`${formatCurrency(period.total)} ${getCurrencySymbol()}`}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Results */}
            <div
              className="space-y-6"
              style={{
                animation: 'fadeInUp 0.6s ease-out 0.3s both',
              }}
            >
              {/* Results Card */}
              <div className="relative sticky top-4">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-transparent rounded-3xl blur-xl translate-y-1"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600"></div>

                  <div className="p-8">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                      {dict.calculators.depositCalculator.results.title}
                    </h2>

                    <div className="space-y-6">
                      {/* Total Amount */}
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-xl">
                        <div className="text-sm text-green-100 mb-2 font-semibold uppercase tracking-wide">
                          {dict.calculators.depositCalculator.results.finalAmount}
                        </div>
                        <div className="text-4xl font-black text-white">
                          {`${formatCurrency(totalAmount)} ${getCurrencySymbol()}`}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">{dict.calculators.depositCalculator.results.initialDeposit}:</span>
                          <span className="font-bold text-slate-900">
                            {`${formatCurrency(depositAmount)} ${getCurrencySymbol()}`}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">{dict.calculators.depositCalculator.results.accruedInterest}:</span>
                          <span className="font-bold text-green-600">
                            {`+${formatCurrency(totalInterest)} ${getCurrencySymbol()}`}
                          </span>
                        </div>

                        {totalTopUps > 0 && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <span className="text-gray-600 font-medium">{dict.calculators.depositCalculator.results.totalTopUps}:</span>
                            <span className="font-bold text-blue-600">
                              {`+${formatCurrency(totalTopUps)} ${getCurrencySymbol()}`}
                            </span>
                          </div>
                        )}

                        {totalWithdrawals > 0 && (
                          <div className="flex justify-between items-center py-3 border-b border-gray-200">
                            <span className="text-gray-600 font-medium">{dict.calculators.depositCalculator.results.totalWithdrawals}:</span>
                            <span className="font-bold text-red-600">
                              {`-${formatCurrency(totalWithdrawals)} ${getCurrencySymbol()}`}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">{dict.calculators.depositCalculator.results.profitability}:</span>
                          <span className="font-bold text-emerald-600">
                            {`${((totalInterest / depositAmount) * 100).toFixed(2)}%`}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">{dict.calculators.depositCalculator.results.effectiveRate}:</span>
                          <span className="font-bold text-emerald-600">
                            {`${effectiveRate.toFixed(2)}% ${dict.calculators.depositCalculator.results.perYear}`}
                          </span>
                        </div>

                        {inflationRate > 0 && (
                          <div className="flex justify-between items-center py-3">
                            <span className="text-gray-600 font-medium">
                              {dict.calculators.depositCalculator.results.withInflation}:
                            </span>
                            <span className="font-bold text-orange-600">
                              {`${formatCurrency(inflationAdjusted)} ${getCurrencySymbol()}`}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3 pt-6">
                        <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                          <Download className="w-5 h-5" />
                          {dict.calculators.depositCalculator.actions.save}
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all">
                          <Share2 className="w-5 h-5" />
                          {dict.calculators.depositCalculator.actions.share}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent rounded-2xl blur-xl"></div>

                <div className="relative bg-green-50/80 backdrop-blur-xl rounded-2xl border-2 border-green-200 p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-green-900">
                    <Info className="w-5 h-5" />
                    {dict.calculators.depositCalculator.info.title}
                  </h3>
                  <div className="text-sm text-gray-700 space-y-3">
                    <p>
                      <strong>{dict.calculators.depositCalculator.info.capitalizationTitle}</strong> - {dict.calculators.depositCalculator.info.capitalizationText}
                    </p>
                    <p>
                      <strong>{dict.calculators.depositCalculator.info.effectiveRateTitle}</strong> {dict.calculators.depositCalculator.info.effectiveRateText}
                    </p>
                    <p className="text-xs text-gray-600 mt-4 pt-3 border-t border-green-200">
                      {dict.calculators.depositCalculator.info.disclaimer}
                    </p>
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
