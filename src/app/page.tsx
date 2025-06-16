"use client";

import React from "react";
import {
  DanceArea,
  MainContent,
  ScrollResistanceIndicator,
  ViewportBorderIndicator,
} from "../components";
import {
  useAudioPlayer,
  useFullscreen,
  useMobileDetection,
  useScrollPosition,
  useScrollHijack,
  useSpacebarPause,
} from "../hooks";

export default function Home() {
  const { isPlaying, setIsPlaying, audioRef, toggleAudio } = useAudioPlayer();
  const { isFullscreen, danceAreaRef, toggleFullscreen } = useFullscreen();
  const { isMobile } = useMobileDetection();
  const { scrollY } = useScrollPosition(isMobile);
  const { scrollState } = useScrollHijack(isPlaying && !isFullscreen);

  // Add spacebar pause functionality for Dance Mode
  useSpacebarPause({ isPlaying, audioRef, setIsPlaying });

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
          accumulatedScroll: scrollState.accumulatedScroll,
          currentSection: scrollState.currentSection,
          totalSections: scrollState.totalSections,
          sectionProgress: scrollState.sectionProgress,
          isScrollingUp: scrollState.isScrollingUp,
          isFirstTimeActivation: scrollState.isFirstTimeActivation,
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
          scrollState.isScrollHijacked &&
          scrollState.accumulatedScroll > 0 &&
          !scrollState.isScrollingUp &&
          scrollState.isFirstTimeActivation
        }
        isMobile={isMobile}
      />
      <ViewportBorderIndicator
        scrollResistance={scrollState.sectionProgress}
        isVisible={
          scrollState.isScrollHijacked &&
          isPlaying &&
          !isFullscreen &&
          !scrollState.isScrollingUp
        }
        isScrollHijacked={scrollState.isScrollHijacked}
      />
    </div>
  );
}
