import React, {useState} from 'react';


const translations = {
  en: { welcome: "Welcome to Funshiksha", save: "Save Progress" },
  hi: { welcome: "फनशिक्षा में आपका स्वागत है", save: "प्रगति सहेजें" },
  or: { welcome: "ଫନସିକ୍ଷାକୁ ସ୍ୱାଗତ", save: "ପ୍ରଗତି ସଞ୍ଚୟ କରନ୍ତୁ" }
};


const App: React.FC = () => {
  const [lang, setLang] = useState('en');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value);
  };

  return (
    <div>
      <h1>{translations[lang].welcome}</h1>
      <select value={lang} onChange={handleChange}>
         <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="or">Odia</option>
      </select>
      <button>{translations[lang].save}</button>
    </div>
  )

};




  export default App;
