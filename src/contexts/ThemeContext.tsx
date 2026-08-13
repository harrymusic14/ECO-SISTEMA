import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ThemeContext, getInitialTheme, THEME_STORAGE_KEY, type Theme } from './theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Arranca siempre en 'dark' (igual que el servidor) para que el primer
  // render del cliente coincida exactamente con el HTML del SSR — leer
  // localStorage recién en el useEffect de abajo, nunca en el estado
  // inicial, es lo que evita el error de hidratación (el cliente no puede
  // "saber" de entrada lo que hay guardado antes de que React hidrate).
  const [theme, setTheme] = useState<Theme>('dark');
  const correctedRef = useRef(false);

  useEffect(() => {
    if (!correctedRef.current) {
      correctedRef.current = true;
      const real = getInitialTheme();
      if (real !== theme) {
        setTheme(real);
        return; // este efecto se vuelve a correr con el valor ya corregido
      }
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
