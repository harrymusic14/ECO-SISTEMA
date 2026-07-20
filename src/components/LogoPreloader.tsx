import { useEffect, useRef, useState } from 'react';
import { initFluidSimulation } from '../lib/webglFluid';

const DISPLAY_MS = 1900;
const FADE_MS = 500;

/** Animación de bienvenida con el logo que aparece al recargar la página
 * (una sola vez, no en cada navegación interna del SPA ya que Layout no se
 * vuelve a montar entre rutas). Es su propia escena aparte: tiene su propia
 * simulación de fluidos (opaca, cubre toda la pantalla) en vez de mostrar la
 * página real detrás. Respeta prefers-reduced-motion. */
const LogoPreloader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'done' : 'in'
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const destroy = initFluidSimulation(canvas);
    return () => destroy?.();
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
        <img src="/logo.png" alt="" className="logo-preloader-face logo-preloader-face-front" />
        <img src="/logo.png" alt="" className="logo-preloader-face logo-preloader-face-back" />
      </div>
    </div>
  );
};

export default LogoPreloader;
