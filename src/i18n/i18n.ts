import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import enNs from './locales/en/translation.json';
import viNs from './locales/vi/translation.json';


export const defaultNS = 'translation';
i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    debug: true,
    lng: localStorage.getItem("i18nextLng") || 'en',
    defaultNS,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: enNs,
      },
      vi: {
        translation: viNs,
      },
    },
  }).then();

