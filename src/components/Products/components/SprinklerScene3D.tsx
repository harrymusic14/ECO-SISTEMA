import { useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Sistema de partículas de agua (spray atomizado) saliendo de la boquilla del aspersor.
const WaterSpray = ({ rotationRef }: { rotationRef: MutableRefObject<THREE.Group | null> }) => {
  const count = 8000;
  const mesh = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 1.5;
      const speed = 15 + Math.random() * 5;
      const angle = (Math.random() - 0.5) * 0.1;
      const lift = (Math.random() - 0.5) * 0.1;
      temp.push({ t, speed, angle, lift });
    }
    return temp;
  }, []);

  const positionsArray = useMemo(() => new Float32Array(count * 3), [count]);
  const sizeArray = useMemo(() => new Float32Array(count).map(() => 0.12 + Math.random() * 0.12), [count]);

  const dummy = useMemo(() => new THREE.Vector3(), []);
  const headPos = useMemo(() => new THREE.Vector3(0, 3, 0), []);
  const nozzleLocalPos = useMemo(() => new THREE.Vector3(0, 0.4, 0.75), []);

  useFrame((state, delta) => {
    if (!mesh.current || !rotationRef.current) return;

    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    const currentRotation = rotationRef.current.rotation.y;

    particles.forEach((p, i) => {
      p.t += delta;

      if (p.t > 1.2) {
        p.t = 0;
        dummy.copy(nozzleLocalPos);
        dummy.applyAxisAngle(new THREE.Vector3(0, 1, 0), currentRotation);
        dummy.add(headPos);
        positions[i * 3] = dummy.x;
        positions[i * 3 + 1] = dummy.y;
        positions[i * 3 + 2] = dummy.z;
        return;
      }

      const i3 = i * 3;
      const rotSpeed = 0.8;
      const emissionAngle = currentRotation - (p.t * rotSpeed) + p.angle;
      const velocity = p.speed * delta;
      const verticalForce = Math.sin(0.1) * p.speed;

      positions[i3] += Math.sin(emissionAngle) * velocity * (1 + p.angle * 0.2);
      positions[i3 + 1] += (verticalForce * 0.012 + p.lift) * delta;
      positions[i3 + 2] += Math.cos(emissionAngle) * velocity * (1 + p.angle * 0.2);

      const dx = positions[i3] - headPos.x;
      const dy = positions[i3 + 1] - headPos.y;
      const dz = positions[i3 + 2] - headPos.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist > 10) p.t = 999;
    });

    mesh.current.geometry.attributes.position.needsUpdate = true;

    const mat = mesh.current.material as THREE.PointsMaterial;
    const fade = Math.min(state.clock.elapsedTime * 0.2, 1);
    mat.opacity = 0.85 - fade * 0.25;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positionsArray, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizeArray, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.22}
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        color="#7dd3fc"
      />
    </points>
  );
};

// Modelo del aspersor: cuerpo base fijo + vástago + cabezal giratorio con boquilla.
const SprinklerModel = () => {
  const headRef = useRef<THREE.Group>(null);

  useFrame((_state, delta) => {
    if (headRef.current) {
      headRef.current.rotation.y += delta * 0.8;
    }
  });

  return (
    <group position={[0, -2, 0]}>
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.75, 0.75, 3.5, 32]} />
        <meshStandardMaterial color="#1e293b" roughness={0.7} metalness={0.2} />
      </mesh>

      <mesh position={[0, 1.8, 0]} receiveShadow>
        <cylinderGeometry args={[0.88, 0.88, 0.1, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>

      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.5, 3, 32]} />
        <meshStandardMaterial color="#334155" roughness={0.6} metalness={0.4} />
      </mesh>

      <group ref={headRef} position={[0, 3, 0]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.56, 0.56, 1.2, 32]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.1} />
        </mesh>

        <mesh position={[0, 0.81, 0]}>
          <cylinderGeometry args={[0.58, 0.58, 0.05, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} />
        </mesh>

        <mesh position={[0, 0.84, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.02, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.8} />
        </mesh>

        <mesh position={[0, 0.4, 0.35]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.5, 0.63, 0.63]} />
          <meshStandardMaterial color="#0f172a" roughness={0.2} />
        </mesh>

        <mesh position={[0, 0.4, 0.7]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.19, 0.31, 0.06]} />
          <meshPhysicalMaterial color="#06b6d4" transmission={0.6} opacity={1} metalness={0} roughness={0.1} ior={1.5} thickness={0.5} />
        </mesh>
      </group>

      <WaterSpray rotationRef={headRef} />
    </group>
  );
};

const SprinklerScene3D = () => {
  return (
    <Canvas shadows dpr={[1, 2]}>
      <PerspectiveCamera makeDefault position={[3, 4, 6]} fov={45} />

      <ambientLight intensity={0.8} />
      <hemisphereLight intensity={1.0} color="#ffffff" groundColor="#507088" />
      <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={3} castShadow shadow-bias={-0.0001} />
      <pointLight position={[-5, 5, -5]} intensity={2} color="#22d3ee" distance={10} />
      <spotLight position={[0, 5, -5]} intensity={5} color="#ffffff" angle={0.5} />

      <SprinklerModel />

      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />

      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
};

export default SprinklerScene3D;
