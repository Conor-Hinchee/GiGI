"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

interface FirefliesSceneProps {
  isPlaying: boolean;
  isFullscreen?: boolean;
  isExpanded?: boolean;
  isMobile?: boolean;
}

const MAX_FIREFLIES_FULLSCREEN = 400;
const MAX_FIREFLIES_NORMAL = 200;
const MAX_FIREFLIES_MOBILE = 50; // Reduced for mobile performance

const FirefliesScene: React.FC<FirefliesSceneProps> = ({
  isPlaying,
  isFullscreen = false,
  isExpanded = false,
  isMobile = false,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const firefliesRef = useRef<THREE.Points | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const transitionRef = useRef({ targetOpacity: 0, currentOpacity: 0 });

  // Camera and renderer refs for resize handling
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Audio Analysis References
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioLevelsRef = useRef({ bass: 0, mid: 0, high: 0, overall: 0 });
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const currentFireflyCountRef = useRef(0);
  const lastSpawnTimeRef = useRef(performance.now());
  const SPAWN_INTERVAL = 800; // ms between each doubling (increased from 200)

  // Setup audio analysis
  const setupAudioAnalysis = useCallback(() => {
    if (!audioContextRef.current) {
      // Get the audio element from the page
      const audioElement = document.querySelector("audio") as HTMLAudioElement;
      if (!audioElement) {
        console.log("Audio element not found");
        return;
      }

      try {
        // Create audio context and analyser
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const audioContext = new AudioContextClass();
        audioContextRef.current = audioContext;

        const analyser = audioContext.createAnalyser();
        analyserRef.current = analyser;

        // Configure analyser for better frequency resolution
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.85;
        analyser.minDecibels = -90;
        analyser.maxDecibels = -10;

        // Create source from audio element (only if not already created)
        if (!sourceRef.current) {
          const source = audioContext.createMediaElementSource(audioElement);
          sourceRef.current = source;
          source.connect(analyser);
          analyser.connect(audioContext.destination);
        }

        // Create data array for frequency data
        const bufferLength = analyser.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);

        console.log("Audio analysis setup complete!");
      } catch (error) {
        console.log("Audio analysis setup failed:", error);
      }
    }
  }, []);

  // Analyze audio frequencies
  const analyzeAudio = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current) return;

    // Get frequency data
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);

    const bufferLength = dataArrayRef.current.length;

    // Enhanced frequency ranges for better music analysis
    const bassRange = Math.floor(bufferLength * 0.08); // 0-8% = bass (20-200Hz)
    const lowMidRange = Math.floor(bufferLength * 0.2); // 8-20% = low mids (200-800Hz)
    const midRange = Math.floor(bufferLength * 0.45); // 20-45% = mids (800-4kHz)
    const highRange = bufferLength; // 45-100% = highs (4kHz+)

    let bassSum = 0,
      lowMidSum = 0,
      midSum = 0,
      highSum = 0,
      totalSum = 0;

    // Sum up frequency data in ranges
    for (let i = 0; i < bassRange; i++) {
      bassSum += dataArrayRef.current[i];
    }
    for (let i = bassRange; i < lowMidRange; i++) {
      lowMidSum += dataArrayRef.current[i];
    }
    for (let i = lowMidRange; i < midRange; i++) {
      midSum += dataArrayRef.current[i];
    }
    for (let i = midRange; i < highRange; i++) {
      highSum += dataArrayRef.current[i];
    }
    for (let i = 0; i < bufferLength; i++) {
      totalSum += dataArrayRef.current[i];
    }

    // Normalize to 0-1 range with enhanced sensitivity
    const bassLevel = Math.min(1.0, (bassSum / (bassRange * 200)) * 1.5);
    const midLevel = Math.min(
      1.0,
      ((lowMidSum + midSum) / ((midRange - bassRange) * 200)) * 1.2
    );
    const highLevel = Math.min(
      1.0,
      (highSum / ((highRange - midRange) * 200)) * 1.3
    );
    const overallLevel = Math.min(1.0, (totalSum / (bufferLength * 200)) * 1.1);

    // Smooth the levels for better visual effect
    audioLevelsRef.current.bass =
      audioLevelsRef.current.bass * 0.7 + bassLevel * 0.3;
    audioLevelsRef.current.mid =
      audioLevelsRef.current.mid * 0.7 + midLevel * 0.3;
    audioLevelsRef.current.high =
      audioLevelsRef.current.high * 0.7 + highLevel * 0.3;
    audioLevelsRef.current.overall =
      audioLevelsRef.current.overall * 0.8 + overallLevel * 0.2;

    // Update shader uniforms with audio data
    if (materialRef.current) {
      materialRef.current.uniforms.uBass.value = audioLevelsRef.current.bass;
      materialRef.current.uniforms.uMid.value = audioLevelsRef.current.mid;
      materialRef.current.uniforms.uHigh.value = audioLevelsRef.current.high;
      materialRef.current.uniforms.uPulse.value =
        1.0 + audioLevelsRef.current.overall * 2.0;
    }
  }, []);

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
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // Fireflies geometry and material - enhanced for fullscreen, reduced for mobile
    const maxFireflies = isMobile
      ? MAX_FIREFLIES_MOBILE
      : isFullscreen
      ? MAX_FIREFLIES_FULLSCREEN
      : MAX_FIREFLIES_NORMAL;
    const spreadMultiplier = isFullscreen ? 2.0 : 1.0;
    const positions = new Float32Array(maxFireflies * 3);
    const colors = new Float32Array(maxFireflies * 3);
    const scales = new Float32Array(maxFireflies);

    // Create firefly positions and colors
    for (let i = 0; i < maxFireflies; i++) {
      const i3 = i * 3;

      // Random positions in a cube - larger spread for fullscreen
      positions[i3] = (Math.random() - 0.5) * 10 * spreadMultiplier;
      positions[i3 + 1] = (Math.random() - 0.5) * 6 * spreadMultiplier;
      positions[i3 + 2] = (Math.random() - 0.5) * 8 * spreadMultiplier;

      // Random colors (purple-dominant palette)
      const colorChoice = Math.random();
      if (colorChoice < 0.5) {
        // Deep purple fireflies
        colors[i3] = 0.7;
        colors[i3 + 1] = 0.3;
        colors[i3 + 2] = 1.0;
      } else if (colorChoice < 0.8) {
        // Violet/magenta fireflies
        colors[i3] = 0.9;
        colors[i3 + 1] = 0.4;
        colors[i3 + 2] = 1.0;
      } else {
        // Light purple/lavender fireflies
        colors[i3] = 0.8;
        colors[i3 + 1] = 0.6;
        colors[i3 + 2] = 1.0;
      }

      // Random scales
      scales[i] = Math.random() * 2 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geometry.setDrawRange(0, 0); // Start with 0 fireflies
    currentFireflyCountRef.current = 0;

    // Firefly material with custom shader - enhanced with audio reactivity
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: isFullscreen ? 40 : 30 },
        uIntensity: { value: isPlaying ? (isFullscreen ? 3.0 : 2.0) : 0.0 },
        uOpacity: { value: isPlaying ? 1.0 : 0.0 },
        uSpawnTime: { value: 0.0 },
        uPulse: { value: 1.0 },
        uFullscreen: { value: isFullscreen ? 1.0 : 0.0 },
        // Audio reactive uniforms
        uBass: { value: 0.0 },
        uMid: { value: 0.0 },
        uHigh: { value: 0.0 },
      },
      vertexShader: `
        attribute float aScale;
        uniform float uTime;
        uniform float uSize;
        uniform float uOpacity;
        uniform float uSpawnTime;
        uniform float uPulse;
        uniform float uBass;
        uniform float uMid;
        uniform float uHigh;
        varying vec3 vColor;
        varying float vOpacity;
        varying float vAudioPulse;
        
        void main() {
          vColor = color;
          
          vec3 pos = position;
          
          // Audio-reactive movement - different frequencies affect different axes
          float bassMovement = sin(uTime * 2.0 + position.x * 0.5) * 0.3 * uBass;
          float midMovement = cos(uTime * 3.0 + position.y * 0.4) * 0.2 * uMid;
          float highMovement = sin(uTime * 4.0 + position.z * 0.6) * 0.15 * uHigh;
          
          // Floating animation with musical pulse
          pos.y += sin(uTime + position.x * 0.5) * 0.2 * uPulse + bassMovement;
          pos.x += cos(uTime + position.y * 0.3) * 0.1 * uPulse + midMovement;
          pos.z += sin(uTime + position.z * 0.4) * 0.15 * uPulse + highMovement;
          
          // Audio pulse for fragment shader
          vAudioPulse = (uBass + uMid + uHigh) / 3.0;
          
          // Spawn animation - fireflies appear with staggered timing
          float spawnDelay = (position.x + position.y + position.z) * 0.1 + 1.0;
          float spawnProgress = clamp((uSpawnTime - spawnDelay) / 1.0, 0.0, 1.0);
          
          // Smooth spawn animation with elastic easing
          float elasticSpawn = 1.0 - exp(-5.0 * spawnProgress) * cos(10.0 * spawnProgress);
          vOpacity = uOpacity * elasticSpawn;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size varies with pulse and audio for musical effect
          float audioBoost = 1.0 + vAudioPulse * 0.5;
          float pulseSize = uSize * (0.8 + 0.4 * uPulse) * audioBoost;
          gl_PointSize = pulseSize * aScale * (1.0 / -mvPosition.z) * elasticSpawn;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        varying float vAudioPulse;
        uniform float uIntensity;
        uniform float uBass;
        uniform float uMid;
        uniform float uHigh;
        
        void main() {
          // Create circular firefly glow
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          strength = pow(strength, 3.0);
          
          // Audio-reactive color mixing based on frequency ranges (purple theme)
          vec3 bassColor = vec3(0.8, 0.2, 1.0);    // Deep purple for bass
          vec3 midColor = vec3(0.9, 0.4, 1.0);     // Bright purple/magenta for mids
          vec3 highColor = vec3(0.6, 0.3, 1.0);    // Dark purple/violet for highs
          
          // Mix colors based on frequency intensity
          vec3 audioColor = bassColor * uBass + midColor * uMid + highColor * uHigh;
          audioColor = normalize(audioColor + 0.1); // Prevent black colors
          
          // Blend original color with audio-reactive color
          vec3 finalColor = mix(vColor, audioColor, vAudioPulse * 0.7);
          finalColor *= strength * uIntensity;
          
          // Enhanced glow with audio pulse
          float audioPulse = 1.0 + vAudioPulse * 0.5;
          finalColor += vColor * strength * 0.5 * audioPulse; // Inner glow
          
          gl_FragColor = vec4(finalColor, strength * vOpacity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });

    const fireflies = new THREE.Points(geometry, material);
    firefliesRef.current = fireflies;
    materialRef.current = material; // Store material reference for audio updates
    scene.add(fireflies);

    // Setup audio analysis when music starts playing
    if (isPlaying) {
      setupAudioAnalysis();
    }

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      // Exponential firefly spawn: 1, 2, 4, 8, ... but with a delay between doublings
      if (isPlaying && currentFireflyCountRef.current < maxFireflies) {
        const now = performance.now();
        if (
          currentFireflyCountRef.current === 0 ||
          now - lastSpawnTimeRef.current > SPAWN_INTERVAL
        ) {
          if (currentFireflyCountRef.current === 0) {
            currentFireflyCountRef.current = 1;
          } else {
            currentFireflyCountRef.current = Math.min(
              maxFireflies,
              currentFireflyCountRef.current * 2
            );
          }
          geometry.setDrawRange(0, currentFireflyCountRef.current);
          geometry.attributes.position.needsUpdate = true;
          geometry.attributes.color.needsUpdate = true;
          geometry.attributes.aScale.needsUpdate = true;
          lastSpawnTimeRef.current = now;
        }
      }

      if (material.uniforms) {
        material.uniforms.uTime.value += 0.01;

        // Analyze audio if playing
        if (isPlaying && analyserRef.current) {
          analyzeAudio();
        }

        // Musical pulse effect - creates rhythmic breathing effect
        const pulseSpeed = 0.8;
        const pulseIntensity = 0.3;
        const basePulse =
          1.0 +
          Math.sin(material.uniforms.uTime.value * pulseSpeed) * pulseIntensity;
        material.uniforms.uPulse.value = basePulse;

        // Smooth transition for opacity
        const transition = transitionRef.current;
        transition.targetOpacity = isPlaying ? 1.0 : 0.0;
        transition.currentOpacity +=
          (transition.targetOpacity - transition.currentOpacity) * 0.05;

        material.uniforms.uOpacity.value = transition.currentOpacity;
        const intensityMultiplier = isFullscreen ? 3.5 : 2.5;
        material.uniforms.uIntensity.value =
          transition.currentOpacity * intensityMultiplier * basePulse;

        // Update fullscreen uniform
        material.uniforms.uFullscreen.value = isFullscreen ? 1.0 : 0.0;

        // Update spawn time when playing
        if (isPlaying && transition.currentOpacity > 0.1) {
          material.uniforms.uSpawnTime.value += 0.03;
        } else if (!isPlaying) {
          material.uniforms.uSpawnTime.value = Math.max(
            0,
            material.uniforms.uSpawnTime.value - 0.05
          );
        }
      }

      // Rotate the entire firefly cloud slowly only when playing
      if (
        fireflies &&
        isPlaying &&
        transitionRef.current.currentOpacity > 0.1
      ) {
        const rotationSpeed =
          transitionRef.current.currentOpacity *
          (material.uniforms?.uPulse?.value || 1.0);
        fireflies.rotation.y += 0.002 * rotationSpeed;
        fireflies.rotation.x += 0.001 * rotationSpeed;
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
  }, [
    isPlaying,
    isFullscreen,
    isExpanded,
    isMobile,
    setupAudioAnalysis,
    analyzeAudio,
  ]); // Include isExpanded and isMobile

  // Handle container size changes when expanding/contracting
  useEffect(() => {
    const handleContainerResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current)
        return;

      const mount = mountRef.current;
      const renderer = rendererRef.current;
      const camera = cameraRef.current;

      // Update camera and renderer for new container size
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    // Use ResizeObserver for immediate response to container size changes
    let resizeObserver: ResizeObserver | null = null;
    if (mountRef.current && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(() => {
        // Trigger resize when container dimensions change
        handleContainerResize();
      });
      resizeObserver.observe(mountRef.current);
    }

    // Trigger resize after a delay to allow CSS transition to complete (1000ms)
    const timeoutId = setTimeout(handleContainerResize, 100);
    // Also trigger multiple times during the transition for smoother adaptation
    const intervalId = setInterval(handleContainerResize, 200);
    const clearIntervalTimeout = setTimeout(
      () => clearInterval(intervalId),
      1200
    );

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      clearTimeout(clearIntervalTimeout);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [isExpanded, isPlaying]); // Trigger when expansion state or playing state changes

  // Update uniforms when playing state changes
  useEffect(() => {
    if (firefliesRef.current && firefliesRef.current.material) {
      const material = firefliesRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        // Set initial target - smooth transition will be handled in animate loop
        transitionRef.current.targetOpacity = isPlaying ? 1.0 : 0.0;

        if (!isPlaying) {
          // Reset spawn animation when stopping
          material.uniforms.uSpawnTime.value = 0.0;
        }
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
