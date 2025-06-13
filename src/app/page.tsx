"use client";

import React from "react";
import {
  DanceArea,
  MainContent,
  ScrollResistanceIndicator,
} from "../components";
import {
  useAudioPlayer,
  useFullscreen,
  useMobileDetection,
  useScrollPosition,
  useScrollHijack,
} from "../hooks";

export default function Home() {
  const { isPlaying, setIsPlaying, audioRef, toggleAudio } = useAudioPlayer();
  const { isFullscreen, danceAreaRef, toggleFullscreen } = useFullscreen();
  const { isMobile } = useMobileDetection();
  const { scrollY } = useScrollPosition(isMobile);
  const { scrollState } = useScrollHijack(isPlaying && !isFullscreen);

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
        scrollHijackState={{
          isScrollHijacked: scrollState.isScrollHijacked,
          scrollResistance: scrollState.scrollResistance,
          shouldSnap: scrollState.shouldSnap,
        }}
      />
      <MainContent
        isPlaying={isPlaying}
        scrollY={scrollY}
        isMobile={isMobile}
        isScrolledPastDanceArea={isScrolledPastDanceArea}
      />
      <ScrollResistanceIndicator
        scrollResistance={scrollState.scrollResistance}
        isVisible={
          scrollState.isScrollHijacked && scrollState.accumulatedScroll > 0
        }
      />
    </div>
  );
}
