'use client';

import { CheckCircle } from 'lucide-react';

interface CreditArticleProps {
  articleData: any;
}

export default function CreditArticle({ articleData }: CreditArticleProps) {
  // Helper function to render sections dynamically
  const renderSection = (titleKey: string, contentKey: string, listKey?: string, paragraph2Key?: string) => {
    if (!articleData[titleKey]) return null;

    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {articleData[titleKey]}
        </h2>
        {articleData[contentKey] && (
          <p className="text-gray-700 leading-relaxed mb-4">
            {articleData[contentKey]}
          </p>
        )}
        {listKey && articleData[listKey] && (
          <ul className="space-y-2 mb-4">
            {articleData[listKey].map((item: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        )}
        {paragraph2Key && articleData[paragraph2Key] && (
          <p className="text-gray-700 leading-relaxed">
            {articleData[paragraph2Key]}
          </p>
        )}
      </div>
    );
  };

  return (
    <article className="mt-12 bg-white rounded-2xl p-8 md:p-12 shadow-lg">
      <div className="max-w-4xl mx-auto">
        {/* Introduction */}
        {articleData.intro && (
          <div className="mb-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {articleData.intro}
            </p>
            {articleData.introParagraph2 && (
              <p className="text-gray-700 text-lg leading-relaxed">
                {articleData.introParagraph2}
              </p>
            )}
          </div>
        )}

        {/* Dynamic sections */}
        {renderSection('conditionsTitle', 'conditionsContent', undefined, 'conditionsParagraph2')}
        {renderSection('officialSiteTitle', 'officialSiteContent', 'officialSiteList', 'officialSiteParagraph2')}
        {renderSection('advantagesTitle', 'advantagesContent', 'advantagesList', 'advantagesParagraph2')}
        {renderSection('howToApplyTitle', 'howToApplyContent', undefined, 'howToApplyParagraph2')}
        {renderSection('requirementsTitle', 'requirementsContent', 'requirementsList', 'requirementsParagraph2')}
        {renderSection('howToGetTitle', 'howToGetContent', 'howToGetList', 'howToGetParagraph2')}
        {renderSection('loginTitle', 'loginContent', undefined, 'loginParagraph2')}
        {renderSection('contactsTitle', 'contactsContent', undefined, 'contactsParagraph2')}
        {renderSection('promoCodeTitle', 'promoCodeContent', undefined, 'promoCodeParagraph2')}
        {renderSection('reviewsTitle', 'reviewsContent', undefined, 'reviewsParagraph2')}
        {renderSection('noRefusalTitle', 'noRefusalContent', undefined, 'noRefusalParagraph2')}
        {renderSection('badCreditTitle', 'badCreditContent', undefined, 'badCreditParagraph2')}
        {renderSection('urgentCreditTitle', 'urgentCreditContent', undefined, 'urgentCreditParagraph2')}
        {renderSection('typesTitle', 'typesContent', 'typesList', 'typesParagraph2')}
        {renderSection('diyaTitle', 'diyaContent', undefined, 'diyaParagraph2')}
        {renderSection('allCreditsTitle', 'allCreditsContent', undefined, 'allCreditsParagraph2')}
        {renderSection('conclusionTitle', 'conclusionContent', undefined, 'conclusionParagraph2')}
      </div>
    </article>
  );
}
