import React, { useState, useEffect } from "react";

interface ExpansionIndicatorProps {
  isVisible: boolean;
  isExpanding: boolean; // New prop to track if the dance button is expanding
}

export const ExpansionIndicator: React.FC<ExpansionIndicatorProps> = ({
  isVisible,
  isExpanding,
}) => {
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (isExpanding && !hasShown) {
      setHasShown(true);
    }
  }, [isExpanding, hasShown]);

  if (!isVisible || hasShown) return null;

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 opacity-0 animate-rave-fade-in-out-once px-4 max-w-[90vw]">
      <div className="flex items-center space-x-2 sm:space-x-3 bg-black/70 backdrop-blur-md rounded-full px-4 sm:px-6 py-3 border border-purple-400/60 shadow-2xl min-w-max">
        <div className="w-3 h-3 bg-purple-400 rounded-full animate-rave-particle-glow shadow-purple-400/80 shadow-lg flex-shrink-0"></div>
        <span className="text-purple-200 text-sm sm:text-base font-semibold whitespace-nowrap">
          🎵 Dance Mode Active 🎵
        </span>
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 animate-bounce flex-shrink-0"
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
  );
};
