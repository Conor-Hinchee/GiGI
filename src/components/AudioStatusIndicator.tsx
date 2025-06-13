import React from "react";
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
  const isScrolled = scrollY > 50;

  // When scrolled, show just the 舞 character
  if (isScrolled) {
    return (
      <button
        onClick={toggleAudio}
        className={`fixed top-4 right-4 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md rounded-full w-12 h-12 shadow-lg transition-all duration-300 cursor-pointer group ${
          isPlaying
            ? "border-2 border-purple-400/60 hover:bg-black/60"
            : "border border-gray-600/40 hover:border-purple-500/40 hover:bg-black/60"
        }`}
        title={isPlaying ? "Click to stop dancing" : "Click to start dancing"}
      >
        <span
          className={`text-lg font-medium transition-colors duration-300 ${
            isPlaying
              ? "text-purple-400 group-hover:text-red-400"
              : "text-gray-400 group-hover:text-purple-400"
          }`}
        >
          舞
        </span>
      </button>
    );
  }

  return isPlaying ? (
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
  ) : (
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
  );
};

export default AudioStatusIndicator;
