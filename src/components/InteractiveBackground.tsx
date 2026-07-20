import { useEffect, useRef } from 'react';
import { initFluidSimulation } from '../lib/webglFluid';

/** Fondo de fluidos real (WebGL, tipo Navier-Stokes) que reacciona al cursor
 * como si de verdad estuviera moviendo agua — no puntos ni partículas, sino
 * un campo de tinte continuo con sombreado, brillo (bloom) y rayos de luz.
 * Pausa si la pestaña no está visible o si el usuario prefiere menos
 * movimiento (prefers-reduced-motion). */
const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const destroy = initFluidSimulation(canvas);
    return () => destroy?.();
  }, []);

  return <canvas ref={canvasRef} className="interactive-background" aria-hidden="true" />;
};

export default InteractiveBackground;
