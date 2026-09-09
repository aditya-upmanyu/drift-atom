import { Line } from '@react-three/drei';

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  animated?: boolean;
}

export function ConnectionLine({
  start,
  end,
  color = '#8B5CF6',
}: ConnectionLineProps) {
  return (
    <Line
      points={[start, end]}
      color={color}
      lineWidth={1}
      transparent
      opacity={0.4}
    />
  );
}
