import i18next from "i18next";
import { initReactI18next, Translation } from "react-i18next";
import { en, gu, hi } from "../translations";

const resources ={
    en:{
        translation: en,
    },
    hi:{
        translation: hi,
    },
    gu:{
        translation: gu,
    }
}

i18next.use(initReactI18next).init({
    debug: true,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    resources,
    
})

export default i18next;