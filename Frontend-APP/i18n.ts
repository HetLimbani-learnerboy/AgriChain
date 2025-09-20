import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Define translations
const resources = {
  en: {
    translation: {
      Welcome: "Welcome to AgriChain",
      ConsumerPortal: "Consumer Portal",
      ConsumerSubtitle: "Explore consumer features here",
    },
  },
  hi: {
    translation: {
      Welcome: "एग्रीचेन में आपका स्वागत है",
      ConsumerPortal: "उपभोक्ता पोर्टल",
      ConsumerSubtitle: "यहां उपभोक्ता सुविधाओं का अन्वेषण करें",
    },
  },
  gu: {
    translation: {
      Welcome: "AgriChain માં આપનું સ્વાગત છે",
      ConsumerPortal: "ગ્રાહક પોર્ટલ",
      ConsumerSubtitle: "અહીં ગ્રાહક સુવિધાઓ શોધો",
    },
  },
};

const deviceLanguage = Localization.getLocales()[0].languageCode || "en";


i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage, // default based on device
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
