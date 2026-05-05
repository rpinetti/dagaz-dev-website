import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import ptTranslations from './locales/pt.json';

const resources = {
  pt: { translation: ptTranslations },
  en: { translation: enTranslations },
  es: { translation: esTranslations },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
