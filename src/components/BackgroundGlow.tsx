/** Decoración de fondo global: manchas de color difuminadas (glow) detrás de
 * todo el contenido, en vez del fondo de agua interactivo que tenía antes.
 * Puramente visual (aria-hidden), respeta prefers-reduced-motion vía CSS. */
const BackgroundGlow = () => (
  <div className="background-glow" aria-hidden="true">
    <span className="background-glow-blob background-glow-blob-1" />
    <span className="background-glow-blob background-glow-blob-2" />
    <span className="background-glow-blob background-glow-blob-3" />
  </div>
);

export default BackgroundGlow;
