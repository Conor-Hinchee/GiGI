import React from "react";

interface DanceCharacterProps {
  isPlaying?: boolean;
  isVisible?: boolean;
}

export const DanceCharacter: React.FC<DanceCharacterProps> = ({ 
  isPlaying = false, 
  isVisible = true 
}) => {
  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {/* Main character 舞 positioned in upper center */}
      <div 
        className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <div 
          className={`text-white drop-shadow-2xl transition-all duration-500 ${
            isPlaying 
              ? "text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] animate-pulse text-yellow-200" 
              : "text-5xl sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem]"
          }`}
          style={{
            fontFamily: "'Noto Sans SC', 'SimSun', '宋体', serif",
            textShadow: isPlaying 
              ? "0 0 30px rgba(255, 255, 255, 0.8), 0 0 60px rgba(255, 215, 0, 0.6), 0 0 90px rgba(255, 215, 0, 0.4)"
              : "0 0 20px rgba(255, 255, 255, 0.5), 0 0 40px rgba(255, 255, 255, 0.3)"
          }}
        >
          舞
        </div>
      </div>

      {/* Reflection of the character on the marble floor */}
      <div 
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          isVisible ? "opacity-60 scale-100" : "opacity-0 scale-50"
        }`}
        style={{
          transform: "translateX(-50%) scaleY(-1)", // Flip vertically for reflection
          filter: "blur(2px)", // Blur the reflection for realism
          background: "linear-gradient(to top, rgba(255,255,255,0.1) 0%, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 70%)",
          maskImage: "linear-gradient(to top, black 0%, transparent 70%)"
        }}
      >
        <div 
          className={`text-white transition-all duration-500 ${
            isPlaying 
              ? "text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-yellow-200/60" 
              : "text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl text-white/40"
          }`}
          style={{
            fontFamily: "'Noto Sans SC', 'SimSun', '宋体', serif",
            textShadow: isPlaying 
              ? "0 0 15px rgba(255, 215, 0, 0.3)"
              : "0 0 10px rgba(255, 255, 255, 0.2)"
          }}
        >
          舞
        </div>
      </div>
    </div>
  );
};
