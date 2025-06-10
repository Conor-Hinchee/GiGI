export interface TourDate {
  city: string;
  venue: string;
  date: string;
  year: string;
  color: 'purple' | 'pink' | 'blue' | 'green' | 'yellow' | 'red';
}

export interface DanceAreaProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  isFullscreen: boolean;
  isMobile: boolean;
  danceAreaRef: React.RefObject<HTMLDivElement | null>;
  toggleAudio: () => void;
  toggleFullscreen: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export interface MainContentProps {
  isPlaying: boolean;
  scrollY: number;
  isMobile: boolean;
  isScrolledPastDanceArea: boolean;
}

export interface TourCardProps {
  tourDate: TourDate;
  isPlaying: boolean;
}
