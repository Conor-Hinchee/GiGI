import React from "react";
import Image from "next/image";
import { MainContentProps } from "../types";
import { TourCard } from "./TourCard";
import { SocialLinks } from "./SocialLinks";
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
        background: `linear-gradient(
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
          <Image
            src="/photos/gigi3.jpg"
            alt="GiGi D'Agostino Background"
            className="hero-background-image"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-background-overlay"></div>
        </div>
      </div>

      {/* Parallax Background Layers - Only render on desktop for tour section */}
      <div className="absolute inset-0 z-0">
        <ParallaxLayer
          scrollY={scrollY}
          isMobile={isMobile}
          isPlaying={isPlaying}
        />
      </div>

      {/* Main Content - Above parallax layers */}
      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
        {/* Main Artist Name */}
        <div className="space-y-6 relative pt-16 md:pt-20 lg:pt-24">
          {/* Background text effect */}
          <div className="hidden xl:block absolute inset-0 -z-10">
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-white/5 tracking-wider uppercase blur-sm transform scale-110">
              GiGi D&apos;Agostino
            </h1>
          </div>

          <h1
            className={`text-7xl md:text-8xl lg:text-9xl font-black tracking-wider uppercase transition-all duration-700 cursor-default relative ${
              isScrolledPastDanceArea || isPlaying
                ? "text-gold-400 drop-shadow-lg"
                : "text-white hover:text-gold-400"
            } gigi-hero-text`}
            style={{
              textShadow:
                isScrolledPastDanceArea || isPlaying
                  ? "0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.3)"
                  : undefined,
            }}
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
              <div className="relative">
                {/* Particle indicator - always visible for dance symbol */}
                <div className="hidden lg:block absolute -top-2 -right-2 w-3 h-3 rounded-full blur-sm">
                  <div className="bg-purple-400/60 animate-ping w-full h-full rounded-full"></div>
                </div>
                <div className="text-2xl font-bold text-purple-300 bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-purple-500 animate-pulse scale-105">
                  舞
                </div>
              </div>
            </div>
            <div className="relative">
              {isPlaying && (
                <div className="hidden lg:block absolute -top-2 -right-2 w-3 h-3 rounded-full blur-sm">
                  <div className="bg-purple-400/60 animate-ping w-full h-full rounded-full"></div>
                </div>
              )}
              <h3
                className={`text-2xl md:text-3xl font-bold uppercase tracking-widest ${
                  isPlaying
                    ? "text-purple-300 bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-purple-500 animate-pulse scale-105"
                    : "text-white"
                }`}
              >
                The Maestro of Italo-Dance
              </h3>
            </div>
            <div className="relative">
              {isPlaying && (
                <div className="hidden lg:block absolute -top-1 -right-1 w-2 h-2 rounded-full blur-sm">
                  <div className="bg-purple-400/60 animate-ping w-full h-full rounded-full"></div>
                </div>
              )}
              <p
                className={`text-lg font-semibold mt-2 ${
                  isPlaying
                    ? "text-purple-300 bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-purple-500 animate-pulse scale-105"
                    : "text-gray-300"
                }`}
              >
                Luigino Celestino Di Agostino
              </p>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="relative">
            {isPlaying && (
              <div className="hidden lg:block absolute -top-1 -right-1 w-2 h-2 rounded-full blur-sm">
                <div className="bg-purple-400/60 animate-ping w-full h-full rounded-full"></div>
              </div>
            )}
            <p
              className={`text-lg leading-relaxed text-center ${
                isPlaying
                  ? "text-purple-200 bg-clip-text bg-gradient-to-r from-purple-100 via-purple-200 to-purple-400"
                  : "text-gray-300"
              }`}
            >
              {`Born in Turin, Italy, Gigi D'Agostino revolutionized
              electronic dance music with his distinctive blend of Italo-dance,
              progressive house, and techno. Known for iconic tracks like
              "Bla Bla Bla", "Another Way", "La Passion", "Super", and "L'Amour Toujours". His unique
              sound and energetic performances continue to captivate audiences
              worldwide!`}
            </p>
          </div>
        </div>

        {/* Tour Dates Header */}
        <div className="mt-16">
          <div className="relative">
            {isPlaying && (
              <div className="hidden lg:block absolute -top-2 -right-2 w-3 h-3 rounded-full blur-sm">
                <div className="bg-purple-400/60 animate-ping w-full h-full rounded-full"></div>
              </div>
            )}
            <h3
              className={`text-3xl md:text-4xl font-bold uppercase tracking-widest mb-8 ${
                isPlaying
                  ? "text-purple-300 bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-purple-500 animate-pulse scale-105"
                  : "text-white"
              }`}
            >
              World Tour 2025 - 2026
            </h3>
          </div>

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
              <div className="relative">
                {isPlaying && (
                  <div className="hidden lg:block absolute -top-1 -right-1 w-2 h-2 rounded-full blur-sm">
                    <div className="bg-purple-400/60 animate-ping w-full h-full rounded-full"></div>
                  </div>
                )}
                <p
                  className={`text-lg mb-2 ${
                    isPlaying
                      ? "text-purple-300 bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-purple-500 animate-pulse scale-105"
                      : "text-gray-300"
                  }`}
                >
                  <span className="text-gold-400 font-semibold">Latest: </span>
                  GIGI D&apos;AGOSTINO, LIZOT, WIDEMODE -
                  <a
                    href="https://www.youtube.com/watch?v=5J0XCcxC_nE"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YO TE DARÈ (2025)"
                  >
                    <span className="text-purple-300 font-semibold">
                      {" "}
                      YO TE DARÈ (2025)
                    </span>
                  </a>
                </p>
              </div>
              {/* <div className="relative">
                {isPlaying && (
                  <div className="hidden lg:block absolute -top-1 -right-1 w-2 h-2 rounded-full blur-sm">
                    <div className="bg-purple-400/60 animate-ping w-full h-full rounded-full"></div>
                  </div>
                )}
                <p
                  className={`text-sm ${
                    isPlaying
                      ? "text-purple-300 bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-purple-500 animate-pulse scale-105"
                      : "text-gray-400"
                  }`}
                >
                  Released under his own Lento Violento and Gigi D&apos;Agostino
                  Planet labels
                </p>
              </div> */}
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
