import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'
import { store } from 'src/store'
import { RootState } from 'src/store/store'

import translationEn from '../locales/en/translation.json'
import translationRu from '../locales/ru/translation.json'

const resources = {
  en: {
    translation: translationEn,
  },
  ru: {
    translation: translationRu,
  },
}

void i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: (store.getState() as RootState).settings.language,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  })

export const changeLanguage = (lng: string): void => {
  if (lng) {
    void i18n.changeLanguage(lng)
  } else {
    void i18n.changeLanguage('ru')
  }
}

export default i18n
