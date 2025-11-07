import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import path from "path";



const getInitialLanguage = () => {
  try {
    const saved = localStorage.getItem("language");
    if (saved) return saved;

    const browserLang = navigator.language?.split("-")[0];
    return browserLang || "en";
  } catch {
    return "en";
  }
};


i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    lng: getInitialLanguage(),
    backend: {
      loadPath:
        window.location.protocol === "file:"
          ? "./languages/{{lng}}.json"
          : "/languages/{{lng}}.json",
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
