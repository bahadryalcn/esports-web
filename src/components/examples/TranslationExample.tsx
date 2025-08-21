'use client';

import { useAppTranslation } from '@/lib/hooks/useTranslation';

export const TranslationExample = () => {
  const { t, lang, isEnglish, isTurkish } = useAppTranslation();

  return (
    <div className="rounded-lg bg-gaming-dark p-6">
      <h2 className="mb-4 text-2xl font-bold text-white">
        Next-Translate Örneği / Next-Translate Example
      </h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-gaming-primary mb-2 text-lg font-semibold">
            Mevcut Dil / Current Language: {lang}
          </h3>
          <p className="text-gray-300">
            {isTurkish ? 'Türkçe aktif' : 'English active'}
          </p>
        </div>

        <div>
          <h3 className="text-gaming-primary mb-2 text-lg font-semibold">
            Çeviri Örnekleri / Translation Examples
          </h3>
          <div className="space-y-2 text-gray-300">
            <p>
              <strong>Hero Title:</strong> {t('homepage:hero.title')}
            </p>
            <p>
              <strong>Hero Subtitle:</strong> {t('homepage:hero.subtitle')}
            </p>
            <p>
              <strong>Learn More:</strong> {t('homepage:hero.learnMore')}
            </p>
            <p>
              <strong>Contact:</strong> {t('homepage:hero.contact')}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-gaming-primary mb-2 text-lg font-semibold">
            About Sayfası / About Page
          </h3>
          <div className="space-y-2 text-gray-300">
            <p>
              <strong>Title:</strong> {t('about:title')}
            </p>
            <p>
              <strong>Description:</strong> {t('about:description')}
            </p>
            <p>
              <strong>Mission:</strong> {t('about:mission.title')}
            </p>
            <p>
              <strong>Vision:</strong> {t('about:vision.title')}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-gaming-primary mb-2 text-lg font-semibold">
            News Sayfası / News Page
          </h3>
          <div className="space-y-2 text-gray-300">
            <p>
              <strong>Title:</strong> {t('news:title')}
            </p>
            <p>
              <strong>Subtitle:</strong> {t('news:subtitle')}
            </p>
            <p>
              <strong>Read More:</strong> {t('news:readMore')}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-gaming-primary mb-2 text-lg font-semibold">
            Players Sayfası / Players Page
          </h3>
          <div className="space-y-2 text-gray-300">
            <p>
              <strong>Title:</strong> {t('players:title')}
            </p>
            <p>
              <strong>Subtitle:</strong> {t('players:subtitle')}
            </p>
            <p>
              <strong>View Profile:</strong> {t('players:viewProfile')}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-gaming-primary mb-2 text-lg font-semibold">
            Contact Sayfası / Contact Page
          </h3>
          <div className="space-y-2 text-gray-300">
            <p>
              <strong>Title:</strong> {t('contact:title')}
            </p>
            <p>
              <strong>Subtitle:</strong> {t('contact:subtitle')}
            </p>
            <p>
              <strong>Send:</strong> {t('contact:form.send')}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-gaming-primary mb-2 text-lg font-semibold">
            Services Sayfası / Services Page
          </h3>
          <div className="space-y-2 text-gray-300">
            <p>
              <strong>Title:</strong> {t('services:title')}
            </p>
            <p>
              <strong>Subtitle:</strong> {t('services:subtitle')}
            </p>
            <p>
              <strong>E-Sports:</strong> {t('services:esports.title')}
            </p>
            <p>
              <strong>Tournaments:</strong> {t('services:tournaments.title')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
