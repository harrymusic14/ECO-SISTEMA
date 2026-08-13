import { useEffect, useState, type ReactNode } from 'react';
import {
  LanguageContext,
  getInitialLanguage,
  translations,
  LANGUAGE_STORAGE_KEY,
  type Language,
  type TranslationKey,
} from './language';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const toggleLanguage = () => setLanguage((prev) => (prev === 'es' ? 'en' : 'es'));
  const t = (key: TranslationKey, vars?: Record<string, string | number>) => {
    const text = translations[language][key];
    if (!vars) return text;
    return Object.entries(vars).reduce(
      (result, [varName, value]) => result.replaceAll(`{${varName}}`, String(value)),
      text as string
    );
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
