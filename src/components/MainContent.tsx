import React from "react";
import { MainContentProps } from "../types";
import { TourCard } from "./TourCard";
import { ParallaxLayer } from "./ParallaxLayer";
import { tourDates } from "../data/tourDates";

export const MainContent: React.FC<MainContentProps> = ({
  isPlaying,
  scrollY,
  isMobile,
  isScrolledPastDanceArea,
}) => {
  return (
    <div
      className={`relative flex items-center justify-center p-4 transition-all duration-1000 ease-in-out overflow-hidden ${
        isPlaying ? "min-h-[150vh]" : "min-h-[200vh]"
      } gigi-main-content`}
      style={{
        background: isMobile
          ? `linear-gradient(135deg, rgb(17, 24, 39) 0%, rgb(31, 41, 59) 50%, rgb(17, 24, 39) 100%)`
          : `linear-gradient(
            ${135 + Math.sin(scrollY * 0.002) * 45}deg,
            rgb(17, 24, 39) 0%,
            rgb(${31 + Math.sin(scrollY * 0.003) * 20}, ${
              41 + Math.cos(scrollY * 0.004) * 30
            }, ${59 + Math.sin(scrollY * 0.005) * 40}) 50%,
            rgb(17, 24, 39) 100%
          )`,
      }}
    >
      {/* Parallax Background Layers - Only render on desktop */}
      <ParallaxLayer scrollY={scrollY} isMobile={isMobile} isPlaying={isPlaying} />
        <div className="absolute inset-0 overflow-hidden">
          {/* Layer 0.5 - Ultra-slow floating mini-images for depth */}
          <div
            className="absolute inset-0 opacity-8 parallax-layer"
            style={{
              ...(isMobile
                ? {}
                : {
                    transform: `translateY(${scrollY * 0.05}px) rotate(${
                      scrollY * 0.002
                    }deg)`,
                  }),
            }}
          >
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
              ...(isMobile
                ? {}
                : { transform: `translateY(${scrollY * 0.1}px)` }),
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
              ...(isMobile
                ? {}
                : {
                    transform: `translateY(${scrollY * 0.15}px) scale(${
                      1 + scrollY * 0.0001
                    })`,
                  }),
            }}
          >
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
            <div
              className={`absolute bottom-1/3 left-1/8 w-40 h-60 bg-cover bg-center rounded-lg opacity-50 blur-sm ${
                isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/gigi2.jpg')",
                filter:
                  "sepia(40%) hue-rotate(280deg) brightness(0.6) contrast(1.3)",
                mixBlendMode: "soft-light",
                ...(isMobile
                  ? {}
                  : { transform: `rotate(${scrollY * 0.02}deg)` }),
                animationDelay: "1s",
              }}
            />
            <div
              className={`absolute top-1/6 left-1/2 w-28 h-42 bg-cover bg-center rounded-lg opacity-55 blur-sm ${
                isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/gigi3.jpg')",
                filter:
                  "sepia(35%) hue-rotate(320deg) brightness(0.8) contrast(1.4)",
                mixBlendMode: "color-burn",
                ...(isMobile
                  ? {}
                  : {
                      transform: `translateX(-50%) rotate(${
                        scrollY * -0.015
                      }deg)`,
                    }),
                animationDelay: "3s",
              }}
            />
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
            <div
              className={`absolute top-1/2 left-1/8 w-36 h-24 bg-cover bg-center rounded-lg opacity-50 blur-sm ${
                isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/live.jpg')",
                filter:
                  "sepia(40%) hue-rotate(350deg) brightness(1.1) contrast(1.2)",
                mixBlendMode: "screen",
                ...(isMobile
                  ? {}
                  : { transform: `translateY(${scrollY * 0.05}px)` }),
                animationDelay: "5s",
              }}
            />
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
              ...(isMobile
                ? {}
                : { transform: `translateY(${scrollY * 0.3}px)` }),
              backgroundImage: `
              linear-gradient(45deg, transparent 40%, rgba(147, 51, 234, 0.1) 50%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, rgba(236, 72, 153, 0.1) 50%, transparent 60%)
            `,
              backgroundSize: "200px 200px, 150px 150px",
              backgroundPosition: "0% 0%, 50% 50%",
            }}
          >
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
                ...(isMobile
                  ? {}
                  : { transform: `rotate(${-scrollY * 0.03}deg)` }),
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
                ...(isMobile
                  ? {}
                  : { transform: `translateX(${scrollY * 0.1}px)` }),
                animationDelay: "2.5s",
              }}
            />
            <div
              className={`absolute top-1/8 right-1/8 w-20 h-15 bg-cover bg-center rounded-md opacity-65 blur-sm ${
                isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
              }`}
              style={{
                backgroundImage: "url('/maxresdefault.jpg')",
                filter:
                  "sepia(50%) hue-rotate(180deg) brightness(1.2) contrast(1.1)",
                mixBlendMode: "multiply",
                ...(isMobile
                  ? {}
                  : { transform: `rotate(${scrollY * 0.04}deg)` }),
                animationDelay: "3.5s",
              }}
            />
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
                ...(isMobile
                  ? {}
                  : { transform: `translateX(${scrollY * -0.08}px)` }),
                animationDelay: "4.5s",
              }}
            />
          </div>
        </div>
      )}

      {/* Mobile-optimized background */}
      {isMobile && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10"></div>
          </div>
        </div>
      )}

      {/* Main Background Image - Behind title */}
      <div className="absolute inset-0 z-5">
        <div className="hero-background-container">
          <img
            src="/maxresdefault.jpg"
            alt="GiGi D'Agostino Background"
            className="hero-background-image"
            style={
              isMobile ? { transform: "none", willChange: "auto" } : undefined
            }
          />
          <div className="hero-background-overlay"></div>
        </div>
      </div>

      {/* Main Content - Above parallax layers */}
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
        {/* Main Artist Name */}
        <div className="space-y-6 relative">
          {/* Background text effect */}
          <div className="hidden xl:block absolute inset-0 -z-10">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white/5 tracking-wider uppercase blur-sm transform scale-110">
              GiGi D&apos;Agostino
            </h1>
          </div>

          <h1
            className={`text-7xl md:text-8xl lg:text-9xl font-black tracking-wider uppercase transition-all duration-700 cursor-default relative ${
              isScrolledPastDanceArea || isPlaying
                ? "text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600"
                : "text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-gold-300 hover:via-gold-400 hover:to-gold-600"
            } gigi-hero-text`}
          >
            <span className="relative z-10">GiGi D&apos;Agostino</span>
          </h1>

          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide uppercase transition-colors duration-500 ${
              isPlaying ? "text-purple-200" : "text-white hover:text-purple-200"
            }`}
          ></h2>
          <div
            className={`mx-auto transition-all duration-500 ${
              isPlaying
                ? "w-64 h-2 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-600 shadow-gold-500/50 shadow-lg"
                : "w-32 h-1 bg-white hover:w-64 hover:h-2 hover:bg-gradient-to-r hover:from-gold-300 hover:via-gold-400 hover:to-gold-600 hover:shadow-gold-500/50 hover:shadow-lg"
            }`}
          ></div>

          {/* Maestro Subtitle */}
          <div className="text-center mt-8 mb-4">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-4xl">🎧</div>
              <div className="text-2xl font-bold text-purple-300">舞</div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest">
              The Maestro of Italo-Dance
            </h3>
            <p className="text-lg text-gray-300 font-semibold mt-2">
              Luigino Celestino Di Agostino • Born December 17, 1967 • Turin, Italy
            </p>
          </div>
        </div>

        {/* Tour Dates Header */}
        <div className="mt-16">
          <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest mb-8">
            World Tour 2025
          </h3>

          {/* Tour Dates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto gigi-tour-grid">
            {tourDates.map((tourDate, index) => (
              <TourCard key={index} tourDate={tourDate} isPlaying={isPlaying} />
            ))}
          </div>
        </div>

        {/* About Gigi D'Agostino Section */}
        <div className="mt-20">
          {/* Recent Work Banner */}
          <div
            className={`mt-8 p-6 bg-gradient-to-r rounded-xl border transition-all duration-500 ${
              isPlaying
                ? "from-purple-900/40 to-blue-900/40 border-purple-500/50"
                : "from-gray-800/60 to-gray-700/60 border-gray-600 hover:from-purple-900/30 hover:to-blue-900/30 hover:border-purple-500/30"
            }`}
          >
            <div className="text-center">
              <p className="text-lg text-gray-300 mb-2">
                <span className="text-gold-400 font-semibold">Latest:</span>
                Continuing his Lento Violento explorations with
                <span className="text-purple-300 font-semibold">
                  {" "}
                  Suono Libero (2021)
                </span>
              </p>
              <p className="text-sm text-gray-400">
                Released under his own Lento Violento and Gigi D&apos;Agostino
                Planet labels
              </p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest mb-8">
            Follow GiGi
          </h3>

          {/* Main Social Platforms */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto mb-8">
            {/* Official Website */}
            <a
              href="https://www.gigidagostino.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-gray-800/50 backdrop-blur p-4 rounded-lg border transition-all duration-300 transform ${
                isPlaying
                  ? "border-gold-500 bg-gold-500/20 scale-105"
                  : "border-gray-700 hover:border-gold-500 hover:bg-gold-500/20 hover:scale-105"
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <svg
                  className={`w-8 h-8 transition-colors ${
                    isPlaying
                      ? "text-gold-400"
                      : "text-gray-300 group-hover:text-gold-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span className="text-xs text-center font-medium text-gray-300">
                  Official Site
                </span>
              </div>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/gigidagostino"
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-gray-800/50 backdrop-blur p-4 rounded-lg border transition-all duration-300 transform ${
                isPlaying
                  ? "border-blue-500 bg-blue-500/20 scale-105"
                  : "border-gray-700 hover:border-blue-500 hover:bg-blue-500/20 hover:scale-105"
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
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
                <span className="text-xs text-center font-medium text-gray-300">
                  Facebook
                </span>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/gigidag/"
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-gray-800/50 backdrop-blur p-4 rounded-lg border transition-all duration-300 transform ${
                isPlaying
                  ? "border-pink-500 bg-pink-500/20 scale-105"
                  : "border-gray-700 hover:border-pink-500 hover:bg-pink-500/20 hover:scale-105"
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <svg
                  className={`w-8 h-8 transition-colors ${
                    isPlaying
                      ? "text-pink-400"
                      : "text-gray-300 group-hover:text-pink-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="text-xs text-center font-medium text-gray-300">
                  Instagram
                </span>
              </div>
            </a>

            {/* Twitter */}
            <a
              href="https://twitter.com/GIGIDAGOSTINO_1"
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-gray-800/50 backdrop-blur p-4 rounded-lg border transition-all duration-300 transform ${
                isPlaying
                  ? "border-sky-500 bg-sky-500/20 scale-105"
                  : "border-gray-700 hover:border-sky-500 hover:bg-sky-500/20 hover:scale-105"
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
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
                <span className="text-xs text-center font-medium text-gray-300">
                  Twitter
                </span>
              </div>
            </a>

            {/* Spotify */}
            <a
              href="https://open.spotify.com/artist/1OAjDaKgg00KCUYqDe68un"
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-gray-800/50 backdrop-blur p-4 rounded-lg border transition-all duration-300 transform ${
                isPlaying
                  ? "border-green-500 bg-green-500/20 scale-105"
                  : "border-gray-700 hover:border-green-500 hover:bg-green-500/20 hover:scale-105"
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <svg
                  className={`w-8 h-8 transition-colors ${
                    isPlaying
                      ? "text-green-400"
                      : "text-gray-300 group-hover:text-green-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.301.421-1.02.599-1.559.3z" />
                </svg>
                <span className="text-xs text-center font-medium text-gray-300">
                  Spotify
                </span>
              </div>
            </a>

            {/* Apple Music */}
            <a
              href="https://music.apple.com/it/artist/gigi-dagostino/90049828"
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-gray-800/50 backdrop-blur p-4 rounded-lg border transition-all duration-300 transform ${
                isPlaying
                  ? "border-gray-400 bg-gray-400/20 scale-105"
                  : "border-gray-700 hover:border-gray-400 hover:bg-gray-400/20 hover:scale-105"
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <svg
                  className={`w-8 h-8 transition-colors ${
                    isPlaying
                      ? "text-gray-300"
                      : "text-gray-300 group-hover:text-white"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.001-.08-.004-.12-.004H5.986c-.04 0-.08.003-.12.004-.526.015-1.047.057-1.564.15-.673.121-1.303.353-1.877.727C1.307 1.624.562 2.624.245 3.934.07 4.654.005 5.386.005 6.124v11.744c0 .738.065 1.47.24 2.19.317 1.31 1.062 2.31 2.18 3.043.574.374 1.204.606 1.877.727.517.093 1.038.135 1.564.15.04.001.08.004.12.004h12.014c.04 0 .08-.003.12-.004.526-.015 1.047-.057 1.564-.15.673-.121 1.303-.353 1.877-.727 1.118-.734 1.863-1.734 2.18-3.043.175-.72.24-1.452.24-2.19V6.124zM22.285 17.73c0 .597-.054 1.197-.185 1.785-.242.998-.801 1.678-1.56 2.125-.35.207-.721.328-1.106.37-.432.057-.867.084-1.302.09-.015 0-.029.002-.044.002H5.911c-.015 0-.029-.002-.044-.002-.435-.006-.87-.033-1.302-.09-.385-.042-.756-.163-1.106-.37-.759-.447-1.318-1.127-1.56-2.125C1.768 18.927 1.714 18.327 1.714 17.73V6.27c0-.597.054-1.197.185-1.785.242-.998.801-1.678 1.56-2.125.35-.207.721-.328 1.106-.37.432-.057.867-.084 1.302-.09.015 0 .029-.002.044-.002h12.178c.015 0 .029.002.044.002.435.006.87.033 1.302.09.385.042.756.163 1.106.37.759.447 1.318 1.127 1.56 2.125.131.588.185 1.188.185 1.785V17.73z" />
                  <path d="M10.584 8.929a4.832 4.832 0 002.416.649c2.668 0 4.832-2.164 4.832-4.832 0-.266-.022-.526-.065-.781a3.05 3.05 0 01-.781.065c-2.668 0-4.832 2.164-4.832 4.832 0 .266.022.526.065.781.266-.022.526-.065.781-.065.266 0 .526.022.781.065a3.05 3.05 0 00-.065-.781c0-2.668 2.164-4.832 4.832-4.832.266 0 .526.022.781.065-.022-.266-.065-.526-.065-.781C18.416 2.164 16.252 0 13.584 0c-.266 0-.526.022-.781.065.022.266.065.526.065.781 0 2.668-2.164 4.832-4.832 4.832-.266 0-.526-.022-.781-.065.022.266.065.526.065.781 0 2.668-2.164 4.832-4.832 4.832-.266 0-.526-.022-.781-.065.022.266.065.526.065.781z" />
                </svg>
                <span className="text-xs text-center font-medium text-gray-300">
                  Apple Music
                </span>
              </div>
            </a>
          </div>

          {/* YouTube Channels */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-purple-300 mb-4 text-center">
              YouTube Channels
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {/* YouTube - Gigi Dag */}
              <a
                href="https://www.youtube.com/channel/UCExjoFjxg4Yzj6erY_xx_Dw"
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-gray-800/50 backdrop-blur p-4 rounded-lg border transition-all duration-300 transform ${
                  isPlaying
                    ? "border-red-500 bg-red-500/20 scale-105"
                    : "border-gray-700 hover:border-red-500 hover:bg-red-500/20 hover:scale-105"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <svg
                    className={`w-8 h-8 transition-colors ${
                      isPlaying
                        ? "text-red-400"
                        : "text-gray-300 group-hover:text-red-400"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="text-xs text-center font-medium text-gray-300">
                    Gigi Dag
                  </span>
                </div>
              </a>

              {/* YouTube - Gigi D'Agostino */}
              <a
                href="https://www.youtube.com/channel/UC7Sqfp5sOFUI4436LBoB_JQ"
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-gray-800/50 backdrop-blur p-4 rounded-lg border transition-all duration-300 transform ${
                  isPlaying
                    ? "border-red-500 bg-red-500/20 scale-105"
                    : "border-gray-700 hover:border-red-500 hover:bg-red-500/20 hover:scale-105"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <svg
                    className={`w-8 h-8 transition-colors ${
                      isPlaying
                        ? "text-red-400"
                        : "text-gray-300 group-hover:text-red-400"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="text-xs text-center font-medium text-gray-300">
                    Gigi D&apos;Agostino
                  </span>
                </div>
              </a>

              {/* YouTube - Lento Violento */}
              <a
                href="https://www.youtube.com/c/lentoviolento"
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-gray-800/50 backdrop-blur p-4 rounded-lg border transition-all duration-300 transform ${
                  isPlaying
                    ? "border-red-500 bg-red-500/20 scale-105"
                    : "border-gray-700 hover:border-red-500 hover:bg-red-500/20 hover:scale-105"
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <svg
                    className={`w-8 h-8 transition-colors ${
                      isPlaying
                        ? "text-red-400"
                        : "text-gray-300 group-hover:text-red-400"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="text-xs text-center font-medium text-gray-300">
                    Lento Violento
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Casa DAG Forum */}
          <div className="text-center">
            <a
              href="http://www.casadag.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center space-x-3 bg-gray-800/50 backdrop-blur px-6 py-4 rounded-lg border transition-all duration-300 transform ${
                isPlaying
                  ? "border-purple-500 bg-purple-500/20 scale-105"
                  : "border-gray-700 hover:border-purple-500 hover:bg-purple-500/20 hover:scale-105"
              }`}
            >
              <svg
                className={`w-8 h-8 transition-colors ${
                  isPlaying
                    ? "text-purple-400"
                    : "text-gray-300 hover:text-purple-400"
                }`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              <div className="text-left">
                <p className="font-semibold text-white">Casa DAG</p>
                <p className="text-sm text-gray-300">Official Forum</p>
              </div>
            </a>
          </div>

          <p className="text-gray-400 mt-8 text-sm text-center">
            Stay connected for exclusive content, behind-the-scenes updates,
            and the latest Lento Violento releases
          </p>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};
