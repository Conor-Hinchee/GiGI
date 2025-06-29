"use client";

import React, { useCallback } from "react";

interface DiscoBallSceneProps {
  isPlaying: boolean;
  toggleAudio: () => void;
  isMobile?: boolean;
}

export const DiscoBallScene: React.FC<DiscoBallSceneProps> = ({
  isPlaying,
  toggleAudio,
  isMobile = false,
}) => {
  const handleClick = useCallback(() => {
    toggleAudio();
  }, [toggleAudio]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile) return;
      e.stopPropagation();
    },
    [isMobile]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!isMobile) return;
      e.stopPropagation();
      toggleAudio();
    },
    [isMobile, toggleAudio]
  );

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
      {/* Disco Ball Container */}
      <button
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`group relative w-32 h-32 transition-all duration-500 hover:scale-110 active:scale-95 cursor-pointer ${
          isPlaying ? "animate-bounce" : "animate-pulse"
        }`}
      >
        {/* Outer glow effects */}
        <div
          className={`absolute -inset-8 rounded-full blur-xl transition-all duration-700 ${
            isPlaying
              ? "bg-gradient-to-br from-yellow-600/40 via-red-600/40 to-yellow-800/40 animate-spin"
              : "bg-gradient-to-br from-gray-400/30 via-gray-500/30 to-gray-600/30 group-hover:from-yellow-600/40 group-hover:via-red-600/40 group-hover:to-yellow-800/40"
          }`}
        />

        {/* Disco Ball */}
        <div
          className={`relative w-full h-full rounded-full transition-all duration-500 ${
            isPlaying
              ? "bg-gradient-to-br from-yellow-600 via-red-600 to-yellow-800 shadow-2xl shadow-yellow-600/50"
              : "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 shadow-2xl shadow-gray-400/50 group-hover:from-yellow-600 group-hover:via-red-600 group-hover:to-yellow-800"
          }`}
        >
          {/* Disco Ball Facets */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 rounded-sm transition-all duration-300 ${
                isPlaying
                  ? "bg-gradient-to-br from-white/60 to-transparent animate-pulse"
                  : "bg-gradient-to-br from-white/40 to-transparent group-hover:from-white/60"
              }`}
              style={{
                top: `${15 + (i % 4) * 20}%`,
                left: `${15 + Math.floor(i / 4) * 20}%`,
                transform: `rotate(${i * 30}deg)`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
          
          {/* Additional smaller facets */}
          {[...Array(16)].map((_, i) => (
            <div
              key={`small-${i}`}
              className={`absolute w-2 h-2 rounded-sm transition-all duration-300 ${
                isPlaying
                  ? "bg-gradient-to-br from-white/40 to-transparent animate-pulse"
                  : "bg-gradient-to-br from-white/20 to-transparent group-hover:from-white/40"
              }`}
              style={{
                top: `${10 + (i % 8) * 10}%`,
                left: `${10 + Math.floor(i / 8) * 15}%`,
                transform: `rotate(${i * 22.5}deg)`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}

          {/* Chinese Dance Character (舞) in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`text-6xl font-bold transition-all duration-500 ${
                isPlaying
                  ? "text-gray-300 drop-shadow-lg animate-pulse"
                  : "text-yellow-600 drop-shadow-lg group-hover:text-gray-300 group-hover:scale-110"
              }`}
            >
              舞
            </span>
          </div>

          {/* Highlight effects */}
          <div
            className={`absolute top-4 left-4 w-8 h-8 rounded-full blur-sm transition-all duration-300 ${
              isPlaying
                ? "bg-white/40"
                : "bg-white/20 group-hover:bg-white/40 group-hover:scale-150"
            }`}
          />
          
          <div
            className={`absolute top-6 right-6 w-4 h-4 rounded-full blur-sm transition-all duration-500 ${
              isPlaying
                ? "bg-yellow-200/50"
                : "bg-yellow-200/0 group-hover:bg-yellow-200/50 group-hover:scale-200"
            }`}
          />
        </div>

        {/* Spinning light rays when playing */}
        {isPlaying && (
          <div className="absolute inset-0 animate-spin-slow">
            {[...Array(8)].map((_, i) => (
              <div
                key={`ray-${i}`}
                className="absolute w-0.5 h-16 bg-gradient-to-t from-transparent via-yellow-400/60 to-transparent"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: "center bottom",
                  transform: `translate(-50%, -100%) rotate(${i * 45}deg)`,
                }}
              />
            ))}
          </div>
        )}
      </button>

      {/* Status indicator */}
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
        <div
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            isPlaying
              ? "bg-yellow-400 animate-pulse scale-150 shadow-yellow-400/60 shadow-lg"
              : "bg-gray-400 group-hover:bg-yellow-400 group-hover:scale-125"
          }`}
        />
      </div>
    </div>
  );
};
