import { useGLTF } from '@react-three/drei';

// Decodificador Draco auto-hospedado en public/draco/ (copiado de three/examples/jsm/libs/draco)
// en vez del CDN por defecto de drei, para no depender de un servicio externo.
// Se configura una sola vez aquí, en vez de repetirlo en cada componente de modelo.
useGLTF.setDecoderPath('/draco/');

export interface Model3DConfig {
  /** Ruta al archivo .glb */
  url: string;
  /** Escala del modelo dentro de la escena */
  scale: number;
  /** Imagen .webp de respaldo — se usa en móvil y mientras el modelo no está revelado */
  poster?: string;
}

/** Registro central de modelos 3D del sitio. Agregar uno nuevo es solo
 * sumar una entrada aquí — ModelViewer3D y el precargado ya lo soportan. */
export const MODELS_3D = {
  rotor: {
    url: '/models/rotor3d.glb',
    scale: 2.4,
    poster: '/assets/fotos/inicio/productos destacados/rotor.jpg',
  },
  difusor: {
    url: '/models/difusor3d.glb',
    scale: 2.4,
    poster: '/assets/fotos/inicio/productos destacados/difusor.webp',
  },
} as const satisfies Record<string, Model3DConfig>;

export type Model3DKey = keyof typeof MODELS_3D;

/** Inicia la descarga del .glb en segundo plano de inmediato (queda en caché
 * de three.js), sin esperar a que el usuario haga scroll hasta el modelo. */
export function preload3DModel(key: Model3DKey) {
  useGLTF.preload(MODELS_3D[key].url);
}
