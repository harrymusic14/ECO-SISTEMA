import { useEffect, useRef, useState } from 'react';
import { initFluidSimulation } from '../lib/webglFluid';
import { useTheme } from '../hooks/useTheme';

const DISPLAY_MS = 1900;
const FADE_MS = 500;

const BACK_COLOR_BY_THEME = {
  dark: { r: 15, g: 23, b: 42 },
  light: { r: 226, g: 232, b: 240 },
};

/** Animación de bienvenida con el logo que aparece al recargar la página
 * (una sola vez, no en cada navegación interna del SPA ya que Layout no se
 * vuelve a montar entre rutas). Es su propia escena aparte: tiene su propia
 * simulación de fluidos (opaca, cubre toda la pantalla) en vez de mostrar la
 * página real detrás. Respeta prefers-reduced-motion. */
const LogoPreloader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const initialThemeRef = useRef(theme);
  // Arranca siempre en 'in' (igual que el servidor) — comprobar
  // prefers-reduced-motion recién en el useEffect de abajo evita el
  // mismatch de hidratación (en el servidor no existe matchMedia).
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPhase('done');
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const sim = initFluidSimulation(canvas, BACK_COLOR_BY_THEME[initialThemeRef.current]);
    return () => sim?.destroy();
  }, []);

  useEffect(() => {
    if (phase !== 'in') return;
    const outTimer = setTimeout(() => setPhase('out'), DISPLAY_MS);
    const doneTimer = setTimeout(() => setPhase('done'), DISPLAY_MS + FADE_MS);
    return () => {
      clearTimeout(outTimer);
      clearTimeout(doneTimer);
    };
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div className={`logo-preloader${phase === 'out' ? ' logo-preloader-out' : ''}`} aria-hidden="true">
      <canvas ref={canvasRef} className="logo-preloader-canvas" />
      <div className="logo-preloader-glow" />
      <div className="logo-preloader-stage">
        <div className="logo-preloader-shadow" />
        <img src="/assets/fotos/logo.webp" alt="" className="logo-preloader-face logo-preloader-face-front" />
        <img src="/assets/fotos/logo.webp" alt="" className="logo-preloader-face logo-preloader-face-back" />
      </div>
    </div>
  );
};

export default LogoPreloader;
