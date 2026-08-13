import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  LanguageContext,
  getInitialLanguage,
  translations,
  LANGUAGE_STORAGE_KEY,
  type Language,
  type TranslationKey,
} from './language';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Arranca siempre en 'es' (igual que el servidor) — leer localStorage
  // recién en el useEffect de abajo evita el mismatch de hidratación.
  const [language, setLanguage] = useState<Language>('es');
  const correctedRef = useRef(false);

  useEffect(() => {
    if (!correctedRef.current) {
      correctedRef.current = true;
      const real = getInitialLanguage();
      if (real !== language) {
        setLanguage(real);
        return; // este efecto se vuelve a correr con el valor ya corregido
      }
    }
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
