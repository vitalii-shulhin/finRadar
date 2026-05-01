'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {
  CreditCard,
  ArrowLeft,
  Star,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  User,
  FileText,
  Banknote,
  Phone,
  Share2,
  Shield,
} from 'lucide-react';
import { CARDS_DETAIL_DATA } from '@/data/cardsDetailData';
import type { CardDetail } from '@/data/cardsDetailData';
import { type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';

export default function CardDetailPage() {
  const params = useParams();
  const cardId = parseInt(params.id as string);
  const lang = (params.lang as Locale) || 'uk';
  const card = CARDS_DETAIL_DATA[cardId];
  const dict = getDictionary(lang);
  const articleData = card.articleId ? (dict as any)[card.articleId] : null;

  const [expandedSection, setExpandedSection] = useState<string | null>('advantages');
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!card) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">{dict.cardDetail.cardNotFound}</h2>
          <Link href={`/${lang}/cards`} className="text-primary hover:underline">
            {dict.cardDetail.backToCards}
          </Link>
        </div>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href={`/${lang}`} className="hover:text-primary">
              {dict.cardDetail.home}
            </Link>
            <span>/</span>
            <Link href={`/${lang}/cards`} className="hover:text-primary">
              {dict.cardDetail.cards}
            </Link>
            <span>/</span>
            <span className="text-gray-900">
              {card.bank} {card.name}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${card.color} text-white py-12`}>
        <div className="container-custom">
          <Link
            href={`/${lang}/cards`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {dict.cardDetail.backToAllCards}
          </Link>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Card Visual */}
            <div className="flex-shrink-0">
              <div className="w-80 h-48 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
                <div className="flex justify-between items-start mb-8">
                  <div className="relative w-48 h-48">
                    <Image
                      src={card.bankLogo}
                      alt={`${card.bank} logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-sm">{card.variant}</div>
                </div>
              </div>
            </div>

            {/* Card Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-4xl font-bold font-heading">
                  {card.type === 'credit' ? dict.cardDetail.creditCard : dict.cardDetail.debitCard} {dict.cardDetail.card} «{card.name}»
                </h1>
              </div>
              <p className="text-xl text-white/90 mb-6">{card.bank}</p>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {card.creditLimit && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-sm opacity-80 mb-1">{dict.cardDetail.creditLimit}</div>
                    <div className="text-2xl font-bold">{card.creditLimit}</div>
                  </div>
                )}
                {card.gracePeriod && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-sm opacity-80 mb-1">{dict.cardDetail.gracePeriod}</div>
                    <div className="text-2xl font-bold">{card.gracePeriod} {dict.cardDetail.days}</div>
                  </div>
                )}
                {card.cashback && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-sm opacity-80 mb-1">{dict.cardDetail.cashback}</div>
                    <div className="text-2xl font-bold">{card.cashback}</div>
                  </div>
                )}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-sm opacity-80 mb-1">{dict.cardDetail.maintenance}</div>
                  <div className="text-2xl font-bold">{card.annualFee}</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">{renderStars(Math.round(card.rating))}</div>
                  <span className="text-2xl font-bold">{card.rating}</span>
                </div>
                <span className="text-white/80">({card.reviews} {dict.cardDetail.reviews})</span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                {card.cardUrl ? (
                  <a
                    href={card.cardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary bg-white text-primary hover:bg-gray-100 inline-flex items-center gap-2"
                  >
                    <CreditCard className="w-5 h-5" />
                    {dict.cardDetail.orderCard}
                  </a>
                ) : card.cardUrlIOS || card.cardUrlAndroid ? (
                  <>
                    {card.cardUrlIOS && (
                      <a
                        href={card.cardUrlIOS}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary bg-white text-primary hover:bg-gray-100 inline-flex items-center gap-2"
                      >
                        <CreditCard className="w-5 h-5" />
                        {dict.cardDetail.orderCardIOS}
                      </a>
                    )}
                    {card.cardUrlAndroid && (
                      <a
                        href={card.cardUrlAndroid}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary bg-white text-primary hover:bg-gray-100 inline-flex items-center gap-2"
                      >
                        <CreditCard className="w-5 h-5" />
                        {dict.cardDetail.orderCardAndroid}
                      </a>
                    )}
                  </>
                ) : (
                  <button className="btn-primary bg-white text-primary hover:bg-gray-100 inline-flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    {dict.cardDetail.orderCard}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="card p-6">
              <h2 className="text-2xl font-bold mb-4">{dict.cardDetail.description}</h2>
              <p className="text-gray-700 leading-relaxed">{card.description}</p>
            </div>

            {/* Advantages */}
            <div className="card">
              <button
                onClick={() => toggleSection('advantages')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  {dict.cardDetail.advantages}
                </h2>
                {expandedSection === 'advantages' ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </button>
              {expandedSection === 'advantages' && (
                <div className="p-6 pt-0">
                  <ul className="space-y-3">
                    {card.advantages.map((advantage, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Requirements */}
            <div className="card">
              <button
                onClick={() => toggleSection('requirements')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <User className="w-6 h-6 text-primary" />
                  {dict.cardDetail.requirements}
                </h2>
                {expandedSection === 'requirements' ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </button>
              {expandedSection === 'requirements' && (
                <div className="p-6 pt-0 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">{dict.cardDetail.age}</h3>
                    <p className="text-gray-700">{card.requirements.age}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{dict.cardDetail.documents}</h3>
                    <ul className="list-disc list-inside space-y-1">
                      {card.requirements.documents.map((doc, idx) => (
                        <li key={idx} className="text-gray-700">
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{dict.cardDetail.employment}</h3>
                    <p className="text-gray-700">{card.requirements.employment}</p>
                  </div>
                  {card.requirements.income && (
                    <div>
                      <h3 className="font-semibold mb-2">{dict.cardDetail.incomeProof}</h3>
                      <p className="text-gray-700">{card.requirements.income}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Conditions */}
            <div className="card">
              <button
                onClick={() => toggleSection('conditions')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  {dict.cardDetail.conditions}
                </h2>
                {expandedSection === 'conditions' ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </button>
              {expandedSection === 'conditions' && (
                <div className="p-6 pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">{dict.cardDetail.issuanceTime}</div>
                      <div className="font-semibold">{card.conditions.issuanceTime}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">{dict.cardDetail.cardValidity}</div>
                      <div className="font-semibold">{card.conditions.cardValidity}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">{dict.cardDetail.currencies}</div>
                      <div className="font-semibold">{card.conditions.currency.join(', ')}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">{dict.cardDetail.paymentSystem}</div>
                      <div className="font-semibold">{card.conditions.paymentSystem}</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">{dict.cardDetail.contactlessPayment}</div>
                      <div className="font-semibold">
                        {card.conditions.contactless ? dict.cardDetail.yes : dict.cardDetail.no}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fees */}
            <div className="card">
              <button
                onClick={() => toggleSection('fees')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Banknote className="w-6 h-6 text-primary" />
                  {dict.cardDetail.feesAndCommissions}
                </h2>
                {expandedSection === 'fees' ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </button>
              {expandedSection === 'fees' && (
                <div className="p-6 pt-0 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">{dict.cardDetail.cardService}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{dict.cardDetail.issuance}</span>
                        <span className="font-semibold">{card.fees.issuance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{dict.cardDetail.annualService}</span>
                        <span className="font-semibold">{card.fees.annual}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{dict.cardDetail.smsNotifications}</span>
                        <span className="font-semibold">{card.fees.sms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{dict.cardDetail.cardReplacement}</span>
                        <span className="font-semibold">{card.fees.replacement}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">{dict.cardDetail.cashWithdrawal}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{dict.cardDetail.ownAtm} {card.bank}</span>
                        <span className="font-semibold">{card.cashWithdrawal.ownAtm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{dict.cardDetail.otherAtm}</span>
                        <span className="font-semibold">{card.cashWithdrawal.otherAtm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{dict.cardDetail.abroad}</span>
                        <span className="font-semibold">{card.cashWithdrawal.abroad}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Warnings */}
            <div className="card">
              <button
                onClick={() => toggleSection('warnings')}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                  {dict.cardDetail.importantInfo}
                </h2>
                {expandedSection === 'warnings' ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </button>
              {expandedSection === 'warnings' && (
                <div className="p-6 pt-0">
                  <ul className="space-y-3">
                    {card.warnings.map((warning, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{warning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{dict.cardDetail.customerReviews}</h2>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="btn-primary"
                >
                  {dict.cardDetail.leaveReview}
                </button>
              </div>

              {showReviewForm && (
                <div className="mb-6 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-4">{dict.cardDetail.yourReview}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">{dict.cardDetail.yourRating}</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button key={rating} className="p-2 hover:scale-110 transition-transform">
                            <Star className="w-6 h-6 text-gray-300 hover:text-yellow-500" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{dict.cardDetail.reviewText}</label>
                      <textarea
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        rows={4}
                        placeholder={dict.cardDetail.reviewPlaceholder}
                      />
                    </div>
                    <div className="flex gap-3">
                      <button className="btn-primary">{dict.cardDetail.publish}</button>
                      <button
                        onClick={() => setShowReviewForm(false)}
                        className="btn-secondary"
                      >
                        {dict.cardDetail.cancel}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {card.userReviews.map((review, idx) => (
                  <div key={idx} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold">{review.author}</div>
                          <div className="text-sm text-gray-500">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Article Section */}
            {articleData && (
              <div className="card p-6">
                <div className="prose prose-lg max-w-none">
                  {/* Article Intro */}
                  {articleData.intro && (
                    <div className="mb-8 text-gray-700 leading-relaxed whitespace-pre-line">
                      {articleData.intro}
                    </div>
                  )}

                  {/* Article Sections */}
                  {articleData.sections?.map((section: any, idx: number) => (
                    <div key={idx} className="mb-8">
                      <h2 className="text-2xl font-bold mb-4 text-gray-900">
                        {section.title}
                      </h2>
                      {Array.isArray(section.content) ? (
                        <ul className="space-y-2 list-disc list-inside text-gray-700">
                          {section.content.map((item: string, itemIdx: number) => (
                            <li key={itemIdx} className="leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {section.content}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Article Conclusion */}
                  {articleData.conclusion && (
                    <div className="mt-8 p-6 bg-gray-50 rounded-lg border-l-4 border-primary">
                      <h3 className="font-bold text-lg mb-3 text-gray-900">
                        {dict.cardDetail.conclusion}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {articleData.conclusion}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card p-6 sticky top-4">
              <h3 className="font-semibold mb-4">{dict.cardDetail.quickActions}</h3>
              <div className="space-y-3">
                {card.cardUrl ? (
                  <a
                    href={card.cardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-primary text-center block"
                  >
                    {dict.cardDetail.orderCard}
                  </a>
                ) : card.cardUrlIOS || card.cardUrlAndroid ? (
                  <>
                    {card.cardUrlIOS && (
                      <a
                        href={card.cardUrlIOS}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn-primary text-center block"
                      >
                        {dict.cardDetail.orderCardIOS}
                      </a>
                    )}
                    {card.cardUrlAndroid && (
                      <a
                        href={card.cardUrlAndroid}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full btn-primary text-center block"
                      >
                        {dict.cardDetail.orderCardAndroid}
                      </a>
                    )}
                  </>
                ) : (
                  <button className="w-full btn-primary">{dict.cardDetail.orderCard}</button>
                )}
                <Link href={`/${lang}/calc/credit`} className="block w-full btn-secondary text-center">
                  {dict.cardDetail.creditCalculator}
                </Link>
                <Link href={`/${lang}/cards`} className="block w-full btn-secondary text-center">
                  {dict.cardDetail.compareWithOthers}
                </Link>
              </div>
            </div>

            {/* Key Features */}
            <div className="card p-6">
              <h3 className="font-semibold mb-4">{dict.cardDetail.keyFeatures}</h3>
              <ul className="space-y-3">
                {card.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Security */}
            <div className="card p-6 bg-blue-50 border-blue-200">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                {dict.cardDetail.security}
              </h3>
              <ul className="text-sm space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>{dict.cardDetail.security3D}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>{dict.cardDetail.depositGuarantee}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>{dict.cardDetail.instantBlock}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
