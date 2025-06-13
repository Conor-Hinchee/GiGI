import React from "react";
import { DanceAreaProps } from "../types";
import FirefliesScene, { FirefliesSceneRef } from "./FirefliesScene";
import { DanceButton } from "./DanceButton";
import { ExpansionIndicator } from "./ExpansionIndicator";
import AudioStatusIndicator from "./AudioStatusIndicator";

// Available songs array
const AVAILABLE_SONGS = [
  "Gigi D'Agostino - Cuba Libre ( L'Amour Toujours ) [UWMYjD16qFc].mp3",
  "GIGI D’AGOSTINO & LUCA NOISE - LIKE A FLOW FLOAT (GIGI DAG & LUC ON ROCKING MIX) [17bJ-XXxbu0].mp3",
  "Gigi D’Agostino & Luca Noise - Smoke A Beat [ From the album SMODERANZA ] [w3KP8UhTdys].mp3",
];

export const DanceArea: React.FC<DanceAreaProps> = ({
  isPlaying,
  setIsPlaying,
  isFullscreen,
  isMobile,
  danceAreaRef,
  toggleAudio,
  toggleFullscreen,
  audioRef,
  scrollHijackState,
}) => {
  const [currentSong, setCurrentSong] = React.useState<string>("");
  const firefliesSceneRef = React.useRef<FirefliesSceneRef>(null);

  // Select random song on component mount
  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * AVAILABLE_SONGS.length);
    setCurrentSong(AVAILABLE_SONGS[randomIndex]);
  }, []);

  // Handle touch events for firefly spawning - works on all devices
  const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
    if (!firefliesSceneRef.current) return;

    e.preventDefault(); // Prevent scrolling during dance interactions

    const touch = e.touches[0];
    if (touch) {
      // Spawn fireflies at touch location
      firefliesSceneRef.current.spawnFirefliesAtTouch(
        touch.clientX,
        touch.clientY,
        false // Single firefly on touch start
      );
    }
  }, []);

  const handleTouchEnd = React.useCallback((e: React.TouchEvent) => {
    if (!firefliesSceneRef.current) return;

    const touch = e.changedTouches[0];
    if (touch) {
      // Spawn a burst of fireflies on touch end
      firefliesSceneRef.current.spawnFirefliesAtTouch(
        touch.clientX,
        touch.clientY,
        true // Burst of fireflies on release
      );
    }
  }, []);

  // Handle touch move for continuous firefly spawning
  const handleTouchMove = React.useCallback((e: React.TouchEvent) => {
    if (!firefliesSceneRef.current) return;

    e.preventDefault(); // Prevent scrolling during dance interactions

    Array.from(e.touches).forEach((touch) => {
      // Spawn fireflies at touch location while moving
      firefliesSceneRef.current?.spawnFirefliesAtTouch(
        touch.clientX,
        touch.clientY,
        false // Single firefly on touch move
      );
    });
  }, []);

  // Handle clicks on desktop - enhanced behavior
  const handleClick = React.useCallback((e: React.MouseEvent) => {
    if (!firefliesSceneRef.current) return;

    // For desktop, spawn a burst for visual feedback
    firefliesSceneRef.current.spawnFirefliesAtTouch(
      e.clientX,
      e.clientY,
      true // Burst on click
    );
  }, []);

  // Handle mouse move for drag effects on desktop
  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    // Only spawn on mouse move if mouse is pressed
    if (e.buttons === 1 && firefliesSceneRef.current) {
      firefliesSceneRef.current.spawnFirefliesAtTouch(
        e.clientX,
        e.clientY,
        false // Single firefly on drag
      );
    }
  }, []);

  // Enhanced native event listeners for better cross-platform support
  React.useEffect(() => {
    const danceArea = danceAreaRef.current;
    if (!danceArea) return;

    const handleNativeTouchStart = (e: TouchEvent) => {
      e.preventDefault();

      Array.from(e.touches).forEach((touch) => {
        if (firefliesSceneRef.current) {
          firefliesSceneRef.current.spawnFirefliesAtTouch(
            touch.clientX,
            touch.clientY,
            false // Single touch
          );
        }
      });
    };

    const handleNativeTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      Array.from(e.touches).forEach((touch) => {
        if (firefliesSceneRef.current) {
          firefliesSceneRef.current.spawnFirefliesAtTouch(
            touch.clientX,
            touch.clientY,
            false // Single touch
          );
        }
      });
    };

    const handleNativeMouseClick = (e: MouseEvent) => {
      if (firefliesSceneRef.current) {
        firefliesSceneRef.current.spawnFirefliesAtTouch(
          e.clientX,
          e.clientY,
          true // Burst on click
        );
      }
    };

    const handleNativeMouseMove = (e: MouseEvent) => {
      // Only spawn on mouse move if mouse is pressed
      if (e.buttons === 1 && firefliesSceneRef.current) {
        firefliesSceneRef.current.spawnFirefliesAtTouch(
          e.clientX,
          e.clientY,
          false // Single on drag
        );
      }
    };

    // Add native event listeners for better compatibility
    danceArea.addEventListener("touchstart", handleNativeTouchStart, {
      passive: false,
    });
    danceArea.addEventListener("touchmove", handleNativeTouchMove, {
      passive: false,
    });
    danceArea.addEventListener("click", handleNativeMouseClick);
    danceArea.addEventListener("mousemove", handleNativeMouseMove);

    return () => {
      danceArea.removeEventListener("touchstart", handleNativeTouchStart);
      danceArea.removeEventListener("touchmove", handleNativeTouchMove);
      danceArea.removeEventListener("click", handleNativeMouseClick);
      danceArea.removeEventListener("mousemove", handleNativeMouseMove);
    };
  }, [danceAreaRef]);

  // Determine scroll hijack classes
  const getScrollHijackClasses = () => {
    if (!scrollHijackState?.isScrollHijacked) return "";
    if (scrollHijackState.scrollResistance > 0.8) return "scroll-hijack-ready";
    if (scrollHijackState.scrollResistance > 0) return "scroll-hijack-active";
    return "";
  };

  return (
    <div
      ref={danceAreaRef}
      className={`bg-gradient-to-br from-gray-950 via-purple-950/20 to-gray-950 relative overflow-hidden shadow-inner hover-trail ${
        isMobile ? "" : "transition-all duration-1000 ease-in-out"
      } ${
        isFullscreen
          ? "fixed inset-0 z-50 h-screen w-screen border-0"
          : isPlaying
          ? "h-[100vh] border-b-8 border-purple-400/80 shadow-purple-400/40 shadow-2xl"
          : isMobile
          ? "h-[100vh] border-b-4 border-purple-800/60"
          : "h-[50vh] border-b-4 border-purple-800/60"
      } ${getScrollHijackClasses()}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      {/* Desktop-only: Advanced background effects */}
      <div className="hidden xl:block absolute inset-0 opacity-40">
        <div
          className="absolute top-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-float-up"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-1/4 right-0 w-24 h-24 bg-purple-400/15 rounded-full blur-xl animate-float-up"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/3 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl animate-float-up"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Desktop-only: Sophisticated grid overlay with shimmer */}
      <div className="hidden lg:block absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-purple-900/5 to-purple-600/8"></div>
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.15), transparent)",
            backgroundSize: "200% 100%",
          }}
        ></div>
      </div>

      {/* Three.js Fireflies Background */}
      <FirefliesScene
        ref={firefliesSceneRef}
        isPlaying={isPlaying}
        isFullscreen={isFullscreen}
        isExpanded={isPlaying && !isFullscreen}
        isMobile={isMobile}
      />

      {/* Expansion Indicator - appears when expanding but hides when user starts scrolling */}
      <ExpansionIndicator
        isVisible={
          isPlaying &&
          !isFullscreen &&
          (!scrollHijackState?.isScrollHijacked ||
            scrollHijackState.accumulatedScroll === 0)
        }
      />

      {/* Fullscreen Button - Hidden on mobile */}
      {!isMobile && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 left-4 z-30 group bg-black/40 backdrop-blur-md rounded-full p-3 border border-gray-600/40 hover:border-purple-500/40 shadow-lg transition-all duration-300 hover:scale-110"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            // Exit fullscreen icon
            <svg
              className="w-5 h-5 text-gray-300 group-hover:text-purple-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Enter fullscreen icon
            <svg
              className="w-5 h-5 text-gray-300 group-hover:text-purple-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
          )}
        </button>
      )}

      {/* Audio Status Indicator */}
      <AudioStatusIndicator
        isPlaying={isPlaying}
        toggleAudio={toggleAudio}
        isMobile={isMobile}
      />

      {/* Inset shadow effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-purple-900/30 z-10"></div>
      <div className="absolute inset-0 shadow-[inset_0_10px_20px_rgba(0,0,0,0.5),inset_0_-10px_20px_rgba(75,0,130,0.2)] z-10"></div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-15 z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(147,51,234,0.15) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      {/* Hero Dance Button */}
      <DanceButton
        isPlaying={isPlaying}
        toggleAudio={toggleAudio}
        onTouchFireflies={(x, y, burst) =>
          firefliesSceneRef.current?.spawnFirefliesAtTouch(x, y, burst)
        }
        isMobile={isMobile}
      />

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        {currentSong && <source src={currentSong} type="audio/mpeg" />}
        Your browser does not support the audio element.
      </audio>

      {/* Ambient particles */}
      <div
        className={`absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full z-15 ${
          isPlaying ? "animate-rave-particle-glow" : "animate-pulse"
        }`}
      ></div>
      <div
        className={`absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400/40 rounded-full z-15 ${
          isPlaying ? "animate-rave-particle-glow" : "animate-pulse"
        }`}
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className={`absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400/20 rounded-full z-15 ${
          isPlaying ? "animate-rave-particle-glow" : "animate-pulse"
        }`}
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
};
