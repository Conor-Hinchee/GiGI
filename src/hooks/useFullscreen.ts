import { useState, useRef, useEffect } from 'react';

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const danceAreaRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen
      if (danceAreaRef.current) {
        try {
          await danceAreaRef.current.requestFullscreen();
          setIsFullscreen(true);
        } catch (err) {
          console.log("Fullscreen failed:", err);
        }
      }
    } else {
      // Exit fullscreen
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.log("Exit fullscreen failed:", err);
      }
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  return {
    isFullscreen,
    danceAreaRef,
    toggleFullscreen,
  };
};
