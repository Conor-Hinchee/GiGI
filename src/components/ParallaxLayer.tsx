import React from "react";

interface ParallaxLayerProps {
  scrollY: number;
  isMobile: boolean;
  isPlaying: boolean;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  scrollY,
  isMobile, // Kept for future use
}) => {
  // Reference isMobile to avoid TypeScript error while keeping for future use
  void isMobile;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Layer 0.5 - Ultra-slow floating mini-images for depth - Enhanced visibility */}
      <div
        className="absolute inset-0 opacity-15 parallax-layer"
        style={{
          transform: `translateY(${scrollY * 0.12}px) rotate(${
            scrollY * 0.008
          }deg)`,
        }}
      >
        <div
          className="absolute top-1/8 left-1/12 w-15 h-21 bg-cover bg-center rounded-md opacity-70 blur-md animate-image-pulse-glow"
          style={{
            backgroundImage:
              "url('/photos/494129947_18347219656159300_4898537729932306818_n.jpg')",
            filter:
              "sepia(60%) hue-rotate(240deg) brightness(0.8) contrast(1.8)",
            mixBlendMode: "soft-light",
            animationDelay: "0s",
            animationDuration: "18s",
          }}
        />

        <div
          className="absolute top-3/8 right-1/10 w-12 h-12 bg-cover bg-center rounded-full opacity-60 blur-sm animate-rave-mode-image-dance"
          style={{
            backgroundImage: "url('/photos/舞.png')",
            filter:
              "sepia(40%) hue-rotate(300deg) brightness(0.9) contrast(1.6)",
            mixBlendMode: "color-dodge",
            animationDelay: "4s",
            animationDuration: "20s",
          }}
        />

        <div
          className="absolute bottom-2/5 left-1/5 w-18 h-12 bg-cover bg-center rounded-lg opacity-65 blur-md animate-image-pulse-glow"
          style={{
            backgroundImage:
              "url('/photos/461998260_518091001085360_8321732667836278317_n.jpg')",
            filter:
              "sepia(80%) hue-rotate(200deg) brightness(0.6) contrast(2.0)",
            mixBlendMode: "multiply",
            animationDelay: "8s",
            animationDuration: "25s",
          }}
        />

        <div
          className="absolute top-2/3 right-1/8 w-14 h-14 bg-cover bg-center rounded-full opacity-55 blur-lg animate-rave-mode-image-dance"
          style={{
            backgroundImage: "url('/photos/totaleclipse.jpg')",
            filter:
              "sepia(90%) hue-rotate(180deg) brightness(0.5) contrast(2.5)",
            mixBlendMode: "overlay",
            animationDelay: "12s",
            animationDuration: "30s",
          }}
        />

        <div
          className="absolute top-1/3 left-1/6 w-12 h-15 bg-cover bg-center rounded-md opacity-60 blur-sm animate-image-pulse-glow"
          style={{
            backgroundImage:
              "url('/photos/470167483_573781295374567_3574809607622125311_n.jpg')",
            filter:
              "sepia(50%) hue-rotate(120deg) brightness(0.8) contrast(1.6)",
            mixBlendMode: "color-burn",
            animationDelay: "6s",
            animationDuration: "18s",
          }}
        />

        <div
          className="absolute bottom-1/4 right-1/3 w-11 h-11 bg-cover bg-center rounded-full opacity-65 blur-md animate-rave-mode-image-dance"
          style={{
            backgroundImage: "url('/photos/beautiful.jpg')",
            filter:
              "sepia(40%) hue-rotate(60deg) brightness(1.1) contrast(1.8)",
            mixBlendMode: "soft-light",
            animationDelay: "10s",
            animationDuration: "22s",
          }}
        />

        <div
          className="absolute top-1/2 right-1/12 w-9 h-12 bg-cover bg-center rounded-md opacity-55 blur-lg animate-image-pulse-glow"
          style={{
            backgroundImage:
              "url('/photos/30915563_301578003709556_3870154202466484224_n.jpg')",
            filter:
              "sepia(70%) hue-rotate(340deg) brightness(0.7) contrast(2.2)",
            mixBlendMode: "multiply",
            animationDelay: "14s",
            animationDuration: "26s",
          }}
        />
      </div>

      {/* Layer 1 - Slowest moving background with enhanced gradients */}
      <div
        className="absolute inset-0 opacity-18 parallax-layer"
        style={{
          transform: `translateY(${scrollY * 0.2}px) translateX(${
            scrollY * 0.03
          }px)`,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(147, 51, 234, 0.5) 0%, transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.4) 0%, transparent 60%),
            radial-gradient(circle at 50% 90%, rgba(59, 130, 246, 0.45) 0%, transparent 60%),
            radial-gradient(circle at 10% 80%, rgba(168, 85, 247, 0.35) 0%, transparent 50%)
          `,
          backgroundSize: "350px 350px, 250px 250px, 450px 450px, 300px 300px",
          backgroundPosition: "0% 0%, 100% 0%, 50% 100%, 20% 80%",
        }}
      />

      {/* Layer 1.5 - GiGi Portrait Images (Enhanced for smaller scroll space) */}
      <div
        className="absolute inset-0 opacity-25 parallax-layer"
        style={{
          transform: `translateY(${scrollY * 0.35}px) scale(${
            1 + scrollY * 0.0004
          }) rotate(${scrollY * 0.015}deg)`,
        }}
      >
        <div
          className="absolute top-1/4 right-1/6 w-54 h-78 bg-cover bg-center rounded-lg opacity-75 blur-sm animate-rave-mode-image-dance"
          style={{
            backgroundImage:
              "url('/photos/494129947_18347219656159300_4898537729932306818_n.jpg')",
            filter:
              "sepia(30%) hue-rotate(240deg) brightness(0.9) contrast(1.4)",
            mixBlendMode: "overlay",
          }}
        />

        <div
          className="absolute bottom-1/3 left-1/8 w-66 h-96 bg-cover bg-center rounded-lg opacity-65 blur-sm animate-image-pulse-glow"
          style={{
            backgroundImage:
              "url('/photos/470167483_573781295374567_3574809607622125311_n.jpg')",
            filter:
              "sepia(40%) hue-rotate(280deg) brightness(0.8) contrast(1.5)",
            mixBlendMode: "soft-light",
            transform: `rotate(${scrollY * 0.03}deg)`,
            animationDelay: "1s",
          }}
        />

        <div
          className="absolute top-1/6 left-1/2 w-48 h-69 bg-cover bg-center rounded-lg opacity-70 blur-sm animate-image-pulse-glow"
          style={{
            backgroundImage: "url('/photos/gigi3.jpg')",
            filter:
              "sepia(35%) hue-rotate(320deg) brightness(1.0) contrast(1.6)",
            mixBlendMode: "color-burn",
            transform: `translateX(-50%) rotate(${scrollY * -0.02}deg)`,
            animationDelay: "3s",
          }}
        />

        <div
          className="absolute bottom-1/6 right-1/3 w-72 h-54 bg-cover bg-center rounded-xl opacity-60 blur-md animate-rave-mode-image-dance"
          style={{
            backgroundImage: "url('/photos/L'amour_toujours.JPG')",
            filter:
              "sepia(45%) hue-rotate(200deg) brightness(1.1) contrast(1.5)",
            mixBlendMode: "overlay",
            animationDelay: "4s",
          }}
        />

        <div
          className="absolute top-1/2 left-1/8 w-60 h-42 bg-cover bg-center rounded-lg opacity-65 blur-sm animate-image-pulse-glow"
          style={{
            backgroundImage:
              "url('/photos/30915563_301578003709556_3870154202466484224_n.jpg')",
            filter:
              "sepia(40%) hue-rotate(350deg) brightness(1.3) contrast(1.4)",
            mixBlendMode: "screen",
            transform: `translateY(${scrollY * 0.08}px)`,
            animationDelay: "5s",
          }}
        />

        <div
          className="absolute top-3/4 right-1/4 w-60 h-60 bg-cover bg-center rounded-full opacity-55 blur-md animate-rave-mode-image-dance"
          style={{
            backgroundImage: "url('/photos/beautiful.jpg')",
            filter:
              "sepia(50%) hue-rotate(300deg) brightness(1.0) contrast(1.3)",
            mixBlendMode: "color-dodge",
            animationDelay: "2s",
          }}
        />

        <div
          className="absolute top-1/8 right-1/4 w-42 h-60 bg-cover bg-center rounded-lg opacity-60 blur-sm animate-image-pulse-glow"
          style={{
            backgroundImage: "url('/photos/gigi3.jpg')",
            filter:
              "sepia(25%) hue-rotate(160deg) brightness(1.1) contrast(1.5)",
            mixBlendMode: "overlay",
            transform: `translateX(${scrollY * 0.05}px)`,
            animationDelay: "6s",
          }}
        />

        <div
          className="absolute bottom-1/8 right-1/8 w-36 h-51 bg-cover bg-center rounded-xl opacity-50 blur-md animate-rave-mode-image-dance"
          style={{
            backgroundImage: "url('/photos/maxresdefault.jpg')",
            filter:
              "sepia(60%) hue-rotate(40deg) brightness(0.9) contrast(1.7)",
            mixBlendMode: "multiply",
            transform: `rotate(${scrollY * -0.035}deg)`,
            animationDelay: "9s",
          }}
        />

        <div
          className="absolute top-2/5 left-1/12 w-48 h-36 bg-cover bg-center rounded-2xl opacity-65 blur-sm animate-image-pulse-glow"
          style={{
            backgroundImage: "url('/photos/2023-12-11-b.jpg')",
            filter:
              "sepia(35%) hue-rotate(220deg) brightness(1.2) contrast(1.4)",
            mixBlendMode: "soft-light",
            transform: `translateY(${scrollY * -0.03}px)`,
            animationDelay: "11s",
          }}
        />

        <div
          className="absolute bottom-2/5 left-1/3 w-54 h-42 bg-cover bg-center rounded-lg opacity-70 blur-sm animate-rave-mode-image-dance"
          style={{
            backgroundImage: "url('/photos/L'amour_toujours.JPG')",
            filter:
              "sepia(45%) hue-rotate(280deg) brightness(1.0) contrast(1.6)",
            mixBlendMode: "color-burn",
            animationDelay: "7s",
          }}
        />
      </div>

      {/* Layer 2 - Medium speed background with album artwork - Enhanced visibility */}
      <div
        className="absolute inset-0 opacity-28 parallax-layer"
        style={{
          transform: `translateY(${scrollY * 0.55}px) translateX(${
            scrollY * -0.08
          }px) rotate(${scrollY * 0.012}deg)`,
          backgroundImage: `
            linear-gradient(45deg, transparent 30%, rgba(147, 51, 234, 0.20) 50%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, rgba(236, 72, 153, 0.20) 50%, transparent 70%),
            linear-gradient(135deg, transparent 40%, rgba(59, 130, 246, 0.15) 50%, transparent 60%)
          `,
          backgroundSize: "180px 180px, 120px 120px, 250px 250px",
          backgroundPosition: "0% 0%, 50% 50%, 25% 75%",
        }}
      >
        <div
          className="absolute top-1/6 left-1/3 w-42 h-42 bg-cover bg-center rounded-lg opacity-85 blur-sm animate-rave-mode-image-dance"
          style={{
            backgroundImage: "url('/photos/gigi3.jpg')",
            filter:
              "sepia(30%) hue-rotate(260deg) brightness(1.1) contrast(1.4)",
            mixBlendMode: "multiply",
            transform: `rotate(${-scrollY * 0.04}deg)`,
            animationDelay: "0.5s",
          }}
        />

        <div
          className="absolute bottom-1/4 right-1/6 w-48 h-48 bg-cover bg-center rounded-full opacity-75 blur-sm animate-image-pulse-glow"
          style={{
            backgroundImage: "url('/photos/2410soundoflove(1).jpg')",
            filter:
              "sepia(25%) hue-rotate(300deg) brightness(1.3) contrast(1.3)",
            mixBlendMode: "screen",
            animationDelay: "1.5s",
          }}
        />

        <div
          className="absolute top-2/3 left-1/8 w-54 h-36 bg-cover bg-center rounded-xl opacity-65 blur-md animate-rave-mode-image-dance"
          style={{
            backgroundImage: "url('/photos/totaleclipse.jpg')",
            filter:
              "sepia(60%) hue-rotate(240deg) brightness(0.9) contrast(1.6)",
            mixBlendMode: "overlay",
            transform: `translateX(${scrollY * 0.15}px)`,
            animationDelay: "2.5s",
          }}
        />

        <div
          className="absolute top-1/8 right-1/8 w-36 h-27 bg-cover bg-center rounded-md opacity-80 blur-sm animate-image-pulse-glow"
          style={{
            backgroundImage: "url('/photos/maxresdefault.jpg')",
            filter:
              "sepia(50%) hue-rotate(180deg) brightness(1.4) contrast(1.3)",
            mixBlendMode: "multiply",
            transform: `rotate(${scrollY * 0.06}deg)`,
            animationDelay: "3.5s",
          }}
        />

        <div
          className="absolute bottom-1/8 left-1/4 w-66 h-36 bg-cover bg-center rounded-2xl opacity-55 blur-lg animate-rave-mode-image-dance"
          style={{
            backgroundImage:
              "url('/photos/461998260_518091001085360_8321732667836278317_n.jpg')",
            filter:
              "sepia(30%) hue-rotate(220deg) brightness(1.0) contrast(1.7)",
            mixBlendMode: "soft-light",
            transform: `translateX(${scrollY * -0.12}px)`,
            animationDelay: "4.5s",
          }}
        />

        <div
          className="absolute top-1/3 right-1/5 w-39 h-39 bg-cover bg-center rounded-full opacity-70 blur-sm animate-image-pulse-glow"
          style={{
            backgroundImage: "url('/photos/2410soundoflove(1).jpg')",
            filter:
              "sepia(40%) hue-rotate(80deg) brightness(1.2) contrast(1.5)",
            mixBlendMode: "screen",
            transform: `rotate(${scrollY * 0.08}deg)`,
            animationDelay: "2.8s",
          }}
        />
      </div>

      {/* Layer 3 - Fast moving foreground elements - More visible */}
      <div
        className="absolute inset-0 opacity-18 parallax-layer"
        style={{
          transform: `translateY(${scrollY * 0.85}px) translateX(${
            scrollY * 0.12
          }px) rotate(${scrollY * -0.018}deg)`,
        }}
      >
        <div
          className="absolute top-1/4 left-1/5 w-27 h-33 bg-cover bg-center rounded-lg opacity-80 blur-sm animate-image-pulse-glow"
          style={{
            backgroundImage:
              "url('/photos/30915563_301578003709556_3870154202466484224_n.jpg')",
            filter:
              "sepia(45%) hue-rotate(15deg) brightness(1.5) contrast(1.6)",
            mixBlendMode: "screen",
            animationDelay: "1.2s",
          }}
        />

        <div
          className="absolute bottom-1/5 right-1/4 w-24 h-30 bg-cover bg-center rounded-full opacity-70 blur-md animate-rave-mode-image-dance"
          style={{
            backgroundImage: "url('/photos/beautiful.jpg')",
            filter:
              "sepia(60%) hue-rotate(260deg) brightness(1.0) contrast(1.9)",
            mixBlendMode: "color-dodge",
            animationDelay: "3.4s",
          }}
        />

        <div
          className="absolute top-2/3 left-1/8 w-21 h-27 bg-cover bg-center rounded-xl opacity-85 blur-sm animate-image-pulse-glow"
          style={{
            backgroundImage:
              "url('/photos/470167483_573781295374567_3574809607622125311_n.jpg')",
            filter:
              "sepia(25%) hue-rotate(180deg) brightness(1.3) contrast(1.4)",
            mixBlendMode: "soft-light",
            animationDelay: "7.6s",
          }}
        />

        <div
          className="absolute top-1/8 right-1/6 w-18 h-24 bg-cover bg-center rounded-md opacity-65 blur-lg animate-rave-mode-image-dance"
          style={{
            backgroundImage:
              "url('/photos/461998260_518091001085360_8321732667836278317_n.jpg')",
            filter:
              "sepia(70%) hue-rotate(100deg) brightness(0.9) contrast(2.2)",
            mixBlendMode: "multiply",
            animationDelay: "4.9s",
          }}
        />
      </div>
    </div>
  );
};
