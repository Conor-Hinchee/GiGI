import React from "react";
import { TourCardProps } from "../types";

export const TourCard: React.FC<TourCardProps> = ({ tourDate, isPlaying }) => {
  const { city, venue, date, year, color } = tourDate;

  const getColorClasses = (color: string) => {
    const colorMap = {
      purple: {
        text: "text-purple-200",
        textHover: "group-hover:text-purple-200",
        date: "text-purple-300",
        dateHover: "group-hover:text-purple-300",
        particle: "bg-purple-400/60",
        particleHover: "group-hover:bg-purple-400/60",
      },
      pink: {
        text: "text-pink-200",
        textHover: "group-hover:text-pink-200",
        date: "text-pink-300",
        dateHover: "group-hover:text-pink-300",
        particle: "bg-pink-400/60",
        particleHover: "group-hover:bg-pink-400/60",
      },
      blue: {
        text: "text-blue-200",
        textHover: "group-hover:text-blue-200",
        date: "text-blue-300",
        dateHover: "group-hover:text-blue-300",
        particle: "bg-blue-400/60",
        particleHover: "group-hover:bg-blue-400/60",
      },
      green: {
        text: "text-green-200",
        textHover: "group-hover:text-green-200",
        date: "text-green-300",
        dateHover: "group-hover:text-green-300",
        particle: "bg-green-400/60",
        particleHover: "group-hover:bg-green-400/60",
      },
      yellow: {
        text: "text-yellow-200",
        textHover: "group-hover:text-yellow-200",
        date: "text-yellow-300",
        dateHover: "group-hover:text-yellow-300",
        particle: "bg-yellow-400/60",
        particleHover: "group-hover:bg-yellow-400/60",
      },
      red: {
        text: "text-red-200",
        textHover: "group-hover:text-red-200",
        date: "text-red-300",
        dateHover: "group-hover:text-red-300",
        particle: "bg-red-400/60",
        particleHover: "group-hover:bg-red-400/60",
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.purple;
  };

  const colors = getColorClasses(color);

  return (
    <div
      className={`bg-gray-800/50 backdrop-blur p-6 rounded-lg transition-all duration-300 hover-trail group relative ${
        isPlaying
          ? "border-trace-rave transform scale-105"
          : "border border-gray-700 hover:border-trace-rave hover:transform hover:scale-105"
      } gigi-tour-card`}
    >
      <div
        className={`hidden lg:block absolute -top-2 -right-2 w-4 h-4 rounded-full blur-sm transition-all duration-500 ${
          isPlaying
            ? `${colors.particle} animate-ping`
            : `${colors.particle.replace("60", "0")} ${
                colors.particleHover
              } group-hover:animate-ping`
        }`}
      ></div>
      <div className="flex justify-between items-center">
        <div>
          <p
            className={`font-bold text-lg transition-colors ${
              isPlaying ? colors.text : `text-white ${colors.textHover}`
            }`}
          >
            {city}
          </p>
          <p
            className={`transition-colors ${
              isPlaying
                ? "text-gray-200"
                : "text-gray-300 group-hover:text-gray-200"
            }`}
          >
            {venue}
          </p>
        </div>
        <div className="text-right">
          <p
            className={`font-semibold transition-colors ${
              isPlaying ? colors.date : `text-purple-400 ${colors.dateHover}`
            }`}
          >
            {date}
          </p>
          <p
            className={`text-sm transition-colors ${
              isPlaying
                ? "text-gray-300"
                : "text-gray-400 group-hover:text-gray-300"
            }`}
          >
            {year}
          </p>
        </div>
      </div>
    </div>
  );
};
