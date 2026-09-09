/**
 * Custom GLSL Shaders for Atmospheric Effects
 * Implements bloom, chromatic aberration, and depth-based fog
 */

export const atmosphereVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const atmosphereFragmentShader = `
  uniform float time;
  uniform vec3 color;
  uniform float intensity;
  uniform float pulseSpeed;
  uniform float glowStrength;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  // Noise function for organic movement
  float noise(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 45.543))) * 43758.5453);
  }
  
  void main() {
    // Distance from center for radial effects
    float distanceFromCenter = length(vUv - 0.5);
    
    // Pulsing glow effect
    float pulse = sin(time * pulseSpeed) * 0.5 + 0.5;
    float glow = (1.0 - distanceFromCenter) * glowStrength * pulse;
    
    // Edge fresnel effect
    vec3 viewDirection = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);
    
    // Noise for organic feel
    float noiseValue = noise(vPosition * 2.0 + time * 0.1);
    
    // Combine effects
    vec3 finalColor = color;
    finalColor += color * glow;
    finalColor += color * fresnel * 0.5;
    finalColor *= (0.8 + noiseValue * 0.4);
    
    float alpha = (glow + fresnel * 0.3) * intensity;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export const chromaticAberrationShader = `
  uniform sampler2D tDiffuse;
  uniform float amount;
  uniform float angle;
  
  varying vec2 vUv;
  
  void main() {
    vec2 offset = amount * vec2(cos(angle), sin(angle));
    
    float r = texture2D(tDiffuse, vUv + offset).r;
    float g = texture2D(tDiffuse, vUv).g;
    float b = texture2D(tDiffuse, vUv - offset).b;
    
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

export const depthFogShader = `
  uniform sampler2D tDiffuse;
  uniform sampler2D tDepth;
  uniform vec3 fogColor;
  uniform float fogNear;
  uniform float fogFar;
  uniform float fogStrength;
  
  varying vec2 vUv;
  
  void main() {
    vec4 color = texture2D(tDiffuse, vUv);
    float depth = texture2D(tDepth, vUv).r;
    
    // Calculate fog factor based on depth
    float fogFactor = smoothstep(fogNear, fogFar, depth);
    fogFactor = clamp(fogFactor * fogStrength, 0.0, 1.0);
    
    // Mix original color with fog color
    vec3 finalColor = mix(color.rgb, fogColor, fogFactor);
    
    gl_FragColor = vec4(finalColor, color.a);
  }
`;

export const bloomShader = `
  uniform sampler2D tDiffuse;
  uniform float intensity;
  uniform vec2 resolution;
  
  varying vec2 vUv;
  
  // Gaussian blur function
  vec4 blur(sampler2D tex, vec2 uv, vec2 direction) {
    vec4 color = vec4(0.0);
    vec2 offset = 1.0 / resolution;
    
    // 9-tap Gaussian blur
    color += texture2D(tex, uv - offset * direction * 4.0) * 0.0162162162;
    color += texture2D(tex, uv - offset * direction * 3.0) * 0.0540540541;
    color += texture2D(tex, uv - offset * direction * 2.0) * 0.1216216216;
    color += texture2D(tex, uv - offset * direction) * 0.1945945946;
    color += texture2D(tex, uv) * 0.2270270270;
    color += texture2D(tex, uv + offset * direction) * 0.1945945946;
    color += texture2D(tex, uv + offset * direction * 2.0) * 0.1216216216;
    color += texture2D(tex, uv + offset * direction * 3.0) * 0.0540540541;
    color += texture2D(tex, uv + offset * direction * 4.0) * 0.0162162162;
    
    return color;
  }
  
  void main() {
    vec4 original = texture2D(tDiffuse, vUv);
    
    // Horizontal and vertical blur
    vec4 blurH = blur(tDiffuse, vUv, vec2(1.0, 0.0));
    vec4 blurV = blur(tDiffuse, vUv, vec2(0.0, 1.0));
    vec4 bloom = (blurH + blurV) * 0.5;
    
    // Threshold for bright areas only
    float brightness = dot(bloom.rgb, vec3(0.2126, 0.7152, 0.0722));
    bloom *= smoothstep(0.5, 1.0, brightness);
    
    // Additive blend with original
    vec3 finalColor = original.rgb + bloom.rgb * intensity;
    
    gl_FragColor = vec4(finalColor, original.a);
  }
`;

export const particleShader = {
  vertex: `
    uniform float time;
    uniform float size;
    attribute float scale;
    attribute vec3 velocity;
    
    varying vec3 vColor;
    
    void main() {
      vColor = color;
      
      // Animated position
      vec3 pos = position + velocity * time;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      
      // Size attenuation based on distance
      gl_PointSize = size * scale * (300.0 / -mvPosition.z);
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  
  fragment: `
    uniform float opacity;
    uniform float time;
    
    varying vec3 vColor;
    
    void main() {
      // Circular particle shape
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      
      if (dist > 0.5) discard;
      
      // Soft edges
      float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
      
      // Pulsing effect
      float pulse = sin(time * 2.0) * 0.2 + 0.8;
      
      gl_FragColor = vec4(vColor, alpha * opacity * pulse);
    }
  `
};

export const rippleShader = {
  vertex: `
    uniform float time;
    uniform float waveStrength;
    
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      vUv = uv;
      
      // Create ripple waves
      vec3 pos = position;
      float distance = length(pos.xy);
      float wave = sin(distance * 10.0 - time * 3.0) * waveStrength;
      
      pos.z += wave;
      vElevation = wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  
  fragment: `
    uniform vec3 color;
    uniform float opacity;
    
    varying vec2 vUv;
    varying float vElevation;
    
    void main() {
      // Color intensity based on wave elevation
      float intensity = abs(vElevation) * 2.0 + 0.5;
      vec3 finalColor = color * intensity;
      
      // Fade at edges
      float alpha = 1.0 - length(vUv - 0.5) * 2.0;
      alpha = clamp(alpha, 0.0, 1.0);
      
      gl_FragColor = vec4(finalColor, alpha * opacity);
    }
  `
};
