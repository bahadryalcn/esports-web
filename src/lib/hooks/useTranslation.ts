import useTranslation from 'next-translate/useTranslation';

export const useAppTranslation = () => {
  const { t, lang } = useTranslation();
  
  return {
    t,
    lang,
    isEnglish: lang === 'en',
    isTurkish: lang === 'tr',
  };
}; 