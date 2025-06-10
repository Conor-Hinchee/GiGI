import React from "react";
import { MainContentProps } from "../types";
import { TourCard } from "./TourCard";
import { SocialLinks } from "./SocialLinks";
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

      {/* Parallax Background Layers - Only render on desktop
      <ParallaxLayer
        scrollY={scrollY}
        isMobile={isMobile}
        isPlaying={isPlaying}
      /> */}

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
              Luigino Celestino Di Agostino • Born December 17, 1967 • Turin,
              Italy
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
        <SocialLinks isPlaying={isPlaying} />

        {/* Subtle glow effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};
