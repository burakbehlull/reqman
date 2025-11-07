import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

// Varsayılan dil (öncelik: localStorage → Electron IPC → sistem dili → en)
const getInitialLanguage = () => {
  try {
    const saved = localStorage.getItem("language");
    if (saved) return saved;

    // Eğer Electron preload ile main process’ten dil gönderiyorsa
    // (örneğin ipcRenderer.invoke("get-language"))
    // onu da buraya entegre edebilirsin

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
      // Electron'da public dizin genelde root değildir,
      // bu yüzden 'public/languages' doğru erişilebilmeli
      loadPath: "/languages/{{lng}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
