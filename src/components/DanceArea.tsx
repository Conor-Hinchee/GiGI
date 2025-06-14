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
  const [hasShownExpansionIndicator, setHasShownExpansionIndicator] = React.useState<boolean>(false);
  const [showExpansionIndicator, setShowExpansionIndicator] = React.useState<boolean>(false);
  const firefliesSceneRef = React.useRef<FirefliesSceneRef>(null);

  // Select random song on component mount
  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * AVAILABLE_SONGS.length);
    setCurrentSong(AVAILABLE_SONGS[randomIndex]);
  }, []);

  // Handle expansion indicator logic - show only once on first play (desktop only)
  React.useEffect(() => {
    // Only show on desktop during expansion
    if (isMobile) return;

    // Show the indicator when playing starts and it hasn't been shown before
    if (isPlaying && !isFullscreen && !hasShownExpansionIndicator) {
      setShowExpansionIndicator(true);
      setHasShownExpansionIndicator(true);

      // Hide the indicator after the expansion animation completes (roughly 1 second)
      const hideTimer = setTimeout(() => {
        setShowExpansionIndicator(false);
      }, 1000);

      return () => clearTimeout(hideTimer);
    }
  }, [isPlaying, isFullscreen, isMobile, hasShownExpansionIndicator]);

  // Handle touch events for mobile firefly spawning
  const handleTouchStart = React.useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile || !firefliesSceneRef.current) return;

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
    },
    [isMobile]
  );

  const handleTouchEnd = React.useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile || !firefliesSceneRef.current) return;

      const touch = e.changedTouches[0];
      if (touch) {
        // Spawn a burst of fireflies on touch end
        firefliesSceneRef.current.spawnFirefliesAtTouch(
          touch.clientX,
          touch.clientY,
          true // Burst of fireflies on release
        );
      }
    },
    [isMobile]
  );

  // Handle clicks on desktop (fallback behavior)
  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (isMobile || !firefliesSceneRef.current) return;

      // For desktop, just spawn a small burst for visual feedback
      firefliesSceneRef.current.spawnFirefliesAtTouch(
        e.clientX,
        e.clientY,
        false
      );
    },
    [isMobile]
  );

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
      className={`bg-gray-950 relative overflow-hidden shadow-inner hover-trail ${
        isMobile ? "" : "transition-all duration-1000 ease-in-out"
      } ${
        isFullscreen
          ? "fixed inset-0 z-50 h-screen w-screen border-0"
          : isPlaying
          ? "h-[100vh] border-b-8 border-purple-400/80 shadow-purple-400/40 shadow-2xl"
          : isMobile
          ? "h-[100vh] border-b-4 border-gray-800"
          : "h-[50vh] border-b-4 border-gray-800"
      } ${getScrollHijackClasses()}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {/* Desktop-only: Advanced background effects */}
      <div className="hidden xl:block absolute inset-0 opacity-30">
        <div
          className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-float-up"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="absolute top-1/4 right-0 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-float-up"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-0 left-1/3 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-float-up"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Desktop-only: Sophisticated grid overlay with shimmer */}
      <div className="hidden lg:block absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"></div>
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.1), transparent)",
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

      {/* Expansion Indicator - appears only once during first play on desktop */}
      <ExpansionIndicator
        isVisible={showExpansionIndicator}
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10"></div>
      <div className="absolute inset-0 shadow-[inset_0_10px_20px_rgba(0,0,0,0.5),inset_0_-10px_20px_rgba(0,0,0,0.3)] z-10"></div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-10 z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)",
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
