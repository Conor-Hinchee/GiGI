import React from "react";

interface ParallaxLayerProps {
  scrollY: number;
  isMobile: boolean;
  isPlaying: boolean;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  scrollY,
  isMobile,
  isPlaying,
}) => {
  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Layer 0.5 - Ultra-slow floating mini-images for depth */}
      <div
        className="absolute inset-0 opacity-8 parallax-layer"
        style={{
          transform: `translateY(${scrollY * 0.08}px) rotate(${
            scrollY * 0.005
          }deg)`,
        }}
      >
        <div
          className={`absolute top-1/8 left-1/12 w-8 h-12 bg-cover bg-center rounded-md opacity-40 blur-lg ${
            isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/gigi1.png')",
            filter:
              "sepia(60%) hue-rotate(240deg) brightness(0.4) contrast(2.0)",
            mixBlendMode: "soft-light",
            animationDelay: "0s",
            animationDuration: "20s",
          }}
        />

        <div
          className={`absolute top-3/8 right-1/10 w-6 h-6 bg-cover bg-center rounded-full opacity-30 blur-md ${
            isPlaying
              ? "animate-rave-mode-image-dance"
              : "animate-responsive-image-scale"
          }`}
          style={{
            backgroundImage: "url('/舞.png')",
            filter:
              "sepia(40%) hue-rotate(300deg) brightness(0.6) contrast(1.8)",
            mixBlendMode: "color-dodge",
            animationDelay: "5s",
            animationDuration: "25s",
          }}
        />

        <div
          className={`absolute bottom-2/5 left-1/5 w-10 h-6 bg-cover bg-center rounded-lg opacity-35 blur-lg ${
            isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/wave.jpg')",
            filter:
              "sepia(80%) hue-rotate(200deg) brightness(0.3) contrast(2.2)",
            mixBlendMode: "multiply",
            animationDelay: "10s",
            animationDuration: "30s",
          }}
        />

        <div
          className={`absolute top-2/3 right-1/8 w-7 h-7 bg-cover bg-center rounded-full opacity-25 blur-xl ${
            isPlaying
              ? "animate-rave-mode-image-dance"
              : "animate-responsive-image-scale"
          }`}
          style={{
            backgroundImage: "url('/totaleclipse.jpg')",
            filter:
              "sepia(90%) hue-rotate(180deg) brightness(0.2) contrast(3.0)",
            mixBlendMode: "overlay",
            animationDelay: "15s",
            animationDuration: "35s",
          }}
        />

        {/* Additional floating mini-images */}
        <div
          className={`absolute top-1/3 left-1/6 w-6 h-8 bg-cover bg-center rounded-md opacity-30 blur-md ${
            isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/gigi2.jpg')",
            filter:
              "sepia(50%) hue-rotate(120deg) brightness(0.5) contrast(1.8)",
            mixBlendMode: "color-burn",
            animationDelay: "8s",
            animationDuration: "22s",
          }}
        />

        <div
          className={`absolute bottom-1/4 right-1/3 w-5 h-5 bg-cover bg-center rounded-full opacity-35 blur-lg ${
            isPlaying
              ? "animate-rave-mode-image-dance"
              : "animate-responsive-image-scale"
          }`}
          style={{
            backgroundImage: "url('/beautiful.jpg')",
            filter:
              "sepia(40%) hue-rotate(60deg) brightness(0.8) contrast(2.0)",
            mixBlendMode: "soft-light",
            animationDelay: "12s",
            animationDuration: "28s",
          }}
        />

        <div
          className={`absolute top-1/2 right-1/12 w-4 h-6 bg-cover bg-center rounded-md opacity-25 blur-xl ${
            isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/live.jpg')",
            filter:
              "sepia(70%) hue-rotate(340deg) brightness(0.3) contrast(2.5)",
            mixBlendMode: "multiply",
            animationDelay: "18s",
            animationDuration: "32s",
          }}
        />
      </div>

      {/* Layer 1 - Slowest moving background with GiGi images */}
      <div
        className="absolute inset-0 opacity-12 parallax-layer"
        style={{
          transform: `translateY(${scrollY * 0.15}px) translateX(${
            scrollY * 0.02
          }px)`,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.4) 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.3) 0%, transparent 60%),
            radial-gradient(circle at 50% 90%, rgba(59, 130, 246, 0.35) 0%, transparent 60%),
            radial-gradient(circle at 10% 80%, rgba(168, 85, 247, 0.25) 0%, transparent 50%)
          `,
          backgroundSize: "350px 350px, 250px 250px, 450px 450px, 300px 300px",
          backgroundPosition: "0% 0%, 100% 0%, 50% 100%, 20% 80%",
        }}
      />

      {/* Layer 1.5 - GiGi Portrait Images (Very slow parallax) */}
      <div
        className="absolute inset-0 opacity-18 parallax-layer"
        style={{
          transform: `translateY(${scrollY * 0.22}px) scale(${
            1 + scrollY * 0.0002
          }) rotate(${scrollY * 0.01}deg)`,
        }}
      >
        <div
          className={`absolute top-1/4 right-1/6 w-32 h-48 bg-cover bg-center rounded-lg opacity-60 blur-sm ${
            isPlaying ? "animate-rave-mode-image-dance" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/gigi1.png')",
            filter:
              "sepia(30%) hue-rotate(240deg) brightness(0.7) contrast(1.2)",
            mixBlendMode: "overlay",
          }}
        />

        <div
          className={`absolute bottom-1/3 left-1/8 w-40 h-60 bg-cover bg-center rounded-lg opacity-50 blur-sm ${
            isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/gigi2.jpg')",
            filter:
              "sepia(40%) hue-rotate(280deg) brightness(0.6) contrast(1.3)",
            mixBlendMode: "soft-light",
            transform: `rotate(${scrollY * 0.02}deg)`,
            animationDelay: "1s",
          }}
        />

        <div
          className={`absolute top-1/6 left-1/2 w-28 h-42 bg-cover bg-center rounded-lg opacity-55 blur-sm ${
            isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/gigi3.jpg')",
            filter:
              "sepia(35%) hue-rotate(320deg) brightness(0.8) contrast(1.4)",
            mixBlendMode: "color-burn",
            transform: `translateX(-50%) rotate(${scrollY * -0.015}deg)`,
            animationDelay: "3s",
          }}
        />

        <div
          className={`absolute bottom-1/6 right-1/3 w-44 h-32 bg-cover bg-center rounded-xl opacity-45 blur-md ${
            isPlaying ? "animate-rave-mode-image-dance" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/L'amour_toujours.JPG')",
            filter:
              "sepia(45%) hue-rotate(200deg) brightness(0.9) contrast(1.3)",
            mixBlendMode: "overlay",
            animationDelay: "4s",
          }}
        />

        <div
          className={`absolute top-1/2 left-1/8 w-36 h-24 bg-cover bg-center rounded-lg opacity-50 blur-sm ${
            isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/live.jpg')",
            filter:
              "sepia(40%) hue-rotate(350deg) brightness(1.1) contrast(1.2)",
            mixBlendMode: "screen",
            transform: `translateY(${scrollY * 0.05}px)`,
            animationDelay: "5s",
          }}
        />

        <div
          className={`absolute top-3/4 right-1/4 w-36 h-36 bg-cover bg-center rounded-full opacity-40 blur-md ${
            isPlaying ? "animate-rave-mode-image-dance" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/beautiful.jpg')",
            filter:
              "sepia(50%) hue-rotate(300deg) brightness(0.8) contrast(1.1)",
            mixBlendMode: "color-dodge",
            animationDelay: "2s",
          }}
        />

        {/* Additional portrait images */}
        <div
          className={`absolute top-1/8 right-1/4 w-24 h-36 bg-cover bg-center rounded-lg opacity-45 blur-sm ${
            isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/gigi3.jpg')",
            filter:
              "sepia(25%) hue-rotate(160deg) brightness(0.9) contrast(1.3)",
            mixBlendMode: "overlay",
            transform: `translateX(${scrollY * 0.03}px)`,
            animationDelay: "6s",
          }}
        />

        <div
          className={`absolute bottom-1/8 right-1/8 w-20 h-30 bg-cover bg-center rounded-xl opacity-35 blur-md ${
            isPlaying ? "animate-rave-mode-image-dance" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/maxresdefault.jpg')",
            filter:
              "sepia(60%) hue-rotate(40deg) brightness(0.7) contrast(1.5)",
            mixBlendMode: "multiply",
            transform: `rotate(${scrollY * -0.025}deg)`,
            animationDelay: "9s",
          }}
        />

        <div
          className={`absolute top-2/5 left-1/12 w-28 h-20 bg-cover bg-center rounded-2xl opacity-50 blur-sm ${
            isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/2023-12-11-b.jpg')",
            filter:
              "sepia(35%) hue-rotate(220deg) brightness(1.0) contrast(1.2)",
            mixBlendMode: "soft-light",
            transform: `translateY(${scrollY * -0.02}px)`,
            animationDelay: "11s",
          }}
        />

        <div
          className={`absolute bottom-2/5 left-1/3 w-32 h-24 bg-cover bg-center rounded-lg opacity-55 blur-sm ${
            isPlaying ? "animate-rave-mode-image-dance" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/L'amour_toujours.JPG')",
            filter:
              "sepia(45%) hue-rotate(280deg) brightness(0.8) contrast(1.4)",
            mixBlendMode: "color-burn",
            animationDelay: "7s",
          }}
        />
      </div>

      {/* Layer 2 - Medium speed background with album artwork */}
      <div
        className="absolute inset-0 opacity-20 parallax-layer"
        style={{
          transform: `translateY(${scrollY * 0.45}px) translateX(${
            scrollY * -0.05
          }px) rotate(${scrollY * 0.008}deg)`,
          backgroundImage: `
            linear-gradient(45deg, transparent 30%, rgba(147, 51, 234, 0.15) 50%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(236, 72, 153, 0.15) 50%, transparent 70%),
            linear-gradient(135deg, transparent 40%, rgba(59, 130, 246, 0.1) 50%, transparent 60%)
          `,
          backgroundSize: "180px 180px, 120px 120px, 250px 250px",
          backgroundPosition: "0% 0%, 50% 50%, 25% 75%",
        }}
      >
        <div
          className={`absolute top-1/6 left-1/3 w-24 h-24 bg-cover bg-center rounded-lg opacity-70 blur-sm ${
            isPlaying ? "animate-rave-mode-image-dance" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/2023-12-11-b.jpg')",
            filter:
              "sepia(30%) hue-rotate(260deg) brightness(0.9) contrast(1.2)",
            mixBlendMode: "multiply",
            transform: `rotate(${-scrollY * 0.03}deg)`,
            animationDelay: "0.5s",
          }}
        />

        <div
          className={`absolute bottom-1/4 right-1/6 w-28 h-28 bg-cover bg-center rounded-full opacity-60 blur-sm ${
            isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/2410soundoflove(1).jpg')",
            filter:
              "sepia(25%) hue-rotate(300deg) brightness(1.1) contrast(1.1)",
            mixBlendMode: "screen",
            animationDelay: "1.5s",
          }}
        />

        <div
          className={`absolute top-2/3 left-1/8 w-32 h-20 bg-cover bg-center rounded-xl opacity-50 blur-md ${
            isPlaying ? "animate-rave-mode-image-dance" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/totaleclipse.jpg')",
            filter:
              "sepia(60%) hue-rotate(240deg) brightness(0.7) contrast(1.4)",
            mixBlendMode: "overlay",
            transform: `translateX(${scrollY * 0.1}px)`,
            animationDelay: "2.5s",
          }}
        />

        <div
          className={`absolute top-1/8 right-1/8 w-20 h-15 bg-cover bg-center rounded-md opacity-65 blur-sm ${
            isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/maxresdefault.jpg')",
            filter:
              "sepia(50%) hue-rotate(180deg) brightness(1.2) contrast(1.1)",
            mixBlendMode: "multiply",
            transform: `rotate(${scrollY * 0.04}deg)`,
            animationDelay: "3.5s",
          }}
        />

        <div
          className={`absolute bottom-1/8 left-1/4 w-40 h-20 bg-cover bg-center rounded-2xl opacity-40 blur-lg ${
            isPlaying ? "animate-rave-mode-image-dance" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/wave.jpg')",
            filter:
              "sepia(30%) hue-rotate(220deg) brightness(0.8) contrast(1.5)",
            mixBlendMode: "color-dodge",
            transform: `translateX(${scrollY * -0.08}px)`,
            animationDelay: "4.5s",
          }}
        />

        {/* Additional album artwork and images */}
        <div
          className={`absolute top-1/3 right-1/5 w-22 h-22 bg-cover bg-center rounded-full opacity-55 blur-sm ${
            isPlaying
              ? "animate-image-pulse-glow"
              : "animate-responsive-image-scale"
          }`}
          style={{
            backgroundImage: "url('/2410soundoflove(1).jpg')",
            filter:
              "sepia(40%) hue-rotate(80deg) brightness(1.0) contrast(1.3)",
            mixBlendMode: "screen",
            transform: `rotate(${scrollY * 0.06}deg)`,
            animationDelay: "2.8s",
          }}
        />

        <div
          className={`absolute bottom-1/3 right-1/12 w-18 h-24 bg-cover bg-center rounded-lg opacity-45 blur-md ${
            isPlaying ? "animate-rave-mode-image-dance" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/舞.png')",
            filter:
              "sepia(55%) hue-rotate(200deg) brightness(0.9) contrast(1.6)",
            mixBlendMode: "color-burn",
            transform: `translateY(${scrollY * 0.07}px)`,
            animationDelay: "6.2s",
          }}
        />

        <div
          className={`absolute top-3/5 left-1/8 w-26 h-18 bg-cover bg-center rounded-xl opacity-50 blur-sm ${
            isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/totaleclipse.jpg')",
            filter:
              "sepia(30%) hue-rotate(320deg) brightness(1.1) contrast(1.2)",
            mixBlendMode: "overlay",
            transform: `translateX(${scrollY * 0.12}px) rotate(${
              scrollY * -0.02
            }deg)`,
            animationDelay: "8.7s",
          }}
        />

        <div
          className={`absolute top-1/12 left-1/2 w-16 h-20 bg-cover bg-center rounded-md opacity-60 blur-sm ${
            isPlaying
              ? "animate-rave-mode-image-dance"
              : "animate-responsive-image-scale"
          }`}
          style={{
            backgroundImage: "url('/gigi1.png')",
            filter:
              "sepia(20%) hue-rotate(140deg) brightness(1.2) contrast(1.1)",
            mixBlendMode: "multiply",
            transform: `translateX(-50%) rotate(${scrollY * 0.05}deg)`,
            animationDelay: "5.1s",
          }}
        />
      </div>

      {/* Layer 3 - Fast moving foreground elements */}
      <div
        className="absolute inset-0 opacity-12 parallax-layer"
        style={{
          transform: `translateY(${scrollY * 0.7}px) translateX(${
            scrollY * 0.08
          }px) rotate(${scrollY * -0.012}deg)`,
        }}
      >
        <div
          className={`absolute top-1/4 left-1/5 w-14 h-18 bg-cover bg-center rounded-lg opacity-65 blur-sm ${
            isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/live.jpg')",
            filter:
              "sepia(45%) hue-rotate(15deg) brightness(1.3) contrast(1.4)",
            mixBlendMode: "screen",
            animationDelay: "1.2s",
          }}
        />

        <div
          className={`absolute bottom-1/5 right-1/4 w-12 h-16 bg-cover bg-center rounded-full opacity-55 blur-md ${
            isPlaying
              ? "animate-rave-mode-image-dance"
              : "animate-responsive-image-scale"
          }`}
          style={{
            backgroundImage: "url('/beautiful.jpg')",
            filter:
              "sepia(60%) hue-rotate(260deg) brightness(0.8) contrast(1.7)",
            mixBlendMode: "color-dodge",
            animationDelay: "3.4s",
          }}
        />

        <div
          className={`absolute top-2/3 left-1/8 w-10 h-14 bg-cover bg-center rounded-xl opacity-70 blur-sm ${
            isPlaying ? "animate-image-pulse-glow" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/gigi2.jpg')",
            filter:
              "sepia(25%) hue-rotate(180deg) brightness(1.1) contrast(1.2)",
            mixBlendMode: "soft-light",
            animationDelay: "7.6s",
          }}
        />

        <div
          className={`absolute top-1/8 right-1/6 w-8 h-12 bg-cover bg-center rounded-md opacity-50 blur-lg ${
            isPlaying ? "animate-rave-mode-image-dance" : "animate-image-drift"
          }`}
          style={{
            backgroundImage: "url('/wave.jpg')",
            filter:
              "sepia(70%) hue-rotate(100deg) brightness(0.7) contrast(2.0)",
            mixBlendMode: "multiply",
            animationDelay: "4.9s",
          }}
        />
      </div>
    </div>
  );
};
