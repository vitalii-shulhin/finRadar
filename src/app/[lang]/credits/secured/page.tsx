'use client';

import Link from 'next/link';
import { Lock, Home, Car, Gem, Shield, TrendingDown } from 'lucide-react';

export default function SecuredCreditsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Головна</Link>
            <span>/</span>
            <Link href="/credits" className="hover:text-primary">Кредити</Link>
            <span>/</span>
            <span className="text-gray-900">Під заставу</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-700 via-orange-700 to-red-700 text-white py-16">
        <div className="container-custom">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <Lock className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-5xl font-black mb-2">Кредити під заставу</h1>
              <p className="text-xl text-orange-100">Великі суми • Низькі ставки • Довгі терміни</p>
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
              <Link href="/credits/refinancing" className="bg-white/10 text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all">Рефінансування</Link>
              <div className="bg-white text-amber-700 px-5 py-2.5 rounded-xl font-bold whitespace-nowrap shadow-xl">Під заставу</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-12 mb-8">
            <Lock className="w-20 h-20 text-amber-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6 text-center">Кредити під заставу майна</h2>
            <p className="text-gray-600 text-lg mb-8 text-center max-w-3xl mx-auto">
              Отримайте великі суми за низькими ставками під заставу нерухомості, автомобіля або іншого цінного майна.
              Ідеально для бізнесу, інвестицій або великих покупок.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200">
                <Home className="w-10 h-10 text-amber-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">Під нерухомість</h3>
                <p className="text-sm text-gray-600">Квартира, будинок, земельна ділянка</p>
                <div className="mt-4 pt-4 border-t border-amber-200">
                  <div className="text-xs text-gray-500">До:</div>
                  <div className="text-2xl font-black text-amber-700">5 000 000 ₴</div>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
                <Car className="w-10 h-10 text-orange-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">Під авто</h3>
                <p className="text-sm text-gray-600">Легковий, комерційний транспорт</p>
                <div className="mt-4 pt-4 border-t border-orange-200">
                  <div className="text-xs text-gray-500">До:</div>
                  <div className="text-2xl font-black text-orange-700">1 500 000 ₴</div>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border-2 border-red-200">
                <Gem className="w-10 h-10 text-red-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">Під цінності</h3>
                <p className="text-sm text-gray-600">Техніка, обладнання, ювелірні вироби</p>
                <div className="mt-4 pt-4 border-t border-red-200">
                  <div className="text-xs text-gray-500">До:</div>
                  <div className="text-2xl font-black text-red-700">500 000 ₴</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-emerald-900">
                  <TrendingDown className="w-5 h-5" />
                  Переваги
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Низькі відсоткові ставки від 1% на місяць</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Великі суми до 5 млн грн</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Довгі терміни до 10 років</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Майно залишається у вашому користуванні</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="font-bold mb-4 flex items-center gap-2 text-blue-900">
                  <Shield className="w-5 h-5" />
                  Вимоги
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Право власності на майно</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Оцінка майна експертом</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Документи, що підтверджують дохід</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span>Страхування заставного майна</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-3xl p-10 text-white text-center shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Сторінка в розробці</h3>
            <p className="text-lg mb-6 text-orange-100">
              Незабаром тут з'явиться калькулятор вартості майна та пропозиції від ломбардів та банків
            </p>
            <Link href="/credits" className="inline-block bg-white text-amber-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-xl">
              Повернутись до кредитів
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
