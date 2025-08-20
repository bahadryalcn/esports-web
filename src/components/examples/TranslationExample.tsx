'use client';

import { useAppTranslation } from '@/lib/hooks/useTranslation';

export const TranslationExample = () => {
  const { t, lang, isEnglish, isTurkish } = useAppTranslation();

  return (
    <div className="p-6 bg-gaming-dark rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">
        Next-Translate Örneği / Next-Translate Example
      </h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gaming-primary mb-2">
            Mevcut Dil / Current Language: {lang}
          </h3>
          <p className="text-gray-300">
            {isTurkish ? 'Türkçe aktif' : 'English active'}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gaming-primary mb-2">
            Çeviri Örnekleri / Translation Examples
          </h3>
          <div className="space-y-2 text-gray-300">
            <p><strong>Hero Title:</strong> {t('homepage:hero.title')}</p>
            <p><strong>Hero Subtitle:</strong> {t('homepage:hero.subtitle')}</p>
            <p><strong>Learn More:</strong> {t('homepage:hero.learnMore')}</p>
            <p><strong>Contact:</strong> {t('homepage:hero.contact')}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gaming-primary mb-2">
            About Sayfası / About Page
          </h3>
          <div className="space-y-2 text-gray-300">
            <p><strong>Title:</strong> {t('about:title')}</p>
            <p><strong>Description:</strong> {t('about:description')}</p>
            <p><strong>Mission:</strong> {t('about:mission.title')}</p>
            <p><strong>Vision:</strong> {t('about:vision.title')}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gaming-primary mb-2">
            News Sayfası / News Page
          </h3>
          <div className="space-y-2 text-gray-300">
            <p><strong>Title:</strong> {t('news:title')}</p>
            <p><strong>Subtitle:</strong> {t('news:subtitle')}</p>
            <p><strong>Read More:</strong> {t('news:readMore')}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gaming-primary mb-2">
            Players Sayfası / Players Page
          </h3>
          <div className="space-y-2 text-gray-300">
            <p><strong>Title:</strong> {t('players:title')}</p>
            <p><strong>Subtitle:</strong> {t('players:subtitle')}</p>
            <p><strong>View Profile:</strong> {t('players:viewProfile')}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gaming-primary mb-2">
            Contact Sayfası / Contact Page
          </h3>
          <div className="space-y-2 text-gray-300">
            <p><strong>Title:</strong> {t('contact:title')}</p>
            <p><strong>Subtitle:</strong> {t('contact:subtitle')}</p>
            <p><strong>Send:</strong> {t('contact:form.send')}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gaming-primary mb-2">
            Services Sayfası / Services Page
          </h3>
          <div className="space-y-2 text-gray-300">
            <p><strong>Title:</strong> {t('services:title')}</p>
            <p><strong>Subtitle:</strong> {t('services:subtitle')}</p>
            <p><strong>E-Sports:</strong> {t('services:esports.title')}</p>
            <p><strong>Tournaments:</strong> {t('services:tournaments.title')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}; 