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
    const discoBallRef = useRef<THREE.Group | null>(null);
    const danceCharacterRef = useRef<THREE.Sprite | null>(null);
    const spotlightsRef = useRef<THREE.Group | null>(null);
    const animationIdRef = useRef<number | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

    // Audio Analysis References
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const audioLevelsRef = useRef({ bass: 0, mid: 0, high: 0, overall: 0 });
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const matcapTextureRef = useRef<THREE.Texture | null>(null);

    // Create a programmatic matcap texture for mirror reflections
    const createMatcapTexture = useCallback(() => {
      const size = 512;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");

      if (!context) return null;

      // Create a more realistic metallic matcap
      const centerX = size * 0.5;
      const centerY = size * 0.3; // Offset for more realistic lighting

      // Main radial gradient for metallic look
      const mainGradient = context.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        size * 0.6
      );

      // Base color changes based on playing state
      if (isPlaying) {
        // Ultra shiny reddish gold metallic matcap when playing
        mainGradient.addColorStop(0, "#ffffff");
        mainGradient.addColorStop(0.05, "#ffffff");
        mainGradient.addColorStop(0.1, "#fff8dc");
        mainGradient.addColorStop(0.2, "#ffef94");
        mainGradient.addColorStop(0.3, "#ffd700");
        mainGradient.addColorStop(0.4, "#ffb347");
        mainGradient.addColorStop(0.5, "#daa520");
        mainGradient.addColorStop(0.6, "#cd853f");
        mainGradient.addColorStop(0.7, "#b8860b");
        mainGradient.addColorStop(0.8, "#996515");
        mainGradient.addColorStop(0.9, "#8b4513");
        mainGradient.addColorStop(1, "#2f1b14");
      } else {
        // Ultra shiny chrome/silver metallic matcap when not playing
        mainGradient.addColorStop(0, "#ffffff");
        mainGradient.addColorStop(0.05, "#ffffff");
        mainGradient.addColorStop(0.1, "#f8f8ff");
        mainGradient.addColorStop(0.2, "#f0f8ff");
        mainGradient.addColorStop(0.3, "#e6e6fa");
        mainGradient.addColorStop(0.4, "#dcdcdc");
        mainGradient.addColorStop(0.5, "#c0c0c0");
        mainGradient.addColorStop(0.6, "#b0b0b0");
        mainGradient.addColorStop(0.7, "#a9a9a9");
        mainGradient.addColorStop(0.8, "#808080");
        mainGradient.addColorStop(0.9, "#696969");
        mainGradient.addColorStop(1, "#2f2f2f");
      }

      context.fillStyle = mainGradient;
      context.fillRect(0, 0, size, size);

      // Add multiple ultra-bright highlight spots for maximum shininess
      context.globalCompositeOperation = "screen";

      // Primary ultra-bright highlight
      const highlight1 = context.createRadialGradient(
        size * 0.2,
        size * 0.2,
        0,
        size * 0.2,
        size * 0.2,
        size * 0.18
      );
      highlight1.addColorStop(0, "rgba(255, 255, 255, 1.0)");
      highlight1.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
      highlight1.addColorStop(0.6, "rgba(255, 255, 255, 0.4)");
      highlight1.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = highlight1;
      context.fillRect(0, 0, size, size);

      // Secondary bright highlight
      const highlight2 = context.createRadialGradient(
        size * 0.75,
        size * 0.65,
        0,
        size * 0.75,
        size * 0.65,
        size * 0.12
      );
      highlight2.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      highlight2.addColorStop(0.4, "rgba(255, 255, 255, 0.5)");
      highlight2.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = highlight2;
      context.fillRect(0, 0, size, size);

      // Tertiary sparkle highlight
      const highlight3 = context.createRadialGradient(
        size * 0.6,
        size * 0.25,
        0,
        size * 0.6,
        size * 0.25,
        size * 0.08
      );
      highlight3.addColorStop(0, "rgba(255, 255, 255, 0.7)");
      highlight3.addColorStop(0.5, "rgba(255, 255, 255, 0.3)");
      highlight3.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = highlight3;
      context.fillRect(0, 0, size, size);

      // Add rim lighting for extra shine
      const rimGradient = context.createRadialGradient(
        centerX,
        centerY,
        size * 0.35,
        centerX,
        centerY,
        size * 0.5
      );
      rimGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      rimGradient.addColorStop(0.8, "rgba(255, 255, 255, 0)");
      rimGradient.addColorStop(0.95, "rgba(255, 255, 255, 0.3)");
      rimGradient.addColorStop(1, "rgba(255, 255, 255, 0.1)");
      context.fillStyle = rimGradient;
      context.fillRect(0, 0, size, size);

      // Reset composite operation
      context.globalCompositeOperation = "source-over";

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    }, [isPlaying]);

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

    // Fixed click handling - use direct click on container instead of raycasting
    const handleClick = useCallback(() => {
      toggleAudio();
    }, [toggleAudio]);

    // Handle keyboard events
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (event.code === "Space" || event.code === "Enter") {
          event.preventDefault();
          toggleAudio();
        }
      },
      [toggleAudio]
    );

    // Create realistic disco ball with mirror surfaces
    const createMirrorDiscoBall = useCallback(() => {
      const dummy = new THREE.Object3D();

      // Create the matcap texture
      const matcapTexture = createMatcapTexture();
      if (!matcapTexture) return null;

      matcapTextureRef.current = matcapTexture;

      // Create ultra-shiny mirror material
      const mirrorMaterial = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture,
        transparent: false, // No transparency for maximum shine
        side: THREE.FrontSide, // Only render front faces for better performance
      });

      // Create base sphere geometry with fewer segments for cleaner mirror placement
      const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 12);

      // Get face centers for mirror placement instead of vertices
      const faces = [];
      const positionAttribute = sphereGeometry.attributes.position;
      const indexAttribute = sphereGeometry.index;

      if (indexAttribute) {
        // Calculate face centers from triangulated faces
        for (let i = 0; i < indexAttribute.count; i += 3) {
          const a = indexAttribute.getX(i);
          const b = indexAttribute.getX(i + 1);
          const c = indexAttribute.getX(i + 2);

          const va = new THREE.Vector3().fromBufferAttribute(
            positionAttribute,
            a
          );
          const vb = new THREE.Vector3().fromBufferAttribute(
            positionAttribute,
            b
          );
          const vc = new THREE.Vector3().fromBufferAttribute(
            positionAttribute,
            c
          );

          // Calculate face center
          const center = new THREE.Vector3()
            .add(va)
            .add(vb)
            .add(vc)
            .divideScalar(3);

          // Calculate face normal
          const normal = new THREE.Vector3()
            .crossVectors(vb.clone().sub(va), vc.clone().sub(va))
            .normalize();

          faces.push({ center, normal });
        }
      }

      // Create small square mirror geometry
      const mirrorSize = 0.08;
      const mirrorGeometry = new THREE.PlaneGeometry(mirrorSize, mirrorSize);

      // Create instanced mesh for mirrors
      const instancedMirrorMesh = new THREE.InstancedMesh(
        mirrorGeometry,
        mirrorMaterial,
        faces.length
      );

      // Position mirrors on face centers
      faces.forEach((face, index) => {
        dummy.position.copy(face.center);
        dummy.lookAt(face.center.clone().add(face.normal));
        dummy.updateMatrix();
        instancedMirrorMesh.setMatrixAt(index, dummy.matrix);
      });

      // Create ultra-dark inner ball for maximum contrast and shine
      const innerBallGeometry = new THREE.SphereGeometry(0.47, 32, 32);
      const innerBallMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000, // Pure black for maximum contrast
        transparent: false,
      });
      const innerBall = new THREE.Mesh(innerBallGeometry, innerBallMaterial);

      // Create group and add both components
      const discoBallGroup = new THREE.Group();
      discoBallGroup.add(innerBall);
      discoBallGroup.add(instancedMirrorMesh);

      return discoBallGroup;
    }, [createMatcapTexture]);

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
      context.fillStyle = isPlaying ? "#c0c0c0" : "#fbbf24"; // Silver when playing, gold when not
      context.font = "bold 80px Arial";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText("舞", size / 2, size / 2);

      // Add glow effect when playing
      if (isPlaying) {
        context.shadowColor = "#c0c0c0";
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
          // Light burst effect removed - no longer needed
        },
      }),
      []
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

      // Create realistic mirror disco ball
      const mirrorDiscoBall = createMirrorDiscoBall();
      if (mirrorDiscoBall) {
        discoBallRef.current = mirrorDiscoBall;
        scene.add(mirrorDiscoBall);
      }

      // Create and add dance character sprite
      const danceCharacter = createDanceCharacter();
      if (danceCharacter) {
        danceCharacterRef.current = danceCharacter;
        scene.add(danceCharacter);
      }

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

        // Update matcap texture only when playing state changes
        const currentMatcapState =
          matcapTextureRef.current?.userData?.isPlaying;
        if (currentMatcapState !== isPlaying) {
          const newMatcap = createMatcapTexture();
          if (newMatcap && discoBallRef.current) {
            newMatcap.userData = { isPlaying };
            const instancedMesh = discoBallRef.current.children.find(
              (child) => child instanceof THREE.InstancedMesh
            ) as THREE.InstancedMesh;
            if (
              instancedMesh &&
              instancedMesh.material instanceof THREE.MeshMatcapMaterial
            ) {
              instancedMesh.material.matcap = newMatcap;
              instancedMesh.material.needsUpdate = true;
              matcapTextureRef.current = newMatcap;
            }
          }
        }

        // Analyze audio if playing
        if (isPlaying && analyserRef.current) {
          analyzeAudio();
        }

        // Always rotate disco ball, but faster when playing
        if (discoBallRef.current) {
          const rotationSpeed = isPlaying ? 0.01 : 0.003; // Slower when not playing
          discoBallRef.current.rotation.y += rotationSpeed;
          discoBallRef.current.rotation.x += rotationSpeed * 0.5;

          // Audio-reactive scaling when playing
          if (isPlaying) {
            const audioLevels = audioLevelsRef.current;
            const scale =
              1.0 +
              (audioLevels.bass + audioLevels.mid + audioLevels.high) * 0.1;
            discoBallRef.current.scale.setScalar(scale);
          } else {
            discoBallRef.current.scale.setScalar(1.0);
          }
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
        // Dispose disco ball geometry and materials
        if (discoBallRef.current) {
          discoBallRef.current.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              if (Array.isArray(child.material)) {
                child.material.forEach((material) => material.dispose());
              } else {
                child.material.dispose();
              }
            }
          });
        }
      };
    }, [
      isPlaying,
      isFullscreen,
      isExpanded,
      isMobile,
      setupAudioAnalysis,
      analyzeAudio,
      createDanceCharacter,
      createMatcapTexture,
      createMirrorDiscoBall,
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

    // Update matcap texture when playing state changes
    useEffect(() => {
      if (discoBallRef.current) {
        const newMatcap = createMatcapTexture();
        if (newMatcap) {
          // Update instanced mesh material with new matcap
          const instancedMesh = discoBallRef.current.children.find(
            (child) => child instanceof THREE.InstancedMesh
          ) as THREE.InstancedMesh;
          if (
            instancedMesh &&
            instancedMesh.material instanceof THREE.MeshMatcapMaterial
          ) {
            instancedMesh.material.matcap = newMatcap;
            instancedMesh.material.needsUpdate = true;
            matcapTextureRef.current = newMatcap;
          }
        }
      }
    }, [isPlaying, createMatcapTexture]);

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
