"use client";

import React, { useState, useRef, useEffect } from "react";
import FirefliesScene from "../components/FirefliesScene";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
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
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
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

      {/* Main content - Responsive Bottom Area with Parallax */}
      <div
        className={`relative flex items-center justify-center p-4 transition-all duration-1000 ease-in-out overflow-hidden ${
          isPlaying ? "min-h-[150vh]" : "min-h-[200vh]"
        } gigi-main-content`}
        style={{
          background: `
            linear-gradient(
              ${135 + Math.sin(scrollY * 0.002) * 45}deg,
              rgb(17, 24, 39) 0%,
              rgb(${31 + Math.sin(scrollY * 0.003) * 20}, ${
            41 + Math.cos(scrollY * 0.004) * 30
          }, ${59 + Math.sin(scrollY * 0.005) * 40}) 50%,
              rgb(17, 24, 39) 100%
            )
          `,
        }}
      >
        {/* Parallax Background Layers */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Layer 0.5 - Ultra-slow floating mini-images for depth */}
          <div
            className="absolute inset-0 opacity-8 parallax-layer"
            style={{
              transform: `translateY(${scrollY * 0.05}px) rotate(${
                scrollY * 0.002
              }deg)`,
            }}
          >
            {/* Tiny floating GiGi portraits */}
            <div
              className={`absolute top-1/8 left-1/12 w-8 h-12 bg-cover bg-center rounded-md opacity-40 blur-lg ${
                isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/gigi1.png')",
                filter:
                  "sepia(60%) hue-rotate(240deg) brightness(0.4) contrast(2.0)",
                mixBlendMode: "soft-light",
                animationDelay: "0s",
                animationDuration: "20s",
              }}
            />

            <div
              className={`absolute top-3/8 right-1/10 w-6 h-6 bg-cover bg-center rounded-full opacity-30 blur-md ${
                isPlaying
                  ? "animate-rave-mode-image-dance"
                  : "animate-responsive-image-scale"
              }`}
              style={{
                backgroundImage: "url('/舞.png')",
                filter:
                  "sepia(40%) hue-rotate(300deg) brightness(0.6) contrast(1.8)",
                mixBlendMode: "color-dodge",
                animationDelay: "5s",
                animationDuration: "25s",
              }}
            />

            <div
              className={`absolute bottom-2/5 left-1/5 w-10 h-6 bg-cover bg-center rounded-lg opacity-35 blur-lg ${
                isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/wave.jpg')",
                filter:
                  "sepia(80%) hue-rotate(200deg) brightness(0.3) contrast(2.2)",
                mixBlendMode: "multiply",
                animationDelay: "10s",
                animationDuration: "30s",
              }}
            />

            <div
              className={`absolute top-2/3 right-1/8 w-7 h-7 bg-cover bg-center rounded-full opacity-25 blur-xl ${
                isPlaying
                  ? "animate-rave-mode-image-dance"
                  : "animate-responsive-image-scale"
              }`}
              style={{
                backgroundImage: "url('/totaleclipse.jpg')",
                filter:
                  "sepia(90%) hue-rotate(180deg) brightness(0.2) contrast(3.0)",
                mixBlendMode: "overlay",
                animationDelay: "15s",
                animationDuration: "35s",
              }}
            />
          </div>

          {/* Layer 1 - Slowest moving background with GiGi images */}
          <div
            className="absolute inset-0 opacity-10 parallax-layer"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 50% 90%, rgba(59, 130, 246, 0.25) 0%, transparent 50%)
              `,
              backgroundSize: "400px 400px, 300px 300px, 500px 500px",
              backgroundPosition: "0% 0%, 100% 0%, 50% 100%",
            }}
          />

          {/* Layer 1.5 - GiGi Portrait Images (Very slow parallax) */}
          <div
            className="absolute inset-0 opacity-15 parallax-layer"
            style={{
              transform: `translateY(${scrollY * 0.15}px) scale(${
                1 + scrollY * 0.0001
              })`,
            }}
          >
            {/* GiGi Portrait 1 */}
            <div
              className={`absolute top-1/4 right-1/6 w-32 h-48 bg-cover bg-center rounded-lg opacity-60 blur-sm ${
                isPlaying
                  ? "animate-rave-mode-image-dance"
                  : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/gigi1.png')",
                filter:
                  "sepia(30%) hue-rotate(240deg) brightness(0.7) contrast(1.2)",
                mixBlendMode: "overlay",
              }}
            />

            {/* GiGi Portrait 2 */}
            <div
              className={`absolute bottom-1/3 left-1/8 w-40 h-60 bg-cover bg-center rounded-lg opacity-50 blur-sm ${
                isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/gigi2.jpg')",
                filter:
                  "sepia(40%) hue-rotate(280deg) brightness(0.6) contrast(1.3)",
                mixBlendMode: "soft-light",
                transform: `rotate(${scrollY * 0.02}deg)`,
                animationDelay: "1s",
              }}
            />

            {/* GiGi Portrait 3 - New addition */}
            <div
              className={`absolute top-1/6 left-1/2 w-28 h-42 bg-cover bg-center rounded-lg opacity-55 blur-sm ${
                isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/gigi3.jpg')",
                filter:
                  "sepia(35%) hue-rotate(320deg) brightness(0.8) contrast(1.4)",
                mixBlendMode: "color-burn",
                transform: `translateX(-50%) rotate(${scrollY * -0.015}deg)`,
                animationDelay: "3s",
              }}
            />

            {/* L'amour Toujours album art */}
            <div
              className={`absolute bottom-1/6 right-1/3 w-44 h-32 bg-cover bg-center rounded-xl opacity-45 blur-md ${
                isPlaying
                  ? "animate-rave-mode-image-dance"
                  : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/L'amour_toujours.JPG')",
                filter:
                  "sepia(45%) hue-rotate(200deg) brightness(0.9) contrast(1.3)",
                mixBlendMode: "overlay",
                animationDelay: "4s",
              }}
            />

            {/* Live performance image */}
            <div
              className={`absolute top-1/2 left-1/8 w-36 h-24 bg-cover bg-center rounded-lg opacity-50 blur-sm ${
                isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/live.jpg')",
                filter:
                  "sepia(40%) hue-rotate(350deg) brightness(1.1) contrast(1.2)",
                mixBlendMode: "screen",
                transform: `translateY(${scrollY * 0.05}px)`,
                animationDelay: "5s",
              }}
            />

            {/* Beautiful abstract image */}
            <div
              className={`absolute top-3/4 right-1/4 w-36 h-36 bg-cover bg-center rounded-full opacity-40 blur-md ${
                isPlaying
                  ? "animate-rave-mode-image-dance"
                  : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/beautiful.jpg')",
                filter:
                  "sepia(50%) hue-rotate(300deg) brightness(0.8) contrast(1.1)",
                mixBlendMode: "color-dodge",
                animationDelay: "2s",
              }}
            />
          </div>

          {/* Layer 2 - Medium speed background with album artwork */}
          <div
            className="absolute inset-0 opacity-15 parallax-layer"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              backgroundImage: `
                linear-gradient(45deg, transparent 40%, rgba(147, 51, 234, 0.1) 50%, transparent 60%),
                linear-gradient(-45deg, transparent 40%, rgba(236, 72, 153, 0.1) 50%, transparent 60%)
              `,
              backgroundSize: "200px 200px, 150px 150px",
              backgroundPosition: "0% 0%, 50% 50%",
            }}
          >
            {/* Album/Event Images */}
            <div
              className={`absolute top-1/6 left-1/3 w-24 h-24 bg-cover bg-center rounded-lg opacity-70 blur-sm ${
                isPlaying
                  ? "animate-rave-mode-image-dance"
                  : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/2023-12-11-b.jpg')",
                filter:
                  "sepia(30%) hue-rotate(260deg) brightness(0.9) contrast(1.2)",
                mixBlendMode: "multiply",
                transform: `rotate(${-scrollY * 0.03}deg)`,
                animationDelay: "0.5s",
              }}
            />

            <div
              className={`absolute bottom-1/4 right-1/6 w-28 h-28 bg-cover bg-center rounded-full opacity-60 blur-sm ${
                isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/2410soundoflove(1).jpg')",
                filter:
                  "sepia(25%) hue-rotate(300deg) brightness(1.1) contrast(1.1)",
                mixBlendMode: "screen",
                animationDelay: "1.5s",
              }}
            />

            {/* Total Eclipse themed element */}
            <div
              className={`absolute top-2/3 left-1/8 w-32 h-20 bg-cover bg-center rounded-xl opacity-50 blur-md ${
                isPlaying
                  ? "animate-rave-mode-image-dance"
                  : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/totaleclipse.jpg')",
                filter:
                  "sepia(60%) hue-rotate(240deg) brightness(0.7) contrast(1.4)",
                mixBlendMode: "overlay",
                transform: `translateX(${scrollY * 0.1}px)`,
                animationDelay: "2.5s",
              }}
            />

            {/* MaxRes Default - Music video thumbnail */}
            <div
              className={`absolute top-1/8 right-1/8 w-20 h-15 bg-cover bg-center rounded-md opacity-65 blur-sm ${
                isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/maxresdefault.jpg')",
                filter:
                  "sepia(50%) hue-rotate(180deg) brightness(1.2) contrast(1.1)",
                mixBlendMode: "multiply",
                transform: `rotate(${scrollY * 0.04}deg)`,
                animationDelay: "3.5s",
              }}
            />

            {/* Wave pattern image */}
            <div
              className={`absolute bottom-1/8 left-1/4 w-40 h-20 bg-cover bg-center rounded-2xl opacity-40 blur-lg ${
                isPlaying
                  ? "animate-rave-mode-image-dance"
                  : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/wave.jpg')",
                filter:
                  "sepia(30%) hue-rotate(220deg) brightness(0.8) contrast(1.5)",
                mixBlendMode: "color-dodge",
                transform: `translateX(${scrollY * -0.08}px)`,
                animationDelay: "4.5s",
              }}
            />
          </div>

          {/* Layer 3 - Faster moving particles with image fragments */}
          <div
            className="absolute inset-0 opacity-20 parallax-layer"
            style={{
              transform: `translateY(${scrollY * 0.5}px)`,
              backgroundImage: `
                radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.4) 1px, transparent 0),
                radial-gradient(circle at 1px 1px, rgba(147, 51, 234, 0.6) 1px, transparent 0)
              `,
              backgroundSize: "50px 50px, 75px 75px",
              backgroundPosition: "0 0, 25px 25px",
            }}
          >
            {/* Floating image fragments */}
            <div
              className={`absolute top-1/2 right-1/3 w-16 h-16 bg-cover bg-center rounded-full opacity-80 blur-sm ${
                isPlaying ? "animate-rave-mode-image-dance" : "animate-pulse"
              }`}
              style={{
                backgroundImage: "url('/gigi1.png')",
                filter:
                  "sepia(40%) hue-rotate(280deg) brightness(1.2) contrast(1.3)",
                mixBlendMode: "color-burn",
                transform: `translateY(${scrollY * 0.2}px) rotate(${
                  scrollY * 0.05
                }deg)`,
              }}
            />

            <div
              className={`absolute top-1/5 left-2/3 w-12 h-12 bg-cover bg-center rounded-lg opacity-60 blur-sm ${
                isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/beautiful.jpg')",
                filter:
                  "sepia(30%) hue-rotate(320deg) brightness(1.4) contrast(0.9)",
                mixBlendMode: "hard-light",
                transform: `translateX(${-scrollY * 0.15}px)`,
                animationDelay: "1s",
              }}
            />

            {/* New floating fragments with new images */}
            <div
              className={`absolute bottom-1/3 left-1/4 w-14 h-14 bg-cover bg-center rounded-full opacity-70 blur-sm ${
                isPlaying
                  ? "animate-rave-mode-image-dance"
                  : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/gigi3.jpg')",
                filter:
                  "sepia(35%) hue-rotate(340deg) brightness(1.3) contrast(1.2)",
                mixBlendMode: "screen",
                transform: `translateY(${scrollY * 0.3}px) rotate(${
                  -scrollY * 0.04
                }deg)`,
                animationDelay: "2s",
              }}
            />

            <div
              className={`absolute top-3/4 right-1/5 w-10 h-10 bg-cover bg-center rounded-lg opacity-75 blur-sm ${
                isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/舞.png')",
                filter:
                  "sepia(20%) hue-rotate(270deg) brightness(1.5) contrast(1.4)",
                mixBlendMode: "color-dodge",
                transform: `translateX(${scrollY * 0.12}px)`,
                animationDelay: "3s",
              }}
            />

            <div
              className={`absolute top-1/8 left-1/5 w-18 h-12 bg-cover bg-center rounded-xl opacity-65 blur-sm ${
                isPlaying
                  ? "animate-rave-mode-image-dance"
                  : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/Untitled.jpg')",
                filter:
                  "sepia(45%) hue-rotate(190deg) brightness(1.1) contrast(1.3)",
                mixBlendMode: "multiply",
                transform: `translateY(${-scrollY * 0.18}px)`,
                animationDelay: "4s",
              }}
            />
          </div>

          {/* Layer 4 - Abstract shapes with image overlays */}
          <div
            className="absolute inset-0 opacity-5 parallax-layer"
            style={{
              transform: `translateY(${scrollY * 0.7}px) rotate(${
                scrollY * 0.02
              }deg)`,
            }}
          >
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />

            {/* Large background images with heavy blur and low opacity */}
            <div
              className="absolute top-1/3 left-1/5 w-80 h-80 bg-cover bg-center rounded-full opacity-20 blur-3xl"
              style={{
                backgroundImage: "url('/gigi2.jpg')",
                filter:
                  "sepia(70%) hue-rotate(250deg) brightness(0.5) contrast(1.5)",
                mixBlendMode: "multiply",
                transform: `scale(${1 + scrollY * 0.0002})`,
              }}
            />

            <div
              className="absolute bottom-1/5 right-1/3 w-72 h-72 bg-cover bg-center rounded-full opacity-15 blur-3xl"
              style={{
                backgroundImage: "url('/totaleclipse.jpg')",
                filter:
                  "sepia(80%) hue-rotate(300deg) brightness(0.4) contrast(1.8)",
                mixBlendMode: "color-dodge",
              }}
            />

            {/* New large background elements */}
            <div
              className="absolute top-1/5 right-1/6 w-96 h-64 bg-cover bg-center rounded-full opacity-12 blur-3xl"
              style={{
                backgroundImage: "url('/live.jpg')",
                filter:
                  "sepia(60%) hue-rotate(200deg) brightness(0.3) contrast(2)",
                mixBlendMode: "overlay",
                transform: `rotate(${scrollY * 0.01}deg)`,
              }}
            />

            <div
              className="absolute bottom-1/6 left-1/4 w-88 h-88 bg-cover bg-center rounded-full opacity-10 blur-3xl"
              style={{
                backgroundImage: "url('/wave.jpg')",
                filter:
                  "sepia(90%) hue-rotate(220deg) brightness(0.2) contrast(2.5)",
                mixBlendMode: "soft-light",
                transform: `scale(${0.8 + scrollY * 0.0001})`,
              }}
            />
          </div>

          {/* Layer 5 - Concert venue silhouettes (placeholder shapes) */}
          <div
            className="absolute inset-0 opacity-8 parallax-layer"
            style={{
              transform: `translateY(${scrollY * 0.4}px)`,
            }}
          >
            {/* Stage/DJ booth silhouette */}
            <div className="absolute bottom-0 left-1/4 w-32 h-16 bg-gradient-to-t from-gray-800/30 to-transparent transform skew-x-12" />
            <div className="absolute bottom-0 right-1/4 w-40 h-20 bg-gradient-to-t from-gray-800/25 to-transparent transform -skew-x-6" />

            {/* Crowd silhouettes */}
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-gray-900/40 to-transparent" />
            <div className="absolute bottom-0 left-10 w-4 h-8 bg-gray-800/20 rounded-t-full" />
            <div className="absolute bottom-0 left-20 w-3 h-12 bg-gray-800/25 rounded-t-full" />
            <div className="absolute bottom-0 left-32 w-5 h-10 bg-gray-800/20 rounded-t-full" />
            <div className="absolute bottom-0 right-10 w-4 h-9 bg-gray-800/20 rounded-t-full" />
            <div className="absolute bottom-0 right-24 w-3 h-11 bg-gray-800/25 rounded-t-full" />
          </div>

          {/* Layer 6 - Musical note shapes */}
          <div
            className="absolute inset-0 opacity-12 parallax-layer"
            style={{
              transform: `translateY(${scrollY * 0.6}px)`,
            }}
          >
            <div className="absolute top-1/3 left-1/6 w-2 h-2 bg-purple-400/40 rounded-full animate-music-note" />
            <div
              className="absolute top-2/3 right-1/6 w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-music-note"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute top-1/2 left-3/4 w-2.5 h-2.5 bg-blue-400/30 rounded-full animate-music-note"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute top-1/4 right-1/3 w-1 h-1 bg-yellow-400/50 rounded-full animate-music-note"
              style={{ animationDelay: "0.5s" }}
            />
          </div>

          {/* Layer 6.5 - Dance Character and Special Images (Medium-Fast Parallax) */}
          <div
            className="absolute inset-0 opacity-18 parallax-layer"
            style={{
              transform: `translateY(${scrollY * 0.65}px) scale(${
                1 + Math.sin(scrollY * 0.008) * 0.05
              })`,
            }}
          >
            {/* Dancing character from 舞.png - main focus */}
            <div
              className={`absolute top-1/3 right-1/2 w-24 h-24 bg-cover bg-center rounded-full opacity-80 blur-sm ${
                isPlaying
                  ? "animate-rave-mode-image-dance"
                  : "animate-responsive-image-scale"
              }`}
              style={{
                backgroundImage: "url('/舞.png')",
                filter:
                  "sepia(25%) hue-rotate(280deg) brightness(1.4) contrast(1.3)",
                mixBlendMode: "screen",
                transform: `translateX(-50%) rotate(${scrollY * 0.06}deg)`,
                animationDuration: isPlaying ? "1.5s" : "6s",
              }}
            />

            {/* L'amour Toujours floating element */}
            <div
              className={`absolute bottom-1/4 left-1/6 w-32 h-24 bg-cover bg-center rounded-lg opacity-70 blur-sm ${
                isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/L'amour_toujours.JPG')",
                filter:
                  "sepia(40%) hue-rotate(320deg) brightness(1.2) contrast(1.1)",
                mixBlendMode: "overlay",
                transform: `translateY(${scrollY * 0.25}px) rotate(${
                  -scrollY * 0.03
                }deg)`,
                animationDelay: "1.5s",
              }}
            />

            {/* MaxRes music video thumbnail */}
            <div
              className={`absolute top-1/5 left-1/4 w-28 h-20 bg-cover bg-center rounded-md opacity-75 blur-sm ${
                isPlaying
                  ? "animate-rave-mode-image-dance"
                  : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/maxresdefault.jpg')",
                filter:
                  "sepia(35%) hue-rotate(200deg) brightness(1.3) contrast(1.2)",
                mixBlendMode: "multiply",
                transform: `translateX(${scrollY * 0.15}px)`,
                animationDelay: "2.5s",
              }}
            />

            {/* Untitled artistic piece */}
            <div
              className={`absolute top-3/5 right-1/5 w-26 h-20 bg-cover bg-center rounded-xl opacity-60 blur-md ${
                isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/Untitled.jpg')",
                filter:
                  "sepia(50%) hue-rotate(250deg) brightness(1.1) contrast(1.4)",
                mixBlendMode: "color-dodge",
                transform: `translateY(${-scrollY * 0.12}px) scale(${
                  1 + Math.cos(scrollY * 0.01) * 0.1
                })`,
                animationDelay: "3.5s",
              }}
            />
          </div>

          {/* Layer 7 - Additional dynamic background when rave mode is active */}
          {isPlaying && (
            <div
              className="absolute inset-0 opacity-20 parallax-layer"
              style={{
                transform: `translateY(${scrollY * 0.8}px)`,
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-blue-600/10 animate-parallax-shimmer" />

              {/* Image Rain Effect - Only during rave mode */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 12 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-cover bg-center rounded-full opacity-40 blur-sm animate-float-up"
                    style={{
                      left: `${5 + i * 7.5 + Math.sin(i * 0.8) * 5}%`,
                      backgroundImage: `url('/${
                        [
                          "gigi1.png",
                          "gigi2.jpg",
                          "gigi3.jpg",
                          "舞.png",
                          "beautiful.jpg",
                          "live.jpg",
                          "maxresdefault.jpg",
                          "wave.jpg",
                          "totaleclipse.jpg",
                          "L'amour_toujours.JPG",
                          "Untitled.jpg",
                          "2410soundoflove(1).jpg",
                        ][i]
                      }')`,
                      filter: `sepia(${30 + i * 5}%) hue-rotate(${
                        200 + i * 15
                      }deg) brightness(${1.5 + i * 0.1}) contrast(${
                        1.8 + i * 0.05
                      })`,
                      mixBlendMode:
                        i % 3 === 0
                          ? "screen"
                          : i % 3 === 1
                          ? "overlay"
                          : "color-dodge",
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: `${15 + i * 2}s`,
                      transform: `scale(${
                        0.8 + Math.sin(i * 0.5) * 0.3
                      }) rotate(${i * 30}deg)`,
                    }}
                  />
                ))}
              </div>

              {/* Enhanced image showcase during rave mode */}
              <div
                className="absolute top-1/4 left-1/2 w-20 h-20 bg-cover bg-center rounded-lg opacity-70 blur-sm animate-rave-mode-image-dance transform -translate-x-1/2"
                style={{
                  backgroundImage: "url('/gigi1.png')",
                  filter:
                    "sepia(20%) hue-rotate(240deg) brightness(1.3) contrast(1.4)",
                  mixBlendMode: "screen",
                  animationDuration: "2s",
                  transform: `translateX(-50%) translateY(${
                    scrollY * 0.3
                  }px) rotate(${scrollY * 0.08}deg)`,
                }}
              />

              <div
                className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-cover bg-center rounded-full opacity-60 blur-sm animate-image-pulse-glow"
                style={{
                  backgroundImage: "url('/beautiful.jpg')",
                  filter:
                    "sepia(40%) hue-rotate(280deg) brightness(1.5) contrast(1.2)",
                  mixBlendMode: "color-dodge",
                  animationDuration: "3s",
                  transform: `translateY(${-scrollY * 0.2}px) scale(${
                    1 + Math.sin(scrollY * 0.01) * 0.1
                  })`,
                }}
              />

              <div
                className="absolute top-2/3 left-1/6 w-18 h-18 bg-cover bg-center rounded-xl opacity-50 blur-sm animate-rave-mode-image-dance"
                style={{
                  backgroundImage: "url('/2410soundoflove(1).jpg')",
                  filter:
                    "sepia(50%) hue-rotate(320deg) brightness(1.6) contrast(1.1)",
                  mixBlendMode: "hard-light",
                  animationDuration: "2.5s",
                  transform: `translateX(${scrollY * 0.1}px) translateY(${
                    scrollY * 0.4
                  }px)`,
                }}
              />
            </div>
          )}

          {/* Layer 8 - Subtle image reflections (visible only on larger screens) */}
          <div
            className="hidden lg:block absolute inset-0 opacity-8 parallax-layer"
            style={{
              transform: `translateY(${scrollY * 0.25}px) scaleY(-1)`,
            }}
          >
            {/* Reflected versions of images for depth */}
            <div
              className="absolute bottom-1/4 left-1/4 w-20 h-30 bg-cover bg-center rounded-lg opacity-30 blur-lg"
              style={{
                backgroundImage: "url('/gigi2.jpg')",
                filter:
                  "sepia(70%) hue-rotate(250deg) brightness(0.3) contrast(1.8)",
                mixBlendMode: "multiply",
                transform: `translateY(100px)`,
              }}
            />

            <div
              className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-cover bg-center rounded-full opacity-25 blur-xl"
              style={{
                backgroundImage: "url('/totaleclipse.jpg')",
                filter:
                  "sepia(80%) hue-rotate(200deg) brightness(0.2) contrast(2)",
                mixBlendMode: "overlay",
                transform: `translateY(80px)`,
              }}
            />
          </div>

          {/* Layer 9 - Dynamic scroll-responsive image morphing */}
          <div
            className="absolute inset-0 opacity-12 parallax-layer"
            style={{
              transform: `translateY(${scrollY * 0.9}px) scale(${
                1 + Math.sin(scrollY * 0.005) * 0.1
              })`,
            }}
          >
            {/* Images that morph based on scroll position */}
            <div
              className={`absolute top-1/6 left-1/3 w-32 h-24 bg-cover bg-center rounded-2xl opacity-60 blur-sm ${
                isPlaying
                  ? "animate-rave-mode-image-dance"
                  : "animate-scroll-fade-in"
              }`}
              style={{
                backgroundImage: `url('/${
                  scrollY % 500 < 100
                    ? "gigi1.png"
                    : scrollY % 500 < 200
                    ? "gigi2.jpg"
                    : scrollY % 500 < 300
                    ? "gigi3.jpg"
                    : scrollY % 500 < 400
                    ? "live.jpg"
                    : "beautiful.jpg"
                }')`,
                filter: `sepia(${
                  30 + Math.sin(scrollY * 0.01) * 20
                }%) hue-rotate(${
                  240 + Math.cos(scrollY * 0.008) * 60
                }deg) brightness(${
                  1.2 + Math.sin(scrollY * 0.006) * 0.3
                }) contrast(${1.3 + Math.cos(scrollY * 0.009) * 0.2})`,
                mixBlendMode: "screen",
                transform: `rotate(${Math.sin(scrollY * 0.01) * 15}deg) scale(${
                  1 + Math.cos(scrollY * 0.007) * 0.2
                })`,
                animationDelay: `${Math.sin(scrollY * 0.002) * 2}s`,
              }}
            />

            <div
              className={`absolute bottom-1/4 right-1/5 w-28 h-28 bg-cover bg-center rounded-full opacity-50 blur-md ${
                isPlaying
                  ? "animate-image-pulse-glow"
                  : "animate-responsive-image-scale"
              }`}
              style={{
                backgroundImage: `url('/${
                  scrollY % 400 < 80
                    ? "maxresdefault.jpg"
                    : scrollY % 400 < 160
                    ? "totaleclipse.jpg"
                    : scrollY % 400 < 240
                    ? "2410soundoflove(1).jpg"
                    : scrollY % 400 < 320
                    ? "wave.jpg"
                    : "Untitled.jpg"
                }')`,
                filter: `sepia(${
                  40 + Math.cos(scrollY * 0.012) * 30
                }%) hue-rotate(${
                  200 + Math.sin(scrollY * 0.01) * 120
                }deg) brightness(${
                  0.8 + Math.cos(scrollY * 0.008) * 0.4
                }) contrast(${1.5 + Math.sin(scrollY * 0.011) * 0.3})`,
                mixBlendMode: "color-dodge",
                transform: `translateX(${
                  Math.sin(scrollY * 0.006) * 30
                }px) translateY(${Math.cos(scrollY * 0.008) * 20}px) rotate(${
                  Math.sin(scrollY * 0.004) * 20
                }deg)`,
                animationDuration: `${
                  3 + Math.abs(Math.sin(scrollY * 0.005)) * 5
                }s`,
              }}
            />

            {/* Scroll-triggered constellation of tiny images */}
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className={`absolute w-4 h-4 bg-cover bg-center rounded-full opacity-30 blur-sm ${
                  isPlaying
                    ? "animate-rave-mode-image-dance"
                    : "animate-image-drift"
                }`}
                style={{
                  left: `${15 + i * 12 + Math.sin(scrollY * 0.01 + i) * 10}%`,
                  top: `${20 + Math.cos(scrollY * 0.008 + i * 0.5) * 30}%`,
                  backgroundImage: `url('/${
                    [
                      "gigi1.png",
                      "舞.png",
                      "beautiful.jpg",
                      "wave.jpg",
                      "totaleclipse.jpg",
                      "L'amour_toujours.JPG",
                    ][i]
                  }')`,
                  filter: `sepia(${50 + i * 10}%) hue-rotate(${
                    180 + i * 30 + scrollY * 0.2
                  }deg) brightness(${0.6 + i * 0.1}) contrast(${
                    2.0 + i * 0.1
                  })`,
                  mixBlendMode: i % 2 === 0 ? "screen" : "overlay",
                  transform: `scale(${
                    0.5 + Math.sin(scrollY * 0.005 + i) * 0.3
                  }) rotate(${scrollY * 0.1 + i * 60}deg)`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${8 + i * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Background Image - Behind title */}
        <div className="absolute inset-0 z-5">
          <div className="hero-background-container">
            <img
              src="/maxresdefault.jpg"
              alt="GiGi D'Agostino Background"
              className="hero-background-image"
            />
            <div className="hero-background-overlay"></div>
          </div>
        </div>

        {/* Main Content - Above parallax layers */}
        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
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
              } gigi-hero-text`}
            >
              <span className="relative z-10">GiGi D&apos;Agostino</span>
              {/* Desktop-only: Shimmer effect on hover - RAVE MODE ACTIVE */}
              {/* <div
                className={`hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-gold-300/30 to-transparent -skew-x-12 transition-opacity duration-500 ${
                  isPlaying
                    ? "opacity-100 animate-shimmer"
                    : "opacity-0 hover:opacity-100 hover:animate-shimmer"
                }`}
              ></div> */}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto gigi-tour-grid">
              {/* Card 1 */}
              <div
                className={`bg-gray-800/50 backdrop-blur p-6 rounded-lg border transition-all duration-300 hover-trail group relative ${
                  isPlaying
                    ? "border-purple-500 transform scale-105 shadow-purple-500/20 shadow-lg"
                    : "border-gray-700 hover:border-purple-500 hover:transform hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg"
                } gigi-tour-card`}
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
                      } gigi-tour-title`}
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
                      } gigi-tour-date`}
                    >
                      JUN 15
                    </p>
                    <p
                      className={`text-sm transition-colors ${
                        isPlaying
                          ? "text-gray-300"
                          : "text-gray-400 group-hover:text-gray-300"
                      } gigi-tour-year`}
                    >
                      2025
                    </p>
                  </div>
                </div>
              </div>
              {/* Card 2 */}
              <div
                className={`bg-gray-800/50 backdrop-blur p-6 rounded-lg border transition-all duration-300 hover-trail group relative ${
                  isPlaying
                    ? "border-purple-500 transform scale-105 shadow-purple-500/20 shadow-lg"
                    : "border-gray-700 hover:border-purple-500 hover:transform hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg"
                } gigi-tour-card`}
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
              {/* Card 3 */}
              <div
                className={`bg-gray-800/50 backdrop-blur p-6 rounded-lg border transition-all duration-300 hover-trail group relative ${
                  isPlaying
                    ? "border-purple-500 transform scale-105 shadow-purple-500/20 shadow-lg"
                    : "border-gray-700 hover:border-purple-500 hover:transform hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg"
                } gigi-tour-card`}
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
              {/* Card 4 */}
              <div
                className={`bg-gray-800/50 backdrop-blur p-6 rounded-lg border transition-all duration-300 hover-trail group relative ${
                  isPlaying
                    ? "border-purple-500 transform scale-105 shadow-purple-500/20 shadow-lg"
                    : "border-gray-700 hover:border-purple-500 hover:transform hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg"
                } gigi-tour-card`}
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
              {/* Card 5 */}
              <div
                className={`bg-gray-800/50 backdrop-blur p-6 rounded-lg border transition-all duration-300 hover-trail group relative ${
                  isPlaying
                    ? "border-purple-500 transform scale-105 shadow-purple-500/20 shadow-lg"
                    : "border-gray-700 hover:border-purple-500 hover:transform hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg"
                } gigi-tour-card`}
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
              {/* Card 6 */}
              <div
                className={`bg-gray-800/50 backdrop-blur p-6 rounded-lg border transition-all duration-300 hover-trail group relative ${
                  isPlaying
                    ? "border-purple-500 transform scale-105 shadow-purple-500/20 shadow-lg"
                    : "border-gray-700 hover:border-purple-500 hover:transform hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg"
                } gigi-tour-card`}
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
