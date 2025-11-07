import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";

function Settings() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState([])

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    window.electronAPI?.getLanguages().then((langs) => setLang(langs));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <label htmlFor="lang">{t("select_language")}</label>
      <select
        id="lang"
        value={i18n.language}
        onChange={handleChange}
        style={{ marginLeft: "10px" }}
      >
        {lang?.map((lan)=><option value={lan?.code}>{lan?.code}</option>)}
      </select>
    </div>
  );
}

export default Settings;
