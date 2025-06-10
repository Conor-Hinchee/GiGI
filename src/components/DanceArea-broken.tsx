import React from "react";
import { DanceAreaProps } from "../types";
import FirefliesScene from "./FirefliesScene";
import { DanceButton } from "./DanceButton";

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
  return (
    <div
      ref={danceAreaRef}
      className={`bg-gray-950 relative overflow-hidden shadow-inner hover-trail transition-all duration-1000 ease-in-out ${
        isFullscreen
          ? "fixed inset-0 z-50 h-screen w-screen border-0"
          : isPlaying
          ? "h-[75vh] border-b-4 border-purple-500/60 shadow-purple-500/20 shadow-lg"
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
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 opacity-0 animate-fade-in-out">
          <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 border border-purple-500/40 shadow-lg">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-purple-200 text-sm font-medium">
              Dance area expanding...
            </span>
            <svg
              className="w-4 h-4 text-purple-400 animate-bounce"
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
        <div className="absolute top-4 right-4 z-30 flex items-center space-x-2 bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-purple-500/40 shadow-lg">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse shadow-purple-400/50 shadow-sm"></div>
          <span className="text-purple-200 text-sm font-medium">
            Rave Mode Active
          </span>
        </div>
      )}

      {!isPlaying && (
        <div className="absolute top-4 right-4 z-30 flex items-center space-x-2 bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-gray-600/40 shadow-lg">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span className="text-gray-300 text-sm font-medium">
            Press 舞 to awaken
          </span>
        </div>
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
        <button
          onClick={toggleAudio}
          className={`group relative w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 hover:rotate-12 hover:shadow-purple-500/60 ${
            isPlaying
              ? "animate-bounce shadow-purple-500/60"
              : "shadow-purple-400/20"
          } gigi-hero-btn`}
        >
          {/* Desktop-only: Advanced hover trails that mobile won't see - RAVE MODE ACTIVE */}
          <div
            className={`hidden lg:block absolute -inset-8 transition-all duration-700 ${
              isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
            <div className="absolute inset-2 bg-gradient-to-l from-blue-500/15 via-purple-500/15 to-red-500/15 rounded-full blur-lg animate-ping"></div>
          </div>

          {/* Desktop-only: Hover particle effects - RAVE MODE ACTIVE */}
          <div
            className={`hidden xl:block absolute -inset-12 transition-all duration-1000 ${
              isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <div
              className="absolute top-0 left-1/2 w-1 h-1 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute top-1/4 right-0 w-0.5 h-0.5 bg-pink-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="absolute bottom-0 left-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <div
              className="absolute top-3/4 left-0 w-1 h-1 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.6s" }}
            ></div>
          </div>

          {/* Outer glow ring - enhanced when playing with better hover - RAVE MODE ACTIVE */}
          <div
            className={`absolute -inset-2 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-full blur opacity-75 transition-all duration-500 ${
              isPlaying
                ? "animate-spin opacity-100"
                : "group-hover:opacity-100 group-hover:scale-110"
            }`}
          ></div>

          {/* Desktop-only: Sophisticated hover ring that rotates opposite direction - RAVE MODE ACTIVE */}
          <div
            className={`hidden md:block absolute -inset-3 transition-all duration-700 ${
              isPlaying ? "opacity-70" : "opacity-0 group-hover:opacity-70"
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-tr from-cyan-400/30 via-purple-400/30 to-pink-400/30 rounded-full blur ${
                isPlaying
                  ? "animate-reverse-spin"
                  : "group-hover:animate-reverse-spin"
              }`}
            ></div>
          </div>

          {/* Firefly sync glow - only visible when playing */}
          {isPlaying && (
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-yellow-400/20 rounded-full blur-lg animate-pulse group-hover:scale-125 transition-transform duration-500"></div>
          )}

          {/* Inner button with enhanced hover effects - RAVE MODE ACTIVE */}
          <div
            className={`relative w-full h-full bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full flex items-center justify-center border border-purple-400/30 transition-all duration-500 ${
              isPlaying
                ? "animate-pulse shadow-[inset_0_4px_20px_rgba(255,255,255,0.4)]"
                : "shadow-[inset_0_2px_10px_rgba(255,255,255,0.2)] group-hover:shadow-[inset_0_4px_20px_rgba(255,255,255,0.4)]"
            }`}
          >
            <span
              className={`text-white text-3xl font-bold drop-shadow-lg transition-all duration-300 ${
                isPlaying
                  ? "text-yellow-200"
                  : "group-hover:scale-110 group-hover:text-yellow-200"
              } gigi-hero-text`}
            >
              舞
            </span>
          </div>

          {/* Enhanced highlight effect with hover - RAVE MODE ACTIVE */}
          <div
            className={`absolute top-3 left-3 w-4 h-4 bg-white/30 rounded-full blur-sm transition-all duration-300 ${
              isPlaying
                ? "bg-white/60"
                : "group-hover:bg-white/60 group-hover:scale-150"
            }`}
          ></div>

          {/* Desktop-only: Additional highlight that appears on hover - RAVE MODE ACTIVE */}
          <div
            className={`hidden lg:block absolute top-2 right-2 w-2 h-2 rounded-full blur-sm transition-all duration-500 ${
              isPlaying
                ? "bg-cyan-300/50"
                : "bg-cyan-300/0 group-hover:bg-cyan-300/80 group-hover:scale-200"
            }`}
          ></div>

          {/* Play/Pause indicator with better hover state - RAVE MODE ACTIVE */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isPlaying
                  ? "bg-green-300 animate-pulse scale-150"
                  : "bg-gray-400 group-hover:bg-purple-300 group-hover:scale-125"
              }`}
            ></div>
          </div>

          {/* Desktop-only: Hover tooltip that mobile won't see */}
          <div className="hidden lg:block absolute -top-12 left-1/2 transform -translate-x-1/2 transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100">
            <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-purple-400/50">
              {isPlaying ? "Stop the music" : "Start the party"}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black/80"></div>
          </div>
        </button>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source
          src="Gigi D'Agostino & Luca Noise - Smoke A Beat [ From the album SMODERANZA ] [w3KP8UhTdys].mp3"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>

      {/* Ambient particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse z-15"></div>
      <div
        className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400/40 rounded-full animate-pulse z-15"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-400/20 rounded-full animate-pulse z-15"
        style={{ animationDelay: "2s" }}
      ></div>
    </div>
  );
};
