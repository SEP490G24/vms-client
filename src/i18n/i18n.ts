import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import enNs from './locales/en_US/translation.json';
import viNs from './locales/vi_VN/translation.json';


export const defaultNS = 'translation';
i18n
  .use(initReactI18next)
  .use(Backend)
  .use(LanguageDetector)
  .init({
    debug: true,
    lng: localStorage.getItem("i18nextLng") || 'en_US',
    defaultNS,
    fallbackLng: 'en_US',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en_US: {
        translation: enNs,
      },
      ko_KR: {
        translation: viNs,
      },
    },
  }).then();

