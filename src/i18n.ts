import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: {
      'en': ['en'],
      'en-MY': ['en'],
      'ms': ['ms-MY'],
      'ms-MY': ['ms-MY'],
      'ms-Arab': ['ms-Arab-MY'],
      'ms-Arab-MY': ['ms-Arab-MY'],
      'ja': ['ja'],
      default: ['en'],
    },
    debug: true,
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    supportedLngs: ['en', 'ms-MY', 'ms-Arab-MY', 'ja'], // explicitly supported languages
  })

export default i18n
