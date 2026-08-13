import type { ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';
import './App.css';

// Aplica el tema claro guardado antes del primer pintado, para no mostrar un
// parpadeo de modo oscuro (el default del servidor) y recién después
// corregir a claro. El modo oscuro no necesita este empujón porque ya es el
// default de la hoja de estilos — coincide con lo que el servidor manda.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('eco-sistemas-theme');
    var isLight = stored === 'light' || (stored !== 'dark' && window.matchMedia('(prefers-color-scheme: light)').matches);
    if (isLight) document.documentElement.setAttribute('data-theme', 'light');
  } catch (e) {}
})();
`;

export function Layout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: el script inline de más abajo puede agregar
    // data-theme="light" a este elemento antes de que React hidrate (para
    // que el tema guardado se aplique sin parpadeo) — React no tiene forma
    // de saber de antemano ese valor en el servidor, así que sin este flag
    // marca (falsamente) un mismatch de hidratación en cada carga.
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/assets/fotos/logo.webp" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ECO SISTEMAS URH SAC</title>

        {/* Fuentes alojadas localmente (public/fonts/, variables: un solo
            archivo cubre todos los pesos usados), precargadas para que estén
            listas antes de que el texto necesite pintarse. */}
        <link rel="preload" href="/fonts/oswald-variable.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/roboto-variable.woff2" as="font" type="font/woff2" crossOrigin="" />

        {/* eslint-disable-next-line react/no-danger */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Outlet />
      </LanguageProvider>
    </ThemeProvider>
  );
}
