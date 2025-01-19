import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import id from '../locales/id.json';
import ja from '../locales/ja.json';
import { KEY } from '../shared/constants/constantStorage';

const getLanguage = () => {
  const lang = localStorage.getItem(KEY.localStorage.locale.name);
  if (lang) return lang;
  return 'en';
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    id: { translation: id },
    ja: { translation: ja },
  },
  lng: getLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
