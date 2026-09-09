import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface HeatmapPoint {
  position: [number, number, number];
  intensity: number;
  mood: string;
}

interface EmotionalHeatmapProps {
  points: HeatmapPoint[];
  radius?: number;
  resolution?: number;
}

export function EmotionalHeatmap({
  points,
  radius = 10,
  resolution = 128,
}: EmotionalHeatmapProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create heatmap texture
  const heatmapTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = resolution;
    canvas.height = resolution;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;
    
    // Clear canvas
    ctx.clearRect(0, 0, resolution, resolution);
    
    // Draw heat points with radial gradients
    points.forEach((point) => {
      const x = ((point.position[0] + radius) / (radius * 2)) * resolution;
      const y = ((point.position[2] + radius) / (radius * 2)) * resolution;
      const intensity = point.intensity;
      
      // Mood-based color
      const moodColors: Record<string, string> = {
        calm: '#6366F1',
        curious: '#8B5CF6',
        creative: '#EC4899',
        nostalgic: '#F59E0B',
        motivated: '#EF4444',
        reflective: '#3B82F6',
      };
      
      const color = moodColors[point.mood] || '#8B5CF6';
      
      // Create radial gradient
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 50 * intensity);
      gradient.addColorStop(0, `${color}FF`);
      gradient.addColorStop(0.5, `${color}80`);
      gradient.addColorStop(1, `${color}00`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, resolution, resolution);
    });
    
    // Apply blur effect
    ctx.filter = 'blur(8px)';
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture;
  }, [points, radius, resolution]);
  
  // Animate the heatmap
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      if (material.opacity < 0.7) {
        material.opacity += 0.01;
      }
      
      // Gentle wave motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });
  
  if (!heatmapTexture) return null;
  
  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[radius * 2, radius * 2, 32, 32]} />
      <meshBasicMaterial
        map={heatmapTexture}
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/**
 * 3D Intensity Visualization using height-mapped planes
 */
interface IntensityVisualizerProps {
  currentId: string;
  activityLevel: 'quiet' | 'moderate' | 'active' | 'lively';
  messageCount: number;
  color: string;
}

export function IntensityVisualizer({
  activityLevel,
  messageCount,
  color,
}: IntensityVisualizerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const intensityValue = useMemo(() => {
    const levels = { quiet: 0.3, moderate: 0.6, active: 0.8, lively: 1.0 };
    return levels[activityLevel];
  }, [activityLevel]);
  
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(8, 8, 64, 64);
    const positions = geo.attributes.position;
    
    // Create wave pattern based on intensity
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const distance = Math.sqrt(x * x + y * y);
      
      // Height based on distance from center and intensity
      const height = Math.sin(distance * 0.5) * intensityValue * 2;
      positions.setZ(i, height);
    }
    
    geo.computeVertexNormals();
    return geo;
  }, [intensityValue, messageCount]);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Rotate slowly
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
      
      // Pulse scale
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1 * intensityValue;
      meshRef.current.scale.set(scale, scale, 1);
    }
  });
  
  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3, 0]}
    >
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.3}
        wireframe
        emissive={color}
        emissiveIntensity={intensityValue}
      />
    </mesh>
  );
}
