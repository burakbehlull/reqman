import { useTranslation } from "react-i18next";

function Settings() {
  const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <label htmlFor="lang">{t("select_language")}</label>
      <select
        id="lang"
        value={i18n.language}
        onChange={handleChange}
        style={{ marginLeft: "10px" }}
      >
        <option value="en">English</option>
        <option value="tr">Türkçe</option>
      </select>
    </div>
  );
}

export default Settings;
