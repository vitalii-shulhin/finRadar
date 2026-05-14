'use client';

import Link from 'next/link';
import { Repeat, TrendingDown, DollarSign, CheckCircle } from 'lucide-react';

export default function RefinancingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Головна</Link>
            <span>/</span>
            <Link href="/credits" className="hover:text-primary">Кредити</Link>
            <span>/</span>
            <span className="text-gray-900">Рефінансування</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 text-white py-16">
        <div className="container-custom">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <Repeat className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-2">Рефінансування кредитів</h1>
              <p className="text-sm md:text-sm   text-blue-100">Зменште платіж • Знизьте ставку • Об'єднайте кредити</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-2 min-w-max">
              <Link href="/credits/online" className="bg-white/10 text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all">Онлайн кредити</Link>
              <Link href="/credits/microcredits" className="bg-white/10 text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all">Мікрокредити</Link>
              <Link href="/credits/cash" className="bg-white/10 text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all">Готівкові кредити</Link>
              <Link href="/cards" className="bg-white/10 text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all">Кредитні картки</Link>
              <Link href="/credits/credit-line" className="bg-white/10 text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all">Кредитна лінія</Link>
              <div className="bg-white text-teal-600 px-5 py-2.5 rounded-xl font-bold whitespace-nowrap shadow-xl">Рефінансування</div>
              <Link href="/credits/secured" className="bg-white/10 text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all">Під заставу</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-12 mb-8">
            <Repeat className="w-20 h-20 text-teal-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6 text-center">Що таке рефінансування?</h2>
            <p className="text-gray-600 text-lg mb-8 text-center">
              Це перекредитування - ви берете новий кредит на вигідніших умовах
              і погашаєте ним старі кредити. Економія може сягати 30-50% на платежах!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-teal-50 rounded-2xl border-2 border-teal-100">
                <TrendingDown className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-bold mb-2">Знизьте ставку</h3>
                <p className="text-sm text-gray-600">До 10% річних економії</p>
              </div>
              <div className="p-6 bg-cyan-50 rounded-2xl border-2 border-cyan-100">
                <DollarSign className="w-8 h-8 text-cyan-600 mb-3" />
                <h3 className="font-bold mb-2">Зменшіть платіж</h3>
                <p className="text-sm text-gray-600">На 30-50% менше щомісяця</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-100">
                <CheckCircle className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Об'єднайте</h3>
                <p className="text-sm text-gray-600">Всі кредити в один</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border-2 border-teal-100">
              <h3 className="font-bold mb-3 text-teal-900">Кому підходить рефінансування?</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>У вас є кілька діючих кредитів</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Ваша кредитна історія покращилась</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Ставки на ринку знизились</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span>Хочете зменшити щомісячний платіж</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-3xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Сторінка в розробці</h3>
            <p className="mb-6">Незабаром тут з'явиться калькулятор економії та пропозиції банків</p>
            <Link href="/credits" className="inline-block bg-white text-teal-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Повернутись до кредитів
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
