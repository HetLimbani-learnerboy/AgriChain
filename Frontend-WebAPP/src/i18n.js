import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "en",          // default language
    fallbackLng: "en",  // fallback if language not found
    resources: {
      en: {
        translation: {
          welcome: "Welcome to AgriChain",
          title:"Track the supply chain from farm to fork with transparency.",
          dashboard:"Dashboard",
          Transactions:"Transactions"
        },
      },
      hi: {
        translation: {
          welcome: "AgriChain में आपका स्वागत है",
          title:"खेत से लेकर कांटे तक आपूर्ति श्रृंखला पर पारदर्शिता के साथ नज़र रखें।",
          dashboard:"डैशबोर्ड",
          Transactions:"लेनदेन"
        },
      },
      gu: {
        translation: {
          welcome: "AgriChain માં આપનું સ્વાગત છે",
          title:"ખેતરથી લઈને કાંટા સુધી સપ્લાય ચેઇનને પારદર્શિતા સાથે ટ્રેક કરો.",
          dashboard:"ડેશબોર્ડ",
          Transactions:"વ્યવહારો"
        },
      },
    },
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
