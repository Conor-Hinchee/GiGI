import React from "react";

interface ViewportBorderIndicatorProps {
  scrollResistance: number;
  isVisible: boolean;
}

const ViewportBorderIndicator: React.FC<ViewportBorderIndicatorProps> = ({
  scrollResistance,
  isVisible,
}) => {
  if (!isVisible) return null;

  // Calculate border color progression from purple to gold based on section progress
  const getBorderColor = () => {
    if (scrollResistance < 0.3) {
      // Purple phase (147, 51, 234) - Deep purple
      const intensity = 0.4 + scrollResistance * 1.6;
      return `rgba(147, 51, 234, ${intensity})`;
    } else if (scrollResistance < 0.7) {
      // Purple to pink/magenta transition (147,51,234) -> (236,72,153)
      const progress = (scrollResistance - 0.3) / 0.4;
      const r = 147 + progress * 89;
      const g = 51 + progress * 21;
      const b = 234 - progress * 81;
      const intensity = 0.6 + scrollResistance * 0.4;
      return `rgba(${r}, ${g}, ${b}, ${intensity})`;
    } else {
      // Pink to gold transition (236,72,153) -> (255,215,0)
      const progress = (scrollResistance - 0.7) / 0.3;
      const r = 236 + progress * 19;
      const g = 72 + progress * 143;
      const b = 153 - progress * 153;
      const intensity = 0.8 + scrollResistance * 0.2;
      return `rgba(${r}, ${g}, ${b}, ${intensity})`;
    }
  };

  const getBorderWidth = () => {
    return Math.max(2, scrollResistance * 8); // 2px to 8px for subtler effect
  };

  const getGlowIntensity = () => {
    return scrollResistance * 80; // 0 to 80px glow
  };

  const getRaveClasses = () => {
    if (scrollResistance > 0.8) return "rave-border-pulse rave-border-flow";
    if (scrollResistance > 0.5) return "rave-border-pulse";
    return "";
  };

  return (
    <>
      {/* Top border with progress fill */}
      <div
        className={`fixed top-0 left-0 right-0 z-[60] pointer-events-none transition-all duration-300 ${getRaveClasses()}`}
        style={{
          height: `${getBorderWidth()}px`,
          background: `linear-gradient(90deg, ${getBorderColor()} ${
            scrollResistance * 100
          }%, rgba(147, 51, 234, 0.2) ${scrollResistance * 100}%)`,
          boxShadow: `0 0 ${getGlowIntensity()}px ${getBorderColor()}`,
        }}
      />

      {/* Right border with progress fill */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[60] pointer-events-none transition-all duration-300 ${getRaveClasses()}`}
        style={{
          width: `${getBorderWidth()}px`,
          background: `linear-gradient(180deg, ${getBorderColor()} ${
            scrollResistance * 100
          }%, rgba(147, 51, 234, 0.2) ${scrollResistance * 100}%)`,
          boxShadow: `0 0 ${getGlowIntensity()}px ${getBorderColor()}`,
        }}
      />

      {/* Bottom border with progress fill */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[60] pointer-events-none transition-all duration-300 ${getRaveClasses()}`}
        style={{
          height: `${getBorderWidth()}px`,
          background: `linear-gradient(270deg, ${getBorderColor()} ${
            scrollResistance * 100
          }%, rgba(147, 51, 234, 0.2) ${scrollResistance * 100}%)`,
          boxShadow: `0 0 ${getGlowIntensity()}px ${getBorderColor()}`,
        }}
      />

      {/* Left border with progress fill */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-[60] pointer-events-none transition-all duration-300 ${getRaveClasses()}`}
        style={{
          width: `${getBorderWidth()}px`,
          background: `linear-gradient(0deg, ${getBorderColor()} ${
            scrollResistance * 100
          }%, rgba(147, 51, 234, 0.2) ${scrollResistance * 100}%)`,
          boxShadow: `0 0 ${getGlowIntensity()}px ${getBorderColor()}`,
        }}
      />

      {/* Corner indicators for extra rave effect */}
      {scrollResistance > 0.4 && (
        <>
          {/* Top-left corner */}
          <div
            className="fixed top-0 left-0 z-[61] pointer-events-none rave-corner-dance"
            style={{
              width: `${getBorderWidth() * 6}px`,
              height: `${getBorderWidth() * 6}px`,
              background: `radial-gradient(circle, ${getBorderColor()}, transparent 70%)`,
              filter: `blur(${Math.max(1, scrollResistance * 3)}px)`,
            }}
          />

          {/* Top-right corner */}
          <div
            className="fixed top-0 right-0 z-[61] pointer-events-none rave-corner-dance"
            style={{
              width: `${getBorderWidth() * 6}px`,
              height: `${getBorderWidth() * 6}px`,
              background: `radial-gradient(circle, ${getBorderColor()}, transparent 70%)`,
              filter: `blur(${Math.max(1, scrollResistance * 3)}px)`,
              animationDelay: "0.5s",
            }}
          />

          {/* Bottom-left corner */}
          <div
            className="fixed bottom-0 left-0 z-[61] pointer-events-none rave-corner-dance"
            style={{
              width: `${getBorderWidth() * 6}px`,
              height: `${getBorderWidth() * 6}px`,
              background: `radial-gradient(circle, ${getBorderColor()}, transparent 70%)`,
              filter: `blur(${Math.max(1, scrollResistance * 3)}px)`,
              animationDelay: "1s",
            }}
          />

          {/* Bottom-right corner */}
          <div
            className="fixed bottom-0 right-0 z-[61] pointer-events-none rave-corner-dance"
            style={{
              width: `${getBorderWidth() * 6}px`,
              height: `${getBorderWidth() * 6}px`,
              background: `radial-gradient(circle, ${getBorderColor()}, transparent 70%)`,
              filter: `blur(${Math.max(1, scrollResistance * 3)}px)`,
              animationDelay: "1.5s",
            }}
          />
        </>
      )}

      {/* Central pulse effect when near threshold */}
      {scrollResistance > 0.85 && (
        <div
          className="fixed inset-0 z-[59] pointer-events-none animate-ping"
          style={{
            background: `radial-gradient(circle at center, transparent 30%, ${getBorderColor()} 50%, transparent 70%)`,
            opacity: 0.2,
          }}
        />
      )}

      {/* Ultra rave mode - screen flash effect */}
      {scrollResistance > 0.95 && (
        <div
          className="fixed inset-0 z-[58] pointer-events-none animate-pulse"
          style={{
            background: `linear-gradient(45deg, ${getBorderColor()}, transparent, ${getBorderColor()})`,
            opacity: 0.1,
          }}
        />
      )}
    </>
  );
};

export default ViewportBorderIndicator;
