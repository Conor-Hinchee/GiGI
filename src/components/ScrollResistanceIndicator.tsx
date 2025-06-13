import React from "react";

interface ScrollResistanceIndicatorProps {
  scrollResistance: number;
  isVisible: boolean;
  isMobile?: boolean;
}

export const ScrollResistanceIndicator: React.FC<
  ScrollResistanceIndicatorProps
> = ({ scrollResistance, isVisible, isMobile = false }) => {
  if (!isVisible) return null;

  const isNearThreshold = scrollResistance > 0.8;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      {/* Enhanced visual scroll resistance indicator - Mobile only */}
      {isMobile && (
        <div
          className={`bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 border border-purple-400/50 transition-all duration-300 ${
            isNearThreshold ? "scale-110 border-yellow-400/80" : ""
          }`}
        >
          <div className="flex items-center space-x-3">
            <span
              className={`text-sm font-medium transition-colors duration-300 ${
                isNearThreshold ? "text-yellow-200" : "text-white"
              }`}
            >
              {isNearThreshold ? "🎵 Almost there!" : "Keep scrolling..."}
            </span>
            <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-200 ease-out ${
                  isNearThreshold
                    ? "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
                    : "bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"
                }`}
                style={{
                  width: `${scrollResistance * 100}%`,
                  boxShadow: isNearThreshold
                    ? "0 0 10px rgba(255, 255, 0, 0.6)"
                    : "none",
                }}
              />
            </div>
            <span
              className={`text-xs opacity-60 transition-colors duration-300 ${
                isNearThreshold ? "text-yellow-200" : "text-white"
              }`}
            >
              {Math.round(scrollResistance * 100)}%
            </span>
          </div>

          {/* Pulsing ring when near threshold - Mobile only */}
          {isNearThreshold && (
            <>
              <div className="absolute -inset-2 bg-yellow-400/20 rounded-full animate-ping" />
              <div className="absolute -inset-4 bg-yellow-400/10 rounded-full animate-pulse" />
            </>
          )}
        </div>
      )}

      {/* Dance particles when ready to snap - Shows on both mobile and desktop */}
      {isNearThreshold && (
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 ${
            isMobile ? "-top-6" : "-top-4"
          }`}
        >
          <div className="flex space-x-2">
            <span
              className="text-yellow-400 animate-bounce"
              style={{ animationDelay: "0s" }}
            >
              ✨
            </span>
            <span
              className="text-pink-400 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            >
              🎵
            </span>
            <span
              className="text-purple-400 animate-bounce"
              style={{ animationDelay: "0.4s" }}
            >
              ✨
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
