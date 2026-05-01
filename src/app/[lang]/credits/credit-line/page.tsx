'use client';

import Link from 'next/link';
import { CreditCard, Zap, RefreshCw, TrendingUp } from 'lucide-react';

export default function CreditLinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Головна</Link>
            <span>/</span>
            <Link href="/credits" className="hover:text-primary">Кредити</Link>
            <span>/</span>
            <span className="text-gray-900">Кредитна лінія</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white py-16">
        <div className="container-custom">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <RefreshCw className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-5xl font-black mb-2">Кредитна лінія</h1>
              <p className="text-xl text-blue-100">Гнучке фінансування • Використовуйте кошти за потребою</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex gap-2 min-w-max">
              <Link href="/credits/online" className="bg-white/10 text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all">Онлайн кредити</Link>
              <Link href="/credits/microcredits" className="bg-white/10 text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all">Мікрокредити</Link>
              <Link href="/credits/cash" className="bg-white/10 text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all">Готівкові кредити</Link>
              <Link href="/cards" className="bg-white/10 text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all">Кредитні картки</Link>
              <div className="bg-white text-purple-600 px-5 py-2.5 rounded-xl font-bold whitespace-nowrap shadow-xl">Кредитна лінія</div>
              <Link href="/credits/refinancing" className="bg-white/10 text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all">Рефінансування</Link>
              <Link href="/credits/secured" className="bg-white/10 text-white hover:bg-white/20 px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all">Під заставу</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 mb-8">
            <CreditCard className="w-20 h-20 text-purple-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Кредитна лінія - це як картка, але вигідніше</h2>
            <p className="text-gray-600 text-lg mb-6">
              Отримайте доступ до коштів та використовуйте їх за потребою.
              Сплачуйте відсотки тільки за використану суму.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-purple-50 rounded-2xl">
                <Zap className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Швидкий доступ</h3>
                <p className="text-sm text-gray-600">Кошти завжди доступні</p>
              </div>
              <div className="p-6 bg-indigo-50 rounded-2xl">
                <RefreshCw className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Поновлюється</h3>
                <p className="text-sm text-gray-600">Після погашення знову доступна</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold mb-2">Вигідно</h3>
                <p className="text-sm text-gray-600">Низькі відсоткові ставки</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Сторінка в розробці</h3>
            <p className="mb-6">Незабаром тут з'явиться повний список пропозицій від банків</p>
            <Link href="/credits" className="inline-block bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Повернутись до кредитів
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
