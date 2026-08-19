import type { Config } from '@react-router/dev/config';
import { vercelPreset } from '@vercel/react-router/vite';

export default {
  // El código sigue viviendo en src/ tal como está — no hace falta mover
  // ~40 archivos existentes a una carpeta app/ nueva.
  appDirectory: 'src',
  ssr: true,
  presets: [vercelPreset()],
  // Fijados en false (el comportamiento actual) solo para silenciar los
  // avisos de "Future Flag" en consola — no cambia nada del funcionamiento.
  future: {
    v8_middleware: false,
    v8_splitRouteModules: false,
    v8_viteEnvironmentApi: false,
    v8_passThroughRequests: false,
    v8_trailingSlashAwareDataRequests: false,
  },
} satisfies Config;
