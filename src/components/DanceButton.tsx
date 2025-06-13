import React from "react";

interface DanceButtonProps {
  isPlaying: boolean;
  toggleAudio: () => void;
}

export const DanceButton: React.FC<DanceButtonProps> = ({
  isPlaying,
  toggleAudio,
}) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
      <button
        onClick={toggleAudio}
        className={`group relative w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 hover:rotate-12 hover:shadow-purple-500/60 ${
          isPlaying
            ? "animate-bounce shadow-purple-500/60"
            : "animate-[pulse_5s_ease-in-out_infinite] shadow-purple-400/40"
        } gigi-hero-btn`}
        style={!isPlaying ? { animationDelay: "0.5s" } : {}}
      >
        {/* Desktop-only: Advanced hover trails that mobile won't see - RAVE MODE ACTIVE */}
        <div
          className={`hidden lg:block absolute -inset-8 transition-all duration-700 ${
            isPlaying ? "opacity-100" : "opacity-60 group-hover:opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute inset-2 bg-gradient-to-l from-blue-500/15 via-purple-500/15 to-red-500/15 rounded-full blur-lg animate-ping"></div>
        </div>

        {/* Desktop-only: Hover particle effects - RAVE MODE ACTIVE */}
        <div
          className={`hidden xl:block absolute -inset-12 transition-all duration-1000 ${
            isPlaying ? "opacity-100" : "opacity-50 group-hover:opacity-100"
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
              : "animate-[pulse_6s_ease-in-out_infinite] opacity-90 group-hover:opacity-100 group-hover:scale-110"
          }`}
          style={!isPlaying ? { animationDelay: "1s" } : {}}
        ></div>

        {/* Desktop-only: Sophisticated hover ring that rotates opposite direction - RAVE MODE ACTIVE */}
        <div
          className={`hidden md:block absolute -inset-3 transition-all duration-700 ${
            isPlaying ? "opacity-70" : "opacity-40 group-hover:opacity-70"
          }`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-tr from-cyan-400/30 via-purple-400/30 to-pink-400/30 rounded-full blur ${
              isPlaying
                ? "animate-reverse-spin"
                : "animate-[pulse_8s_ease-in-out_infinite] group-hover:animate-reverse-spin"
            }`}
            style={!isPlaying ? { animationDelay: "2s" } : {}}
          ></div>
        </div>

        {/* Firefly sync glow - visible when playing, subtle when not */}
        <div
          className={`absolute -inset-4 bg-gradient-to-br from-purple-400/20 via-pink-400/20 to-yellow-400/20 rounded-full blur-lg transition-all duration-500 ${
            isPlaying
              ? "animate-pulse opacity-100 group-hover:scale-125"
              : "animate-[pulse_7s_ease-in-out_infinite] opacity-80 group-hover:opacity-100 group-hover:scale-110"
          }`}
          style={!isPlaying ? { animationDelay: "3s" } : {}}
        ></div>

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

        {/* Tooltip - only show when playing */}
        {isPlaying && (
          <div className="hidden lg:block absolute -top-12 left-1/2 transform -translate-x-1/2 transition-all duration-300 pointer-events-none opacity-0 group-hover:opacity-100">
            <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-purple-400/50">
              Stop the music
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black/80"></div>
          </div>
        )}
      </button>
    </div>
  );
};
