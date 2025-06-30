import React from "react";

interface MarbleFloorProps {
  isPlaying?: boolean;
}

export const MarbleFloor: React.FC<MarbleFloorProps> = ({ isPlaying = false }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-1/3 z-10">
      {/* Marble floor base */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-200 via-gray-100 to-gray-50 opacity-90">
        {/* Marble veining pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 30%, rgba(156, 163, 175, 0.3) 31%, rgba(156, 163, 175, 0.3) 33%, transparent 34%),
              linear-gradient(-45deg, transparent 30%, rgba(107, 114, 128, 0.2) 31%, rgba(107, 114, 128, 0.2) 33%, transparent 34%),
              linear-gradient(60deg, transparent 60%, rgba(75, 85, 99, 0.1) 61%, rgba(75, 85, 99, 0.1) 63%, transparent 64%)
            `,
            backgroundSize: "80px 80px, 120px 120px, 200px 200px",
            backgroundPosition: "0 0, 40px 40px, 100px 100px",
          }}
        />
        
        {/* Additional marble texture */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(156, 163, 175, 0.4) 2px, transparent 2px),
              radial-gradient(circle at 80% 70%, rgba(107, 114, 128, 0.3) 1px, transparent 1px),
              radial-gradient(circle at 60% 90%, rgba(75, 85, 99, 0.2) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "100px 100px, 150px 150px, 200px 200px",
          }}
        />
      </div>

      {/* Polished reflection surface */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent">
        {/* Subtle shine effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 ${
            isPlaying ? "animate-shine" : ""
          }`}
          style={{
            transform: "skewX(-20deg)",
          }}
        />
      </div>

      {/* Reflection blur overlay - this will be where character reflections appear */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent backdrop-blur-[1px]" />

      {/* Edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
};
