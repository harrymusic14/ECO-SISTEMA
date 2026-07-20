import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useReveal } from '../hooks/useReveal';

// Decodificador Draco auto-hospedado en public/draco/ (copiado de three/examples/jsm/libs/draco)
// en vez del CDN por defecto de drei, para no depender de un servicio externo.
useGLTF.setDecoderPath('/draco/');

const MODEL_URL = '/models/rotor3d.glb';
const MODEL_SCALE = 2.4;

/** Modelo real generado por IA (Stability AI / TripoSR) a partir de la foto,
 * comprimido con Draco (geometria completa, sin simplificar, para maxima
 * nitidez). El grupo queda centrado en el origen — asi coincide con el
 * target por defecto de OrbitControls y no se corta nada del objeto. */
const RotorModel = ({ active }: { active: boolean }) => {
  const { scene } = useGLTF(MODEL_URL);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current && active) {
      groupRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={groupRef} scale={MODEL_SCALE}>
      <primitive object={scene} />
    </group>
  );
};

const Rotor3D = () => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {visible && (
        <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[2.8, 1.1, 3.1]} fov={38} />

          <ambientLight intensity={0.5} />
          <hemisphereLight intensity={0.6} color="#ffffff" groundColor="#507088" />
          <spotLight
            position={[3, 4, 2]}
            angle={0.3}
            penumbra={1}
            intensity={4}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-bias={-0.0001}
          />
          <pointLight position={[-2.5, 1.5, -2.5]} intensity={2} color="#22d3ee" distance={8} />
          <spotLight position={[0, 3, -3]} intensity={2.5} color="#ffffff" angle={0.5} />

          <Suspense fallback={null}>
            <RotorModel active={visible} />
          </Suspense>

          <ContactShadows position={[0, -1.25, 0]} resolution={1024} scale={6} blur={1.8} opacity={0.55} far={2} color="#000000" />

          <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
        </Canvas>
      )}
    </div>
  );
};

export default Rotor3D;
