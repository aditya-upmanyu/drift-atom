import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense, type ReactNode } from 'react';
import * as THREE from 'three';

interface SceneProps {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  enableControls?: boolean;
  fog?: boolean;
  fogColor?: string;
  fogNear?: number;
  fogFar?: number;
  orbitControls?: boolean;
}

export function Scene({
  children,
  cameraPosition = [0, 0, 10],
  enableControls = false,
  fog = true,
  fogColor = '#070B14',
  fogNear = 5,
  fogFar = 30,
  orbitControls = false,
}: SceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
    >
      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={cameraPosition}
        fov={75}
        near={0.1}
        far={1000}
      />
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#4F46E5" />
      
      {/* Environment */}
      <Environment preset="night" />
      
      {/* Fog */}
      {fog && <fog attach="fog" args={[fogColor, fogNear, fogFar]} />}
      
      {/* Controls (optional) */}
      {(enableControls || orbitControls) && (
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          maxDistance={30}
          minDistance={10}
          enableDamping
          dampingFactor={0.05}
          makeDefault
          enableRotate={true}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
          }}
        />
      )}
      
      {/* Content */}
      <Suspense fallback={null}>
        {children}
      </Suspense>
    </Canvas>
  );
}
