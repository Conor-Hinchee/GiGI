import { useEffect } from 'react';

interface UseSpacebarPauseProps {
  isPlaying: boolean;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setIsPlaying: (playing: boolean) => void;
}

export const useSpacebarPause = ({ isPlaying, audioRef, setIsPlaying }: UseSpacebarPauseProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only act on spacebar keypress
      if (event.code === 'Space' || event.key === ' ') {
        // Only pause if music is currently playing (Dance Mode is active)
        if (isPlaying && audioRef.current) {
          // Prevent default spacebar behavior (like scrolling) only when we act
          event.preventDefault();
          
          // Pause the music
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    };

    // Add global event listener
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, audioRef, setIsPlaying]);
};
