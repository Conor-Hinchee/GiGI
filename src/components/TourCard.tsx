import React, { useState } from "react";
import { TourCardProps } from "../types";

export const TourCard: React.FC<TourCardProps> = ({ tourDate, isPlaying }) => {
  const { city, venue, date, year, color, url } = tourDate;
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      purple: {
        text: "text-purple-200",
        date: "text-purple-300",
        particle: "bg-purple-400/60",
      },
      pink: {
        text: "text-pink-200",
        date: "text-pink-300",
        particle: "bg-pink-400/60",
      },
      blue: {
        text: "text-blue-200",
        date: "text-blue-300",
        particle: "bg-blue-400/60",
      },
      green: {
        text: "text-green-200",
        date: "text-green-300",
        particle: "bg-green-400/60",
      },
      yellow: {
        text: "text-yellow-200",
        date: "text-yellow-300",
        particle: "bg-yellow-400/60",
      },
      red: {
        text: "text-red-200",
        date: "text-red-300",
        particle: "bg-red-400/60",
      },
      gold: {
        text: "text-yellow-200",
        date: "text-yellow-300",
        particle: "bg-yellow-400/60",
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.purple;
  };

  const colors = getColorClasses(color);

  // Determine if we should show rave effects (either playing or hovered)
  const showRaveEffect = isPlaying || isHovered;

  return (
    <div
      className={`bg-gray-800/50 backdrop-blur p-6 rounded-lg transition-all duration-300 relative ${
        showRaveEffect
          ? "border-trace-rave transform scale-105"
          : "border border-gray-700"
      } ${url ? "cursor-pointer hover:bg-gray-700/50" : ""} gigi-tour-card`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role={url ? "button" : undefined}
      tabIndex={url ? 0 : undefined}
      onKeyDown={(e) => {
        if (url && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Particle indicator - visible when playing or hovered */}
      {showRaveEffect && (
        <div className="hidden lg:block absolute -top-2 -right-2 w-4 h-4 rounded-full blur-sm transition-all duration-500">
          <div
            className={`${colors.particle} animate-ping w-full h-full rounded-full`}
          ></div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <p
            className={`font-bold text-lg transition-colors ${
              showRaveEffect ? colors.text : "text-white"
            }`}
          >
            {city}
          </p>
          <p
            className={`transition-colors ${
              showRaveEffect ? "text-gray-200" : "text-gray-300"
            }`}
          >
            {venue}
          </p>
        </div>
        <div className="text-right">
          <p
            className={`font-semibold transition-colors ${
              showRaveEffect ? colors.date : "text-purple-400"
            }`}
          >
            {date}
          </p>
          <p
            className={`text-sm transition-colors ${
              showRaveEffect ? "text-gray-300" : "text-gray-400"
            }`}
          >
            {year}
          </p>
        </div>
      </div>
    </div>
  );
};
