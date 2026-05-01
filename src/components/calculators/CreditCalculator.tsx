'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, ArrowLeft, Download, Share2, Info } from 'lucide-react';
import { format, addMonths } from 'date-fns';

interface PaymentSchedule {
  month: number;
  date: string;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export type LoanType = 'consumer' | 'mortgage' | 'auto';

interface LoanDefaults {
  minAmount: number;
  maxAmount: number;
  defaultAmount: number;
  minRate: number;
  maxRate: number;
  defaultRate: number;
  minTerm: number;
  maxTerm: number;
  defaultTerm: number;
  termStep: number;
}

const LOAN_DEFAULTS: Record<LoanType, LoanDefaults> = {
  consumer: {
    minAmount: 10000,
    maxAmount: 500000,
    defaultAmount: 100000,
    minRate: 10,
    maxRate: 40,
    defaultRate: 18,
    minTerm: 6,
    maxTerm: 60,
    defaultTerm: 12,
    termStep: 6,
  },
  mortgage: {
    minAmount: 100000,
    maxAmount: 10000000,
    defaultAmount: 1000000,
    minRate: 8,
    maxRate: 25,
    defaultRate: 12,
    minTerm: 12,
    maxTerm: 300,
    defaultTerm: 120,
    termStep: 12,
  },
  auto: {
    minAmount: 50000,
    maxAmount: 2000000,
    defaultAmount: 300000,
    minRate: 10,
    maxRate: 30,
    defaultRate: 15,
    minTerm: 12,
    maxTerm: 84,
    defaultTerm: 36,
    termStep: 6,
  },
};

const LOAN_LABELS: Record<LoanType, string> = {
  consumer: 'Споживчий',
  mortgage: 'Іпотечний',
  auto: 'Авто',
};

const LOAN_DESCRIPTIONS: Record<LoanType, string> = {
  consumer: 'Розрахунок споживчого кредиту на особисті потреби з детальним графіком платежів',
  mortgage: 'Розрахунок іпотечного кредиту на купівлю нерухомості з урахуванням всіх комісій',
  auto: 'Розрахунок автокредиту на купівлю транспортного засобу з детальним графіком платежів',
};

interface CreditCalculatorProps {
  loanType: LoanType;
}

export default function CreditCalculator({ loanType }: CreditCalculatorProps) {
  const defaults = LOAN_DEFAULTS[loanType];

  // Main parameters
  const [loanAmount, setLoanAmount] = useState<number>(defaults.defaultAmount);
  const [interestRate, setInterestRate] = useState<number>(defaults.defaultRate);
  const [loanTerm, setLoanTerm] = useState<number>(defaults.defaultTerm);
  const [startDate, setStartDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd')
  );

  // Additional fees
  const [accountServiceFee, setAccountServiceFee] = useState<number>(0);
  const [monthlyServiceFee, setMonthlyServiceFee] = useState<number>(0);
  const [annualServiceFee, setAnnualServiceFee] = useState<number>(0);
  const [issuanceCommission, setIssuanceCommission] = useState<number>(0);
  const [insurance, setInsurance] = useState<number>(0);
  const [notaryFee, setNotaryFee] = useState<number>(0);
  const [collateralEvaluation, setCollateralEvaluation] = useState<number>(0);
  const [registryFee, setRegistryFee] = useState<number>(0);

  // Results
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalFees, setTotalFees] = useState<number>(0);
  const [effectiveRate, setEffectiveRate] = useState<number>(0);
  const [schedule, setSchedule] = useState<PaymentSchedule[]>([]);

  // Calculate credit
  useEffect(() => {
    if (!loanAmount || loanAmount <= 0 || !interestRate || interestRate <= 0 || !loanTerm || loanTerm <= 0) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      setTotalFees(0);
      setEffectiveRate(0);
      setSchedule([]);
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    const annuityCoef =
      (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
      (Math.pow(1 + monthlyRate, loanTerm) - 1);
    const baseMonthlyPayment = loanAmount * annuityCoef;

    // Calculate one-time fees
    const oneTimeFees =
      (loanAmount * accountServiceFee) / 100 +
      (loanAmount * issuanceCommission) / 100 +
      (loanAmount * insurance) / 100 +
      notaryFee +
      collateralEvaluation +
      registryFee;

    // Calculate recurring fees
    const totalMonthlyFees = monthlyServiceFee * loanTerm;
    const totalAnnualFees = annualServiceFee * (loanTerm / 12);
    const allFees = oneTimeFees + totalMonthlyFees + totalAnnualFees;

    // Generate payment schedule
    const paymentSchedule: PaymentSchedule[] = [];
    let remainingBalance = loanAmount;
    const start = new Date(startDate);

    for (let month = 1; month <= loanTerm; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = baseMonthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      const paymentDate = addMonths(start, month);

      paymentSchedule.push({
        month,
        date: format(paymentDate, 'dd.MM.yyyy'),
        payment: baseMonthlyPayment + monthlyServiceFee,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: Math.max(0, remainingBalance),
      });
    }

    const totalPrincipalAndInterest = baseMonthlyPayment * loanTerm;
    const totalInterestPaid = totalPrincipalAndInterest - loanAmount;
    const totalPaymentAmount = totalPrincipalAndInterest + allFees;
    const totalOverpayment = totalPaymentAmount - loanAmount;
    const effectiveAnnualRate =
      ((totalOverpayment / loanAmount) / (loanTerm / 12)) * 100;

    setMonthlyPayment(baseMonthlyPayment + monthlyServiceFee);
    setTotalPayment(totalPaymentAmount);
    setTotalInterest(totalInterestPaid);
    setTotalFees(allFees);
    setEffectiveRate(effectiveAnnualRate);
    setSchedule(paymentSchedule);
  }, [
    loanAmount,
    interestRate,
    loanTerm,
    startDate,
    accountServiceFee,
    monthlyServiceFee,
    annualServiceFee,
    issuanceCommission,
    insurance,
    notaryFee,
    collateralEvaluation,
    registryFee,
  ]);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('uk-UA', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getOtherLoanTypes = (): Array<{ type: LoanType; label: string; href: string }> => {
    const types: LoanType[] = ['consumer', 'mortgage', 'auto'];
    return types
      .filter((type) => type !== loanType)
      .map((type) => ({
        type,
        label: LOAN_LABELS[type],
        href: `/calc/credit/${type}`,
      }));
  };

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
            <Link href="/" className="hover:text-primary font-medium transition-colors">
              Головна
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/calc/credit" className="hover:text-primary font-medium transition-colors">
              Кредитний калькулятор
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-slate-900 font-semibold">{LOAN_LABELS[loanType]}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-12">
        <div className="container-custom">
          <div
            style={{
              animation: 'fadeInUp 0.6s ease-out',
            }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary"></div>
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                {LOAN_LABELS[loanType]} кредит
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
                <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-4 leading-tight">
                  {LOAN_LABELS[loanType]}
                  <br />
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    кредит
                  </span>
                </h1>
                <p className="text-xl text-gray-600 font-medium max-w-2xl">
                  {LOAN_DESCRIPTIONS[loanType]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/calc/credit"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Назад до вибору
              </Link>

              {/* Quick Links to Other Loan Types */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">|</span>
                {getOtherLoanTypes().map((loan, index) => (
                  <div key={loan.type} className="flex items-center gap-2">
                    <Link
                      href={loan.href}
                      className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      {loan.label}
                    </Link>
                    {index < getOtherLoanTypes().length - 1 && (
                      <span className="text-gray-300">•</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
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
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-transparent rounded-3xl blur-xl translate-y-1"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600"></div>

                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        Основні параметри
                      </h2>
                    </div>

                    <div className="space-y-8">
                      {/* Loan Amount */}
                      <div>
                        <label className="block text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide">
                          Сума кредиту (₴)
                        </label>
                        <input
                          type="number"
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                          className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary font-bold text-lg text-slate-900 shadow-sm hover:border-primary/50 transition-all"
                          min={defaults.minAmount}
                          step="1000"
                        />
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-200/50 mt-4">
                          <input
                            type="range"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            min={defaults.minAmount}
                            max={defaults.maxAmount}
                            step={defaults.minAmount}
                            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                          />
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs font-semibold text-gray-500 uppercase">
                              {`${(defaults.minAmount / 1000).toFixed(0)} тис`}
                            </span>
                            <div className="text-xl font-black text-primary bg-white px-4 py-1 rounded-lg shadow-md">
                              {`${(loanAmount / 1000).toFixed(0)} тис ₴`}
                            </div>
                            <span className="text-xs font-semibold text-gray-500 uppercase">
                              {defaults.maxAmount >= 1000000
                                ? `${(defaults.maxAmount / 1000000).toFixed(0)} млн`
                                : `${(defaults.maxAmount / 1000).toFixed(0)} тис`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Interest Rate */}
                      <div>
                        <label className="block text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide">
                          Відсоткова ставка (% річних)
                        </label>
                        <input
                          type="number"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary font-bold text-lg text-slate-900 shadow-sm hover:border-primary/50 transition-all"
                          min={defaults.minRate}
                          max={defaults.maxRate}
                          step="0.1"
                        />
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-200/50 mt-4">
                          <input
                            type="range"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            min={defaults.minRate}
                            max={defaults.maxRate}
                            step="0.5"
                            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                          />
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs font-semibold text-gray-500 uppercase">
                              {`${defaults.minRate}%`}
                            </span>
                            <div className="text-xl font-black text-primary bg-white px-4 py-1 rounded-lg shadow-md">
                              {`${interestRate.toFixed(1)}%`}
                            </div>
                            <span className="text-xs font-semibold text-gray-500 uppercase">
                              {`${defaults.maxRate}%`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Loan Term */}
                      <div>
                        <label className="block text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide">
                          Термін кредиту (місяців)
                        </label>
                        <input
                          type="number"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                          className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary font-bold text-lg text-slate-900 shadow-sm hover:border-primary/50 transition-all"
                          min={defaults.minTerm}
                          max={defaults.maxTerm}
                        />
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-200/50 mt-4">
                          <input
                            type="range"
                            value={loanTerm}
                            onChange={(e) => setLoanTerm(Number(e.target.value))}
                            min={defaults.minTerm}
                            max={defaults.maxTerm}
                            step={defaults.termStep}
                            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                          />
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-xs font-semibold text-gray-500 uppercase">
                              {`${defaults.minTerm} міс`}
                            </span>
                            <div className="text-xl font-black text-primary bg-white px-4 py-1 rounded-lg shadow-md">
                              {`${loanTerm} міс`}
                            </div>
                            <span className="text-xs font-semibold text-gray-500 uppercase">
                              {`${Math.floor(defaults.maxTerm / 12)} р`}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Start Date */}
                      <div>
                        <label className="block text-sm font-bold mb-4 text-gray-700 uppercase tracking-wide">
                          Дата видачі кредиту
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary font-bold text-slate-900 shadow-sm hover:border-primary/50 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Fees */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-transparent rounded-3xl blur-xl translate-y-1"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                      <Info className="w-6 h-6 text-indigo-500" />
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        Додаткові комісії та платежі
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* РКО */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          РКО, разово (% від суми)
                        </label>
                        <input
                          type="number"
                          value={accountServiceFee}
                          onChange={(e) => setAccountServiceFee(Number(e.target.value))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          min="0"
                          max="10"
                          step="0.1"
                        />
                      </div>

                      {/* Issuance Commission */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Комісія за видачу (%)
                        </label>
                        <input
                          type="number"
                          value={issuanceCommission}
                          onChange={(e) => setIssuanceCommission(Number(e.target.value))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          min="0"
                          max="10"
                          step="0.1"
                        />
                      </div>

                      {/* Monthly Service Fee */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Щомісячне обслуговування (₴)
                        </label>
                        <input
                          type="number"
                          value={monthlyServiceFee}
                          onChange={(e) => setMonthlyServiceFee(Number(e.target.value))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          min="0"
                          step="10"
                        />
                      </div>

                      {/* Annual Service Fee */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Річне обслуговування (₴)
                        </label>
                        <input
                          type="number"
                          value={annualServiceFee}
                          onChange={(e) => setAnnualServiceFee(Number(e.target.value))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          min="0"
                          step="100"
                        />
                      </div>

                      {/* Insurance */}
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                          Страхування (% від суми)
                        </label>
                        <input
                          type="number"
                          value={insurance}
                          onChange={(e) => setInsurance(Number(e.target.value))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                          min="0"
                          max="10"
                          step="0.1"
                        />
                      </div>

                      {/* Notary Fee */}
                      {(loanType === 'mortgage' || loanType === 'auto') && (
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Послуги нотаріуса (₴)
                          </label>
                          <input
                            type="number"
                            value={notaryFee}
                            onChange={(e) => setNotaryFee(Number(e.target.value))}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            min="0"
                            step="100"
                          />
                        </div>
                      )}

                      {/* Collateral Evaluation */}
                      {(loanType === 'mortgage' || loanType === 'auto') && (
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Оцінка застави (₴)
                          </label>
                          <input
                            type="number"
                            value={collateralEvaluation}
                            onChange={(e) => setCollateralEvaluation(Number(e.target.value))}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            min="0"
                            step="100"
                          />
                        </div>
                      )}

                      {/* Registry Fee */}
                      {loanType === 'mortgage' && (
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">
                            Реєстрація застави (₴)
                          </label>
                          <input
                            type="number"
                            value={registryFee}
                            onChange={(e) => setRegistryFee(Number(e.target.value))}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                            min="0"
                            step="100"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Schedule */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/5 to-transparent rounded-3xl blur-xl translate-y-1"></div>

                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                        Графік платежів
                      </h2>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-sm transition-all">
                        <Download className="w-4 h-4" />
                        Завантажити
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-4 px-3 font-bold text-gray-700 uppercase tracking-wide text-xs">
                              №
                            </th>
                            <th className="text-left py-4 px-3 font-bold text-gray-700 uppercase tracking-wide text-xs">
                              Дата
                            </th>
                            <th className="text-right py-4 px-3 font-bold text-gray-700 uppercase tracking-wide text-xs">
                              Платіж
                            </th>
                            <th className="text-right py-4 px-3 font-bold text-gray-700 uppercase tracking-wide text-xs">
                              Основний борг
                            </th>
                            <th className="text-right py-4 px-3 font-bold text-gray-700 uppercase tracking-wide text-xs">
                              Відсотки
                            </th>
                            <th className="text-right py-4 px-3 font-bold text-gray-700 uppercase tracking-wide text-xs">
                              Залишок
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {schedule.map((payment) => (
                            <tr
                              key={payment.month}
                              className="border-b border-gray-100 hover:bg-indigo-50/50 transition-colors"
                            >
                              <td className="py-4 px-3 font-semibold text-gray-900">
                                {payment.month}
                              </td>
                              <td className="py-4 px-3 text-gray-600">{payment.date}</td>
                              <td className="text-right py-4 px-3 font-bold text-slate-900">
                                {`${formatCurrency(payment.payment)} ₴`}
                              </td>
                              <td className="text-right py-4 px-3 text-gray-700">
                                {`${formatCurrency(payment.principal)} ₴`}
                              </td>
                              <td className="text-right py-4 px-3 font-semibold text-orange-600">
                                {`${formatCurrency(payment.interest)} ₴`}
                              </td>
                              <td className="text-right py-4 px-3 text-gray-500">
                                {`${formatCurrency(payment.remainingBalance)} ₴`}
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
                  <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600"></div>

                  <div className="p-8">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
                      Результати розрахунку
                    </h2>

                    <div className="space-y-6">
                      {/* Monthly Payment */}
                      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 shadow-xl">
                        <div className="text-sm text-indigo-100 mb-2 font-semibold uppercase tracking-wide">
                          Щомісячний платіж
                        </div>

                        <div className="text-4xl font-black text-white">
                          {`${formatCurrency(monthlyPayment)} ₴`}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">Сума кредиту:</span>
                          <span className="font-bold text-slate-900">
                            {`${formatCurrency(loanAmount)} ₴`}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">Всього відсотків:</span>
                          <span className="font-bold text-orange-600">
                            {`${formatCurrency(totalInterest)} ₴`}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">Додаткові комісії:</span>
                          <span className="font-bold text-slate-900">
                            {`${formatCurrency(totalFees)} ₴`}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b-2 border-gray-300">
                          <span className="text-gray-700 font-bold">Загальна сума виплат:</span>
                          <span className="font-black text-xl text-slate-900">
                            {`${formatCurrency(totalPayment)} ₴`}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-gray-200">
                          <span className="text-gray-600 font-medium">Переплата:</span>
                          <span className="font-bold text-red-600">
                            {`${formatCurrency(totalPayment - loanAmount)} ₴`}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-3">
                          <span className="text-gray-600 font-medium">Ефективна ставка:</span>
                          <span className="font-bold text-primary">
                            {`${effectiveRate.toFixed(2)}% річних`}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3 pt-6">
                        <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all">
                          <Download className="w-5 h-5" />
                          Зберегти розрахунок
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all">
                          <Share2 className="w-5 h-5" />
                          Поділитися
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent rounded-2xl blur-xl"></div>

                <div className="relative bg-blue-50/80 backdrop-blur-xl rounded-2xl border-2 border-blue-200 p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-blue-900">
                    <Info className="w-5 h-5" />
                    Інформація
                  </h3>
                  <div className="text-sm text-gray-700 space-y-3">
                    <p>
                      Розрахунок здійснюється за <strong>аннуітетною схемою</strong> (рівні
                      щомісячні платежі).
                    </p>
                    <p>
                      <strong>Ефективна процентна ставка</strong> враховує всі комісії та
                      додаткові платежі.
                    </p>
                    <p className="text-xs text-gray-600 mt-4 pt-3 border-t border-blue-200">
                      * Розрахунок є орієнтовним. Точні умови уточнюйте в банку.
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
