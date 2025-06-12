import React from "react";
import { DanceAreaProps } from "../types";
import FirefliesScene from "./FirefliesScene";
import { DanceButton } from "./DanceButton";

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
}) => {
  const [currentSong, setCurrentSong] = React.useState<string>("");

  // Select random song on component mount
  React.useEffect(() => {
    const randomIndex = Math.floor(Math.random() * AVAILABLE_SONGS.length);
    setCurrentSong(AVAILABLE_SONGS[randomIndex]);
  }, []);

  return (
    <div
      ref={danceAreaRef}
      className={`bg-gray-950 relative overflow-hidden shadow-inner hover-trail transition-all duration-1000 ease-in-out ${
        isFullscreen
          ? "fixed inset-0 z-50 h-screen w-screen border-0"
          : isPlaying
          ? "h-[100vh] border-b-8 border-purple-400/80 shadow-purple-400/40 shadow-2xl"
          : "h-[50vh] border-b-4 border-gray-800"
      }`}
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
        isPlaying={isPlaying}
        isFullscreen={isFullscreen}
        isExpanded={isPlaying && !isFullscreen}
        isMobile={isMobile}
      />

      {/* Expansion Indicator - appears when expanding */}
      {isPlaying && !isFullscreen && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 opacity-0 animate-rave-fade-in-out-once px-4 max-w-[90vw]">
          <div className="flex items-center space-x-2 sm:space-x-3 bg-black/70 backdrop-blur-md rounded-full px-4 sm:px-6 py-3 border border-purple-400/60 shadow-2xl min-w-max">
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-rave-particle-glow shadow-purple-400/80 shadow-lg flex-shrink-0"></div>
            <span className="text-purple-200 text-sm sm:text-base font-semibold whitespace-nowrap">
              🎵 Dance Mode Active 🎵
            </span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 animate-bounce flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7l4-4m0 0l4 4m-4-4v18"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Fullscreen Button */}
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

      {/* Audio Status Indicator */}
      {isPlaying && (
        <button
          onClick={toggleAudio}
          className="fixed top-4 right-4 z-50 flex items-center space-x-2 bg-black/40 backdrop-blur-md rounded-full px-4 py-2 shadow-lg hover:bg-black/60 transition-all duration-300 cursor-pointer group border-trace-rave-rounded"
          title="Click to stop dancing"
        >
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-purple-400/50 shadow-sm group-hover:bg-red-400 transition-colors duration-300"></div>
          <span className="text-purple-200 text-sm font-medium group-hover:text-red-200 transition-colors duration-300">
            Dance Mode Active
          </span>
        </button>
      )}

      {!isPlaying && (
        <button
          onClick={toggleAudio}
          className="fixed top-4 right-4 z-50 flex items-center space-x-2 bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-gray-600/40 shadow-lg hover:border-purple-500/40 hover:bg-black/60 transition-all duration-300 cursor-pointer group"
          title="Click to start dancing"
        >
          <div className="w-2 h-2 bg-gray-400 rounded-full group-hover:bg-purple-400 transition-colors duration-300"></div>
          <span className="text-gray-300 text-sm font-medium group-hover:text-purple-200 transition-colors duration-300">
            Press 舞 to awaken
          </span>
        </button>
      )}

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
      <DanceButton isPlaying={isPlaying} toggleAudio={toggleAudio} />

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
