"use client";

import {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as THREE from "three";

interface DiscoBallSceneProps {
  isPlaying: boolean;
  isFullscreen?: boolean;
  isExpanded?: boolean;
  isMobile?: boolean;
  toggleAudio: () => void;
}

export interface DiscoBallSceneRef {
  spawnDiscoLights: (x: number, y: number, burst?: boolean) => void;
}

const DiscoBallScene = forwardRef<DiscoBallSceneRef, DiscoBallSceneProps>(
  (
    {
      isPlaying,
      isFullscreen = false,
      isExpanded = false,
      isMobile = false,
      toggleAudio,
    },
    ref
  ) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const discoBallRef = useRef<THREE.Mesh | null>(null);
    const danceCharacterRef = useRef<THREE.Sprite | null>(null);
    const lightBeamsRef = useRef<THREE.Group | null>(null);
    const spotlightsRef = useRef<THREE.Group | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
    const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2());

    // Audio Analysis References
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const audioLevelsRef = useRef({ bass: 0, mid: 0, high: 0, overall: 0 });
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);

    // Setup audio analysis
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

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          dataArrayRef.current = dataArray;

          if (!sourceRef.current) {
            const source = audioContext.createMediaElementSource(audioElement);
            sourceRef.current = source;
            source.connect(analyser);
            analyser.connect(audioContext.destination);
          }

          if (audioContext.state === "suspended") {
            audioContext.resume();
          }
        } catch (error) {
          console.error("Error setting up audio analysis:", error);
        }
      }
    }, []);

    // Analyze audio frequencies
    const analyzeAudio = useCallback(() => {
      if (!analyserRef.current || !dataArrayRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      const dataArray = dataArrayRef.current;

      // Calculate frequency ranges
      const bassRange = dataArray.slice(0, 60);
      const midRange = dataArray.slice(60, 180);
      const highRange = dataArray.slice(180, 512);

      const bassAvg =
        bassRange.reduce((sum, val) => sum + val, 0) / bassRange.length / 255;
      const midAvg =
        midRange.reduce((sum, val) => sum + val, 0) / midRange.length / 255;
      const highAvg =
        highRange.reduce((sum, val) => sum + val, 0) / highRange.length / 255;
      const overallAvg = (bassAvg + midAvg + highAvg) / 3;

      audioLevelsRef.current = {
        bass: bassAvg,
        mid: midAvg,
        high: highAvg,
        overall: overallAvg,
      };

      // Update disco ball material uniforms
      if (materialRef.current && materialRef.current.uniforms) {
        materialRef.current.uniforms.uBass.value = bassAvg;
        materialRef.current.uniforms.uMid.value = midAvg;
        materialRef.current.uniforms.uHigh.value = highAvg;
      }
    }, []);

    // Create light burst effect when button is pressed
    const createLightBurst = useCallback(() => {
      if (!spotlightsRef.current) return;

      // Create temporary bright light beams
      const burstGroup = new THREE.Group();
      const numBursts = 8;

      for (let i = 0; i < numBursts; i++) {
        const angle = (i / numBursts) * Math.PI * 2;
        const distance = 3;

        const geometry = new THREE.ConeGeometry(0.1, 2, 8);
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(Math.random(), 0.8, 0.7),
          transparent: true,
          opacity: 0.8,
        });

        const beam = new THREE.Mesh(geometry, material);
        beam.position.set(
          Math.cos(angle) * distance,
          Math.sin(angle) * distance,
          0
        );
        beam.lookAt(0, 0, 0);

        burstGroup.add(beam);
      }

      spotlightsRef.current.add(burstGroup);

      // Animate and remove burst
      let opacity = 0.8;
      const animateBurst = () => {
        opacity -= 0.05;
        burstGroup.children.forEach((beam) => {
          const material = (beam as THREE.Mesh)
            .material as THREE.MeshBasicMaterial;
          material.opacity = opacity;
        });

        if (opacity > 0) {
          requestAnimationFrame(animateBurst);
        } else {
          spotlightsRef.current?.remove(burstGroup);
          burstGroup.children.forEach((beam) => {
            const material = (beam as THREE.Mesh)
              .material as THREE.MeshBasicMaterial;
            material.dispose();
            (beam as THREE.Mesh).geometry.dispose();
          });
        }
      };
      animateBurst();
    }, []);

    // Handle click/touch on disco ball
    const handleClick = useCallback(
      (event: React.MouseEvent | React.TouchEvent) => {
        if (!mountRef.current || !cameraRef.current || !discoBallRef.current)
          return;

        const rect = mountRef.current.getBoundingClientRect();
        let clientX: number, clientY: number;

        if ("touches" in event.nativeEvent) {
          const touch =
            event.nativeEvent.touches[0] || event.nativeEvent.changedTouches[0];
          clientX = touch.clientX;
          clientY = touch.clientY;
        } else {
          clientX = event.nativeEvent.clientX;
          clientY = event.nativeEvent.clientY;
        }

        // Calculate normalized device coordinates
        mouseRef.current.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouseRef.current.y = -((clientY - rect.top) / rect.height) * 2 + 1;

        // Cast ray from camera through mouse point
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);

        // Check for intersections with both disco ball and dance character
        const objectsToCheck: THREE.Object3D[] = [discoBallRef.current];
        if (danceCharacterRef.current) {
          objectsToCheck.push(danceCharacterRef.current);
        }

        const intersects =
          raycasterRef.current.intersectObjects(objectsToCheck);

        if (intersects.length > 0) {
          toggleAudio();
          createLightBurst();
        }
      },
      [toggleAudio, createLightBurst]
    );

    // Handle keyboard events
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (event.code === "Space" || event.code === "Enter") {
          event.preventDefault();
          toggleAudio();
          createLightBurst();
        }
      },
      [toggleAudio, createLightBurst]
    );

    // Create dance character sprite
    const createDanceCharacter = useCallback(() => {
      // Create canvas for the dance character
      const canvas = document.createElement("canvas");
      const size = 128;
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");

      if (!context) return null;

      // Draw the dance character
      context.fillStyle = isPlaying ? "#fbbf24" : "#ffffff"; // Gold when playing, white when not
      context.font = "bold 80px Arial";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("舞", size / 2, size / 2);

      // Add glow effect when playing
      if (isPlaying) {
        context.shadowColor = "#fbbf24";
        context.shadowBlur = 20;
        context.fillText("舞", size / 2, size / 2);
      }

      // Create texture and sprite
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
      });

      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(0.8, 0.8, 1);
      sprite.position.set(0, 0, 0.6); // Slightly in front of disco ball center

      return sprite;
    }, [isPlaying]);

    // Expose the spawn function via ref
    useImperativeHandle(
      ref,
      () => ({
        spawnDiscoLights: () => {
          // Trigger extra light burst when button is pressed
          if (spotlightsRef.current && isPlaying) {
            createLightBurst();
          }
        },
      }),
      [isPlaying, createLightBurst]
    );

    useEffect(() => {
      if (!mountRef.current) return;

      const mount = mountRef.current;

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
      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;
      mount.appendChild(renderer.domElement);

      // Create disco ball
      const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
      const ballMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uBass: { value: 0.0 },
          uMid: { value: 0.0 },
          uHigh: { value: 0.0 },
          uOpacity: { value: 0.8 }, // Always visible
          uPlaying: { value: isPlaying ? 1.0 : 0.0 }, // New uniform for playing state
        },
        vertexShader: `
          uniform float uTime;
          uniform float uBass;
          uniform float uMid;
          uniform float uHigh;
          uniform float uPlaying;
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec2 vUv;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            vUv = uv;
            
            // Audio-reactive size pulsing only when playing
            float audioScale = 1.0 + (uBass + uMid + uHigh) * 0.2 * uPlaying;
            vec3 pos = position * audioScale;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform float uTime;
          uniform float uBass;
          uniform float uMid;
          uniform float uHigh;
          uniform float uOpacity;
          uniform float uPlaying;
          varying vec3 vNormal;
          varying vec3 vPosition;
          varying vec2 vUv;
          
          void main() {
            // Create disco ball mirror tiles effect
            vec2 tileUv = vUv * 20.0;
            vec2 tileId = floor(tileUv);
            vec2 tileFract = fract(tileUv);
            
            // Each tile reflects different colors based on audio
            float tileHash = fract(sin(dot(tileId, vec2(12.9898, 78.233))) * 43758.5453);
            
            // Base silver/gray disco ball color when not playing
            vec3 baseColor = vec3(0.7, 0.7, 0.8);
            
            // Audio-reactive colors when playing
            vec3 bassColor = vec3(1.0, 0.2, 0.8);    // Pink for bass
            vec3 midColor = vec3(0.2, 0.8, 1.0);     // Cyan for mids
            vec3 highColor = vec3(1.0, 1.0, 0.2);    // Yellow for highs
            
            // Mix colors based on frequency and tile position
            vec3 audioColor = mix(mix(bassColor, midColor, tileHash), highColor, sin(uTime + tileHash * 6.28) * 0.5 + 0.5);
            audioColor *= vec3(uBass + 0.1, uMid + 0.1, uHigh + 0.1);
            
            // Blend between base color and audio-reactive color based on playing state
            vec3 tileColor = mix(baseColor, audioColor, uPlaying);
            
            // Add metallic reflection
            float fresnel = pow(1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 2.0);
            vec3 reflection = tileColor * (0.8 + fresnel * 0.2);
            
            // Tile border for disco ball effect
            vec2 border = smoothstep(0.0, 0.1, tileFract) * smoothstep(1.0, 0.9, tileFract);
            float borderMask = border.x * border.y;
            
            gl_FragColor = vec4(reflection * borderMask, uOpacity * borderMask);
          }
        `,
        transparent: true,
      });

      const discoBall = new THREE.Mesh(ballGeometry, ballMaterial);
      discoBallRef.current = discoBall;
      materialRef.current = ballMaterial;
      scene.add(discoBall);

      // Create and add dance character sprite
      const danceCharacter = createDanceCharacter();
      if (danceCharacter) {
        danceCharacterRef.current = danceCharacter;
        scene.add(danceCharacter);
      }

      // Create rotating light beams
      const lightBeams = new THREE.Group();
      lightBeamsRef.current = lightBeams;

      const numBeams = 12;
      for (let i = 0; i < numBeams; i++) {
        const beamGeometry = new THREE.ConeGeometry(0.05, 4, 8);
        const hue = i / numBeams;
        const beamMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(hue, 0.8, 0.6),
          transparent: true,
          opacity: 0.3,
        });

        const beam = new THREE.Mesh(beamGeometry, beamMaterial);
        const angle = (i / numBeams) * Math.PI * 2;
        const radius = 2;

        beam.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          0
        );
        beam.lookAt(0, 0, 0);

        lightBeams.add(beam);
      }

      scene.add(lightBeams);

      // Create spotlights group for additional effects
      const spotlights = new THREE.Group();
      spotlightsRef.current = spotlights;
      scene.add(spotlights);

      // Setup audio analysis when music starts playing
      if (isPlaying) {
        setupAudioAnalysis();
      }

      // Animation loop
      const animate = () => {
        animationIdRef.current = requestAnimationFrame(animate);

        if (ballMaterial.uniforms) {
          ballMaterial.uniforms.uTime.value += 0.01;

          // Analyze audio if playing
          if (isPlaying && analyserRef.current) {
            analyzeAudio();
          }

          // Smooth playing state transition
          const targetPlaying = isPlaying ? 1.0 : 0.0;
          const currentPlaying = ballMaterial.uniforms.uPlaying.value;
          ballMaterial.uniforms.uPlaying.value +=
            (targetPlaying - currentPlaying) * 0.05;
        }

        // Always rotate disco ball, but faster when playing
        if (discoBall) {
          const rotationSpeed = isPlaying ? 0.01 : 0.003; // Slower when not playing
          discoBall.rotation.y += rotationSpeed;
          discoBall.rotation.x += rotationSpeed * 0.5;
        }

        // Always rotate light beams, but slower when not playing
        if (lightBeams) {
          const rotationSpeed = isPlaying ? 0.02 : 0.005;
          lightBeams.rotation.z += rotationSpeed;

          // Audio-reactive beam intensity when playing, subtle when not
          const audioLevel = audioLevelsRef.current.overall;
          lightBeams.children.forEach((beam, index) => {
            const material = (beam as THREE.Mesh)
              .material as THREE.MeshBasicMaterial;

            if (isPlaying) {
              // Full audio-reactive mode when playing
              const baseOpacity = 0.3;
              const audioBoost = audioLevel * 0.7;
              material.opacity = Math.min(1.0, baseOpacity + audioBoost);

              // Color cycling based on audio
              const hue = (index / numBeams + audioLevel * 0.5) % 1;
              material.color.setHSL(hue, 0.8, 0.6 + audioLevel * 0.3);
            } else {
              // Subtle static mode when not playing
              material.opacity = 0.1;
              const hue = (index / numBeams) % 1;
              material.color.setHSL(hue, 0.3, 0.4); // Desaturated, dimmer
            }
          });
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
        discoBallRef.current?.geometry.dispose();
        lightBeamsRef.current?.children.forEach((beam) => {
          const mesh = beam as THREE.Mesh;
          mesh.geometry.dispose();
          (mesh.material as THREE.Material).dispose();
        });
      };
    }, [
      isPlaying,
      isFullscreen,
      isExpanded,
      isMobile,
      setupAudioAnalysis,
      analyzeAudio,
      createLightBurst,
      createDanceCharacter,
    ]);

    // Handle container size changes when expanding/contracting
    useEffect(() => {
      const handleContainerResize = () => {
        if (!mountRef.current || !rendererRef.current || !cameraRef.current)
          return;

        const { clientWidth, clientHeight } = mountRef.current;
        cameraRef.current.aspect = clientWidth / clientHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(clientWidth, clientHeight);
      };

      // Use ResizeObserver to watch for container size changes
      const resizeObserver = new ResizeObserver(handleContainerResize);
      if (mountRef.current) {
        resizeObserver.observe(mountRef.current);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }, [isExpanded, isPlaying]);

    // Update uniforms when playing state changes
    useEffect(() => {
      if (discoBallRef.current && discoBallRef.current.material) {
        const material = discoBallRef.current.material as THREE.ShaderMaterial;
        if (material.uniforms && !isPlaying) {
          // Reset when stopping
          material.uniforms.uBass.value = 0.0;
          material.uniforms.uMid.value = 0.0;
          material.uniforms.uHigh.value = 0.0;
        }
      }
    }, [isPlaying]);

    // Update dance character when playing state changes
    useEffect(() => {
      if (!sceneRef.current || !danceCharacterRef.current) return;

      // Remove old character
      sceneRef.current.remove(danceCharacterRef.current);

      // Create and add new character with updated state
      const newCharacter = createDanceCharacter();
      if (newCharacter) {
        danceCharacterRef.current = newCharacter;
        sceneRef.current.add(newCharacter);
      }
    }, [isPlaying, createDanceCharacter]);

    return (
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1, outline: "none" }} // Remove default focus outline since we have visual feedback
        onClick={handleClick}
        onTouchEnd={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0} // Make the div focusable for keyboard events
        role="button" // Accessibility role
        aria-label={isPlaying ? "Pause music" : "Play music"}
      />
    );
  }
);

DiscoBallScene.displayName = "DiscoBallScene";

export default DiscoBallScene;
