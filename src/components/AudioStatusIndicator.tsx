import React, { useState, useEffect } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";

interface AudioStatusIndicatorProps {
  isPlaying: boolean;
  toggleAudio: () => void;
  isMobile?: boolean;
}

const AudioStatusIndicator: React.FC<AudioStatusIndicatorProps> = ({
  isPlaying,
  toggleAudio,
  isMobile = false,
}) => {
  const { scrollY } = useScrollPosition(isMobile);
  const [hasScrolledOnce, setHasScrolledOnce] = useState(false);

  // Track if user has ever scrolled past threshold
  useEffect(() => {
    if (scrollY > 50 && !hasScrolledOnce) {
      setHasScrolledOnce(true);
    }
  }, [scrollY, hasScrolledOnce]);

  // Once scrolled, always stay compact
  const isCompact = hasScrolledOnce;

  return (
    <button
      onClick={toggleAudio}
      className={`fixed top-4 right-4 z-50 flex items-center bg-black/40 backdrop-blur-md rounded-full shadow-lg transition-all duration-700 ease-in-out cursor-pointer group transform overflow-hidden ${
        isCompact
          ? "w-12 h-12 px-0 py-0 justify-center scale-90"
          : "w-auto h-auto px-4 py-2 justify-start scale-100"
      } ${
        isPlaying
          ? isCompact
            ? "border-2 border-purple-400/60 hover:bg-black/60"
            : "border-trace-rave-rounded hover:bg-black/60"
          : "border border-gray-600/40 hover:border-purple-500/40 hover:bg-black/60"
      }`}
      title={isPlaying ? "Click to stop dancing" : "Click to start dancing"}
    >
      {/* Dot indicator - always rendered but scaled/positioned */}
      <div
        className={`rounded-full transition-all duration-700 ease-in-out ${
          isCompact
            ? "w-0 h-0 opacity-0 scale-0 -translate-x-2"
            : "w-2 h-2 opacity-100 scale-100 translate-x-0 mr-2"
        } ${
          isPlaying
            ? "bg-purple-400 animate-pulse shadow-purple-400/50 shadow-sm group-hover:bg-red-400"
            : "bg-gray-400 group-hover:bg-purple-400"
        }`}
      ></div>

      {/* Dance character - always rendered but scaled/positioned */}
      <span
        className={`font-medium transition-all duration-700 ease-in-out absolute ${
          isCompact
            ? "text-lg opacity-100 scale-100 translate-x-0"
            : "text-lg opacity-0 scale-0 translate-x-8"
        } ${
          isPlaying
            ? "text-purple-400 group-hover:text-red-400"
            : "text-gray-400 group-hover:text-purple-400"
        } ${isCompact && isPlaying ? "animate-bounce" : ""}`}
      >
        舞
      </span>

      {/* Text - always rendered but with width/opacity animation */}
      <span
        className={`text-sm font-medium transition-all duration-700 ease-in-out whitespace-nowrap ${
          isCompact
            ? "opacity-0 max-w-0 scale-0 translate-x-4"
            : "opacity-100 max-w-xs scale-100 translate-x-0"
        } ${
          isPlaying
            ? "text-purple-200 group-hover:text-red-200"
            : "text-gray-300 group-hover:text-purple-200"
        }`}
      >
        {isPlaying ? "Dance Mode Active" : "Press 舞 to awaken"}
      </span>
    </button>
  );
};

export default AudioStatusIndicator;
