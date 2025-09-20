import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import gu from "../src/translation/gu.json"

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3", // important for React Native
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    gu: {translation: gu},
  },
  lng: "gu", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // not needed for React Native
  },
});

export default i18n;
