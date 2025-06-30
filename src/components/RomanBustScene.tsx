"use client";

import {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as THREE from "three";
import { EffectComposer } from "three-stdlib";
import { RenderPass } from "three-stdlib";
import { UnrealBloomPass } from "three-stdlib";

interface RomanBustSceneProps {
  isPlaying: boolean;
  isFullscreen?: boolean;
  isExpanded?: boolean;
  isMobile?: boolean;
}

export interface RomanBustSceneRef {
  spawnFirefliesAtTouch: (x: number, y: number, burst?: boolean) => void; // Maintain compatibility
}

const RomanBustScene = forwardRef<RomanBustSceneRef, RomanBustSceneProps>(
  (
    { isPlaying, isFullscreen = false, isExpanded = false, isMobile = false },
    ref
  ) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const bustRef = useRef<THREE.Group | null>(null);
    const glowPanelRef = useRef<THREE.Mesh | null>(null);
    const starsRef = useRef<THREE.Points | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const composerRef = useRef<EffectComposer | null>(null);

    // Camera and renderer refs for resize handling
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

    // Audio Analysis References
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const audioLevelsRef = useRef({ bass: 0, mid: 0, high: 0, overall: 0 });

    // Animation refs
    const startTimeRef = useRef(performance.now());

    // Expose compatibility function via ref
    useImperativeHandle(
      ref,
      () => ({
        spawnFirefliesAtTouch: () => {}, // No-op for compatibility
      }),
      []
    );

    // Setup audio analysis (similar to FirefliesScene)
    const setupAudioAnalysis = useCallback(() => {
      if (!audioContextRef.current) {
        const audioElement = document.querySelector(
          "audio"
        ) as HTMLAudioElement;
        if (!audioElement) {
          console.log("Audio element not found");
          return;
        }

        try {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext;
          const audioContext = new AudioContextClass();
          audioContextRef.current = audioContext;

          const analyser = audioContext.createAnalyser();
          analyserRef.current = analyser;

          analyser.fftSize = 1024;
          analyser.smoothingTimeConstant = 0.85;
          analyser.minDecibels = -90;
          analyser.maxDecibels = -10;

          if (!sourceRef.current) {
            const source = audioContext.createMediaElementSource(audioElement);
            sourceRef.current = source;
            source.connect(analyser);
            analyser.connect(audioContext.destination);
          }

          const bufferLength = analyser.frequencyBinCount;
          dataArrayRef.current = new Uint8Array(bufferLength);

          console.log("Roman Bust audio analysis setup complete!");
        } catch (error) {
          console.log("Audio analysis setup failed:", error);
        }
      }
    }, []);

    // Analyze audio frequencies
    const analyzeAudio = useCallback(() => {
      if (!analyserRef.current || !dataArrayRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const bufferLength = dataArrayRef.current.length;

      const bassRange = Math.floor(bufferLength * 0.08);
      const lowMidRange = Math.floor(bufferLength * 0.2);
      const midRange = Math.floor(bufferLength * 0.45);
      const highRange = bufferLength;

      let bassSum = 0, lowMidSum = 0, midSum = 0, highSum = 0, totalSum = 0;

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

      const bassLevel = Math.min(1.0, (bassSum / (bassRange * 200)) * 1.5);
      const midLevel = Math.min(1.0, ((lowMidSum + midSum) / ((midRange - bassRange) * 200)) * 1.2);
      const highLevel = Math.min(1.0, (highSum / ((highRange - midRange) * 200)) * 1.3);
      const overallLevel = Math.min(1.0, (totalSum / (bufferLength * 200)) * 1.1);

      // Smooth the levels
      audioLevelsRef.current.bass = audioLevelsRef.current.bass * 0.7 + bassLevel * 0.3;
      audioLevelsRef.current.mid = audioLevelsRef.current.mid * 0.7 + midLevel * 0.3;
      audioLevelsRef.current.high = audioLevelsRef.current.high * 0.7 + highLevel * 0.3;
      audioLevelsRef.current.overall = audioLevelsRef.current.overall * 0.8 + overallLevel * 0.2;
    }, []);

    // Create starfield background
    const createStarfield = useCallback((scene: THREE.Scene) => {
      const starGeometry = new THREE.BufferGeometry();
      const starVertices = [];

      for (let i = 0; i < 1000; i++) {
        starVertices.push(
          THREE.MathUtils.randFloatSpread(1000),
          THREE.MathUtils.randFloatSpread(1000),
          THREE.MathUtils.randFloatSpread(1000)
        );
      }

      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
      const starMaterial = new THREE.PointsMaterial({ 
        color: 0xffffff, 
        size: 0.7,
        sizeAttenuation: false
      });
      const stars = new THREE.Points(starGeometry, starMaterial);
      starsRef.current = stars;
      scene.add(stars);
    }, []);

    // Create Roman bust geometry (procedural since we don't have a model)
    const createBustGeometry = useCallback(() => {
      const group = new THREE.Group();
      
      // Head (ellipsoid)
      const headGeometry = new THREE.SphereGeometry(1.2, 32, 32);
      headGeometry.scale(1, 1.3, 0.8); // Make it more head-like
      
      // Neck
      const neckGeometry = new THREE.CylinderGeometry(0.6, 0.8, 0.8, 16);
      
      // Shoulders/Chest base
      const chestGeometry = new THREE.SphereGeometry(1.8, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.7);
      chestGeometry.scale(1.2, 0.8, 1);
      
      // Chrome/marble material
      const bustMaterial = new THREE.MeshPhysicalMaterial({
        metalness: 0.9,
        roughness: 0.2,
        clearcoat: 0.6,
        reflectivity: 1.0,
        color: new THREE.Color('#aaaaff'),
      });

      // Create meshes
      const head = new THREE.Mesh(headGeometry, bustMaterial);
      const neck = new THREE.Mesh(neckGeometry, bustMaterial);
      const chest = new THREE.Mesh(chestGeometry, bustMaterial);

      // Position parts
      head.position.y = 2;
      neck.position.y = 0.8;
      chest.position.y = -0.5;

      group.add(head);
      group.add(neck);
      group.add(chest);

      // Scale for fullscreen vs normal
      const scale = isFullscreen ? 10 : isExpanded ? 8 : 6;
      group.scale.set(scale, scale, scale);

      return group;
    }, [isFullscreen, isExpanded]);

    // Create glowing Chinese dance symbol
    const createGlowPanel = useCallback((scene: THREE.Scene) => {
      // Create canvas for Chinese character
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Clear canvas
        context.fillStyle = 'transparent';
        context.fillRect(0, 0, 256, 256);
        
        // Draw Chinese character 舞 (dance)
        context.fillStyle = '#ff00cc';
        context.font = 'bold 180px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText('舞', 128, 128);
      }

      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      
      const glowGeometry = new THREE.PlaneGeometry(1, 1.4);
      const glowMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        color: 0xff00cc,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
      });

      const glowPanel = new THREE.Mesh(glowGeometry, glowMaterial);
      const scale = isFullscreen ? 3 : isExpanded ? 2.5 : 2;
      glowPanel.scale.set(scale, scale, scale);
      glowPanel.position.set(0, 0, 1); // Position in front of bust chest
      
      glowPanelRef.current = glowPanel;
      scene.add(glowPanel);
    }, [isFullscreen, isExpanded]);

    // Setup lighting
    const setupLighting = useCallback((scene: THREE.Scene) => {
      // Ambient light
      const ambient = new THREE.AmbientLight(0x404040, 2);
      scene.add(ambient);

      // Spot light
      const spotLight = new THREE.SpotLight(0xccccff, 4, 100, Math.PI / 6, 0.5, 2);
      spotLight.position.set(10, 20, 10);
      scene.add(spotLight);

      // Rim light
      const rimLight = new THREE.DirectionalLight(0xff00ff, 2);
      rimLight.position.set(-10, 5, 5);
      scene.add(rimLight);
    }, []);

    // Animation loop
    const animate = useCallback(() => {
      if (!sceneRef.current || !rendererRef.current || !cameraRef.current) return;

      const currentTime = performance.now();
      const elapsed = (currentTime - startTimeRef.current) * 0.001; // Convert to seconds

      // Analyze audio if playing
      if (isPlaying) {
        analyzeAudio();
      }

      // Animate bust
      if (bustRef.current && isPlaying) {
        // Continuous Y-axis rotation
        bustRef.current.rotation.y += 0.001;
        
        // Vertical floating motion
        bustRef.current.position.y = Math.sin(elapsed) * 0.5;
        
        // Audio-reactive scaling
        const audioScale = 1.0 + audioLevelsRef.current.overall * 0.1;
        const baseScale = isFullscreen ? 10 : isExpanded ? 8 : 6;
        bustRef.current.scale.setScalar(baseScale * audioScale);
      }

      // Animate glow panel
      if (glowPanelRef.current && isPlaying) {
        // Audio-reactive intensity
        const material = glowPanelRef.current.material as THREE.MeshBasicMaterial;
        const intensity = 0.8 + audioLevelsRef.current.overall * 0.4;
        material.opacity = Math.min(1.0, intensity);
        
        // Subtle pulse animation
        const pulseScale = 1.0 + Math.sin(elapsed * 2) * 0.1 + audioLevelsRef.current.bass * 0.2;
        const baseScale = isFullscreen ? 3 : isExpanded ? 2.5 : 2;
        glowPanelRef.current.scale.setScalar(baseScale * pulseScale);
      }

      // Animate stars
      if (starsRef.current) {
        starsRef.current.rotation.y += 0.0002;
        starsRef.current.rotation.x += 0.0001;
      }

      // Render
      if (composerRef.current) {
        composerRef.current.render();
      } else {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      animationIdRef.current = requestAnimationFrame(animate);
    }, [isPlaying, isFullscreen, isExpanded, analyzeAudio]);

    // Main effect for scene setup
    useEffect(() => {
      if (!mountRef.current) return;

      const mount = mountRef.current;

      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000014); // Dark starry night
      sceneRef.current = scene;

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        75,
        mount.clientWidth / mount.clientHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 15);
      cameraRef.current = camera;

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setClearColor(0x000014, 1);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      rendererRef.current = renderer;
      mount.appendChild(renderer.domElement);

      // Post-processing setup
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(mount.clientWidth, mount.clientHeight),
        1.5, // strength
        0.4, // radius  
        0.85 // threshold
      );
      composer.addPass(bloomPass);
      composerRef.current = composer;

      // Create scene elements
      createStarfield(scene);
      const bust = createBustGeometry();
      bustRef.current = bust;
      scene.add(bust);
      
      createGlowPanel(scene);
      setupLighting(scene);

      // Setup audio analysis
      if (isPlaying) {
        setupAudioAnalysis();
      }

      // Start animation
      startTimeRef.current = performance.now();
      animate();

      // Cleanup function
      return () => {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current);
        }
        if (mount && renderer.domElement) {
          mount.removeChild(renderer.domElement);
        }
        renderer.dispose();
        if (composerRef.current) {
          composerRef.current.dispose();
        }
      };
    }, [
      isFullscreen,
      isExpanded,
      isPlaying,
      isMobile,
      createStarfield,
      createBustGeometry,
      createGlowPanel,
      setupLighting,
      setupAudioAnalysis,
      animate,
    ]);

    // Handle audio analysis setup when playing starts
    useEffect(() => {
      if (isPlaying) {
        setupAudioAnalysis();
      }
    }, [isPlaying, setupAudioAnalysis]);

    // Handle resize
    useEffect(() => {
      const handleContainerResize = () => {
        if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;

        const mount = mountRef.current;
        const renderer = rendererRef.current;
        const camera = cameraRef.current;

        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        
        if (composerRef.current) {
          composerRef.current.setSize(mount.clientWidth, mount.clientHeight);
        }
      };

      let resizeObserver: ResizeObserver | null = null;
      if (mountRef.current && "ResizeObserver" in window) {
        resizeObserver = new ResizeObserver(handleContainerResize);
        resizeObserver.observe(mountRef.current);
      }

      const timeoutId = setTimeout(handleContainerResize, 100);
      const intervalId = setInterval(handleContainerResize, 200);
      const clearIntervalTimeout = setTimeout(() => clearInterval(intervalId), 1200);

      return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
        clearTimeout(clearIntervalTimeout);
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    }, [isExpanded, isPlaying]);

    return (
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
    );
  }
);

RomanBustScene.displayName = "RomanBustScene";

export default RomanBustScene;
