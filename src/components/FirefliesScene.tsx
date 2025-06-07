"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface FirefliesSceneProps {
  isPlaying: boolean;
}

const FirefliesScene: React.FC<FirefliesSceneProps> = ({ isPlaying }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const firefliesRef = useRef<THREE.Points | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current; // Copy to variable to avoid stale closure

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // Fireflies geometry and material
    const firefliesCount = 100;
    const positions = new Float32Array(firefliesCount * 3);
    const colors = new Float32Array(firefliesCount * 3);
    const scales = new Float32Array(firefliesCount);

    // Create firefly positions and colors
    for (let i = 0; i < firefliesCount; i++) {
      const i3 = i * 3;

      // Random positions in a cube
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 6;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;

      // Random colors (yellow/orange tones)
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        // Purple fireflies
        colors[i3] = 0.8;
        colors[i3 + 1] = 0.4;
        colors[i3 + 2] = 1.0;
      } else if (colorChoice < 0.6) {
        // Pink fireflies
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.4;
        colors[i3 + 2] = 0.8;
      } else {
        // Yellow/warm fireflies
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.9;
        colors[i3 + 2] = 0.3;
      }

      // Random scales
      scales[i] = Math.random() * 2 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    // Firefly material with custom shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 30 },
        uIntensity: { value: isPlaying ? 2.0 : 1.0 },
      },
      vertexShader: `
        attribute float aScale;
        uniform float uTime;
        uniform float uSize;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          
          vec3 pos = position;
          
          // Floating animation
          pos.y += sin(uTime + position.x * 0.5) * 0.2;
          pos.x += cos(uTime + position.y * 0.3) * 0.1;
          pos.z += sin(uTime + position.z * 0.4) * 0.15;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = uSize * aScale * (1.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float uIntensity;
        
        void main() {
          // Create circular firefly glow
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          strength = pow(strength, 3.0);
          
          // Glow effect
          vec3 finalColor = vColor * strength * uIntensity;
          finalColor += vColor * strength * 0.5; // Inner glow
          
          gl_FragColor = vec4(finalColor, strength * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const fireflies = new THREE.Points(geometry, material);
    firefliesRef.current = fireflies;
    scene.add(fireflies);

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);

      if (material.uniforms) {
        material.uniforms.uTime.value += 0.01;
        material.uniforms.uIntensity.value = isPlaying ? 2.5 : 1.0;
      }

      // Rotate the entire firefly cloud slowly
      if (fireflies) {
        fireflies.rotation.y += 0.002;
        fireflies.rotation.x += 0.001;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mount) return;

      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [isPlaying]); // Include isPlaying in dependencies

  // Update intensity when playing state changes
  useEffect(() => {
    if (firefliesRef.current && firefliesRef.current.material) {
      const material = firefliesRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.uIntensity.value = isPlaying ? 2.5 : 1.0;
      }
    }
  }, [isPlaying]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};

export default FirefliesScene;
