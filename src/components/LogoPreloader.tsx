import { useEffect, useMemo, useState } from 'react';

const DISPLAY_MS = 1900;
const FADE_MS = 500;

const GRID_COLS = 14;
const GRID_ROWS = 8;

// Cuadrícula de celdas que se iluminan en cian (color de marca) en forma de
// onda expansiva desde el centro — reemplaza a la simulación de fluidos.
const GRID_CELLS = (() => {
  const centerX = (GRID_COLS - 1) / 2;
  const centerY = (GRID_ROWS - 1) / 2;
  const cells: { key: string; delay: number }[] = [];
  for (let y = 0; y < GRID_ROWS; y++) {
    for (let x = 0; x < GRID_COLS; x++) {
      const dist = Math.hypot(x - centerX, y - centerY);
      cells.push({ key: `${x}-${y}`, delay: dist * 190 });
    }
  }
  return cells;
})();

/** Animación de bienvenida con el logo que aparece al recargar la página
 * (una sola vez, no en cada navegación interna del SPA ya que Layout no se
 * vuelve a montar entre rutas). Es su propia escena aparte: una cuadrícula
 * de celdas cian (color de marca) que se ilumina en onda desde el centro,
 * opaca, cubre toda la pantalla) en vez de mostrar la página real detrás.
 * Respeta prefers-reduced-motion. */
const LogoPreloader = () => {
  // Arranca siempre en 'in' (igual que el servidor) — comprobar
  // prefers-reduced-motion recién en el useEffect de abajo evita el
  // mismatch de hidratación (en el servidor no existe matchMedia).
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in');
  const gridCells = useMemo(() => GRID_CELLS, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPhase('done');
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
      <div className="logo-preloader-grid">
        {gridCells.map((cell) => (
          <div key={cell.key} className="logo-preloader-cell" style={{ animationDelay: `${cell.delay}ms` }} />
        ))}
      </div>
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
