import { useEffect, useRef, useState } from 'react';
import type * as THREE from 'three';

interface GestureState {
  isPinching: boolean;
  isRotating: boolean;
  isPanning: boolean;
  scale: number;
  rotation: number;
  position: { x: number; y: number };
}

interface Touch {
  identifier: number;
  clientX: number;
  clientY: number;
}

export function useGestureControls(
  targetRef: React.RefObject<HTMLElement>,
  cameraRef?: React.RefObject<THREE.Camera>
) {
  const [gesture, setGesture] = useState<GestureState>({
    isPinching: false,
    isRotating: false,
    isPanning: false,
    scale: 1,
    rotation: 0,
    position: { x: 0, y: 0 },
  });
  
  const touchesRef = useRef<Touch[]>([]);
  const initialDistanceRef = useRef<number>(0);
  const initialAngleRef = useRef<number>(0);
  const initialPositionRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;
    
    // Calculate distance between two touches
    const getDistance = (touch1: Touch, touch2: Touch): number => {
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };
    
    // Calculate angle between two touches
    const getAngle = (touch1: Touch, touch2: Touch): number => {
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
      return Math.atan2(dy, dx);
    };
    
    // Get center point between touches (reserved for future use)
    // const getCenter = (touches: Touch[]): { x: number; y: number } => {
    //   if (touches.length === 0) return { x: 0, y: 0 };
    //   
    //   const sum = touches.reduce(
    //     (acc, touch) => ({
    //       x: acc.x + touch.clientX,
    //       y: acc.y + touch.clientY,
    //     }),
    //     { x: 0, y: 0 }
    //   );
    //   
    //   return {
    //     x: sum.x / touches.length,
    //     y: sum.y / touches.length,
    //   };
    // };
    
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      
      touchesRef.current = Array.from(e.touches).map(t => ({
        identifier: t.identifier,
        clientX: t.clientX,
        clientY: t.clientY,
      }));
      
      if (touchesRef.current.length === 2) {
        // Two-finger gestures
        initialDistanceRef.current = getDistance(
          touchesRef.current[0],
          touchesRef.current[1]
        );
        initialAngleRef.current = getAngle(
          touchesRef.current[0],
          touchesRef.current[1]
        );
        
        setGesture(prev => ({
          ...prev,
          isPinching: true,
          isRotating: true,
        }));
      } else if (touchesRef.current.length === 1) {
        // Single finger pan
        initialPositionRef.current = {
          x: touchesRef.current[0].clientX,
          y: touchesRef.current[0].clientY,
        };
        
        setGesture(prev => ({
          ...prev,
          isPanning: true,
        }));
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      
      const currentTouches = Array.from(e.touches).map(t => ({
        identifier: t.identifier,
        clientX: t.clientX,
        clientY: t.clientY,
      }));
      
      if (currentTouches.length === 2 && touchesRef.current.length === 2) {
        // Pinch to zoom
        const currentDistance = getDistance(currentTouches[0], currentTouches[1]);
        const scaleDelta = currentDistance / initialDistanceRef.current;
        
        // Rotation
        const currentAngle = getAngle(currentTouches[0], currentTouches[1]);
        const angleDelta = currentAngle - initialAngleRef.current;
        
        setGesture(prev => ({
          ...prev,
          scale: prev.scale * scaleDelta,
          rotation: prev.rotation + angleDelta,
        }));
        
        // Update camera if available
        if (cameraRef?.current) {
          cameraRef.current.position.z = Math.max(5, Math.min(30, 15 / scaleDelta));
        }
        
        initialDistanceRef.current = currentDistance;
        initialAngleRef.current = currentAngle;
      } else if (currentTouches.length === 1 && touchesRef.current.length === 1) {
        // Pan gesture
        const dx = currentTouches[0].clientX - initialPositionRef.current.x;
        const dy = currentTouches[0].clientY - initialPositionRef.current.y;
        
        setGesture(prev => ({
          ...prev,
          position: {
            x: prev.position.x + dx * 0.01,
            y: prev.position.y - dy * 0.01,
          },
        }));
        
        initialPositionRef.current = {
          x: currentTouches[0].clientX,
          y: currentTouches[0].clientY,
        };
      }
      
      touchesRef.current = currentTouches;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchesRef.current = Array.from(e.touches).map(t => ({
        identifier: t.identifier,
        clientX: t.clientX,
        clientY: t.clientY,
      }));
      
      if (touchesRef.current.length < 2) {
        setGesture(prev => ({
          ...prev,
          isPinching: false,
          isRotating: false,
        }));
      }
      
      if (touchesRef.current.length === 0) {
        setGesture(prev => ({
          ...prev,
          isPanning: false,
        }));
      }
    };
    
    // Mouse wheel for desktop zoom
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const zoomDelta = e.deltaY * -0.001;
      
      setGesture(prev => ({
        ...prev,
        scale: Math.max(0.5, Math.min(3, prev.scale + zoomDelta)),
      }));
      
      if (cameraRef?.current) {
        const newZ = Math.max(5, Math.min(30, cameraRef.current.position.z - zoomDelta * 2));
        cameraRef.current.position.z = newZ;
      }
    };
    
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('wheel', handleWheel);
    };
  }, [targetRef, cameraRef]);
  
  return gesture;
}

/**
 * Swipe detection hook
 */
interface SwipeConfig {
  minSwipeDistance?: number;
  maxSwipeTime?: number;
}

export function useSwipeGesture(
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  onSwipeUp?: () => void,
  onSwipeDown?: () => void,
  config: SwipeConfig = {}
) {
  const { minSwipeDistance = 50, maxSwipeTime = 500 } = config;
  
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const dt = Date.now() - touchStartRef.current.time;
      
      // Check if it's a valid swipe
      if (dt > maxSwipeTime) return;
      
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      
      if (absDx > minSwipeDistance || absDy > minSwipeDistance) {
        if (absDx > absDy) {
          // Horizontal swipe
          if (dx > 0) {
            onSwipeRight?.();
          } else {
            onSwipeLeft?.();
          }
        } else {
          // Vertical swipe
          if (dy > 0) {
            onSwipeDown?.();
          } else {
            onSwipeUp?.();
          }
        }
      }
      
      touchStartRef.current = null;
    };
    
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, minSwipeDistance, maxSwipeTime]);
}
