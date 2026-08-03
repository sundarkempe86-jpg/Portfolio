'use client';

import React, { createContext, useContext, useState } from 'react';

export type LanguageCode = 'en' | 'kn' | 'hi';

const dictionaries: Record<LanguageCode, Record<string, string>> = {
  en: {
    heroGreeting: "Hi, I'm Sundar Raj Kempe",
    exploreProjects: "Explore Projects",
    recruiterDashboard: "Recruiter Dashboard",
    downloadResume: "Download Resume",
    skillsTitle: "Technical Core Matrix",
    projectsTitle: "Featured Engineering Projects",
    contactTitle: "Get In Touch",
  },
  kn: {
    heroGreeting: "ನಮಸ್ಕಾರ, ನಾನು ಸುಂದರ್ ರಾಜ್ ಕೆಂಪೆ",
    exploreProjects: "ಯೋಜನೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    recruiterDashboard: "ಉದ್ಯೋಗದಾತರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    downloadResume: "ರೆಸ್ಯೂಮ್ ಡೌನ್‌ಲೋಡ್",
    skillsTitle: "ತಾಂತ್ರಿಕ ಕೌಶಲ್ಯಗಳು",
    projectsTitle: "ಪ್ರಮುಖ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು",
    contactTitle: "ಸಂಪರ್ಕಿಸಿ",
  },
  hi: {
    heroGreeting: "नमस्ते, मैं सुंदर राज केम्पे हूँ",
    exploreProjects: "प्रोजेक्ट्स देखें",
    recruiterDashboard: "रिक्रूटर डैशबोर्ड",
    downloadResume: "रिज्यूमे डाउनलोड करें",
    skillsTitle: "तकनीकी कौशल",
    projectsTitle: "प्रमुख प्रोजेक्ट्स",
    contactTitle: "संपर्क करें",
  },
};

interface I18nContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: 'en',
  setLang: () => {},
  t: (k) => k,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<LanguageCode>('en');

  const t = (key: string): string => {
    return dictionaries[lang]?.[key] || dictionaries.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
