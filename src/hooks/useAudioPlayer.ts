import { useState, useRef } from 'react';

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Resume audio context if suspended (required by modern browsers)
        try {
          const audioContext = (
            window as unknown as { audioContext?: AudioContext }
          ).audioContext;
          if (audioContext && audioContext.state === "suspended") {
            await audioContext.resume();
          }
        } catch (error) {
          console.log("Audio context resume failed:", error);
        }

        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return {
    isPlaying,
    setIsPlaying,
    audioRef,
    toggleAudio,
  };
};
