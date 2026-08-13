import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows, useGLTF, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';
import { useReveal } from '../../../hooks/useReveal';

interface ModelViewer3DProps {
  modelUrl: string;
  scale?: number;
  /** Imagen .webp de respaldo: se usa en móvil (siempre) y en escritorio
   * mientras el modelo todavía no fue revelado por scroll. */
  poster?: string;
  alt?: string;
}

/** Spinner + porcentaje mientras el modelo termina de descargar. Vive dentro
 * del Canvas (vía <Html>) porque el fallback de Suspense aquí debe ser un
 * elemento válido de la escena de react-three-fiber, no HTML normal. */
const Loader3D = () => {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="model3d-loader">
        <span className="model3d-spinner" />
        <span>Cargando {Math.round(progress)}%...</span>
      </div>
    </Html>
  );
};

/** Modelo real generado por IA (Stability AI / TripoSR) a partir de la foto,
 * comprimido con Draco (geometria completa, sin simplificar, para maxima
 * nitidez). El grupo queda centrado en el origen — asi coincide con el
 * target por defecto de OrbitControls y no se corta nada del objeto. */
const Model = ({ url, scale, active }: { url: string; scale: number; active: boolean }) => {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
        // El archivo no trae metalness/roughness explícitos, así que glTF
        // los interpreta como 100% metálicos por defecto — sin un mapa de
        // entorno (HDRI) eso se ve casi negro salvo donde pega la luz
        // directa. Se fuerza un acabado plástico semi-mate, más real para
        // una pieza de riego.
        if (obj.material instanceof THREE.MeshStandardMaterial) {
          obj.material.metalness = 0.15;
          obj.material.roughness = 0.6;
        }
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current && active) {
      groupRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={scene} />
    </group>
  );
};

const isMobileViewport = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

/** Visor 3D genérico y reutilizable: cualquier modelo nuevo solo necesita su
 * .glb (ver src/lib/models3d.ts), sin repetir luces, cámara ni la lógica de
 * carga/revelado. En móvil muestra directamente la foto de respaldo — evita
 * tirones de FPS y gasto de datos/batería innecesario en equipos limitados. */
const ModelViewer3D = ({ modelUrl, scale = 2.4, poster, alt = 'Modelo 3D' }: ModelViewer3DProps) => {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [isMobile] = useState(isMobileViewport);

  if (isMobile && poster) {
    return (
      <div ref={ref} style={{ width: '100%', height: '100%' }}>
        <img src={poster} alt={alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
    );
  }

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {poster && !visible && (
        <img
          src={poster}
          alt={alt}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'contain', position: 'absolute', inset: 0 }}
        />
      )}
      {visible && (
        <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[2.8, 1.1, 3.1]} fov={38} />

          <ambientLight intensity={0.9} />
          <hemisphereLight intensity={1} color="#ffffff" groundColor="#507088" />
          <spotLight
            position={[3, 4, 2]}
            angle={0.4}
            penumbra={1}
            intensity={6}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
          <pointLight position={[-2.5, 1.5, -2.5]} intensity={3} color="#22d3ee" distance={8} />
          <spotLight position={[0, 3, -3]} intensity={4} color="#ffffff" angle={0.6} />
          <spotLight position={[-3, 1, 3]} intensity={3} color="#ffffff" angle={0.6} penumbra={1} />

          <Suspense fallback={<Loader3D />}>
            <Model url={modelUrl} scale={scale} active={visible} />
          </Suspense>

          <ContactShadows position={[0, -1.25, 0]} resolution={1024} scale={6} blur={1.8} opacity={0.55} far={2} color="#000000" />

          <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
        </Canvas>
      )}
    </div>
  );
};

export default ModelViewer3D;
