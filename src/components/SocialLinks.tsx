import React, { useState } from "react";

interface SocialLinksProps {
  isPlaying: boolean;
}

interface SocialLinkCardProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  color: string;
  isPlaying: boolean;
}

const SocialLinkCard: React.FC<SocialLinkCardProps> = ({
  href,
  icon,
  label,
  color,
  isPlaying,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine if we should show rave effects (either playing or hovered)
  const showRaveEffect = isPlaying || isHovered;

  const getColorClasses = (color: string) => {
    const colorMap = {
      gold: {
        border: "border-gold-500",
        bg: "bg-gold-500/20",
        text: "text-gold-400",
        particle: "bg-gold-400/60",
      },
      blue: {
        border: "border-blue-500",
        bg: "bg-blue-500/20",
        text: "text-blue-400",
        particle: "bg-blue-400/60",
      },
      pink: {
        border: "border-pink-500",
        bg: "bg-pink-500/20",
        text: "text-pink-400",
        particle: "bg-pink-400/60",
      },
      sky: {
        border: "border-sky-500",
        bg: "bg-sky-500/20",
        text: "text-sky-400",
        particle: "bg-sky-400/60",
      },
      green: {
        border: "border-green-500",
        bg: "bg-green-500/20",
        text: "text-green-400",
        particle: "bg-green-400/60",
      },
      gray: {
        border: "border-gray-400",
        bg: "bg-gray-400/20",
        text: "text-gray-300",
        particle: "bg-gray-400/60",
      },
      red: {
        border: "border-red-500",
        bg: "bg-red-500/20",
        text: "text-red-400",
        particle: "bg-red-400/60",
      },
      purple: {
        border: "border-purple-500",
        bg: "bg-purple-500/20",
        text: "text-purple-400",
        particle: "bg-purple-400/60",
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.gold;
  };

  const colors = getColorClasses(color);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-block transition-all duration-300 transform ${
        showRaveEffect ? "scale-105" : "scale-100 hover:scale-105"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Minimal container - almost invisible in dance mode */}
      <div
        className={`relative w-16 h-16 rounded-full backdrop-blur-sm transition-all duration-500 flex items-center justify-center ${
          showRaveEffect
            ? `bg-black/20 border border-transparent shadow-none`
            : `bg-gray-800/50 border border-gray-600/50 hover:border-gray-500/70 shadow-lg hover:shadow-xl`
        }`}
      >
        {/* SVG Icon - main focus with enhanced rave effects */}
        <div
          className={`relative z-10 w-10 h-10 flex items-center justify-center transition-all duration-300 ${
            showRaveEffect
              ? `${colors.text} animate-pulse`
              : "text-gray-300 group-hover:text-gray-100"
          }`}
          style={{
            filter: showRaveEffect
              ? "drop-shadow(0 0 8px currentColor) drop-shadow(0 0 16px currentColor)"
              : "none",
            animation: showRaveEffect
              ? `social-icon-rave 2s ease-in-out infinite ${
                  Math.random() * 0.5
                }s`
              : "none",
          }}
        >
          <div className="w-8 h-8 flex items-center justify-center">{icon}</div>
        </div>

        {/* Rave mode glow effects - subtle and focused on icon */}
        {showRaveEffect && (
          <>
            {/* Pulsing background glow */}
            <div
              className="absolute inset-0 rounded-full animate-pulse opacity-60"
              style={{
                background: `radial-gradient(circle, ${colors.particle
                  .replace("bg-", "")
                  .replace("/60", "")} 20%, transparent 70%)`,
                animation: `social-button-glow-pulse 2.5s ease-in-out infinite ${
                  Math.random() * 0.3
                }s`,
              }}
            ></div>

            {/* Particle effects around icon */}
            <div className="absolute -inset-1 rounded-full">
              <div
                className={`absolute inset-0 rounded-full ${colors.particle} animate-ping opacity-30`}
                style={{ animationDelay: `${Math.random() * 0.5}s` }}
              ></div>
            </div>
          </>
        )}
      </div>

      {/* Label - more prominent when not in rave mode */}
      <div className="mt-2 text-center">
        <span
          className={`text-xs font-medium transition-colors duration-300 ${
            showRaveEffect
              ? "text-gray-300 opacity-75"
              : "text-gray-400 group-hover:text-gray-300"
          }`}
        >
          {label}
        </span>
      </div>
    </a>
  );
};

export const SocialLinks: React.FC<SocialLinksProps> = ({ isPlaying }) => {
  return (
    <div className="mt-16">
      <div className="relative">
        {isPlaying && (
          <div className="hidden lg:block absolute -top-2 -right-2 w-3 h-3 rounded-full blur-sm">
            <div className="bg-purple-400/60 animate-ping w-full h-full rounded-full"></div>
          </div>
        )}
        <h3
          className={`text-2xl md:text-3xl font-bold uppercase tracking-widest mb-8 ${
            isPlaying
              ? "text-purple-300 bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-purple-500 animate-pulse scale-105"
              : "text-white"
          }`}
        >
          Follow GiGi
        </h3>
      </div>

      {/* Main Social Platforms */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 max-w-6xl mx-auto mb-8 justify-items-center">
        <SocialLinkCard
          href="https://www.gigidagostino.com"
          icon={
            <svg
              className="w-full h-full"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          }
          label="Official Site"
          color="gold"
          isPlaying={isPlaying}
        />

        <SocialLinkCard
          href="https://www.facebook.com/gigidagostino"
          icon={
            <svg
              className="w-full h-full"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          }
          label="Facebook"
          color="blue"
          isPlaying={isPlaying}
        />

        <SocialLinkCard
          href="https://www.instagram.com/gigidag/"
          icon={
            <svg
              className="w-full h-full"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          }
          label="Instagram"
          color="pink"
          isPlaying={isPlaying}
        />

        <SocialLinkCard
          href="https://twitter.com/GIGIDAGOSTINO_1"
          icon={
            <svg
              className="w-full h-full"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          }
          label="Twitter"
          color="sky"
          isPlaying={isPlaying}
        />

        <SocialLinkCard
          href="https://www.youtube.com/channel/UC7Sqfp5sOFUI4436LBoB_JQ"
          icon={
            <svg
              className="w-full h-full"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          }
          label="YouTube"
          color="red"
          isPlaying={isPlaying}
        />

        <SocialLinkCard
          href="https://open.spotify.com/artist/1OAjDaKgg00KCUYqDe68un"
          icon={
            <svg
              className="w-full h-full"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.301.421-1.02.599-1.559.3z" />
            </svg>
          }
          label="Spotify"
          color="green"
          isPlaying={isPlaying}
        />

        <SocialLinkCard
          href="https://music.apple.com/it/artist/gigi-dagostino/90049828"
          icon={
            <svg
              className="w-full h-full"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.001-.08-.004-.12-.004H5.986c-.04 0-.08.003-.12.004-.526.015-1.047.057-1.564.15-.673.121-1.303.353-1.877.727C1.307 1.624.562 2.624.245 3.934.07 4.654.005 5.386.005 6.124v11.744c0 .738.065 1.47.24 2.19.317 1.31 1.062 2.31 2.18 3.043.574.374 1.204.606 1.877.727.517.093 1.038.135 1.564.15.04.001.08.004.12.004h12.014c.04 0 .08-.003.12-.004.526-.015 1.047-.057 1.564-.15.673-.121 1.303-.353 1.877-.727 1.118-.734 1.863-1.734 2.18-3.043.175-.72.24-1.452.24-2.19V6.124zM22.285 17.73c0 .597-.054 1.197-.185 1.785-.242.998-.801 1.678-1.56 2.125-.35.207-.721.328-1.106.37-.432.057-.867.084-1.302.09-.015 0-.029.002-.044.002H5.911c-.015 0-.029-.002-.044-.002-.435-.006-.87-.033-1.302-.09-.385-.042-.756-.163-1.106-.37-.759-.447-1.318-1.127-1.56-2.125C1.768 18.927 1.714 18.327 1.714 17.73V6.27c0-.597.054-1.197.185-1.785.242-.998.801-1.678 1.56-2.125.35-.207.721-.328 1.106-.37.432-.057.867-.084 1.302-.09.015 0 .029-.002.044-.002h12.178c.015 0 .029.002.044.002.435.006.87.033 1.302.09.385.042.756.163 1.106.37.759.447 1.318 1.127 1.56 2.125.131.588.185 1.188.185 1.785V17.73z" />
              <path d="M10.584 8.929a4.832 4.832 0 002.416.649c2.668 0 4.832-2.164 4.832-4.832 0-.266-.022-.526-.065-.781a3.05 3.05 0 01-.781.065c-2.668 0-4.832 2.164-4.832 4.832 0 .266.022.526.065.781.266-.022.526-.065.781-.065.266 0 .526.022.781.065a3.05 3.05 0 00-.065-.781c0-2.668 2.164-4.832 4.832-4.832.266 0 .526.022.781.065-.022-.266-.065-.526-.065-.781C18.416 2.164 16.252 0 13.584 0c-.266 0-.526.022-.781.065.022.266.065.526.065.781 0 2.668-2.164 4.832-4.832 4.832-.266 0-.526-.022-.781-.065.022.266.065.526.065.781z" />
            </svg>
          }
          label="Apple Music"
          color="gray"
          isPlaying={isPlaying}
        />

        <SocialLinkCard
          href="http://www.casadag.com"
          icon={
            <svg
              className="w-full h-full"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
          }
          label="Casa DAG"
          color="purple"
          isPlaying={isPlaying}
        />
      </div>

      <p className="text-gray-400 mt-8 text-sm text-center">
        Stay connected for exclusive content, behind-the-scenes updates, and the
        latest Lento Violento releases
      </p>
    </div>
  );
};
