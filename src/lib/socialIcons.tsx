// lucide-react ya no incluye íconos de marcas, así que estos van como SVG propios.
export const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M14 9h3V5.5h-3C11.5 5.5 10 7 10 9.3V11H8v3.5h2V21h3.5v-6.5H16l.5-3.5h-3v-1.3c0-.7.3-1.2 1-1.2Z" />
  </svg>
);

export const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M16.6 5.82c-.98-.9-1.58-2.17-1.58-3.6h-3.13v13.44a2.6 2.6 0 1 1-2.6-2.6c.24 0 .48.03.7.09V9.9a5.72 5.72 0 0 0-.7-.04A5.73 5.73 0 1 0 15 15.6V8.83a7.2 7.2 0 0 0 4.2 1.35V7.05a4.2 4.2 0 0 1-2.6-1.23Z" />
  </svg>
);
