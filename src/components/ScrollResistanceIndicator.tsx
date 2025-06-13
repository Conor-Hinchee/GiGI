import React from "react";

interface ScrollResistanceIndicatorProps {
  scrollResistance: number;
  isVisible: boolean;
}

export const ScrollResistanceIndicator: React.FC<
  ScrollResistanceIndicatorProps
> = ({ scrollResistance, isVisible }) => {
  if (!isVisible) return null;

  const isNearThreshold = scrollResistance > 0.8;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      {/* Dance particles when ready to snap */}
      {isNearThreshold && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
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
