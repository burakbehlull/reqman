import { Container } from '@components'
import "./config/i18n";

import { useEffect } from "react";
import i18next from "i18next";




function App() {

	function handleLanguage(){
		const lang = localStorage.getItem("language") || "tr";
		window.electronAPI?.setLanguage(lang);
	}
	
	useEffect(() => handleLanguage(), []);
	useEffect(() => handleLanguage(), [i18next.language]);

  return (
    <>
		<Container />
    </>
  )
}

export default App