"use client";

import React, { useState, useRef } from "react";
import FirefliesScene from "../components/FirefliesScene";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const danceAreaRef = useRef<HTMLDivElement>(null);

  const toggleAudio = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Resume audio context if suspended (required by modern browsers)
        try {
          const audioContext = (
            window as unknown as { audioContext?: AudioContext }
          ).audioContext;
          if (audioContext && audioContext.state === "suspended") {
            await audioContext.resume();
          }
        } catch (error) {
          console.log("Audio context resume failed:", error);
        }

        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (danceAreaRef.current) {
        try {
          await danceAreaRef.current.requestFullscreen();
          setIsFullscreen(true);
        } catch (err) {
          console.log("Fullscreen failed:", err);
        }
      }
    } else {
      // Exit fullscreen
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.log("Exit fullscreen failed:", err);
      }
    }
  };

  // Listen for fullscreen changes
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Dance Area - Responsive Height */}
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
              Fireflies Dancing
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <button
            onClick={toggleAudio}
            className={`group relative w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 hover:rotate-12 hover:shadow-purple-500/60 ${
              isPlaying
                ? "animate-bounce shadow-purple-500/60"
                : "shadow-purple-400/20"
            }`}
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
                }`}
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

            {/* Desktop-only: Hover tooltip that mobile won't see - RAVE MODE ACTIVE */}
            <div
              className={`hidden lg:block absolute -top-12 left-1/2 transform -translate-x-1/2 transition-all duration-300 pointer-events-none ${
                isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-purple-400/50">
                {isPlaying ? "🎉 RAVE MODE ACTIVE! 🎉" : "Start the party"}
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
            src="/Gigi D'Agostino - Cuba Libre ( L'Amour Toujours ) [UWMYjD16qFc].mp3"
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

      {/* Main content - Responsive Bottom Area */}
      <div
        className={`flex items-center justify-center p-4 bg-gray-900 transition-all duration-1000 ease-in-out ${
          isPlaying ? "min-h-[25vh]" : "min-h-[50vh]"
        }`}
      >
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Main Artist Name */}
          <div className="space-y-6 relative">
            {/* Desktop-only: Background text effect */}
            <div className="hidden xl:block absolute inset-0 -z-10">
              <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white/5 tracking-wider uppercase blur-sm transform scale-110">
                GiGi D&apos;Agostino
              </h1>
            </div>

            <h1
              className={`text-7xl md:text-8xl lg:text-9xl font-black tracking-wider uppercase transition-all duration-700 cursor-default relative ${
                isPlaying
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600"
                  : "text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-gold-300 hover:via-gold-400 hover:to-gold-600"
              }`}
            >
              <span className="relative z-10">GiGi D&apos;Agostino</span>
              {/* Desktop-only: Shimmer effect on hover - RAVE MODE ACTIVE */}
              <div
                className={`hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-gold-300/30 to-transparent -skew-x-12 transition-opacity duration-500 ${
                  isPlaying
                    ? "opacity-100 animate-shimmer"
                    : "opacity-0 hover:opacity-100 hover:animate-shimmer"
                }`}
              ></div>
            </h1>

            <h2
              className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide uppercase transition-colors duration-500 ${
                isPlaying
                  ? "text-purple-200"
                  : "text-white hover:text-purple-200"
              }`}
            ></h2>
            <div
              className={`mx-auto transition-all duration-500 ${
                isPlaying
                  ? "w-64 h-2 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 shadow-gold-500/50 shadow-lg"
                  : "w-32 h-1 bg-white hover:w-64 hover:h-2 hover:bg-gradient-to-r hover:from-gold-300 hover:via-gold-400 hover:to-gold-600 hover:shadow-gold-500/50 hover:shadow-lg"
              }`}
            ></div>
          </div>

          {/* Tour Dates Header */}
          <div className="mt-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest mb-8">
              World Tour 2025
            </h3>

            {/* Tour Dates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
              <div
                className={`bg-gray-800/50 backdrop-blur p-6 rounded-lg border transition-all duration-300 hover-trail group relative ${
                  isPlaying
                    ? "border-purple-500 transform scale-105 shadow-purple-500/20 shadow-lg"
                    : "border-gray-700 hover:border-purple-500 hover:transform hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg"
                }`}
              >
                {/* Desktop-only: Hover particle effect - RAVE MODE ACTIVE */}
                <div
                  className={`hidden lg:block absolute -top-2 -right-2 w-4 h-4 rounded-full blur-sm transition-all duration-500 ${
                    isPlaying
                      ? "bg-purple-400/60 animate-ping"
                      : "bg-purple-400/0 group-hover:bg-purple-400/60 group-hover:animate-ping"
                  }`}
                ></div>
                <div className="flex justify-between items-center">
                  <div>
                    <p
                      className={`font-bold text-lg transition-colors ${
                        isPlaying
                          ? "text-purple-200"
                          : "text-white group-hover:text-purple-200"
                      }`}
                    >
                      TOKYO
                    </p>
                    <p
                      className={`transition-colors ${
                        isPlaying
                          ? "text-gray-200"
                          : "text-gray-300 group-hover:text-gray-200"
                      }`}
                    >
                      Shibuya Sky Arena
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold transition-colors ${
                        isPlaying
                          ? "text-purple-300"
                          : "text-purple-400 group-hover:text-purple-300"
                      }`}
                    >
                      JUN 15
                    </p>
                    <p
                      className={`text-sm transition-colors ${
                        isPlaying
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300"
                      }`}
                    >
                      2025
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`bg-gray-800/50 backdrop-blur p-6 rounded-lg border transition-all duration-300 hover-trail group relative ${
                  isPlaying
                    ? "border-purple-500 transform scale-105 shadow-purple-500/20 shadow-lg"
                    : "border-gray-700 hover:border-purple-500 hover:transform hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg"
                }`}
              >
                <div
                  className={`hidden lg:block absolute -top-2 -right-2 w-4 h-4 rounded-full blur-sm transition-all duration-500 ${
                    isPlaying
                      ? "bg-pink-400/60 animate-ping"
                      : "bg-pink-400/0 group-hover:bg-pink-400/60 group-hover:animate-ping"
                  }`}
                ></div>
                <div className="flex justify-between items-center">
                  <div>
                    <p
                      className={`font-bold text-lg transition-colors ${
                        isPlaying
                          ? "text-pink-200"
                          : "text-white group-hover:text-pink-200"
                      }`}
                    >
                      LONDON
                    </p>
                    <p
                      className={`transition-colors ${
                        isPlaying
                          ? "text-gray-200"
                          : "text-gray-300 group-hover:text-gray-200"
                      }`}
                    >
                      O2 Arena
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold transition-colors ${
                        isPlaying
                          ? "text-pink-300"
                          : "text-purple-400 group-hover:text-pink-300"
                      }`}
                    >
                      JUL 03
                    </p>
                    <p
                      className={`text-sm transition-colors ${
                        isPlaying
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300"
                      }`}
                    >
                      2025
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`bg-gray-800/50 backdrop-blur p-6 rounded-lg border transition-all duration-300 hover-trail group relative ${
                  isPlaying
                    ? "border-purple-500 transform scale-105 shadow-purple-500/20 shadow-lg"
                    : "border-gray-700 hover:border-purple-500 hover:transform hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg"
                }`}
              >
                <div
                  className={`hidden lg:block absolute -top-2 -right-2 w-4 h-4 rounded-full blur-sm transition-all duration-500 ${
                    isPlaying
                      ? "bg-blue-400/60 animate-ping"
                      : "bg-blue-400/0 group-hover:bg-blue-400/60 group-hover:animate-ping"
                  }`}
                ></div>
                <div className="flex justify-between items-center">
                  <div>
                    <p
                      className={`font-bold text-lg transition-colors ${
                        isPlaying
                          ? "text-blue-200"
                          : "text-white group-hover:text-blue-200"
                      }`}
                    >
                      NEW YORK
                    </p>
                    <p
                      className={`transition-colors ${
                        isPlaying
                          ? "text-gray-200"
                          : "text-gray-300 group-hover:text-gray-200"
                      }`}
                    >
                      Madison Square Garden
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold transition-colors ${
                        isPlaying
                          ? "text-blue-300"
                          : "text-purple-400 group-hover:text-blue-300"
                      }`}
                    >
                      AUG 20
                    </p>
                    <p
                      className={`text-sm transition-colors ${
                        isPlaying
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300"
                      }`}
                    >
                      2025
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`bg-gray-800/50 backdrop-blur p-6 rounded-lg border transition-all duration-300 hover-trail group relative ${
                  isPlaying
                    ? "border-purple-500 transform scale-105 shadow-purple-500/20 shadow-lg"
                    : "border-gray-700 hover:border-purple-500 hover:transform hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg"
                }`}
              >
                <div
                  className={`hidden lg:block absolute -top-2 -right-2 w-4 h-4 rounded-full blur-sm transition-all duration-500 ${
                    isPlaying
                      ? "bg-green-400/60 animate-ping"
                      : "bg-green-400/0 group-hover:bg-green-400/60 group-hover:animate-ping"
                  }`}
                ></div>
                <div className="flex justify-between items-center">
                  <div>
                    <p
                      className={`font-bold text-lg transition-colors ${
                        isPlaying
                          ? "text-green-200"
                          : "text-white group-hover:text-green-200"
                      }`}
                    >
                      SYDNEY
                    </p>
                    <p
                      className={`transition-colors ${
                        isPlaying
                          ? "text-gray-200"
                          : "text-gray-300 group-hover:text-gray-200"
                      }`}
                    >
                      Qudos Bank Arena
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold transition-colors ${
                        isPlaying
                          ? "text-green-300"
                          : "text-purple-400 group-hover:text-green-300"
                      }`}
                    >
                      SEP 12
                    </p>
                    <p
                      className={`text-sm transition-colors ${
                        isPlaying
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300"
                      }`}
                    >
                      2025
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`bg-gray-800/50 backdrop-blur p-6 rounded-lg border transition-all duration-300 hover-trail group relative ${
                  isPlaying
                    ? "border-purple-500 transform scale-105 shadow-purple-500/20 shadow-lg"
                    : "border-gray-700 hover:border-purple-500 hover:transform hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg"
                }`}
              >
                <div
                  className={`hidden lg:block absolute -top-2 -right-2 w-4 h-4 rounded-full blur-sm transition-all duration-500 ${
                    isPlaying
                      ? "bg-yellow-400/60 animate-ping"
                      : "bg-yellow-400/0 group-hover:bg-yellow-400/60 group-hover:animate-ping"
                  }`}
                ></div>
                <div className="flex justify-between items-center">
                  <div>
                    <p
                      className={`font-bold text-lg transition-colors ${
                        isPlaying
                          ? "text-yellow-200"
                          : "text-white group-hover:text-yellow-200"
                      }`}
                    >
                      BERLIN
                    </p>
                    <p
                      className={`transition-colors ${
                        isPlaying
                          ? "text-gray-200"
                          : "text-gray-300 group-hover:text-gray-200"
                      }`}
                    >
                      Mercedes-Benz Arena
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold transition-colors ${
                        isPlaying
                          ? "text-yellow-300"
                          : "text-purple-400 group-hover:text-yellow-300"
                      }`}
                    >
                      OCT 05
                    </p>
                    <p
                      className={`text-sm transition-colors ${
                        isPlaying
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300"
                      }`}
                    >
                      2025
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`bg-gray-800/50 backdrop-blur p-6 rounded-lg border transition-all duration-300 hover-trail group relative ${
                  isPlaying
                    ? "border-purple-500 transform scale-105 shadow-purple-500/20 shadow-lg"
                    : "border-gray-700 hover:border-purple-500 hover:transform hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg"
                }`}
              >
                <div
                  className={`hidden lg:block absolute -top-2 -right-2 w-4 h-4 rounded-full blur-sm transition-all duration-500 ${
                    isPlaying
                      ? "bg-red-400/60 animate-ping"
                      : "bg-red-400/0 group-hover:bg-red-400/60 group-hover:animate-ping"
                  }`}
                ></div>
                <div className="flex justify-between items-center">
                  <div>
                    <p
                      className={`font-bold text-lg transition-colors ${
                        isPlaying
                          ? "text-red-200"
                          : "text-white group-hover:text-red-200"
                      }`}
                    >
                      SAO PAULO
                    </p>
                    <p
                      className={`transition-colors ${
                        isPlaying
                          ? "text-gray-200"
                          : "text-gray-300 group-hover:text-gray-200"
                      }`}
                    >
                      Allianz Parque
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold transition-colors ${
                        isPlaying
                          ? "text-red-300"
                          : "text-purple-400 group-hover:text-red-300"
                      }`}
                    >
                      NOV 18
                    </p>
                    <p
                      className={`text-sm transition-colors ${
                        isPlaying
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300"
                      }`}
                    >
                      2025
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest mb-8">
              Follow GiGi
            </h3>

            <div className="flex justify-center space-x-6 md:space-x-8">
              {/* Facebook - RAVE MODE ACTIVE */}
              <a
                href="#"
                className={`group bg-gray-800/50 backdrop-blur p-4 rounded-full border transition-all duration-300 transform ${
                  isPlaying
                    ? "border-blue-500 bg-blue-500/20 scale-110"
                    : "border-gray-700 hover:border-blue-500 hover:bg-blue-500/20 hover:scale-110"
                }`}
              >
                <svg
                  className={`w-8 h-8 transition-colors ${
                    isPlaying
                      ? "text-blue-400"
                      : "text-gray-300 group-hover:text-blue-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Twitter - RAVE MODE ACTIVE */}
              <a
                href="#"
                className={`group bg-gray-800/50 backdrop-blur p-4 rounded-full border transition-all duration-300 transform ${
                  isPlaying
                    ? "border-sky-500 bg-sky-500/20 scale-110"
                    : "border-gray-700 hover:border-sky-500 hover:bg-sky-500/20 hover:scale-110"
                }`}
              >
                <svg
                  className={`w-8 h-8 transition-colors ${
                    isPlaying
                      ? "text-sky-400"
                      : "text-gray-300 group-hover:text-sky-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>

              {/* Instagram - RAVE MODE ACTIVE */}
              <a
                href="#"
                className={`group bg-gray-800/50 backdrop-blur p-4 rounded-full border transition-all duration-300 transform ${
                  isPlaying
                    ? "border-pink-500 bg-pink-500/20 scale-110"
                    : "border-gray-700 hover:border-pink-500 hover:bg-pink-500/20 hover:scale-110"
                }`}
              >
                <svg
                  className={`w-8 h-8 transition-colors ${
                    isPlaying
                      ? "text-pink-400"
                      : "text-gray-300 group-hover:text-pink-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.205-1.535-.757-.939-1.173-2.145-1.173-3.402 0-1.258.416-2.464 1.173-3.403.757-.939 1.908-1.535 3.205-1.535s2.448.596 3.205 1.535c.757.939 1.173 2.145 1.173 3.403 0 1.257-.416 2.463-1.173 3.402-.757.939-1.908 1.535-3.205 1.535zm7.718 0c-1.297 0-2.448-.596-3.205-1.535-.757-.939-1.173-2.145-1.173-3.402 0-1.258.416-2.464 1.173-3.403.757-.939 1.908-1.535 3.205-1.535s2.448.596 3.205 1.535c.757.939 1.173 2.145 1.173 3.403 0 1.257-.416 2.463-1.173 3.402-.757.939-1.908 1.535-3.205 1.535z" />
                </svg>
              </a>

              {/* Snapchat - RAVE MODE ACTIVE */}
              <a
                href="#"
                className={`group bg-gray-800/50 backdrop-blur p-4 rounded-full border transition-all duration-300 transform ${
                  isPlaying
                    ? "border-yellow-500 bg-yellow-500/20 scale-110"
                    : "border-gray-700 hover:border-yellow-500 hover:bg-yellow-500/20 hover:scale-110"
                }`}
              >
                <svg
                  className={`w-8 h-8 transition-colors ${
                    isPlaying
                      ? "text-yellow-400"
                      : "text-gray-300 group-hover:text-yellow-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.205-1.535-.757-.939-1.173-2.145-1.173-3.402 0-1.258.416-2.464 1.173-3.403.757-.939 1.908-1.535 3.205-1.535s2.448.596 3.205 1.535c.757.939 1.173 2.145 1.173 3.403 0 1.257-.416 2.463-1.173 3.402-.757.939-1.908 1.535-3.205 1.535zm7.718 0c-1.297 0-2.448-.596-3.205-1.535-.757-.939-1.173-2.145-1.173-3.402 0-1.258.416-2.464 1.173-3.403.757-.939 1.908-1.535 3.205-1.535s2.448.596 3.205 1.535c.757.939 1.173 2.145 1.173 3.403 0 1.257-.416 2.463-1.173 3.402-.757.939-1.908 1.535-3.205 1.535z" />
                </svg>
              </a>
            </div>

            <p className="text-gray-400 mt-6 text-sm">
              Stay connected for exclusive content and behind-the-scenes updates
            </p>
          </div>

          {/* Tech stack indicator */}
          <div className="mt-12 p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <span className="text-sm font-mono">Powered by</span>
              <span className="text-blue-400 font-semibold">Next.js</span>
              <span className="text-gray-500">•</span>
              <span className="text-cyan-400 font-semibold">Tailwind CSS</span>
              <span className="text-gray-500">•</span>
              <span className="text-white font-semibold">Dark Mode</span>
            </div>
          </div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
