"use client";

import React from "react";
import { DanceArea, MainContent } from "../components";
import {
  useAudioPlayer,
  useFullscreen,
  useMobileDetection,
  useScrollPosition,
} from "../hooks";

export default function Home() {
  const { isPlaying, setIsPlaying, audioRef, toggleAudio } = useAudioPlayer();
  const { isFullscreen, danceAreaRef, toggleFullscreen } = useFullscreen();
  const { isMobile } = useMobileDetection();
  const { scrollY } = useScrollPosition(isMobile);

  const isScrolledPastDanceArea = scrollY > 100;

  return (
    <div className="min-h-screen bg-gray-900">
      <DanceArea
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
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
