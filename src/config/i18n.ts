import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import HttpBackend from "i18next-http-backend"

//import LanguageDetector from "i18next-browser-languagedetector";


const browserLang = navigator.language.split("-")[0]
// .use(LanguageDetector)
i18n
  .use(HttpBackend)
  .use(initReactI18next)
  
  .init({
    fallbackLng: "en",
    lng: localStorage.getItem("language") || browserLang || "en",
    backend: {
      loadPath: "/languages/{{lng}}.json",
    },
    interpolation: { escapeValue: false },
  })

export default i18n
