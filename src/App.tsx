import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';

const translations = {
  en: { welcome: "Welcome to Funshiksha", save: "Save Progress" },
  hi: { welcome: "फनशिक्षा में आपका स्वागत है", save: "प्रगति सहेजें" },
  or: { welcome: "ଫନସିକ୍ଷାକୁ ସ୍ୱାଗତ", save: "ପ୍ରଗତି ସଞ୍ଚୟ କରନ୍ତୁ" }
};

const dbPromise = openDB('funshikshaDB', 1, {
  upgrade(db) {
    db.createObjectStore('progress', { keyPath: 'id' });
  }
});

const App: React.FC = () => {
  const [lang, setLang] = useState('en');
  const [progress, setProgress] = useState('');

  useEffect(() => {
    async function loadProgress() {
      const db = await dbPromise;
      const allEntries = await db.getAll('progress');
      if (allEntries.length > 0) setProgress(JSON.stringify(allEntries[0]));
    }
    loadProgress();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value);
  };

  const saveProgress = async () => {
    const db = await dbPromise;
    await db.put('progress', { id: 'user1', score: 50, level: 2 });
    alert('Progress saved offline!');
  };

  return (
    <div>
      <h1>{translations[lang].welcome}</h1>
      <select value={lang} onChange={handleChange}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="or">Odia</option>
      </select>
      <button onClick={saveProgress}>{translations[lang].save}</button>
      <div>Saved Progress: {progress}</div>
    </div>
  );
};

export default App;
