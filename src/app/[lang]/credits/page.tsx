import Link from 'next/link';
import {
  Wallet,
  Calculator,
  FileText,
  TrendingUp,
  ArrowRight,
  Banknote,
  Smartphone,
  LineChart,
  RefreshCw,
  Home,
  Grid3x3
} from 'lucide-react';
import { Metadata } from 'next';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = getDictionary(params.lang);

  // Base keywords + city-specific keywords for local SEO
  const baseKeywords = params.lang === 'uk'
    ? ["кредити онлайн", "онлайн кредит", "кредит на карту", "мікрокредит", "кредитний калькулятор", "позика онлайн", "швидкий кредит", "кредит без довідок"]
    : ["кредиты онлайн", "онлайн кредит", "кредит на карту", "микрокредит", "кредитный калькулятор", "займ онлайн", "быстрый кредит", "кредит без справок"];

  const cityKeywords = params.lang === 'uk'
    ? [
        "кредит Київ", "кредит Харків", "кредит Одеса", "кредит Дніпро", "кредит Запоріжжя",
        "кредит Львів", "кредит Кривий Ріг", "кредит Миколаїв", "кредит Вінниця", "кредит Івано-Франківськ",
        "кредит Чернівці", "кредит Тернопіль", "кредит Луцьк", "кредит Рівне", "кредит Хмельницький",
        "кредит Ужгород", "кредит Полтава", "кредит Черкаси", "кредит Житомир", "кредит Кропивницький",
        "кредит Херсон", "кредит Суми", "кредит Чернігів", "кредит Нікополь", "кредит Мукачево"
      ]
    : [
        "кредит Киев", "кредит Харьков", "кредит Одесса", "кредит Днепр", "кредит Запорожье",
        "кредит Львов", "кредит Кривой Рог", "кредит Николаев", "кредит Винница", "кредит Ивано-Франковск",
        "кредит Черновцы", "кредит Тернополь", "кредит Луцк", "кредит Ровно", "кредит Хмельницкий",
        "кредит Ужгород", "кредит Полтава", "кредит Черкассы", "кредит Житомир", "кредит Кропивницкий",
        "кредит Херсон", "кредит Сумы", "кредит Чернигов", "кредит Никополь", "кредит Мукачево"
      ];

  const keywords = [...baseKeywords, ...cityKeywords];

  return {
    title: dict.meta.credits.title,
    description: dict.meta.credits.description,
    keywords,
    openGraph: {
      title: dict.meta.credits.title,
      description: dict.meta.credits.description,
      type: 'website',
      locale: params.lang === 'uk' ? 'uk_UA' : 'ru_RU',
    },
    alternates: {
      languages: {
        'uk': `/uk/credits`,
        'ru': `/ru/credits`,
      },
    },
  };
}

export default function CreditsPage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = getDictionary(params.lang);

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbSchema
        items={[
          { name: dict.common.home, url: `/${params.lang}` },
          { name: dict.common.credits, url: `/${params.lang}/credits` }
        ]}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href={`/${params.lang}`} className="hover:text-primary">
              {dict.common.home}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{dict.common.credits}</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold font-heading mb-4">
            {dict.credits.title}
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {dict.credits.subtitle}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        {/* All Credits Types */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {params.lang === 'uk' ? 'Всі види кредитів' : 'Все виды кредитов'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* All Credits */}
            <Link
              href={`/${params.lang}/credits/all`}
              className="card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Grid3x3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {params.lang === 'uk' ? 'Всі кредити' : 'Все кредиты'}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {params.lang === 'uk'
                  ? 'Порівняйте всі кредитні пропозиції від банків України'
                  : 'Сравните все кредитные предложения от банков Украины'}
              </p>
              <div className="flex items-center text-rose-600 font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                {dict.common.readMore}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Online Credits */}
            <Link
              href={`/${params.lang}/credits/online`}
              className="card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {dict.credits.online}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {dict.credits.onlineDescription}
              </p>
              <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                {dict.common.readMore}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Cash Credits */}
            <Link
              href={`/${params.lang}/credits/cash`}
              className="card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Banknote className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {params.lang === 'uk' ? 'Готівкові кредити' : 'Наличные кредиты'}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {params.lang === 'uk'
                  ? 'Отримайте готівку в банку або відділенні на вигідних умовах'
                  : 'Получите наличные в банке или отделении на выгодных условиях'}
              </p>
              <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                {dict.common.readMore}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Microcredits */}
            <Link
              href={`/${params.lang}/credits/microcredits`}
              className="card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wallet className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {params.lang === 'uk' ? 'Мікрокредити' : 'Микрокредиты'}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {params.lang === 'uk'
                  ? 'Швидкі невеликі позики на короткий термін без довідок'
                  : 'Быстрые небольшие займы на короткий срок без справок'}
              </p>
              <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                {dict.common.readMore}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Credit Line */}
            <Link
              href={`/${params.lang}/credits/credit-line`}
              className="card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <LineChart className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {params.lang === 'uk' ? 'Кредитна лінія' : 'Кредитная линия'}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {params.lang === 'uk'
                  ? 'Багаторазовий доступ до коштів з гнучким графіком платежів'
                  : 'Многоразовый доступ к средствам с гибким графиком платежей'}
              </p>
              <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                {dict.common.readMore}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Refinancing */}
            <Link
              href={`/${params.lang}/credits/refinancing`}
              className="card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <RefreshCw className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {params.lang === 'uk' ? 'Рефінансування' : 'Рефинансирование'}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {params.lang === 'uk'
                  ? 'Об\'єднайте кредити та зменшіть платежі з новою ставкою'
                  : 'Объедините кредиты и уменьшите платежи с новой ставкой'}
              </p>
              <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                {dict.common.readMore}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Secured Credits */}
            <Link
              href={`/${params.lang}/credits/secured`}
              className="card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Home className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {params.lang === 'uk' ? 'Під заставу' : 'Под залог'}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {params.lang === 'uk'
                  ? 'Великі суми під заставу нерухомості або авто за низькою ставкою'
                  : 'Большие суммы под залог недвижимости или авто по низкой ставке'}
              </p>
              <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 gap-1 transition-all">
                {dict.common.readMore}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {params.lang === 'uk' ? 'Корисні інструменти' : 'Полезные инструменты'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Credit Calculator */}
            <Link
              href={`/${params.lang}/calc/credit`}
              className="card p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {dict.credits.calculator}
              </h3>
              <p className="text-gray-600 mb-4">
                {dict.credits.calculatorDescription}
              </p>
              <div className="flex items-center text-primary font-semibold group-hover:gap-3 gap-2 transition-all">
                {dict.common.readMore}
                <ArrowRight className="w-5 h-5" />
              </div>
            </Link>

            {/* Credit Info/Guide */}
            <div className="card p-8 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {params.lang === 'uk' ? 'Про кредити' : 'О кредитах'}
              </h3>
              <p className="text-gray-600 mb-4">
                {params.lang === 'uk'
                  ? 'Дізнайтеся як вибрати кредит, на що звернути увагу та як покращити умови'
                  : 'Узнайте как выбрать кредит, на что обратить внимание и как улучшить условия'}
              </p>
              <div className="flex items-center text-gray-600 font-semibold gap-2">
                {params.lang === 'uk' ? 'Скоро' : 'Скоро'}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-primary via-primary-dark to-primary rounded-2xl p-8 md:p-12 text-white text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">
            {dict.credits.needConsultation}
          </h2>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            {dict.credits.consultationText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary bg-white text-primary hover:bg-gray-100">
              {dict.credits.freeConsultation}
            </button>
            <Link href={`/${params.lang}/credits/online`} className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary inline-block text-center">
              {dict.credits.findCredit}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
