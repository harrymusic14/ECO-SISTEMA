import { createContext } from 'react';

export type Theme = 'dark' | 'light';

export interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const THEME_STORAGE_KEY = 'eco-sistemas-theme';

export function getInitialTheme(): Theme {
  // En el servidor no hay localStorage/matchMedia: se renderiza oscuro (el
  // default de la hoja de estilos) y el <script> inline de root.tsx corrige
  // a claro antes del primer pintado si corresponde, sin parpadeo.
  if (typeof window === 'undefined') return 'dark';
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}
