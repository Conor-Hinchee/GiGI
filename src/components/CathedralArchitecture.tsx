import React from "react";

interface CathedralArchitectureProps {
  isPlaying?: boolean;
  isVisible?: boolean;
}

export const CathedralArchitecture: React.FC<CathedralArchitectureProps> = ({ 
  isPlaying = false, 
  isVisible = true 
}) => {
  return (
    <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
      {/* Left Column */}
      <div 
        className={`absolute left-8 top-0 bottom-0 transition-all duration-2000 ${
          isVisible ? "opacity-80 transform-none" : "opacity-0 -translate-x-full"
        }`}
      >
        {/* Column Base */}
        <div className="absolute bottom-0 w-16 h-32 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100 rounded-t-lg opacity-70">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 via-transparent to-gray-600/20 rounded-t-lg" />
        </div>
        
        {/* Column Shaft */}
        <div className="absolute bottom-32 w-12 h-[60vh] bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 mx-2 opacity-60">
          {/* Vertical marble veining */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 40%, rgba(107, 114, 128, 0.2) 41%, rgba(107, 114, 128, 0.2) 43%, transparent 44%),
                linear-gradient(0deg, transparent 70%, rgba(75, 85, 99, 0.1) 71%, rgba(75, 85, 99, 0.1) 73%, transparent 74%)
              `,
              backgroundSize: "100% 120px, 100% 200px",
            }}
          />
        </div>
        
        {/* Column Capital */}
        <div className="absolute top-[8vh] w-20 h-12 bg-gradient-to-t from-gray-200 to-gray-100 -ml-2 rounded-lg opacity-70">
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-gray-500/20 rounded-lg" />
        </div>
      </div>

      {/* Right Column */}
      <div 
        className={`absolute right-8 top-0 bottom-0 transition-all duration-2000 ${
          isVisible ? "opacity-80 transform-none" : "opacity-0 translate-x-full"
        }`}
      >
        {/* Column Base */}
        <div className="absolute bottom-0 w-16 h-32 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-100 rounded-t-lg opacity-70">
          <div className="absolute inset-0 bg-gradient-to-l from-gray-400/20 via-transparent to-gray-600/20 rounded-t-lg" />
        </div>
        
        {/* Column Shaft */}
        <div className="absolute bottom-32 w-12 h-[60vh] bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 mx-2 opacity-60">
          {/* Vertical marble veining */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 40%, rgba(107, 114, 128, 0.2) 41%, rgba(107, 114, 128, 0.2) 43%, transparent 44%),
                linear-gradient(0deg, transparent 70%, rgba(75, 85, 99, 0.1) 71%, rgba(75, 85, 99, 0.1) 73%, transparent 74%)
              `,
              backgroundSize: "100% 120px, 100% 200px",
            }}
          />
        </div>
        
        {/* Column Capital */}
        <div className="absolute top-[8vh] w-20 h-12 bg-gradient-to-t from-gray-200 to-gray-100 -ml-2 rounded-lg opacity-70">
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-gray-500/20 rounded-lg" />
        </div>
      </div>

      {/* Gothic Arch connecting the columns */}
      <div 
        className={`absolute top-[8vh] left-1/2 transform -translate-x-1/2 transition-all duration-2000 ${
          isVisible ? "opacity-70 transform-none" : "opacity-0 -translate-y-full"
        }`}
      >
        {/* Arch SVG */}
        <svg 
          width="300" 
          height="120" 
          viewBox="0 0 300 120" 
          className="filter drop-shadow-lg"
        >
          <defs>
            <linearGradient id="archGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#f3f4f6", stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: "#e5e7eb", stopOpacity: 0.6 }} />
              <stop offset="100%" style={{ stopColor: "#d1d5db", stopOpacity: 0.7 }} />
            </linearGradient>
          </defs>
          <path 
            d="M 20 120 Q 20 20 150 20 Q 280 20 280 120" 
            fill="url(#archGradient)" 
            stroke="rgba(107, 114, 128, 0.3)" 
            strokeWidth="2"
          />
          {/* Inner arch for depth */}
          <path 
            d="M 40 120 Q 40 40 150 40 Q 260 40 260 120" 
            fill="none" 
            stroke="rgba(156, 163, 175, 0.4)" 
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Light rays from above - cathedral lighting effect */}
      <div 
        className={`absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-3000 ${
          isVisible ? "opacity-40" : "opacity-0"
        } ${isPlaying ? "opacity-60" : ""}`}
      >
        {/* Central light ray */}
        <div 
          className="w-1 h-[40vh] bg-gradient-to-b from-yellow-200/60 via-yellow-100/30 to-transparent"
          style={{
            boxShadow: isPlaying 
              ? "0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 215, 0, 0.4)"
              : "0 0 10px rgba(255, 255, 255, 0.3)"
          }}
        />
      </div>

      {/* Additional light rays */}
      <div 
        className={`absolute top-0 left-1/3 transform -translate-x-1/2 transition-all duration-3000 ${
          isVisible ? "opacity-30" : "opacity-0"
        } ${isPlaying ? "opacity-50" : ""}`}
      >
        <div 
          className="w-0.5 h-[35vh] bg-gradient-to-b from-white/40 via-white/20 to-transparent"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div 
        className={`absolute top-0 right-1/3 transform translate-x-1/2 transition-all duration-3000 ${
          isVisible ? "opacity-30" : "opacity-0"
        } ${isPlaying ? "opacity-50" : ""}`}
      >
        <div 
          className="w-0.5 h-[35vh] bg-gradient-to-b from-white/40 via-white/20 to-transparent"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Atmospheric haze for cathedral feel */}
      <div 
        className={`absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent transition-all duration-2000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};
