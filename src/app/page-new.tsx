"use client";

import React from "react";
import { DanceArea } from "../components/DanceArea";
import { MainContent } from "../components/MainContent";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { useFullscreen } from "../hooks/useFullscreen";
import { useMobileDetection } from "../hooks/useMobileDetection";
import { useScrollPosition } from "../hooks/useScrollPosition";

export default function Home() {
  // Custom hooks
  const { isPlaying, setIsPlaying, audioRef, toggleAudio } = useAudioPlayer();
  const { isFullscreen, danceAreaRef, toggleFullscreen } = useFullscreen();
  const { isMobile } = useMobileDetection();
  const { scrollY } = useScrollPosition(isMobile);

  // Calculate if user has scrolled past the dance area
  const danceAreaHeight =
    typeof window !== "undefined"
      ? isPlaying
        ? window.innerHeight * 0.75
        : window.innerHeight * 0.5
      : 0;
  const isScrolledPastDanceArea = scrollY > danceAreaHeight;

  return (
    <div className="min-h-screen bg-gray-900">
      <DanceArea
        isPlaying={isPlaying}
        isFullscreen={isFullscreen}
        isMobile={isMobile}
        danceAreaRef={danceAreaRef}
        toggleAudio={toggleAudio}
        toggleFullscreen={toggleFullscreen}
        audioRef={audioRef}
      />

      <MainContent
        isPlaying={isPlaying}
        scrollY={scrollY}
        isMobile={isMobile}
        isScrolledPastDanceArea={isScrolledPastDanceArea}
      />
    </div>
  );
}
