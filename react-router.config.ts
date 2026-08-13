import type { Config } from '@react-router/dev/config';
import { vercelPreset } from '@vercel/react-router/vite';

export default {
  // El código sigue viviendo en src/ tal como está — no hace falta mover
  // ~40 archivos existentes a una carpeta app/ nueva.
  appDirectory: 'src',
  ssr: true,
  presets: [vercelPreset()],
} satisfies Config;
